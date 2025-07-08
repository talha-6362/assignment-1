'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function FooterNote() {
  const [visible, setVisible] = useState(true);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50 bg-white shadow-xl rounded-lg px-4 py-3 border border-indigo-200 w-[320px] sm:w-[360px] md:w-[400px] text-gray-700"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="text-sm leading-relaxed">
              Made with 💙 by <span className="font-medium text-indigo-600">Talha Mushtaq</span><br />
              <a
                href="mailto:talhamushtaq1064@gmail.com"
                className="text-indigo-500 hover:underline break-all"
              >
                talhamushtaq1064@gmail.com
              </a>
            </div>
            <button
              onClick={() => setVisible(false)}
              className="text-gray-400 hover:text-red-500 transition cursor-pointer p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500  focus:ring-offset-2"
              aria-label="Dismiss"
            >
              <X size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
