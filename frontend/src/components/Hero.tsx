
import React from 'react';
import { Github, Linkedin, Mail, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-white">Hi, I'm </span>
            <span className="text-blue-400">Adarsh Kumar Vishwakarma</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Full-Stack Software Developer passionate about creating innovative solutions
            and building scalable applications that make a difference.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View My Work
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-8 py-3 text-lg"
              onClick={() => window.open('https://drive.google.com/file/d/1yJWi6pq7nEMpi1OkgDkaWRX-0GLvT865/view?usp=sharing', '_blank')}
            >
              <Download className="mr-2" size={20} />
              Download Resume
            </Button>
          </div>

          <div className="flex justify-center space-x-6">
            <a href="https://github.com/Adarsh-Kumar-Vishwakarma" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
              <Github size={32} />
            </a>
            <a href="https://www.linkedin.com/in/adarsh-kumar-vishwakarma-6ba71a192/" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
              <Linkedin size={32} />
            </a>
            <a href="mailto:adarshvish2606@gmail.com?subject=Contact%20from%20Portfolio&body=Hi%20Adarsh," className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
              <Mail size={32} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
