import { groq } from 'next-sanity';

export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    coverImage {
      asset,
      alt
    },
    author-> {
      name,
      image
    },
    categories[]-> {
      title
    },
    publishedAt
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    coverImage {
      asset,
      alt
    },
    author-> {
      _id,
      name,
      slug,
      image,
      bio
    },
    categories[]-> {
      _id,
      title,
      slug,
      description
    },
    publishedAt,
    body,
    seo {
      metaTitle,
      metaDescription
    }
  }
`;

export const recentPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) [0...6] {
    _id,
    title,
    slug,
    excerpt,
    coverImage {
      asset,
      alt
    },
    publishedAt
  }
`;