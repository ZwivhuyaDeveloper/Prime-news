/* eslint-disable @next/next/no-img-element */
import { Card, CardContent } from "@/components/ui/card";

interface ArticleCardProps {
  title: string;
  excerpt: string;
  image: string;
  alt: string;
  category?: string;
  date?: string;
}

export function ArticleCard({ title, excerpt, image, alt, category, date }: ArticleCardProps) {
  return (
    <article className="group relative" aria-label={title}>
      <Card className="overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
        <div className="relative aspect-[16/9] overflow-hidden">
          <img src={image} alt={alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
          {category && (
            <span className="absolute left-3 top-3 rounded-full bg-background/80 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
              {category}
            </span>
          )}
        </div>
        <CardContent className="space-y-2 p-4">
          <h3 className="font-display text-xl font-semibold leading-snug">
            <a href="#" className="story-link">{title}</a>
          </h3>
          <p className="text-sm text-muted-foreground">{excerpt}</p>
          {date && <p className="pt-1 text-xs text-muted-foreground/80">{date}</p>}
        </CardContent>
      </Card>
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 rounded-lg bg-gradient-brand blur-[18px] opacity-20" />
      </div>
    </article>
  );
}
