import { ReactNode } from 'react';

interface BlogShellProps {
  children: ReactNode;
  className?: string;
}

export default function BlogShell({ children, className = '' }: BlogShellProps) {
  return (
    <article className={`min-h-screen bg-white ${className}`}>
      {children}
    </article>
  );
}