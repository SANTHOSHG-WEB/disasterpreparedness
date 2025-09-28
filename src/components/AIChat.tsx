import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your Disaster Education Assistant. I can help you with disaster safety questions, emergency procedures, and course-related queries. How can I assist you today?",
      isBot: true
    }
  ]);
  const [inputText, setInputText] = useState('');

  const systemPrompt = "You are a Disaster Education Assistant. Use only factual, safety-first guidance. If unsure, advise contacting local emergency services. Prefer NDMA and official sources. Keep answers concise and give actionable steps for students and staff.";

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      isBot: false
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response based on system prompt
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: generateResponse(inputText),
        isBot: true
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInputText('');
  };

  const generateResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('earthquake')) {
      return "During an earthquake: 1) Drop to hands and knees 2) Take cover under a desk/table 3) Hold on until shaking stops. After: Check for injuries, inspect home for damage, be prepared for aftershocks. For detailed guidance, refer to Module 2 & 3 in our course.";
    }
    
    if (lowerQuery.includes('fire')) {
      return "Fire safety: 1) Stay low to avoid smoke 2) Feel doors before opening 3) Use stairs, never elevators 4) Call 101 immediately. If clothes catch fire: Stop, Drop, Roll. For comprehensive fire safety, complete Module 6 in our learning section.";
    }
    
    if (lowerQuery.includes('flood')) {
      return "Flood safety: 1) Move to higher ground immediately 2) Avoid walking/driving through flood water 3) Stay away from electrical lines 4) Listen to emergency broadcasts. Remember: Turn Around, Don't Drown. Learn more in Modules 4 & 5.";
    }
    
    if (lowerQuery.includes('emergency') || lowerQuery.includes('help')) {
      return "Emergency contacts in India: Police (100), Fire (101), Ambulance (102), Disaster Helpline (108). For immediate danger, call these numbers. For non-emergency disaster education, continue with our learning modules.";
    }
    
    if (lowerQuery.includes('course') || lowerQuery.includes('module')) {
      return "Our Disaster Preparedness Basics course has 10 modules covering: Introduction, Earthquakes, Floods, Fire Safety, Landslides, Hurricanes, Forest Fires, and more. Each module includes video lessons, puzzles, and quizzes. Complete all modules to earn your certificate!";
    }
    
    return "I provide disaster safety guidance based on NDMA and official sources. For specific emergency situations, contact local emergency services immediately. For learning about disaster preparedness, explore our course modules. What specific safety topic would you like help with?";
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-24 right-4 md:bottom-6 md:right-6 z-50 p-3 md:p-4 rounded-full transition-all duration-300 
                   glass-hover shadow-lg hover:shadow-xl touch-target ${
          isOpen ? 'bg-emergency/80' : 'bg-primary/80'
        }`}
        aria-label="Disaster Help — Ask the assistant"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageCircle className="h-6 w-6 text-white" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-36 right-4 md:bottom-24 md:right-6 w-80 max-w-[calc(100vw-2rem)] z-50 
                       glass rounded-2xl shadow-2xl animate-fade-in">
          {/* Chat Header */}
          <div className="p-4 border-b border-glass-border">
            <h3 className="font-semibold text-glass-foreground">Disaster Help Assistant</h3>
            <p className="text-sm text-muted-foreground">Ask disaster safety questions</p>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    message.isBot
                      ? 'bg-glass/50 text-glass-foreground'
                      : 'bg-primary text-primary-foreground'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-glass-border">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about disaster safety..."
                className="flex-1 bg-input border border-glass-border rounded-lg px-3 py-2 
                          text-glass-foreground placeholder-muted-foreground text-sm
                          focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="p-2 bg-primary hover:bg-primary-dark text-primary-foreground 
                          rounded-lg transition-colors disabled:opacity-50 touch-target"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Powered by NDMA guidelines and official sources
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChat;