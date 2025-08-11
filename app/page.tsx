"use client";

import { CategorySection } from "@/components/CategorySection";
import { Button } from "@/components/ui/button";
import { useNews } from "@/hooks/useNews";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import NewsletterForm from "./components/NewsletterForm";
import StickyNavbar from "./components/StickyNavbar";

function LoadingSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="aspect-[16/9] w-full rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-3 w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Page() {
  const { categorySections, loading, error } = useNews();

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive mb-2">Error Loading News</h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <StickyNavbar />

      <header id="hero" className="pt-28">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border">
            <Image
              src="/images/hero.jpg"
              width={1920}
              height={1080}
              alt="Flux Gazette hero image, editorial collage with gradient glow"
              className="h-[52vh] w-full object-cover sm:h-[64vh]"
            />
            <div className="absolute inset-0 bg-gradient-brand opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
              <h1 className="font-display text-4xl font-extrabold tracking-tight text-gradient-brand sm:text-5xl md:text-6xl">
                Flux Gazette
              </h1>
              <p className="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
                A modern digital magazine covering breaking news, politics, technology, sports, entertainment, business, health, and opinion.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#news-sections"><Button variant="brand" size="lg">Read Latest</Button></a>
                <a href="#contact" className="inline-flex"><Button variant="outline" size="lg">Subscribe</Button></a>
              </div>
            </div>
          </div>
        </section>
      </header>

      <main id="news-sections">
        {loading ? (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
            <div className="space-y-16">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-6">
                  <Skeleton className="h-8 w-48" />
                  <LoadingSkeleton />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {categorySections.map((section, index) => (
              <CategorySection
                key={section.category}
                title={section.category}
                articles={section.articles}
                sectionId={section.category.toLowerCase().replace(/\s+/g, '-')}
              />
            ))}
            
            {categorySections.length === 0 && (
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
                <h2 className="text-2xl font-bold mb-4">No Articles Found</h2>
                <p className="text-muted-foreground">
                  It looks like there are no published articles yet. Check back later!
                </p>
              </div>
            )}
          </>
        )}

        {/* Contact / Newsletter */}
        <section id="contact" className="scroll-mt-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
            <div className="relative overflow-hidden rounded-2xl border p-10 text-center">
              <div className="absolute inset-0 -z-10 bg-gradient-brand opacity-[0.15]" />
              <h2 className="font-display text-3xl font-bold">Stay in the loop</h2>
              <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">Get the weekly Flux Gazette digest: the stories that matter, delivered to your inbox.</p>
              <div className="mx-auto mt-6 flex justify-center"><NewsletterForm /></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">© {new Date().getFullYear()} Flux Gazette. All rights reserved.</div>
      </footer>
    </div>
  );
}