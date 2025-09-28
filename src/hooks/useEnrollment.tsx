import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

interface Enrollment {
  id: string;
  user_id: string;
  module_id: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
  completed_at?: string;
}

export const useEnrollment = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchEnrollments();
    }
  }, [user]);

  const fetchEnrollments = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('enrollments')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching enrollments:', error);
        return;
      }

      setEnrollments(data || []);
    } catch (error) {
      console.error('Error fetching enrollments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const enrollInModule = async (moduleId: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to enroll in modules.",
        variant: "destructive",
      });
      return false;
    }

    try {
      const { error } = await supabase
        .from('enrollments')
        .insert([{
          user_id: user.id,
          module_id: moduleId,
          completed: false
        }]);

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast({
            title: "Already Enrolled",
            description: "You are already enrolled in this module.",
          });
          return true;
        }
        throw error;
      }

      toast({
        title: "Enrollment Successful",
        description: `You have been enrolled in Module ${moduleId}.`,
      });

      await fetchEnrollments();
      return true;
    } catch (error) {
      console.error('Error enrolling in module:', error);
      toast({
        title: "Enrollment Failed",
        description: "Failed to enroll in the module. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const completeModule = async (moduleId: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('enrollments')
        .update({
          completed: true,
          completed_at: new Date().toISOString()
        })
        .eq('user_id', user.id)
        .eq('module_id', moduleId);

      if (error) throw error;

      toast({
        title: "Module Completed",
        description: `Congratulations! You have completed Module ${moduleId}.`,
      });

      await fetchEnrollments();
      await checkForCertificate();
      return true;
    } catch (error) {
      console.error('Error completing module:', error);
      return false;
    }
  };

  const checkForCertificate = async () => {
    if (!user) return;

    const completedModules = enrollments.filter(e => e.completed).length;
    const totalModules = 10; // Assuming 10 modules in total

    if (completedModules >= totalModules) {
      await generateCertificate();
    }
  };

  const generateCertificate = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('certificates')
        .insert([{
          user_id: user.id,
          modules_completed: enrollments.filter(e => e.completed).length
        }]);

      if (error && error.code !== '23505') { // Ignore duplicate certificate
        throw error;
      }

      toast({
        title: "Certificate Earned!",
        description: "Congratulations! You have earned your disaster preparedness certificate.",
      });
    } catch (error) {
      console.error('Error generating certificate:', error);
    }
  };

  const isEnrolledIn = (moduleId: string) => {
    return enrollments.some(e => e.module_id === moduleId);
  };

  const isModuleCompleted = (moduleId: string) => {
    return enrollments.some(e => e.module_id === moduleId && e.completed);
  };

  const getCompletionPercentage = () => {
    const totalModules = 10;
    const completedModules = enrollments.filter(e => e.completed).length;
    return Math.round((completedModules / totalModules) * 100);
  };

  return {
    enrollments,
    isLoading,
    enrollInModule,
    completeModule,
    isEnrolledIn,
    isModuleCompleted,
    getCompletionPercentage,
    fetchEnrollments
  };
};