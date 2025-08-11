import { useState, useEffect } from 'react';
import { client } from '@/lib/sanity';
import { newsQuery, newsByCategoryQuery, categoriesQuery } from '@/lib/queries';
import { NewsArticle, Category, CategorySection } from '@/lib/types';

export function useNews() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categorySections, setCategorySections] = useState<CategorySection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        
        // Fetch all articles and categories
        const [articlesData, categoriesData] = await Promise.all([
          client.fetch<NewsArticle[]>(newsQuery),
          client.fetch<Category[]>(categoriesQuery)
        ]);

        setArticles(articlesData);
        setCategories(categoriesData);

        // Group articles by category
        const sections: CategorySection[] = [];
        
        for (const category of categoriesData) {
          const categoryArticles = articlesData.filter(
            article => article.category?._id === category._id
          );
          
          if (categoryArticles.length > 0) {
            sections.push({
              category: category.name,
              articles: categoryArticles
            });
          }
        }

        setCategorySections(sections);
      } catch (err) {
        console.error('Error fetching news data:', err);
        setError('Failed to fetch news data');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return {
    articles,
    categories,
    categorySections,
    loading,
    error
  };
}

export function useNewsByCategory(categoryName: string) {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategoryNews() {
      try {
        setLoading(true);
        const data = await client.fetch<NewsArticle[]>(newsByCategoryQuery, { categoryName });
        setArticles(data);
      } catch (err) {
        console.error('Error fetching category news:', err);
        setError('Failed to fetch category news');
      } finally {
        setLoading(false);
      }
    }

    if (categoryName) {
      fetchCategoryNews();
    }
  }, [categoryName]);

  return { articles, loading, error };
}