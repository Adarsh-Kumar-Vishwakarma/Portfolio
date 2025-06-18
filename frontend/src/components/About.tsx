
import React from 'react';
import { Code, Server, Database, Smartphone } from 'lucide-react';

const About = () => {
  const services = [
    {
      icon: <Code size={48} />,
      title: "Frontend Development",
      description: "Creating responsive and interactive user interfaces using React, Vue, and modern CSS frameworks."
    },
    {
      icon: <Server size={48} />,
      title: "Backend Development", 
      description: "Building robust server-side applications with Node.js, Python, and cloud services."
    },
    {
      icon: <Database size={48} />,
      title: "Database Design",
      description: "Designing and optimizing databases for performance and scalability using SQL and NoSQL solutions."
    },
    {
      icon: <Smartphone size={48} />,
      title: "Mobile Development",
      description: "Developing cross-platform mobile applications using React Native and Flutter."
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            I'm a passionate software developer with 5+ years of experience in building 
            web applications and mobile solutions. I love turning complex problems into 
            simple, beautiful, and intuitive solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-gray-900 p-6 rounded-lg hover:bg-gray-700 transition-colors duration-300 text-center group"
            >
              <div className="text-blue-400 mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
              <p className="text-gray-300">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gray-900 p-8 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">My Journey</h3>
              <p className="text-gray-300 mb-4">
                Started my career as a junior developer and have grown into a full-stack engineer 
                working with startups and established companies. I'm always learning new technologies 
                and staying up-to-date with industry trends.
              </p>
              <p className="text-gray-300">
                When I'm not coding, you can find me contributing to open-source projects, 
                writing technical blogs, or exploring new coffee shops around the city.
              </p>
            </div>
            <div className="flex justify-center">
              <img 
                src=" "
                alt="Profile"
                className="w-64 h-64 rounded-full object-cover border-4 border-blue-400"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
