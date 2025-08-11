import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { urlFor } from "@/lib/sanity";
import { NewsArticle } from "@/lib/types";
import { formatDate } from "@/lib/dateUtils";
import Image from "next/image";

interface ArticleCardProps {
  article: NewsArticle;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const imageUrl = article.titleImage 
    ? urlFor(article.titleImage).width(800).height(450).url()
    : '/images/placeholder.jpg';

  return (
    <article className="group relative" aria-label={article.title}>
      <Card className="overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image 
            width={800} 
            height={450} 
            src={imageUrl} 
            alt={article.titleImage?.alt || article.title} 
            loading="lazy" 
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" 
          />
          {article.category && (
            <span className="absolute left-3 top-3 rounded-full bg-background/80 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
              {article.category.name}
            </span>
          )}
        </div>
        <CardContent className="space-y-2 p-4">
          <div className="flex flex-wrap gap-1 mb-2">
            {article.tags?.slice(0, 2).map((tag) => (
              <Badge key={tag._id} variant="secondary" className="text-xs">
                {tag.name}
              </Badge>
            ))}
          </div>
          <h3 className="font-display text-xl font-semibold leading-snug">
            <a href={`/news/${article.slug.current}`} className="story-link">
              {article.title}
            </a>
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {article.smallDescription}
          </p>
          <div className="flex items-center justify-between pt-2">
            <p className="text-xs text-muted-foreground/80">
              {formatDate(article.publishedAt)}
            </p>
            {article.author && (
              <p className="text-xs text-muted-foreground">
                By {article.author.name}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 rounded-lg bg-gradient-brand blur-[18px] opacity-20" />
      </div>
    </article>
  );
}
