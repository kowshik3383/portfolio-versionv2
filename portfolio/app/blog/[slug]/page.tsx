import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BLOG_POSTS, getBlogBySlug, getRelatedBlogs } from '@/lib/blogs';
import BlogPostClient from './_components/BlogPostClient';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return BLOG_POSTS.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = getBlogBySlug(slug);

    if (!post) {
        return {
            title: 'Article Not Found - Kowshik Valipireddy',
            description: 'The requested article could not be found.',
        };
    }

    const canonicalUrl = `https://kowshik-valipireddy.pages.dev/blog/${post.slug}`;

    return {
        title: `${post.metaTitle} | Kowshik Valipireddy`,
        description: post.metaDescription,
        keywords: post.keywords,
        authors: [{ name: post.author.name, url: 'https://kowshik-valipireddy.pages.dev' }],
        creator: post.author.name,
        publisher: post.author.name,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: post.title,
            description: post.excerpt,
            url: canonicalUrl,
            siteName: 'Kowshik Valipireddy Portfolio & Engineering Blog',
            locale: 'en_US',
            type: 'article',
            publishedTime: post.publishedAt,
            modifiedTime: post.updatedAt || post.publishedAt,
            authors: [post.author.name],
            tags: post.tags,
            images: [
                {
                    url: post.coverImage,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            images: [post.coverImage],
            creator: '@kowshik3383',
        },
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = getBlogBySlug(slug);

    if (!post) {
        return notFound();
    }

    const relatedPosts = getRelatedBlogs(slug, 3);

    // Schema.org BlogPosting & BreadcrumbList structured data for Google Search rich snippets
    const structuredData = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'BlogPosting',
                '@id': `https://kowshik-valipireddy.pages.dev/blog/${post.slug}#article`,
                headline: post.title,
                description: post.metaDescription,
                image: [post.coverImage],
                datePublished: post.publishedAt,
                dateModified: post.updatedAt || post.publishedAt,
                author: {
                    '@type': 'Person',
                    name: post.author.name,
                    jobTitle: post.author.role,
                    url: 'https://kowshik-valipireddy.pages.dev',
                },
                publisher: {
                    '@type': 'Person',
                    name: 'Kowshik Valipireddy',
                    url: 'https://kowshik-valipireddy.pages.dev',
                },
                mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': `https://kowshik-valipireddy.pages.dev/blog/${post.slug}`,
                },
                keywords: post.keywords.join(', '),
                articleSection: post.category,
                wordCount: post.content.split(/\s+/).length,
            },
            {
                '@type': 'BreadcrumbList',
                '@id': `https://kowshik-valipireddy.pages.dev/blog/${post.slug}#breadcrumb`,
                itemListElement: [
                    {
                        '@type': 'ListItem',
                        position: 1,
                        name: 'Home',
                        item: 'https://kowshik-valipireddy.pages.dev',
                    },
                    {
                        '@type': 'ListItem',
                        position: 2,
                        name: 'Blog',
                        item: 'https://kowshik-valipireddy.pages.dev/blog',
                    },
                    {
                        '@type': 'ListItem',
                        position: 3,
                        name: post.title,
                        item: `https://kowshik-valipireddy.pages.dev/blog/${post.slug}`,
                    },
                ],
            },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <BlogPostClient post={post} relatedPosts={relatedPosts} />
        </>
    );
}
