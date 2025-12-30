import React, { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import SystemStatusBar from './SystemStatusBar';
import { useInView } from '../hooks/use-in-view';

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend Technologies",
      skills: [
        { name: "Angular", level: 90 },
        { name: "TypeScript", level: 85 },
        { name: "JavaScript", level: 90 },
        { name: "HTML", level: 90 },
        { name: "CSS", level: 70 }
      ]
    },
    {
      title: "Backend Technologies", 
      skills: [
        { name: "Node.js", level: 85 },
        { name: "Express.js", level: 82 },
        { name: "Java", level: 90 },
        { name: "Spring Boot", level: 70 },
        { name: "Hibernate", level: 70 }
      ]
    },
    {
      title: "Databases & Tools",
      skills: [
        { name: "MongoDB", level: 70 },
        { name: "SQL", level: 85 },
        { name: "Docker", level: 75 },
        // { name: "AWS", level: 70 }
      ]
    }
  ];

  const tools = [
    "Git", "VS Code", "Postman", "Jenkins", "Jira", "Grafana",
    "Slack", "Docker", "Keycloak", "RabbitMQ", "GitHub", "SendGrid"
  ];

  const [effectPlayed, setEffectPlayed] = useState(false);
  const [typedIntro, setTypedIntro] = useState('');
  const introText = "// I'm proficient in a wide range of technologies and tools that help me build robust and scalable applications.";

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
          <div id="skills" className="inline-block bg-[#23272e] border-2 border-[#4fd1c5] rounded-t-xl px-3 sm:px-4 md:px-6 py-2 mb-2 scroll-mt-20 flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[#4fd1c5] font-bold text-xs sm:text-sm">$</span>
              <span className="text-[#63b3ed] tracking-wider text-xs sm:text-sm md:text-base">cat skills.json</span>
            </div>
            <SystemStatusBar />
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#f6e05e] mb-3 sm:mb-4 mt-2 flex items-center justify-center px-2">
            Skills &amp; Experience <span className="ml-2 animate-pulse">|</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#a0aec0] max-w-3xl mx-auto min-h-[2.5em] sm:min-h-[3em] md:min-h-[3.5em] px-2">
            <span>{typedIntro}</span>
            {typedIntro.length < introText.length && !effectPlayed && <span className="blinking-cursor">|</span>}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16">
          {skillCategories.map((category, index) => (
            <div key={index} className="bg-[#23272e] border-2 border-[#4fd1c5] p-4 sm:p-5 md:p-6 rounded-lg shadow-lg">
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#f6e05e] mb-4 sm:mb-6">{category.title}</h3>
              <div className="space-y-3 sm:space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between mb-1.5 sm:mb-2">
                      <span className="text-[#a0aec0] text-xs sm:text-sm md:text-base">{skill.name}</span>
                      <span className="text-[#4fd1c5] text-xs sm:text-sm md:text-base">{skill.level}%</span>
                    </div>
                    <Progress 
                      value={skill.level} 
                      className="h-1.5 sm:h-2 bg-[#181c23] [&_.progress-bar]:bg-[#4fd1c5]"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#23272e] border-2 border-[#4fd1c5] p-4 sm:p-6 md:p-8 rounded-lg mb-8 sm:mb-12 md:mb-16 shadow-lg">
          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-[#f6e05e] mb-4 sm:mb-6 text-center">Tools &amp; Technologies</h3>
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 md:gap-4">
            {tools.map((tool, index) => (
              <span 
                key={index}
                className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-[#181c23] text-[#a0aec0] border border-[#4fd1c5] rounded-full hover:bg-[#4fd1c5] hover:text-[#181c23] transition-colors duration-200 font-mono text-xs sm:text-sm md:text-base"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-[#23272e] border-2 border-[#4fd1c5] p-4 sm:p-6 md:p-8 rounded-lg shadow-lg">
          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-[#f6e05e] mb-4 sm:mb-6 text-center">Professional Experience</h3>
          <div className="space-y-6 sm:space-y-8">
            <div className="border-l-4 border-[#4fd1c5] pl-3 sm:pl-4">
              <h4 className="text-sm sm:text-base md:text-lg lg:text-xl text-[#f6e05e] font-semibold mb-1 sm:mb-2">Junior Software Developer</h4>
              <p className="text-[#4fd1c5] text-xs sm:text-sm md:text-base mb-2 sm:mb-3">Edulab Educational Exchange Pvt. Ltd • 05 May 2025 - Present</p>
              <ul className="list-disc list-inside text-[#a0aec0] mt-2 space-y-1.5 sm:space-y-2 text-xs sm:text-sm md:text-base leading-relaxed">
                <li><b className="text-[#63b3ed]">Punyashlok Ahilyadevi Holkar Solapur University</b></li>
                <li>I worked on the development and ongoing maintenance of the university's Admissions Management System built on a microservices architecture.</li>
                <li>My role involved designing and building RESTful microservices for key modules such as Payment, Hostel Management, and Examinations. I also integrated the Admissions service with the Payment module to ensure smooth and reliable data flow across the system.</li>
                <li>In addition, I helped improve the student admission portal by introducing new features and automating workflows to make the process more efficient. I regularly handled bug fixes, optimized APIs, and worked on performance improvements to enhance system stability and user experience.</li>
                <li><b className="text-[#63b3ed]">IQAS (Institute of Actuarial and Quantitative Studies) – Admission Portal</b></li>
                <li>At IQAS, I worked on a monolithic admission portal where I contributed to building and improving core features.</li>
                <li>This included implementing student registration, managing admission workflows, and adding email notification functionality.</li>
                <li>I also focused on improving the overall UI/UX and resolving functional and performance-related issues to ensure a smoother experience for users.</li>
              </ul>
            </div>
            <div className="border-l-4 border-[#4fd1c5] pl-3 sm:pl-4">
              <h4 className="text-sm sm:text-base md:text-lg lg:text-xl text-[#f6e05e] font-semibold mb-1 sm:mb-2">Software Developer</h4>
              <p className="text-[#4fd1c5] text-xs sm:text-sm md:text-base mb-2 sm:mb-3">New Era It Consultancy • Feb 2024 - Feb 2025</p>
              <ul className="list-disc list-inside text-[#a0aec0] mt-2 space-y-1.5 sm:space-y-2 text-xs sm:text-sm md:text-base leading-relaxed">
                <li>I worked on developing, deploying, and maintaining Customer Relationship Management (CRM) solutions for clients such as Reliance, Mapple, and iPlanet. My focus was on building streamlined and practical products that met each client's specific business needs.</li>
                <li>I primarily worked with the Angular framework to create user-friendly, efficient, and reliable interfaces.</li>
                <li>I collaborated closely with clients and internal teams to understand requirements and deliver customized solutions that aligned with their expectations.</li>
                <li>Through this role, I gained hands-on experience with core Angular concepts such as component development, routing, API integration, and services. I also worked with SQL stored procedures to support structured and efficient data management.</li>
                <li>In addition, I provided ongoing support for live projects, handling troubleshooting, maintenance, and system upgrades to ensure smooth and uninterrupted operation.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
