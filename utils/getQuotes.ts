import quotesData from '@/data/quotes.json';

const quotes = quotesData as { [key: string]: string[] };

export function getQuotesByTopic(topic: string): string[] | null {
  const lower = topic.toLowerCase();
  if (quotes[lower]) {
    return quotes[lower];
  }

  const match = Object.keys(quotes).find((key) =>
    key.toLowerCase().includes(lower)
  );

  return match ? quotes[match] : null;
}
