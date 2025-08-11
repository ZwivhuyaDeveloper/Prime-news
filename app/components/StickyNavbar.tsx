"use client";

import { useEffect, useMemo, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "hero", label: "Featured" },
  { id: "breaking", label: "Breaking" },
  { id: "politics", label: "Politics" },
  { id: "technology", label: "Technology" },
  { id: "sports", label: "Sports" },
  { id: "entertainment", label: "Entertainment" },
  { id: "business", label: "Business" },
  { id: "health", label: "Health" },
  { id: "opinion", label: "Opinion" },
  { id: "contact", label: "Contact" },
];

export default function StickyNavbar() {
  const [active, setActive] = useState<string>(SECTIONS[0].id);

  const observer = useMemo(() => {
    const offset = 84; // navbar height offset
    return new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            if (id) setActive(id);
          }
        });
      },
      { rootMargin: `-${offset}px 0px -60% 0px`, threshold: [0, 0.2, 0.5, 1] }
    );
  }, []);

  useEffect(() => {
    const elements = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as Element[];
    elements.forEach((el) => observer.observe(el));
    return () => elements.forEach((el) => observer.unobserve(el));
  }, [observer]);

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-4 rounded-full border bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/60 shadow-sm">
          <ul className="flex items-center justify-between overflow-x-auto p-2">
            {SECTIONS.map((s) => (
              <li key={s.id} className="relative px-1">
                <a
                  href={`#${s.id}`}
                  onClick={(e) => onClick(e, s.id)}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "rounded-full px-3 text-sm font-medium",
                    active === s.id ? "text-foreground bg-accent/20" : "text-muted-foreground hover:text-foreground"
                  )}
                  aria-current={active === s.id ? "page" : undefined}
                >
                  {s.label}
                </a>
                {active === s.id && (
                  <span className="pointer-events-none absolute -bottom-1 left-1/2 h-1 w-6 -translate-x-1/2 rounded-full bg-gradient-brand" />
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
