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
        // { name: "GraphQL", level: 78 }
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

  // Typewriter effect for the intro
  const introText = "// I'm proficient in a wide range of technologies and tools that help me build robust and scalable applications.";
  const [typedIntro, setTypedIntro] = useState('');
  const [skillsRef, inView] = useInView<HTMLDivElement>({ threshold: 0.3 });
  useEffect(() => {
    if (!inView) return;
    let i = 0;
    setTypedIntro('');
    const interval = setInterval(() => {
      setTypedIntro(introText.slice(0, i + 1));
      i++;
      if (i === introText.length) clearInterval(interval);
    }, 12);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <section className="py-10 sm:py-20 bg-[#181c23] font-mono px-2 sm:px-0 relative overflow-hidden">
      {/* Animated grid/scanline overlay */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-30" style={{backgroundImage: 'repeating-linear-gradient(to bottom, #4fd1c511 0px, #4fd1c511 1px, transparent 1px, transparent 24px), repeating-linear-gradient(to right, #4fd1c511 0px, #4fd1c511 1px, transparent 1px, transparent 24px)'}} />
      <div className="max-w-6xl mx-auto px-2 sm:px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 sm:mb-16" ref={skillsRef}>
          <div id="skills" className="inline-block bg-[#23272e] border-2 border-[#4fd1c5] rounded-t-xl px-4 sm:px-6 py-2 mb-2 scroll-mt-20 flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[#4fd1c5] font-bold">$</span>
              <span className="text-[#63b3ed] tracking-wider text-xs sm:text-base">cat skills.json</span>
            </div>
            <SystemStatusBar />
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#f6e05e] mb-4 mt-2 flex items-center justify-center">
            Skills &amp; Experience <span className="ml-2 animate-pulse">|</span>
          </h2>
          <p className="text-base sm:text-xl text-[#a0aec0] max-w-3xl mx-auto min-h-[3.5em]">
            <span>{typedIntro}</span>
            {typedIntro.length < introText.length && <span className="blinking-cursor">|</span>}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-16">
          {skillCategories.map((category, index) => (
            <div key={index} className="bg-[#23272e] border-2 border-[#4fd1c5] p-4 sm:p-6 rounded-lg shadow-lg mb-6 md:mb-0">
              <h3 className="text-lg sm:text-xl font-bold text-[#f6e05e] mb-6">{category.title}</h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between mb-2">
                      <span className="text-[#a0aec0] text-xs sm:text-base">{skill.name}</span>
                      <span className="text-[#4fd1c5] text-xs sm:text-base">{skill.level}%</span>
                    </div>
                    <Progress 
                      value={skill.level} 
                      className="h-2 bg-[#181c23] [&_.progress-bar]:bg-[#4fd1c5]"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#23272e] border-2 border-[#4fd1c5] p-4 sm:p-8 rounded-lg mb-10 sm:mb-16 shadow-lg">
          <h3 className="text-lg sm:text-2xl font-bold text-[#f6e05e] mb-6 text-center">Tools &amp; Technologies</h3>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {tools.map((tool, index) => (
              <span 
                key={index}
                className="px-2 sm:px-4 py-2 bg-[#181c23] text-[#a0aec0] border border-[#4fd1c5] rounded-full hover:bg-[#4fd1c5] hover:text-[#181c23] transition-colors duration-200 font-mono text-xs sm:text-base"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-[#23272e] border-2 border-[#4fd1c5] p-4 sm:p-8 rounded-lg shadow-lg">
          <h3 className="text-lg sm:text-2xl font-bold text-[#f6e05e] mb-6 text-center">Professional Experience</h3>
          <div className="space-y-8">
            <div className="border-l-4 border-[#4fd1c5] pl-4">
              <h4 className="text-base sm:text-xl text-[#f6e05e] font-semibold">Junior Software Developer</h4>
              <p className="text-[#4fd1c5] text-xs sm:text-base">Edulab Educational Exchange Pvt. Ltd • 05 May 2025 - Present</p>
              <ul className="list-disc list-inside text-[#a0aec0] mt-2 text-xs sm:text-base">
                <li>Led development of multiple full-stack applications using React and Node.js</li>
                <li>Mentored junior developers and conducted code reviews</li>
                <li>Implemented CI/CD pipelines and improved deployment processes</li>
              </ul>
            </div>
            <div className="border-l-4 border-[#4fd1c5] pl-4">
              <h4 className="text-base sm:text-xl text-[#f6e05e] font-semibold">Software Developer</h4>
              <p className="text-[#4fd1c5] text-xs sm:text-base">New Era It Consultancy • Feb 2024 - Feb2025</p>
              <ul className="list-disc list-inside text-[#a0aec0] mt-2 text-xs sm:text-base">
                <li>Developed, deployed, and maintained Customer Relationship Management (CRM) software solutions for clients such as Reliance, Mapple, and iPlanet,creating streamlined and impactful products tailored to meet each client's specific needs.</li>
                <li>Created user-friendly, efficient, and effective solutions with expertise in the Angular framework.</li>
                <li>Collaborated closely with clients to deliver customized software solutions that address their unique requirements.</li>
                <li>Gained hands-on experience with Angular fundamentals, including component creation, routing, API integration, and services, while also working with stored procedures in SQL for systematic data management.</li>
                <li>Provided ongoing support for live projects, ensuring their seamless operation through troubleshooting, maintenance, and upgrades.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
