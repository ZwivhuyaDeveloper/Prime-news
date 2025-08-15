'use client';

import { useEffect, useState } from 'react';

const AnimatedText = ({
  text,
  className = '',
  delay = 0,
  as: Tag = 'span',
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: keyof JSX.IntrinsicElements;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const TagComponent = Tag;

  return (
    <TagComponent
      className={`transition-all duration-700 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } ${className}`}
    >
      {text}
    </TagComponent>
  );
};

export { AnimatedText };
