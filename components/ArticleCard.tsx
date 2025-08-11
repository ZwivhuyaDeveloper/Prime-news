import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";

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
    <article className={cn("group relative")}
      aria-label={title}
    >
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={image}
            alt={alt}
            width={1920}
            height={1080}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          {category && (
            <span className="absolute left-3 top-3 rounded-full bg-background/80 px-3 py-1 text-md font-medium text-foreground backdrop-blur">
              {category}
            </span>
          )}
        </div>
        <CardContent className="space-y-2 p-4">
          <h3 className="font-display text-xl font-semibold leading-snug">
            <a href="#" className="story-link">{title}</a>
          </h3>
          <p className="text-sm text-muted-foreground">{excerpt}</p>
          {date && (
            <p className="pt-1 text-xs text-muted-foreground/80">{date}</p>
          )}
        </CardContent>
      </Card>
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 rounded-lg bg-gradient-brand blur-[18px] opacity-20" />
      </div>
    </article>
  );
}
