import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import Navigation from '../components/Navigation';
import MatrixRain from '../components/MatrixRain';
import Terminal from '../components/Terminal';
import LiveStatsPanel from '../components/LiveStatsPanel';
import Chatbot from '../components/Chatbot';

const Index = () => {
  // Theme switcher logic
  // const [dark, setDark] = useState(true);
  // useEffect(() => {
  //   if (dark) {
  //     document.documentElement.classList.add('dark');
  //   } else {
  //     document.documentElement.classList.remove('dark');
  //   }
  // }, [dark]);

  return (
    <div className="min-h-screen bg-[var(--terminal-bg)] text-[var(--terminal-fg)] flex flex-col relative z-10">
      <MatrixRain />
      {/* <LiveStatsPanel /> */}
      {/* <Terminal /> */}

      {/* <LiveStatsPanel /> */}
      {/* <TerminalInput /> */}
      {/* Theme Switcher Button */}
      {/* <button
        className="fixed top-4 right-4 z-[9999] bg-[#23272e] border-2 border-[#4fd1c5] text-[#4fd1c5] font-mono px-4 py-2 rounded-lg shadow-lg hover:bg-[#181c23] transition-colors duration-200"
        style={{ pointerEvents: 'auto' }}
        onClick={() => setDark((d) => !d)}
        aria-label="Toggle theme"
      >
        {dark ? '🌙 Terminal Dark' : '☀️ Classic Light'}
      </button> */}
      {/* Floating code characters for hacker/dev background - hidden on very small screens */}
      <span className="code-float hidden sm:inline" style={{left: '5vw', animationDelay: '0s'}}>0xDEADBEEF</span>
      <span className="code-float hidden sm:inline" style={{left: '15vw', animationDelay: '2s'}}>&lt;script&gt;</span>
      <span className="code-float hidden md:inline" style={{left: '25vw', animationDelay: '4s'}}>console.log('👾')</span>
      <span className="code-float hidden sm:inline" style={{left: '35vw', animationDelay: '6s'}}>sudo rm -rf /</span>
      <span className="code-float hidden lg:inline" style={{left: '45vw', animationDelay: '8s'}}>#include &lt;hacker.h&gt;</span>
      <span className="code-float hidden md:inline" style={{left: '55vw', animationDelay: '1s'}}>npm install life</span>
      <span className="code-float hidden sm:inline" style={{left: '65vw', animationDelay: '3s'}}>while(alive)</span>
      <span className="code-float hidden lg:inline" style={{left: '75vw', animationDelay: '5s'}}>git commit -m "🚀"</span>
      <span className="code-float hidden md:inline" style={{left: '85vw', animationDelay: '7s'}}>function hack(){}</span>
      <span className="code-float hidden lg:inline" style={{left: '95vw', animationDelay: '9s'}}>SELECT * FROM skills;</span>
      <Navigation />
      <main className="flex-grow">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      {/* Terminal-style Footer */}
      <footer className="w-full bg-[#181c23] border-t-2 border-[#4fd1c5] py-3 sm:py-4 text-center font-mono text-xs text-[#a0aec0] px-2">
        <span className="text-[#4fd1c5] font-bold mr-1 sm:mr-2">$</span>
        <span className="text-[#63b3ed] tracking-wider">echo</span>
        <span className="ml-1 sm:ml-2 text-[10px] sm:text-xs">'© 2025 Adarsh Kumar Vishwakarma. All rights reserved.'</span>
      </footer>
      
      {/* AI Chatbot */}
      <Chatbot />
    </div>
  );
};

export default Index;
