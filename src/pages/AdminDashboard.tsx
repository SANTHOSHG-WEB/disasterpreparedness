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
  created_at: string;
  updated_at: string;
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

  return (
    <div className="min-h-screen p-4 pt-24">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-glass-foreground mb-2">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage students, enrollments, and emergency contacts
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="glass border-glass-border">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-primary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                  <p className="text-2xl font-bold text-glass-foreground">{stats.totalStudents}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-glass-border">
            <CardContent className="p-6">
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-primary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Enrollments</p>
                  <p className="text-2xl font-bold text-glass-foreground">{stats.totalEnrollments}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-glass-border">
            <CardContent className="p-6">
              <div className="flex items-center">
                <BarChart3 className="h-8 w-8 text-primary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Completed Modules</p>
                  <p className="text-2xl font-bold text-glass-foreground">{stats.completedModules}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-glass-border">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Award className="h-8 w-8 text-primary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Certificates Issued</p>
                  <p className="text-2xl font-bold text-glass-foreground">{stats.certificatesIssued}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="students" className="space-y-6">
          <TabsList className="glass">
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="enrollments">Enrollments</TabsTrigger>
            <TabsTrigger value="contacts">Emergency Contacts</TabsTrigger>
          </TabsList>

          <TabsContent value="students" className="space-y-4">
            <Card className="glass border-glass-border">
              <CardHeader>
                <CardTitle>Registered Students</CardTitle>
                <CardDescription>
                  View and manage student profiles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {students.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-4 border border-glass-border rounded-lg">
                      <div>
                        <h3 className="font-semibold text-glass-foreground">{student.full_name}</h3>
                        <p className="text-sm text-muted-foreground">{student.school_name}</p>
                        {student.class_name && (
                          <Badge variant="secondary" className="mt-1">{student.class_name}</Badge>
                        )}
                      </div>
                      <div className="text-right">
                        {student.age && <p className="text-sm text-muted-foreground">Age: {student.age}</p>}
                        <p className="text-xs text-muted-foreground">
                          Joined: {new Date(student.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="enrollments" className="space-y-4">
            <Card className="glass border-glass-border">
              <CardHeader>
                <CardTitle>Student Enrollments</CardTitle>
                <CardDescription>
                  Track student progress and module completions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {enrollments.map((enrollment) => (
                    <div key={enrollment.id} className="flex items-center justify-between p-4 border border-glass-border rounded-lg">
                      <div>
                        <h3 className="font-semibold text-glass-foreground">
                          Student ID: {enrollment.user_id}
                        </h3>
                        <p className="text-sm text-muted-foreground">Module: {enrollment.module_id}</p>
                        <p className="text-xs text-muted-foreground">
                          Enrolled: {new Date(enrollment.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant={enrollment.completed ? "default" : "secondary"}>
                          {enrollment.completed ? 'Completed' : 'In Progress'}
                        </Badge>
                        {enrollment.completed_at && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Completed: {new Date(enrollment.completed_at).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contacts" className="space-y-4">
            <Card className="glass border-glass-border">
              <CardHeader>
                <CardTitle>Emergency Contacts</CardTitle>
                <CardDescription>
                  Manage emergency contact information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={addEmergencyContact} className="space-y-4 mb-6 p-4 border border-glass-border rounded-lg">
                  <h3 className="font-semibold text-glass-foreground">Add New Contact</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contact-name">Name *</Label>
                      <Input
                        id="contact-name"
                        value={newContact.name}
                        onChange={(e) => setNewContact(prev => ({ ...prev, name: e.target.value }))}
                        required
                        className="glass border-glass-border"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-phone">Phone *</Label>
                      <Input
                        id="contact-phone"
                        value={newContact.phone}
                        onChange={(e) => setNewContact(prev => ({ ...prev, phone: e.target.value }))}
                        required
                        className="glass border-glass-border"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-category">Category *</Label>
                      <Input
                        id="contact-category"
                        value={newContact.category}
                        onChange={(e) => setNewContact(prev => ({ ...prev, category: e.target.value }))}
                        required
                        placeholder="e.g., Emergency, Medical, Support"
                        className="glass border-glass-border"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-location">Location</Label>
                      <Input
                        id="contact-location"
                        value={newContact.location}
                        onChange={(e) => setNewContact(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="e.g., India, Delhi"
                        className="glass border-glass-border"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="contact-description">Description</Label>
                      <Input
                        id="contact-description"
                        value={newContact.description}
                        onChange={(e) => setNewContact(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Brief description of the service"
                        className="glass border-glass-border"
                      />
                    </div>
                  </div>
                  <Button type="submit" className="bg-primary hover:bg-primary-dark">
                    Add Contact
                  </Button>
                </form>

                <div className="space-y-4">
                  {emergencyContacts.map((contact) => (
                    <div key={contact.id} className="flex items-center justify-between p-4 border border-glass-border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Phone className="h-5 w-5 text-primary" />
                        <div>
                          <h3 className="font-semibold text-glass-foreground">{contact.name}</h3>
                          <p className="text-sm text-muted-foreground">{contact.phone}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline">{contact.category}</Badge>
                            {contact.location && (
                              <span className="text-xs text-muted-foreground flex items-center">
                                <MapPin className="h-3 w-3 mr-1" />
                                {contact.location}
                              </span>
                            )}
                          </div>
                          {contact.description && (
                            <p className="text-xs text-muted-foreground mt-1">{contact.description}</p>
                          )}
                        </div>
                      </div>
                      <Button
                        onClick={() => toggleContactStatus(contact.id, contact.is_active)}
                        variant={contact.is_active ? "default" : "outline"}
                        size="sm"
                      >
                        {contact.is_active ? 'Active' : 'Inactive'}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;