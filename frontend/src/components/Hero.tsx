import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Typewriter from './Typewriter';

const Hero = () => {
  const [step, setStep] = useState(0);
  const [show2, setShow2] = useState(false);

  // Step through the sequence only once on mount
  useEffect(() => {
    setStep(0);
    setShow2(false);
  }, []);

  useEffect(() => {
    if (step === 1) {
      setShow2(true);
    }
  }, [step]);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-[#181c23] font-mono px-2 sm:px-0 pt-20 sm:pt-24 md:pt-0">
      <div className="max-w-6xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 text-center w-full">
        <div className="animate-fade-in bg-[#23272e] border-2 border-[#4fd1c5] rounded-xl shadow-lg p-3 sm:p-6 md:p-8 lg:p-10 relative overflow-hidden w-full">
          <div className="absolute left-0 top-0 w-full flex items-center px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-[#181c23] border-b border-[#4fd1c5] rounded-t-xl">
            <span className="text-[#4fd1c5] font-bold mr-1 sm:mr-2 text-xs sm:text-sm md:text-base">$</span>
            <span className="text-[#63b3ed] tracking-wider text-xs sm:text-sm md:text-base">whoami</span>
          </div>
          <div className="mt-8 sm:mt-10 md:mt-12 mb-4 sm:mb-6 text-center">
            <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 text-[#f6e05e] min-h-[1.5em] sm:min-h-[2em] md:min-h-[2.5em] px-2">
              <Typewriter
                text={"Hi, I'm Adarsh Kumar Vishwakarma"}
                speed={35}
                onDone={() => setStep(1)}
              />
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-[#a0aec0] mb-6 sm:mb-8 max-w-3xl mx-auto min-h-[2em] sm:min-h-[2.5em] md:min-h-[3em] px-2">
              {show2 && (
                <Typewriter
                  text={"// I am a Software Developer who genuinely enjoys building software and solving real-world problems. I like working across both frontend and backend, developing APIs, improving user experiences, and making systems more reliable and efficient. I’ve contributed to projects such as university admission platforms and CRM systems, and I enjoy collaborating with teams to turn ideas into working, high-quality solutions."}
                  speed={18}
                  onDone={() => setStep(2)}
                />
              )}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 w-full px-2">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-[#4fd1c5] hover:bg-[#63b3ed] text-[#181c23] font-bold px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base md:text-lg font-mono transition-colors duration-200"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View My Work
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-[#4fd1c5] text-[#4fd1c5] hover:bg-[#4fd1c5] hover:text-[#181c23] px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base md:text-lg font-mono"
              onClick={() => window.open('https://drive.google.com/drive/folders/1-sm3QRCtvDvGz7AWPcP_yV0aMX_V_5-t?usp=sharing', '_blank')}
            >
              <Download className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden sm:inline">Download Resume</span>
              <span className="sm:hidden">Resume</span>
            </Button>
          </div>
          <div className="flex justify-center space-x-4 sm:space-x-6 mb-4 sm:mb-6">
            <a href="https://github.com/Adarsh-Kumar-Vishwakarma" className="text-[#a0aec0] hover:text-[#4fd1c5] transition-colors duration-200" aria-label="GitHub">
              <Github size={24} className="sm:w-8 sm:h-8" />
            </a>
            <a href="https://www.linkedin.com/in/adarsh-kumar-vishwakarma-6ba71a192/" className="text-[#a0aec0] hover:text-[#4fd1c5] transition-colors duration-200" aria-label="LinkedIn">
              <Linkedin size={24} className="sm:w-8 sm:h-8" />
            </a>
            <a href="mailto:adarshvish2606@gmail.com?subject=Contact%20from%20Portfolio&body=Hi%20Adarsh," className="text-[#a0aec0] hover:text-[#4fd1c5] transition-colors duration-200" aria-label="Email">
              <Mail size={24} className="sm:w-8 sm:h-8" />
            </a>
          </div>
          <div className="mt-4 sm:mt-6 md:mt-8 text-center text-[#718096] text-xs px-2">// Welcome to my digital terminal portfolio.</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
