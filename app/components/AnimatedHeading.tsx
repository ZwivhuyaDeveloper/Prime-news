'use client';

import { useEffect, useState } from 'react';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  as?: HeadingLevel;
}

export function AnimatedText({ 
  text, 
  className = '', 
  delay = 0, 
  as: Tag = 'span' 
}: AnimatedTextProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const animationClasses = `transition-all duration-700 ease-out transform ${
    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
  } ${className}`;

  switch (Tag) {
    case 'h1':
      return <h1 className={animationClasses}>{text}</h1>;
    case 'h2':
      return <h2 className={animationClasses}>{text}</h2>;
    case 'h3':
      return <h3 className={animationClasses}>{text}</h3>;
    case 'h4':
      return <h4 className={animationClasses}>{text}</h4>;
    case 'h5':
      return <h5 className={animationClasses}>{text}</h5>;
    case 'h6':
      return <h6 className={animationClasses}>{text}</h6>;
    case 'p':
      return <p className={animationClasses}>{text}</p>;
    case 'div':
      return <div className={animationClasses}>{text}</div>;
    default:
      return <span className={animationClasses}>{text}</span>;
  }
}
