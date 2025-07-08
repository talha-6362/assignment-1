'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function QuoteForm({ onSearch }: { onSearch: (topic: string) => void }) {
  const [topic, setTopic] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    onSearch(topic.trim().toLowerCase());
    setTopic('');
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 items-center justify-center my-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter a topic like 'life' or 'motivation'..."
        className="w-full sm:w-2/3"
      />
      <Button type="submit" className="w-full sm:w-auto">
        Search
      </Button>
    </motion.form>
  );
}
