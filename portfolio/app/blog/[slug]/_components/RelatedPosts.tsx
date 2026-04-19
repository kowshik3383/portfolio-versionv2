import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  type: 'negative' | 'fix' | 'opinion';
}

interface RelatedPostsProps {
  posts: BlogPost[];
  currentSlug: string;
  currentTags?: string[];
  limit?: number;
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export default function RelatedPosts({
  posts,
  currentSlug,
  currentTags = [],
  limit = 3,
}: RelatedPostsProps) {
  // Filter out current post and sort by relevance (matching tags first)
  const relatedPosts = posts
    .filter((post) => post.slug !== currentSlug)
    .sort((a, b) => {
      const aMatches = a.tags.filter((tag) => currentTags.includes(tag)).length;
      const bMatches = b.tags.filter((tag) => currentTags.includes(tag)).length;
      return bMatches - aMatches;
    })
    .slice(0, limit);

  if (relatedPosts.length === 0) return null;

  return (
    <div className="mt-16 pt-8 border-t-2 border-gray-200">
      <div className="flex items-center gap-2 mb-6">
        <ArrowRight className="w-5 h-5 text-gray-400" />
        <h2 className="text-2xl font-bold text-gray-900">Related Posts</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block bg-white rounded-xl border border-gray-200 p-6 hover:border-gray-400 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-gray-500 text-xs">{formatDate(post.date)}</span>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
              {post.title}
            </h3>

            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {post.description}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {post.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}