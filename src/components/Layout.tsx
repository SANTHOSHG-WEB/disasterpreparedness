import React from 'react';
import Header from './Header';
import MobileHeader from './MobileHeader';
import MobileNavigation from './MobileNavigation';
import Footer from './Footer';
import AIChat from './AIChat';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Mobile Header */}
      <div className="md:hidden">
        <MobileHeader />
      </div>
      
      {/* Desktop Header */}
      <div className="hidden md:block">
        <Header />
      </div>
      
      <main className="flex-1 pt-16 pb-20 md:pt-32 md:pb-8">
        {children}
      </main>
      
      {/* Mobile Navigation */}
      <MobileNavigation />
      
      {/* Desktop Footer - Hidden on mobile */}
      <div className="hidden md:block">
        <Footer />
      </div>
      
      <AIChat />
    </div>
  );
};

export default Layout;