import Link from 'next/link';
import Image from 'next/image';
import { client, urlForImage } from '@/lib/sanity.client';
import { postsQuery } from '@/lib/sanity.queries';
import { PostListItem } from '@/lib/sanity.types';
import { PageLayout } from '@/components/PageLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read my latest tutorials, thoughts, and project updates.',
};

export default async function BlogPage() {
  const posts: PostListItem[] = await client.fetch(postsQuery);

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-2">Blog</h1>
        <p className="text-slate-600 mb-12">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'}
        </p>

        {posts.length === 0 ? (
          <p className="text-slate-600">
            No posts yet. Create your first post in the{' '}
            <Link href="/studio" className="text-blue-600 hover:underline">
              Sanity Studio
            </Link>
            .
          </p>
        ) : (
          <div className="space-y-12">
            {posts.map((post) => (
              <article key={post._id} className="group">
                <Link href={`/blog/${post.slug.current}`}>
                  <div className="flex flex-col md:flex-row gap-6">
                    {post.coverImage && (
                      <div className="md:w-64 md:h-40 aspect-video relative overflow-hidden rounded-lg bg-slate-100 flex-shrink-0">
                        <Image
                          src={urlForImage(post.coverImage).width(400).url()}
                          alt={post.coverImage.alt || post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition duration-300"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-2 group-hover:text-blue-600 transition">
                        {post.title}
                      </h2>
                      <p className="text-slate-600 mb-3">{post.excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        {post.author?.name && <span>{post.author.name}</span>}
                        <span>•</span>
                        <time>
                          {new Date(post.publishedAt).toLocaleDateString(
                            'en-US',
                            {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            }
                          )}
                        </time>
                        {post.categories && post.categories.length > 0 && (
                          <>
                            <span>•</span>
                            <span>{post.categories[0].title}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
}