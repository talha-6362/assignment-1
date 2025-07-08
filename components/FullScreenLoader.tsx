'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function FullScreenLoader() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 2200); // ⏳ Same as layout.tsx timer

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-blue-300 dark:bg-gray-900 transition-opacity duration-500"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95, filter: 'blur(2px)' }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src="/favicon.jpeg"
            alt="App Loading Icon"
            width={80}
            height={80}
            className="rounded-full mb-4"
            priority
          />
          <motion.h1
            className="text-2xl font-bold text-primary"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            aria-label="Quote Generator"
          >
            Quote Generator
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
