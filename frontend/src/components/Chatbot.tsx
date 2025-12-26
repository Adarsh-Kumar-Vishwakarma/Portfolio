import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  MessageCircle,
  Send,
  Bot as AIIcon,
  User as UserIcon,
  Mic,
  MicOff,
  ShieldCheck,
  Sparkles,
  BarChart3,
  Download,
  RefreshCw,
  Settings2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip as ReTooltip, ResponsiveContainer } from 'recharts';

const API_BASE_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:3001/api/chat'
  : 'https://portfoliobackend-steel.vercel.app/api';

// =====================
// Types
// =====================
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'AI';
  timestamp: string;
  isAI?: boolean;
  meta?: {
    defenseQuality?: 'low' | 'medium' | 'high';
    hallucinationRisk?: 'low' | 'medium' | 'high';
    tone?: 'friendly' | 'logical' | 'playful' | 'confident';
  };
}

interface Analytics {
  totalMessages: number;
  userMessages: number;
  AIMessages: number;
  popularTopics: { [key: string]: number };
  sessionStart: string;
}

// =====================
// Component
// =====================
const ChatAI: React.FC = () => {
  // UI state
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{
    id: '1',
    text:
      "Hello! I’m Adiva, a simple AI prototype and Adarsh’s AI assistant. You can ask me about Adarsh or about myself—how I was built, what I can do, and why I answer the way I do. Try asking: “Who created you?”.",
    sender: 'AI',
    timestamp: new Date().toISOString(),
    isAI: true,
  }]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakMode, setSpeakMode] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [defensiveMode, setDefensiveMode] = useState(true);
  const [personality, setPersonality] = useState<'friendly' | 'logical' | 'playful' | 'confident'>('logical');
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  // Analytics
  const [analytics, setAnalytics] = useState<Analytics>(() => ({
    totalMessages: 0,
    userMessages: 0,
    AIMessages: 0,
    popularTopics: {},
    sessionStart: new Date().toISOString(),
  }));

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const synthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  const chatAIRef = useRef<HTMLDivElement>(null);

  // =====================
  // Static portfolio data (authoritative context)
  // =====================
  const portfolioData = {
    assistantName: 'Adiva',
    owner: {
      name: 'Adarsh Kumar Vishwakarma',
      role: 'Full-stack Developer',
    },
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
    contact: 'Please use the contact form on this website to get in touch.',
    education: 'IT background with focus on AI/ML and web development.',
    interests: ['Artificial Intelligence', 'Web Development', 'Open Source', 'Innovation'],
  } as const;

  // =====================
  // Helpers: UI
  // =====================
  const quickActions = [
    { label: 'Skills', query: 'What are your skills?' },
    { label: 'Projects', query: 'Tell me about your projects' },
    { label: 'Experience', query: 'What is your work experience?' },
    { label: 'Contact', query: 'How can I contact you?' },
    // { label: 'Defend Angular', query: 'Why is Angular good for large apps? Defend it.' }
  ];

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(() => { scrollToBottom(); }, [messages]);
  useEffect(() => { if (isOpen && inputRef.current) inputRef.current.focus(); }, [isOpen]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatAIRef.current && !chatAIRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.classList.add('chatAI-open');
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.classList.remove('chatAI-open');
    };
  }, [isOpen]);

  // Speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SR();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.onresult = (e: any) => {
        const transcript = e.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
      };
      recognitionRef.current.onerror = () => setIsListening(false);
    }
  }, []);

  // Speech synthesis
  useEffect(() => {
    if ('speechSynthesis' in window) {
      synthesisRef.current = new SpeechSynthesisUtterance();
      synthesisRef.current.rate = 0.95;
      synthesisRef.current.pitch = 1;
      synthesisRef.current.volume = 0.9;
    }
  }, []);

  useEffect(() => {
    if (!speakMode && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [speakMode]);
  

  const speakText = (text: string) => {
    if (synthesisRef.current && 'speechSynthesis' in window) {
      setIsSpeaking(true);
      synthesisRef.current.text = text;
      synthesisRef.current.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(synthesisRef.current);
    }
  };

  // =====================
  // Analytics helpers
  // =====================
  const updateAnalytics = (message: string, sender: 'user' | 'AI') => {
    setAnalytics((prev) => {
      const next = { ...prev };
      next.totalMessages++;
      if (sender === 'user') {
        next.userMessages++;
        const topics = ['skill', 'project', 'experience', 'contact', 'angular', 'spring', 'java', 'frontend', 'backend'];
        topics.forEach((topic) => {
          if (message.toLowerCase().includes(topic)) {
            next.popularTopics[topic] = (next.popularTopics[topic] || 0) + 1;
          }
        });
      } else next.AIMessages++;
      return next;
    });
  };

  const getPopularTopics = () =>
    Object.entries(analytics.popularTopics)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([topic, count]) => ({ name: topic, value: count }));

  // Persist analytics in localStorage (optional)
  useEffect(() => {
    try {
      localStorage.setItem("chatAI_analytics", JSON.stringify(analytics));
    } catch { }
  }, [analytics]);

  // =====================
  // Dynamic + Defensive Brain
  // =====================
  const detectChallenge = (text: string) => {
    const t = text.toLowerCase();
    const triggers = ['defend', 'why', 'how is that', "i disagree", 'not true', 'prove', 'evidence', 'source'];
    return triggers.some((w) => t.includes(w));
  };

  const buildSystemPrompt = () => `
You are ${portfolioData.assistantName}, an AI assistant built by ${portfolioData.owner.name} (${portfolioData.owner.role}).
Your mission: help visitors explore Adarsh's portfolio AND explain yourself when asked.

Behavioral rules:
- Persona: ${personality} but respectful.
- Always be concise, accurate, and actionable.
- If asked about yourself (identity, creator, stack, abilities), answer clearly.
- If asked who created or built you, always state: ${portfolioData.owner.name}.
- In defensive mode, anticipate counterarguments and include a compact defense.
- If uncertain, say what you DON’T know and suggest what you CAN do.
- Avoid hallucinations: don’t invent non-existent projects or employers.
- Prefer bullet points when listing skills or steps.

Authoritative context (do not contradict):
- Skills: ${JSON.stringify(portfolioData.skills)}
- Projects: ${JSON.stringify(portfolioData.projects)}
- Experience: ${JSON.stringify(portfolioData.experience)}
- Contact: ${portfolioData.contact}
- Education: ${portfolioData.education}
`;

  // Ask the model to return a structured JSON we can parse
  const buildUserPrompt = (userMessage: string, wantDefense: boolean) => `
Task: Answer the user's message about Adarsh or about you (${portfolioData.assistantName}).
Return STRICT JSON with keys:
  answer: string (final message to show),
  defense: string (one short paragraph defending reasoning; empty if not needed),
  hallucination_risk: 'low'|'medium'|'high',
  defense_quality: 'low'|'medium'|'high',
  tone: 'friendly'|'logical'|'playful'|'confident'.
User message: """${userMessage}"""
${wantDefense ? 'The user seems challenging. Include a defense.' : 'Include defense only if helpful.'}
Ensure the JSON is valid. No Markdown, no backticks.`;

  const callAIJSON = async (systemPrompt: string, userPrompt: string) => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userPrompt }),
      });
      if (!response.ok) throw new Error('AI API call failed');
      const data = await response.json();
      return (data && typeof data.reply === 'string') ? data.reply : '';
    } catch (e) {
      return '';
    }
  };

  const safeParse = <T,>(raw: string, fallback: T): T => {
    try { return JSON.parse(raw) as T; } catch { return fallback; }
  };

  // Local high-confidence defenses for common prompts (used when the API doesn't return structured JSON)
  // const buildLocalDefensiveAnswer = (
  //   userMessage: string,
  // ): { text: string; meta: { defenseQuality: 'low' | 'medium' | 'high'; hallucinationRisk: 'low' | 'medium' | 'high'; tone: Message['meta']['tone'] } } | null => {
  //   const m = userMessage.toLowerCase();
  //   const asksAngularDefense = m.includes('angular') && (m.includes('defend') || m.includes('why') || m.includes('large'));
  //   if (asksAngularDefense) {
  //     const text = [
  //       'Angular scales well for large apps because it provides a complete, opinionated platform that keeps big teams aligned:',
  //       '',
  //       '- Architecture: modules, components, DI, and routing give a consistent structure across hundreds of features.',
  //       '- TypeScript-first: strong typing improves refactors, API contracts, and long-term maintainability.',
  //       '- DI and Testing: built-in dependency injection, TestBed, and tooling make complex code composable and testable.',
  //       '- RxJS and Reactive Patterns: streams make async/UI state predictable at scale.',
  //       '- Tooling: CLI, schematics, builders, and strict mode standardize quality and speed up developer onboarding.',
  //       '- Performance: AOT, Ivy, standalone components, and code-splitting deliver fast, tree-shaken bundles.',
  //       '- Long-term support: versioned releases, migrations, and best-practice guides reduce upgrade risk.',
  //       '',
  //       'In enterprise settings (multi-teams, shared libs, long lifetimes), these guardrails reduce drift and keep velocity high.'
  //     ].join('\n');
  //     return { text, meta: { defenseQuality: 'high', hallucinationRisk: 'low', tone: personality } };
  //   }
  //   return null;
  // };

  // Local portfolio-grounded answers for common queries
  const buildLocalPortfolioAnswer = (
    userMessage: string,
  ): {
    text: string;
    meta: {
      defenseQuality: 'low' | 'medium' | 'high';
      hallucinationRisk: 'low' | 'medium' | 'high';
      tone: Message['meta']['tone'];
    };
  } | null => {
    const m = userMessage.toLowerCase();

    const mentionsCreator = (
      m.includes('who created you') ||
      m.includes('who built you') ||
      m.includes('who made you') ||
      m.includes('your creator') ||
      (m.includes('creator') && m.includes('you'))
    );
    if (mentionsCreator) {
      const text = `I'm ${portfolioData.assistantName}, created by ${portfolioData.owner.name} (${portfolioData.owner.role}). I exist to showcase Adarsh's work and answer questions about his skills, projects, and experience.`;
      return { text, meta: { defenseQuality: 'low', hallucinationRisk: 'low', tone: personality } };
    }

    const asksIdentity = (
      m.includes('who are you') ||
      m.includes('your name') ||
      m.includes('what is your name') ||
      m.includes('who is Adiva')
    );
    if (asksIdentity) {
      const text = `I'm ${portfolioData.assistantName}, Adarsh's AI assistant. Ask about his skills, projects, or experience, and I'll summarize with examples.`;
      return { text, meta: { defenseQuality: 'low', hallucinationRisk: 'low', tone: personality } };
    }

    const asksSkills = m.includes('skills') || m.includes('skill');
    const asksFrontend = m.includes('frontend') || m.includes('angular') || m.includes('typescript');
    const asksBackend = m.includes('backend') || m.includes('java') || m.includes('spring');
    const asksDatabases = m.includes('database') || m.includes('databases') || m.includes('db') || m.includes('sql') || m.includes('mongodb');
    const asksTools = m.includes('tools') || m.includes('tooling') || m.includes('software');

    if (asksSkills || asksFrontend || asksBackend || asksDatabases || asksTools) {
      const lines: string[] = [];
      lines.push('Adarsh’s core skills:');
      if (asksSkills || asksFrontend) lines.push(`- Frontend: ${portfolioData.skills.frontend.join(', ')}`);
      if (asksSkills || asksBackend) lines.push(`- Backend: ${portfolioData.skills.backend.join(', ')}`);
      if (asksSkills || asksDatabases) lines.push(`- Databases: ${portfolioData.skills.databases.join(', ')}`);
      if (asksSkills || asksTools) lines.push(`- Tools: ${portfolioData.skills.tools.join(', ')}`);
      return { text: lines.join('\n'), meta: { defenseQuality: 'low', hallucinationRisk: 'low', tone: personality } };
    }

    if (m.includes('project') || m.includes('work')) {
      const lines: string[] = [];
      lines.push('Highlighted projects:');
      portfolioData.projects.forEach((p) => {
        lines.push(`- ${p.title}: ${p.description}`);
        lines.push(`  Tech: ${p.technologies.join(', ')}`);
        lines.push(`  Repo: ${p.githubUrl}`);
      });
      return { text: lines.join('\n'), meta: { defenseQuality: 'low', hallucinationRisk: 'low', tone: personality } };
    }

    // Specific project matches
    const ecommerceProject = portfolioData.projects.find(p => p.title.toLowerCase().includes('e-commerce'));
    if (ecommerceProject && (m.includes('ecommerce') || m.includes('e-commerce'))) {
      const text = `${ecommerceProject.title}: ${ecommerceProject.description} Built with ${ecommerceProject.technologies.join(', ')}. Check it out: ${ecommerceProject.githubUrl}`;
      return { text, meta: { defenseQuality: 'low', hallucinationRisk: 'low', tone: personality } };
    }

    const foodProject = portfolioData.projects.find(p => p.title.toLowerCase().includes('fookart') || p.title.toLowerCase().includes('food'));
    if (foodProject && (m.includes('food') || m.includes('fookart'))) {
      const text = `${foodProject.title}: ${foodProject.description} Built with ${foodProject.technologies.join(', ')}. Check it out: ${foodProject.githubUrl}`;
      return { text, meta: { defenseQuality: 'low', hallucinationRisk: 'low', tone: personality } };
    }

    const bookProject = portfolioData.projects.find(p => p.title.toLowerCase().includes('book'));
    if (bookProject && (m.includes('book') || m.includes('management'))) {
      const text = `${bookProject.title}: ${bookProject.description} Built with ${bookProject.technologies.join(', ')}. Check it out: ${bookProject.githubUrl}`;
      return { text, meta: { defenseQuality: 'low', hallucinationRisk: 'low', tone: personality } };
    }

    if (m.includes('experience') || m.includes('background') || m.includes('job')) {
      const lines: string[] = [];
      lines.push('Experience:');
      portfolioData.experience.forEach((e) => {
        lines.push(`- ${e.title} @ ${e.company} (${e.duration}) – ${e.description}`);
      });
      return { text: lines.join('\n'), meta: { defenseQuality: 'low', hallucinationRisk: 'low', tone: personality } };
    }

    if (m.includes('contact') || m.includes('email') || m.includes('reach')) {
      const text = `Contact: ${portfolioData.contact}`;
      return { text, meta: { defenseQuality: 'low', hallucinationRisk: 'low', tone: personality } };
    }

    if (m.includes('education') || m.includes('degree') || m.includes('study')) {
      const text = `Education: ${portfolioData.education}`;
      return { text, meta: { defenseQuality: 'low', hallucinationRisk: 'low', tone: personality } };
    }

    if (m.includes('interest')) {
      const text = `Interests: ${portfolioData.interests.join(', ')}`;
      return { text, meta: { defenseQuality: 'low', hallucinationRisk: 'low', tone: personality } };
    }

    if (m.includes('thank')) {
      const text = "You're welcome! Feel free to ask me anything else about Adarsh's portfolio.";
      return { text, meta: { defenseQuality: 'low', hallucinationRisk: 'low', tone: personality } };
    }

    return null;
  };


  // One-pass or two-pass (self-critique) generation
  const generateDefensiveResponse = async (userMessage: string) => {
    const wantDefense = defensiveMode || detectChallenge(userMessage);
    const sys = buildSystemPrompt();
    const u1 = buildUserPrompt(userMessage, wantDefense);

    // Local portfolio-grounded routing for high-precision queries
    const localPortfolio = buildLocalPortfolioAnswer(userMessage);
    if (localPortfolio) return localPortfolio;

    // Pass 1: draft structured answer
    const raw1 = await callAIJSON(sys, u1);
    const draft = safeParse<{
      answer: string; defense: string; hallucination_risk: 'low' | 'medium' | 'high'; defense_quality: 'low' | 'medium' | 'high'; tone: Message['meta']['tone'];
    }>(raw1, { answer: '', defense: '', hallucination_risk: 'medium', defense_quality: 'medium', tone: personality });

    // If the API did not return the requested JSON, try a local targeted answer before generic fallback
    if (!draft.answer) {
      // const local = buildLocalDefensiveAnswer(userMessage);
      // if (local) return local;
      return {
        text: "I'm Adiva. I can walk you through Adarsh's skills, projects, and experience. Ask me anything — and if you challenge me, I'll justify my reasoning.",
        meta: { defenseQuality: 'low' as const, hallucinationRisk: 'low' as const, tone: personality },
      };
    }

    // Optional Pass 2: self-critique to strengthen defense
    let final = draft;
    if (wantDefense) {
      const critiquePrompt = `You wrote this answer: ${JSON.stringify(draft)}\nImprove the defense: make it tighter, cite concrete examples from the provided portfolio context (not the web), and reduce hallucination risk. Return the SAME JSON shape only.`;
      const raw2 = await callAIJSON(sys, critiquePrompt);
      const improved = safeParse<typeof draft>(raw2, draft);
      final = improved;
    }

    return {
      text: [final.answer, final.defense ? `\n\n🛡️ Defense:\n${final.defense}` : ''].join(''),
      meta: {
        defenseQuality: final.defense_quality,
        hallucinationRisk: final.hallucination_risk,
        tone: final.tone || personality,
      },
    };
  };

  // =====================
  // Messaging logic
  // =====================
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    updateAnalytics(inputValue, 'user');
    setInputValue('');
    setIsTyping(true);

    const { text, meta } = await generateDefensiveResponse(userMessage.text);

    const AIMessage: Message = {
      id: (Date.now() + 1).toString(),
      text,
      sender: 'AI',
      timestamp: new Date().toISOString(),
      isAI: true,
      meta,
    };

    setMessages((prev) => [...prev, AIMessage]);
    updateAnalytics(text, 'AI');
    setIsTyping(false);

    // auto voice
    if (speakMode && !isSpeaking) {
      speakText(AIMessage.text);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickAction = (query: string) => {
    setInputValue(query);
    setTimeout(() => handleSendMessage(), 80);
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

  // Export transcript
  const downloadTranscript = () => {
    const text = messages
      .map((m) => {
        const time = new Date(m.timestamp).toLocaleString();
        const who = m.sender === "AI" ? "Adiva" : "You";
        return `[${time}] ${who}:\n${m.text}\n`;
      })
      .join("\n");

    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `chat-transcript-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  // const resetConversation = () => {
  //   setMessages([DEFAULT_WELCOME]);
  //   setError(null);
  // };

  const COLORS = ["#4fd1c5", "#f6e05e", "#68d391", "#63b3ed", "#f56565"]; // used by recharts cells


  // =====================
  // Render
  // =====================
  return (
    <TooltipProvider>
      {/* Floating Chat Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => !isOpen && setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-[#4fd1c5] hover:bg-[#38b2ac] border-2 border-[#2d3748] shadow-lg transition-all duration-300 chatbot-button relative"
        style={{ pointerEvents: "auto" }}
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30" />
          <Card
            ref={chatAIRef}
            className="fixed bottom-28 right-6 z-40 w-96 h-[34rem] bg-[#181c23] border-2 border-[#4fd1c5] shadow-2xl rounded-xl overflow-visible"
            role="dialog"
            aria-label="AI chat window"
          >
            <CardHeader className="bg-gradient-to-r from-[#23272e] to-[#2d3748] border-b-2 border-[#4fd1c5] p-3 rounded-tl-xl rounded-tr-xl">
              <CardTitle className="text-[#4fd1c5] font-mono text-base flex items-center gap-3">
                <AIIcon className="h-5 w-5" />AI Assistant
                <div className="ml-auto flex items-center gap-2">
                  {/* Defensive mode */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={() => setDefensiveMode((v) => !v)}
                        className={cn(
                          "relative bg-[#181c23] hover:bg-[#2d3748] text-[#4fd1c5] border border-[#4fd1c5] h-8 px-2 rounded-md flex items-center gap-1 transition-all duration-200 hover:scale-110 ",
                          defensiveMode && "bg-[#2d3748] border-[#f6e05e]"
                        )}
                        title={defensiveMode ? "Defensive mode: ON" : "Defensive mode: OFF"}
                      >
                        <ShieldCheck className="h-4 w-4" />
                        <span className="text-xs">Defend</span>
                        {defensiveMode && (
                          <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#f6e05e] rounded-full animate-pulse" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Anticipate pushback and add short defenses.</TooltipContent>
                  </Tooltip>

                  {/* Personality cycle */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={() => {
                          const order: Message["meta"]["tone"][] = [
                            "friendly",
                            "logical",
                            "playful",
                            "confident",
                          ];
                          const idx = order.indexOf(personality);
                          setPersonality(order[(idx + 1) % order.length] as any);
                        }}
                        className="relative bg-[#181c23] hover:bg-[#2d3748] text-[#f6e05e] border border-[#4fd1c5] h-8 px-2 rounded-md flex items-center gap-1 transition-all duration-200 hover:scale-110"
                        title={`Personality: ${personality}`}
                      >
                        <Sparkles className="h-4 w-4" />
                        <span className="text-xs capitalize">{personality}</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Cycle response tone</TooltipContent>
                  </Tooltip>

                  {/* Analytics */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={() => setShowAnalytics(!showAnalytics)}
                        className={cn(
                          "bg-[#181c23] hover:bg-[#2d3748] text-[#4fd1c5] border border-[#4fd1c5] p-2 h-8 w-8 rounded-md transition-all duration-200 hover:scale-110 relative",
                          showAnalytics && "bg-[#2d3748] border-[#f6e05e]"
                        )}
                        title="Analytics"
                        aria-pressed={showAnalytics}
                      >
                        <BarChart3 className="h-4 w-4" />
                        {showAnalytics && (
                          <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#f6e05e] rounded-full animate-pulse" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Toggle chat analytics</TooltipContent>
                  </Tooltip>

                  {/* Settings quick actions */}
                  {/* <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={downloadTranscript}
                        className="bg-[#181c23] hover:bg-[#2d3748] text-[#4fd1c5] border border-[#4fd1c5] p-2 h-8 w-8 rounded-md"
                        aria-label="Download transcript"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Download transcript</TooltipContent>
                  </Tooltip> */}

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={() => setSpeakMode((v) => !v)}
                        className={cn(
                          "relative bg-[#181c23] hover:bg-[#2d3748] border h-8 px-2 rounded-md flex items-center gap-1 transition-all duration-200 hover:scale-110",
                          speakMode
                            ? "text-[#68d391] border-[#68d391] bg-[#2d3748]"
                            : "text-[#a0aec0] border-[#4a5568]"
                        )}
                        aria-pressed={speakMode}
                        title={speakMode ? "Speak mode: ON" : "Speak mode: OFF"}
                      >
                        {/* {speakMode ? (
                          <Mic className="h-4 w-4" />
                        ) : (
                          <MicOff className="h-4 w-4" />
                        )} */}
                        <span className="text-xs">Speak</span>

                        {speakMode && (
                          <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#68d391] rounded-full animate-pulse" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {speakMode ? "AI will speak replies" : "AI will stay silent"}
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    {/* <TooltipTrigger asChild>
                      <Button
                        onClick={resetConversation}
                        className="bg-[#181c23] hover:bg-[#2d3748] text-[#f56565] border border-[#f56565] p-2 h-8 w-8 rounded-md"
                        aria-label="Reset conversation"
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger> */}
                    <TooltipContent>Reset conversation</TooltipContent>
                  </Tooltip>
                </div>
              </CardTitle>
            </CardHeader>

            <CardContent className="p-0 h-full flex flex-col overflow-hidden">
              {showAnalytics ? (
                <div className="flex-1 p-4 bg-[#181c23] analytics-slide">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[#f6e05e] font-mono text-sm">📊 Chat Analytics</h3>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#a0aec0]">Defend</span>
                        <Switch checked={defensiveMode} onCheckedChange={setDefensiveMode} />
                      </div>
                      <Button
                        onClick={() => setShowAnalytics(false)}
                        className="bg-[#2d3748] hover:bg-[#4a5568] text-[#68d391] border border-[#4a5568] p-1 h-7 rounded text-xs transition-all duration-200 hover:scale-105"
                        title="Back to Chat"
                      >
                        ← Back
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-[#2d3748] p-3 rounded-lg border border-[#4a5568]">
                      <div className="flex justify-between mb-1"><span className="text-[#a0aec0]">Total</span><span className="text-[#4fd1c5] font-bold">{analytics.totalMessages}</span></div>
                      <div className="flex justify-between mb-1"><span className="text-[#a0aec0]">User</span><span className="text-[#68d391] font-bold">{analytics.userMessages}</span></div>
                      <div className="flex justify-between"><span className="text-[#a0aec0]">AI</span><span className="text-[#f6e05e] font-bold">{analytics.AIMessages}</span></div>
                    </div>

                    <div className="bg-[#2d3748] p-3 rounded-lg border border-[#4a5568] h-[140px]">
                      <span className="text-[#a0aec0] block mb-2">Popular Topics</span>
                      <div className="w-full h-[95px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={getPopularTopics()}
                              dataKey="value"
                              nameKey="name"
                              outerRadius={42}
                              innerRadius={22}
                              isAnimationActive
                            >
                              {getPopularTopics().map((entry, index) => (
                                <Cell key={`c-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <ReTooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 text-[11px] text-[#718096]">
                    <div>Session started: {new Date(analytics.sessionStart).toLocaleString()}</div>
                    <div className="flex items-center gap-2 mt-2">
                      <Settings2 className="h-3.5 w-3.5" />
                      <span>Personality: <span className="capitalize text-[#e2e8f0]">{personality}</span></span>
                    </div>
                  </div>
                </div>
              ) : (
                <ScrollArea className="flex-1 p-4" style={{ scrollbarWidth: "none", msOverflowStyle: "none", overflow: "auto" }}>
                  <div className="space-y-4">
                    {messages.map((m) => (
                      <div key={m.id} className={cn("flex gap-3", m.sender === "user" ? "justify-end" : "justify-start")}
                      >
                        {m.sender === "AI" && (
                          <div className="w-7 h-7 rounded-full bg-[#4fd1c5] flex items-center justify-center flex-shrink-0">
                            <AIIcon className="h-4 w-4 text-[#181c23]" />
                          </div>
                        )}

                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.18 }}
                          className={cn(
                            "max-w-[85%] p-3 rounded-lg text-sm relative shadow-sm",
                            m.sender === "user"
                              ? "bg-[#4fd1c5] text-[#181c23] font-mono rounded-br-md"
                              : "bg-[#2d3748] text-[#e2e8f0] font-mono border border-[#4a5568] rounded-bl-md"
                          )}
                        >
                          <div className="whitespace-pre-line leading-relaxed">{m.text}</div>

                          {m.isAI && m.meta?.defenseQuality && (
                            <>
                              <div className="mt-2 text-[10px] opacity-80">
                                <span>🧠 Tone: {m.meta.tone}</span>
                                <span className="mx-2">•</span>
                                <span>🛡️ Defense: {m.meta.defenseQuality}</span>
                                <span className="mx-2">•</span>
                                <span>🎯 Risk: {m.meta.hallucinationRisk}</span>
                              </div>
                              <div className="absolute -top-1 -right-1 bg-[#f6e05e] text-[#181c23] text-xs px-1.5 py-0.5 rounded-full ai-badge">
                                AI
                              </div>
                            </>
                          )}
                        </motion.div>

                        {m.sender === "user" && (
                          <div className="w-7 h-7 rounded-full bg-[#4fd1c5] flex items-center justify-center flex-shrink-0">
                            <UserIcon className="h-4 w-4 text-[#181c23]" />
                          </div>
                        )}
                      </div>
                    ))}

                    {isTyping && (
                      <div className="flex gap-3 justify-start">
                        <div className="w-7 h-7 rounded-full bg-[#4fd1c5] flex items-center justify-center flex-shrink-0">
                          <AIIcon className="h-4 w-4 text-[#181c23]" />
                        </div>
                        <div className="bg-[#2d3748] text-[#e2e8f0] font-mono border border-[#4a5568] p-3 rounded-lg text-sm">
                          <span className="animate-pulse text-[#e2e8f0] font-mono text-sm">
                            Thinking<span className="loading-dots">.</span>
                          </span>
                        </div>
                      </div>
                    )}

                    {error && (
                      <div className="flex items-center gap-2 text-xs text-red-300 bg-red-900/20 border border-red-700/40 p-2 rounded">
                        <span>⚠️ {error}</span>
                        <Button
                          size="sm"
                          className="h-6 px-2 bg-[#181c23] hover:bg-[#2d3748] text-[#f6e05e] border border-[#f6e05e]"
                          onClick={handleSendMessage}
                          disabled={isTyping || retryCount > 2}
                        >
                          Retry
                        </Button>
                      </div>
                    )}
                  </div>
                  <div ref={messagesEndRef} />
                </ScrollArea>
              )}

              {/* Composer */}
              <div className="p-4 mb-[3.6rem] border-t border-[#4a5568] bg-[#23272e] rounded-bl-xl rounded-br-xl">
                {/* Quick Actions */}
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {quickActions.map((qa) => (
                    <Button
                      key={qa.label}
                      onClick={() => handleQuickAction(qa.query)}
                      disabled={isTyping}
                      className="bg-[#181c23] hover:bg-[#2d3748] text-[#4fd1c5] border border-[#4fd1c5] font-mono text-[11px] h-8 rounded-md"
                    >
                      {qa.label}
                    </Button>
                  ))}
                </div>

                <div className="flex gap-3 items-center">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Ask something…"
                    className="flex-1 bg-[#181c23] border-2 border-[#4fd1c5] text-[#e2e8f0] font-mono text-sm placeholder:text-[#718096] focus:border-[#4fd1c5] focus:ring-2 focus:ring-[#4fd1c5] focus:ring-opacity-20 rounded-lg h-11"
                  />
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={toggleVoiceInput}
                        disabled={isTyping}
                        className={cn(
                          "bg-[#181c23] hover:bg-[#2d3748] text-[#4fd1c5] border border-[#4fd1c5] px-3 h-11 w-11 rounded-lg",
                          isListening && "bg-[#f56565] text-white border-[#f56565]"
                        )}
                        title="Voice Input"
                        aria-pressed={isListening}
                      >
                        {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Dictate with your voice</TooltipContent>
                  </Tooltip>

                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-[#4fd1c5] hover:bg-[#38b2ac] text-[#181c23] font-mono px-3 h-11 w-11 rounded-full disabled:opacity-50"
                    aria-label="Send message"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </TooltipProvider>
  );
};

export default ChatAI;
