import { Calendar, Clock, Tag } from 'lucide-react';

interface PostMetaProps {
  date: string;
  readingTime: number;
  tags: string[];
  type: 'negative' | 'fix' | 'opinion';
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

export default function PostMeta({ date, readingTime, tags, type }: PostMetaProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 mb-6">
      <span
        className={`px-4 py-1.5 rounded-full text-sm font-semibold border ${typeColors[type]}`}
      >
        {typeLabels[type]}
      </span>
      
      <div className="flex items-center gap-2 text-gray-500">
        <Calendar className="w-4 h-4" />
        <span className="text-sm">{formatDate(date)}</span>
      </div>
      
      <div className="flex items-center gap-2 text-gray-500">
        <Clock className="w-4 h-4" />
        <span className="text-sm">{readingTime} min read</span>
      </div>

      <div className="flex flex-wrap gap-2 ml-auto">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
          >
            <Tag className="w-3 h-3" />
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}