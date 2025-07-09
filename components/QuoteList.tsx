'use client';

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Heart, Share2, ThumbsUp, ThumbsDown } from 'lucide-react';

export default function QuoteList({
  quotes,
  favorites,
  quoteStats,
  onToggleFavorite,
  onLikeDislike,
  onShare,
}: {
  quotes: string[] | null;
  favorites: string[];
  quoteStats: Record<string, { likes: number; dislikes: number }>;
  onToggleFavorite: (quote: string) => void;
  onLikeDislike: (quote: string, type: 'like' | 'dislike') => void;
  onShare: (quote: string) => void;
}) {
  if (!quotes || quotes.length === 0) {
    return (
      <motion.p
        className="text-center text-destructive font-medium mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        ❌ No quotes found for this topic.
      </motion.p>
    );
  }

  return (
    <div className="mt-6 space-y-4 w-full max-w-3xl mx-auto px-2">
      {quotes.map((quote, index) => {
        const stats = quoteStats[quote] || { likes: 0, dislikes: 0 };
        const isFavorite = favorites.includes(quote);

        return (
          <motion.div
            key={`${quote}-${index}`}
            className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
          >
            <p className="text-gray-800 leading-relaxed text-base sm:text-lg font-medium mb-4">
              ❝ {quote} ❞
            </p>

            <div className="flex flex-wrap items-center gap-3 text-sm">
              {/* Favorite Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onToggleFavorite(quote)}
                aria-label="Toggle favorite"
              >
                <Heart
                  className={`h-5 w-5 transition ${
                    isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400'
                  }`}
                />
              </Button>

              {/* Share Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onShare(quote)}
                aria-label="Share quote"
              >
                <Share2 className="h-5 w-5 text-gray-500" />
              </Button>

              {/* Like Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onLikeDislike(quote, 'like')}
                aria-label="Like quote"
              >
                <ThumbsUp className="h-5 w-5 text-green-500" />
                <span className="ml-1 text-xs font-semibold text-gray-600">{stats.likes}</span>
              </Button>

              {/* Dislike Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onLikeDislike(quote, 'dislike')}
                aria-label="Dislike quote"
              >
                <ThumbsDown className="h-5 w-5 text-red-500" />
                <span className="ml-1 text-xs font-semibold text-gray-600">{stats.dislikes}</span>
              </Button>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
