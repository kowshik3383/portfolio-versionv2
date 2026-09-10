import { Metadata } from 'next';
import { getAllBlogs, getAllCategories, getAllTags } from '@/lib/blogs';
import BlogListClient from './_components/BlogListClient';

export const metadata: Metadata = {
    title: 'Engineering Blog - Kowshik Valipireddy | Full Stack, React Native & AI Architecture',
    description:
        'Technical articles, architecture guides, and tutorials on Next.js 15, React Native (iOS & Android), AI Agent Engineering, PostgreSQL & Prisma, Web Performance, and 60fps Animations by Kowshik Valipireddy.',
    keywords: [
        'Next.js 15 Blog',
        'React Native Blog',
        'Mobile App Architecture',
        'Full Stack Developer Blog',
        'AI Agent Architecture',
        'React 19 Server Components',
        'Web Performance SEO',
        'PostgreSQL Prisma Optimization',
        'Kowshik Valipireddy Articles',
    ],
    alternates: {
        canonical: 'https://kowshik-valipireddy.pages.dev/blog',
    },
    openGraph: {
        title: 'Engineering Blog - Kowshik Valipireddy',
        description:
            'Technical articles on Next.js 15, Full Stack Architecture, AI Agent workflows, and Core Web Vitals.',
        url: 'https://kowshik-valipireddy.pages.dev/blog',
        siteName: 'Kowshik Valipireddy Portfolio',
        type: 'website',
        images: [
            {
                url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
                width: 1200,
                height: 630,
                alt: 'Kowshik Valipireddy Technical Blog',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Engineering Blog - Kowshik Valipireddy',
        description:
            'Deep dives into Full Stack Architecture, AI Agent Engineering, and Web Performance.',
        images: [
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
        ],
    },
};

export default function BlogPage() {
    const posts = getAllBlogs();
    const categories = getAllCategories();
    const tags = getAllTags();

    // JSON-LD structured data for blog collection page
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Kowshik Valipireddy - Engineering Blog',
        description:
            'Technical articles, architectural deep dives, and tutorials on modern web engineering.',
        url: 'https://kowshik-valipireddy.pages.dev/blog',
        author: {
            '@type': 'Person',
            name: 'Kowshik Valipireddy',
            url: 'https://kowshik-valipireddy.pages.dev',
        },
        hasPart: posts.map((post) => ({
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            url: `https://kowshik-valipireddy.pages.dev/blog/${post.slug}`,
            datePublished: post.publishedAt,
            author: {
                '@type': 'Person',
                name: post.author.name,
            },
        })),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <BlogListClient posts={posts} categories={categories} tags={tags} />
        </>
    );
}
