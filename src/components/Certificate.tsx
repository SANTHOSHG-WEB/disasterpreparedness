import React, { useRef, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useProgress } from '../hooks/useProgress';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Award, Download, Calendar, User, GraduationCap } from 'lucide-react';
import { format } from 'date-fns';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useToast } from '../hooks/use-toast';

const Certificate = () => {
  const { user, profile } = useAuth();
  const { progress } = useProgress();
  const { toast } = useToast();
  const certificateRef = useRef<HTMLDivElement>(null);

  const downloadCertificate = async () => {
    if (!certificateRef.current) return;

    try {
      toast({
        title: "Generating Certificate",
        description: "Please wait while we create your PDF certificate...",
      });

      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        width: 1200,
        height: 800,
        useCORS: true,
        allowTaint: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      
      const fileName = `disaster-preparedness-certificate-${profile?.full_name?.replace(/\s+/g, '-') || 'student'}.pdf`;
      pdf.save(fileName);

      toast({
        title: "Certificate Downloaded!",
        description: "Your certificate has been saved successfully.",
      });
    } catch (error) {
      console.error('Error generating certificate:', error);
      toast({
        title: "Download Failed",
        description: "There was an error generating your certificate. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!progress.certificateEarned) {
    return (
      <div className="min-h-screen py-8 px-4 flex items-center justify-center">
        <Card className="glass border-glass-border max-w-md">
          <CardContent className="p-8 text-center">
            <Award className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-bold text-glass-foreground mb-2">
              Certificate Not Available
            </h2>
            <p className="text-muted-foreground">
              Complete all modules to earn your certificate.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-glass-foreground mb-4">
            Your Certificate
          </h1>
          <Button
            onClick={downloadCertificate}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3"
          >
            <Download className="mr-2 h-5 w-5" />
            Download Certificate PDF
          </Button>
        </div>

        {/* Certificate */}
        <div className="flex justify-center">
          <div
            ref={certificateRef}
            className="bg-white p-12 rounded-lg shadow-2xl max-w-4xl w-full"
            style={{ aspectRatio: '1.4/1' }}
          >
            <div className="text-center space-y-6">
              {/* Header */}
              <div className="border-b-2 border-blue-600 pb-6">
                <h1 className="text-4xl font-bold text-blue-800 mb-2">
                  Certificate of Completion
                </h1>
                <p className="text-lg text-gray-600">
                  Disaster Preparedness Basics
                </p>
              </div>

              {/* Body */}
              <div className="space-y-8">
                <div className="flex justify-center">
                  <Award className="h-24 w-24 text-yellow-500" />
                </div>

                <div className="space-y-4">
                  <p className="text-lg text-gray-700">
                    This is to certify that
                  </p>
                  
                  <div className="text-4xl font-bold text-gray-800 py-4 border-b border-gray-300">
                    {profile?.full_name || user?.email}
                  </div>

                  <p className="text-lg text-gray-700">
                    has successfully completed the comprehensive course on
                  </p>

                  <h2 className="text-2xl font-bold text-blue-800">
                    Disaster Management and Emergency Preparedness
                  </h2>

                  <p className="text-gray-600">
                    demonstrating proficiency in disaster preparedness, 
                    emergency response procedures, and safety protocols
                  </p>
                </div>

                {/* Stats */}
                <div className="flex justify-center gap-8 py-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">10</div>
                    <div className="text-sm text-gray-600">Modules</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{progress.points}</div>
                    <div className="text-sm text-gray-600">Points</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{progress.badges.length}</div>
                    <div className="text-sm text-gray-600">Badges</div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-end pt-8">
                  <div className="text-left">
                    <div className="border-t border-gray-400 pt-2 w-48">
                      <p className="text-sm text-gray-600">Date of Completion</p>
                      <p className="font-semibold">
                        {format(new Date(), 'MMMM dd, yyyy')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <GraduationCap className="h-16 w-16 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      Disaster Management Education Platform
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <div className="border-t border-gray-400 pt-2 w-48">
                      <p className="text-sm text-gray-600">Certificate ID</p>
                      <p className="font-semibold text-xs">
                        DM-{user?.id?.slice(0, 8).toUpperCase()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;