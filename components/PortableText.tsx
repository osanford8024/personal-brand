import {
  PortableText as PortableTextReact,
  PortableTextComponents,
} from '@portabletext/react';
import { PortableTextBlock } from '@portabletext/types';
import Image from 'next/image';
import { urlForImage } from '@/lib/sanity.client';

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-bold mt-6 mb-3">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-bold mt-6 mb-3">{children}</h4>
    ),
    normal: ({ children }) => <p className="mb-4 leading-7">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-slate-300 pl-4 italic my-6">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ value, children }) => {
      const target = value?.href?.startsWith('http') ? '_blank' : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-blue-600 hover:underline"
        >
          {children}
        </a>
      );
    },
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      return (
        <div className="my-8">
          <Image
            src={urlForImage(value).width(800).url()}
            alt={value.alt || 'Blog post image'}
            width={800}
            height={450}
            className="rounded-lg"
          />
          {value.alt && (
            <p className="text-sm text-slate-600 mt-2 text-center italic">
              {value.alt}
            </p>
          )}
        </div>
      );
    },
    code: ({ value }) => (
      <pre className="bg-slate-900 text-slate-50 p-4 rounded-lg overflow-x-auto my-6">
        <code className="text-sm">{value?.code}</code>
      </pre>
    ),
  },
  unknownType: () => null,
  unknownMark: () => null,
  unknownBlockStyle: ({ children }) => <p className="mb-4">{children}</p>,
};

export function PortableText({ value }: { value: PortableTextBlock[] | null | undefined }) {
  if (!value || !Array.isArray(value) || value.length === 0) {
    return <p className="text-slate-600">No content available</p>;
  }
  
  try {
    return <PortableTextReact value={value} components={components} />;
  } catch (error) {
    console.error('PortableText render error:', error);
    return <p className="text-red-600">Error rendering content</p>;
  }
}