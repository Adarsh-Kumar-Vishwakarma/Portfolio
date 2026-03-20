import React, { useEffect, useState } from 'react';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SystemStatusBar from './SystemStatusBar';
import adivaImage from '../assets/AdivaAI.jpg';

const Projects = () => {
  const projects = [
    {
      title: 'Adiva AI',
      description:
        'Built a full-stack using React, TypeScript, Tailwind CSS, Node.js, Express, and MongoDB, supporting real-time AI responses, multiple AI models (OpenAI GPT, Claude), image analysis, and persistent chat history. Implemented secure authentication with Google OAuth and JWT, usage analytics, and a modern, responsive UI with dynamic theming and smooth animations. The platform allows users to have seamless, interactive AI conversations, with intelligent responses, customizable prompts, and reliable performance for both casual and professional use.',
      image: adivaImage,
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB'],
      liveUrl: 'https://adiva-ai.vercel.app/',
      githubUrl: 'https://github.com/TheAdarshKumarVishwakarma/Adiva-AI.git',
    },
    {
      title: 'E-Commerce Platform',
      description:
        "A full-featured e-commerce platform built with Angular and JSON Server. Includes user authentication, product management, and a responsive UI. Easily run locally with 'ng serve' and mock backend via JSON Server for development and testing.",
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      technologies: ['Angular', 'JSON Server'],
      liveUrl: '#',
      githubUrl: 'https://github.com/TheAdarshKumarVishwakarma/E-comm.git',
    },
    {
      title: 'Book Management System',
      description:
        'A comprehensive Spring Boot REST API with complete CRUD operations for book management. Features MySQL database integration, JPA/Hibernate ORM, and RESTful endpoints demonstrating Spring Boot best practices.',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop',
      technologies: ['Spring Boot', 'Java 17', 'MySQL', 'JPA/Hibernate', 'Maven'],
      liveUrl: '#',
      githubUrl: 'https://github.com/TheAdarshKumarVishwakarma/Book_Management_System.git',
    },
    {
      title: 'FooKart - Food Ordering Web App',
      description:
        'A modern Angular-based food ordering application with search, filtering, and shopping cart functionality. Features responsive design, tag-based filtering, and clean component architecture demonstrating Angular best practices.',
      image:
        'https://images.unsplash.com/photo-1599250300435-b9693f21830d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fEZvb2QlMjBPcmRlcmluZyUyMEFwcHxlbnwwfHwwfHx8MA%3D%3D',
      technologies: ['Angular 17', 'TypeScript', 'CSS', 'Jasmine/Karma'],
      liveUrl: '#',
      githubUrl: 'https://github.com/TheAdarshKumarVishwakarma/FooKart.git',
    },
    {
      title: 'Online Shopping Management System',
      description:
        'A comprehensive Spring Boot REST API with advanced entity relationships, DTO patterns, and validation. Features Product-Order management with One-to-Many mappings, custom exception handling, and comprehensive CRUD operations.',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop',
      technologies: ['Spring Boot', 'Java 17', 'MySQL', 'JPA/Hibernate', 'Hibernate Validator'],
      liveUrl: '#',
      githubUrl: 'https://github.com/TheAdarshKumarVishwakarma/Online-Shopping-Management-SpringBoot.git',
    },
  ];

  const [effectPlayed, setEffectPlayed] = useState(false);
  const [typedIntro, setTypedIntro] = useState('');
  const introText = '// Here are some of my recent projects that showcase my skills and experience in different technologies and domains.';

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

  const featuredProject = projects[0];
  const supportingProjects = projects.slice(1);

  return (
    <section className="section-shell">
      <div className="section-inner">
        <div id="projects" className="scroll-mt-28">
          <div className="section-kicker">
            <span className="section-kicker-dot" />
            Featured projects
          </div>
          <h2 className="section-heading">Featured Projects</h2>
          <p className="section-copy">
            <span>{typedIntro}</span>
            {typedIntro.length < introText.length && !effectPlayed && <span className="blinking-cursor">|</span>}
          </p>
          <div className="mt-6 max-w-xl">
            <SystemStatusBar />
          </div>
        </div>

        <div className="mt-12 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <article className="glass-panel overflow-hidden rounded-[2rem]">
            <div className="relative border-b border-white/10 bg-slate-950/40 p-5 sm:p-6">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(103,232,249,0.14),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(251,191,36,0.12),transparent_24%)]" />
              <div className="relative flex items-center justify-between gap-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/75 px-3 py-2 text-xs text-cyan-200 backdrop-blur">
                  <ArrowUpRight size={14} />
                  Spotlight project
                </div>
                <p className="mono-text text-[11px] uppercase tracking-[0.28em] text-amber-200">Case study</p>
              </div>
            </div>

            <div className="p-5 sm:p-6 lg:p-8">
              <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/60">
                <div className="aspect-[16/9] w-full overflow-hidden bg-slate-950">
                  <img
                    src={featuredProject.image}
                    alt={featuredProject.title}
                    className="h-full w-full object-cover object-top"
                  />
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-3xl font-semibold text-white sm:text-4xl">{featuredProject.title}</h3>
                <p className="mt-5 max-w-3xl text-sm leading-8 text-slate-300">{featuredProject.description}</p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="metric-pill">
                  <p className="metric-label">Category</p>
                  <p className="metric-value text-lg">AI Platform</p>
                </div>
                <div className="metric-pill">
                  <p className="metric-label">Focus</p>
                  <p className="metric-value text-lg">Full Stack</p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-2.5">
                {featuredProject.technologies.map((tech, index) => (
                  <span key={index} className="tag-chip">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {featuredProject.liveUrl !== '#' && (
                  <a href={featuredProject.liveUrl} target="_blank" rel="noopener noreferrer">
                    <Button className="h-12 rounded-full bg-gradient-to-r from-cyan-300 to-sky-400 px-6 text-slate-950 hover:from-cyan-200 hover:to-sky-300">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </Button>
                  </a>
                )}
                <a href={featuredProject.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    className="h-12 rounded-full border-white/15 bg-white/5 px-6 text-slate-100 hover:bg-white/10"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    View Code
                  </Button>
                </a>
              </div>
            </div>
          </article>

          <div className="grid gap-6">
            {supportingProjects.map((project, index) => (
              <article key={index} className="soft-card rounded-[1.75rem] p-6 transition duration-300 hover:-translate-y-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{project.description}</p>
                  </div>
                  <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/15 bg-cyan-300/10 text-cyan-200 sm:flex">
                    <ArrowUpRight size={18} />
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tag-chip">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex gap-3">
                  {project.liveUrl !== '#' && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <Button
                        variant="outline"
                        className="h-11 rounded-full border-cyan-300/30 bg-cyan-300/10 px-5 text-cyan-100 hover:bg-cyan-300/20"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Demo
                      </Button>
                    </a>
                  )}
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="outline"
                      className="h-11 rounded-full border-white/15 bg-white/5 px-5 text-slate-100 hover:bg-white/10"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </Button>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
      <div className="section-divider" />
    </section>
  );
};

export default Projects;
