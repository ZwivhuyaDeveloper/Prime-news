
import { simpleNewsCard } from '@/app/lib/interface';
import React from 'react'
import { client, urlFor } from "@/app/lib/sanity";
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { formatDate } from '@/app/lib/dateUtils';
import { Globe, Tag } from 'lucide-react';
import { ViewAllDialog } from '@/components/ViewAllDialog';
import Link from 'next/link';

export const revalidate = 30; // revalidate at most 30 seconds

async function getData(limit?: number) {
  const query = `
  *[_type == 'news' && category->name == "Breaking"] | order(_createdAt desc) ${limit ? `[0...${limit}]` : ''} {
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

function ArticleList({ articles }: { articles: simpleNewsCard[] }) {
  return (
    <div className="space-y-2">
      {articles.map((article) => (
        <Link 
          key={article.currentSlug} 
          href={`/article/${article.currentSlug}`}
          className="group flex items-center gap-4 rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800/50"
        >
          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
            <Image
              src={urlFor(article.titleImage).url()}
              alt={article.title}
              fill
              className="object-cover"
            />
          </div>
          
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {article.categoryName}
              </Badge>
              <span className="truncate text-sm font-medium text-gray-900 dark:text-white">
                {article.title}
              </span>
            </div>
            
            <div className="mt-1 flex flex-wrap items-center gap-1">
              {article.impacts?.slice(0, 3).map((impact, idx) => (
                <span 
                  key={idx}
                  className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs ${
                    impact.color === 'red' ? 'border-red-200 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-900/30 dark:text-red-200' :
                    impact.color === 'blue' ? 'border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-900 dark:bg-blue-900/30 dark:text-blue-200' :
                    impact.color === 'green' ? 'border-green-200 bg-green-50 text-green-800 dark:border-green-900 dark:bg-green-900/30 dark:text-green-200' :
                    'border-gray-200 bg-gray-50 text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200'
                  }`}
                >
                  {impact.name}
                </span>
              ))}
              {article.impacts?.length > 3 && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  +{article.impacts.length - 3} more
                </span>
              )}
            </div>
          </div>
          
          <div className="flex-shrink-0 text-xs text-gray-500 dark:text-gray-400">
            {formatDate(article.publishedAt, { month: 'short', day: 'numeric' })}
          </div>
        </Link>
      ))}
    </div>
  );
}

export default async function BreakingNews() {
  const data: simpleNewsCard[] = await getData(5); // Get only 5 articles for the main view
  const allArticles = await getData(); // Get all articles for the dialog

  return (
    <div className="w-full bg-white dark:bg-[#0F0F0F] rounded-2xl p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
          Breaking News
          <span className="ml-3 inline-block h-1.5 w-8 rounded-full bg-orange-500"></span>
        </h2>
        <ViewAllDialog 
          category="Breaking" 
          buttonText="View All" 
          buttonClassName="inline-flex items-center justify-center rounded-lg border border-orange-500 bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-600 transition-all hover:bg-orange-500/20 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:bg-orange-900/30 dark:text-orange-400 dark:hover:bg-orange-900/50"
        >
          <ArticleList articles={allArticles} />
        </ViewAllDialog>
      </div>
      <div className='space-y-4 w-full'>
        {data.map((post, idx) => (
          <div key={idx} className="w-full p-4 bg-blue-50 border-none dark:bg-[#00FFC2]/10 shadow-xs shadow-zinc-200 dark:shadow-zinc-900 rounded-lg">
            <div className="flex flex-col w-full md:flex-row gap-6">
              <div className="md:w-1/2">
                <div className='absolute p-3 z-10'>
                  <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                    {post.categoryName}
                  </Badge>
                </div>
                <div className="relative h-64 w-full">
                  <Image
                    src={urlFor(post.titleImage).url()}
                    alt={post.title}
                    fill
                    className="rounded-lg object-cover shadow-lg"
                  />
                </div>
              </div>
              
              <div className="md:w-1/2 flex flex-col justify-between">
                <div>
                  <Badge className="w-fit mb-3 bg-[#0E76FD] dark:bg-[#00FFC2] text-white dark:text-black">
                    Featured Story
                  </Badge>
                  <Link href={`/article/${post.currentSlug}`} className="hover:text-blue-600 transition-colors">
                    <h2 className="text-2xl font-bold mb-3 line-clamp-2">{post.title}</h2>
                  </Link>
                  <p className="text-gray-600 dark:text-zinc-300 mb-4 line-clamp-3">
                    {post.smallDescription}
                  </p>
                </div>

                <div className='space-y-3'>
                  <div className='flex flex-row justify-between items-center'>
                    {/* Date */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-zinc-500 dark:text-zinc-400">
                        {formatDate(post.publishedAt, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>

                    {/* Impact */}
                    <div className='flex items-center gap-2'>
                      <h3 className='text-sm font-medium'>Impact:</h3>
                      {post.impacts && post.impacts.length > 0 && (
                        <div className="flex gap-1">
                          {post.impacts.map((impact, impactIdx) => (
                            <Badge 
                              key={impactIdx}
                              className={cn(
                                "text-xs",
                                impact.color === 'blue' && "bg-blue-300 text-blue-950 border-blue-200",
                                impact.color === 'green' && "bg-green-300 text-green-950 border-green-200",
                                impact.color === 'red' && "bg-red-300 text-red-950 border-red-200",
                                impact.color === 'yellow' && "bg-yellow-300 text-yellow-950 border-yellow-200",
                                impact.color === 'purple' && "bg-purple-300 text-purple-950 border-purple-200"
                              )}
                            >
                              <Globe width={10} height={10} strokeWidth={3} className="mr-1"/>
                              {impact.name}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, tagIdx) => (
                        <Badge 
                          key={tagIdx}
                          className={cn(
                            "text-xs",
                            tag.color === 'blue' && "bg-blue-300 text-blue-950 border-blue-200",
                            tag.color === 'green' && "bg-green-300 text-green-950 border-green-200",
                            tag.color === 'red' && "bg-red-300 text-red-950 border-red-200",
                            tag.color === 'yellow' && "bg-yellow-300 text-yellow-950 border-yellow-200",
                            tag.color === 'purple' && "bg-purple-300 text-purple-950 border-purple-200"
                          )}
                        >
                          <Tag width={10} height={10} strokeWidth={3} className="mr-1"/>
                          {tag.name}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}