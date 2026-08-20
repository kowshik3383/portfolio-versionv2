'use client';

import React, { useState, useMemo, useRef } from 'react';
import Image from 'next/image';
import { IBlogPost } from '@/types';
import { Search, Calendar, Clock, ArrowRight, Tag, Sparkles, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import TransitionLink from '@/components/TransitionLink';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface Props {
    posts: IBlogPost[];
    categories: { name: string; count: number }[];
    tags: { name: string; count: number }[];
}

const BlogListClient = ({ posts, categories, tags }: Props) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [selectedTag, setSelectedTag] = useState<string>('All');
    const containerRef = useRef<HTMLDivElement>(null);

    const featuredPost = useMemo(() => {
        return posts.find((p) => p.featured) || posts[0];
    }, [posts]);

    const filteredPosts = useMemo(() => {
        return posts.filter((post) => {
            const matchesSearch =
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesCategory =
                selectedCategory === 'All' || post.category === selectedCategory;

            const matchesTag =
                selectedTag === 'All' || post.tags.includes(selectedTag);

            return matchesSearch && matchesCategory && matchesTag;
        });
    }, [posts, searchQuery, selectedCategory, selectedTag]);

    useGSAP(
        () => {
            gsap.from('.fade-in-blog', {
                opacity: 0,
                y: 30,
                duration: 0.6,
                stagger: 0.08,
                ease: 'power2.out',
            });
        },
        { scope: containerRef, dependencies: [filteredPosts, selectedCategory, selectedTag] }
    );

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <div className="min-h-screen pt-24 pb-20" ref={containerRef}>
            {/* Background ambient lighting */}
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="absolute top-80 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none -z-10" />

            <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header section */}
                <div className="max-w-3xl mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-primary font-mono mb-4">
                        <Sparkles size={13} className="text-primary" />
                        <span>ARTICLES & INSIGHTS</span>
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-anton tracking-tight text-white uppercase mb-4">
                        Engineering <span className="text-primary">Blog</span>
                    </h1>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        Deep dives into Full Stack Architecture, Next.js 15, AI Agent Engineering, Web Performance, and scalable system design.
                    </p>
                </div>

                {/* Featured Post Hero */}
                {featuredPost && selectedCategory === 'All' && selectedTag === 'All' && !searchQuery && (
                    <div className="mb-16">
                        <div className="text-xs uppercase font-mono tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
                            <BookOpen size={14} className="text-primary" />
                            <span>FEATURED ARTICLE</span>
                        </div>
                        <TransitionLink
                            href={`/blog/${featuredPost.slug}`}
                            className="group block relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-primary/50 transition-all duration-500"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 items-center">
                                <div className="lg:col-span-7 space-y-4">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/20 text-primary border border-primary/30">
                                            {featuredPost.category}
                                        </span>
                                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                            <Calendar size={13} />
                                            <span>{formatDate(featuredPost.publishedAt)}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                            <Clock size={13} />
                                            <span>{featuredPost.readingTime}</span>
                                        </div>
                                    </div>

                                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-anton tracking-tight text-white group-hover:text-primary transition-colors duration-300">
                                        {featuredPost.title}
                                    </h2>

                                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed line-clamp-3">
                                        {featuredPost.excerpt}
                                    </p>

                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {featuredPost.tags.slice(0, 4).map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-xs px-2.5 py-1 rounded-md bg-white/5 text-foreground/80 border border-white/5"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="pt-2">
                                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:translate-x-1.5 transition-transform duration-300">
                                            Read Full Article <ArrowRight size={16} />
                                        </span>
                                    </div>
                                </div>

                                <div className="lg:col-span-5 aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] rounded-xl overflow-hidden relative border border-white/10">
                                    <Image
                                        src={featuredPost.coverImage}
                                        alt={featuredPost.title}
                                        fill
                                        priority
                                        sizes="(max-width: 1024px) 100vw, 500px"
                                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                                </div>
                            </div>
                        </TransitionLink>
                    </div>
                )}

                {/* Filter and Search Bar */}
                <div className="mb-10 space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
                        {/* Category Selector */}
                        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
                            <button
                                onClick={() => {
                                    setSelectedCategory('All');
                                    setSelectedTag('All');
                                }}
                                className={cn(
                                    'px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 border',
                                    selectedCategory === 'All'
                                        ? 'bg-primary text-black border-primary font-bold'
                                        : 'bg-white/5 text-muted-foreground border-white/10 hover:border-white/20 hover:text-white'
                                )}
                            >
                                All Posts ({posts.length})
                            </button>
                            {categories.map((cat) => (
                                <button
                                    key={cat.name}
                                    onClick={() => {
                                        setSelectedCategory(cat.name);
                                        setSelectedTag('All');
                                    }}
                                    className={cn(
                                        'px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 border',
                                        selectedCategory === cat.name
                                            ? 'bg-primary text-black border-primary font-bold'
                                            : 'bg-white/5 text-muted-foreground border-white/10 hover:border-white/20 hover:text-white'
                                    )}
                                >
                                    {cat.name} ({cat.count})
                                </button>
                            ))}
                        </div>

                        {/* Search Input */}
                        <div className="relative min-w-[260px]">
                            <Search
                                size={16}
                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                            />
                            <input
                                type="text"
                                placeholder="Search articles or tags..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors"
                            />
                        </div>
                    </div>

                    {/* Tag Filter Pills */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-2">
                        <span className="text-xs text-muted-foreground mr-1 flex items-center gap-1">
                            <Tag size={12} /> Tags:
                        </span>
                        {tags.map((tag) => (
                            <button
                                key={tag.name}
                                onClick={() =>
                                    setSelectedTag(selectedTag === tag.name ? 'All' : tag.name)
                                }
                                className={cn(
                                    'px-2.5 py-0.5 rounded-full text-xs font-mono transition-colors border',
                                    selectedTag === tag.name
                                        ? 'bg-secondary text-black border-secondary font-bold'
                                        : 'bg-white/[0.03] text-foreground/70 border-white/5 hover:border-white/20'
                                )}
                            >
                                #{tag.name} ({tag.count})
                            </button>
                        ))}
                    </div>
                </div>

                {/* Blog Grid */}
                {filteredPosts.length === 0 ? (
                    <div className="py-20 text-center rounded-2xl border border-white/10 bg-white/[0.02]">
                        <p className="text-lg text-muted-foreground mb-4">
                            No articles found matching &quot;{searchQuery || selectedCategory}&quot;
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setSelectedCategory('All');
                                setSelectedTag('All');
                            }}
                            className="px-5 py-2 rounded-full bg-primary text-black text-sm font-semibold hover:opacity-90 transition-opacity"
                        >
                            Reset Filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPosts.map((post) => (
                            <TransitionLink
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                className="fade-in-blog group flex flex-col rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-primary/40 transition-all duration-300"
                            >
                                {/* Thumbnail */}
                                <div className="aspect-[16/10] relative overflow-hidden bg-background-light">
                                    <Image
                                        src={post.coverImage}
                                        alt={post.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                    />
                                    <div className="absolute top-3 left-3">
                                        <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-black/70 backdrop-blur-md text-white border border-white/10">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <Calendar size={12} />
                                                <span>{formatDate(post.publishedAt)}</span>
                                            </div>
                                            <span>•</span>
                                            <div className="flex items-center gap-1">
                                                <Clock size={12} />
                                                <span>{post.readingTime}</span>
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-anton tracking-tight text-white group-hover:text-primary transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>

                                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                                            {post.excerpt}
                                        </p>
                                    </div>

                                    <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                                        <div className="flex gap-1.5 overflow-hidden">
                                            {post.tags.slice(0, 2).map((t) => (
                                                <span
                                                    key={t}
                                                    className="text-[10px] font-mono text-muted-foreground/80 bg-white/5 px-2 py-0.5 rounded"
                                                >
                                                    #{t}
                                                </span>
                                            ))}
                                        </div>

                                        <span className="text-xs font-semibold text-primary inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                            Read <ArrowRight size={13} />
                                        </span>
                                    </div>
                                </div>
                            </TransitionLink>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogListClient;
