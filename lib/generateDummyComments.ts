// lib/generateDummyComments.ts

export function generateDummyComments(topic: string) {
  const names = ['Ayesha', 'Ali', 'Zara', 'Hassan', 'Fatima', 'Talha', 'Sara', 'Usman'];
  const messages = [
    `This ${topic} quote really inspired me!`,
    `I've always believed in ${topic}.`,
    `${topic} changed my life!`,
    `So true! ${topic} is underrated.`,
    `Need more quotes like this about ${topic}.`,
  ];

  const dummy = Array.from({ length: 5 }).map((_, i) => ({
    id: `dummy-${i}`,
    user: names[i % names.length],
    text: messages[i % messages.length],
    timestamp: new Date().toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' }),
  }));

  return dummy;
}
