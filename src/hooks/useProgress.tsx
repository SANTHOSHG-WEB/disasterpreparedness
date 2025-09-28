import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';

interface ModuleProgress {
  moduleId: string;
  videoWatched: boolean;
  gameCompleted: boolean;
  quizCompleted: boolean;
  score: number;
  completedAt?: string;
}

interface UserProgress {
  modules: Record<string, ModuleProgress>;
  points: number;
  badges: string[];
  certificateEarned: boolean;
}

export const useProgress = () => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<UserProgress>({
    modules: {},
    points: 0,
    badges: [],
    certificateEarned: false
  });

  // Load progress from localStorage on mount
  useEffect(() => {
    if (user) {
      const savedProgress = localStorage.getItem(`dme_progress_${user.id}`);
      if (savedProgress) {
        setProgress(JSON.parse(savedProgress));
      }
    }
  }, [user]);

  // Load progress from Supabase enrollments to prevent resets
  useEffect(() => {
    const loadFromDb = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from('enrollments')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error loading enrollments:', error);
        return;
      }

      setProgress(prev => {
        const modulesFromDb: Record<string, ModuleProgress> = { ...prev.modules };
        (data || []).forEach((e: any) => {
          if (e.completed) {
            modulesFromDb[e.module_id] = {
              moduleId: e.module_id,
              videoWatched: true,
              gameCompleted: true,
              quizCompleted: true,
              score: prev.modules[e.module_id]?.score ?? 0,
              completedAt: e.completed_at || prev.modules[e.module_id]?.completedAt || new Date().toISOString(),
            };
          } else {
            modulesFromDb[e.module_id] = {
              moduleId: e.module_id,
              videoWatched: prev.modules[e.module_id]?.videoWatched ?? false,
              gameCompleted: prev.modules[e.module_id]?.gameCompleted ?? false,
              quizCompleted: prev.modules[e.module_id]?.quizCompleted ?? false,
              score: prev.modules[e.module_id]?.score ?? 0,
            };
          }
        });

        // Recalculate points and badges
        let totalPoints = 0;
        const existingBadges = prev.badges;
        const newBadges: string[] = [];
        let completedModules = 0;

        Object.values(modulesFromDb).forEach(module => {
          if (module.completedAt) {
            completedModules++;
            totalPoints += 100;
            totalPoints += module.score;
            if (!existingBadges.includes(`${module.moduleId}_badge`)) {
              newBadges.push(`${module.moduleId}_badge`);
            }
          }
        });

        if (completedModules >= 3 && !existingBadges.includes('progress_badge')) newBadges.push('progress_badge');
        if (completedModules >= 7 && !existingBadges.includes('advanced_badge')) newBadges.push('advanced_badge');
        if (completedModules === 10 && !existingBadges.includes('master_badge')) newBadges.push('master_badge');

        return {
          ...prev,
          modules: modulesFromDb,
          points: totalPoints,
          badges: [...existingBadges, ...newBadges],
          certificateEarned: completedModules === 10,
        };
      });
    };

    loadFromDb();
  }, [user]);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(`dme_progress_${user.id}`, JSON.stringify(progress));
    }
  }, [progress, user]);

  const updateModuleProgress = (moduleId: string, updates: Partial<ModuleProgress>) => {
    setProgress(prev => {
      const moduleProgress = prev.modules[moduleId] || {
        moduleId,
        videoWatched: false,
        gameCompleted: false,
        quizCompleted: false,
        score: 0
      };

      const updatedModule = { ...moduleProgress, ...updates };

      // Check if module is now complete
      const isComplete = updatedModule.videoWatched && 
                        updatedModule.gameCompleted && 
                        updatedModule.quizCompleted;

      if (isComplete && !moduleProgress.completedAt) {
        updatedModule.completedAt = new Date().toISOString();
      }

      const newProgress = {
        ...prev,
        modules: {
          ...prev.modules,
          [moduleId]: updatedModule
        }
      };

      // Calculate points and badges
      let totalPoints = 0;
      const newBadges: string[] = [];
      let completedModules = 0;

      Object.values(newProgress.modules).forEach(module => {
        if (module.completedAt) {
          completedModules++;
          totalPoints += 100; // Base points per module
          totalPoints += module.score; // Quiz score bonus
          
          // Add module-specific badge
          if (!prev.badges.includes(`${module.moduleId}_badge`)) {
            newBadges.push(`${module.moduleId}_badge`);
          }
        }
      });

      // Milestone badges
      if (completedModules >= 3 && !prev.badges.includes('progress_badge')) {
        newBadges.push('progress_badge');
      }
      if (completedModules >= 7 && !prev.badges.includes('advanced_badge')) {
        newBadges.push('advanced_badge');
      }
      if (completedModules === 10 && !prev.badges.includes('master_badge')) {
        newBadges.push('master_badge');
      }

      newProgress.points = totalPoints;
      newProgress.badges = [...prev.badges, ...newBadges];
      newProgress.certificateEarned = completedModules === 10;

      return newProgress;
    });
  };

  const canAccessModule = (moduleId: string): boolean => {
    const moduleNumber = parseInt(moduleId);
    if (moduleNumber === 1) return true;

    // If this module itself is completed, always allow access
    const thisModule = progress.modules[moduleId];
    if (thisModule?.completedAt) return true;

    // Check if ANY previous module is completed and directly unlock the next one
    for (let i = 1; i < moduleNumber; i++) {
      const prevModule = progress.modules[i.toString()];
      if (prevModule?.completedAt && i === moduleNumber - 1) {
        return true; // unlock next module permanently
      }
    }

    return false;
  };

  const getModuleProgress = (moduleId: string): ModuleProgress | null => {
    return progress.modules[moduleId] || null;
  };

  const getCompletedModulesCount = (): number => {
    return Object.values(progress.modules).filter(m => m.completedAt).length;
  };

  return {
    progress,
    updateModuleProgress,
    canAccessModule,
    getModuleProgress,
    getCompletedModulesCount
  };
};