import { getAllBlogMetadata } from '@/lib/blog.server';
import BlogPageClient from './page-client';

export const metadata = {
  title: 'Blog | Portfolio',
  description: 'Insights, tutorials, and opinions on web development',
};

export default function BlogPage() {
  const blogs = getAllBlogMetadata();
  return <BlogPageClient blogs={blogs} />;
}