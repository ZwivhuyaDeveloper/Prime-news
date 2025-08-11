import { ArticleCard } from "@/components/ArticleCard";
import { NewsArticle } from "@/lib/types";

interface CategorySectionProps {
  title: string;
  articles: NewsArticle[];
  sectionId: string;
}

export function CategorySection({ title, articles, sectionId }: CategorySectionProps) {
  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <section id={sectionId} className="scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <header className="mb-6 flex items-end justify-between">
          <h2 className="font-display text-3xl font-bold">{title}</h2>
          <a href={`/category/${sectionId}`} className="story-link text-sm text-muted-foreground">
            View all
          </a>
        </header>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.slice(0, 3).map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}