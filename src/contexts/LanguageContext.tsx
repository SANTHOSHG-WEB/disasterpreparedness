import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'hi' | 'pa' | 'ta';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
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
    
    // Navigation
    'dashboard': 'Dashboard',
    'learning': 'Learning',
    'map': 'Map',
    'weather': 'Weather',
    'emergency': 'Emergency Contacts',
    'about': 'About',
    'login': 'Login',
    'logout': 'Logout',
    
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
    
    // Emergency Contacts
    'emergency.title': 'Emergency Contacts',
    'emergency.name': 'Name',
    'emergency.phone': 'Phone',
    'emergency.category': 'Category',
    'emergency.description': 'Description',
    'emergency.location': 'Location',
    'emergency.add': 'Add Contact',
    
    // Weather
    'weather.title': 'Weather Information',
    'weather.current': 'Current Weather',
    'weather.forecast': 'Forecast',
    'weather.temperature': 'Temperature',
    'weather.humidity': 'Humidity',
    'weather.wind': 'Wind Speed',
    
    // Map
    'map.title': 'Safety Map',
    'map.emergency.locations': 'Emergency Locations',
    'map.safe.zones': 'Safe Zones',
    
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
    
    // Navigation
    'dashboard': 'डैशबोर्ड',
    'learning': 'शिक्षा',
    'map': 'नक्शा',
    'weather': 'मौसम',
    'emergency': 'आपातकालीन संपर्क',
    'about': 'के बारे में',
    'login': 'लॉगिन',
    'logout': 'लॉगआउट',
    
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
    
    // Emergency Contacts
    'emergency.title': 'आपातकालीन संपर्क',
    'emergency.name': 'नाम',
    'emergency.phone': 'फोन',
    'emergency.category': 'श्रेणी',
    'emergency.description': 'विवरण',
    'emergency.location': 'स्थान',
    'emergency.add': 'संपर्क जोड़ें',
    
    // Weather
    'weather.title': 'मौसम की जानकारी',
    'weather.current': 'वर्तमान मौसम',
    'weather.forecast': 'पूर्वानुमान',
    'weather.temperature': 'तापमान',
    'weather.humidity': 'आर्द्रता',
    'weather.wind': 'हवा की गति',
    
    // Map
    'map.title': 'सुरक्षा नक्शा',
    'map.emergency.locations': 'आपातकालीन स्थान',
    'map.safe.zones': 'सुरक्षित क्षेत्र',
    
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
    
    // Navigation
    'dashboard': 'ਡੈਸ਼ਬੋਰਡ',
    'learning': 'ਸਿੱਖਿਆ',
    'map': 'ਨਕਸ਼ਾ',
    'weather': 'ਮੌਸਮ',
    'emergency': 'ਐਮਰਜੈਂਸੀ ਸੰਪਰਕ',
    'about': 'ਬਾਰੇ',
    'login': 'ਲਾਗਇਨ',
    'logout': 'ਲਾਗਆਉਟ',
    
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
    
    // Emergency Contacts
    'emergency.title': 'ਐਮਰਜੈਂਸੀ ਸੰਪਰਕ',
    'emergency.name': 'ਨਾਮ',
    'emergency.phone': 'ਫੋਨ',
    'emergency.category': 'ਸ਼੍ਰੇਣੀ',
    'emergency.description': 'ਵਿਵਰਣ',
    'emergency.location': 'ਸਥਾਨ',
    'emergency.add': 'ਸੰਪਰਕ ਜੋੜੋ',
    
    // Weather
    'weather.title': 'ਮੌਸਮੀ ਜਾਣਕਾਰੀ',
    'weather.current': 'ਮੌਜੂਦਾ ਮੌਸਮ',
    'weather.forecast': 'ਪੂਰਵ ਅਨੁਮਾਨ',
    'weather.temperature': 'ਤਾਪਮਾਨ',
    'weather.humidity': 'ਨਮੀ',
    'weather.wind': 'ਹਵਾ ਦੀ ਗਤੀ',
    
    // Map
    'map.title': 'ਸੁਰੱਖਿਆ ਨਕਸ਼ਾ',
    'map.emergency.locations': 'ਐਮਰਜੈਂਸੀ ਸਥਾਨ',
    'map.safe.zones': 'ਸੁਰੱਖਿਤ ਖੇਤਰ',
    
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
    
    // Navigation
    'dashboard': 'டாஷ்போர்டு',
    'learning': 'கற்றல்',
    'map': 'வரைபடம்',
    'weather': 'வானிலை',
    'emergency': 'அவசர தொடர்புகள்',
    'about': 'பற்றி',
    'login': 'உள்நுழைவு',
    'logout': 'வெளியேறு',
    
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
    
    // Emergency Contacts
    'emergency.title': 'அவசர தொடர்புகள்',
    'emergency.name': 'பெயர்',
    'emergency.phone': 'தொலைபேசி',
    'emergency.category': 'வகை',
    'emergency.description': 'விளக்கம்',
    'emergency.location': 'இடம்',
    'emergency.add': 'தொடர்பு சேர்க்கவும்',
    
    // Weather
    'weather.title': 'வானிலை தகவல்',
    'weather.current': 'தற்போதைய வானிலை',
    'weather.forecast': 'முன்னறிவிப்பு',
    'weather.temperature': 'வெப்பநிலை',
    'weather.humidity': 'ஈரப்பதம்',
    'weather.wind': 'காற்றின் வேகம்',
    
    // Map
    'map.title': 'பாதுகாப்பு வரைபடம்',
    'map.emergency.locations': 'அவசர இடங்கள்',
    'map.safe.zones': 'பாதுகாப்பு மண்டலங்கள்',
    
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

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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