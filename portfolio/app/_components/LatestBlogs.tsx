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
            className="relative py-20 sm:py-28 overflow-hidden border-t border-[#E8E3DA] bg-[#FAF8F5]"
        >
            <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" ref={containerRef}>
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
                    <div>
                        <SectionTitle title="TECHNICAL ARTICLES &amp; RESEARCH" />
                        <p className="font-mono text-xs uppercase tracking-widest text-[#68645E] -mt-5">
                            Deep-dives into systems engineering, performance &amp; architecture
                        </p>
                    </div>

                    <TransitionLink
                        href="/blog"
                        className="group inline-flex items-center gap-2 text-sm font-semibold text-[#0E7490] hover:opacity-80 transition-opacity self-start md:self-auto font-mono"
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
                            className="blog-home-card group flex flex-col rounded-2xl overflow-hidden border border-[#E8E3DA] bg-white hover:bg-[#FAF8F5]/60 hover:border-[#0E7490]/40 transition-all duration-300 shadow-sm"
                        >
                            <div className="aspect-[16/10] relative overflow-hidden bg-[#FAF8F5]">
                                <Image
                                    src={post.coverImage}
                                    alt={post.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                />
                                <div className="absolute top-3 left-3">
                                    <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-white/95 backdrop-blur-md text-[#191715] border border-[#E8E3DA] shadow-2xs font-mono">
                                        {post.category}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-xs text-[#68645E] font-mono">
                                        <div className="flex items-center gap-1">
                                            <Calendar size={12} className="text-[#0E7490]" />
                                            <span>{formatDate(post.publishedAt)}</span>
                                        </div>
                                        <span>•</span>
                                        <div className="flex items-center gap-1">
                                            <Clock size={12} className="text-[#0E7490]" />
                                            <span>{post.readingTime}</span>
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-anton tracking-tight text-[#191715] group-hover:text-[#0E7490] transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>

                                    <p className="text-xs sm:text-sm text-[#68645E] font-light leading-relaxed line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                </div>

                                <div className="pt-3 border-t border-[#E8E3DA] flex items-center justify-between">
                                    <div className="flex gap-1.5 overflow-hidden">
                                        {post.tags.slice(0, 2).map((t) => (
                                            <span
                                                key={t}
                                                className="text-[10px] font-mono text-[#68645E] bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#E8E3DA]"
                                            >
                                                #{t}
                                            </span>
                                        ))}
                                    </div>

                                    <span className="text-xs font-semibold text-[#0E7490] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform font-mono">
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
