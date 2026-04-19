'use client';

import { ReactNode } from 'react';
import { Info, AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';

interface CalloutProps {
  children: ReactNode;
  type?: 'info' | 'warning' | 'danger' | 'success';
  title?: string;
}

const variants = {
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-500',
    icon: Info,
    iconColor: 'text-blue-500',
    titleColor: 'text-blue-900',
    textColor: 'text-blue-800',
  },
  warning: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-500',
    icon: AlertTriangle,
    iconColor: 'text-yellow-500',
    titleColor: 'text-yellow-900',
    textColor: 'text-yellow-800',
  },
  danger: {
    bg: 'bg-red-50',
    border: 'border-red-500',
    icon: AlertCircle,
    iconColor: 'text-red-500',
    titleColor: 'text-red-900',
    textColor: 'text-red-800',
  },
  success: {
    bg: 'bg-green-50',
    border: 'border-green-500',
    icon: CheckCircle,
    iconColor: 'text-green-500',
    titleColor: 'text-green-900',
    textColor: 'text-green-800',
  },
};

export default function Callout({ children, type = 'info', title }: CalloutProps) {
  const variant = variants[type];
  const Icon = variant.icon;

  return (
    <div className={`${variant.bg} border-l-4 ${variant.border} p-6 my-6 rounded-r-lg`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 ${variant.iconColor} shrink-0 mt-0.5`} />
        <div className="flex-1">
          {title && (
            <div className={`font-semibold ${variant.titleColor} mb-2`}>{title}</div>
          )}
          <div className={`text-sm ${variant.textColor}`}>{children}</div>
        </div>
      </div>
    </div>
  );
}