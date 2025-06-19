import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // API URL configuration for production/development environments
  const API_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:3001/api/contact'
  : 'https://portfolio-tawny-ten-95.vercel.app/api/contact';
  
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

  return (
    <section id="contact" className="py-10 sm:py-20 bg-gray-900 px-2 sm:px-0">
      <div className="max-w-6xl mx-auto px-2 sm:px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-6 font-mono">
            <span className="text-[#4fd1c5] font-bold">$</span>
            <span className="text-[#63b3ed] tracking-wider">./contact</span>
            <span className="text-[#f6e05e]">--init</span>
          </div>
          <pre className="text-[#4fd1c5] text-sm leading-4 select-none mb-6">
{`   _____            _             _   
  / ____|          | |           | |  
 | |     ___  _ __ | |_ __ _  ___| |_ 
 | |    / _ \\| '_ \\| __/ _\` |/ __| __|
 | |___| (_) | | | | || (_| | (__| |_ 
  \\_____\\___/|_| |_|\\__\\__,_|\\___|\\__|`}
          </pre>
          <div className="font-mono text-[#a0aec0] text-sm mb-8">
            <div className="flex items-center justify-center gap-2">
              <span className="text-[#4fd1c5]">[INFO]</span>
              <span>Initializing contact protocols...</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-[#f6e05e]">[STATUS]</span>
              <span>Ready to establish connection</span>
            </div>
          </div>
          <p className="text-base sm:text-lg font-mono text-[#a0aec0] max-w-3xl mx-auto">
            <span className="text-[#4fd1c5]"># </span>
            I'm always interested in new opportunities and exciting projects. 
            Let's discuss how we can work together!
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
                    <MapPin className="text-[#4fd1c5]" size={24} />
                  </div>
                  <div>
                    <p className="text-[#a0aec0]">Location</p>
                    <p className="text-[#f7fafc] font-semibold">Nalasopara, Mumbai</p>
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
      </div>
    </section>
  );
};

export default Contact;
