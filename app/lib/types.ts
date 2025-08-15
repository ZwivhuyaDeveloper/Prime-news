export interface Author {
  _id: string;
  name: string;
  role?: string;
  bio?: string;
  avatar?: {
    _type: 'image';
    asset: {
      _ref: string;
      _type: 'reference';
    };
    alt?: string;
  };
  socialLinks?: Array<{
    platform: string;
    url: string;
  }>;
  email?: string;
}

export interface Category {
  _id: string;
  name: string;
}

export interface Tag {
  _id: string;
  name: string;
  color: string;
}

export interface Impact {
  _id: string;
  name: string;
  color: string;
}

interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
  crop?: {
    _type: 'sanity.imageCrop';
    bottom: number;
    left: number;
    right: number;
    top: number;
  };
  hotspot?: {
    _type: 'sanity.imageHotspot';
    height: number;
    width: number;
    x: number;
    y: number;
  };
}

type PortableTextBlock = {
  _key: string;
  _type: 'block' | 'image' | 'code' | 'table' | 'video' | 'file';
  [key: string]: unknown;
};

type ResearchItem = {
  _key: string;
  _type: 'researchItem';
  title: string;
  url: string;
  source?: string;
  date?: string;
};

export interface NewsArticle {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  titleImage?: SanityImage;
  headImage?: SanityImage;
  contentImage?: SanityImage;
  publishedAt: string;
  smallDescription: string;
  content?: PortableTextBlock[];
  keyPoints?: Array<{
    _key: string;
    point: string;
    description?: string;
  }>;
  research?: ResearchItem[];
  category: Category;
  author: Author;
  tags: Tag[];
  impacts: Impact[];
}

export interface CategorySection {
  category: string;
  articles: NewsArticle[];
}