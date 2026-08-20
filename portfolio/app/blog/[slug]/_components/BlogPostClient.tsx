'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import parse from 'html-react-parser';
import { IBlogPost } from '@/types';
import TransitionLink from '@/components/TransitionLink';
import {
    ArrowLeft,
    Calendar,
    Clock,
    Share2,
    Check,
    Twitter,
    Linkedin,
    ChevronRight,
    ArrowUpRight,
    List,
    Sparkles,
    FolderGit2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface Props {
    post: IBlogPost;
    relatedPosts: IBlogPost[];
}

const BlogPostClient = ({ post, relatedPosts }: Props) => {
    const [copied, setCopied] = useState(false);
    const [activeSection, setActiveSection] = useState<string>('');
    const [readingProgress, setReadingProgress] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Reading progress calculation & active section spy
    useEffect(() => {
        const handleScroll = () => {
            const totalHeight =
                document.documentElement.scrollHeight - window.innerHeight;
            if (totalHeight > 0) {
                const progress = (window.scrollY / totalHeight) * 100;
                setReadingProgress(Math.min(100, Math.max(0, progress)));
            }

            // Spy on headings
            if (post.tableOfContents && post.tableOfContents.length > 0) {
                const scrollPos = window.scrollY + 200;
                for (let i = post.tableOfContents.length - 1; i >= 0; i--) {
                    const el = document.getElementById(post.tableOfContents[i].id);
                    if (el && el.offsetTop <= scrollPos) {
                        setActiveSection(post.tableOfContents[i].id);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [post]);

    useGSAP(
        () => {
            gsap.from('.fade-in-article', {
                opacity: 0,
                y: 25,
                duration: 0.6,
                stagger: 0.08,
                ease: 'power2.out',
            });
        },
        { scope: containerRef }
    );

    const handleCopy = () => {
        if (typeof window !== 'undefined') {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        }
    };

    const handleShareTwitter = () => {
        if (typeof window !== 'undefined') {
            const url = encodeURIComponent(window.location.href);
            const text = encodeURIComponent(`Check out "${post.title}" by @kowshik3383`);
            window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
        }
    };

    const handleShareLinkedIn = () => {
        if (typeof window !== 'undefined') {
            const url = encodeURIComponent(window.location.href);
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
        }
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <article className="min-h-screen pt-20 pb-24 relative" ref={containerRef}>
            {/* Top Reading Progress Bar */}
            <div
                className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary z-50 transition-all duration-150"
                style={{ width: `${readingProgress}%` }}
            />

            {/* Ambient glows */}
            <div className="absolute top-10 left-1/3 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />

            <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumbs */}
                <nav
                    aria-label="Breadcrumb"
                    className="fade-in-article flex items-center gap-2 text-xs text-muted-foreground mb-8 pt-4 overflow-x-auto"
                >
                    <TransitionLink
                        href="/"
                        className="hover:text-primary transition-colors whitespace-nowrap"
                    >
                        Home
                    </TransitionLink>
                    <ChevronRight size={12} />
                    <TransitionLink
                        href="/blog"
                        className="hover:text-primary transition-colors whitespace-nowrap"
                    >
                        Blog
                    </TransitionLink>
                    <ChevronRight size={12} />
                    <span className="text-foreground/80 font-medium truncate max-w-[200px] sm:max-w-md">
                        {post.title}
                    </span>
                </nav>

                {/* Back Button */}
                <div className="fade-in-article mb-8">
                    <TransitionLink
                        href="/blog"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
                    >
                        <ArrowLeft
                            size={16}
                            className="group-hover:-translate-x-1 transition-transform"
                        />
                        <span>Back to all articles</span>
                    </TransitionLink>
                </div>

                {/* Article Header */}
                <header className="fade-in-article space-y-6 mb-12">
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-primary/20 text-primary border border-primary/30 font-mono uppercase tracking-wider">
                            {post.category}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Calendar size={13} />
                            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                        </div>
                        <span className="text-muted-foreground">•</span>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Clock size={13} />
                            <span>{post.readingTime}</span>
                        </div>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-anton tracking-tight text-white uppercase leading-[1.1]">
                        {post.title}
                    </h1>

                    {/* Author & Share Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-white/10">
                        <div className="flex items-center gap-3">
                            <div className="size-11 rounded-full overflow-hidden relative border border-white/10 bg-background-light">
                                <Image
                                    src={post.author.avatar}
                                    alt={post.author.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-white">
                                    {post.author.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {post.author.role}
                                </p>
                            </div>
                        </div>

                        {/* Social Share buttons */}
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground mr-1 hidden sm:inline">
                                Share:
                            </span>
                            <button
                                onClick={handleShareTwitter}
                                title="Share on Twitter / X"
                                className="size-9 rounded-full bg-white/5 border border-white/10 hover:border-primary/50 hover:text-primary flex items-center justify-center transition-colors text-muted-foreground"
                            >
                                <Twitter size={15} />
                            </button>
                            <button
                                onClick={handleShareLinkedIn}
                                title="Share on LinkedIn"
                                className="size-9 rounded-full bg-white/5 border border-white/10 hover:border-primary/50 hover:text-primary flex items-center justify-center transition-colors text-muted-foreground"
                            >
                                <Linkedin size={15} />
                            </button>
                            <button
                                onClick={handleCopy}
                                title="Copy link"
                                className="px-3 h-9 rounded-full bg-white/5 border border-white/10 hover:border-primary/50 hover:text-primary flex items-center gap-1.5 transition-colors text-xs text-muted-foreground"
                            >
                                {copied ? (
                                    <>
                                        <Check size={14} className="text-primary" />
                                        <span className="text-primary font-medium">Copied</span>
                                    </>
                                ) : (
                                    <>
                                        <Share2 size={14} />
                                        <span>Copy Link</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </header>

                {/* Hero Cover Image */}
                <div className="fade-in-article mb-14 rounded-2xl overflow-hidden aspect-[16/9] sm:aspect-[21/9] relative border border-white/10 shadow-2xl">
                    <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 1000px"
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                </div>

                {/* Main Content Layout: Grid with Sticky TOC sidebar */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Sticky Table of Contents Sidebar */}
                    {post.tableOfContents && post.tableOfContents.length > 0 && (
                        <aside className="lg:col-span-4 hidden lg:block">
                            <div className="sticky top-28 space-y-6 p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
                                <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-muted-foreground uppercase pb-3 border-b border-white/10">
                                    <List size={14} className="text-primary" />
                                    <span>TABLE OF CONTENTS</span>
                                </div>
                                <nav className="space-y-2">
                                    {post.tableOfContents.map((item) => (
                                        <a
                                            key={item.id}
                                            href={`#${item.id}`}
                                            className={cn(
                                                'block text-xs leading-snug transition-all duration-200 py-1 pl-2 border-l-2',
                                                activeSection === item.id
                                                    ? 'border-primary text-primary font-medium pl-3'
                                                    : 'border-transparent text-muted-foreground hover:text-white hover:border-white/20'
                                            )}
                                        >
                                            {item.title}
                                        </a>
                                    ))}
                                </nav>

                                {/* Mini Author Info in Sidebar */}
                                <div className="pt-6 border-t border-white/10 space-y-3">
                                    <div className="text-xs font-mono text-muted-foreground uppercase">
                                        About Author
                                    </div>
                                    <p className="text-xs text-muted-foreground/90 leading-relaxed">
                                        {post.author.bio}
                                    </p>
                                </div>
                            </div>
                        </aside>
                    )}

                    {/* Main Content Body */}
                    <div
                        className={cn(
                            'prose prose-invert max-w-none space-y-6 text-foreground/90 leading-relaxed',
                            post.tableOfContents && post.tableOfContents.length > 0
                                ? 'lg:col-span-8'
                                : 'lg:col-span-12'
                        )}
                    >
                        {parse(post.content)}

                        {/* High-Conversion Project Spotlight CTA */}
                        {post.relatedProjectSlug && (
                            <div className="my-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-primary/15 via-white/[0.03] to-transparent border border-primary/30 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                                    <FolderGit2 className="size-28 text-primary" />
                                </div>
                                <div className="relative z-10 space-y-3">
                                    <div className="flex items-center gap-2">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-primary text-black">
                                            <Sparkles size={13} />
                                            Production Case Study
                                        </span>
                                    </div>
                                    <h4 className="text-xl sm:text-2xl font-anton text-white tracking-wide">
                                        {post.relatedProjectTitle || 'Explore the Production Implementation'}
                                    </h4>
                                    <p className="text-sm text-muted-foreground/90 max-w-xl leading-relaxed">
                                        {post.relatedProjectDescription ||
                                            'See how these architectural patterns, performance benchmarks, and engineering decisions were executed in production.'}
                                    </p>
                                    <div className="pt-2">
                                        <TransitionLink
                                            href={`/projects/${post.relatedProjectSlug}`}
                                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-black font-semibold text-xs tracking-wide hover:opacity-90 transition-opacity uppercase font-mono"
                                        >
                                            View Project Case Study
                                            <ArrowUpRight size={15} />
                                        </TransitionLink>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Article Tags */}
                        <div className="pt-10 mt-12 border-t border-white/10">
                            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">
                                Related Topics &amp; Technologies
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-foreground/80 font-mono"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Author Bio Card */}
                        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row gap-5 items-start">
                            <div className="size-16 rounded-full overflow-hidden relative border border-primary/40 shrink-0">
                                <Image
                                    src={post.author.avatar}
                                    alt={post.author.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-bold text-white">
                                        {post.author.name}
                                    </h3>
                                    <span className="text-xs font-mono text-primary">
                                        Author
                                    </span>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    {post.author.role}
                                </p>
                                <p className="text-sm text-muted-foreground/90 leading-relaxed pt-1">
                                    {post.author.bio}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Articles Section */}
                {relatedPosts.length > 0 && (
                    <section className="mt-20 pt-16 border-t border-white/10">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl sm:text-3xl font-anton tracking-tight text-white uppercase">
                                Recommended <span className="text-primary">Articles</span>
                            </h2>
                            <TransitionLink
                                href="/blog"
                                className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
                            >
                                View all <ArrowUpRight size={14} />
                            </TransitionLink>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedPosts.map((relPost) => (
                                <TransitionLink
                                    key={relPost.slug}
                                    href={`/blog/${relPost.slug}`}
                                    className="group rounded-xl overflow-hidden border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-primary/40 transition-all p-5 flex flex-col justify-between space-y-4"
                                >
                                    <div className="space-y-2">
                                        <span className="text-[11px] font-mono text-primary">
                                            {relPost.category}
                                        </span>
                                        <h3 className="text-base font-anton text-white group-hover:text-primary transition-colors line-clamp-2">
                                            {relPost.title}
                                        </h3>
                                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                                            {relPost.excerpt}
                                        </p>
                                    </div>
                                    <div className="text-[11px] text-muted-foreground flex items-center justify-between pt-2 border-t border-white/5">
                                        <span>{relPost.readingTime}</span>
                                        <span className="text-primary font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                            Read <ChevronRight size={12} />
                                        </span>
                                    </div>
                                </TransitionLink>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </article>
    );
};

export default BlogPostClient;
