'use client';

import { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface InlineCTAProps {
  children: ReactNode;
  action?: string;
  href?: string;
  variant?: 'default' | 'primary' | 'secondary';
}

const variants = {
  default: {
    container: 'bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-200',
    button: 'bg-gray-900 text-white hover:bg-gray-800',
  },
  primary: {
    container: 'bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200',
    button: 'bg-blue-600 text-white hover:bg-blue-700',
  },
  secondary: {
    container: 'bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200',
    button: 'bg-green-600 text-white hover:bg-green-700',
  },
};

export default function InlineCTA({
  children,
  action = 'Learn More',
  href,
  variant = 'default',
}: InlineCTAProps) {
  const variantStyles = variants[variant];

  const buttonContent = (
    <span className="inline-flex items-center gap-2">
      {action}
      <ArrowRight className="w-4 h-4" />
    </span>
  );

  return (
    <div className={`${variantStyles.container} rounded-lg p-6 my-8 text-center`}>
      <p className="text-gray-800 font-medium mb-4">{children}</p>
      {href ? (
        <Link
          href={href}
          className={`inline-flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${variantStyles.button}`}
        >
          {buttonContent}
        </Link>
      ) : (
        <button
          className={`inline-flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${variantStyles.button}`}
        >
          {buttonContent}
        </button>
      )}
    </div>
  );
}