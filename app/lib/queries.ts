import { groq } from "next-sanity";

// Query to get all news articles with their categories
export const newsQuery = groq`
  *[_type == "news"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    titleImage,
    publishedAt,
    smallDescription,
    category->{
      _id,
      name
    },
    author->{
      _id,
      name,
      role,
      avatar
    },
    tags[]->{
      _id,
      name,
      color
    },
    impacts[]->{
      _id,
      name,
      color
    }
  }
`;

// Query to get news by specific category
export const newsByCategoryQuery = groq`
  *[_type == "news" && category->name == $categoryName] | order(publishedAt desc) {
    _id,
    title,
    slug,
    titleImage,
    publishedAt,
    smallDescription,
    category->{
      _id,
      name
    },
    author->{
      _id,
      name,
      role,
      avatar
    },
    tags[]->{
      _id,
      name,
      color
    },
    impacts[]->{
      _id,
      name,
      color
    }
  }
`;

// Query to get all categories
export const categoriesQuery = groq`
  *[_type == "category"] | order(name asc) {
    _id,
    name
  }
`;

// Query to get a single news article by slug
export const newsDetailQuery = groq`
  *[_type == "news" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    titleImage,
    headImage,
    contentImage,
    publishedAt,
    smallDescription,
    content,
    keyPoints,
    research,
    category->{
      _id,
      name
    },
    author->{
      _id,
      name,
      role,
      bio,
      avatar,
      socialLinks,
      email
    },
    tags[]->{
      _id,
      name,
      color
    },
    impacts[]->{
      _id,
      name,
      color
    }
  }
`;

// Query to get recent news for "More Stories" section
export const recentNewsQuery = groq`
  *[_type == "news" && _id != $excludeId] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    titleImage,
    publishedAt,
    smallDescription,
    category->{
      _id,
      name
    }
  }
`;