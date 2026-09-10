export type Next_Page_Url = string;

export type Variant =
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'light'
    | 'dark'
    | 'link'
    | 'no-color';

export interface IExperience {
    title: string;
    company: string;
    duration: string;
    highlights?: string[];
    description?: string;
}

export interface IProject {
    slug: string;
    title: string;
    year?: number;
    description: string;
    role?: string;
    tags?: string[];
    techStack: string[];
    thumbnail: string;
    longThumbnail?: string;
    images: string[];
    link: string;
    liveUrl: string;
    sourceCode?: string;
    details?: {
        overview: string;
        features: string[];
        challenges?: string;
        outcome?: string;
    };
}

export interface ITableOfContentsItem {
    id: string;
    title: string;
    level: 2 | 3;
}

export interface IBlogAuthor {
    name: string;
    role: string;
    avatar: string;
    bio?: string;
    github?: string;
    linkedin?: string;
    twitter?: string;
}

export interface IBlogPost {
    slug: string;
    title: string;
    metaTitle: string;
    metaDescription: string;
    excerpt: string;
    content: string;
    coverImage: string;
    publishedAt: string;
    updatedAt?: string;
    readingTime: string;
    category: string;
    tags: string[];
    keywords: string[];
    featured?: boolean;
    author: IBlogAuthor;
    tableOfContents: ITableOfContentsItem[];
    relatedProjectSlug?: string;
    relatedProjectTitle?: string;
    relatedProjectDescription?: string;
}
