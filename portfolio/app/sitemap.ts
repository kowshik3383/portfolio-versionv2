import type { MetadataRoute } from 'next';
import { BLOG_POSTS } from '@/lib/blogs';
import { PROJECTS } from '@/lib/data';

export const dynamic = 'force-static';

const BASE_URL = 'https://kowshik-valipireddy.pages.dev';

export default function sitemap(): MetadataRoute.Sitemap {
    const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified: new Date(post.updatedAt || post.publishedAt),
        changeFrequency: 'monthly',
        priority: 0.8,
    }));

    const projectRoutes: MetadataRoute.Sitemap = PROJECTS.map((project) => ({
        url: `${BASE_URL}/projects/${project.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
    }));

    return [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        ...blogRoutes,
        ...projectRoutes,
    ];
}
