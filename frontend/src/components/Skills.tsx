import React, { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend Technologies',
      skills: [
        { name: 'Angular', level: 90 },
        { name: 'TypeScript', level: 85 },
        { name: 'JavaScript', level: 90 },
        { name: 'HTML', level: 90 },
        { name: 'CSS', level: 70 },
      ],
    },
    {
      title: 'Backend Technologies',
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Express.js', level: 82 },
        { name: 'Java', level: 90 },
        { name: 'Spring Boot', level: 70 },
        { name: 'Hibernate', level: 70 },
      ],
    },
    {
      title: 'Databases & Tools',
      skills: [
        { name: 'MongoDB', level: 70 },
        { name: 'SQL', level: 85 },
        { name: 'Docker', level: 75 },
      ],
    },
  ];

  const tools = [
    'Git',
    'VS Code',
    'Postman',
    'Jenkins',
    'Jira',
    'Grafana',
    'Slack',
    'Docker',
    'Keycloak',
    'RabbitMQ',
    'GitHub',
    'SendGrid',
  ];

  const [effectPlayed, setEffectPlayed] = useState(false);
  const [typedIntro, setTypedIntro] = useState('');
  const introText =
    "// I'm proficient in a wide range of technologies and tools that help me build robust and scalable applications.";

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
    <section className="section-shell">
      <div className="section-inner">
        <div id="skills" className="scroll-mt-28">
          <div className="section-kicker">
            <span className="section-kicker-dot" />
            Skills and experience
          </div>
          <h2 className="section-heading">Skills &amp; Experience</h2>
          <p className="section-copy">
            <span>{typedIntro}</span>
            {typedIntro.length < introText.length && !effectPlayed && <span className="blinking-cursor">|</span>}
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {skillCategories.map((category, index) => (
            <div key={index} className="soft-card rounded-[1.75rem] p-6">
              <h3 className="text-xl font-semibold text-white">{category.title}</h3>
              <div className="mt-6 space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm text-slate-300">{skill.name}</span>
                      <span className="mono-text text-xs text-cyan-200">{skill.level}%</span>
                    </div>
                    <Progress
                      value={skill.level}
                      className="h-2 bg-slate-900/70 [&>div]:bg-gradient-to-r [&>div]:from-cyan-300 [&>div]:to-sky-400"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="glass-panel rounded-[2rem] p-8">
            <p className="mono-text text-xs uppercase tracking-[0.3em] text-cyan-200">Tools</p>
            <h3 className="mt-4 text-3xl font-semibold text-white">Tools &amp; Technologies</h3>
            <div className="mt-6 flex flex-wrap gap-3">
              {tools.map((tool, index) => (
                <span key={index} className="tag-chip">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="soft-card rounded-[2rem] p-8">
            <p className="mono-text text-xs uppercase tracking-[0.3em] text-amber-200">Professional experience</p>
            <h3 className="mt-4 text-3xl font-semibold text-white">Professional Experience</h3>
            <div className="mt-6 space-y-8">
              <div className="border-l border-cyan-300/30 pl-5">
                <h4 className="text-xl font-semibold text-white">Junior Software Developer</h4>
                <p className="mt-2 text-sm text-cyan-200">Edulab Educational Exchange Pvt. Ltd • 05 May 2025 - Present</p>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  <b className="text-sky-300">Punyashlok Ahilyadevi Holkar Solapur University</b>
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  I worked on the development and ongoing maintenance of the university&apos;s Admissions Management System built on a microservices architecture.
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  My role involved designing and building RESTful microservices for key modules such as Payment, Hostel Management, and Examinations. I also integrated the Admissions service with the Payment module to ensure smooth and reliable data flow across the system.
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  In addition, I helped improve the student admission portal by introducing new features and automating workflows to make the process more efficient. I regularly handled bug fixes, optimized APIs, and worked on performance improvements to enhance system stability and user experience.
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  <b className="text-sky-300">IQAS (Institute of Actuarial and Quantitative Studies) – Admission Portal</b>
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  At IQAS, I worked on a monolithic admission portal where I contributed to building and improving core features.
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  This included implementing student registration, managing admission workflows, and adding email notification functionality.
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  I also focused on improving the overall UI/UX and resolving functional and performance-related issues to ensure a smoother experience for users.
                </p>
              </div>

              <div className="border-l border-cyan-300/30 pl-5">
                <h4 className="text-xl font-semibold text-white">Software Developer</h4>
                <p className="mt-2 text-sm text-cyan-200">New Era It Consultancy • Feb 2024 - Feb 2025</p>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  I worked on developing, deploying, and maintaining Customer Relationship Management (CRM) solutions for clients such as Reliance, Mapple, and iPlanet. My focus was on building streamlined and practical products that met each client&apos;s specific business needs.
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  I primarily worked with the Angular framework to create user-friendly, efficient, and reliable interfaces.
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  I collaborated closely with clients and internal teams to understand requirements and deliver customized solutions that aligned with their expectations.
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  Through this role, I gained hands-on experience with core Angular concepts such as component development, routing, API integration, and services. I also worked with SQL stored procedures to support structured and efficient data management.
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  In addition, I provided ongoing support for live projects, handling troubleshooting, maintenance, and system upgrades to ensure smooth and uninterrupted operation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section-divider" />
    </section>
  );
};

export default Skills;
