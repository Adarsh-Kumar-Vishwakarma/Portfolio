import React, { useEffect, useState } from 'react';
import { Code, Server, Database } from 'lucide-react';

const About = () => {
  const services = [
    {
      icon: <Code size={28} />,
      title: 'Frontend Development',
      description: 'Creating responsive and interactive user interfaces using Angular, and modern CSS frameworks.',
    },
    {
      icon: <Server size={28} />,
      title: 'Backend Development',
      description: 'Building robust server-side applications with Node.js, Java, and cloud services.',
    },
    {
      icon: <Database size={28} />,
      title: 'Database Design',
      description: 'Designing and optimizing databases for performance and scalability using SQL and NoSQL solutions.',
    },
  ];

  const [effectPlayed, setEffectPlayed] = useState(false);
  const [typedIntro, setTypedIntro] = useState('');
  const introText =
    "// I'm a passionate Junior Full-Stack Developer with 1+ years of hands-on experience crafting web solutions. I love turning complex challenges into clean, intuitive, and impactful user experiences.";

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
        <div id="about" className="scroll-mt-28">
          <div className="section-kicker">
            <span className="section-kicker-dot" />
            About me
          </div>
          <h2 className="section-heading">About Me</h2>
          <p className="section-copy">
            <span>{typedIntro}</span>
            {typedIntro.length < introText.length && !effectPlayed && <span className="blinking-cursor">|</span>}
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {services.map((service, index) => (
            <div key={index} className="soft-card rounded-[1.75rem] p-6">
              <div className="inline-flex rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4 text-cyan-200">
                {service.icon}
              </div>
              <h3 className="mt-6 text-xl font-semibold text-white">{service.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="glass-panel rounded-[2rem] p-8">
            <p className="mono-text text-xs uppercase tracking-[0.3em] text-cyan-200">Journey</p>
            <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white">My Journey</h3>
            <p className="mt-5 text-base leading-8 text-slate-300">
              // I began my journey as a fresher and started my career as a Junior Software Developer. Over time, I have continuously learned new technologies and programming languages, and I am currently working as a Junior Full-Stack Developer.
            </p>
            <p className="mt-4 text-base leading-8 text-slate-300">
              // Outside of coding, I enjoy exploring emerging tech trends, contributing to personal projects, reading technical blogs, and spending time with spiritual books to stay balanced and mindful.
            </p>
          </div>

          <div className="soft-card relative overflow-hidden rounded-[2rem] p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.16),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(251,191,36,0.14),transparent_26%)]" />
            <div className="relative space-y-6">
              <div>
                <p className="mono-text text-xs uppercase tracking-[0.3em] text-amber-200">Working style</p>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  I enjoy building clean, maintainable software experiences and continuously learning better ways to solve real-world problems.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="metric-pill">
                  <p className="metric-label">Mindset</p>
                  <p className="metric-value text-lg">Curious</p>
                </div>
                <div className="metric-pill">
                  <p className="metric-label">Strength</p>
                  <p className="metric-value text-lg">Problem Solving</p>
                </div>
                <div className="metric-pill">
                  <p className="metric-label">Approach</p>
                  <p className="metric-value text-lg">Clean UI</p>
                </div>
                <div className="metric-pill">
                  <p className="metric-label">Focus</p>
                  <p className="metric-value text-lg">Growth</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section-divider" />
    </section>
  );
};

export default About;
