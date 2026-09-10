'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React, { useRef } from 'react';
import SectionTitle from '@/components/SectionTitle';
import { Code, Smartphone, Zap, CheckCircle2, MapPin, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const HIGHLIGHTS = [
    {
        icon: Smartphone,
        title: 'Mobile & Web Convergence',
        description: 'Building seamless cross-platform React Native apps and Next.js platforms with shared TypeScript logic and clean design systems.',
    },
    {
        icon: Zap,
        title: 'Performance & 60fps Interactions',
        description: 'Obsessed with sub-second LCP, zero-CLS layout stability, and fluid native gesture-driven animations.',
    },
    {
        icon: Code,
        title: 'End-to-End Product Craft',
        description: 'From UI/UX architecture to PostgreSQL schemas, NestJS/Node APIs, and reliable cloud deployments.',
    },
];

const CORE_CAPABILITIES = [
    'Full Stack Web (React 19 & Next.js 15 App Router)',
    'Cross-Platform Mobile Apps (React Native & Expo)',
    'Scalable APIs & Microservices (Node.js & NestJS)',
    'Database Architecture (PostgreSQL, MySQL & Prisma)',
];

const AboutMe = () => {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.fromTo(
                '.about-fade',
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.15,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: container.current,
                        start: 'top 75%',
                        toggleActions: 'play none none reverse',
                    },
                },
            );
        },
        { scope: container },
    );

    return (
        <section className="relative py-24 sm:py-32 overflow-hidden border-t border-white/5" id="about-me">
            {/* Ambient background glow */}
            <div className="absolute top-1/2 -right-40 w-96 h-96 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none -z-10" />

            <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" ref={container}>
                <div className="mb-16">
                    <SectionTitle title="ABOUT ME" />
                    <p className="font-mono text-sm tracking-wide text-neutral-400 -mt-6">
                        Philosophy, engineering discipline &amp; craftsmanship
                    </p>
                </div>

                {/* Hero Statement */}
                <div className="about-fade mb-16 sm:mb-20 max-w-4xl">
                    <h2 className="text-3xl sm:text-5xl md:text-6xl font-anton tracking-tight text-white leading-[1.05]">
                        I design and build with users at the center — every engineering decision driven by{' '}
                        <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                            real usability &amp; speed
                        </span>
                        , not assumptions.
                    </h2>
                </div>

                {/* 2-Column Content Grid - Equal Height and Balanced Weight */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
                    {/* Left Column: Rich Engineering Identity & Metrics Bento Card */}
                    <div className="lg:col-span-5 flex flex-col">
                        <div className="about-fade h-full flex flex-col justify-between p-7 sm:p-9 rounded-2xl bg-white/[0.02] hover:bg-white/[0.035] border border-white/10 hover:border-cyan-400/30 transition-all duration-300 relative overflow-hidden backdrop-blur-md">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

                            {/* Top Bio Header */}
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-xs font-mono text-cyan-400 font-medium">
                                    <Sparkles size={13} />
                                    <span>Full Stack &amp; Mobile Engineer</span>
                                </div>

                                <h3 className="text-3xl sm:text-4xl font-anton text-white tracking-tight">
                                    Kowshik Valipireddy
                                </h3>

                                <p className="text-sm text-neutral-300 font-light leading-relaxed">
                                    Bridging the gap between design fidelity and robust systems architecture across web and mobile platforms.
                                </p>
                            </div>

                            {/* Middle 4-Stat Metric Matrix */}
                            <div className="my-6 pt-6 border-t border-white/10 grid grid-cols-2 gap-4 sm:gap-5">
                                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                                    <div className="text-2xl sm:text-3xl font-anton text-white">2+</div>
                                    <p className="text-xs text-neutral-400 font-mono mt-0.5">Years Experience</p>
                                </div>
                                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                                    <div className="text-2xl sm:text-3xl font-anton text-cyan-400">30+</div>
                                    <p className="text-xs text-neutral-400 font-mono mt-0.5">Completed Projects</p>
                                </div>
                                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                                    <div className="text-2xl sm:text-3xl font-anton text-emerald-400">100%</div>
                                    <p className="text-xs text-neutral-400 font-mono mt-0.5">Code Reliability</p>
                                </div>
                                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                                    <div className="text-2xl sm:text-3xl font-anton text-teal-300">Web &amp; App</div>
                                    <p className="text-xs text-neutral-400 font-mono mt-0.5">Dual Expertise</p>
                                </div>
                            </div>

                            {/* Core Capabilities Checklist */}
                            <div className="space-y-2.5 pb-6 border-b border-white/10">
                                <p className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                                    Core Focus Areas
                                </p>
                                <div className="space-y-2">
                                    {CORE_CAPABILITIES.map((cap) => (
                                        <div key={cap} className="flex items-start gap-2 text-xs text-neutral-300">
                                            <CheckCircle2 size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                                            <span>{cap}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Bottom Availability Status */}
                            <div className="pt-4 flex items-center justify-between text-xs font-mono text-neutral-400">
                                <div className="flex items-center gap-2">
                                    <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                                    <span>Available for Hire</span>
                                </div>
                                <div className="flex items-center gap-1 text-neutral-400">
                                    <MapPin size={12} className="text-cyan-400" />
                                    <span>India (Remote)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Bio Narrative & Pillars */}
                    <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                        <div className="about-fade p-7 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md space-y-4">
                            <h4 className="text-xl font-anton text-white tracking-wide uppercase">
                                Engineering Craft &amp; Execution
                            </h4>
                            <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
                                I specialize in crafting complete digital solutions from whiteboard ideation to production deployment. I don&apos;t just write syntax — I convert complex product requirements into <strong className="text-white font-medium">fast, accessible, and resilient</strong> web platforms and cross-platform mobile apps.
                            </p>
                            <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
                                Whether building interactive web applications with <span className="text-white font-normal">Next.js 15 &amp; React 19</span>, fluid mobile gesture workflows with <span className="text-white font-normal">React Native &amp; Expo</span>, or scalable APIs with <span className="text-white font-normal">Node.js, PostgreSQL &amp; Prisma</span>, I prioritize performance, clean code architecture, and intuitive user experiences.
                            </p>
                        </div>

                        {/* Craft Pillars Bento */}
                        <div className="space-y-3.5">
                            {HIGHLIGHTS.map((h) => (
                                <div
                                    key={h.title}
                                    className="about-fade p-5 sm:p-6 rounded-xl bg-white/[0.015] hover:bg-white/[0.04] border border-white/5 hover:border-white/15 transition-all duration-300 flex items-start gap-4 sm:gap-5"
                                >
                                    <div className="p-3 rounded-lg bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 shrink-0">
                                        <h.icon size={20} />
                                    </div>
                                    <div className="space-y-1">
                                        <h5 className="text-base font-anton tracking-wide text-white">
                                            {h.title}
                                        </h5>
                                        <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                                            {h.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;