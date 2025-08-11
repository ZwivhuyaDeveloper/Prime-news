"use client";

import { useEffect, useMemo, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNews } from "@/hooks/useNews";

export default function StickyNavbar() {
  const { categorySections, loading } = useNews();
  const [active, setActive] = useState<string>(SECTIONS[0].id);

  // Create sections dynamically from categories
  const sections = useMemo(() => {
    const baseSections = [{ id: "hero", label: "Featured" }];
    
    if (!loading && categorySections.length > 0) {
      const categorySectionItems = categorySections.map(section => ({
        id: section.category.toLowerCase().replace(/\s+/g, '-'),
        label: section.category
      }));
      baseSections.push(...categorySectionItems);
    }
    
    baseSections.push({ id: "contact", label: "Contact" });
    return baseSections;
  }, [categorySections, loading]);

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
    const elements = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as Element[];
    elements.forEach((el) => observer.observe(el));
    return () => elements.forEach((el) => observer.unobserve(el));
  }, [observer, sections]);

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
            {sections.map((s) => (
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
