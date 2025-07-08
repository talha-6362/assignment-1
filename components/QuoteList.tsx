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
  if (quotes === null) {
    return (
      <motion.p
        className="text-center text-destructive font-medium mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        No quotes found for that topic.
      </motion.p>
    );
  }

  return (
    <div className="mt-6 space-y-4">
      {quotes.map((quote, index) => {
        const stats = quoteStats[quote] || { likes: 0, dislikes: 0 };
        const isFavorite = favorites.includes(quote);

        return (
          <motion.div
            key={index}
            className="bg-white p-4 rounded-xl shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <p className="text-foreground leading-relaxed text-sm sm:text-base mb-3">
              ❝ {quote} ❞
            </p>

            <div className="flex gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onToggleFavorite(quote)}
              >
                <Heart
                  className={`h-5 w-5 ${
                    isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400'
                  }`}
                />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => onShare(quote)}
              >
                <Share2 className="h-5 w-5 text-gray-500" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => onLikeDislike(quote, 'like')}
              >
                <ThumbsUp className="h-5 w-5 text-green-500" />
                <span className="ml-1 text-xs">{stats.likes}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => onLikeDislike(quote, 'dislike')}
              >
                <ThumbsDown className="h-5 w-5 text-red-500" />
                <span className="ml-1 text-xs">{stats.dislikes}</span>
              </Button>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
