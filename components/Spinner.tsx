'use client';

import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Spinner() {
  return (
    <motion.div
      className="flex justify-center items-center py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      aria-label="Loading spinner"
    >
      <Loader2 className="w-8 h-8 text-primary animate-spin" />
    </motion.div>
  );
}
