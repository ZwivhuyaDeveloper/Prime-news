"use client";

import { useEffect, useMemo, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Newspaper } from "lucide-react";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

const SECTIONS = [
  { id: "hero", label: "Featured" },
  { id: "breaking", label: "Breaking" },
  { id: "politics", label: "Politics" },
  { id: "technology", label: "Technology" },
  { id: "business", label: "Business" },
  { id: "contact", label: "Contact" },
];

export default function StickyNavbar() {
  const [active, setActive] = useState<string>(SECTIONS[0].id);

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

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActive(id);
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 80, // Adjust for header height
        behavior: "smooth"
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 items-center w-fit">
        <div className="mt-4 rounded-full border border-zinc-200 dark:border-zinc-800  bg-card/80 backdrop-blur items-center px-3 w-full flex flex-row justify-between supports-[backdrop-filter]:bg-card/60 shadow-md">

          <div className="flex items-center w-fit justify-between p-3">
            <Link href="/" className="flex items-center gap-2">
              <Newspaper width={28} height={28} strokeWidth={2}  className=" bg-gradient-to-l w-fit h-fit from-orange-500 to-orange-200 rounded-full overflow-hidden text-white p-1"/>
              <span className="font-bold text-xs sm:text-lg w-full gap-1 flex flex-row"><h1 className="text-orange-500">Prime</h1> <h2 className="dark:text-white text-black">News</h2></span>
            </Link>
          </div>

          <ul className="flex items-center w-full justify-between overflow-x-auto p-2">
            {SECTIONS.map((s) => (
              <li key={s.id} className="relative px-1">
                <a
                  href={`#${s.id}`}
                  onClick={(e) => onClick(e, s.id)}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "rounded-full px-3 text-sm font-medium transition-colors duration-300 ease-in-out",
                    active === s.id
                      ? "text-foreground bg-orange-500/20 selection:bg-orange-500/50"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  )}
                  aria-current={active === s.id ? "page" : undefined}
                >
                  {s.label}
                </a>
                <span 
                  className={cn(
                    "pointer-events-none absolute -bottom-1 left-1/2 h-1 w-6 -translate-x-1/2 rounded-full bg-gradient-brand transition-all duration-300 ease-out",
                    active === s.id ? "opacity-100 scale-100" : "opacity-0 scale-50"
                  )}
                />
              </li>
            ))}
          </ul>

          <div className="flex items-center w-fit justify-end gap-2">
          <SignedOut>
              <SignInButton>
                <button className="bg-orange-500 text-white rounded-full font-medium w-17  flex items-center justify-center text-xs h-8 px-2 cursor-pointer">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="bg-[#6c47ff] text-white rounded-full font-medium w-17 flex items-center justify-center text-xs h-8 px-2 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>

        </div>
      </nav>
    </header>
  );
}
