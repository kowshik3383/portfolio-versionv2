'use client';

import { useState, useMemo } from 'react';
import { stripDateFromSlug } from '@/lib/blog.client';
import BlogPostCard from '../blog/[slug]/_components/BlogPostCard';
import EmptyState from '../blog/[slug]/_components/EmptyState';

interface BlogMetadata {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  type: 'negative' | 'fix' | 'opinion';
}

interface BlogPageClientProps {
  blogs: BlogMetadata[];
}

export default function BlogPageClient({ blogs }: BlogPageClientProps) {
  const allTags = Array.from(new Set(blogs.flatMap((blog) => blog.tags)));

  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const typeMatch = selectedType === 'all' || blog.type === selectedType;
      const tagMatch = selectedTag === 'all' || blog.tags.includes(selectedTag);
      return typeMatch && tagMatch;
    });
  }, [blogs, selectedType, selectedTag]);

  const readingTime = (slug: string) => {
    // Simple estimation based on description length
    return Math.max(3, Math.ceil(slug.length / 50));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-b from-gray-50 to-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Insights, tutorials, and opinions on web development. Real problems, practical solutions, honest perspectives.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3">
            <label className="text-gray-700 font-medium">Type:</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-colors"
            >
              <option value="all">All Types</option>
              <option value="negative">🔥 Problem</option>
              <option value="fix">⚡ Solution</option>
              <option value="opinion">🚀 Opinion</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-gray-700 font-medium">Tag:</label>
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-colors"
            >
              <option value="all">All Tags</option>
              {allTags.map((tag) => (
                <option key={tag} value={tag}>
                  #{tag}
                </option>
              ))}
            </select>
          </div>

          <div className="ml-auto text-gray-500">
            {filteredBlogs.length} {filteredBlogs.length === 1 ? 'post' : 'posts'} found
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <BlogPostCard
                key={blog.slug}
                slug={stripDateFromSlug(blog.slug)}
                title={blog.title}
                description={blog.description}
                date={blog.date}
                tags={blog.tags}
                type={blog.type}
                readingTime={readingTime(blog.slug)}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No posts found"
            description="Try adjusting your filters to find what you're looking for."
            action={
              <button
                onClick={() => {
                  setSelectedType('all');
                  setSelectedTag('all');
                }}
                className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                Clear filters
              </button>
            }
          />
        )}
      </div>
    </div>
  );
}