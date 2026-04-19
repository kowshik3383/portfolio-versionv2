import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
}

interface PostPaginationProps {
  posts: BlogPost[];
  currentSlug: string;
}

export default function PostPagination({ posts, currentSlug }: PostPaginationProps) {
  const currentIndex = posts.findIndex((post) => post.slug === currentSlug);
  
  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  if (!prevPost && !nextPost) return null;

  return (
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
              <span className="text-xs text-gray-500 uppercase tracking-wide">Previous</span>
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
              <span className="text-xs text-gray-500 uppercase tracking-wide">Next</span>
              <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                {nextPost.title}
              </h4>
            </div>
            <div className="shrink-0 text-gray-400 group-hover:text-gray-600 transition-colors">
              <ArrowRight className="w-5 h-5" />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}