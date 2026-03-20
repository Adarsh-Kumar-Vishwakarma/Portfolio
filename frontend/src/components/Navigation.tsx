import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import TAKVLogo from './TAKVLogo';

const navItems = ['home', 'about', 'projects', 'skills', 'contact'];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-white/10 bg-slate-950/70 backdrop-blur-2xl' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <button onClick={() => scrollToSection('home')} className="flex items-center gap-3 text-left">
          <TAKVLogo size={42} />
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-100">Adarsh Kumar Vishwakarma</p>
            <p className="mono-text text-[11px] uppercase tracking-[0.28em] text-slate-400">
              Full Stack Developer
            </p>
          </div>
        </button>

        <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1.5 backdrop-blur md:flex">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className="rounded-full px-4 py-2 text-sm font-medium capitalize text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              {item}
            </button>
          ))}
        </div>

        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-100 backdrop-blur md:hidden"
          onClick={() => setIsOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen && (
        <div className="mx-4 mb-4 rounded-3xl border border-white/10 bg-slate-950/90 p-3 shadow-2xl backdrop-blur md:hidden">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className="block w-full rounded-2xl px-4 py-3 text-left text-sm font-medium capitalize text-slate-200 transition hover:bg-white/10"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navigation;
