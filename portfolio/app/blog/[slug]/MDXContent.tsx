'use client';

import { useRef } from 'react';
import { MDXRemote } from 'next-mdx-remote';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import BlogShell from './_components/BlogShell';
import Breadcrumbs from './_components/Breadcrumbs';
import PostMeta from './_components/PostMeta';
import TableOfContents from './_components/TableOfContents';
import AuthorCard from './_components/AuthorCard';
import Callout from './_components/mdx/Callout';
import FAQList from './_components/mdx/FAQList';
import InlineCTA from './_components/mdx/InlineCTA';
import Image from 'next/image';

interface BlogPostPageProps {
    slug: string;
    title: string;
    description: string;
    date: string;
    tags: string[];
    type: 'negative' | 'fix' | 'opinion';
    content: string;
    mdxSource: any;
    relatedPosts?: Array<{
        slug: string;
        title: string;
        description: string;
        date: string;
        tags: string[];
        type: 'negative' | 'fix' | 'opinion';
    }>;
    prevPost?: { slug: string; title: string } | null;
    nextPost?: { slug: string; title: string } | null;
}

// Custom components for MDX rendering
const components = {
    h2: (props: any) => (
        <h2
            className="text-2xl font-bold text-gray-900 mt-12 mb-6 pb-2 border-b-2 border-gray-200"
            {...props}
        />
    ),
    h3: (props: any) => (
        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4" {...props} />
    ),
    h4: (props: any) => (
        <h4 className="text-lg font-bold text-gray-900 mt-6 mb-3" {...props} />
    ),
    p: (props: any) => (
        <p className="text-gray-700 leading-relaxed mb-4 text-lg" {...props} />
    ),
    ul: (props: any) => (
        <ul className="list-disc list-inside space-y-2 mb-6 ml-4" {...props} />
    ),
    ol: (props: any) => (
        <ol
            className="list-decimal list-inside space-y-2 mb-6 ml-4"
            {...props}
        />
    ),
    li: (props: any) => (
        <li className="text-gray-700 leading-relaxed" {...props} />
    ),
    strong: (props: any) => (
        <strong className="font-bold text-gray-900" {...props} />
    ),
    em: (props: any) => <em className="italic text-gray-700" {...props} />,
    code: (props: any) => (
        <code
            className="bg-gray-100 text-gray-800 px-2 py-1 rounded font-mono text-sm"
            {...props}
        />
    ),
    pre: (props: any) => (
        <pre
            className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6"
            {...props}
        />
    ),
    blockquote: (props: any) => (
        <blockquote
            className="border-l-4 border-gray-300 pl-6 py-2 my-6 italic text-gray-600"
            {...props}
        />
    ),
    a: (props: any) => (
        <a
            className="text-blue-600 hover:text-blue-800 underline font-medium"
            {...props}
        />
    ),
    hr: (props: any) => <hr className="my-12 border-gray-200" {...props} />,
    table: (props: any) => (
        <div className="overflow-x-auto my-6">
            <table className="min-w-full border border-gray-200" {...props} />
        </div>
    ),
    th: (props: any) => (
        <th
            className="bg-gray-50 px-4 py-3 text-left font-semibold text-gray-900 border-b border-gray-200"
            {...props}
        />
    ),
    td: (props: any) => (
        <td
            className="px-4 py-3 text-gray-700 border-b border-gray-100"
            {...props}
        />
    ),
    img: (props: any) => {
        const { src = '', alt = '' } = props;

        return (
            <div className="my-8">
                <Image
                    src={src}
                    alt={alt || ''}
                    width={800}
                    height={500}
                    className="rounded-lg w-full h-auto"
                />
            </div>
        );
    },
    // Custom MDX components
    Callout,
    FAQList,
    InlineCTA,
    AuthorCard: (props: any) => <AuthorCard {...props} />,
};

export default function MDXContent({
    title,
    description,
    date,
    tags,
    type,
    mdxSource,
    prevPost,
    nextPost,
}: BlogPostPageProps) {
    const contentRef = useRef<HTMLElement>(null);
    const readingTime = Math.max(
        1,
        Math.ceil((mdxSource.compiledSource?.length || 1000) / 200),
    );

    return (
        <BlogShell>
            {/* Header */}
            <div className="bg-gradient-to-b from-gray-50 to-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-16">
                    {/* Breadcrumbs */}
                    <Breadcrumbs items={[{ label: title }]} />

                    {/* Meta Info */}
                    <PostMeta
                        date={date}
                        readingTime={readingTime}
                        tags={tags}
                        type={type}
                    />

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        {title}
                    </h1>

                    {/* Description */}
                    <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl">
                        {description}
                    </p>
                </div>
            </div>

            {/* Content with TOC sidebar */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex gap-12">
                    {/* Main Content */}
                    <main ref={contentRef} className="flex-1 min-w-0">
                        <div className="prose prose-lg prose-gray max-w-none">
                            <div className="blog-content">
                                <MDXRemote
                                    {...mdxSource}
                                    components={components}
                                />
                            </div>
                        </div>

                        {/* Author Card */}
                        <AuthorCard />

                        {/* Post Navigation */}
                        {(prevPost || nextPost) && (
                            <div className="mt-12 pt-8 border-t border-gray-200">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {prevPost && (
                                        <Link
                                            href={`/blog/${prevPost.slug}`}
                                            className="group flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-gray-400 hover:bg-gray-50 transition-all"
                                        >
                                            <div className="shrink-0 text-gray-400 group-hover:text-gray-600 transition-colors">
                                                <ArrowLeft className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <span className="text-xs text-gray-500 uppercase tracking-wide">
                                                    Previous
                                                </span>
                                                <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                                                    {prevPost.title}
                                                </h4>
                                            </div>
                                        </Link>
                                    )}
                                    {nextPost && (
                                        <Link
                                            href={`/blog/${nextPost.slug}`}
                                            className="group flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-gray-400 hover:bg-gray-50 transition-all md:justify-end md:text-right"
                                        >
                                            <div>
                                                <span className="text-xs text-gray-500 uppercase tracking-wide">
                                                    Next
                                                </span>
                                                <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                                                    {nextPost.title}
                                                </h4>
                                            </div>
                                            <div className="shrink-0 text-gray-400 group-hover:text-gray-600 transition-colors">
                                                <ArrowLeft className="w-5 h-5 rotate-180" />
                                            </div>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Back to Blog Link */}
                        <div className="mt-8 pt-8 border-t border-gray-200">
                            <Link
                                href="/blog"
                                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors font-medium"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to all blog posts
                            </Link>
                        </div>
                    </main>

                    {/* Table of Contents Sidebar */}
                    <TableOfContents contentRef={contentRef} />
                </div>
            </div>

            {/* Custom Styles */}
            <style>{`
        .blog-content {
          line-height: 1.8;
        }
        .blog-content h2 {
          font-size: 1.875rem;
          font-weight: 700;
          margin-top: 3rem;
          margin-bottom: 1.5rem;
          color: #111827;
        }
        .blog-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: #111827;
        }
        .blog-content h4 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          color: #111827;
        }
        .blog-content p {
          margin-bottom: 1.5rem;
          color: #374151;
          font-size: 1.125rem;
        }
        .blog-content ul,
        .blog-content ol {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }
        .blog-content li {
          margin-bottom: 0.5rem;
          color: #374151;
        }
        .blog-content strong {
          font-weight: 600;
          color: #111827;
        }
        .blog-content code {
          background-color: #f3f4f6;
          padding: 0.25rem 0.5rem;
          border-radius: 0.375rem;
          font-size: 0.875em;
          color: #1f2937;
          font-family: monospace;
        }
        .blog-content pre {
          background-color: #1f2937;
          padding: 1.5rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin-bottom: 1.5rem;
        }
        .blog-content pre code {
          background: none;
          padding: 0;
          color: #f9fafb;
        }
        .blog-content a {
          color: #2563eb;
          text-decoration: underline;
          font-weight: 500;
        }
        .blog-content blockquote {
          border-left: 4px solid #d1d5db;
          padding-left: 1.5rem;
          margin: 2rem 0;
          color: #6b7280;
          font-style: italic;
        }
        .blog-content table {
          width: 100%;
          margin-bottom: 1.5rem;
          border-collapse: collapse;
        }
        .blog-content th {
          background-color: #f9fafb;
          padding: 0.75rem;
          text-align: left;
          font-weight: 600;
          color: #111827;
          border: 1px solid #e5e7eb;
        }
        .blog-content td {
          padding: 0.75rem;
          border: 1px solid #e5e7eb;
          color: #374151;
        }
        .blog-content img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 2rem 0;
        }
      `}</style>
        </BlogShell>
    );
}
