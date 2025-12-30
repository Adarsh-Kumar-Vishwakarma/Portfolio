import React, { useEffect, useState } from 'react';
import { Code, Server, Database, Smartphone } from 'lucide-react';
import SystemStatusBar from './SystemStatusBar';
import { useInView } from '../hooks/use-in-view';

const About = () => {
  const services = [
    {
      icon: <Code size={48} />,
      title: "Frontend Development",
      description: "Creating responsive and interactive user interfaces using Angular, and modern CSS frameworks."
    },
    {
      icon: <Server size={48} />,
      title: "Backend Development", 
      description: "Building robust server-side applications with Node.js, Java, and cloud services."
    },
    {
      icon: <Database size={48} />,
      title: "Database Design",
      description: "Designing and optimizing databases for performance and scalability using SQL and NoSQL solutions."
    },
    // {
    //   icon: <Smartphone size={48} />,
    //   title: "Mobile Development",
    //   description: "Developing cross-platform mobile applications using React Native and Flutter."
    // }
  ];

  const [effectPlayed, setEffectPlayed] = useState(false);
  const [typedIntro, setTypedIntro] = useState('');
  const introText = "// I'm a passionate Junior Full-Stack Developer with 1+ years of hands-on experience crafting web solutions. I love turning complex challenges into clean, intuitive, and impactful user experiences.";

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
          <div id="about" className="inline-block bg-[#23272e] border-2 border-[#4fd1c5] rounded-t-xl px-3 sm:px-4 md:px-6 py-2 mb-2 scroll-mt-20 flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[#4fd1c5] font-bold text-xs sm:text-sm">$</span>
              <span className="text-[#63b3ed] tracking-wider text-xs sm:text-sm md:text-base">cat about.txt</span>
            </div>
            <SystemStatusBar />
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#f6e05e] mb-3 sm:mb-4 mt-2 flex items-center justify-center px-2">
            About Me <span className="ml-2 animate-pulse">|</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#a0aec0] max-w-3xl mx-auto min-h-[2.5em] sm:min-h-[3em] md:min-h-[3.5em] px-2">
            <span>{typedIntro}</span>
            {typedIntro.length < introText.length && !effectPlayed && <span className="blinking-cursor">|</span>}
          </p>
        </div>
        {/* Services */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-[#23272e] border-2 border-[#4fd1c5] p-4 sm:p-5 md:p-6 rounded-lg hover:border-[#f6e05e] transition-colors duration-300 text-center group shadow-lg"
            >
              <div className="text-[#4fd1c5] mb-3 sm:mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                  {service.icon}
                </div>
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[#f6e05e] mb-2 sm:mb-3">{service.title}</h3>
              <p className="text-[#a0aec0] text-xs sm:text-sm md:text-base leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
        {/* Journey */}
        <div className="mt-8 sm:mt-12 md:mt-16 bg-[#23272e] border-2 border-[#4fd1c5] p-4 sm:p-6 md:p-8 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-[#f6e05e] mb-3 sm:mb-4">My Journey <span className="ml-2 text-[#4fd1c5] animate-pulse">$</span></h3>
              <p className="text-[#a0aec0] mb-3 sm:mb-4 text-xs sm:text-sm md:text-base leading-relaxed">// I began my journey as a fresher and started my career as a Junior Software Developer. Over time, I have continuously learned new technologies and programming languages, and I am currently working as a Junior Full-Stack Developer.</p>
              <p className="text-[#a0aec0] text-xs sm:text-sm md:text-base leading-relaxed">// Outside of coding, I enjoy exploring emerging tech trends, contributing to personal projects, reading technical blogs, and spending time with spiritual books to stay balanced and mindful.</p>
            </div>
            <div className="flex justify-center mt-4 sm:mt-6 md:mt-0 order-1 md:order-2">
              <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 border-[#4fd1c5] bg-[#181c23] flex items-center justify-center animate-pulse-slow">
                <img
                  src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdzM3d3lxdDQyMm93aWNvb2gyb3VuYTNuMnRlOWV6anBudHM3Nm9vcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/nrGnowpysYkLL1AFyR/giphy.gif"
                  alt="Profile GIF"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
