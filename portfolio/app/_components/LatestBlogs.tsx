'use client';

import React, { useRef } from 'react';
import TransitionLink from '@/components/TransitionLink';
import { BLOG_POSTS } from '@/lib/blogs';
import { ArrowRight } from 'lucide-react';
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
                { y: 35, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.15,
                    duration: 0.7,
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
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-[11px] font-mono text-[#0064E0] font-medium mb-3">
                            <span className="size-1.5 rounded-full bg-[#0064E0] animate-pulse" />
                            <span>STAY IN THE KNOW</span>
                        </div>
                        <h2 className="font-outfit text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0A1317]">
                            Technical Articles &amp; Research
                        </h2>
                        <p className="text-sm sm:text-base text-[#4E606F] font-normal mt-2">
                            Deep-dives into systems engineering, performance budgets &amp; architecture
                        </p>
                    </div>

                    <TransitionLink
                        href="/blog"
                        className="group inline-flex items-center gap-2 text-sm font-semibold text-[#0064E0] hover:text-[#0052B3] transition-colors self-start md:self-auto font-sans"
                    >
                        <span>View all posts</span>
                        <ArrowRight
                            size={16}
                            className="group-hover:translate-x-1 transition-transform"
                        />
                    </TransitionLink>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {recentPosts.map((post) => (
                        <TransitionLink
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="blog-home-card group flex flex-col rounded-3xl overflow-hidden border border-[#E8E3DA] bg-white hover:bg-[#FAF8F5]/60 hover:border-[#0064E0]/40 transition-all duration-300 shadow-xs hover:shadow-md"
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
                                    <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-white/95 backdrop-blur-md text-[#0A1317] border border-[#E8E3DA] shadow-2xs font-sans">
                                        {post.category}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between space-y-4">
                                <div className="space-y-3">
                                    {/* Author and Metadata (Astryx pattern) */}
                                    <div className="flex items-center justify-between text-xs text-[#4E606F] font-mono">
                                        <span>{post.author?.name || 'Kowshik V'}</span>
                                        <span>{formatDate(post.publishedAt)} · {post.readingTime}</span>
                                    </div>

                                    <h3 className="text-xl font-outfit font-bold tracking-tight text-[#0A1317] group-hover:text-[#0064E0] transition-colors line-clamp-2 leading-snug">
                                        {post.title}
                                    </h3>

                                    <p className="text-sm text-[#4E606F] font-normal leading-relaxed line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                </div>

                                <div className="pt-4 border-t border-[#F0ECE4] flex items-center justify-between">
                                    <div className="flex gap-1.5 overflow-hidden">
                                        {post.tags.slice(0, 2).map((t) => (
                                            <span
                                                key={t}
                                                className="text-[10px] font-mono text-[#4E606F] bg-[#FAF8F5] px-2 py-0.5 rounded-full border border-[#E8E3DA]"
                                            >
                                                #{t}
                                            </span>
                                        ))}
                                    </div>

                                    <span className="text-xs font-semibold text-[#0064E0] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform font-sans">
                                        Read post <ArrowRight size={13} />
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
