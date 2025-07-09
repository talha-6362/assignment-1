'use client';

import { motion } from 'framer-motion';
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  ArrowUpCircle,
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { href: 'https://github.com/talha-6362', icon: Github, label: 'GitHub' },
    { href: 'https://linkedin.com', icon: Linkedin, label: 'LinkedIn' },
    { href: 'https://twitter.com', icon: Twitter, label: 'Twitter' },
  ];

  return (
    <motion.footer
      className="relative bg-gradient-to-br from-indigo-800 via-purple-700 to-pink-600 text-white pt-12 pb-8 mt-20"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Decorative Wave Top */}
      <svg
        className="absolute top-0 left-0 w-full h-12 text-white fill-current"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
      >
        <path d="M0,80 C480,10 960,150 1440,30 L1440,0 L0,0 Z" />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Branding */}
          <motion.div
            className="bg-white/10 rounded-xl p-5 shadow-md backdrop-blur-md transition duration-300 hover:shadow-2xl"
            whileHover={{ scale: 1.03 }}
          >
            <h3 className="text-lg font-bold flex items-center gap-2">
              <span className="text-2xl">🚀</span> Nexium Intern
            </h3>
            <p className="text-xs mt-2 leading-relaxed">
              Built with <strong>Next.js</strong>, <strong>Tailwind</strong>, and <strong>Framer Motion</strong> 💻
            </p>
          </motion.div>

          {/* Contact */}
          <motion.div
            className="bg-white/10 rounded-xl p-5 shadow-md backdrop-blur-md transition duration-300 hover:shadow-2xl"
            whileHover={{ scale: 1.03 }}
          >
            <h4 className="text-md font-semibold mb-3">📬 Contact</h4>
            <ul className="text-xs space-y-2">
              <li className="flex items-center gap-2 break-all">
                <Mail className="w-4 h-4" />
                <a
                  href="mailto:talhamushtaq1064@gmail.com"
                  className="hover:text-indigo-200 transition-colors"
                >
                  talhamushtaq1064@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a
                  href="tel:+923405582857"
                  className="hover:text-indigo-200 transition-colors"
                >
                  +92 340 5582857
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Socials */}
          <motion.div
            className="bg-white/10 rounded-xl p-5 shadow-md backdrop-blur-md transition duration-300 hover:shadow-2xl"
            whileHover={{ scale: 1.03 }}
          >
            <h4 className="text-md font-semibold mb-3">🌐 Connect</h4>
            <div className="flex gap-5">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="hover:text-indigo-200 transition-colors"
                  whileHover={{ scale: 1.3, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <link.icon className="w-5 h-5 cursor-pointer" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 flex flex-col items-center gap-4 text-xs opacity-80">
          <p className="text-center text-white/90">
            © {currentYear} Nexium Intern. All rights reserved.
          </p>
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-1 text-indigo-200 hover:text-white transition-colors"
            whileHover={{ scale: 1.1 }}
          >
            <ArrowUpCircle className="w-4 h-4 cursor-pointer" />
            Back to top
          </motion.button>
        </div>
      </div>
    </motion.footer>
  );
}
