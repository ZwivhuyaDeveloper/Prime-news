
import { simpleNewsCard } from '@/app/lib/interface';
import React from 'react'
import { client, urlFor } from "@/app/lib/sanity";
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Tag, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDate } from '@/app/lib/dateUtils';


export const revalidate = 30; // revalidate at most 30 seconds

async function getData() {
  const query = `
  *[_type == 'news' && category->name == "Featured"] | order(_createdAt desc) {
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


export default async function FeaturedNews() {
  const data: simpleNewsCard[] = await getData()
  console.log(data);

  return (
    <div className="flex flex-col w-full bg-white dark:bg-[#0F0F0F]">
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