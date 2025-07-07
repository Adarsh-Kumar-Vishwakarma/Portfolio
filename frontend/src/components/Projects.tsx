import React, { useEffect, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SystemStatusBar from './SystemStatusBar';

const Projects = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-featured e-commerce platform built with Angular and JSON Server. Includes user authentication, product management, and a responsive UI. Easily run locally with 'ng serve' and mock backend via JSON Server for development and testing.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      technologies: ["Angular", "JSON Server"],
      liveUrl: "#",
      githubUrl: "https://github.com/Adarsh-Kumar-Vishwakarma/E-comm.git"
    },
    {
      title: "Task Management App",
      description: "A collaborative project management tool with real-time updates, drag-and-drop functionality, and team collaboration features.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
      technologies: ["Vue.js", "Firebase", "Vuetify", "WebSockets"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Weather Dashboard",
      description: "A responsive weather application with location-based forecasts, interactive maps, and detailed weather analytics.",
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop",
      technologies: ["React", "D3.js", "OpenWeather API", "Tailwind CSS"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Social Media Analytics",
      description: "A data visualization platform that analyzes social media trends and provides insights through interactive charts and graphs.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      technologies: ["Python", "Django", "Chart.js", "PostgreSQL"],
      liveUrl: "#",
      githubUrl: "#"
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
    <section className="py-10 sm:py-20 bg-[#181c23] font-mono px-2 sm:px-0 relative overflow-hidden">
      {/* Animated grid/scanline overlay */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-30" style={{backgroundImage: 'repeating-linear-gradient(to bottom, #4fd1c511 0px, #4fd1c511 1px, transparent 1px, transparent 24px), repeating-linear-gradient(to right, #4fd1c511 0px, #4fd1c511 1px, transparent 1px, transparent 24px)'}} />
      <div className="max-w-6xl mx-auto px-2 sm:px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 sm:mb-16">
          <div id="projects" className="inline-block bg-[#23272e] border-2 border-[#4fd1c5] rounded-t-xl px-4 sm:px-6 py-2 mb-2 scroll-mt-20 flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[#4fd1c5] font-bold">$</span>
              <span className="text-[#63b3ed] tracking-wider text-xs sm:text-base">ls projects/</span>
            </div>
            <SystemStatusBar />
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#f6e05e] mb-4 mt-2 flex items-center justify-center">
            Featured Projects <span className="ml-2 animate-pulse">|</span>
          </h2>
          <p className="text-base sm:text-xl text-[#a0aec0] max-w-3xl mx-auto min-h-[3.5em]">
            <span>{typedIntro}</span>
            {typedIntro.length < introText.length && !effectPlayed && <span className="blinking-cursor">|</span>}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="bg-[#23272e] border-2 border-[#4fd1c5] rounded-xl overflow-hidden hover:border-[#f6e05e] transition-colors duration-300 group shadow-lg font-mono mb-6 md:mb-0"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300 border-b-2 border-[#4fd1c5]"
                />
                <div className="absolute inset-0 bg-[#4fd1c5] bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
              </div>
              
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-[#f6e05e] mb-3">{project.title}</h3>
                <p className="text-[#a0aec0] mb-4 text-sm sm:text-base">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-2 sm:px-3 py-1 bg-[#181c23] text-[#4fd1c5] border border-[#4fd1c5] text-xs sm:text-sm rounded-full font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  {/* <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full sm:w-auto border-[#4fd1c5] text-[#4fd1c5] hover:bg-[#4fd1c5] hover:text-[#181c23] font-mono"
                  >
                    <ExternalLink className="mr-2" size={16} />
                    Live Demo
                  </Button> */}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto"
                  >
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full sm:w-auto border-[#a0aec0] text-[#a0aec0] hover:bg-[#a0aec0] hover:text-[#181c23] font-mono"
                    >
                      <Github className="mr-2" size={16} />
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
