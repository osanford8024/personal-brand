import { Metadata } from 'next';
import { PageLayout } from '@/components/PageLayout';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about Omar and this blog.',
};

export default function AboutPage() {
  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-8">About</h1>
        <div className="prose prose-lg prose-slate">
          <p>
            Welcome to my personal blog. This is where I share my thoughts,
            experiences, and learnings.
          </p>
          <p>
            You can customize this page to tell your story, share your
            background, and connect with your readers.
          </p>
        </div>
      </div>
    </PageLayout>
  );
}