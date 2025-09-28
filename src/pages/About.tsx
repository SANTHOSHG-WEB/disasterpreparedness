import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Shield, Users, BookOpen, Target, Globe, Award } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      title: "Interactive Learning",
      description: "Comprehensive 10-module course with videos, quizzes, and hands-on games for effective disaster preparedness education."
    },
    {
      icon: <Shield className="h-8 w-8 text-emergency" />,
      title: "Emergency Response",
      description: "Instant access to emergency contacts, SOS calling, and real-time disaster alerts for immediate assistance."
    },
    {
      icon: <Users className="h-8 w-8 text-accent" />,
      title: "School Integration",
      description: "Designed specifically for Indian schools and colleges with admin dashboards and progress tracking."
    },
    {
      icon: <Globe className="h-8 w-8 text-success" />,
      title: "Offline Access",
      description: "Progressive Web App (PWA) functionality allows learning and accessing emergency information without internet."
    }
  ];

  const stakeholders = [
    { name: "Students & Teachers", description: "Primary beneficiaries gaining disaster preparedness knowledge" },
    { name: "Schools & Colleges", description: "Educational institutions implementing disaster education programs" },
    { name: "Government Agencies", description: "NDMA and state disaster management authorities" },
    { name: "NGOs & Communities", description: "Local organizations promoting disaster awareness" }
  ];

  const outcomes = [
    "Improved disaster awareness among students and educational staff",
    "Better emergency response capabilities in educational institutions", 
    "Reduced casualties and damage during disaster events",
    "Enhanced community resilience and preparedness culture",
    "Standardized disaster education across Indian schools"
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-glass-foreground mb-4">
            About Disaster Management Education Platform
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Empowering Indian schools and colleges with comprehensive disaster preparedness education 
            through interactive learning, emergency tools, and real-time safety resources.
          </p>
        </div>

        {/* Problem Statement */}
        <Card className="glass border-glass-border mb-8">
          <CardHeader>
            <CardTitle className="text-glass-foreground flex items-center gap-2">
              <Target className="h-6 w-6 text-emergency" />
              The Challenge We Address
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              India faces significant vulnerability to natural disasters including earthquakes, floods, 
              cyclones, and landslides. Despite this high risk, disaster preparedness education in 
              schools remains inadequate, leaving students and educational communities unprepared 
              for emergency situations.
            </p>
            
            <div className="neumorphic p-6 rounded-lg space-y-3">
              <h4 className="font-semibold text-glass-foreground">Supporting Research:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>NDMA reports show low awareness levels in schools despite India's high disaster vulnerability index.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>UNDRR has recommended integrating disaster risk reduction in education policies (Ref: National Disaster Management Authority).</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Key Features */}
        <Card className="glass border-glass-border mb-8">
          <CardHeader>
            <CardTitle className="text-glass-foreground">Platform Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="neumorphic p-6 rounded-lg">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">{feature.icon}</div>
                    <div>
                      <h4 className="font-semibold text-glass-foreground mb-2">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Impact & Outcomes */}
        <Card className="glass border-glass-border mb-8">
          <CardHeader>
            <CardTitle className="text-glass-foreground flex items-center gap-2">
              <Award className="h-6 w-6 text-success" />
              Expected Impact & Outcomes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-glass-foreground mb-4">Key Outcomes</h4>
                <ul className="space-y-2">
                  {outcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-success text-lg">✓</span>
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-glass-foreground mb-4">Stakeholders</h4>
                <div className="space-y-3">
                  {stakeholders.map((stakeholder, index) => (
                    <div key={index} className="neumorphic-inset p-3 rounded-lg">
                      <h5 className="font-medium text-glass-foreground text-sm">{stakeholder.name}</h5>
                      <p className="text-xs text-muted-foreground mt-1">{stakeholder.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technology & Accessibility */}
        <Card className="glass border-glass-border mb-8">
          <CardHeader>
            <CardTitle className="text-glass-foreground">Technology & Accessibility</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-glass-foreground mb-4">Technical Features</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Progressive Web App (PWA) for offline functionality</li>
                  <li>• Responsive design for desktop, tablet, and mobile devices</li>
                  <li>• Embedded video lessons with progress tracking</li>
                  <li>• Interactive games and quizzes with immediate feedback</li>
                  <li>• Real-time emergency contact integration</li>
                  <li>• Location-based shelter and weather information</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-glass-foreground mb-4">Accessibility</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• ARIA labels and keyboard navigation support</li>
                  <li>• High contrast design for visual accessibility</li>
                  <li>• Touch-friendly interface for mobile devices</li>
                  <li>• Offline capability for areas with limited connectivity</li>
                  <li>• Multi-language support (English/Hindi)</li>
                  <li>• Screen reader compatible</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Data Protection */}
        <Card className="glass border-glass-border">
          <CardHeader>
            <CardTitle className="text-glass-foreground">Privacy & Data Protection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              We are committed to protecting user privacy and maintaining data security. Our platform 
              collects only essential information required for educational progress tracking and emergency services.
            </p>
            
            <div className="neumorphic p-4 rounded-lg">
              <h4 className="font-medium text-glass-foreground mb-2">Data Collection & Usage:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Educational progress and completion status</li>
                <li>• School/college affiliation for institutional reporting</li>
                <li>• Emergency contact preferences and location (with consent)</li>
                <li>• No personal data sharing with third parties</li>
                <li>• Secure authentication and encrypted data storage</li>
                <li>• Right to data deletion and account removal</li>
              </ul>
            </div>
            
            <p className="text-sm text-muted-foreground">
              For complete privacy policy details, data retention periods, and opt-out procedures, 
              please contact our support team or review our detailed privacy documentation.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;