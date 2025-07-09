'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function QuoteForm({ onSearch }: { onSearch: (topic: string) => void }) {
  const [topic, setTopic] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = topic.trim().toLowerCase();
    if (!trimmed) return;
    onSearch(trimmed);
    setTopic('');
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-center justify-center gap-3 my-8 w-full max-w-2xl mx-auto px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Input
        id="quote-topic"
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="🔍 Enter a topic like 'life', 'success', or 'hope'..."
        className="w-full sm:flex-1"
        aria-label="Enter quote topic"
      />
      <Button
        type="submit"
        className="w-full sm:w-auto px-6"
        aria-label="Search quotes by topic"
      >
        Search
      </Button>
    </motion.form>
  );
}
