import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 font-mono bg-[#181c23] border-b-2 border-[#4fd1c5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <span className="text-[#4fd1c5] font-bold text-2xl">$</span>
            <span className="text-[#63b3ed] text-xl tracking-wider select-none">portfolio</span>
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {['home', 'about', 'projects', 'skills', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-[#a0aec0] hover:text-[#4fd1c5] transition-colors duration-200 capitalize font-mono border-b-2 border-transparent hover:border-[#4fd1c5] px-2 py-1"
              >
                {item}
              </button>
            ))}
          </div>
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#a0aec0]"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-[#23272e] border border-[#4fd1c5]/60 rounded-2xl mt-4 p-4 animate-fade-in font-mono mx-2 shadow-lg">
            <div className="border border-[#4fd1c5]/40 rounded-xl p-4">
              {['home', 'about', 'projects', 'skills', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left py-3 px-2 text-[#a0aec0] hover:text-[#4fd1c5] hover:bg-[#181c23] transition-colors duration-200 capitalize font-mono text-lg border-b border-[#4fd1c5]/10 last:border-b-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4fd1c5]"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
