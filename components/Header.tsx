'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Topics', href: '/topics' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <motion.header
      className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white sticky top-0 z-50 shadow-lg"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-1 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/favicon.jpeg"
            alt="Logo"
            width={28}
            height={28}
            className="rounded-full"
          />
          <span className="text-xl font-bold tracking-tight">Quote Generator</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6">
          {navItems.map((item, i) => {
            const isActive = pathname === item.href;
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <Link
                  href={item.href}
                  className={`relative transition duration-200 font-medium ${
                    isActive
                      ? 'text-yellow-300'
                      : 'text-white/90 hover:text-white'
                  } group`}
                >
                  {item.name}
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] w-0 bg-white group-hover:w-full transition-all duration-300 ease-in-out ${
                      isActive ? 'w-full bg-yellow-300' : ''
                    }`}
                  ></span>
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className="md:hidden bg-indigo-700 px-6 pb-4"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {navItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Link
                    href={item.href}
                    className={`block py-2 text-lg transition duration-200 ${
                      isActive
                        ? 'text-yellow-300 font-semibold'
                        : 'text-white hover:text-white/80'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              );
            })}
          </motion.nav>
        )}
      </AnimatePresence>

      <motion.p
        className="text-center text-white/90 text-sm mt-2 pb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Find quotes based on any topic you love
      </motion.p>
    </motion.header>
  );
}
