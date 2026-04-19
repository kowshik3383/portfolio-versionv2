import { HelpCircle } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export default function EmptyState({
  title = 'No posts found',
  description = "We couldn't find any posts matching your criteria. Try adjusting your filters or check back later.",
  action,
}: EmptyStateProps) {
  return (
    <div className="text-center py-16 px-4">
      <div className="text-gray-300 mb-6">
        <HelpCircle className="w-16 h-16 mx-auto" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 mb-6 max-w-md mx-auto">{description}</p>
      {action && <div className="flex justify-center">{action}</div>}
    </div>
  );
}