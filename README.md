# Disaster Management Education Platform

A comprehensive disaster preparedness education platform designed for Indian schools and colleges, featuring glassmorphism + neumorphism design aesthetics with blue gradient themes.

## 🚀 Features Implemented

### Core Platform
- **Responsive Design**: Mobile-first approach with glassmorphism + neumorphism cards
- **PWA Ready**: Offline-capable with manifest.json for app-like experience
- **Blue Theme**: Deep blue gradients with glass effects throughout

### Authentication & Access
- **Google Sign-in**: OAuth integration ready
- **Email/Password**: Traditional authentication
- **School Registration**: Required school/college name during signup
- **Protected Routes**: Admin dashboard and learning content require authentication

### Learning System
- **10 Module Course**: Disaster Preparedness Basics with YouTube video integration
- **Sequential Unlocking**: Modules unlock as previous ones are completed
- **Three-Stage Flow**: Video → Game → Quiz for each module
- **Video Tracking**: 95% watch completion required to unlock games
- **Interactive Games**: 4 types - drag-drop, maze, spot-hazard, memory-match
- **Knowledge Quizzes**: Immediate feedback with explanations
- **Progress Tracking**: Points, badges, and completion certificates

### Emergency Features
- **SOS Button**: Blinking emergency button calling tel:100
- **Emergency Contacts**: India-specific disaster management contacts
- **Export Functionality**: CSV download for offline contact access
- **AI Chatbot**: Disaster safety assistant with NDMA guidelines

### Technical Implementation
- **React + TypeScript**: Modern React with full type safety
- **Glassmorphism CSS**: Custom design system with glass effects
- **Local Storage**: Offline progress tracking with sync capability
- **YouTube Integration**: Embedded videos with progress tracking
- **Responsive Navigation**: Hamburger menu on mobile

## 🎮 Module Structure

Each of the 10 modules includes:
1. **Video Lesson** (5-10 minutes) - Embedded YouTube content
2. **Interactive Game** - Topic-specific puzzle/activity  
3. **Knowledge Quiz** - 3-7 questions with immediate feedback

Modules cover: Introduction, Earthquakes, Floods, Fire Safety, Landslides, Hurricanes, Forest Fires, and Conclusion.

## 🔧 Backend Integration Notes

**Current State**: Frontend-complete with mock authentication
**Supabase Ready**: All progress tracking and authentication hooks prepared for backend integration

### To Enable Full Backend:
1. Connect Supabase project
2. Set up authentication providers
3. Configure progress sync endpoints
4. Enable real-time admin dashboard data

## 📱 PWA Capabilities

- **Offline Contacts**: Emergency numbers accessible without internet
- **Installable**: Can be installed as native app on mobile devices
- **Progress Persistence**: Local storage ensures no learning progress lost
- **Touch Optimized**: 44px minimum touch targets for mobile use

## 🎨 Design System

The platform uses a comprehensive design system with:
- **Glassmorphism**: Semi-transparent cards with backdrop blur
- **Neumorphism**: Soft shadows and depth for interactive elements
- **Blue Gradients**: Primary theme with emergency red accents
- **Responsive**: Mobile-first design scaling to desktop
- **Accessibility**: ARIA labels and keyboard navigation support

## 🚨 Emergency Integration

Platform includes comprehensive emergency preparedness:
- One-click emergency calling
- State disaster management office contacts
- Tribal Welfare Department contacts for specific states
- CSV export for offline emergency access
- AI assistant for immediate disaster guidance

This platform provides a complete disaster management education solution specifically designed for Indian educational institutions with both online and offline capabilities.