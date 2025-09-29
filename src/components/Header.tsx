import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { path: '/', label: t('dashboard') },
    { path: '/admin', label: t('admin.dashboard') },
    { path: '/learning', label: t('learning') },
    { path: '/map', label: t('map') },
    { path: '/emergency-contacts', label: t('emergency') },
    { path: '/weather', label: t('weather') },
    { path: '/about', label: t('about') },
  ];

  const handleSOSClick = () => {
    window.location.href = 'tel:100';
  };

  return (
    <header className="glass fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-md border-b border-glass-border/30">
      {/* First Row: Platform Title and SOS */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
           <h1 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-glass-foreground leading-tight">
             Disaster Management Education Platform
           </h1>
           <button
             onClick={handleSOSClick}
             className="blink bg-emergency hover:bg-emergency/90 text-emergency-foreground 
                        px-2 py-2 sm:px-3 md:px-4 md:py-2 rounded-lg font-bold text-xs sm:text-sm md:text-base 
                        transition-all duration-300 hover:scale-105 touch-target shrink-0
                        shadow-lg hover:shadow-xl"
             aria-label="SOS — call emergency"
           >
             🚨 <span className="hidden xs:inline">SOS</span>
           </button>
        </div>
      </div>

      {/* Second Row: Navigation */}
      <div className="border-t border-glass-border/30">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-accent glass-hover px-3 py-2 rounded-lg ${
                    location.pathname === item.path
                      ? 'text-accent bg-glass/50'
                      : 'text-glass-foreground'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Language Switcher */}
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center gap-2 md:hidden">
              <LanguageSwitcher />
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="glass-hover p-2 rounded-lg touch-target"
                aria-label="Toggle navigation menu"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6 text-glass-foreground" />
                ) : (
                  <Menu className="h-6 w-6 text-glass-foreground" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden glass border-t border-glass-border animate-slide-in">
          <div className="container mx-auto px-4 py-4">
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors glass-hover ${
                    location.pathname === item.path
                      ? 'text-accent bg-glass/50'
                      : 'text-glass-foreground hover:text-accent'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;