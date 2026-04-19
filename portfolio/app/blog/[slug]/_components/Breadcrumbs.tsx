import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
      <Link
        href="/"
        className="flex items-center gap-1 hover:text-gray-900 transition-colors"
      >
        <Home className="w-4 h-4" />
        <span className="sr-only">Home</span>
      </Link>
      
      <ChevronRight className="w-4 h-4 text-gray-400" />
      
      <Link
        href="/blog"
        className="hover:text-gray-900 transition-colors"
      >
        Blog
      </Link>
      
      {items.map((item, index) => (
        item.href ? (
          item.href !== '/blog' && (
            <>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link
                key={index}
                href={item.href}
                className="hover:text-gray-900 transition-colors"
              >
                {item.label}
              </Link>
            </>
          )
        ) : (
          <>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span key={index} className="text-gray-900 font-medium" aria-current="page">
              {item.label}
            </span>
          </>
        )
      ))}
    </nav>
  );
}