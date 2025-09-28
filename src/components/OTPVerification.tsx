import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { useToast } from '../hooks/use-toast';

interface OTPVerificationProps {
  email: string;
  onVerified: () => void;
  onBack: () => void;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({ email, onVerified, onBack }) => {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const { toast } = useToast();

  useEffect(() => {
    // Countdown timer for resend OTP
    const timer = countdown > 0 && setInterval(() => setCountdown(countdown - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a 6-digit OTP.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate OTP verification (replace with actual API call)
    setTimeout(() => {
      if (otp === '123456') { // Demo OTP
        toast({
          title: "Verification Successful",
          description: "Your account has been verified!",
        });
        onVerified();
      } else {
        toast({
          title: "Invalid OTP",
          description: "Please check your OTP and try again.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleResendOTP = async () => {
    if (countdown > 0) return;
    
    setCountdown(60);
    toast({
      title: "OTP Sent",
      description: "A new OTP has been sent to your email.",
    });
  };

  return (
    <Card className="glass border-glass-border w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-xl text-glass-foreground">
          Verify Your Email
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          We've sent a 6-digit code to {email}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="otp">Enter OTP</Label>
          <Input
            id="otp"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
            placeholder="123456"
            className="glass border-glass-border text-center text-lg tracking-wider"
            maxLength={6}
          />
          <p className="text-xs text-muted-foreground mt-2 text-center">
            For demo, use: 123456
          </p>
        </div>

        <Button
          onClick={handleVerifyOTP}
          className="w-full bg-primary hover:bg-primary-dark"
          disabled={isLoading || otp.length !== 6}
        >
          {isLoading ? 'Verifying...' : 'Verify OTP'}
        </Button>

        <div className="text-center space-y-2">
          <Button
            variant="ghost"
            onClick={handleResendOTP}
            disabled={countdown > 0}
            className="text-sm text-muted-foreground hover:text-primary"
          >
            {countdown > 0 ? `Resend OTP in ${countdown}s` : 'Resend OTP'}
          </Button>
          
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-sm text-muted-foreground hover:text-primary"
          >
            Back to Sign Up
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OTPVerification;