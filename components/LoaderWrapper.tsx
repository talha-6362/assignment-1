'use client';

import { useState, useEffect } from 'react';
import FullScreenLoader from './FullScreenLoader';

export default function LoaderWrapper({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 2200); // Same timeout ⏳
    return () => clearTimeout(timer);
  }, []);

  return <>{isReady ? children : <FullScreenLoader />}</>;
}
