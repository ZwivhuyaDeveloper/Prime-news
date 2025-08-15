"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Newspaper, Menu, X } from "lucide-react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const SECTIONS = [
  { id: "hero", label: "Featured" },
  { id: "breaking", label: "Breaking" },
  { id: "politics", label: "Politics" },
  { id: "technology", label: "Technology" },
  { id: "business", label: "Business" },
  { id: "contact", label: "Contact" },
];

export default function StickyNavbar() {
  const [active, setActive] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close mobile menu when navigating
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const observer = useMemo(() => {
    if (typeof window === "undefined") return null;
    const offset = 80; // approximate navbar height
    return new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            if (id) setActive(id);
          }
        });
      },
      {
        rootMargin: `-${offset}px 0px -60% 0px`,
        threshold: [0, 0.25, 0.5, 1],
      }
    );
  }, []);

  useEffect(() => {
    if (!observer) return;
    const elements = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      Boolean
    ) as Element[];
    elements.forEach((el) => observer.observe(el));
    return () => elements.forEach((el) => observer.unobserve(el));
  }, [observer]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      setActive(id);
      const offset = 80; // Adjust this value based on your navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      
      // Update URL without page reload
      window.history.pushState({}, '', `#${id}`);
    }
  };

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    scrollToSection(id);
  };

  // Set active section on initial load and scroll
  useEffect(() => {
    // Set active section from URL hash on initial load
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      setActive(id);
    }

    // Handle browser back/forward navigation
    const handleHashChange = () => {
      const id = window.location.hash.substring(1);
      if (id) {
        setActive(id);
        // Small delay to ensure the DOM is ready
        setTimeout(() => scrollToSection(id), 50);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav ref={navRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 items-center w-full">
        <div className="mt-4 rounded-full border border-zinc-200 dark:border-zinc-800 bg-card/80 backdrop-blur items-center px-3 w-full flex flex-row justify-between supports-[backdrop-filter]:bg-card/60 shadow-md">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center w-fit justify-between p-3"
          >
            <Link href="/" className="flex items-center gap-2">
              <motion.div
                initial={{ scale: 0.8, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.3 }}
              >
                <Newspaper 
                  width={28} 
                  height={28} 
                  strokeWidth={2}
                  className="bg-gradient-to-l w-fit h-fit from-orange-500 to-orange-200 rounded-full overflow-hidden text-white p-1"
                />
              </motion.div>
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="font-bold text-xs sm:text-lg w-full gap-1 flex flex-row"
              >
                <motion.h1 
                  className="text-orange-500"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Prime
                </motion.h1>
                <motion.h2 
                  className="dark:text-white text-black"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  News
                </motion.h2>
              </motion.span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <motion.ul 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center justify-between p-2"
            >
              {SECTIONS.map((s, index) => (
                <motion.li 
                  key={s.id} 
                  className="relative px-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + (index * 0.05) }}
                >
                  <motion.a
                    href={`#${s.id}`}
                    onClick={(e) => onClick(e, s.id)}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "sm" }),
                      "rounded-full px-3 text-sm font-medium transition-colors duration-300 ease-in-out relative overflow-hidden group"
                    )}
                    whileHover={{ 
                      scale: 1.05, 
                      backgroundColor: 'rgba(249, 115, 22, 0.1)',
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ 
                      scale: 0.98,
                      transition: { duration: 0.1 }
                    }}
                    animate={{
                      color: active === s.id ? 'hsl(240, 10%, 3.9%)' : 'hsl(240, 3.8%, 46.1%)',
                      backgroundColor: active === s.id ? 'rgba(249, 115, 22, 0.2)' : 'transparent'
                    }}
                    aria-current={active === s.id ? "page" : undefined}
                  >
                    {s.label}
                  </motion.a>
                  <motion.span 
                    className="pointer-events-none absolute -bottom-1 left-1/2 h-1 w-6 -translate-x-1/2 rounded-full bg-gradient-to-r from-orange-500 to-pink-500"
                    initial={false}
                    animate={{
                      opacity: active === s.id ? 1 : 0,
                      scale: active === s.id ? 1 : 0.5,
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  />
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden absolute top-full left-0 right-0 bg-card border-b border-zinc-200 dark:border-zinc-800 overflow-hidden"
              >
                <motion.ul className="px-4 py-2 space-y-2">
                  {SECTIONS.map((s) => (
                    <motion.li key={s.id} className="w-full">
                      <motion.a
                        href={`#${s.id}`}
                        onClick={(e) => {
                          onClick(e, s.id);
                          setIsOpen(false);
                        }}
                        className={cn(
                          buttonVariants({ variant: "ghost", size: "sm" }),
                          "w-full text-left px-4 py-2 text-base font-medium rounded-md transition-colors duration-300",
                          active === s.id 
                            ? "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400"
                            : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                        )}
                      >
                        {s.label}
                      </motion.a>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Auth Buttons */}
          <motion.div 
            className="flex items-center w-fit justify-end gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <SignedOut>
              <SignInButton>
                <motion.button 
                  className="bg-orange-500 text-white rounded-full font-medium w-20 flex items-center justify-center text-xs h-8 cursor-pointer"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(249, 115, 22, 0.4)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign In
                </motion.button>
              </SignInButton>
              <SignUpButton>
                <motion.button 
                  className="bg-[#6c47ff] text-white rounded-full font-medium w-20 flex items-center justify-center text-xs h-8 cursor-pointer"
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: '0 0 15px rgba(108, 71, 255, 0.4)',
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign Up
                </motion.button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <UserButton />
              </motion.div>
            </SignedIn>
          </motion.div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-orange-500 focus:outline-none"
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}
