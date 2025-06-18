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
    // {
    //   icon: <Smartphone size={48} />,
    //   title: "Mobile Development",
    //   description: "Developing cross-platform mobile applications using React Native and Flutter."
    // }
  ];

  return (
    <section id="about" className="py-10 sm:py-20 bg-[#181c23] font-mono px-2 sm:px-0">
      <div className="max-w-6xl mx-auto px-2 sm:px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-block bg-[#23272e] border-2 border-[#4fd1c5] rounded-t-xl px-4 sm:px-6 py-2 mb-2">
            <span className="text-[#4fd1c5] font-bold mr-2">$</span>
            <span className="text-[#63b3ed] tracking-wider text-xs sm:text-base">cat about.txt</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#f6e05e] mb-4 mt-2">About Me</h2>
          <p className="text-base sm:text-xl text-[#a0aec0] max-w-3xl mx-auto">// I'm a passionate software developer with 5+ years of experience in building web and mobile solutions. I love turning complex problems into simple, beautiful, and intuitive solutions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-[#23272e] border-2 border-[#4fd1c5] p-4 sm:p-6 rounded-lg hover:border-[#f6e05e] transition-colors duration-300 text-center group shadow-lg"
            >
              <div className="text-[#4fd1c5] mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-[#f6e05e] mb-3">{service.title}</h3>
              <p className="text-[#a0aec0] text-sm sm:text-base">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 sm:mt-16 bg-[#23272e] border-2 border-[#4fd1c5] p-4 sm:p-8 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-lg sm:text-2xl font-bold text-[#f6e05e] mb-4">My Journey</h3>
              <p className="text-[#a0aec0] mb-4 text-sm sm:text-base">// Started my career as a junior developer and have grown into a full-stack engineer working with startups and established companies. I'm always learning new technologies and staying up-to-date with industry trends.</p>
              <p className="text-[#a0aec0] text-sm sm:text-base">// When I'm not coding, you can find me contributing to open-source projects, writing technical blogs, or exploring new coffee shops around the city.</p>
            </div>
            <div className="flex justify-center mt-6 md:mt-0">
              <div className="w-40 h-40 sm:w-64 sm:h-64 rounded-full border-4 border-[#4fd1c5] bg-[#181c23] flex items-center justify-center">
                {/* You can add a profile image here if you want */}
                <span className="text-[#4fd1c5] text-4xl sm:text-6xl">&#60;/&#62;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
