'use client';

import { useState, useEffect, useMemo, useCallback,useRef } from 'react';

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
import { useRouter } from 'next/navigation';
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
const router = useRouter();

const handleRecentClick = (topic: string) => {
  handleSearch(topic);
  router.push(`/?topic=${topic}`);
};
  // ✅ SAFELY memoized search handler
  const isFetchingRef = useRef(false);

const handleSearch = useCallback((topic: string) => {
  if (isFetchingRef.current) return;
  isFetchingRef.current = true;
  setFetching(true);
  setSelectedTopic(topic);

  setTimeout(() => {
    const results = getQuotesByTopic(topic);
    setQuotes(results ? results.slice(0, 3) : null);
    setFetching(false);
    isFetchingRef.current = false;

    const storedComments = localStorage.getItem(`comments_${topic}`);
    setComments(storedComments ? JSON.parse(storedComments) : []);

    setRecentTopics((prevTopics) => {
      const updated = [topic, ...prevTopics.filter(t => t !== topic)].slice(0, 6);
      localStorage.setItem('recentTopics', JSON.stringify(updated));
      return updated;
    });
  }, 1000);
}, []);

  // ✅ EFFECT 1: Load localStorage only once
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) setFavorites(JSON.parse(storedFavorites));

    const storedStats = localStorage.getItem('quoteStats');
    if (storedStats) setQuoteStats(JSON.parse(storedStats));

    const storedRecent = localStorage.getItem('recentTopics');
    if (storedRecent) setRecentTopics(JSON.parse(storedRecent));
  }, []);

  // ✅ EFFECT 2: Listen for query param changes
  useEffect(() => {
  const topic = searchParams.get('topic');
  if (topic) {
    handleSearch(topic);
  }
}, [searchParams, handleSearch]);

  // ✅ Dummy comments safely memoized
  const dummyComments = useMemo(
    () => generateDummyComments(selectedTopic || 'life'),
    [selectedTopic]
  );


  


  // Toggle favorite quote
const toggleFavorite = (quote: string) => {
  const updated = favorites.includes(quote)
    ? favorites.filter((q) => q !== quote)
    : [...favorites, quote];
  setFavorites(updated);
  localStorage.setItem('favorites', JSON.stringify(updated));
};

// Like or dislike a quote
const handleLikeDislike = (quote: string, type: 'like' | 'dislike') => {
  const updatedStats = { ...quoteStats };
  if (!updatedStats[quote]) {
    updatedStats[quote] = { likes: 0, dislikes: 0 };
  }
  updatedStats[quote][type === 'like' ? 'likes' : 'dislikes'] += 1;
  setQuoteStats(updatedStats);
  localStorage.setItem('quoteStats', JSON.stringify(updatedStats));
};

// Submit a new comment
const handleCommentSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (!comment.trim()) return;

  const newComment: Comment = {
    id: Date.now().toString(),
    text: comment,
    timestamp: new Date().toLocaleString(),
    user: `User_${Math.random().toString(36).substring(2, 8)}`,
  };

  const updated = [...comments, newComment];
  setComments(updated);
  localStorage.setItem(`comments_${selectedTopic}`, JSON.stringify(updated));
  setComment('');
};

// Share quote (copy to clipboard + toast)
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

// Random trending topics
const getTrendingTopics = () => {
  const allTopics = Object.keys(quotesData);
  return allTopics.sort(() => 0.5 - Math.random()).slice(0, 6);
};

// Inspirational thoughts based on topic
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

     <motion.div
  className="mt-10 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-lg p-6"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">
    🔥 Trending Topics
  </h3>

  <div className="flex flex-wrap gap-3 justify-center sm:justify-evenly px-2 sm:px-4">
    {getTrendingTopics().map((topic) => (
      <motion.div
        key={`trending-${topic}`}
        className="flex-shrink-0 mb-2 sm:mb-0 w-full sm:w-auto"
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
        transition={{ duration: 0.2 }}
      >
        <Button
          variant="outline"
          onClick={() => handleRecentClick(topic)}
          className="cursor-pointer w-full sm:w-auto capitalize text-sm px-4 py-2 sm:px-6 bg-white hover:bg-indigo-100 hover:text-indigo-700 transition-colors"
          aria-label={`Search quotes for ${topic}`}
        >
          {topic}
        </Button>
      </motion.div>
    ))}
  </div>
</motion.div>



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
      className="flex flex-col items-center justify-center text-center px-4"
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
      className="mt-8 text-center flex flex-col items-center justify-center space-y-4 px-4"
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
    className="mt-10 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-lg p-6 px-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 text-center">
      🕒 Recent Topics
    </h3>
    <div className="flex flex-wrap gap-3 justify-center">
      {recentTopics.map((topic) => (
        <motion.div
          key={topic}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <button
            onClick={() => handleSearch(topic)}
            className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm capitalize hover:bg-indigo-200 transition-colors cursor-pointer"
          >
            {topic}
          </button>
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
  {/* Header with Responsive Layout */}
  <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-3">
    <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
      ❤️ Favorite Quotes
    </h3>
    <Button
      variant="outline"
      onClick={() => setShowFavorites(!showFavorites)}
      className="sm:w-auto w-full cursor-pointer text-sm px-4 py-2 bg-white hover:bg-indigo-100 hover:text-indigo-700 transition-colors"
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
            className="p-4 bg-white rounded-md shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <p className="text-gray-700 text-sm sm:text-base break-words flex-1">
              {quote}
            </p>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleFavorite(quote)}
                className="cursor-pointer"
              >
                <Heart className="h-5 w-5 text-red-500 fill-red-500" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(quote)}
                className="cursor-pointer"
              >
                <Share2 className="h-5 w-5 text-gray-500" />
              </Button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    )}
  </AnimatePresence>

  {/* Empty State Message */}
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
  {/* Input Section */}
  <div className="flex-1 flex flex-col">
    <Label
      htmlFor="comment"
      className="text-sm font-semibold text-gray-800 mb-1 sm:mb-2"
    >
      Your Comment:
    </Label>
    <Input
      id="comment"
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      placeholder="Write your thoughts..."
      className="w-full h-[44px] rounded-md border border-indigo-300 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300"
    />
  </div>

  {/* Button Section */}
  <div className="flex items-end sm:items-end w-full sm:w-auto">
    <Button
      type="submit"
      className="w-full sm:w-auto h-[44px] flex items-center gap-2 px-5 rounded-md bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium shadow-md transition-colors duration-300"
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
        animate={
          isCarouselPaused
            ? { x: 0 }
            : { x: ['0%', '-100%'] }
        }
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: (dummyComments.length + comments.length) * 8,
            ease: 'linear',
          },
        }}
      >
        {[...Array(2)].map((_, i) => (
          <div className="flex gap-6" key={`carousel-${i}`}>
            {[...dummyComments, ...comments].map((comment, index) => (
              <motion.div
                key={`${comment.id}-${i}-${index}`}
                className="min-w-[280px] max-w-[280px] bg-white rounded-md shadow-md p-4 flex items-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Image
                  src={`https://ui-avatars.com/api/?name=${comment.user}&size=48&background=6366f1&color=fff`}
                  alt={`Avatar of ${comment.user}`} // ✅ Fix warning
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
          </div>
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