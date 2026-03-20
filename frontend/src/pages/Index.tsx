import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import Navigation from '../components/Navigation';
import MatrixRain from '../components/MatrixRain';
import Chatbot from '../components/Chatbot';

const Index = () => {
  return (
    <div className="portfolio-shell">
      <div className="page-glow" />
      <MatrixRain />
      <Navigation />
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <footer className="relative z-10 border-t border-white/10 px-4 py-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <div>
            <p className="text-sm font-medium text-slate-100">Adarsh Kumar Vishwakarma</p>
            <p className="mono-text text-xs uppercase tracking-[0.25em] text-slate-400">
              Full Stack Developer Portfolio
            </p>
          </div>
          {/* <p className="text-sm text-slate-400">Crafted with React, TypeScript, and a premium futuristic visual system.</p> */}
        </div>
      </footer>
      <Chatbot />
    </div>
  );
};

export default Index;
