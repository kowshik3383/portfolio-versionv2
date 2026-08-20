'use client';

import React, { useRef } from 'react';
import SectionTitle from '@/components/SectionTitle';
import TransitionLink from '@/components/TransitionLink';
import { BLOG_POSTS } from '@/lib/blogs';
import { Calendar, Clock, ArrowRight, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const LatestBlogs = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const recentPosts = BLOG_POSTS.slice(0, 3);

    useGSAP(
        () => {
            gsap.fromTo(
                '.blog-home-card',
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.2,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 75%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        },
        { scope: containerRef }
    );

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <section
            id="latest-blogs"
            className="relative py-24 sm:py-32 overflow-hidden border-t border-white/5"
        >
            <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" ref={containerRef}>
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <SectionTitle title="LATEST ARTICLES" />
                        <p className="font-mono text-sm tracking-wide text-neutral-400 -mt-6">
                            Technical deep-dives, architectural thoughts &amp; modern web engineering
                        </p>
                    </div>

                    <TransitionLink
                        href="/blog"
                        className="group inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors self-start md:self-auto"
                    >
                        <span>Explore all articles</span>
                        <ArrowUpRight
                            size={16}
                            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                        />
                    </TransitionLink>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {recentPosts.map((post) => (
                        <TransitionLink
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="blog-home-card group flex flex-col rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-primary/40 transition-all duration-300"
                        >
                            <div className="aspect-[16/10] relative overflow-hidden bg-background-light">
                                <Image
                                    src={post.coverImage}
                                    alt={post.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                />
                                <div className="absolute top-3 left-3">
                                    <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-black/70 backdrop-blur-md text-white border border-white/10">
                                        {post.category}
                                    </span>
                                </div>
                            </div>

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

                                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
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
            </div>
        </section>
    );
};

export default LatestBlogs;
