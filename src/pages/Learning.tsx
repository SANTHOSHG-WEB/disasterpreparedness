import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useProgress } from '../hooks/useProgress';
import { modules } from '../data/modules';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Lock, CheckCircle, Play, Star, Award, BookOpen, Users, Clock, Video, Download } from 'lucide-react';

const Learning = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const { progress, canAccessModule, getModuleProgress, getCompletedModulesCount } = useProgress();

  const handleEnrollClick = () => {
    if (!user) {
      navigate('/login', { state: { from: { pathname: '/learning' } } });
      return;
    }
    // User is already authenticated, proceed to first module
    navigate('/module/1');
  };

  const completedModules = getCompletedModulesCount();
  const progressPercentage = (completedModules / modules.length) * 100;

  const handleModuleClick = (moduleId: string) => {
    if (canAccessModule(moduleId)) {
      navigate(`/module/${moduleId}`);
    }
  };

  const handleCertificateClick = () => {
    navigate('/certificate');
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Greeting */}
        {user && (
          <div className="mb-4 text-center">
            <p className="text-lg text-glass-foreground">Hi, {profile?.full_name || user.email}</p>
          </div>
        )}

        {/* Course Hero Section */}
        <div className="text-center mb-12">
          <div className="relative mb-8 rounded-2xl overflow-hidden max-w-4xl mx-auto">
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative z-10 text-center space-y-4">
                <Video className="h-20 w-20 text-primary mx-auto" />
                <h1 className="text-3xl md:text-5xl font-bold text-glass-foreground">
                  Disaster Preparedness Basics
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
                  Master essential disaster management skills through interactive learning with videos, games, and quizzes
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>10 Modules</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Video className="h-4 w-4" />
                    <span>Video Lessons</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>Interactive Games</span>
                  </div>
                </div>
                {!user && (
                  <Button 
                    onClick={handleEnrollClick}
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3"
                  >
                    Enroll Now - Start Learning
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Progress Overview - Only show if user is logged in */}
          {user && (
            <Card className="glass border-glass-border max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2 text-glass-foreground">
                  <BookOpen className="h-6 w-6" />
                  Your Progress
                </CardTitle>
              </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Modules Completed</span>
                  <span className="text-glass-foreground font-semibold">
                    {completedModules} / {modules.length}
                  </span>
                </div>
                <Progress value={progressPercentage} className="progress-glow" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 neumorphic-inset rounded-lg">
                  <div className="text-2xl font-bold text-primary">{progress.points}</div>
                  <div className="text-sm text-muted-foreground">Total Points</div>
                </div>
                <div className="text-center p-4 neumorphic-inset rounded-lg">
                  <div className="text-2xl font-bold text-accent">{progress.badges.length}</div>
                  <div className="text-sm text-muted-foreground">Badges Earned</div>
                </div>
                <div className="text-center p-4 neumorphic-inset rounded-lg">
                  <div className="text-2xl font-bold text-success">
                    {progress.certificateEarned ? '1' : '0'}
                  </div>
                  <div className="text-sm text-muted-foreground">Certificate</div>
                </div>
              </div>

              {progress.certificateEarned && (
                <Button
                  onClick={handleCertificateClick}
                  className="w-full bg-success hover:bg-success/90 text-success-foreground"
                >
                  <Award className="mr-2 h-4 w-4" />
                  View Your Certificate
                </Button>
              )}
            </CardContent>
            </Card>
          )}
        </div>

        {/* Modules Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-glass-foreground">Course Modules</h2>
            {!user && (
              <Button onClick={handleEnrollClick} variant="outline" className="glass border-glass-border">
                Login to Start
              </Button>
            )}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => {
            const moduleProgress = getModuleProgress(module.id);
            const isAccessible = canAccessModule(module.id);
            const isCompleted = moduleProgress?.completedAt;
            const moduleNumber = parseInt(module.id);

            return (
              <Card
                key={module.id}
                className={`glass border-glass-border transition-all duration-300 ${
                  user && isAccessible ? 'glass-hover cursor-pointer' : !user ? 'opacity-80' : 'opacity-60'
                }`}
                onClick={() => user && isAccessible ? handleModuleClick(module.id) : !user ? handleEnrollClick() : null}
              >
                <CardHeader className="relative">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="glass border-glass-border">
                          Module {moduleNumber}
                        </Badge>
                        {isCompleted && (
                          <CheckCircle className="h-5 w-5 text-success" />
                        )}
                        {!user ? (
                          <Lock className="h-5 w-5 text-muted-foreground" />
                        ) : !isAccessible ? (
                          <Lock className="h-5 w-5 text-muted-foreground" />
                        ) : null}
                      </div>
                      <CardTitle className="text-xl text-glass-foreground">
                        {module.title}
                      </CardTitle>
                    </div>
                    
                    {moduleProgress?.score && (
                      <div className="flex items-center gap-1 text-warning">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-sm font-medium">{moduleProgress.score}</span>
                      </div>
                    )}
                  </div>
                  
                  <CardDescription className="text-muted-foreground">
                    {module.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Duration: {module.duration}</span>
                    {!user ? (
                      <div className="flex items-center gap-1 text-primary">
                        <Play className="h-4 w-4" />
                        <span>Enroll to Start</span>
                      </div>
                    ) : isAccessible ? (
                      <div className="flex items-center gap-1 text-primary">
                        <Play className="h-4 w-4" />
                        <span>Start Learning</span>
                      </div>
                    ) : null}
                  </div>

                  {/* Progress indicators */}
                  {user && isAccessible && (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <div className={`h-2 flex-1 rounded ${
                          moduleProgress?.videoWatched ? 'bg-primary' : 'bg-muted'
                        }`} />
                        <div className={`h-2 flex-1 rounded ${
                          moduleProgress?.gameCompleted ? 'bg-accent' : 'bg-muted'
                        }`} />
                        <div className={`h-2 flex-1 rounded ${
                          moduleProgress?.quizCompleted ? 'bg-success' : 'bg-muted'
                        }`} />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Video</span>
                        <span>Game</span>
                        <span>Quiz</span>
                      </div>
                    </div>
                  )}

                  {!user ? (
                    <div className="text-sm text-primary">
                      Login to start learning
                    </div>
                  ) : !isAccessible && moduleNumber > 1 ? (
                    <div className="text-sm text-muted-foreground">
                      Complete Module {moduleNumber - 1} to unlock
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            );
          })}
        </div>

        </div>

        {/* Post-Module 10 Certification Box */}
        {user && completedModules >= 10 && (
          <div className="mt-12 text-center">
            <Card className="glass border-glass-border max-w-2xl mx-auto border-l-4 border-primary">
              <CardContent className="p-8">
                <Award className="h-16 w-16 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-glass-foreground mb-2">
                  🎓 Complete all modules and unlock your certification.
                </h2>
                {!progress.certificateEarned ? (
                  <>
                    <p className="text-muted-foreground mb-6">
                      You've completed all 10 modules! Your certificate is being prepared and will be available shortly.
                    </p>
                    <div className="animate-pulse">
                      <div className="h-2 bg-primary/20 rounded-full mb-2"></div>
                      <p className="text-sm text-primary">Generating certificate...</p>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-muted-foreground mb-6">
                      Congratulations! Your certificate is ready for download.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button
                        onClick={handleCertificateClick}
                        size="lg"
                        className="bg-success hover:bg-success/90 text-success-foreground"
                      >
                        <Award className="mr-2 h-4 w-4" />
                        View Certificate
                      </Button>
                      <Button
                        onClick={handleCertificateClick}
                        variant="outline"
                        size="lg"
                        className="glass border-glass-border"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Course Completion Message */}
        {user && progress.certificateEarned && (
          <div className="mt-12 text-center">
            <Card className="glass border-glass-border max-w-2xl mx-auto">
              <CardContent className="p-8">
                <Award className="h-16 w-16 text-success mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-glass-foreground mb-2">
                  Congratulations!
                </h2>
                <p className="text-muted-foreground mb-6">
                  You have successfully completed the Disaster Preparedness Basics course. 
                  You are now better equipped to handle emergency situations and help others stay safe.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={handleCertificateClick}
                    size="lg"
                    className="bg-success hover:bg-success/90 text-success-foreground"
                  >
                    <Award className="mr-2 h-4 w-4" />
                    View Certificate
                  </Button>
                  <Button
                    onClick={handleCertificateClick}
                    variant="outline"
                    size="lg"
                    className="glass border-glass-border"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Learning;