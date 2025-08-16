import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import SystemStatusBar from './SystemStatusBar';
import { useInView } from '../hooks/use-in-view';

// API base URL configuration
const API_BASE_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:3001/api'
  : 'https://portfoliobackend-steel.vercel.app/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [effectPlayed, setEffectPlayed] = useState(false);
  const [typedIntro, setTypedIntro] = useState('');

  // Use the correct endpoint for contact
  const API_URL = `${API_BASE_URL}/contact`;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const terminalErrorToast = (msg: string, type: string = 'error') =>
    toast.custom((id) => (
      <div className="bg-[#23272e] border-l-4 border-[#4fd1c5] text-[#f6e05e] font-mono px-3 sm:px-4 py-2 sm:py-3 rounded shadow-lg flex flex-wrap sm:flex-nowrap items-start sm:items-center gap-2 sm:gap-3 w-full max-w-[280px] sm:max-w-xs mx-auto sm:mx-2 break-words text-sm sm:text-base" key={id}>
        <div className="flex items-center gap-2 min-w-fit">
          <span className="text-[#4fd1c5] font-bold">$</span>
          <span className={`font-bold whitespace-nowrap ${
            type === 'error' ? 'text-[#ef4444]' : 
            type === 'warning' ? 'text-[#f59e0b]' : 
            type === 'info' ? 'text-[#63b3ed]' : 
            'text-[#10B981]'
          }`}>{type}:</span>
        </div>
        <span className="text-[#f6e05e] leading-tight">{msg}</span>
      </div>
    ), { duration: 4000 });

  const terminalSuccessToast = (msg: string) =>
    toast.custom((id) => (
      <div className="bg-[#23272e] border-l-4 border-[#4fd1c5] text-[#f6e05e] font-mono px-3 sm:px-4 py-2 sm:py-3 rounded shadow-lg flex flex-wrap sm:flex-nowrap items-start sm:items-center gap-2 sm:gap-3 w-full max-w-[280px] sm:max-w-xs mx-auto sm:mx-2 break-words text-sm sm:text-base" key={id}>
        <div className="flex items-center gap-2 min-w-fit">
          <span className="text-[#4fd1c5] font-bold">$</span>
          <span className="text-[#10B981] font-bold whitespace-nowrap">success:</span>
        </div>
        <span className="text-[#f6e05e] leading-tight">{msg}</span>
      </div>
    ), { duration: 4000 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 🚫 Reject specific email before proceeding
    if (formData.email.toLowerCase() === 'adarshvish2606@gmail.com') {
      terminalErrorToast('This email address is not allowed.', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      // Show sending message
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
        terminalSuccessToast('Message sent successfully! I\'ll get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        // Handle specific error types
        if (data.error === 'EMAIL_SERVICE_ERROR') {
          terminalErrorToast('Email service is temporarily unavailable. Please try again later.');
        } else if (response.status === 429) {
          terminalErrorToast('Too many submissions. Please wait a moment before trying again.');
        } else if (data.errors && Array.isArray(data.errors)) {
          // Handle validation errors from backend
          data.errors.forEach((error: any) => {
            const errorCode = error.field.toUpperCase();
            terminalErrorToast(`Validation failed: ${error.field} [ERR_${errorCode}] - ${error.message}`, 'error');
          });
        } else {
          terminalErrorToast(data.message || 'Failed to send message. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Handle network errors
      if (error instanceof TypeError && error.message.includes('fetch')) {
        terminalErrorToast('Unable to connect to server. Please check your internet connection.');
      } else {
        terminalErrorToast('Failed to send message. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Typewriter effect for the intro
  const introText = "# I'm always interested in new opportunities and exciting projects. Let's discuss how we can work together!";
  const [contactRef, inView] = useInView<HTMLDivElement>({ threshold: 0.3 });
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
    <section className="py-10 sm:py-20 bg-[#181c23] font-mono px-2 sm:px-0 relative overflow-hidden">
      {/* Animated grid/scanline overlay */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-30" style={{backgroundImage: 'repeating-linear-gradient(to bottom, #4fd1c511 0px, #4fd1c511 1px, transparent 1px, transparent 24px), repeating-linear-gradient(to right, #4fd1c511 0px, #4fd1c511 1px, transparent 1px, transparent 24px)'}} />
      <div className="max-w-6xl mx-auto px-2 sm:px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 sm:mb-16" ref={contactRef}>
          <div id="contact" className="inline-flex flex-col items-center gap-2 mb-6 font-mono scroll-mt-20 bg-[#23272e] border-2 border-[#4fd1c5] rounded-t-xl px-4 sm:px-6 py-2">
            <div className="flex items-center gap-2">
              <span className="text-[#4fd1c5] font-bold">$</span>
              <span className="text-[#63b3ed] tracking-wider">./contact --init</span>
            </div>
            <SystemStatusBar />
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#f6e05e] mb-4 mt-2 flex items-center justify-center">
            Contact <span className="ml-2 animate-pulse">|</span>
          </h2>
          <p className="text-base sm:text-xl text-[#a0aec0] max-w-3xl mx-auto min-h-[3.5em]">
            <span>{typedIntro}</span>
            {typedIntro.length < introText.length && !effectPlayed && <span className="blinking-cursor">|</span>}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          <div className="mb-8 lg:mb-0">
            {/* Terminal/Hacker Style Contact Info */}
            <div className="bg-[#23272e] border-2 border-[#4fd1c5] rounded-xl shadow-lg p-8 font-mono relative overflow-hidden mb-8 lg:mb-0">
              <div className="absolute left-0 top-0 w-full flex items-center px-4 py-2 bg-[#181c23] border-b border-[#4fd1c5] rounded-t-xl">
                <span className="text-[#4fd1c5] font-bold mr-2">$</span>
                <span className="text-[#63b3ed] tracking-wider">cat contact-info.txt</span>
              </div>
              <div className="mt-10 mb-6 text-center">
                <h3 className="text-2xl text-[#f6e05e] font-bold mb-2">Contact Information</h3>
                <p className="text-[#a0aec0] text-sm mb-4">// Let's connect! You can reach me via the details below or through the form.</p>
              </div>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-[#181c23] p-3 rounded-lg border border-[#4fd1c5]">
                    <Mail className="text-[#4fd1c5]" size={24} />
                  </div>
                  <div>
                    <p className="text-[#a0aec0]">Email</p>
                    <p className="text-[#f7fafc] font-semibold">adarshvish2606@email.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-[#181c23] p-3 rounded-lg border border-[#4fd1c5]">
                    <Phone className="text-[#4fd1c5]" size={24} />
                  </div>
                  <div>
                    <p className="text-[#a0aec0]">Phone</p>
                    <p className="text-[#f7fafc] font-semibold">+91 9930635004</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-[#181c23] p-3 rounded-lg border border-[#4fd1c5]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#4fd1c5" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.198.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.151-.174.2-.298.3-.497.099-.198.05-.372-.025-.52-.075-.148-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.1 3.2 5.077 4.366.71.306 1.263.489 1.695.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 6.318h-.001a8.77 8.77 0 0 1-4.473-1.231l-.321-.19-3.326.874.889-3.24-.209-.332A8.725 8.725 0 0 1 2.2 12.045c0-4.825 3.936-8.761 8.764-8.761 2.342 0 4.544.913 6.2 2.569a8.68 8.68 0 0 1 2.563 6.192c-.003 4.825-3.939 8.761-8.765 8.761zm7.149-15.91A10.42 10.42 0 0 0 10.964 0C5.006 0 .199 4.807.199 10.744c0 1.892.496 3.747 1.442 5.377L.057 23.25a1.003 1.003 0 0 0 1.225 1.225l7.13-1.584a10.73 10.73 0 0 0 4.552 1.047h.005c5.957 0 10.764-4.807 10.764-10.744 0-2.86-1.115-5.548-3.146-7.744z"/></svg>
                  </div>
                  <div>
                    <p className="text-[#a0aec0]">WhatsApp</p>
                    <a href="https://wa.me/919930635004?text=Hello%20Adarsh%2C%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20potential%20opportunity%20or%20connect%20for%20a%20professional%20conversation." target="_blank" rel="noopener noreferrer" className="text-[#25D366] font-semibold hover:underline">Message on WhatsApp</a>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-[#181c23] p-3 rounded-lg border border-[#4fd1c5]">
                    <MapPin className="text-[#4fd1c5]" size={24} />
                  </div>
                  <div>
                    <p className="text-[#a0aec0]">Location</p>
                    <p className="text-[#f7fafc] font-semibold">Nalasopara, Palghar</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 p-6 bg-[#181c23] rounded-lg border border-[#4fd1c5]">
                <h4 className="text-lg font-semibold text-[#f6e05e] mb-3">Let's Connect</h4>
                <p className="text-[#a0aec0] mb-4">// I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.</p>
                <div className="flex space-x-4 justify-center">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-[#4fd1c5] text-[#4fd1c5] hover:bg-[#4fd1c5] hover:text-[#181c23] font-mono"
                    onClick={() => window.open('https://www.linkedin.com/in/adarsh-kumar-vishwakarma-6ba71a192/', '_blank')}
                  >
                    LinkedIn
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-[#a0aec0] text-[#a0aec0] hover:bg-[#a0aec0] hover:text-[#181c23] font-mono"
                    onClick={() => window.open('https://github.com/Adarsh-Kumar-Vishwakarma', '_blank')}
                  >
                    GitHub
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div>
            {/* Terminal/Hacker Style Contact Form */}
            <div className="bg-[#23272e] border-2 border-[#4fd1c5] rounded-xl shadow-lg p-8 font-mono relative overflow-hidden">
              <div className="absolute left-0 top-0 w-full flex items-center px-4 py-2 bg-[#181c23] border-b border-[#4fd1c5] rounded-t-xl">
                <span className="text-[#4fd1c5] font-bold mr-2">$</span>
                <span className="text-[#63b3ed] tracking-wider">curl -X POST /contact</span>
              </div>
              <div className="mt-10 mb-6 text-center">
                {/* <pre className="text-[#4fd1c5] text-sm leading-4 select-none">
{`   ____            _        _   _           _     
  |  _ \\ ___  __ _| |_ __ _| | | | ___  ___| |__  
  | |_) / _ \\/ _\` | __/ _\` | |_| |/ _ \\/ __| '_ \\ 
  |  __/  __/ (_| | || (_| |  _  |  __/\\__ \\ | | |
  |_|   \\___|\\__,_|\\__\\__,_|_| |_|\\___||___/_| |_|`}
                </pre> */}
                <h3 className="text-xl text-[#f6e05e] font-bold mt-2 mb-1">Contact the Developer</h3>
                <p className="text-[#a0aec0] text-sm">// Drop a message below. All fields are required.</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-[#f6e05e] mb-2 uppercase tracking-wider">
                      {/* Name */} <span className="text-[#4fd1c5]">name</span>
                    </label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-[#181c23] border-[#4fd1c5] text-[#f7fafc] focus:border-[#f6e05e] font-mono placeholder-[#718096]"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-[#f6e05e] mb-2 uppercase tracking-wider">
                      {/* Email */} <span className="text-[#4fd1c5]">email</span>
                    </label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-[#181c23] border-[#4fd1c5] text-[#f7fafc] focus:border-[#f6e05e] font-mono placeholder-[#718096]"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-xs font-semibold text-[#f6e05e] mb-2 uppercase tracking-wider">
                    {/* Subject */} <span className="text-[#4fd1c5]">subject</span>
                  </label>
                  <Input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="bg-[#181c23] border-[#4fd1c5] text-[#f7fafc] focus:border-[#f6e05e] font-mono placeholder-[#718096]"
                    placeholder="Project Discussion"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-[#f6e05e] mb-2 uppercase tracking-wider">
                    {/* Message */} <span className="text-[#4fd1c5]">message</span>
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="bg-[#181c23] border-[#4fd1c5] text-[#f7fafc] focus:border-[#f6e05e] font-mono placeholder-[#718096]"
                    placeholder="Type your message in code..."
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#4fd1c5] hover:bg-[#63b3ed] text-[#181c23] font-bold py-3 font-mono transition-colors duration-200"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="mr-2 animate-spin" size={20} />
                  ) : (
                    <Send className="mr-2" size={20} />
                  )}
                  Send Message
                </Button>
              </form>
              <div className="mt-8 text-center text-[#718096] text-xs">
                // Your message will be delivered to the developer's digital terminal.
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 sm:mt-16 text-center border-t border-gray-700 pt-8">
          <p className="text-gray-400 text-xs sm:text-base">
            {/* © 2025 Adarsh Kumar Vishwakarma. Built with React and Tailwind CSS. */}
          </p>
        </div>

        {/* Blinking cursor global style */}
        <style>{`.blinking-cursor{display:inline-block;width:1ch;animation:blink 1s steps(2,start) infinite;}@keyframes blink{to{visibility:hidden;}}`}</style>

        {/* Floating WhatsApp Button */}
        {/* <a
          href="https://wa.me/919930635004?text=Hello%20Adarsh%2C%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20potential%20opportunity%20or%20connect%20for%20a%20professional%20conversation."
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full shadow-lg p-4 flex items-center justify-center transition-colors duration-200"
          aria-label="Chat on WhatsApp"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24"><path fill="white" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.198.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.151-.174.2-.298.3-.497.099-.198.05-.372-.025-.52-.075-.148-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.1 3.2 5.077 4.366.71.306 1.263.489 1.695.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 6.318h-.001a8.77 8.77 0 0 1-4.473-1.231l-.321-.19-3.326.874.889-3.24-.209-.332A8.725 8.725 0 0 1 2.2 12.045c0-4.825 3.936-8.761 8.764-8.761 2.342 0 4.544.913 6.2 2.569a8.68 8.68 0 0 1 2.563 6.192c-.003 4.825-3.939 8.761-8.765 8.761zm7.149-15.91A10.42 10.42 0 0 0 10.964 0C5.006 0 .199 4.807.199 10.744c0 1.892.496 3.747 1.442 5.377L.057 23.25a1.003 1.003 0 0 0 1.225 1.225l7.13-1.584a10.73 10.73 0 0 0 4.552 1.047h.005c5.957 0 10.764-4.807 10.764-10.744 0-2.86-1.115-5.548-3.146-7.744z"/></svg>
        </a> */}
      </div>
    </section>
  );
};

export default Contact;
