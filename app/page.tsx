import Link from 'next/link';
import Image from 'next/image';
import { client, urlForImage } from '@/lib/sanity.client';
import { recentPostsQuery } from '@/lib/sanity.queries';
import { PostListItem } from '@/lib/sanity.types';
import { PageLayout } from '@/components/PageLayout';

export default async function HomePage() {
  const posts: PostListItem[] = await client.fetch(recentPostsQuery);

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            BuildWithOmar
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            Building digital experiences, one line of code at a time.
          </p>
          <Link
            href="/blog"
            className="inline-block bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-slate-800 transition"
          >
            Read the Blog
          </Link>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8">Recent Posts</h2>
        {posts.length === 0 ? (
          <p className="text-slate-600">
            No posts yet. Create your first post in the{' '}
            <Link href="/studio" className="text-blue-600 hover:underline">
              Sanity Studio
            </Link>
            .
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post._id} className="group">
                <Link href={`/blog/${post.slug.current}`}>
                  {post.coverImage && (
                    <div className="aspect-video relative mb-4 overflow-hidden rounded-lg bg-slate-100">
                      <Image
                        src={urlForImage(post.coverImage).width(600).url()}
                        alt={post.coverImage.alt || post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition duration-300"
                      />
                    </div>
                  )}
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-2">{post.excerpt}</p>
                  <time className="text-sm text-slate-500">
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </PageLayout>
  );
}