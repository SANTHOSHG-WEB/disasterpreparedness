import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useToast } from '../hooks/use-toast';
import { Calendar } from '../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';


const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, signup, isLoading } = useAuth();
  const { toast } = useToast();


  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const [signupForm, setSignupForm] = useState({
    email: '',
    password: '',
    full_name: '',
    age: '',
    birthday: undefined as Date | undefined,
    school_name: '',
    class_name: ''
  });

  const from = location.state?.from?.pathname || '/';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await login(loginForm.email, loginForm.password);
    
    if (!error) {
      toast({
        title: "Login Successful",
        description: "Welcome back to the platform!",
      });
      navigate(from, { replace: true });
    } else {
      toast({
        title: "Login Failed",
        description: error,
        variant: "destructive",
      });
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!signupForm.full_name.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter your full name.",
        variant: "destructive",
      });
      return;
    }

    if (!signupForm.school_name.trim()) {
      toast({
        title: "School Required",
        description: "Please enter your school/college name.",
        variant: "destructive",
      });
      return;
    }

    const profileData = {
      full_name: signupForm.full_name,
      age: signupForm.age ? parseInt(signupForm.age) : undefined,
      birthday: signupForm.birthday ? format(signupForm.birthday, 'yyyy-MM-dd') : undefined,
      school_name: signupForm.school_name,
      class_name: signupForm.class_name || undefined,
    };

    const { error } = await signup(signupForm.email, signupForm.password, profileData);
    
    if (!error) {
      toast({
        title: "Account Created Successfully",
        description: "Welcome to the platform!",
      });
      navigate('/');
    } else {
      toast({
        title: "Account Creation Failed",
        description: error,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-24">
      <div className="w-full max-w-md">
        <Card className="glass border-glass-border">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-glass-foreground">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 glass">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                      required
                      className="glass border-glass-border"
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                      required
                      className="glass border-glass-border"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary-dark"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div>
                    <Label htmlFor="signup-name">Full Name *</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      value={signupForm.full_name}
                      onChange={(e) => setSignupForm(prev => ({ ...prev, full_name: e.target.value }))}
                      required
                      className="glass border-glass-border"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        value={signupForm.age}
                        onChange={(e) => setSignupForm(prev => ({ ...prev, age: e.target.value }))}
                        className="glass border-glass-border"
                        placeholder="Age"
                        min="5"
                        max="100"
                      />
                    </div>
                    
                    <div>
                      <Label>Birthday</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full glass border-glass-border justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {signupForm.birthday ? format(signupForm.birthday, 'MMM dd') : 'Pick date'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 glass" align="start">
                          <Calendar
                            mode="single"
                            selected={signupForm.birthday}
                            onSelect={(date) => setSignupForm(prev => ({ ...prev, birthday: date }))}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="signup-email">Email *</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={signupForm.email}
                      onChange={(e) => setSignupForm(prev => ({ ...prev, email: e.target.value }))}
                      required
                      className="glass border-glass-border"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="signup-password">Password *</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      value={signupForm.password}
                      onChange={(e) => setSignupForm(prev => ({ ...prev, password: e.target.value }))}
                      required
                      className="glass border-glass-border"
                      minLength={6}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="school">School/College Name *</Label>
                    <Input
                      id="school"
                      type="text"
                      value={signupForm.school_name}
                      onChange={(e) => setSignupForm(prev => ({ ...prev, school_name: e.target.value }))}
                      required
                      placeholder="Enter your institution name"
                      className="glass border-glass-border"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="class">Class/Grade</Label>
                    <Input
                      id="class"
                      type="text"
                      value={signupForm.class_name}
                      onChange={(e) => setSignupForm(prev => ({ ...prev, class_name: e.target.value }))}
                      placeholder="e.g., 10th Grade, Class 12, BSc Year 1"
                      className="glass border-glass-border"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary-dark"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;