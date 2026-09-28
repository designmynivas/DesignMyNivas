"use client";

import * as React from "react";

export interface UseWordCarouselOptions {
  words: string[];
  interval?: number; // interval in seconds
}

export function useWordCarousel({ words, interval = 2 }: UseWordCarouselOptions) {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    if (!words || words.length <= 1) return;

    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, (interval || 2) * 1000);

    return () => clearInterval(timer);
  }, [words, interval]);

  return {
    currentIndex: index,
    currentWord: words[index] ?? "",
    key: `${index}-${words[index]}`,
  };
}
