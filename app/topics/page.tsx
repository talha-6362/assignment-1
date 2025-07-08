'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Quote } from 'lucide-react';
import quotesData from '@/data/quotes.json' assert { type: "json" }; // ✅ Direct import of local quotes file

export default function TopicsPage() {
  
  
  return (
    <motion.main
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-gray-800 relative overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20"
        animate={{
          scale: [1, 1.03, 1],
          rotate: [0, 0.7, -0.7, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
      />

      {/* Header */}
      <motion.div
        className="text-center mb-12 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.h1
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600"
          animate={{ backgroundPosition: ['0% 50%', '100% 50%'] }}
          transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
          style={{ backgroundSize: '200% 200%' }}
        >
          Explore Quote Topics
        </motion.h1>
        <p className="mt-4 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
          Discover inspiring quotes across various themes to uplift and motivate you.
        </p>
      </motion.div>

      {/* Back Button */}
      <motion.div
        className="mb-8 text-center relative z-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Button asChild>
          <Link
            href="/"
            className="text-sm font-medium bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg"
          >
            ⬅️ Back to Home
          </Link>
        </Button>
      </motion.div>

      {/* Grid of Topics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {Object.entries(quotesData).map(([topic, quotes], index) => (
  <Dialog key={topic}>
           <DialogTrigger asChild>
  <motion.div
    className="bg-white/70 backdrop-blur-lg rounded-xl shadow-md p-6 cursor-pointer hover:shadow-xl hover:bg-gradient-to-br hover:from-indigo-100/50 hover:to-purple-100/50 transition-all duration-300"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
    whileHover={{
      scale: 1.05,
      rotateX: 5,
      rotateY: 5,
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.25)',
    }}
    role="button"
    tabIndex={0}
    aria-label={`Open quotes for topic ${topic}`}
  >
    <div className="flex items-center gap-3 mb-2">
      <Quote className="w-6 h-6 text-indigo-600" />
      <h2 className="text-lg font-semibold text-gray-800 capitalize">{topic}</h2>
    </div>
    <p className="text-sm text-gray-600 line-clamp-2">
      {quotes?.[0] || 'No quotes available for this topic.'}
    </p>
  </motion.div>
</DialogTrigger>


            <DialogContent className="bg-white/70 backdrop-blur-lg border-2 border-transparent bg-clip-padding bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-xl max-w-lg">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-gray-800 capitalize flex items-center gap-2">
                  <Quote className="w-6 h-6 text-indigo-600" /> {topic} Quotes
                </DialogTitle>
              </DialogHeader>

              <div className="mt-4 max-h-[400px] overflow-y-auto pr-2">
                <AnimatePresence>
                  {quotes.map((quote, idx) => (
                    <motion.blockquote
                      key={idx}
                      className="text-sm text-gray-700 border-l-4 border-indigo-600 pl-4 mb-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3, delay: idx * 0.08 }}
                    >
                      “{quote}”
                    </motion.blockquote>
                  ))}
                </AnimatePresence>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
      
    </motion.main>
    
  );
}
