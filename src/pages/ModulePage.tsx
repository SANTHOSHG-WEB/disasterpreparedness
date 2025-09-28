import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useProgress } from '../hooks/useProgress';
import { modules } from '../data/modules';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { ArrowLeft, Play, Pause, CheckCircle, Lock } from 'lucide-react';
import VideoPlayer from '../components/VideoPlayer';
import GameComponent from '../components/GameComponent';
import QuizComponent from '../components/QuizComponent';
import { useToast } from '../hooks/use-toast';
import { useEnrollment } from '../hooks/useEnrollment';

const ModulePage = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { canAccessModule, getModuleProgress, updateModuleProgress } = useProgress();
  const { toast } = useToast();
  const { isEnrolledIn, enrollInModule, completeModule } = useEnrollment();

  const [currentStage, setCurrentStage] = useState<'video' | 'game' | 'quiz'>('video');
  const [videoWatchPercentage, setVideoWatchPercentage] = useState(0);

  const module = modules.find(m => m.id === moduleId);
  const moduleProgress = getModuleProgress(moduleId || '');
  const canAccess = canAccessModule(moduleId || '');

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: { pathname: `/module/${moduleId}` } } });
      return;
    }

    if (!canAccess) {
      toast({
        title: "Module Locked",
        description: "Complete previous modules to unlock this one.",
        variant: "destructive",
      });
      navigate('/learning');
      return;
    }
  }, [user, canAccess, moduleId, navigate, toast]);

  // Ensure enrollment record exists in DB for this module
  useEffect(() => {
    if (!user || !moduleId) return;
    if (!isEnrolledIn(moduleId)) {
      enrollInModule(moduleId);
    }
  }, [user, moduleId, isEnrolledIn, enrollInModule]);

  if (!module || !user || !canAccess) {
    return null;
  }

  const handleVideoProgress = (percentage: number) => {
    setVideoWatchPercentage(percentage);
    
    // Consider video "watched" at 95% completion
    if (percentage >= 95 && !moduleProgress?.videoWatched) {
      updateModuleProgress(moduleId!, { videoWatched: true });
      // Only show toast once per module
      const hasShownToast = sessionStorage.getItem(`video_toast_${moduleId}`);
      if (!hasShownToast) {
        toast({
          title: "Video Complete!",
          description: "Game unlocked. Great job!",
        });
        sessionStorage.setItem(`video_toast_${moduleId}`, 'true');
      }
      setCurrentStage('game');
    }
  };

  const handleGameComplete = (score: number) => {
    updateModuleProgress(moduleId!, { gameCompleted: true });
    
    // Only show toast once per module
    const hasShownToast = sessionStorage.getItem(`game_toast_${moduleId}`);
    if (!hasShownToast) {
      toast({
        title: "Game Complete!",
        description: "Quiz unlocked. You're doing great!",
      });
      sessionStorage.setItem(`game_toast_${moduleId}`, 'true');
    }
    
    // Automatically switch to quiz stage for Module 8 and others
    setCurrentStage('quiz');
  };

  const handleQuizComplete = async (score: number) => {
    updateModuleProgress(moduleId!, { quizCompleted: true, score });
    // Persist completion in database
    await completeModule(moduleId!);

    toast({
      title: "Module Complete!",
      description: `You earned ${score} points! Moving to next module...`,
    });
    
    // Navigate to next module or back to learning
    const nextModuleId = (parseInt(moduleId!) + 1).toString();
    const nextModule = modules.find(m => m.id === nextModuleId);
    
    setTimeout(() => {
      if (nextModule) {
        navigate(`/module/${nextModuleId}`);
      } else {
        navigate('/learning');
      }
    }, 2000);
  };

  const isVideoUnlocked = true;
  const isGameUnlocked = moduleProgress?.videoWatched || false;
  const isQuizUnlocked = moduleProgress?.gameCompleted || false;

  const getStageStatus = (stage: 'video' | 'game' | 'quiz') => {
    switch (stage) {
      case 'video':
        return moduleProgress?.videoWatched ? 'completed' : (isVideoUnlocked ? 'unlocked' : 'locked');
      case 'game':
        return moduleProgress?.gameCompleted ? 'completed' : (isGameUnlocked ? 'unlocked' : 'locked');
      case 'quiz':
        return moduleProgress?.quizCompleted ? 'completed' : (isQuizUnlocked ? 'unlocked' : 'locked');
    }
  };

  return (
    <div className="min-h-screen py-4 sm:py-8 px-2 sm:px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <Button
            onClick={() => navigate('/learning')}
            variant="outline"
            size="sm"
            className="glass border-glass-border shrink-0"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Learning
          </Button>
          
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-glass-foreground break-words">
              Module {module.id}: {module.title}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1 break-words">{module.description}</p>
          </div>
        </div>

        {/* Progress Stages */}
        <Card className="glass border-glass-border mb-6 sm:mb-8">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-glass-foreground">Learning Progress</h3>
              <Badge variant="outline" className="glass border-glass-border text-xs sm:text-sm">
                Duration: {module.duration}
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {[
                { key: 'video' as const, label: 'Video Lesson', icon: Play },
                { key: 'game' as const, label: 'Puzzle Game', icon: Play },
                { key: 'quiz' as const, label: 'Knowledge Quiz', icon: Play }
              ].map(({ key, label, icon: Icon }) => {
                const status = getStageStatus(key);
                const isActive = currentStage === key;
                
                return (
                  <button
                    key={key}
                    onClick={() => {
                      if (status === 'unlocked' || status === 'completed') {
                        setCurrentStage(key);
                      }
                    }}
                    disabled={status === 'locked'}
                    className={`p-3 sm:p-4 rounded-lg border transition-all ${
                      isActive
                        ? 'bg-primary/20 border-primary text-primary'
                        : status === 'completed'
                        ? 'bg-success/20 border-success text-success'
                        : status === 'unlocked'
                        ? 'glass border-glass-border text-glass-foreground hover:bg-glass/80'
                        : 'bg-muted/20 border-muted text-muted-foreground cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center justify-center mb-2">
                      {status === 'completed' ? (
                        <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6" />
                      ) : status === 'locked' ? (
                        <Lock className="h-5 w-5 sm:h-6 sm:w-6" />
                      ) : (
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                      )}
                    </div>
                    <div className="text-xs sm:text-sm font-medium">{label}</div>
                    <div className="text-xs mt-1">
                      {status === 'completed' ? 'Completed' : 
                       status === 'locked' ? 'Locked' : 
                       isActive ? 'Active' : 'Ready'}
                    </div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Card className="glass border-glass-border">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl text-glass-foreground">
              {currentStage === 'video' && 'Video Lesson'}
              {currentStage === 'game' && 'Interactive Game'}
              {currentStage === 'quiz' && 'Knowledge Quiz'}
            </CardTitle>
            <CardDescription className="text-sm sm:text-base text-muted-foreground">
              {currentStage === 'video' && 'Watch the lesson to unlock the game'}
              {currentStage === 'game' && 'Complete the game to unlock the quiz'}
              {currentStage === 'quiz' && 'Answer questions to complete the module'}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            {currentStage === 'video' && (
              <VideoPlayer
                videoId={module.videoId}
                onProgress={handleVideoProgress}
                watchPercentage={videoWatchPercentage}
              />
            )}
            
            {currentStage === 'game' && isGameUnlocked && (
              <GameComponent
                module={module}
                onComplete={handleGameComplete}
              />
            )}
            
            {currentStage === 'quiz' && isQuizUnlocked && (
              <QuizComponent
                questions={module.quizQuestions}
                onComplete={handleQuizComplete}
              />
            )}

            {/* Locked Content Messages */}
            {currentStage === 'game' && !isGameUnlocked && (
              <div className="text-center py-12">
                <Lock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-glass-foreground mb-2">
                  Game Locked
                </h3>
                <p className="text-muted-foreground">
                  Complete the video lesson to unlock the interactive game.
                </p>
              </div>
            )}

            {currentStage === 'quiz' && !isQuizUnlocked && (
              <div className="text-center py-12">
                <Lock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-glass-foreground mb-2">
                  Quiz Locked
                </h3>
                <p className="text-muted-foreground">
                  Complete the puzzle game to unlock the knowledge quiz.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Watch Progress (for video stage) */}
        {currentStage === 'video' && videoWatchPercentage > 0 && (
          <Card className="glass border-glass-border mt-4">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">Watch Progress:</span>
                <div className="flex-1">
                  <Progress value={videoWatchPercentage} className="progress-glow" />
                </div>
                <span className="text-sm font-medium text-glass-foreground">
                  {Math.round(videoWatchPercentage)}%
                </span>
              </div>
              {videoWatchPercentage >= 95 && (
                <p className="text-sm text-success mt-2">
                  ✓ Video completed! Game unlocked.
                </p>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ModulePage;