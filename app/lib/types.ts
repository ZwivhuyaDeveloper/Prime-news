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

export interface NewsArticle {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  titleImage?: any;
  headImage?: any;
  contentImage?: any;
  publishedAt: string;
  smallDescription: string;
  content?: any[];
  keyPoints?: Array<{
    _key: string;
    point: string;
    description?: string;
  }>;
  research?: any[];
  category: Category;
  author: Author;
  tags: Tag[];
  impacts: Impact[];
}

export interface CategorySection {
  category: string;
  articles: NewsArticle[];
}