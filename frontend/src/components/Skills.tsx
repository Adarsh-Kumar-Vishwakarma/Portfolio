
import React from 'react';
import { Progress } from '@/components/ui/progress';

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend Technologies",
      skills: [
        { name: "Angular", level: 90 },
        { name: "TypeScript", level: 85 },
        { name: "JavaScript", level: 90 },
        { name: "HTML", level: 90 },
        { name: "CSS", level: 70 }
      ]
    },
    {
      title: "Backend Technologies", 
      skills: [
        { name: "Node.js", level: 85 },
        { name: "Express.js", level: 82 },
        { name: "Java", level: 90 },
        // { name: "GraphQL", level: 78 }
      ]
    },
    {
      title: "Databases & Tools",
      skills: [
        { name: "MongoDB", level: 70 },
        { name: "SQL", level: 85 },
        { name: "Docker", level: 75 },
        // { name: "AWS", level: 70 }
      ]
    }
  ];

  const tools = [
    "Git", "VS Code", "Postman", "Jenkins", "Jira", "Grafana",
    "Slack", "Docker", "Keycloak", "RabbitMQ", "GitHub", "SendGrid"
  ];

  return (
    <section id="skills" className="py-20 bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Skills & Experience</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            I'm proficient in a wide range of technologies and tools that help me 
            build robust and scalable applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <div key={index} className="bg-gray-900 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-6">{category.title}</h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-blue-400">{skill.level}%</span>
                    </div>
                    <Progress 
                      value={skill.level} 
                      className="h-2 bg-gray-700"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-900 p-8 rounded-lg mb-16">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Tools & Technologies</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {tools.map((tool, index) => (
              <span 
                key={index}
                className="px-4 py-2 bg-gray-700 text-gray-300 rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-200"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-gray-900 p-8 rounded-lg">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Professional Experience</h3>
          <div className="space-y-8">
            <div className="border-l-4 border-blue-400 pl-4">
              <h4 className="text-xl text-white font-semibold">Junior Software Developer</h4>
              <p className="text-blue-400">Edulab Educational Exchange Pvt. Ltd• 05 May 2025 - Present</p>
              <ul className="list-disc list-inside text-gray-300 mt-2">
                <li>Led development of multiple full-stack applications using React and Node.js</li>
                <li>Mentored junior developers and conducted code reviews</li>
                <li>Implemented CI/CD pipelines and improved deployment processes</li>
              </ul>
            </div>
            <div className="border-l-4 border-blue-400 pl-4">
              <h4 className="text-xl text-white font-semibold">Software Developer</h4>
              <p className="text-blue-400">New Era It Consultancy • Feb 2024 - Feb2025</p>
              <ul className="list-disc list-inside text-gray-300 mt-2">
                <li>Developed, deployed, and maintained Customer Relationship Management (CRM) software solutions for clients such as Reliance, Mapple, and iPlanet,creating streamlined and impactful products tailored to meet each client’s specific needs.</li>
                <li>Created user-friendly, efficient, and effective solutions with expertise in the Angular framework.</li>
                <li>Collaborated closely with clients to deliver customized software solutions that address their unique requirements.</li>
                <li>Gained hands-on experience with Angular fundamentals, including component creation, routing, API integration, and services, while also working with stored procedures in SQL for systematic data management.</li>
                <li>Provided ongoing support for live projects, ensuring their seamless operation through troubleshooting, maintenance, and upgrades.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
