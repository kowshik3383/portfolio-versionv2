import { ReactNode } from 'react';

export const metadata = {
  title: 'Blog | Portfolio',
  description: 'Insights, tutorials, and opinions on web development',
};

interface BlogLayoutProps {
  children: ReactNode;
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return children;
}
