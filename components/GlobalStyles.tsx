'use client';

import { useEffect } from 'react';

const GlobalStyles = () => {
  useEffect(() => {
    // Add smooth scroll behavior to the html element
    const html = document.documentElement;
    
    // Only apply smooth scrolling if reduced motion is not preferred
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      html.style.scrollBehavior = 'smooth';
      html.style.scrollPaddingTop = '5rem'; // Adjust based on your navbar height
    }

    // Clean up
    return () => {
      html.style.scrollBehavior = '';
      html.style.scrollPaddingTop = '';
    };
  }, []);

  return null;
};

export default GlobalStyles;
