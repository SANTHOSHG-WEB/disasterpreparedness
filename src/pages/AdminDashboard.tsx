import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useToast } from '../hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Users, Award, BookOpen, Phone, MapPin, BarChart3 } from 'lucide-react';
import { Navigate } from 'react-router-dom';

interface StudentProfile {
  id: string;
  user_id: string;
  full_name: string;
  age?: number;
  birthday?: string;
  school_name?: string;
  class_name?: string;
  created_at: string;
}

interface Enrollment {
  id: string;
  user_id: string;
  module_id: string;
  completed: boolean;
  enrolled_at: string;
  completed_at?: string;
}

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  category: string;
  description?: string;
  location?: string;
  is_active: boolean;
}

const AdminDashboard = () => {
  const { user, userRole, isLoading } = useAuth();
  const { toast } = useToast();
  
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([]);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalEnrollments: 0,
    completedModules: 0,
    certificatesIssued: 0
  });

  const [newContact, setNewContact] = useState({
    name: '',
    phone: '',
    category: '',
    description: '',
    location: ''
  });

  // Check if user is admin
  if (!isLoading && (!user || userRole?.role !== 'admin')) {
    return <Navigate to="/admin/auth" replace />;
  }

  useEffect(() => {
    if (user && userRole?.role === 'admin') {
      fetchDashboardData();
    }
  }, [user, userRole]);

  const fetchDashboardData = async () => {
    try {
      // Fetch students
      const { data: studentsData } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      // Fetch enrollments
      const { data: enrollmentsData } = await supabase
        .from('enrollments')
        .select('*')
        .order('enrolled_at', { ascending: false });

      // Fetch emergency contacts
      const { data: contactsData } = await supabase
        .from('emergency_contacts')
        .select('*')
        .order('created_at', { ascending: false });

      if (studentsData) setStudents(studentsData);
      if (enrollmentsData) setEnrollments(enrollmentsData);
      if (contactsData) setEmergencyContacts(contactsData);

      // Calculate stats
      const completedCount = enrollmentsData?.filter(e => e.completed).length || 0;
      setStats({
        totalStudents: studentsData?.length || 0,
        totalEnrollments: enrollmentsData?.length || 0,
        completedModules: completedCount,
        certificatesIssued: Math.floor(completedCount / 10) // Assuming 10 modules per certificate
      });

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      });
    }
  };

  const addEmergencyContact = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('emergency_contacts')
        .insert([newContact]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Emergency contact added successfully",
      });

      setNewContact({
        name: '',
        phone: '',
        category: '',
        description: '',
        location: ''
      });

      fetchDashboardData();
    } catch (error) {
      console.error('Error adding contact:', error);
      toast({
        title: "Error",
        description: "Failed to add emergency contact",
        variant: "destructive",
      });
    }
  };

  const toggleContactStatus = async (contactId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('emergency_contacts')
        .update({ is_active: !currentStatus })
        .eq('id', contactId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Contact status updated",
      });

      fetchDashboardData();
    } catch (error) {
      console.error('Error updating contact:', error);
      toast({
        title: "Error",
        description: "Failed to update contact status",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-glass-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Calculate additional metrics for the dashboard
  const badgesEarned = Math.floor(stats.completedModules * 0.5); // Assume badges per completed modules
  const drillParticipation = Math.floor((stats.totalEnrollments / Math.max(stats.totalStudents, 1)) * 100);

  return (
    <div className="min-h-screen bg-gray-50 p-4 pt-24">
      <div className="container mx-auto max-w-md">
        {/* Institute Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-1">
            Admin
          </h1>
          <h2 className="text-4xl font-bold text-blue-600 mb-4">
            Dashboard
          </h2>
          <p className="text-sm text-gray-600">
            Safety Institute Management System
          </p>
        </div>

        {/* Stats Cards */}
        <div className="space-y-6">
          <Card className="bg-white shadow-sm border border-gray-200 rounded-2xl">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-medium text-blue-500 mb-4">
                Active Students
              </h3>
              <p className="text-5xl font-bold text-blue-900">
                {stats.totalStudents.toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border border-gray-200 rounded-2xl">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-medium text-blue-500 mb-4">
                Completed Modules
              </h3>
              <p className="text-5xl font-bold text-blue-900">
                {stats.completedModules.toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border border-gray-200 rounded-2xl">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-medium text-blue-500 mb-4">
                Badges Earned
              </h3>
              <p className="text-5xl font-bold text-blue-900">
                {badgesEarned.toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border border-gray-200 rounded-2xl">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-medium text-blue-500 mb-4">
                Drill Participation
              </h3>
              <p className="text-5xl font-bold text-blue-900">
                {drillParticipation}%
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 space-y-4">
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg"
            onClick={() => window.location.href = '#students'}
          >
            Manage Students
          </Button>
          <Button 
            variant="outline"
            className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 py-4 rounded-xl text-lg"
            onClick={() => window.location.href = '#reports'}
          >
            View Reports
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;