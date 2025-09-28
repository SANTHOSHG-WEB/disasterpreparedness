import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';

interface UserProfile {
  id: string;
  user_id: string;
  full_name: string;
  age?: number;
  birthday?: string;
  school_name?: string;
  class_name?: string;
  created_at: string;
  updated_at: string;
}

interface UserRole {
  role: 'admin' | 'moderator' | 'student';
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  userRole: UserRole | null;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  loginWithGoogle: () => Promise<{ error?: string }>;
  signup: (email: string, password: string, profileData: {
    full_name: string;
    age?: number;
    birthday?: string;
    school_name?: string;
    class_name?: string;
    college_name?: string;
    role?: string;
  }, opts?: { redirectTo?: string }) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<{ error?: string }>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch user profile and role
          setTimeout(async () => {
            await fetchUserProfile(session.user.id);
            await fetchUserRole(session.user.id);
          }, 0);
        } else {
          setProfile(null);
          setUserRole(null);
        }
        
        setIsLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserProfile(session.user.id);
        fetchUserRole(session.user.id);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (data && !error) {
      setProfile(data);
    }
  };

  const fetchUserRole = async (userId: string) => {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .single();

    if (data && !error) {
      setUserRole({ role: data.role as 'admin' | 'moderator' | 'student' });
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { error: error.message };
      }

      return {};
    } catch (error) {
      return { error: 'Login failed. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    // Removed Google authentication - using OTP instead
    return { error: 'Google authentication is not available. Please use email and OTP.' };
  };

  const signup = async (email: string, password: string, profileData: {
    full_name: string;
    age?: number;
    birthday?: string;
    school_name?: string;
    class_name?: string;
    college_name?: string;
    role?: string;
  }, opts?: { redirectTo?: string }) => {
    setIsLoading(true);
    try {
      const redirectUrl = opts?.redirectTo ?? `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: profileData.full_name,
            age: profileData.age,
            birthday: profileData.birthday,
            school_name: profileData.school_name,
            class_name: profileData.class_name,
            college_name: profileData.college_name,
            role: profileData.role,
          }
        }
      });

      if (error) {
        return { error: error.message };
      }

      return {};
    } catch (error) {
      return { error: 'Signup failed. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) return { error: 'Not authenticated' };

    try {
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('user_id', user.id);

      if (error) {
        return { error: error.message };
      }

      // Refresh profile data
      await fetchUserProfile(user.id);
      return {};
    } catch (error) {
      return { error: 'Failed to update profile' };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      profile,
      userRole,
      login,
      loginWithGoogle,
      signup,
      logout,
      updateProfile,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};