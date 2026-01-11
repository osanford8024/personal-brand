import { PortableTextBlock } from '@portabletext/types';

export interface Author {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  image?: {
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
  bio?: string;
}

export interface Category {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description?: string;
}

export interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  excerpt: string;
  coverImage?: {
    asset: {
      _ref: string;
      _type: 'reference';
    };
    alt: string;
  };
  author: Author;
  categories?: Category[];
  publishedAt: string;
  body: PortableTextBlock[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}

export interface PostListItem {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  excerpt: string;
  coverImage?: {
    asset: {
      _ref: string;
      _type: 'reference';
    };
    alt: string;
  };
  author: {
    name: string;
    image?: {
      asset: {
        _ref: string;
        _type: 'reference';
      };
    };
  };
  categories?: {
    title: string;
  }[];
  publishedAt: string;
}