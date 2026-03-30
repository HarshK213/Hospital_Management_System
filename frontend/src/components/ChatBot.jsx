import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'bot',
      content: 'Hello! I\'m your Arogya assistant. How can I help you today? You can ask me about:\n• Booking appointments\n• Finding doctors\n• Hospital services\n• Account issues\n• And more...',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue.trim());
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'bot',
        content: botResponse,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const generateBotResponse = (query) => {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes('appointment') || lowerQuery.includes('book')) {
      return 'To book an appointment, you can:\n\n1. Log in to your account\n2. Go to "Book Appointment" in your dashboard\n3. Select a doctor, date, and time\n4. Provide the reason for your visit\n\nWould you like to know more about any specific step?';
    }

    if (lowerQuery.includes('doctor') || lowerQuery.includes('specialist')) {
      return 'We have qualified doctors in various specialties including:\n\n• General Medicine\n• Pediatrics\n• Cardiology\n• Orthopedics\n• Dermatology\n• And many more...\n\nYou can view all available doctors in the "Book Appointment" section.';
    }

    if (lowerQuery.includes('hours') || lowerQuery.includes('timing') || lowerQuery.includes('open')) {
      return 'Our hospital operating hours are:\n\n🕐 Outpatient Department: 8:00 AM - 8:00 PM\n🏥 Emergency Services: 24/7\n💊 Pharmacy: 24 Hours\n\nPlease note that appointment slots vary by doctor.';
    }

    if (lowerQuery.includes('contact') || lowerQuery.includes('phone') || lowerQuery.includes('email')) {
      return 'You can reach us through:\n\n📞 Phone: +1 (555) 123-4567\n📧 Email: support@clinicalcurator.com\n📍 Address: 123 Healthcare Avenue, Medical City\n\nOur support team is available Monday to Friday, 9 AM - 5 PM.';
    }

    if (lowerQuery.includes('emergency')) {
      return '🚨 For emergencies, please call:\n\n📞 Emergency Hotline: +1 (555) 911-HELP\n\nOur emergency department is open 24/7 with qualified staff ready to assist you.';
    }

    if (lowerQuery.includes('password') || lowerQuery.includes('forgot') || lowerQuery.includes('reset')) {
      return 'To reset your password:\n\n1. Go to the login page\n2. Click on "Forgot Password"\n3. Enter your registered email\n4. Check your email for reset instructions\n\nIf you need further assistance, contact our support team.';
    }

    if (lowerQuery.includes('register') || lowerQuery.includes('signup') || lowerQuery.includes('new patient')) {
      return 'To register as a new patient:\n\n1. Visit our registration page\n2. Enter your full name, email, and create a password\n3. Verify your email\n4. Complete your profile\n\nYou can register through the signup link on our homepage!';
    }

    if (lowerQuery.includes('bill') || lowerQuery.includes('payment') || lowerQuery.includes('cost')) {
      return 'For billing and payment information:\n\n• View your bills in the "Payment History" section\n• Contact our billing department for queries\n• We accept multiple payment methods\n\nWould you like help with a specific billing issue?';
    }

    if (lowerQuery.includes('medical record') || lowerQuery.includes('history')) {
      return 'Your medical records are securely stored and can be accessed by:\n\n1. Logging into your patient portal\n2. Going to "Patient Details" or "Medical History"\n\nFor privacy, records are only accessible to you and authorized healthcare providers.';
    }

    return 'Thank you for your question! I\'m here to help with general inquiries about our hospital services.\n\nHere are some things I can assist with:\n• Appointment booking\n• Doctor information\n• Hospital services\n• Account and login issues\n• Billing questions\n\nCould you please rephrase your question or contact our support team for specific assistance?';
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed bottom-4 right-4 w-[380px] h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden z-50 animate-slide-up"
          style={{ maxHeight: 'calc(100vh - 40px)' }}
        >
          <div className="bg-[#007a8a] text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot size={22} />
              <span className="font-semibold">Arogya Assistant</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-2 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    message.role === 'bot' ? 'bg-[#007a8a]/10' : 'bg-blue-100'
                  }`}>
                    {message.role === 'bot' ? (
                      <Bot size={16} className="text-[#007a8a]" />
                    ) : (
                      <User size={16} className="text-blue-600" />
                    )}
                  </div>
                  <div className={`rounded-2xl px-4 py-2 ${
                    message.role === 'bot' 
                      ? 'bg-white border border-gray-200 text-gray-700' 
                      : 'bg-[#007a8a] text-white'
                  }`}>
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                    <p className={`text-xs mt-1 ${message.role === 'bot' ? 'text-gray-400' : 'text-white/70'}`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#007a8a]/10 flex items-center justify-center">
                    <Bot size={16} className="text-[#007a8a]" />
                  </div>
                  <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t border-gray-200 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 bg-gray-100 border-none rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#007a8a]"
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="w-10 h-10 bg-[#007a8a] hover:bg-[#005f6c] disabled:bg-gray-300 text-white rounded-full flex items-center justify-center transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-[#007a8a] hover:bg-[#005f6c] text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center z-50 group"
        >
          <MessageCircle size={24} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <span className="w-2 h-2 bg-white rounded-full"></span>
          </span>
        </button>
      )}

      <style>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default ChatBot;
