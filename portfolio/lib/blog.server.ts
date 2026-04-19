import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const blogsDirectory = path.join(process.cwd(), 'content/blogs');

export function getBlogSlugs(): string[] {
  if (!fs.existsSync(blogsDirectory)) {
    return [];
  }
  return fs.readdirSync(blogsDirectory).filter((file) => file.endsWith('.mdx'));
}

export function getAllBlogMetadata(): any[] {
  const slugs = getBlogSlugs();
  const blogs = slugs
    .map((slug) => {
      const realSlug = slug.replace(/\.mdx$/, '');
      const fullPath = path.join(blogsDirectory, `${realSlug}.mdx`);

      if (!fs.existsSync(fullPath)) {
        return null;
      }

      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug: realSlug,
        title: data.title as string,
        description: data.description as string,
        date: data.date as string,
        tags: data.tags as string[],
        type: data.type as 'negative' | 'fix' | 'opinion',
      };
    })
    .filter((blog): blog is any => blog !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return blogs;
}

export function getBlogBySlug(slug: string): any {
  let realSlug = slug.replace(/\.mdx$/, '');
  let fullPath = path.join(blogsDirectory, `${realSlug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    realSlug = slug.replace(/^\d{4}-\d{2}-\d{2}-/, '');
    const slugs = getBlogSlugs();
    const matchingSlug = slugs.find((s) => {
      const stripped = s.replace(/\.mdx$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
      return stripped === realSlug;
    });
    if (matchingSlug) {
      realSlug = matchingSlug.replace(/\.mdx$/, '');
      fullPath = path.join(blogsDirectory, `${realSlug}.mdx`);
    }
  }

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    title: data.title as string,
    description: data.description as string,
    date: data.date as string,
    tags: data.tags as string[],
    type: data.type as 'negative' | 'fix' | 'opinion',
    content,
  };
}