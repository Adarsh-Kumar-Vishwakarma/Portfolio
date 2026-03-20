import React, { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, Download, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Typewriter from './Typewriter';

const Hero = () => {
  const [step, setStep] = useState(0);
  const [show2, setShow2] = useState(false);

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
    <section id="home" className="section-shell flex min-h-screen items-center">
      <div className="section-inner">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div>
            <div className="section-kicker">
              <span className="section-kicker-dot" />
              Welcome to my portfolio
            </div>
            {/* <h1 className="mt-6 max-w-4xl text-5xl font-bold tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
              <span className="block text-slate-200">Building elegant</span>
              <span className="block bg-gradient-to-r from-cyan-300 via-sky-400 to-amber-300 bg-clip-text text-transparent">
                digital experiences
              </span>
            </h1> */}
            <div className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              <h2 className="min-h-[3.5rem] text-2xl font-semibold text-white sm:min-h-[4rem] sm:text-3xl">
                <Typewriter
                  text={"Hi, I'm Adarsh Kumar Vishwakarma"}
                  speed={35}
                  onDone={() => setStep(1)}
                />
              </h2>
              <div className="mt-4 min-h-[6rem]">
                {show2 && (
                  <Typewriter
                    text={
                      '// Full Stack Developer with over 2 years of experience in building scalable web applications using Angular, Node.js, and MySQL. Skilled in developing RESTful APIs and microservices architecture. Experienced in delivering practical business solutions and improving system efficiency through clean, maintainable code.'
                    }
                    speed={18}
                    onDone={() => setStep(2)}
                  />
                )}
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                className="h-14 rounded-full bg-gradient-to-r from-cyan-300 to-sky-400 px-8 text-base font-semibold text-slate-950 hover:from-cyan-200 hover:to-sky-300"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View My Work
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-14 rounded-full border-white/15 bg-white/5 px-8 text-base text-slate-100 hover:bg-white/10"
                onClick={() =>
                  window.open(
                    'https://drive.google.com/drive/folders/1-sm3QRCtvDvGz7AWPcP_yV0aMX_V_5-t?usp=sharing',
                    '_blank'
                  )
                }
              >
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="https://github.com/Adarsh-Kumar-Vishwakarma"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:-translate-y-0.5 hover:border-cyan-300/40 hover:text-cyan-200"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/adarsh-kumar-vishwakarma-6ba71a192/"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:-translate-y-0.5 hover:border-cyan-300/40 hover:text-cyan-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:adarshvish2606@gmail.com?subject=Contact%20from%20Portfolio&body=Hi%20Adarsh,"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:-translate-y-0.5 hover:border-cyan-300/40 hover:text-cyan-200"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div className="glass-panel relative overflow-hidden rounded-[2rem] p-6 sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(103,232,249,0.22),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(251,191,36,0.16),transparent_26%)]" />
            <div className="relative space-y-6">
              <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-6">
                <p className="mono-text text-xs uppercase tracking-[0.3em] text-cyan-200">Core profile</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="metric-pill">
                    <p className="metric-label">Experience</p>
                    <p className="metric-value">2 Years</p>
                  </div>
                  <div className="metric-pill">
                    <p className="metric-label">Focus</p>
                    <p className="metric-value">Full Stack Developer</p>
                  </div>
                  {/* <div className="metric-pill">
                    <p className="metric-label">Frontend</p>
                    <p className="metric-value">Angular</p>
                  </div>
                  <div className="metric-pill">
                    <p className="metric-label">Backend</p>
                    <p className="metric-value">Node, Java</p>
                  </div> */}
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <p className="mono-text text-xs uppercase tracking-[0.3em] text-amber-200">What I bring</p>
                <ul className="mt-4 space-y-4 text-sm leading-7 text-slate-300">
                  <li>Scalable web applications using Angular, Node.js, and MySQL.</li>
                  <li>RESTful API development and microservices architecture experience.</li>
                  <li>A strong focus on reliable delivery and practical problem-solving.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section-divider" />
    </section>
  );
};

export default Hero;
