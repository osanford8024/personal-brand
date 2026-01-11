import { Metadata } from 'next';
import { PageLayout } from '@/components/PageLayout';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with me.',
};

export default function ContactPage() {
  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-8">Contact</h1>
        <div className="prose prose-lg prose-slate">
          <p>
            I'd love to hear from you! You can reach me through the following
            channels:
          </p>
          <ul>
            <li>Email: your-email@example.com</li>
            <li>Twitter/X: @yourhandle</li>
            <li>LinkedIn: your-profile</li>
          </ul>
          <p className="text-sm text-slate-600 mt-8">
            (This is a placeholder page. You can add a contact form in Phase 2+)
          </p>
        </div>
      </div>
    </PageLayout>
  );
}