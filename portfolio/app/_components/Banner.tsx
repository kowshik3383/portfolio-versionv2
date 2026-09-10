'use client';
import ArrowAnimation from '@/components/ArrowAnimation';
import Button from '@/components/Button';
import { GENERAL_INFO } from '@/lib/data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React, { useRef } from 'react';
import { ArrowUpRight, Smartphone, Layers, Terminal, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Banner = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Smooth subtle parallax slide-up on scroll
    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'bottom 80%',
                    end: 'bottom 15%',
                    scrub: 1,
                },
            });

            tl.fromTo(
                '.slide-up-and-fade',
                { y: 0, opacity: 1 },
                { y: -60, opacity: 0, stagger: 0.02 },
            );
        },
        { scope: containerRef },
    );

    return (
        <section
            className="relative h-[100svh] min-h-[560px] max-h-[1080px] flex flex-col justify-between overflow-hidden pt-16 pb-6 sm:pt-20 sm:pb-8"
            id="banner"
        >
            <ArrowAnimation />

            {/* Subtle atmospheric ambient glow */}
            <div className="absolute top-1/4 -left-32 w-80 h-80 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

            <div
                className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-between relative z-10"
                ref={containerRef}
            >
                {/* Top: Status / Identity chip */}
                <div className="slide-up-and-fade pt-2">
                    <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md text-xs font-mono text-neutral-300">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                        </span>
                        <span>Available for full-time &amp; contract engineering</span>
                    </div>
                </div>

                {/* Center: Main Display & Core Value */}
                <div className="my-auto py-3 sm:py-4">
                    {/* Primary Uncluttered Headline */}
                    <h1 className="slide-up-and-fade font-anton text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] xl:text-[5.5rem] tracking-tight leading-[0.95] text-white uppercase max-w-5xl">
                        Engineering{' '}
                        <span className="bg-gradient-to-r from-cyan-300 via-teal-200 to-emerald-300 bg-clip-text text-transparent">
                            Web Platforms
                        </span>{' '}
                        &amp;{' '}
                        <span className="bg-gradient-to-r from-teal-200 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
                            React Native
                        </span>{' '}
                        Mobile Apps.
                    </h1>

                    {/* Clear, focused description */}
                    <p className="slide-up-and-fade mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-neutral-300 font-light leading-relaxed max-w-2xl">
                        Hi, I&apos;m <span className="text-white font-medium">Kowshik Valipireddy</span>. A full-stack developer and mobile engineer crafting high-performance, resilient applications with React, Next.js, React Native, and Node.js.
                    </p>

                    {/* CTAs */}
                    <div className="slide-up-and-fade flex flex-wrap items-center gap-3 sm:gap-4 mt-6 sm:mt-8">
                        <Button
                            as="link"
                            href="#selected-projects"
                            variant="primary"
                            className="banner-button px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-cyan-500/20 transition-all text-sm"
                        >
                            <span>Explore Projects</span>
                        </Button>

                        <Button
                            as="link"
                            target="_blank"
                            rel="noopener noreferrer"
                            href={GENERAL_INFO.upworkProfile}
                            variant="outline"
                            className="banner-button  px-6 py-3 rounded-xl font-medium border-white/15 hover:border-white/40 transition-colors text-sm inline-flex items-center gap-2"
                        >
                            <span>Let&apos;s Connect</span>
                            <ArrowUpRight size={15} />
                        </Button>
                    </div>
                </div>

                {/* Bottom: Quiet craft tags & scroll hint */}
                <div className="slide-up-and-fade pt-3 pb-1 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-neutral-400">
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                        <div className="flex items-center gap-1.5">
                            <Layers size={13} className="text-cyan-400" />
                            <span>Next.js 15 &amp; React 19</span>
                        </div>
                        <span className="text-neutral-700 hidden sm:inline">•</span>
                        <div className="flex items-center gap-1.5">
                            <Smartphone size={13} className="text-teal-400" />
                            <span>React Native (iOS &amp; Android)</span>
                        </div>
                        <span className="text-neutral-700 hidden sm:inline">•</span>
                        <div className="flex items-center gap-1.5">
                            <Terminal size={13} className="text-emerald-400" />
                            <span>Node.js &amp; PostgreSQL</span>
                        </div>
                    </div>

                    <a
                        href="#about-me"
                        className="hidden md:inline-flex items-center gap-1 text-neutral-400 hover:text-white transition-colors"
                    >
                        <span>Scroll down</span>
                        <ChevronDown size={14} className="animate-bounce" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Banner;