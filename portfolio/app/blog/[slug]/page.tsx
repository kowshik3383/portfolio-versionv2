import { getBlogBySlug, getAllBlogMetadata } from '@/lib/blog.server';
import { stripDateFromSlug } from '@/lib/blog.client';
import { serialize } from 'next-mdx-remote/serialize';
import { notFound } from 'next/navigation';
import MDXContent from './MDXContent';

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const blogs = getAllBlogMetadata();
  return blogs.map((blog) => ({
    slug: stripDateFromSlug(blog.slug),
  }));
}

export async function generateMetadata({ params }: BlogPageProps) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return {
      title: 'Blog Not Found',
    };
  }

  return {
    title: `${blog.title} | Blog`,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      type: 'article',
      publishedTime: blog.date,
      authors: ['Kowshik Valipireddy'],
      tags: blog.tags,
    },
  };
}

// Use dynamic rendering
export const dynamic = 'force-dynamic';

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const mdxSource = await serialize(blog.content, {
    mdxOptions: {
      development: process.env.NODE_ENV === 'development',
    },
  });

  // Get all blogs for navigation
  const allBlogs = getAllBlogMetadata();
  const currentIndex = allBlogs.findIndex(
    (b) => stripDateFromSlug(b.slug) === slug || b.slug === slug
  );

  const prevPost = currentIndex > 0
    ? {
        slug: stripDateFromSlug(allBlogs[currentIndex - 1].slug),
        title: allBlogs[currentIndex - 1].title,
      }
    : null;

  const nextPost = currentIndex < allBlogs.length - 1
    ? {
        slug: stripDateFromSlug(allBlogs[currentIndex + 1].slug),
        title: allBlogs[currentIndex + 1].title,
      }
    : null;

  // Get related posts (same type or tags)
  const relatedPosts = allBlogs
    .filter(
      (b) =>
        stripDateFromSlug(b.slug) !== slug &&
        b.slug !== slug &&
        (b.type === blog.type || b.tags.some((t: string) => blog.tags.includes(t)))
    )
    .slice(0, 3)
    .map((b) => ({
      ...b,
      slug: stripDateFromSlug(b.slug),
    }));

  return (
    <MDXContent
      slug={stripDateFromSlug(blog.slug)}
      title={blog.title}
      description={blog.description}
      date={blog.date}
      tags={blog.tags}
      type={blog.type}
      content={blog.content}
      mdxSource={mdxSource}
      relatedPosts={relatedPosts}
      prevPost={prevPost}
      nextPost={nextPost}
    />
  );
}