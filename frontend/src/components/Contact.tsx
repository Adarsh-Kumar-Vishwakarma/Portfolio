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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success('Message sent successfully! I\'ll get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        // Handle specific error types
        if (data.error === 'EMAIL_SERVICE_ERROR') {
          toast.error('Email service is temporarily unavailable. Please try again later.');
        } else if (response.status === 429) {
          toast.error('Too many submissions. Please wait a moment before trying again.');
        } else if (data.errors && Array.isArray(data.errors)) {
          // Handle validation errors from backend
          data.errors.forEach((error: any) => {
            toast.error(`${error.field}: ${error.message}`);
          });
        } else {
          toast.error(data.message || 'Failed to send message. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Handle network errors
      if (error instanceof TypeError && error.message.includes('fetch')) {
        toast.error('Unable to connect to server. Please check your internet connection.');
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Get In Touch</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            I'm always interested in new opportunities and exciting projects. 
            Let's discuss how we can work together!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-600 p-3 rounded-lg">
                  <Mail className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-gray-300">Email</p>
                  <p className="text-white font-semibold">adarshvish2606@email.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-blue-600 p-3 rounded-lg">
                  <Phone className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-gray-300">Phone</p>
                  <p className="text-white font-semibold">+91 9930635004</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-blue-600 p-3 rounded-lg">
                  <MapPin className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-gray-300">Location</p>
                  <p className="text-white font-semibold">Nalasopara, Mumbai</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gray-800 rounded-lg">
              <h4 className="text-lg font-semibold text-white mb-3">Let's Connect</h4>
              <p className="text-gray-300 mb-4">
                I'm always open to discussing new projects, creative ideas, or 
                opportunities to be part of your vision.
              </p>
              <div className="flex space-x-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
                  onClick={() => window.open('https://www.linkedin.com/in/adarsh-kumar-vishwakarma-6ba71a192/', '_blank')}
                >
                  LinkedIn
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-gray-400 text-gray-400 hover:bg-gray-400 hover:text-white"
                  onClick={() => window.open('https://github.com/Adarsh-Kumar-Vishwakarma', '_blank')}
                >
                  GitHub
                </Button>
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-gray-800 border-gray-700 text-white focus:border-blue-400"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-gray-800 border-gray-700 text-white focus:border-blue-400"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  Subject
                </label>
                <Input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="bg-gray-800 border-gray-700 text-white focus:border-blue-400"
                  placeholder="Project Discussion"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="bg-gray-800 border-gray-700 text-white focus:border-blue-400"
                  placeholder="Tell me about your project..."
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
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
          </div>
        </div>

        <div className="mt-16 text-center border-t border-gray-700 pt-8">
          <p className="text-gray-400">
            {/* © 2025 Adarsh Kumar Vishwakarma. Built with React and Tailwind CSS. */}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
