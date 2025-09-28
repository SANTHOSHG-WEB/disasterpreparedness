import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, MapPin, Phone, AlertTriangle } from 'lucide-react';

const MobileNavigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/learning', icon: BookOpen, label: 'Learning' },
    { path: '/map', icon: MapPin, label: 'Map' },
    { path: '/emergency-contacts', icon: Phone, label: 'Contact' },
    { path: '/weather', icon: AlertTriangle, label: 'Alert' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 glass border-t border-glass-border/30 z-50">
      <div className="flex items-center justify-around py-2 px-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors touch-target ${
                isActive
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              <item.icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNavigation;