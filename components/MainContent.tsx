'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';

import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Heart, Share2, Send, Frown } from 'lucide-react';
import { toast } from 'sonner';
import QuoteForm from './QuoteForm';
import QuoteList from './QuoteList';
import Loader from './Spinner';
import { getQuotesByTopic } from '@/utils/getQuotes';
import Link from 'next/link';
import quotesData from '@/data/quotes.json';
import { inspirationalThoughts } from '@/data/inspirationalThoughts';
import Image from 'next/image';

import { generateDummyComments } from '@/lib/generateDummyComments';


interface Comment {
  id: string;
  text: string;
  timestamp: string;
  user: string;
}

interface QuoteStats {
  likes: number;
  dislikes: number;
}

export default function MainContent() {
  const [quotes, setQuotes] = useState<string[] | null>(null);
  const [fetching, setFetching] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [comment, setComment] = useState<string>('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [quoteStats, setQuoteStats] = useState<Record<string, QuoteStats>>({});
  const [recentTopics, setRecentTopics] = useState<string[]>([]);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const searchParams = useSearchParams();
  const handleSearch = useCallback((topic: string) => {
  if (fetching) return;
  setFetching(true);
  setSelectedTopic(topic);

  setTimeout(() => {
    const results = getQuotesByTopic(topic);
    setQuotes(results ? results.slice(0, 3) : null);
    setFetching(false);

    // Load comments for the topic
    const storedComments = localStorage.getItem(`comments_${topic}`);
    setComments(storedComments ? JSON.parse(storedComments) : []);

    // Update recent topics (limit to 6)
    const updatedRecent = [topic, ...recentTopics.filter((t) => t !== topic)].slice(0, 6);
    setRecentTopics(updatedRecent);
    localStorage.setItem('recentTopics', JSON.stringify(updatedRecent));
  }, 1000);
}, [fetching, recentTopics]);

  useEffect(() => {
  // Load data from local storage
  const storedFavorites = localStorage.getItem('favorites');
  if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
  const storedStats = localStorage.getItem('quoteStats');
  if (storedStats) setQuoteStats(JSON.parse(storedStats));
  const storedRecent = localStorage.getItem('recentTopics');
  if (storedRecent) setRecentTopics(JSON.parse(storedRecent));

  // Handle topic from query params
  const topic = searchParams.get('topic');
  if (topic) {
    setSelectedTopic(topic);
    handleSearch(topic);
  }
}, [searchParams, handleSearch]);

  const dummyComments = useMemo(() => generateDummyComments(selectedTopic || 'life'), [selectedTopic]);


  


  const toggleFavorite = (quote: string) => {
    const updated = favorites.includes(quote)
      ? favorites.filter((q) => q !== quote)
      : [...favorites, quote];
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  const handleLikeDislike = (quote: string, type: 'like' | 'dislike') => {
    const updatedStats = { ...quoteStats };
    if (!updatedStats[quote]) {
      updatedStats[quote] = { likes: 0, dislikes: 0 };
    }
    updatedStats[quote][type === 'like' ? 'likes' : 'dislikes'] += 1;
    setQuoteStats(updatedStats);
    localStorage.setItem('quoteStats', JSON.stringify(updatedStats));
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      text: comment,
      timestamp: new Date().toLocaleString(),
      user: 'User_' + Math.random().toString(36).substring(2, 8),
    };
    const updated = [...comments, newComment];
    setComments(updated);
    localStorage.setItem(`comments_${selectedTopic}`, JSON.stringify(updated));
    setComment('');
  };

  const copyToClipboard = (quote: string) => {
  navigator.clipboard.writeText(quote);
  toast('📤 Quote shared successfully!', {
    description: 'It’s copied to your clipboard. You can now paste & share it anywhere.',
    icon: '📤',
    duration: 4000,
    action: {
      label: 'Got it!',
      onClick: () => {},
    },
  });
};


  const getTrendingTopics = () => {
    const allTopics = Object.keys(quotesData);
    return allTopics.sort(() => 0.5 - Math.random()).slice(0, 6);
  };

  const getInspirationalThoughts = (topic: string) => {
    return inspirationalThoughts[topic.toLowerCase()] || inspirationalThoughts.default;
  };

  return (
    <motion.section
      className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Search Form */}
      <QuoteForm onSearch={handleSearch} />

      {/* Trending Topics */}
      <motion.div
        className="mt-10 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-lg p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">🔥 Trending Topics</h3>
        <div className="flex flex-wrap gap-3 justify-evenly">
          {getTrendingTopics().map((topic) => (
            <motion.div
              key={topic}
              className="flex-shrink-0 mb-2"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
              transition={{ duration: 0.2 }}
            >
              <Button
                variant="outline"
                onClick={() => handleSearch(topic)}
                className="cursor-pointer capitalize text-sm px-4 py-2  bg-white hover:bg-indigo-100 hover:text-indigo-700 transition-colors"
              >
                {topic}
              </Button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quote Section */}
      <AnimatePresence mode="wait">
        {fetching ? (
          <Loader key="loader" />
        ) : quotes ? (
          <motion.div
            key="quotes"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center text-center"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 mt-3 capitalize text-gray-800">
              {selectedTopic} Quotes
            </h2>
            <QuoteList
            
              quotes={quotes}
              favorites={favorites}
              quoteStats={quoteStats}
              onToggleFavorite={toggleFavorite}
              onLikeDislike={handleLikeDislike}
              onShare={copyToClipboard}
            />
          </motion.div>
        ) : (
          <motion.div
            key="no-quotes"
            className="mt-8 text-center flex flex-col items-center justify-center space-y-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, rotate: [0, 5, -5, 0] }}
            transition={{ duration: 0.8, rotate: { duration: 0.5, repeat: 2 } }}
          >
            <Frown className="mx-auto h-12 w-12 text-gray-400 " />
            <p className="mt-4 text-lg sm:text-xl text-gray-600">
              Oops! No quotes found for this topic.
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Try selecting a different topic from the dropdown above.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recent Topics */}
      {recentTopics.length > 0 && (
        <motion.div
          className="mt-10 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 text-center">🕒 Recent Topics</h3>
          <div className="flex flex-wrap gap-3 justify-between">
            {recentTopics.map((topic) => (
              <motion.div
                key={topic}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={`/?topic=${topic}`}
                  className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm capitalize hover:bg-indigo-200 transition-colors">
                  {topic}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Favorite Quotes */}
<motion.div
  className="mt-10 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-lg p-6"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  <div className="flex justify-between items-center mb-4">
    <h3 className="text-xl sm:text-2xl font-bold text-gray-800">❤️ Favorite Quotes</h3>
    <Button
      variant="outline"
      onClick={() => setShowFavorites(!showFavorites)}
      className="w-full sm:w-auto cursor-pointer text-sm px-4 py-2 bg-white hover:bg-indigo-100 hover:text-indigo-700 transition-colors"
    >
      {showFavorites ? 'Hide Favorites' : `Show Favorites (${favorites.length})`}
    </Button>
  </div>

  <AnimatePresence>
    {showFavorites && favorites.length > 0 && (
      <motion.div
        key="favorites-list"
        className="space-y-4"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        {favorites.map((quote, index) => (
          <motion.div
            key={quote + index}
            className="p-4 bg-white rounded-md shadow-sm flex justify-between items-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <p className="text-gray-700 text-sm sm:text-base">{quote}</p>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => toggleFavorite(quote)} className="cursor-pointer">
                <Heart className="h-5 w-5 text-red-500 fill-red-500" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => copyToClipboard(quote)} className="cursor-pointer">
                <Share2 className="h-5 w-5 text-gray-500" />
              </Button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    )}
  </AnimatePresence>
  {showFavorites && favorites.length === 0 && (
  <motion.p
    className="text-gray-500 text-sm text-center mt-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    No favorites yet. Try adding some by clicking ❤️ on a quote!
  </motion.p>
)}
</motion.div>


      {/* Comment Section with User Comments Carousel */}
      {selectedTopic && (
        <motion.div
          className="mt-10 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-center text-xl sm:text-2xl font-bold text-gray-800 mb-4">
            💬 Share your thoughts on <span className="capitalize">{selectedTopic}</span>
          </h3>
          <form
  onSubmit={handleCommentSubmit}
  className="flex flex-col sm:flex-row items-stretch gap-4 mb-6 w-full max-w-3xl mx-auto"
>
  {/* Input */}
  <div className="flex-1">
    <Label htmlFor="comment" className="text-sm font-semibold text-gray-800 mb-2">
      Your Comment:
    </Label>
    <Input
      id="comment"
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      placeholder="Write your thoughts..."
      className="mt-1 w-full h-[44px] rounded-md border border-indigo-300 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300"
    />
  </div>

  {/* Button */}
  <div className="flex items-end sm:items-end">
    <Button
      type="submit"
      className=" cursor-pointer h-[44px] flex items-center gap-2 px-5 rounded-md bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium shadow-md transition-colors duration-300"
    >
      <Send className="h-5 w-5" />
      Post
    </Button>
  </div>
</form>


          {/* Comment Section with Carousel Animation */}
<AnimatePresence>
  <motion.div
    className="mt-10 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-lg p-6"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    {/* Carousel Animation */}
    <motion.div
      className="overflow-hidden relative cursor-pointer"
      onMouseEnter={() => setIsCarouselPaused(true)}
      onMouseLeave={() => setIsCarouselPaused(false)}
    >
      <motion.div
        className="flex gap-6 w-max"
        animate={{
          x: isCarouselPaused ? 0 : ['0%', '-100%'],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: (dummyComments.length + comments.length) * 8,
            ease: 'linear',
          },
        }}
      >
        {[...dummyComments, ...comments, ...dummyComments, ...comments].map((comment, index) => (
          <motion.div
            key={`${comment.id}-${index}`}
            className="min-w-[280px] max-w-[280px] bg-white rounded-md shadow-md p-4 flex items-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Image
              src={`https://ui-avatars.com/api/?name=${comment.user}&size=48&background=6366f1&color=fff`}
              alt={comment.user}
              width={48}
              height={48}
              className="w-12 h-12 rounded-full mr-3 border-2 border-indigo-200"
              unoptimized
            />
            <div>
              <p className="text-gray-800 text-sm font-semibold">{comment.user}</p>
              <p className="text-gray-600 text-sm">{comment.text}</p>
              <p className="text-xs text-gray-400 mt-1">{comment.timestamp}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  </motion.div>
</AnimatePresence>

        </motion.div>
      )}

      

      {/* Inspirational Thoughts Section */}
      {selectedTopic && (
        <motion.div
          className="mt-10 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-center text-xl sm:text-2xl font-bold text-gray-800 mb-4">
            🌟 Inspirational Thoughts on <span className="capitalize">{selectedTopic}</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {getInspirationalThoughts(selectedTopic).map((thought, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-md shadow-md p-4 flex items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                  <span className="text-indigo-600 font-semibold">{index + 1}</span>
                </div>
                <p className="text-gray-600 text-sm">{thought}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.section>
  );
}