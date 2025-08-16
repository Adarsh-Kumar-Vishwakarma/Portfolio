import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, X, Send, Bot, User, Mic, MicOff, Volume2, Settings, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isAI?: boolean;
}

interface Analytics {
  totalMessages: number;
  userMessages: number;
  botMessages: number;
  popularTopics: { [key: string]: number };
  sessionStart: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm Pratibha, an AI assistant of Adarsh. I can help you explore Adarsh's portfolio and learn more about it, skills, projects, and experience. What would you like to know?\n\n💡 Try asking about:\n• Skills & Technologies\n• Projects & Work\n• Experience & Background\n• Contact Information\n\n🎤 Click the mic button for voice input!",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [analytics, setAnalytics] = useState<Analytics>({
    totalMessages: 0,
    userMessages: 0,
    botMessages: 0,
    popularTopics: {},
    sessionStart: new Date(),
  });
  const [useAI, setUseAI] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const synthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  const chatbotRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close chatbot
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatbotRef.current && !chatbotRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.classList.add('chatbot-open');
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.classList.remove('chatbot-open');
    };
  }, [isOpen]);

  const quickActions = [
    { label: 'Skills', query: 'What are your skills?' },
    { label: 'Projects', query: 'Tell me about your projects' },
    { label: 'Experience', query: 'What is your work experience?' },
    { label: 'Contact', query: 'How can I contact you?' }
  ];

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };
    }
  }, []);

  // Initialize speech synthesis
  useEffect(() => {
    if ('speechSynthesis' in window) {
      synthesisRef.current = new SpeechSynthesisUtterance();
      synthesisRef.current.rate = 0.9;
      synthesisRef.current.pitch = 1;
      synthesisRef.current.volume = 0.8;
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const portfolioData = {
    name: 'Adarsh Kumar Vishwakarma',
    skills: {
      frontend: ['Angular', 'TypeScript', 'JavaScript', 'HTML', 'CSS'],
      backend: ['Node.js', 'Express.js', 'Java', 'Spring Boot', 'Hibernate'],
      databases: ['MongoDB', 'SQL', 'MySQL'],
      tools: ['Git', 'VS Code', 'Postman', 'Jenkins', 'Jira', 'Grafana', 'Docker', 'Keycloak', 'RabbitMQ', 'GitHub', 'SendGrid']
    },
    projects: [
      {
        title: 'E-Commerce Platform',
        description: 'Full-featured e-commerce platform with Angular and JSON Server. Includes user authentication, product management, and responsive UI.',
        technologies: ['Angular', 'JSON Server'],
        githubUrl: 'https://github.com/Adarsh-Kumar-Vishwakarma/E-comm.git'
      },
      {
        title: 'Book Management System',
        description: 'Spring Boot REST API with complete CRUD operations for book management. Features MySQL database integration and JPA/Hibernate ORM.',
        technologies: ['Spring Boot', 'Java 17', 'MySQL', 'JPA/Hibernate', 'Maven'],
        githubUrl: 'https://github.com/Adarsh-Kumar-Vishwakarma/Book_Management_System.git'
      },
      {
        title: 'FooKart - Food Ordering Web App',
        description: 'Modern Angular-based food ordering application with search, filtering, and shopping cart functionality.',
        technologies: ['Angular 17', 'TypeScript', 'CSS', 'Jasmine/Karma'],
        githubUrl: 'https://github.com/Adarsh-Kumar-Vishwakarma/FooKart.git'
      },
      {
        title: 'Online Shopping Management System',
        description: 'Spring Boot REST API with advanced entity relationships, DTO patterns, and validation.',
        technologies: ['Spring Boot', 'Java 17', 'MySQL', 'JPA/Hibernate', 'Hibernate Validator'],
        githubUrl: 'https://github.com/Adarsh-Kumar-Vishwakarma/Online-Shopping-Management-SpringBoot.git'
      }
    ],
    experience: [
      {
        title: 'Junior Software Developer',
        company: 'Edulab Educational Exchange Pvt. Ltd',
        duration: '05 May 2025 - Present',
        description: 'Working at Pashu Solapur University, contributing to microservices development in the admissions domain.'
      },
      {
        title: 'Software Developer',
        company: 'New Era It Consultancy',
        duration: 'Feb 2024 - Feb 2025',
        description: 'Developed CRM software solutions for clients like Reliance, Mapple, and iPlanet using Angular framework.'
      }
    ],
    contact: 'Available through the contact form on this website',
    education: 'Computer Science background with focus on AI/ML',
    interests: ['Artificial Intelligence', 'Web Development', 'Open Source', 'Innovation']
  };

  const updateAnalytics = (message: string, sender: 'user' | 'bot') => {
    setAnalytics(prev => {
      const newAnalytics = { ...prev };
      newAnalytics.totalMessages++;
      
      if (sender === 'user') {
        newAnalytics.userMessages++;
        // Track popular topics
        const topics = ['skill', 'project', 'experience', 'contact', 'angular', 'spring', 'java', 'frontend', 'backend'];
        topics.forEach(topic => {
          if (message.toLowerCase().includes(topic)) {
            newAnalytics.popularTopics[topic] = (newAnalytics.popularTopics[topic] || 0) + 1;
          }
        });
      } else {
        newAnalytics.botMessages++;
      }
      
      return newAnalytics;
    });
  };

  const generateLocalResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! How can I help you learn more about Adarsh's portfolio today?";
    }
    
    if (message.includes('skill') || message.includes('technology') || message.includes('tech')) {
      const allSkills = [
        ...portfolioData.skills.frontend,
        ...portfolioData.skills.backend,
        ...portfolioData.skills.databases,
        ...portfolioData.skills.tools
      ];
      return `Adarsh is skilled in: ${allSkills.join(', ')}. He's particularly strong in Angular, Spring Boot, and full-stack development.`;
    }
    
    if (message.includes('frontend') || message.includes('angular') || message.includes('typescript')) {
      return `Adarsh's frontend skills include: ${portfolioData.skills.frontend.join(', ')}. He's particularly experienced with Angular framework and TypeScript.`;
    }
    
    if (message.includes('backend') || message.includes('java') || message.includes('spring')) {
      return `Adarsh's backend skills include: ${portfolioData.skills.backend.join(', ')}. He has strong experience with Java, Spring Boot, and Node.js.`;
    }
    
    if (message.includes('project') || message.includes('work')) {
      const projectTitles = portfolioData.projects.map(p => p.title);
      return `Some of Adarsh's notable projects include: ${projectTitles.join(', ')}. You can see detailed information in the Projects section above.`;
    }
    
    if (message.includes('e-commerce') || message.includes('ecommerce')) {
      const ecommerceProject = portfolioData.projects.find(p => p.title.includes('E-Commerce'));
      return `${ecommerceProject?.title}: ${ecommerceProject?.description} Built with ${ecommerceProject?.technologies.join(', ')}. Check it out: ${ecommerceProject?.githubUrl}`;
    }
    
    if (message.includes('food') || message.includes('fookart')) {
      const foodProject = portfolioData.projects.find(p => p.title.includes('FooKart'));
      return `${foodProject?.title}: ${foodProject?.description} Built with ${foodProject?.technologies.join(', ')}. Check it out: ${foodProject?.githubUrl}`;
    }
    
    if (message.includes('book') || message.includes('management')) {
      const bookProject = portfolioData.projects.find(p => p.title.includes('Book'));
      return `${bookProject?.title}: ${bookProject?.description} Built with ${bookProject?.technologies.join(', ')}. Check it out: ${bookProject?.githubUrl}`;
    }
    
    if (message.includes('experience') || message.includes('background') || message.includes('job')) {
      const experienceText = portfolioData.experience.map(exp => 
        `${exp.title} at ${exp.company} (${exp.duration}): ${exp.description}`
      ).join('\n\n');
      return `Adarsh's professional experience:\n\n${experienceText}`;
    }
    
    if (message.includes('contact') || message.includes('email') || message.includes('reach')) {
      return `You can contact Adarsh through the contact form on this website, or check out the Contact section above for more details.`;
    }
    
    if (message.includes('education') || message.includes('degree') || message.includes('study')) {
      return `Adarsh has a background in Computer Science with a focus on AI/ML. He's passionate about continuous learning and staying updated with the latest technologies.`;
    }
    
    if (message.includes('ai') || message.includes('machine learning') || message.includes('ml')) {
      return `Adarsh has a strong interest in AI and Machine Learning. He's worked on various AI projects and is always exploring new developments in the field.`;
    }
    
    if (message.includes('tools') || message.includes('software')) {
      return `Adarsh uses various tools and technologies: ${portfolioData.skills.tools.join(', ')}.`;
    }
    
    if (message.includes('database') || message.includes('sql') || message.includes('mongodb')) {
      return `Adarsh's database skills include: ${portfolioData.skills.databases.join(', ')}. He has experience with both SQL and NoSQL databases.`;
    }
    
    if (message.includes('thank')) {
      return "You're welcome! Feel free to ask me anything else about Adarsh's portfolio.";
    }
    
    return "I'm here to help you learn about Adarsh's portfolio! You can ask me about his skills, projects, experience, or anything else related to his work. Try asking about his skills, projects, or experience!";
  };

  const callAIAPI = async (userMessage: string): Promise<string> => {
    try {
      // Using a free AI API (you can replace with OpenAI, Claude, etc.)
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY || 'your-api-key-here'}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `You are an AI assistant for Adarsh Kumar Vishwakarma's portfolio. You have access to this information:
                - Skills: ${JSON.stringify(portfolioData.skills)}
                - Projects: ${JSON.stringify(portfolioData.projects)}
                - Experience: ${JSON.stringify(portfolioData.experience)}
                - Contact: ${portfolioData.contact}
                - Education: ${portfolioData.education}
                
                Provide helpful, accurate responses about Adarsh's portfolio. Keep responses conversational and informative.`
            },
            {
              role: 'user',
              content: userMessage
            }
          ],
          max_tokens: 300,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error('AI API call failed');
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.log('AI API failed, falling back to local responses');
      return generateLocalResponse(userMessage);
    }
  };

  const generateResponse = async (userMessage: string): Promise<string> => {
    if (useAI) {
      return await callAIAPI(userMessage);
    } else {
      return generateLocalResponse(userMessage);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    updateAnalytics(inputValue, 'user');
    setInputValue('');
    setIsTyping(true);

    // Generate response
    const response = await generateResponse(inputValue);
    
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date(),
        isAI: useAI,
      };

      setMessages(prev => [...prev, botResponse]);
      updateAnalytics(response, 'bot');
      setIsTyping(false);

      // Auto-speak response if voice is enabled
      if (synthesisRef.current && !isSpeaking) {
        speakText(response);
      }
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickAction = (query: string) => {
    setInputValue(query);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const speakText = (text: string) => {
    if (synthesisRef.current && 'speechSynthesis' in window) {
      setIsSpeaking(true);
      synthesisRef.current.text = text;
      synthesisRef.current.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(synthesisRef.current);
    }
  };

  const toggleAI = () => {
    setUseAI(!useAI);
  };

  const getPopularTopics = () => {
    return Object.entries(analytics.popularTopics)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([topic, count]) => ({ topic, count }));
  };

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => !isOpen && setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-[#4fd1c5] hover:bg-[#38b2ac] border-2 border-[#2d3748] shadow-lg transition-all duration-300 chatbot-button relative"
        style={{ pointerEvents: 'auto' }}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <>
          {/* Overlay background */}
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30" />
          
          <Card className="fixed bottom-32 right-6 z-40 w-80 h-[28rem] bg-[#181c23] border-2 border-[#4fd1c5] shadow-2xl transition-all duration-300 rounded-xl overflow-visible chatbot-window backdrop-blur-sm" ref={chatbotRef}>
            <CardHeader className="bg-gradient-to-r from-[#23272e] to-[#2d3748] border-b-2 border-[#4fd1c5] p-4 chatbot-header rounded-t-xl">
              <CardTitle className="text-[#4fd1c5] font-mono text-base flex items-center gap-3 !text-base !font-semibold !leading-none !tracking-normal">
                <Bot className="h-5 w-5" />
                AI Assistant
                <div className="flex items-center gap-3 ml-auto">
                  {/* <Button
                    onClick={toggleAI}
                    className={cn(
                      "bg-[#181c23] hover:bg-[#2d3748] text-[#4fd1c5] border border-[#4fd1c5] p-2 h-8 w-8 rounded-md transition-all duration-200 hover:scale-110 relative",
                      useAI && "bg-[#2d3748] border-[#68d391]"
                    )}
                    title={useAI ? 'Switch to Local AI' : 'Switch to Cloud AI'}
                  >
                    <Settings className="h-4 w-4" />
                    {useAI && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#68d391] rounded-full animate-pulse"></div>
                    )}
                  </Button> */}
                  <Button
                    onClick={() => setShowAnalytics(!showAnalytics)}
                    className={cn(
                      "bg-[#181c23] hover:bg-[#2d3748] text-[#4fd1c5] border border-[#4fd1c5] p-2 h-8 w-8 rounded-md transition-all duration-200 hover:scale-110 relative",
                      showAnalytics && "bg-[#2d3748] border-[#f6e05e]"
                    )}
                    title="Analytics"
                  >
                    <BarChart3 className="h-4 w-4" />
                    {showAnalytics && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#f6e05e] rounded-full animate-pulse"></div>
                    )}
                  </Button>
                  <span className="text-[#68d391] text-sm animate-pulse status-indicator">●</span>
                </div>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-0 h-full flex flex-col">
              {showAnalytics ? (
                <div className="flex-1 p-4 bg-[#181c23] analytics-slide">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[#f6e05e] font-mono text-sm">📊 Chat Analytics</h3>
                    <Button
                      onClick={() => setShowAnalytics(false)}
                      className="bg-[#2d3748] hover:bg-[#4a5568] text-[#68d391] border border-[#4a5568] p-1 h-6 w-6 rounded text-xs transition-all duration-200 hover:scale-105"
                      title="Back to Chat"
                    >
                      ←
                    </Button>
                  </div>
                  <div className="space-y-3 text-xs">
                    <div className="bg-[#2d3748] p-3 rounded-lg border border-[#4a5568]">
                      <div className="flex justify-between mb-2">
                        <span className="text-[#a0aec0]">Total Messages:</span>
                        <span className="text-[#4fd1c5] font-bold">{analytics.totalMessages}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-[#a0aec0]">User Messages:</span>
                        <span className="text-[#68d391] font-bold">{analytics.userMessages}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#a0aec0]">Bot Responses:</span>
                        <span className="text-[#f6e05e] font-bold">{analytics.botMessages}</span>
                      </div>
                    </div>
                    
                    <div className="bg-[#2d3748] p-3 rounded-lg border border-[#4a5568]">
                      <span className="text-[#a0aec0] block mb-2">Popular Topics:</span>
                      <div className="space-y-1">
                        {getPopularTopics().length > 0 ? (
                          getPopularTopics().map(({ topic, count }) => (
                            <div key={topic} className="flex justify-between">
                              <span className="text-[#68d391] capitalize">{topic}:</span>
                              <span className="text-[#4fd1c5] font-bold">{count}</span>
                            </div>
                          ))
                        ) : (
                          <span className="text-[#718096] italic">No topics tracked yet</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <ScrollArea 
                  className="flex-1 p-4 chatbot-scroll-area"
                  style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    overflow: 'auto'
                  }}
                  data-scrollbar-hidden="true"
                >
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          "flex gap-3 message-container",
                          message.sender === 'user' ? 'justify-end' : 'justify-start'
                        )}
                      >
                        {message.sender === 'bot' && (
                          <div className="w-7 h-7 rounded-full bg-[#4fd1c5] flex items-center justify-center flex-shrink-0 message-avatar">
                            <Bot className="h-4 w-4 text-[#181c23]" />
                          </div>
                        )}
                        
                        <div
                          className={cn(
                            "max-w-[85%] p-3 rounded-lg text-sm relative shadow-sm message-bubble",
                            message.sender === 'user'
                              ? 'bg-[#4fd1c5] text-[#181c23] font-mono rounded-br-md'
                              : 'bg-[#2d3748] text-[#e2e8f0] font-mono border border-[#4a5568] rounded-bl-md'
                          )}
                        >
                          <div className="whitespace-pre-line leading-relaxed">{message.text}</div>
                          {message.isAI && message.sender === 'bot' && (
                            <div className="absolute -top-1 -right-1 bg-[#f6e05e] text-[#181c23] text-xs px-1.5 py-0.5 rounded-full ai-badge">
                              AI
                            </div>
                          )}
                        </div>
                        
                        {message.sender === 'user' && (
                          <div className="w-7 h-7 rounded-full bg-[#4fd1c5] flex items-center justify-center flex-shrink-0 message-avatar">
                            <User className="h-4 w-4 text-[#181c23]" />
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {isTyping && (
                      <div className="flex gap-3 justify-start message-container">
                        <div className="w-7 h-7 rounded-full bg-[#4fd1c5] flex items-center justify-center flex-shrink-0 message-avatar">
                          <Bot className="h-4 w-4 text-[#181c23]" />
                        </div>
                        <div className="bg-[#2d3748] text-[#e2e8f0] font-mono border border-[#4a5568] p-3 rounded-lg text-sm message-bubble">
                          <span className="typing-dots">AI is typing</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div ref={messagesEndRef} />
                </ScrollArea>
              )}
              
              <div className="p-4 border-t border-[#4a5568] bg-[#23272e]">
                {/* Quick Action Buttons */}
                <div className="quick-actions-grid">
                  {quickActions.slice(0, 2).map((action, index) => (
                    <Button
                      key={index}
                      onClick={() => handleQuickAction(action.query)}
                      disabled={isTyping}
                      className="chatbot-btn-secondary font-mono text-xs px-3 py-2 h-9 rounded-lg transition-all duration-200 hover:scale-105 quick-action-btn"
                    >
                      {action.label}
                    </Button>
                  ))}
                  {quickActions.slice(2, 4).map((action, index) => (
                    <Button
                      key={index + 2}
                      onClick={() => handleQuickAction(action.query)}
                      disabled={isTyping}
                      className="chatbot-btn-secondary font-mono text-xs px-3 py-2 h-9 rounded-lg transition-all duration-200 hover:scale-105 quick-action-btn"
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
                
                <div className="flex gap-3 items-center">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about the portfolio..."
                    className="flex-1 bg-[#181c23] border-2 border-[#4fd1c5] text-[#e2e8f0] font-mono text-sm placeholder:text-[#718096] focus:border-[#4fd1c5] focus:ring-2 focus:ring-[#4fd1c5] focus:ring-opacity-20 rounded-lg h-11 chatbot-input transition-all duration-200"
                  />
                  <Button
                    onClick={toggleVoiceInput}
                    disabled={isTyping}
                    className={cn(
                      "chatbot-btn-secondary px-3 h-11 w-11 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg",
                      isListening && "bg-[#f56565] text-white border-[#f56565] voice-listening shadow-lg"
                    )}
                    title="Voice Input"
                  >
                    {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                  </Button>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="chatbot-btn-primary font-mono px-3 h-11 w-11 rounded-full transition-all duration-200 disabled:opacity-50 hover:scale-105 hover:shadow-lg shadow-md"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </>
  );
};

export default Chatbot;
