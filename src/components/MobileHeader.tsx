import React, { useState } from 'react';
import { Menu, X, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

const MobileHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();

  const handleSOSClick = () => {
    window.location.href = 'tel:100';
  };

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
    navigate('/');
  };

  const menuItems = [
    { path: '/admin', label: 'Admin Dashboard' },
    { path: '/about', label: 'About' },
    { path: '/certificate', label: 'Certificate' },
  ];

  return (
    <header className="glass fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-md border-b border-glass-border/30">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* User greeting or app title */}
          <div className="flex-1">
            {user && profile ? (
              <h2 className="text-sm font-medium text-glass-foreground">
                Hi, {profile.full_name?.split(' ')[0] || 'Student'}! 👋
              </h2>
            ) : (
              <h1 className="text-sm font-bold text-glass-foreground">
                Disaster Management
              </h1>
            )}
          </div>

          {/* SOS Button */}
          <button
            onClick={handleSOSClick}
            className="blink bg-emergency hover:bg-emergency/90 text-emergency-foreground 
                       px-3 py-2 rounded-lg font-bold text-xs transition-all duration-300 
                       hover:scale-105 touch-target mx-2"
            aria-label="SOS — call emergency"
          >
            🚨 SOS
          </button>

          {/* Menu Button */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="glass-hover p-2 rounded-lg touch-target"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5 text-glass-foreground" />
                ) : (
                  <Menu className="h-5 w-5 text-glass-foreground" />
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="glass border-glass-border">
              <div className="flex flex-col space-y-4 mt-8">
                {user && (
                  <div className="flex items-center space-x-3 pb-4 border-b border-glass-border">
                    <User className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-medium text-glass-foreground">
                        {profile?.full_name || user.email}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {profile?.school_name}
                      </p>
                    </div>
                  </div>
                )}
                
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg text-sm font-medium transition-colors glass-hover text-glass-foreground hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ))}

                {user ? (
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="mt-4 glass border-glass-border"
                  >
                    Logout
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      navigate('/login');
                      setIsMenuOpen(false);
                    }}
                    className="mt-4 bg-primary hover:bg-primary-dark"
                  >
                    Login
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;