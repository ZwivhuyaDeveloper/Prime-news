import { simpleNewsCard } from '@/app/lib/interface';
import React from 'react';
import { client, urlFor } from "@/app/lib/sanity";
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/app/lib/dateUtils';
import { ViewAllDialog } from '@/components/ViewAllDialog';

export const revalidate = 30; // revalidate at most 30 seconds

async function getData(limit?: number) {
  const query = `
  *[_type == 'news' && category->name == "Technology"] | order(_createdAt desc) ${limit ? `[0...${limit}]` : ''} {
    title,
      smallDescription,
      "currentSlug": slug.current,
      titleImage,
      "categoryName": category->name,
      category,
      publishedAt,
      tags[]->{
        name,
        color
      },
      impacts[]->{
        name,
        color
      }
  }`;

  const data = await client.fetch(query);

  return data;
}

function ArticleList({ articles, isDialog = false }: { articles: simpleNewsCard[], isDialog?: boolean }) {
  return (
    <div className={`grid gap-6 ${isDialog ? 'grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
      {articles.map((article) => (
        <Link 
          key={article.currentSlug} 
          href={`/article/${article.currentSlug}`}
          className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
        >
          <div className="relative h-48 w-full">
            {article.titleImage ? (
              <Image
                src={urlFor(article.titleImage).url()}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-200 dark:bg-gray-800">
                <span className="text-gray-500 dark:text-gray-400">No image available</span>
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <Badge className="mb-2 bg-white/90 text-gray-900 hover:bg-white">
                {article.categoryName}
              </Badge>
              <h3 className="line-clamp-2 text-lg font-semibold text-white">
                {article.title}
              </h3>
            </div>
          </div>
          <div className="p-4">
            <p className="line-clamp-3 mb-3 text-sm text-gray-600 dark:text-gray-300">
              {article.smallDescription}
            </p>
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>{formatDate(article.publishedAt)}</span>
              <div className="flex space-x-1">
                {article.impacts?.slice(0, 2).map((impact, idx) => {
                  const colorMap: Record<string, string> = {
                    red: 'bg-red-100 text-red-800 border-red-200',
                    blue: 'bg-blue-100 text-blue-800 border-blue-200',
                    green: 'bg-green-100 text-green-800 border-green-200',
                    yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
                    purple: 'bg-purple-100 text-purple-800 border-purple-200',
                    pink: 'bg-pink-100 text-pink-800 border-pink-200',
                    indigo: 'bg-indigo-100 text-indigo-800 border-indigo-200',
                  };
                  
                  const colorClass = colorMap[impact.color.toLowerCase()] || 'bg-gray-100 text-gray-800 border-gray-200';
                  
                  return (
                    <span 
                      key={idx}
                      className={`inline-flex h-5 items-center rounded-full border px-2 text-xs font-medium ${colorClass}`}
                    >
                      {impact.name}
                    </span>
                  );
                })}
                {article.impacts?.length > 2 && (
                  <span className="flex h-5 items-center rounded-full bg-gray-100 px-2 text-xs text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                    +{article.impacts.length - 2}
                  </span>
                )}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default async function TechnologyNews() {
  const data: simpleNewsCard[] = await getData(3);
  const allArticles = await getData();
  console.log(data);

  return (
    <div className="w-full bg-white dark:bg-[#0F0F0] rounded-2xl p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
          Technology
          <span className="ml-3 inline-block h-1.5 w-8 rounded-full bg-purple-500"></span>
        </h2>
        <ViewAllDialog 
          category="Technology" 
          buttonText="View All" 
          buttonClassName="inline-flex items-center justify-center rounded-lg border border-purple-500 bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-600 transition-all hover:bg-purple-500/20 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:bg-purple-900/30 dark:text-purple-400 dark:hover:bg-purple-900/50"
        >
          <ArticleList articles={allArticles} isDialog={true} />
        </ViewAllDialog>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.map((post) => (
          <Link 
            key={post.currentSlug} 
            href={`/article/${post.currentSlug}`}
            className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="relative h-48 w-full">
              {post.titleImage ? (
                <Image
                  src={urlFor(post.titleImage).url()}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-200 dark:bg-gray-800">
                  <span className="text-gray-500 dark:text-gray-400">No image available</span>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <Badge className="mb-2 bg-white/90 text-gray-900 hover:bg-white">
                  {post.categoryName}
                </Badge>
                <h3 className="line-clamp-2 text-lg font-semibold text-white">
                  {post.title}
                </h3>
              </div>
            </div>
            <div className="p-4">
              <p className="line-clamp-3 mb-3 text-sm text-gray-600 dark:text-gray-300">
                {post.smallDescription}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>{formatDate(post.publishedAt)}</span>
                <div className="flex space-x-1">
                  {post.impacts?.slice(0, 2).map((impact, i) => {
                    const colorMap: Record<string, string> = {
                      red: 'bg-red-100 text-red-800 border-red-200',
                      blue: 'bg-blue-100 text-blue-800 border-blue-200',
                      green: 'bg-green-100 text-green-800 border-green-200',
                      yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
                      purple: 'bg-purple-100 text-purple-800 border-purple-200',
                      pink: 'bg-pink-100 text-pink-800 border-pink-200',
                      indigo: 'bg-indigo-100 text-indigo-800 border-indigo-200',
                    };
                    
                    const colorClass = colorMap[impact.color.toLowerCase()] || 'bg-gray-100 text-gray-800 border-gray-200';
                    
                    return (
                      <span 
                        key={i}
                        className={`inline-flex h-5 items-center rounded-full border px-2 text-xs font-medium ${colorClass}`}
                      >
                        {impact.name}
                      </span>
                    );
                  })}
                  {post.impacts?.length > 2 && (
                    <span className="flex h-5 items-center rounded-full bg-gray-100 px-2 text-xs text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                      +{post.impacts.length - 2}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}