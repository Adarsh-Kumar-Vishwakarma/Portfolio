import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const API_BASE_URL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:3001/api'
    : 'https://portfoliobackend-steel.vercel.app/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [effectPlayed, setEffectPlayed] = useState(false);
  const [typedIntro, setTypedIntro] = useState('');

  const API_URL = `${API_BASE_URL}/contact`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const terminalErrorToast = (msg: string, type: string = 'error') =>
    toast.custom((id) => (
      <div
        className="w-full max-w-xs rounded-2xl border border-white/10 bg-slate-950/95 px-4 py-3 text-sm text-slate-100 shadow-2xl"
        key={id}
      >
        <div className="mono-text mb-1 text-xs uppercase tracking-[0.2em] text-cyan-200">{type}</div>
        <span className="leading-relaxed text-slate-200">{msg}</span>
      </div>
    ));

  const terminalSuccessToast = (msg: string) =>
    toast.custom((id) => (
      <div
        className="w-full max-w-xs rounded-2xl border border-emerald-400/20 bg-slate-950/95 px-4 py-3 text-sm text-slate-100 shadow-2xl"
        key={id}
      >
        <div className="mono-text mb-1 text-xs uppercase tracking-[0.2em] text-emerald-300">success</div>
        <span className="leading-relaxed text-slate-200">{msg}</span>
      </div>
    ));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.email.toLowerCase() === 'adarshvish2606@gmail.com') {
      terminalErrorToast('This email address is not allowed.', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      terminalErrorToast('Establishing connection to server...', 'info');

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        terminalSuccessToast("Message sent successfully! I'll get back to you soon.");
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else if (data.error === 'EMAIL_SERVICE_ERROR') {
        terminalErrorToast('Email service is temporarily unavailable. Please try again later.');
      } else if (response.status === 429) {
        terminalErrorToast('Too many submissions. Please wait a moment before trying again.');
      } else if (data.errors && Array.isArray(data.errors)) {
        data.errors.forEach((error: any) => {
          const errorCode = error.field.toUpperCase();
          terminalErrorToast(`Validation failed: ${error.field} [ERR_${errorCode}] - ${error.message}`, 'error');
        });
      } else {
        terminalErrorToast(data.message || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);

      if (error instanceof TypeError && error.message.includes('fetch')) {
        terminalErrorToast('Unable to connect to server. Please check your internet connection.');
      } else {
        terminalErrorToast('Failed to send message. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const introText =
    "# I'm always interested in new opportunities and exciting projects. Let's discuss how we can work together!";

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
        <div id="contact" className="scroll-mt-28">
          <div className="section-kicker">
            <span className="section-kicker-dot" />
            Contact
          </div>
          <h2 className="section-heading">Contact</h2>
          <p className="section-copy">
            <span>{typedIntro}</span>
            {typedIntro.length < introText.length && !effectPlayed && <span className="blinking-cursor">|</span>}
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="glass-panel rounded-[2rem] p-8">
            <p className="mono-text text-xs uppercase tracking-[0.3em] text-cyan-200">Reach out</p>
            <h3 className="mt-4 text-3xl font-semibold text-white">Contact Information</h3>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              // Let&apos;s connect! You can reach me via the details below or through the form.
            </p>

            <div className="mt-8 space-y-5">
              <div className="flex items-start gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-3 text-cyan-200">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="mono-text text-xs uppercase tracking-[0.24em] text-slate-400">Email</p>
                  <p className="mt-2 text-sm font-medium text-white break-all">adarshvish2606@email.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-3 text-cyan-200">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="mono-text text-xs uppercase tracking-[0.24em] text-slate-400">Phone</p>
                  <p className="mt-2 text-sm font-medium text-white">+91 9930635004</p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-3 text-cyan-200">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="mono-text text-xs uppercase tracking-[0.24em] text-slate-400">Location</p>
                  <p className="mt-2 text-sm font-medium text-white">Nalasopara, Palghar</p>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-cyan-300/10 bg-cyan-300/5 p-5">
              <h4 className="text-lg font-semibold text-white">Let&apos;s Connect</h4>
              <p className="text-sm leading-7 text-slate-300">
                // I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
            </div>
          </div>

          <div className="soft-card rounded-[2rem] p-8">
            <p className="mono-text text-xs uppercase tracking-[0.3em] text-amber-200">Send message</p>
            <h3 className="mt-4 text-3xl font-semibold text-white">Contact the Developer</h3>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              // Drop a message below. All fields are required.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mono-text text-xs uppercase tracking-[0.24em] text-slate-400">
                    Name
                  </label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-2 h-12 rounded-2xl border-white/10 bg-slate-950/60 text-white placeholder:text-slate-500 focus:border-cyan-300/40"
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mono-text text-xs uppercase tracking-[0.24em] text-slate-400">
                    Email
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-2 h-12 rounded-2xl border-white/10 bg-slate-950/60 text-white placeholder:text-slate-500 focus:border-cyan-300/40"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="mono-text text-xs uppercase tracking-[0.24em] text-slate-400">
                  Subject
                </label>
                <Input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="mt-2 h-12 rounded-2xl border-white/10 bg-slate-950/60 text-white placeholder:text-slate-500 focus:border-cyan-300/40"
                  placeholder="Project Discussion"
                />
              </div>

              <div>
                <label htmlFor="message" className="mono-text text-xs uppercase tracking-[0.24em] text-slate-400">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="mt-2 rounded-[1.5rem] border-white/10 bg-slate-950/60 text-white placeholder:text-slate-500 focus:border-cyan-300/40"
                  placeholder="Type your message in code..."
                />
              </div>

              <Button
                type="submit"
                className="h-14 w-full rounded-full bg-gradient-to-r from-cyan-300 to-sky-400 text-base font-semibold text-slate-950 hover:from-cyan-200 hover:to-sky-300"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <Send className="mr-2 h-5 w-5" />
                )}
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
