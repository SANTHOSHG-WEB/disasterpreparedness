import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'hi' | 'pa' | 'ta';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  translateText: (text: string) => Promise<string>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Common
    'loading': 'Loading...',
    'save': 'Save',
    'cancel': 'Cancel',
    'submit': 'Submit',
    'edit': 'Edit',
    'delete': 'Delete',
    'close': 'Close',
    'back': 'Back',
    'next': 'Next',
    'previous': 'Previous',
    'yes': 'Yes',
    'no': 'No',
    'search': 'Search',
    'call': 'Call',
    'capacity': 'Capacity',
    
    // Navigation
    'dashboard': 'Dashboard',
    'learning': 'Learning',
    'map': 'Map',
    'weather': 'Weather',
    'emergency': 'Emergency Contacts',
    'about': 'About',
    'login': 'Login',
    'logout': 'Logout',
    'admin.portal': 'Admin Portal',
    
    // Home Page
    'home.hero.badge': 'Disaster Management Education',
    'home.hero.title.learn': 'Learn. Prepare.',
    'home.hero.title.safe': 'Stay Safe.',
    'home.hero.subtitle': 'Comprehensive disaster preparedness education platform designed for schools and colleges across India. Master essential safety skills through interactive learning.',
    'home.enroll.now': 'Enroll Now',
    'home.learn.more': 'Learn More',
    'home.course.title': 'Disaster Preparedness Basics',
    'home.course.subtitle': 'Master essential disaster management skills through our comprehensive course',
    'home.what.learn': 'What you\'ll learn:',
    'home.earthquake': 'Earthquake safety and response procedures',
    'home.flood': 'Flood preparedness and evacuation',
    'home.fire': 'Fire safety and emergency protocols',
    'home.natural.disaster': 'Natural disaster response strategies',
    'home.modules': 'Modules',
    'home.video.lessons': 'Video Lessons',
    'home.games': 'Interactive Games',
    'home.quizzes': 'Quizzes',
    'home.certificate': 'Certificate',
    'home.course.format': 'Course Format',
    'home.format.desc': 'Each module includes a video lesson, interactive puzzle game, and knowledge quiz. Complete all modules to earn your certification.',
    'home.duration': 'Duration',
    'home.duration.desc': '5-10 minutes per module. Complete at your own pace with progress saved automatically.',
    'home.features': 'Platform Features',
    'home.features.subtitle': 'Everything you need for comprehensive disaster preparedness education',
    'home.feature.interactive': 'Interactive Learning',
    'home.feature.interactive.desc': '10 comprehensive modules with videos, puzzles, and quizzes',
    'home.feature.emergency': 'Emergency Ready',
    'home.feature.emergency.desc': 'Real-time SOS, emergency contacts, and weather alerts',
    'home.feature.school': 'School-Focused',
    'home.feature.school.desc': 'Designed specifically for Indian schools and colleges',
    'home.feature.gamified': 'Gamified Experience',
    'home.feature.gamified.desc': 'Earn points, badges, and certificates as you learn',
    'home.profile.complete': 'Complete Your Profile',
    'home.profile.subtitle': 'Please provide your details to enroll in the course',
    'home.full.name': 'Full Name',
    'home.age': 'Age',
    'home.birthday': 'Birthday',
    'home.school.name': 'School/College Name',
    'home.class.grade': 'Class/Grade',
    'home.required.fields': 'Required Fields Missing',
    'home.required.msg': 'Please fill in your name and school.',
    'home.profile.failed': 'Profile Update Failed',
    'home.pick.date': 'Pick date',
    'home.enter.name': 'Enter your full name',
    'home.enter.school': 'Enter your institution name',
    'home.class.placeholder': 'e.g., 10th Grade, Class 12, BSc Year 1',
    
    // Admin Dashboard
    'admin.dashboard': 'Admin Dashboard',
    'admin.institute': 'Safety Institute Management System',
    'admin.active.students': 'Active Students',
    'admin.completed.modules': 'Completed Modules',
    'admin.badges.earned': 'Badges Earned',
    'admin.drill.participation': 'Drill Participation',
    'admin.manage.students': 'Manage Students',
    'admin.view.reports': 'View Reports',
    'admin.dashboard.loading': 'Loading dashboard...',
    
    // Authentication
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.login': 'Login',
    'auth.signup': 'Sign Up',
    'auth.forgot.password': 'Forgot Password?',
    'auth.remember.me': 'Remember me',
    
    // Learning
    'learning.modules': 'Learning Modules',
    'learning.progress': 'Progress',
    'learning.certificate': 'Certificate',
    'learning.start': 'Start Learning',
    'learning.continue': 'Continue',
    'learning.completed': 'Completed',
    
    // Module Page
    'module.back.learning': 'Back to Learning',
    'module.learning.progress': 'Learning Progress',
    'module.duration': 'Duration',
    'module.video.lesson': 'Video Lesson',
    'module.puzzle.game': 'Puzzle Game',
    'module.knowledge.quiz': 'Knowledge Quiz',
    'module.completed': 'Completed',
    'module.locked': 'Locked',
    'module.active': 'Active',
    'module.ready': 'Ready',
    'module.interactive.game': 'Interactive Game',
    'module.watch.unlock': 'Watch the lesson to unlock the game',
    'module.complete.unlock': 'Complete the game to unlock the quiz',
    'module.answer.complete': 'Answer questions to complete the module',
    'module.game.locked': 'Game Locked',
    'module.game.locked.msg': 'Complete the video lesson to unlock the interactive game.',
    'module.quiz.locked': 'Quiz Locked',
    'module.quiz.locked.msg': 'Complete the puzzle game to unlock the knowledge quiz.',
    'module.watch.progress': 'Watch Progress:',
    'module.video.complete': '✓ Video completed! Game unlocked.',
    'module.video.complete.toast': 'Video Complete!',
    'module.game.unlocked': 'Game unlocked. Great job!',
    'module.game.complete.toast': 'Game Complete!',
    'module.quiz.unlocked': 'Quiz unlocked. You\'re doing great!',
    'module.complete.toast': 'Module Complete!',
    'module.earned.points': 'You earned {score} points! Moving to next module...',
    'module.access.denied': 'Module Locked',
    'module.complete.previous': 'Complete previous modules to unlock this one.',
    
    // About Page
    'about.title': 'About Disaster Management Education Platform',
    'about.subtitle': 'Empowering Indian schools and colleges with comprehensive disaster preparedness education through interactive learning, emergency tools, and real-time safety resources.',
    'about.challenge': 'The Challenge We Address',
    'about.challenge.desc': 'India faces significant vulnerability to natural disasters including earthquakes, floods, cyclones, and landslides. Despite this high risk, disaster preparedness education in schools remains inadequate, leaving students and educational communities unprepared for emergency situations.',
    'about.research': 'Supporting Research:',
    'about.research.1': 'NDMA reports show low awareness levels in schools despite India\'s high disaster vulnerability index.',
    'about.research.2': 'UNDRR has recommended integrating disaster risk reduction in education policies (Ref: National Disaster Management Authority).',
    'about.features': 'Platform Features',
    'about.feature.interactive': 'Interactive Learning',
    'about.feature.interactive.desc': 'Comprehensive 10-module course with videos, quizzes, and hands-on games for effective disaster preparedness education.',
    'about.feature.emergency': 'Emergency Response',
    'about.feature.emergency.desc': 'Instant access to emergency contacts, SOS calling, and real-time disaster alerts for immediate assistance.',
    'about.feature.school': 'School Integration',
    'about.feature.school.desc': 'Designed specifically for Indian schools and colleges with admin dashboards and progress tracking.',
    'about.feature.offline': 'Offline Access',
    'about.feature.offline.desc': 'Progressive Web App (PWA) functionality allows learning and accessing emergency information without internet.',
    'about.impact': 'Expected Impact & Outcomes',
    'about.outcomes': 'Key Outcomes',
    'about.outcome.1': 'Improved disaster awareness among students and educational staff',
    'about.outcome.2': 'Better emergency response capabilities in educational institutions',
    'about.outcome.3': 'Reduced casualties and damage during disaster events',
    'about.outcome.4': 'Enhanced community resilience and preparedness culture',
    'about.outcome.5': 'Standardized disaster education across Indian schools',
    'about.stakeholders': 'Stakeholders',
    'about.stakeholder.1': 'Students & Teachers',
    'about.stakeholder.1.desc': 'Primary beneficiaries gaining disaster preparedness knowledge',
    'about.stakeholder.2': 'Schools & Colleges',
    'about.stakeholder.2.desc': 'Educational institutions implementing disaster education programs',
    'about.stakeholder.3': 'Government Agencies',
    'about.stakeholder.3.desc': 'NDMA and state disaster management authorities',
    'about.stakeholder.4': 'NGOs & Communities',
    'about.stakeholder.4.desc': 'Local organizations promoting disaster awareness',
    'about.technology': 'Technology & Accessibility',
    'about.tech.features': 'Technical Features',
    'about.tech.1': 'Progressive Web App (PWA) for offline functionality',
    'about.tech.2': 'Responsive design for desktop, tablet, and mobile devices',
    'about.tech.3': 'Embedded video lessons with progress tracking',
    'about.tech.4': 'Interactive games and quizzes with immediate feedback',
    'about.tech.5': 'Real-time emergency contact integration',
    'about.tech.6': 'Location-based shelter and weather information',
    'about.accessibility': 'Accessibility',
    'about.access.1': 'ARIA labels and keyboard navigation support',
    'about.access.2': 'High contrast design for visual accessibility',
    'about.access.3': 'Touch-friendly interface for mobile devices',
    'about.access.4': 'Offline capability for areas with limited connectivity',
    'about.access.5': 'Multi-language support (English/Hindi/Punjabi/Tamil)',
    'about.access.6': 'Screen reader compatible',
    'about.privacy': 'Privacy & Data Protection',
    'about.privacy.desc': 'We are committed to protecting user privacy and maintaining data security. Our platform collects only essential information required for educational progress tracking and emergency services.',
    'about.data.collection': 'Data Collection & Usage:',
    'about.data.1': 'Educational progress and completion status',
    'about.data.2': 'School/college affiliation for institutional reporting',
    'about.data.3': 'Emergency contact preferences and location (with consent)',
    'about.data.4': 'No personal data sharing with third parties',
    'about.data.5': 'Secure authentication and encrypted data storage',
    'about.data.6': 'Right to data deletion and account removal',
    'about.privacy.contact': 'For complete privacy policy details, data retention periods, and opt-out procedures, please contact our support team or review our detailed privacy documentation.',
    
    // Map Page
    'map.title': 'Emergency Shelters & Safe Locations',
    'map.subtitle': 'Find nearest emergency shelters and safe evacuation points in Punjab',
    'map.shelter.locations': 'Punjab Emergency Shelter Locations',
    'map.evacuation': 'Emergency Evacuation Guidelines',
    'map.before': 'Before Evacuation:',
    'map.before.1': 'Keep emergency kit ready',
    'map.before.2': 'Know your nearest shelter location',
    'map.before.3': 'Save emergency contact numbers',
    'map.before.4': 'Plan evacuation routes',
    'map.during': 'During Evacuation:',
    'map.during.1': 'Follow official evacuation orders',
    'map.during.2': 'Take essential documents and medicines',
    'map.during.3': 'Help elderly and disabled neighbors',
    'map.during.4': 'Stay calm and follow designated routes',
    
    // Weather Page
    'weather.title': 'Weather & Disaster Alerts',
    'weather.subtitle': 'Stay informed about weather conditions and disaster warnings',
    'weather.enter.city': 'Enter city name...',
    'weather.current.location': 'Current Location',
    'weather.location': 'Location',
    'weather.punjab.weather': 'Punjab Weather',
    'weather.punjab': 'Punjab',
    'weather.loading': 'Loading weather data...',
    'weather.humidity': 'Humidity:',
    'weather.wind.speed': 'Wind Speed:',
    'weather.alerts': 'Weather Alerts',
    'weather.forecast.5day': '5-Day Forecast',
    'weather.get.info': 'Get Weather Information',
    'weather.search.msg': 'Search for a city, use your current location, or check Punjab weather to get started.',
    'weather.load.punjab': 'Load Punjab Weather',
    
    // Emergency Contacts
    'emergency.title': 'Emergency Contacts',
    'emergency.name': 'Name',
    'emergency.phone': 'Phone',
    'emergency.category': 'Category',
    'emergency.description': 'Description',
    'emergency.location': 'Location',
    'emergency.add': 'Add Contact',
    
    // Toasts
    'toast.success': 'Success',
    'toast.error': 'Error',
    'toast.warning': 'Warning',
    'toast.info': 'Information',
  },
  
  hi: {
    // Common
    'loading': 'लोड हो रहा है...',
    'save': 'सेव करें',
    'cancel': 'रद्द करें',
    'submit': 'जमा करें',
    'edit': 'संपादित करें',
    'delete': 'हटाएं',
    'close': 'बंद करें',
    'back': 'वापस',
    'next': 'अगला',
    'previous': 'पिछला',
    'yes': 'हाँ',
    'no': 'नहीं',
    'search': 'खोजें',
    'call': 'कॉल करें',
    'capacity': 'क्षमता',
    
    // Navigation
    'dashboard': 'डैशबोर्ड',
    'learning': 'शिक्षा',
    'map': 'नक्शा',
    'weather': 'मौसम',
    'emergency': 'आपातकालीन संपर्क',
    'about': 'के बारे में',
    'login': 'लॉगिन',
    'logout': 'लॉगआउट',
    'admin.portal': 'प्रशासन पोर्टल',
    
    // Home Page
    'home.hero.badge': 'आपदा प्रबंधन शिक्षा',
    'home.hero.title.learn': 'सीखें। तैयार रहें।',
    'home.hero.title.safe': 'सुरक्षित रहें।',
    'home.hero.subtitle': 'भारत भर के स्कूलों और कॉलेजों के लिए डिज़ाइन किया गया व्यापक आपदा तैयारी शिक्षा मंच। इंटरैक्टिव शिक्षण के माध्यम से आवश्यक सुरक्षा कौशल में महारत हासिल करें।',
    'home.enroll.now': 'अभी नामांकन करें',
    'home.learn.more': 'और जानें',
    'home.course.title': 'आपदा तैयारी मूल बातें',
    'home.course.subtitle': 'हमारे व्यापक पाठ्यक्रम के माध्यम से आवश्यक आपदा प्रबंधन कौशल में महारत हासिल करें',
    'home.what.learn': 'आप क्या सीखेंगे:',
    'home.earthquake': 'भूकंप सुरक्षा और प्रतिक्रिया प्रक्रियाएं',
    'home.flood': 'बाढ़ तैयारी और निकासी',
    'home.fire': 'अग्नि सुरक्षा और आपातकालीन प्रोटोकॉल',
    'home.natural.disaster': 'प्राकृतिक आपदा प्रतिक्रिया रणनीतियाँ',
    'home.modules': 'मॉड्यूल',
    'home.video.lessons': 'वीडियो पाठ',
    'home.games': 'इंटरैक्टिव गेम्स',
    'home.quizzes': 'क्विज़',
    'home.certificate': 'प्रमाणपत्र',
    'home.course.format': 'पाठ्यक्रम प्रारूप',
    'home.format.desc': 'प्रत्येक मॉड्यूल में एक वीडियो पाठ, इंटरैक्टिव पहेली खेल और ज्ञान प्रश्नोत्तरी शामिल है। अपना प्रमाणन अर्जित करने के लिए सभी मॉड्यूल पूरे करें।',
    'home.duration': 'अवधि',
    'home.duration.desc': 'प्रति मॉड्यूल 5-10 मिनट। स्वचालित रूप से सहेजी गई प्रगति के साथ अपनी गति से पूर्ण करें।',
    'home.features': 'प्लेटफॉर्म सुविधाएँ',
    'home.features.subtitle': 'व्यापक आपदा तैयारी शिक्षा के लिए आवश्यक सब कुछ',
    'home.feature.interactive': 'इंटरैक्टिव शिक्षण',
    'home.feature.interactive.desc': 'वीडियो, पहेलियों और क्विज़ के साथ 10 व्यापक मॉड्यूल',
    'home.feature.emergency': 'आपातकालीन तैयार',
    'home.feature.emergency.desc': 'रियल-टाइम SOS, आपातकालीन संपर्क और मौसम अलर्ट',
    'home.feature.school': 'स्कूल-केंद्रित',
    'home.feature.school.desc': 'विशेष रूप से भारतीय स्कूलों और कॉलेजों के लिए डिज़ाइन किया गया',
    'home.feature.gamified': 'गैमिफाइड अनुभव',
    'home.feature.gamified.desc': 'सीखते समय अंक, बैज और प्रमाणपत्र अर्जित करें',
    'home.profile.complete': 'अपनी प्रोफ़ाइल पूर्ण करें',
    'home.profile.subtitle': 'पाठ्यक्रम में नामांकन के लिए कृपया अपना विवरण प्रदान करें',
    'home.full.name': 'पूरा नाम',
    'home.age': 'उम्र',
    'home.birthday': 'जन्मदिन',
    'home.school.name': 'स्कूल/कॉलेज का नाम',
    'home.class.grade': 'कक्षा/ग्रेड',
    'home.required.fields': 'आवश्यक फ़ील्ड गायब हैं',
    'home.required.msg': 'कृपया अपना नाम और स्कूल भरें।',
    'home.profile.failed': 'प्रोफ़ाइल अपडेट विफल',
    'home.pick.date': 'तारीख चुनें',
    'home.enter.name': 'अपना पूरा नाम दर्ज करें',
    'home.enter.school': 'अपने संस्थान का नाम दर्ज करें',
    'home.class.placeholder': 'उदा., 10वीं कक्षा, कक्षा 12, BSc वर्ष 1',
    
    // Admin Dashboard
    'admin.dashboard': 'प्रशासन डैशबोर्ड',
    'admin.institute': 'सुरक्षा संस्थान प्रबंधन प्रणाली',
    'admin.active.students': 'सक्रिय छात्र',
    'admin.completed.modules': 'पूर्ण मॉड्यूल',
    'admin.badges.earned': 'अर्जित बैज',
    'admin.drill.participation': 'ड्रिल भागीदारी',
    'admin.manage.students': 'छात्रों का प्रबंधन',
    'admin.view.reports': 'रिपोर्ट देखें',
    'admin.dashboard.loading': 'डैशबोर्ड लोड हो रहा है...',
    
    // Authentication
    'auth.email': 'ईमेल',
    'auth.password': 'पासवर्ड',
    'auth.login': 'लॉगिन',
    'auth.signup': 'साइन अप',
    'auth.forgot.password': 'पासवर्ड भूल गए?',
    'auth.remember.me': 'मुझे याद रखें',
    
    // Learning
    'learning.modules': 'शिक्षा मॉड्यूल',
    'learning.progress': 'प्रगति',
    'learning.certificate': 'प्रमाणपत्र',
    'learning.start': 'सीखना शुरू करें',
    'learning.continue': 'जारी रखें',
    'learning.completed': 'पूर्ण',
    
    // Module Page
    'module.back.learning': 'शिक्षा पर वापस जाएं',
    'module.learning.progress': 'शिक्षण प्रगति',
    'module.duration': 'अवधि',
    'module.video.lesson': 'वीडियो पाठ',
    'module.puzzle.game': 'पहेली खेल',
    'module.knowledge.quiz': 'ज्ञान प्रश्नोत्तरी',
    'module.completed': 'पूर्ण',
    'module.locked': 'लॉक',
    'module.active': 'सक्रिय',
    'module.ready': 'तैयार',
    'module.interactive.game': 'इंटरैक्टिव गेम',
    'module.watch.unlock': 'खेल अनलॉक करने के लिए पाठ देखें',
    'module.complete.unlock': 'क्विज़ अनलॉक करने के लिए खेल पूरा करें',
    'module.answer.complete': 'मॉड्यूल पूरा करने के लिए प्रश्नों के उत्तर दें',
    'module.game.locked': 'खेल लॉक',
    'module.game.locked.msg': 'इंटरैक्टिव गेम अनलॉक करने के लिए वीडियो पाठ पूरा करें।',
    'module.quiz.locked': 'क्विज़ लॉक',
    'module.quiz.locked.msg': 'ज्ञान प्रश्नोत्तरी अनलॉक करने के लिए पहेली खेल पूरा करें।',
    'module.watch.progress': 'देखें प्रगति:',
    'module.video.complete': '✓ वीडियो पूर्ण! खेल अनलॉक।',
    'module.video.complete.toast': 'वीडियो पूर्ण!',
    'module.game.unlocked': 'खेल अनलॉक। शानदार काम!',
    'module.game.complete.toast': 'खेल पूर्ण!',
    'module.quiz.unlocked': 'क्विज़ अनलॉक। आप बहुत अच्छा कर रहे हैं!',
    'module.complete.toast': 'मॉड्यूल पूर्ण!',
    'module.earned.points': 'आपने {score} अंक अर्जित किए! अगले मॉड्यूल पर जा रहे हैं...',
    'module.access.denied': 'मॉड्यूल लॉक',
    'module.complete.previous': 'इसे अनलॉक करने के लिए पिछले मॉड्यूल पूरे करें।',
    
    // About Page (compressed)
    'about.title': 'आपदा प्रबंधन शिक्षा मंच के बारे में',
    'about.subtitle': 'भारतीय स्कूलों और कॉलेजों को इंटरैक्टिव शिक्षण, आपातकालीन उपकरण और रीयल-टाइम सुरक्षा संसाधनों के माध्यम से व्यापक आपदा तैयारी शिक्षा के साथ सशक्त बनाना।',
    
    // Map Page
    'map.title': 'आपातकालीन शरण और सुरक्षित स्थान',
    'map.subtitle': 'पंजाब में निकटतम आपातकालीन आश्रय और सुरक्षित निकासी बिंदु खोजें',
    'map.shelter.locations': 'पंजाब आपातकालीन आश्रय स्थान',
    'map.evacuation': 'आपातकालीन निकासी दिशानिर्देश',
    
    // Weather Page
    'weather.title': 'मौसम और आपदा अलर्ट',
    'weather.subtitle': 'मौसम की स्थिति और आपदा चेतावनियों के बारे में सूचित रहें',
    'weather.enter.city': 'शहर का नाम दर्ज करें...',
    'weather.current.location': 'वर्तमान स्थान',
    'weather.location': 'स्थान',
    'weather.punjab.weather': 'पंजाब मौसम',
    'weather.punjab': 'पंजाब',
    'weather.loading': 'मौसम डेटा लोड हो रहा है...',
    
    // Emergency Contacts
    'emergency.title': 'आपातकालीन संपर्क',
    'emergency.name': 'नाम',
    'emergency.phone': 'फोन',
    'emergency.category': 'श्रेणी',
    'emergency.description': 'विवरण',
    'emergency.location': 'स्थान',
    'emergency.add': 'संपर्क जोड़ें',
    
    // Toasts
    'toast.success': 'सफलता',
    'toast.error': 'त्रुटि',
    'toast.warning': 'चेतावनी',
    'toast.info': 'जानकारी',
  },
  
  pa: {
    // Common
    'loading': 'ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...',
    'save': 'ਸੇਵ ਕਰੋ',
    'cancel': 'ਰੱਦ ਕਰੋ',
    'submit': 'ਜਮ੍ਹਾ ਕਰੋ',
    'edit': 'ਸੰਪਾਦਿਤ ਕਰੋ',
    'delete': 'ਮਿਟਾਓ',
    'close': 'ਬੰਦ ਕਰੋ',
    'back': 'ਵਾਪਸ',
    'next': 'ਅਗਲਾ',
    'previous': 'ਪਿਛਲਾ',
    'yes': 'ਹਾਂ',
    'no': 'ਨਹੀਂ',
    'search': 'ਖੋਜੋ',
    'call': 'ਕਾਲ ਕਰੋ',
    'capacity': 'ਸਮਰੱਥਾ',
    
    // Navigation
    'dashboard': 'ਡੈਸ਼ਬੋਰਡ',
    'learning': 'ਸਿੱਖਿਆ',
    'map': 'ਨਕਸ਼ਾ',
    'weather': 'ਮੌਸਮ',
    'emergency': 'ਐਮਰਜੈਂਸੀ ਸੰਪਰਕ',
    'about': 'ਬਾਰੇ',
    'login': 'ਲਾਗਇਨ',
    'logout': 'ਲਾਗਆਉਟ',
    'admin.portal': 'ਪ੍ਰਸ਼ਾਸਨ ਪੋਰਟਲ',
    
    // Home Page
    'home.hero.badge': 'ਆਫ਼ਤ ਪ੍ਰਬੰਧਨ ਸਿੱਖਿਆ',
    'home.hero.title.learn': 'ਸਿੱਖੋ। ਤਿਆਰ ਰਹੋ।',
    'home.hero.title.safe': 'ਸੁਰੱਖਿਅਤ ਰਹੋ।',
    'home.hero.subtitle': 'ਭਾਰਤ ਭਰ ਦੇ ਸਕੂਲਾਂ ਅਤੇ ਕਾਲਜਾਂ ਲਈ ਤਿਆਰ ਕੀਤਾ ਗਿਆ ਵਿਆਪਕ ਆਫ਼ਤ ਤਿਆਰੀ ਸਿੱਖਿਆ ਮੰਚ। ਇੰਟਰੈਕਟਿਵ ਸਿੱਖਣ ਦੁਆਰਾ ਜ਼ਰੂਰੀ ਸੁਰੱਖਿਆ ਹੁਨਰਾਂ ਵਿੱਚ ਮਹਾਰਤ ਹਾਸਲ ਕਰੋ।',
    'home.enroll.now': 'ਹੁਣੇ ਭਰਤੀ ਕਰੋ',
    'home.learn.more': 'ਹੋਰ ਜਾਣੋ',
    'home.course.title': 'ਆਫ਼ਤ ਤਿਆਰੀ ਮੂਲ ਗੱਲਾਂ',
    'home.course.subtitle': 'ਸਾਡੇ ਵਿਆਪਕ ਕੋਰਸ ਦੁਆਰਾ ਜ਼ਰੂਰੀ ਆਫ਼ਤ ਪ੍ਰਬੰਧਨ ਹੁਨਰਾਂ ਵਿੱਚ ਮਹਾਰਤ ਹਾਸਲ ਕਰੋ',
    'home.what.learn': 'ਤੁਸੀਂ ਕੀ ਸਿੱਖੋਗੇ:',
    'home.earthquake': 'ਭੁਚਾਲ ਸੁਰੱਖਿਆ ਅਤੇ ਜਵਾਬੀ ਪ੍ਰਕਿਰਿਆਵਾਂ',
    'home.flood': 'ਹੜ੍ਹ ਤਿਆਰੀ ਅਤੇ ਨਿਕਾਸ',
    'home.fire': 'ਅੱਗ ਸੁਰੱਖਿਆ ਅਤੇ ਐਮਰਜੈਂਸੀ ਪ੍ਰੋਟੋਕੋਲ',
    'home.natural.disaster': 'ਕੁਦਰਤੀ ਆਫ਼ਤ ਜਵਾਬੀ ਰਣਨੀਤੀਆਂ',
    'home.modules': 'ਮਾਡਿਊਲ',
    'home.video.lessons': 'ਵੀਡੀਓ ਪਾਠ',
    'home.games': 'ਇੰਟਰੈਕਟਿਵ ਗੇਮਸ',
    'home.quizzes': 'ਕੁਇਜ਼',
    'home.certificate': 'ਸਰਟੀਫਿਕੇਟ',
    'home.course.format': 'ਕੋਰਸ ਫਾਰਮੈਟ',
    'home.format.desc': 'ਹਰੇਕ ਮਾਡਿਊਲ ਵਿੱਚ ਇੱਕ ਵੀਡੀਓ ਪਾਠ, ਇੰਟਰੈਕਟਿਵ ਪਹੇਲੀ ਖੇਡ ਅਤੇ ਗਿਆਨ ਕੁਇਜ਼ ਸ਼ਾਮਲ ਹੈ। ਆਪਣਾ ਸਰਟੀਫਿਕੇਸ਼ਨ ਕਮਾਉਣ ਲਈ ਸਾਰੇ ਮਾਡਿਊਲ ਪੂਰੇ ਕਰੋ।',
    'home.duration': 'ਮਿਆਦ',
    'home.duration.desc': 'ਪ੍ਰਤੀ ਮਾਡਿਊਲ 5-10 ਮਿੰਟ। ਆਪਣੀ ਰਫ਼ਤਾਰ ਨਾਲ ਮੁਕੰਮਲ ਕਰੋ ਅਤੇ ਪ੍ਰਗਤੀ ਸਵੈਚਲਿਤ ਤੌਰ ਤੇ ਸੰਭਾਲੀ ਜਾਂਦੀ ਹੈ।',
    'home.features': 'ਪਲੇਟਫਾਰਮ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ',
    'home.features.subtitle': 'ਵਿਆਪਕ ਆਫ਼ਤ ਤਿਆਰੀ ਸਿੱਖਿਆ ਲਈ ਸਭ ਕੁਝ ਜੋ ਤੁਹਾਨੂੰ ਚਾਹੀਦਾ ਹੈ',
    'home.feature.interactive': 'ਇੰਟਰੈਕਟਿਵ ਸਿੱਖਣ',
    'home.feature.interactive.desc': 'ਵੀਡੀਓ, ਪਹੇਲੀਆਂ ਅਤੇ ਕੁਇਜ਼ਾਂ ਦੇ ਨਾਲ 10 ਵਿਆਪਕ ਮਾਡਿਊਲ',
    'home.feature.emergency': 'ਐਮਰਜੈਂਸੀ ਤਿਆਰ',
    'home.feature.emergency.desc': 'ਰੀਅਲ-ਟਾਈਮ SOS, ਐਮਰਜੈਂਸੀ ਸੰਪਰਕ ਅਤੇ ਮੌਸਮ ਅਲਰਟ',
    'home.feature.school': 'ਸਕੂਲ-ਕੇਂਦਰਿਤ',
    'home.feature.school.desc': 'ਵਿਸ਼ੇਸ਼ ਤੌਰ ਤੇ ਭਾਰਤੀ ਸਕੂਲਾਂ ਅਤੇ ਕਾਲਜਾਂ ਲਈ ਤਿਆਰ ਕੀਤਾ ਗਿਆ',
    'home.feature.gamified': 'ਗੇਮੀਫਾਈਡ ਅਨੁਭਵ',
    'home.feature.gamified.desc': 'ਸਿੱਖਦੇ ਸਮੇਂ ਅੰਕ, ਬੈਜ ਅਤੇ ਸਰਟੀਫਿਕੇਟ ਕਮਾਓ',
    'home.profile.complete': 'ਆਪਣੀ ਪ੍ਰੋਫਾਈਲ ਪੂਰੀ ਕਰੋ',
    'home.profile.subtitle': 'ਕੋਰਸ ਵਿੱਚ ਭਰਤੀ ਹੋਣ ਲਈ ਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ ਵੇਰਵਾ ਦਿਓ',
    'home.full.name': 'ਪੂਰਾ ਨਾਮ',
    'home.age': 'ਉਮਰ',
    'home.birthday': 'ਜਨਮਦਿਨ',
    'home.school.name': 'ਸਕੂਲ/ਕਾਲਜ ਦਾ ਨਾਮ',
    'home.class.grade': 'ਕਲਾਸ/ਗ੍ਰੇਡ',
    'home.required.fields': 'ਲੋੜੀਂਦੀਆਂ ਫੀਲਡਾਂ ਗਾਇਬ ਹਨ',
    'home.required.msg': 'ਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ ਨਾਮ ਅਤੇ ਸਕੂਲ ਭਰੋ।',
    'home.profile.failed': 'ਪ੍ਰੋਫਾਈਲ ਅਪਡੇਟ ਅਸਫਲ',
    'home.pick.date': 'ਤਾਰੀਖ ਚੁਣੋ',
    'home.enter.name': 'ਆਪਣਾ ਪੂਰਾ ਨਾਮ ਦਾਖਲ ਕਰੋ',
    'home.enter.school': 'ਆਪਣੇ ਸੰਸਥਾਨ ਦਾ ਨਾਮ ਦਾਖਲ ਕਰੋ',
    'home.class.placeholder': 'ਜਿਵੇਂ, 10ਵੀਂ ਕਲਾਸ, ਕਲਾਸ 12, BSc ਸਾਲ 1',
    
    // Admin Dashboard
    'admin.dashboard': 'ਪ੍ਰਸ਼ਾਸਨ ਡੈਸ਼ਬੋਰਡ',
    'admin.institute': 'ਸੁਰੱਖਿਆ ਸੰਸਥਾ ਪ੍ਰਬੰਧਨ ਸਿਸਟਮ',
    'admin.active.students': 'ਸਰਗਰਮ ਵਿਦਿਆਰਥੀ',
    'admin.completed.modules': 'ਮੁਕੰਮਲ ਮਾਡਿਊਲ',
    'admin.badges.earned': 'ਕਮਾਏ ਬੈਜ',
    'admin.drill.participation': 'ਡ੍ਰਿਲ ਭਾਗੀਦਾਰੀ',
    'admin.manage.students': 'ਵਿਦਿਆਰਥੀਆਂ ਦਾ ਪ੍ਰਬੰਧਨ',
    'admin.view.reports': 'ਰਿਪੋਰਟਾਂ ਦੇਖੋ',
    'admin.dashboard.loading': 'ਡੈਸ਼ਬੋਰਡ ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...',
    
    // Authentication
    'auth.email': 'ਈਮੇਲ',
    'auth.password': 'ਪਾਸਵਰਡ',
    'auth.login': 'ਲਾਗਇਨ',
    'auth.signup': 'ਸਾਈਨ ਅੱਪ',
    'auth.forgot.password': 'ਪਾਸਵਰਡ ਭੁੱਲ ਗਏ?',
    'auth.remember.me': 'ਮੈਨੂੰ ਯਾਦ ਰੱਖੋ',
    
    // Learning
    'learning.modules': 'ਸਿੱਖਿਆ ਮਾਡਿਊਲ',
    'learning.progress': 'ਤਰੱਕੀ',
    'learning.certificate': 'ਸਰਟੀਫਿਕੇਟ',
    'learning.start': 'ਸਿੱਖਣਾ ਸ਼ੁਰੂ ਕਰੋ',
    'learning.continue': 'ਜਾਰੀ ਰੱਖੋ',
    'learning.completed': 'ਮੁਕੰਮਲ',
    
    // Module Page
    'module.back.learning': 'ਸਿੱਖਿਆ ਤੇ ਵਾਪਸ ਜਾਓ',
    'module.learning.progress': 'ਸਿੱਖਣ ਦੀ ਤਰੱਕੀ',
    'module.duration': 'ਮਿਆਦ',
    'module.video.lesson': 'ਵੀਡੀਓ ਪਾਠ',
    'module.puzzle.game': 'ਪਹੇਲੀ ਖੇਡ',
    'module.knowledge.quiz': 'ਗਿਆਨ ਕੁਇਜ਼',
    'module.completed': 'ਮੁਕੰਮਲ',
    'module.locked': 'ਲਾਕ',
    'module.active': 'ਸਰਗਰਮ',
    'module.ready': 'ਤਿਆਰ',
    'module.interactive.game': 'ਇੰਟਰੈਕਟਿਵ ਗੇਮ',
    'module.watch.unlock': 'ਖੇਡ ਅਨਲਾਕ ਕਰਨ ਲਈ ਪਾਠ ਦੇਖੋ',
    'module.complete.unlock': 'ਕੁਇਜ਼ ਅਨਲਾਕ ਕਰਨ ਲਈ ਖੇਡ ਪੂਰਾ ਕਰੋ',
    'module.answer.complete': 'ਮਾਡਿਊਲ ਪੂਰਾ ਕਰਨ ਲਈ ਸਵਾਲਾਂ ਦੇ ਜਵਾਬ ਦਿਓ',
    'module.game.locked': 'ਖੇਡ ਲਾਕ',
    'module.game.locked.msg': 'ਇੰਟਰੈਕਟਿਵ ਗੇਮ ਅਨਲਾਕ ਕਰਨ ਲਈ ਵੀਡੀਓ ਪਾਠ ਪੂਰਾ ਕਰੋ।',
    'module.quiz.locked': 'ਕੁਇਜ਼ ਲਾਕ',
    'module.quiz.locked.msg': 'ਗਿਆਨ ਕੁਇਜ਼ ਅਨਲਾਕ ਕਰਨ ਲਈ ਪਹੇਲੀ ਖੇਡ ਪੂਰਾ ਕਰੋ।',
    'module.watch.progress': 'ਦੇਖੋ ਤਰੱਕੀ:',
    'module.video.complete': '✓ ਵੀਡੀਓ ਮੁਕੰਮਲ! ਖੇਡ ਅਨਲਾਕ।',
    
    // Map Page
    'map.title': 'ਐਮਰਜੈਂਸੀ ਸ਼ਰਨ ਅਤੇ ਸੁਰੱਖਿਅਤ ਸਥਾਨ',
    'map.subtitle': 'ਪੰਜਾਬ ਵਿੱਚ ਨਜ਼ਦੀਕੀ ਐਮਰਜੈਂਸੀ ਆਸਰਾ ਅਤੇ ਸੁਰੱਖਿਅਤ ਨਿਕਾਸ ਬਿੰਦੂ ਲੱਭੋ',
    'map.shelter.locations': 'ਪੰਜਾਬ ਐਮਰਜੈਂਸੀ ਆਸਰਾ ਸਥਾਨ',
    'map.evacuation': 'ਐਮਰਜੈਂਸੀ ਨਿਕਾਸ ਦਿਸ਼ਾ ਨਿਰਦੇਸ਼',
    
    // Weather Page
    'weather.title': 'ਮੌਸਮ ਅਤੇ ਆਫ਼ਤ ਅਲਰਟ',
    'weather.subtitle': 'ਮੌਸਮ ਦੀਆਂ ਸਥਿਤੀਆਂ ਅਤੇ ਆਫ਼ਤ ਚੇਤਾਵਨੀਆਂ ਬਾਰੇ ਸੂਚਿਤ ਰਹੋ',
    'weather.enter.city': 'ਸ਼ਹਿਰ ਦਾ ਨਾਮ ਦਾਖਲ ਕਰੋ...',
    'weather.current.location': 'ਮੌਜੂਦਾ ਸਥਾਨ',
    'weather.location': 'ਸਥਾਨ',
    'weather.punjab.weather': 'ਪੰਜਾਬ ਮੌਸਮ',
    'weather.punjab': 'ਪੰਜਾਬ',
    'weather.loading': 'ਮੌਸਮ ਡੇਟਾ ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...',
    
    // Emergency Contacts
    'emergency.title': 'ਐਮਰਜੈਂਸੀ ਸੰਪਰਕ',
    'emergency.name': 'ਨਾਮ',
    'emergency.phone': 'ਫੋਨ',
    'emergency.category': 'ਸ਼੍ਰੇਣੀ',
    'emergency.description': 'ਵਿਵਰਣ',
    'emergency.location': 'ਸਥਾਨ',
    'emergency.add': 'ਸੰਪਰਕ ਜੋੜੋ',
    
    // Toasts
    'toast.success': 'ਸਫਲਤਾ',
    'toast.error': 'ਗਲਤੀ',
    'toast.warning': 'ਚੇਤਾਵਨੀ',
    'toast.info': 'ਜਾਣਕਾਰੀ',
  },
  
  ta: {
    // Common
    'loading': 'ஏற்றுகிறது...',
    'save': 'சேமிக்கவும்',
    'cancel': 'ரத்து செய்',
    'submit': 'சமர்ப்பிக்கவும்',
    'edit': 'திருத்தவும்',
    'delete': 'நீக்கவும்',
    'close': 'மூடவும்',
    'back': 'திரும்பு',
    'next': 'அடுத்து',
    'previous': 'முந்தைய',
    'yes': 'ஆம்',
    'no': 'இல்லை',
    'search': 'தேடவும்',
    'call': 'அழை',
    'capacity': 'திறன்',
    
    // Navigation
    'dashboard': 'டாஷ்போர்டு',
    'learning': 'கற்றல்',
    'map': 'வரைபடம்',
    'weather': 'வானிலை',
    'emergency': 'அவசர தொடர்புகள்',
    'about': 'பற்றி',
    'login': 'உள்நுழைவு',
    'logout': 'வெளியேறு',
    'admin.portal': 'நிர்வாக போர்டல்',
    
    // Home Page
    'home.hero.badge': 'பேரிடர் மேலாண்மை கல்வி',
    'home.hero.title.learn': 'கற்றுக்கொள். தயார்படு.',
    'home.hero.title.safe': 'பாதுகாப்பாக இரு.',
    'home.hero.subtitle': 'இந்தியா முழுவதும் உள்ள பள்ளிகள் மற்றும் கல்லூரிகளுக்கு வடிவமைக்கப்பட்ட விரிவான பேரிடர் தயார்நிலை கல்வி தளம். ஊடாடும் கற்றல் மூலம் அத்தியாவசிய பாதுகாப்பு திறன்களை அறிந்துகொள்க.',
    'home.enroll.now': 'இப்போதே சேருங்கள்',
    'home.learn.more': 'மேலும் அறிக',
    'home.course.title': 'பேரிடர் தயார்நிலை அடிப்படைகள்',
    'home.course.subtitle': 'எங்கள் விரிவான பாடத்திட்டத்தின் மூலம் அத்தியாவசிய பேரிடர் மேலாண்மை திறன்களில் தேர்ச்சி பெறுங்கள்',
    'home.what.learn': 'நீங்கள் கற்றுக்கொள்வது:',
    'home.earthquake': 'நில அதிர்வு பாதுகாப்பு மற்றும் பதில் நடைமுறைகள்',
    'home.flood': 'வெள்ள தயார்நிலை மற்றும் வெளியேற்றம்',
    'home.fire': 'தீ பாதுகாப்பு மற்றும் அவசர நெறிமுறைகள்',
    'home.natural.disaster': 'இயற்கை பேரிடர் பதில் உத்திகள்',
    'home.modules': 'தொகுதிகள்',
    'home.video.lessons': 'வீடியோ பாடங்கள்',
    'home.games': 'ஊடாடும் விளையாட்டுகள்',
    'home.quizzes': 'வினாடி வினாக்கள்',
    'home.certificate': 'சான்றிதழ்',
    'home.course.format': 'பாட வடிவம்',
    'home.format.desc': 'ஒவ்வொரு தொகுதியும் ஒரு வீடியோ பாடம், ஊடாடும் புதிர் விளையாட்டு மற்றும் அறிவு வினாடி வினாவைக் கொண்டுள்ளது. உங்கள் சான்றிதழைப் பெற அனைத்து தொகுதிகளையும் முடிக்கவும்.',
    'home.duration': 'கால அளவு',
    'home.duration.desc': 'ஒவ்வொரு தொகுதிக்கும் 5-10 நிமிடங்கள். முன்னேற்றம் தானாகவே சேமிக்கப்பட்டு உங்கள் வேகத்தில் முடிக்கவும்.',
    'home.features': 'தள அம்சங்கள்',
    'home.features.subtitle': 'விரிவான பேரிடர் தயார்நிலை கல்விக்கு தேவையான அனைத்தும்',
    'home.feature.interactive': 'ஊடாடும் கற்றல்',
    'home.feature.interactive.desc': 'வீடியோக்கள், புதிர்கள் மற்றும் வினாடி வினாக்களுடன் 10 விரிவான தொகுதிகள்',
    'home.feature.emergency': 'அவசர தயார்',
    'home.feature.emergency.desc': 'நிகழ் நேர SOS, அவசர தொடர்புகள் மற்றும் வானிலை எச்சரிக்கைகள்',
    'home.feature.school': 'பள்ளி-மையமானது',
    'home.feature.school.desc': 'இந்திய பள்ளிகள் மற்றும் கல்லூரிகளுக்காக குறிப்பாக வடிவமைக்கப்பட்டது',
    'home.feature.gamified': 'கேமிஃபைட் அனுபவம்',
    'home.feature.gamified.desc': 'கற்கும் போது புள்ளிகள், பேட்ஜ்கள் மற்றும் சான்றிதழ்களைப் பெறுங்கள்',
    'home.profile.complete': 'உங்கள் சுயவிவரத்தை முடிக்கவும்',
    'home.profile.subtitle': 'பாடத்திட்டத்தில் சேர உங்கள் விவரங்களை வழங்கவும்',
    'home.full.name': 'முழு பெயர்',
    'home.age': 'வயது',
    'home.birthday': 'பிறந்தநாள்',
    'home.school.name': 'பள்ளி/கல்லூரி பெயர்',
    'home.class.grade': 'வகுப்பு/கிரேடு',
    'home.required.fields': 'தேவையான புலங்கள் இல்லை',
    'home.required.msg': 'தயவுசெய்து உங்கள் பெயர் மற்றும் பள்ளியை நிரப்பவும்.',
    'home.profile.failed': 'சுயவிவர புதுப்பிப்பு தோல்வியடைந்தது',
    'home.pick.date': 'தேதியைத் தேர்ந்தெடு',
    'home.enter.name': 'உங்கள் முழு பெயரை உள்ளிடவும்',
    'home.enter.school': 'உங்கள் நிறுவன பெயரை உள்ளிடவும்',
    'home.class.placeholder': 'உதா., 10வது வகுப்பு, வகுப்பு 12, BSc ஆண்டு 1',
    
    // Admin Dashboard
    'admin.dashboard': 'நிர்வாக டாஷ்போர்டு',
    'admin.institute': 'பாதுகாப்பு நிறுவன மேலாண்மை அமைப்பு',
    'admin.active.students': 'செயலில் உள்ள மாணவர்கள்',
    'admin.completed.modules': 'முடிக்கப்பட்ட தொகுதிகள்',
    'admin.badges.earned': 'பெற்ற பேட்ஜ்கள்',
    'admin.drill.participation': 'பயிற்சி பங்கேற்பு',
    'admin.manage.students': 'மாணவர்களை நிர்வகிக்கவும்',
    'admin.view.reports': 'அறிக்கைகளைக் காணவும்',
    'admin.dashboard.loading': 'டாஷ்போர்டு ஏற்றுகிறது...',
    
    // Authentication
    'auth.email': 'மின்னஞ்சல்',
    'auth.password': 'கடவுச்சொல்',
    'auth.login': 'உள்நுழைவு',
    'auth.signup': 'பதிவு செய்',
    'auth.forgot.password': 'கடவுச்சொல் மறந்துவிட்டதா?',
    'auth.remember.me': 'என்னை நினைவில் வைத்துக்கொள்',
    
    // Learning
    'learning.modules': 'கற்றல் தொகுதிகள்',
    'learning.progress': 'முன்னேற்றம்',
    'learning.certificate': 'சான்றிதழ்',
    'learning.start': 'கற்க ஆரம்பிக்கவும்',
    'learning.continue': 'தொடரவும்',
    'learning.completed': 'முடிந்தது',
    
    // Module Page
    'module.back.learning': 'கற்றலுக்குத் திரும்பு',
    'module.learning.progress': 'கற்றல் முன்னேற்றம்',
    'module.duration': 'கால அளவு',
    'module.video.lesson': 'வீடியோ பாடம்',
    'module.puzzle.game': 'புதிர் விளையாட்டு',
    'module.knowledge.quiz': 'அறிவு வினாடி வினா',
    'module.completed': 'முடிந்தது',
    'module.locked': 'பூட்டப்பட்டது',
    'module.active': 'செயலில்',
    'module.ready': 'தயார்',
    'module.interactive.game': 'ஊடாடும் விளையாட்டு',
    'module.watch.unlock': 'விளையாட்டை திறக்க பாடத்தைப் பார்க்கவும்',
    'module.complete.unlock': 'வினாடி வினாவைத் திறக்க விளையாட்டை முடிக்கவும்',
    'module.answer.complete': 'தொகுதியை முடிக்க கேள்விகளுக்கு பதிலளிக்கவும்',
    'module.game.locked': 'விளையாட்டு பூட்டப்பட்டது',
    'module.game.locked.msg': 'ஊடாடும் விளையாட்டைத் திறக்க வீடியோ பாடத்தை முடிக்கவும்.',
    'module.quiz.locked': 'வினாடி வினா பூட்டப்பட்டது',
    'module.quiz.locked.msg': 'அறிவு வினாடி வினாவைத் திறக்க புதிர் விளையாட்டை முடிக்கவும்.',
    'module.watch.progress': 'பார்க்கும் முன்னேற்றம்:',
    'module.video.complete': '✓ வீடியோ முடிந்தது! விளையாட்டு திறக்கப்பட்டது.',
    
    // Map Page
    'map.title': 'அவசர தங்குமிடங்கள் & பாதுகாப்பான இடங்கள்',
    'map.subtitle': 'பஞ்சாபில் அருகிலுள்ள அவசர தங்குமிடங்கள் மற்றும் பாதுகாப்பான வெளியேற்ற புள்ளிகளைக் கண்டறியவும்',
    'map.shelter.locations': 'பஞ்சாப் அவசர தங்குமிட இடங்கள்',
    'map.evacuation': 'அவசர வெளியேற்ற வழிகாட்டுதல்கள்',
    
    // Weather Page
    'weather.title': 'வானிலை & பேரிடர் எச்சரிக்கைகள்',
    'weather.subtitle': 'வானிலை நிலைகள் மற்றும் பேரிடர் எச்சரிக்கைகள் பற்றி அறியவும்',
    'weather.enter.city': 'நகர பெயரை உள்ளிடவும்...',
    'weather.current.location': 'தற்போதைய இடம்',
    'weather.location': 'இடம்',
    'weather.punjab.weather': 'பஞ்சாப் வானிலை',
    'weather.punjab': 'பஞ்சாப்',
    'weather.loading': 'வானிலை தரவு ஏற்றுகிறது...',
    
    // Emergency Contacts
    'emergency.title': 'அவசர தொடர்புகள்',
    'emergency.name': 'பெயர்',
    'emergency.phone': 'தொலைபேசி',
    'emergency.category': 'வகை',
    'emergency.description': 'விளக்கம்',
    'emergency.location': 'இடம்',
    'emergency.add': 'தொடர்பு சேர்க்கவும்',
    
    // Toasts
    'toast.success': 'வெற்றி',
    'toast.error': 'பிழை',
    'toast.warning': 'எச்சரிக்கை',
    'toast.info': 'தகவல்',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('app-language');
    return (saved as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('app-language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  const translateText = async (text: string): Promise<string> => {
    if (language === 'en') return text;
    
    try {
      const response = await fetch(
        'https://lawqqqpvyciokqgbicot.supabase.co/functions/v1/translate',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            texts: [text],
            targetLanguage: language,
          }),
        }
      );

      if (!response.ok) {
        console.error('Translation failed:', response.status);
        return text;
      }

      const data = await response.json();
      return data.translations[0] || text;
    } catch (error) {
      console.error('Translation error:', error);
      return text;
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translateText }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};