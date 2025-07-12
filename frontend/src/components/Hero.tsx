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
    <section id="home" className="min-h-screen flex items-center justify-center bg-[#181c23] font-mono px-2 sm:px-0 mt-16 sm:mt-0">
      <div className="max-w-6xl mx-auto px-2 sm:px-4 sm:px-6 lg:px-8 text-center w-full">
        <div className="animate-fade-in bg-[#23272e] border-2 border-[#4fd1c5] rounded-xl shadow-lg p-4 sm:p-10 relative overflow-hidden w-full">
          <div className="absolute left-0 top-0 w-full flex items-center px-2 sm:px-4 py-2 bg-[#181c23] border-b border-[#4fd1c5] rounded-t-xl">
            <span className="text-[#4fd1c5] font-bold mr-2">$</span>
            <span className="text-[#63b3ed] tracking-wider text-xs sm:text-base">whoami</span>
          </div>
          <div className="mt-10 mb-6 text-center">
            <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-4 text-[#f6e05e] min-h-[2.5em]">
              <Typewriter
                text={"Hi, I'm Adarsh Kumar Vishwakarma"}
                speed={35}
                onDone={() => setStep(1)}
              />
            </h1>
            <p className="text-base sm:text-lg md:text-2xl text-[#a0aec0] mb-8 max-w-3xl mx-auto min-h-[2.5em]">
              {show2 && (
                <Typewriter
                  text={"// Junior Full-Stack Developer passionate about learning and building scalable, real-world solutions through hands-on experience."}
                  speed={18}
                  onDone={() => setStep(2)}
                />
              )}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 w-full">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-[#4fd1c5] hover:bg-[#63b3ed] text-[#181c23] font-bold px-8 py-3 text-lg font-mono transition-colors duration-200"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View My Work
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-[#4fd1c5] text-[#4fd1c5] hover:bg-[#4fd1c5] hover:text-[#181c23] px-8 py-3 text-lg font-mono"
              onClick={() => window.open('https://drive.google.com/drive/folders/1-sm3QRCtvDvGz7AWPcP_yV0aMX_V_5-t?usp=sharing', '_blank')}
            >
              <Download className="mr-2" size={20} />
              Download Resume
            </Button>
          </div>
          <div className="flex justify-center space-x-6">
            <a href="https://github.com/Adarsh-Kumar-Vishwakarma" className="text-[#a0aec0] hover:text-[#4fd1c5] transition-colors duration-200">
              <Github size={32} />
            </a>
            <a href="https://www.linkedin.com/in/adarsh-kumar-vishwakarma-6ba71a192/" className="text-[#a0aec0] hover:text-[#4fd1c5] transition-colors duration-200">
              <Linkedin size={32} />
            </a>
            <a href="mailto:adarshvish2606@gmail.com?subject=Contact%20from%20Portfolio&body=Hi%20Adarsh," className="text-[#a0aec0] hover:text-[#4fd1c5] transition-colors duration-200">
              <Mail size={32} />
            </a>
          </div>
          <div className="mt-8 text-center text-[#718096] text-xs">// Welcome to my digital terminal portfolio.</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
