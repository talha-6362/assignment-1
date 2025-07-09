'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useRef } from 'react';
import FooterNote from '@/components/FooterNote';
import RadarChart from '@/components/RadarChart';
import {
  BrainCircuit,
  Code,
  Layout,
  Palette,
  Network,
  GitBranch,
  Shield,
  Globe,
  ServerCog,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  const [isSliderPaused, setIsSliderPaused] = useState(false);
  
  const [activeLang, setActiveLang] = useState<string | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const languages = [
    { name: 'JavaScript', proficiency: 90, projects: 8 },
    { name: 'Python', proficiency: 80, projects: 5 },
    { name: 'TypeScript', proficiency: 85, projects: 6 },
    { name: 'C++', proficiency: 75, projects: 3 },
  ];

  const skills = [
    { name: 'MERN Stack', icon: BrainCircuit, description: 'MongoDB, Express.js, React, Node.js full-stack development.', proficiency: 90 },
    { name: 'Python & C++', icon: Code, description: 'Strong in OOP, DSA, and scripting for tools and automation.', proficiency: 80 },
    { name: 'Responsive UI Design', icon: Palette, description: 'Designing elegant UIs with Tailwind CSS & ShadCN UI.', proficiency: 85 },
    { name: 'Networking', icon: Network, description: 'Experienced in system communication & hospital data flow.', proficiency: 70 },
    { name: 'RESTful APIs', icon: ServerCog, description: 'Building scalable APIs with Node.js & Express.', proficiency: 80 },
    { name: 'Version Control', icon: GitBranch, description: 'Efficient team workflow using Git & GitHub.', proficiency: 85 },
    { name: 'Authentication', icon: Shield, description: 'Email, JWT-based login systems with client protection.', proficiency: 75 },
    { name: 'Framer Motion', icon: Layout, description: 'Smooth interactive animations for page transitions.', proficiency: 80 },
    { name: 'Deployment', icon: Globe, description: 'Hosting via Vercel & Netlify with environment setup.', proficiency: 85 },
  ];

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack online store with React, Node.js, and MongoDB, featuring cart and payment integration.',
      tech: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
      github: 'https://github.com/talha-6362/ecommerce-platform',
      demo: 'https://example.com/ecommerce-demo',
    },
    {
      title: 'Task Manager App',
      description: 'A productivity app with real-time task syncing using Next.js and Supabase.',
      tech: ['Next.js', 'Supabase', 'TypeScript', 'ShadCN UI'],
      github: 'https://github.com/talha-6362/task-manager',
      demo: 'https://example.com/task-manager-demo',
    },
    {
      title: 'Portfolio Website',
      description: 'A personal portfolio showcasing projects with Next.js and Framer Motion animations.',
      tech: ['Next.js', 'TypeScript', 'Framer Motion', 'Tailwind CSS'],
      github: 'https://github.com/talha-6362/portfolio',
      demo: 'https://example.com/portfolio-demo',
    },
  ];

  // const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

// // useEffect(() => {
// //   const handleMouseMove = (e: MouseEvent) => {
// //     const x = e.clientX;
// //     const y = e.clientY;
// //     setMousePosition({ x, y });
// //   };

//   window.addEventListener('mousemove', handleMouseMove);
//   return () => window.removeEventListener('mousemove', handleMouseMove);
// }, []);


  return (
    <motion.main
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-gray-800 relative overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
  className="bg-white/70 backdrop-blur-lg rounded-xl shadow-2xl p-6 sm:p-10 mb-12 border-2 border-transparent bg-clip-padding bg-gradient-to-r from-indigo-600/20 to-purple-600/20 relative z-10"
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ delay: 0.4 }}
>
  <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
    <motion.span
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      className="inline-block"
    >
      🚀
    </motion.span>
    Project Overview
  </h2>

  <p className="text-base text-gray-700 mb-6">
    The Quote Generator is a dynamic web app built for the <strong>Nexium Internship</strong> to showcase my expertise in modern frontend development.
    It empowers users to explore quotes by topic, save favorites, share thoughts, and engage with a sleek, animated interface.
    Performance, accessibility, and user delight are at its core.
  </p>

  <h3 className="text-lg font-medium mb-2">🔧 Tech Stack</h3>
  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm text-gray-700 mb-6">
    {[
      'Next.js 14 (App Router)',
      'Tailwind CSS',
      'Framer Motion',
      'ShadCN UI',
      'TypeScript',
      'LocalStorage & JSON',
    ].map((tech, index) => (
      <motion.li
        key={tech}
        className="flex items-center gap-2"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
      >
        <Code className="w-4 h-4 text-indigo-600" /> {tech}
      </motion.li>
    ))}
  </ul>

  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Button asChild>
      <Link
        href="/"
        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg"
      >
        ⬅️ Back to Home
      </Link>
    </Button>
  </motion.div>
</motion.div>


      {/* Skills Radar Chart */}
      <motion.div
  className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-2xl p-6 sm:p-10 mb-12 relative z-10"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.6 }}
>
  <motion.h2
    className="text-xl sm:text-2xl font-semibold mb-4 flex items-center gap-2"
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.7 }}
  >
    <span className="text-2xl text-center">📊</span> Skills & Career Impact
  </motion.h2>

  {/* RadarChart renders rotating animated chart with hover stop logic */}
  <RadarChart />

  <motion.p
    className="text-sm text-gray-600 mt-4 text-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.9 }}
  >
    This radar chart illustrates my proficiency in key skills and their impact on my career as a developer.
  </motion.p>
</motion.div>



      {/* The rest of your sections remain as is */}
      {/* Languages Section, Skills Grid, Projects Slider, Developer Footer */}
      {/* Languages Section */}
      <motion.div
  className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-2xl p-6 sm:p-10 mb-12 relative z-10"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.8 }}
>
  <motion.h2
    className="text-xl sm:text-2xl font-semibold mb-4 flex items-center gap-2"
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.9 }}
  >
    <span className="text-2xl">💻</span> Programming Languages
  </motion.h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {languages.map((lang, index) => (
      <motion.div
        key={lang.name}
        className="bg-white/70 backdrop-blur-lg rounded-lg shadow-md p-4 cursor-pointer transition-transform duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => setActiveLang(activeLang === lang.name ? null : lang.name)}
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-800">{lang.name}</h3>
          <AnimatePresence>
            {activeLang === lang.name && (
              <motion.span
                className="text-xs text-indigo-600 font-medium"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                {lang.projects} Projects
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600"
            initial={{ width: 0 }}
            animate={{ width: `${lang.proficiency}%` }}
            transition={{ duration: 1, delay: index * 0.2, ease: 'easeOut' }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-xs text-white font-semibold">
            {lang.proficiency}%
          </div>
        </div>

        <p className="text-xs text-gray-600 mt-1">{lang.proficiency}% Proficiency</p>
      </motion.div>
    ))}
  </div>
</motion.div>


      {/* My Skills Grid */}
<motion.div
  className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-2xl p-6 sm:p-10 mb-12 relative z-10"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 1 }}
>
  <motion.h2
    className="text-xl sm:text-2xl font-semibold mb-4 flex items-center gap-2"
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.1 }}
  >
    <span className="text-2xl">🌟</span> My Skills
  </motion.h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {skills.map((skill, index) => (
      <motion.div
        key={skill.name}
        className="bg-white/70 backdrop-blur-lg rounded-lg shadow-md p-4 flex items-start gap-3 transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        whileHover={{
          scale: 1.05,
          rotateX: 5,
          rotateY: 5,
          boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
          background: 'linear-gradient(to bottom right, #e0e7ff66, #f3e8ff66)',
        }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <skill.icon className="w-6 h-6 text-indigo-600 flex-shrink-0" />
        <div>
          <h3 className="text-sm font-semibold text-gray-800">{skill.name}</h3>
          <p className="text-xs text-gray-600">{skill.description}</p>
        </div>
      </motion.div>
    ))}
  </div>
</motion.div>


     <motion.div
  className="bg-white/70 backdrop-blur-lg rounded-xl shadow-2xl p-6 sm:p-10 mb-12 relative z-10"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 1.2 }}
  onMouseEnter={() => setIsSliderPaused(true)}
  onMouseLeave={() => setIsSliderPaused(false)}
  ref={sliderRef}
>
  <h2 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center gap-2">
    <span className="text-2xl">📚</span> Other Projects
  </h2>

  <div className="overflow-hidden">
    <motion.div
      className="flex gap-6"
      animate={isSliderPaused ? {} : { x: ['0%', '-50%'] }}
      transition={{
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: projects.length * 5,
          ease: 'linear',
        },
      }}
    >
      {[...projects, ...projects].map((project, index) => (
        <div
          key={`${project.title}-${index}`}
          className="min-w-[280px] max-w-[280px] h-[220px] perspective-1000"
        >
          <div className="relative w-full h-full group preserve-3d duration-700 transform-style-3d">
            {/* Flip Container */}
            <div className="relative w-full h-full transition-transform duration-700 transform group-hover:rotate-y-180">
              {/* Front Side */}
              <div className="absolute inset-0 p-4 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg backface-hidden">
                <h3 className="text-sm font-semibold text-gray-800">{project.title}</h3>
                <p className="text-xs text-gray-600 mt-1 line-clamp-3">{project.description}</p>
                <div className="text-xs text-gray-600 mt-2">
                  <strong>Tech:</strong> {project.tech.join(', ')}
                </div>
              </div>

              {/* Back Side */}
              <div className="absolute inset-0 p-4 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-lg backface-hidden transform rotate-y-180 flex items-center justify-center">
                <div className="flex gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-700 hover:underline text-xs"
                  >
                    GitHub
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-700 hover:underline text-xs"
                  >
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  </div>
</motion.div>






              
<FooterNote />
    </motion.main>
  );
}
