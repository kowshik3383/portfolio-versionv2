export function stripDateFromSlug(slug: string): string {
  const datePattern = /^\d{4}-\d{2}-\d{2}-/;
  return slug.replace(datePattern, '');
}

export function filterBlogsByType(blogs: any[], type: string): any[] {
  return blogs.filter((blog) => blog.type === type);
}

export function filterBlogsByTag(blogs: any[], tag: string): any[] {
  return blogs.filter((blog) => blog.tags.includes(tag));
}

export function getUniqueTags(blogs: any[]): string[] {
  const tags = blogs.flatMap((blog) => blog.tags);
  return Array.from(new Set(tags));
}

export function getBlogByCleanSlug(cleanSlug: string, allBlogs: any[]): any {
  for (const blog of allBlogs) {
    const strippedSlug = stripDateFromSlug(blog.slug);
    if (strippedSlug === cleanSlug) {
      return blog;
    }
  }
  return null;
}