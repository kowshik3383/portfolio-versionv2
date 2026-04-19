import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';

interface BlogPostCardProps {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  type: 'negative' | 'fix' | 'opinion';
  readingTime?: number;
}

const typeLabels = {
  negative: 'Problem',
  fix: 'Solution',
  opinion: 'Opinion',
};

const typeColors = {
  negative: 'bg-red-100 text-red-800 border-red-200',
  fix: 'bg-green-100 text-green-800 border-green-200',
  opinion: 'bg-blue-100 text-blue-800 border-blue-200',
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default function BlogPostCard({
  slug,
  title,
  description,
  date,
  tags,
  type,
  readingTime = 5,
}: BlogPostCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group block bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-gray-400 hover:shadow-lg transition-all duration-300"
    >
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold border ${typeColors[type]}`}
          >
            {typeLabels[type]}
          </span>
          <span className="text-gray-500 text-sm flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(date)}
          </span>
          {readingTime && (
            <span className="text-gray-500 text-sm flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {readingTime} min
            </span>
          )}
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
          {title}
        </h2>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {description}
        </p>

        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium"
            >
              #{tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="px-2 py-1 text-gray-500 text-xs">
              +{tags.length - 3} more
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}