import React, { useEffect, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SystemStatusBar from './SystemStatusBar';
import adivaImage from '../assets/AdivaAI.jpg';

const Projects = () => {
  const projects = [
    {
      title: "Adiva AI",
      description: "Built a full-stack using React, TypeScript, Tailwind CSS, Node.js, Express, and MongoDB, supporting real-time AI responses, multiple AI models (OpenAI GPT, Claude), image analysis, and persistent chat history. Implemented secure authentication with Google OAuth and JWT, usage analytics, and a modern, responsive UI with dynamic theming and smooth animations. The platform allows users to have seamless, interactive AI conversations, with intelligent responses, customizable prompts, and reliable performance for both casual and professional use.",
      image: adivaImage,
      technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express", "MongoDB"],
      liveUrl: "#",
      githubUrl: "https://github.com/Adarsh-Kumar-Vishwakarma/Adiva-AI.git"
    },
    {
      title: "E-Commerce Platform",
      description: "A full-featured e-commerce platform built with Angular and JSON Server. Includes user authentication, product management, and a responsive UI. Easily run locally with 'ng serve' and mock backend via JSON Server for development and testing.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      technologies: ["Angular", "JSON Server"],
      liveUrl: "#",
      githubUrl: "https://github.com/Adarsh-Kumar-Vishwakarma/E-comm.git"
    },
    {
      title: "Book Management System",
      description: "A comprehensive Spring Boot REST API with complete CRUD operations for book management. Features MySQL database integration, JPA/Hibernate ORM, and RESTful endpoints demonstrating Spring Boot best practices.",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop",
      technologies: ["Spring Boot", "Java 17", "MySQL", "JPA/Hibernate", "Maven"],
      liveUrl: "#",
      githubUrl: "https://github.com/Adarsh-Kumar-Vishwakarma/Book_Management_System.git"
    },
    {
      title: "FooKart - Food Ordering Web App",
      description: "A modern Angular-based food ordering application with search, filtering, and shopping cart functionality. Features responsive design, tag-based filtering, and clean component architecture demonstrating Angular best practices.",
      image: "https://images.unsplash.com/photo-1599250300435-b9693f21830d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fEZvb2QlMjBPcmRlcmluZyUyMEFwcHxlbnwwfHwwfHx8MA%3D%3D",
      technologies: ["Angular 17", "TypeScript", "CSS", "Jasmine/Karma"],
      liveUrl: "#",
      githubUrl: "https://github.com/Adarsh-Kumar-Vishwakarma/FooKart.git"
    },
    {
      title: "Online Shopping Management System",
      description: "A comprehensive Spring Boot REST API with advanced entity relationships, DTO patterns, and validation. Features Product-Order management with One-to-Many mappings, custom exception handling, and comprehensive CRUD operations.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
      technologies: ["Spring Boot", "Java 17", "MySQL", "JPA/Hibernate", "Hibernate Validator"],
      liveUrl: "#",
      githubUrl: "https://github.com/Adarsh-Kumar-Vishwakarma/Online-Shopping-Management-SpringBoot.git"
    }
  ];

  const [effectPlayed, setEffectPlayed] = useState(false);
  const [typedIntro, setTypedIntro] = useState('');
  const introText = "// Here are some of my recent projects that showcase my skills and experience in different technologies and domains.";

  useEffect(() => {
    if (effectPlayed) {
      setTypedIntro(introText);
      return;
    }
    let i = 0;
    setTypedIntro('');
    const interval = setInterval(() => {
      setTypedIntro(introText.slice(0, i + 1));
      i++;
      if (i === introText.length) {
        clearInterval(interval);
        setEffectPlayed(true);
      }
    }, 12);
    return () => clearInterval(interval);
  }, [effectPlayed]);

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-[#181c23] font-mono px-2 sm:px-0 relative overflow-hidden">
      {/* Animated grid/scanline overlay */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-30" style={{backgroundImage: 'repeating-linear-gradient(to bottom, #4fd1c511 0px, #4fd1c511 1px, transparent 1px, transparent 24px), repeating-linear-gradient(to right, #4fd1c511 0px, #4fd1c511 1px, transparent 1px, transparent 24px)'}} />
      <div className="max-w-6xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <div id="projects" className="inline-block bg-[#23272e] border-2 border-[#4fd1c5] rounded-t-xl px-3 sm:px-4 md:px-6 py-2 mb-2 scroll-mt-20 flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[#4fd1c5] font-bold text-xs sm:text-sm">$</span>
              <span className="text-[#63b3ed] tracking-wider text-xs sm:text-sm md:text-base">ls projects/</span>
            </div>
            <SystemStatusBar />
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#f6e05e] mb-3 sm:mb-4 mt-2 flex items-center justify-center px-2">
            Featured Projects <span className="ml-2 animate-pulse">|</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#a0aec0] max-w-3xl mx-auto min-h-[2.5em] sm:min-h-[3em] md:min-h-[3.5em] px-2">
            <span>{typedIntro}</span>
            {typedIntro.length < introText.length && !effectPlayed && <span className="blinking-cursor">|</span>}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="bg-[#23272e] border-2 border-[#4fd1c5] rounded-xl overflow-hidden hover:border-[#f6e05e] transition-colors duration-300 group shadow-lg font-mono"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-32 sm:h-40 md:h-44 lg:h-48 object-contain group-hover:scale-105 transition-transform duration-300 border-b-2 border-[#4fd1c5] bg-[#181c23]"
                />
                <div className="absolute inset-0 bg-[#4fd1c5] bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
              </div>
              
              <div className="p-3 sm:p-4 md:p-6">
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#f6e05e] mb-2 sm:mb-3">{project.title}</h3>
                <p className="text-[#a0aec0] mb-3 sm:mb-4 text-xs sm:text-sm md:text-base leading-relaxed line-clamp-4 sm:line-clamp-none">{project.description}</p>
                
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 bg-[#181c23] text-[#4fd1c5] border border-[#4fd1c5] text-xs sm:text-sm rounded-full font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto"
                  >
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full sm:w-auto border-[#a0aec0] text-[#a0aec0] hover:bg-[#a0aec0] hover:text-[#181c23] font-mono text-xs sm:text-sm"
                    >
                      <Github className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                      Code
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Blinking cursor global style */}
        <style>{`.blinking-cursor{display:inline-block;width:1ch;animation:blink 1s steps(2,start) infinite;}@keyframes blink{to{visibility:hidden;}}`}</style>
      </div>
    </section>
  );
};

export default Projects;
