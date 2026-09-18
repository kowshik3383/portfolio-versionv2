'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Button from '@/components/Button';
import { GENERAL_INFO } from '@/lib/data';
import { trackEvent } from '@/lib/logrocket';
import { useLenis } from 'lenis/react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import {
    ArrowUpRight,
    ShieldCheck,
    CheckCircle2,
    Cpu,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface SprayCardProps {
    metric: string;
    title: string;
    sub: string;
    tag: string;
    iconSrc?: string;
    LucideIcon?: React.ElementType;
    className?: string;
    style?: React.CSSProperties;
}

const SprayCard: React.FC<SprayCardProps> = ({
    metric,
    title,
    sub,
    tag,
    iconSrc,
    LucideIcon,
    className = '',
    style,
}) => {
    return (
        <div
            style={style}
            className={`spray-card-item p-2 xl:p-2.5 rounded-2xl bg-white border border-[#E8E3DA] shadow-md shadow-neutral-900/5 flex items-center gap-2.5 transition-shadow duration-300 hover:shadow-xl hover:border-[#0E7490]/40 group select-none ${className}`}
        >
            <div className="size-8 xl:size-9 rounded-xl bg-[#FAF8F5] border border-[#E8E3DA] p-1.5 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                {iconSrc ? (
                    <Image
                        src={iconSrc}
                        alt={title}
                        width={18}
                        height={18}
                        className="object-contain"
                    />
                ) : LucideIcon ? (
                    <LucideIcon size={16} className="text-[#0E7490]" />
                ) : null}
            </div>
            <div className="min-w-0 flex-1 text-left">
                <div className="flex items-center gap-1.5">
                    <span className="font-anton text-sm xl:text-base text-[#191715] leading-none tracking-tight">
                        {metric}
                    </span>
                    <span className="size-1.5 rounded-full bg-emerald-500 shrink-0" />
                </div>
                <p className="font-mono text-[10.5px] font-semibold text-[#0E7490] truncate mt-0.5">
                    {title}
                </p>
                <div className="flex items-center justify-between gap-1 mt-0.5">
                    <p className="text-[9.5px] text-[#68645E] truncate leading-tight font-light">
                        {sub}
                    </p>
                    <span className="text-[8.5px] font-mono px-1 rounded bg-[#FAF8F5] border border-[#E8E3DA] text-neutral-600 shrink-0 hidden xl:inline-block">
                        {tag}
                    </span>
                </div>
            </div>
        </div>
    );
};

const Banner = () => {
    const bannerRef = useRef<HTMLDivElement>(null);

    // Synchronize Lenis smooth scroll frames directly with GSAP ScrollTrigger
    useLenis(() => {
        ScrollTrigger.update();
    });

    // Refresh ScrollTrigger when window resizes or layout shifts
    useEffect(() => {
        const handleResize = () => {
            ScrollTrigger.refresh();
        };
        window.addEventListener('resize', handleResize);
        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 500);

        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timer);
        };
    }, []);

    useGSAP(() => {
        // 1. Initial Hero Entrance Animation
        const entranceTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        entranceTl
            .fromTo(
                '.hero-reveal-meta',
                { opacity: 0, y: -15 },
                { opacity: 1, y: 0, duration: 0.5 }
            )
            .fromTo(
                '.hero-headline-word',
                { opacity: 0, y: 25, rotateX: 12 },
                { opacity: 1, y: 0, rotateX: 0, stagger: 0.035, duration: 0.65 },
                '-=0.25'
            )
            .fromTo(
                '.hero-body-text',
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.5 },
                '-=0.3'
            )
            .fromTo(
                '.hero-cta-group',
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.45 },
                '-=0.25'
            )
            .fromTo(
                '.left-cards-wrapper .spray-card-item',
                { opacity: 0, scale: 0.65, x: -40 },
                { opacity: 1, scale: 1, x: 0, stagger: 0.06, duration: 0.6 },
                '-=0.45'
            )
            .fromTo(
                '.right-cards-wrapper .spray-card-item',
                { opacity: 0, scale: 0.65, x: 40 },
                { opacity: 1, scale: 1, x: 0, stagger: 0.06, duration: 0.6 },
                '-=0.55'
            );

        // 2. Scroll-Driven Convergence to Author Photo in AboutMe (matching nextjs-project script.js)
        const mm = gsap.matchMedia();

        // Desktop Setup (min-width: 1024px)
        mm.add('(min-width: 1024px)', () => {
            const botAnimationTimeLine = gsap.timeline({
                scrollTrigger: {
                    trigger: '#about-me',
                    start: 'top 85%',
                    end: 'top 15%',
                    scrub: 1.8,
                },
            });

            // Target author photo in AboutMe scales down into sharp focus
            botAnimationTimeLine.fromTo(
                '#about-author-img-box',
                {
                    scale: 1.8,
                    y: 60,
                    opacity: 0.6,
                    ease: 'power2.out',
                },
                {
                    scale: 1,
                    y: 0,
                    opacity: 1,
                    ease: 'power2.out',
                },
                'landing-page-img-position-change'
            );

            // Left and Right card wrappers blur slightly during convergence
            botAnimationTimeLine.to(
                '.left-cards-wrapper',
                {
                    filter: 'blur(5px)',
                },
                'landing-page-img-position-change'
            );

            botAnimationTimeLine.to(
                '.right-cards-wrapper',
                {
                    filter: 'blur(5px)',
                },
                'landing-page-img-position-change'
            );

            // Dynamic vector calculation: Every card travels precisely into the center of Kowshik's photo!
            botAnimationTimeLine.to(
                '.left-cards-wrapper .spray-card-item',
                {
                    x: (index, el) => {
                        const target = document.getElementById('about-author-img-box');
                        if (!target) return 380;
                        const targetRect = target.getBoundingClientRect();
                        const elRect = el.getBoundingClientRect();
                        return (targetRect.left + targetRect.width / 2) - (elRect.left + elRect.width / 2);
                    },
                    y: (index, el) => {
                        const target = document.getElementById('about-author-img-box');
                        if (!target) return 500;
                        const targetRect = target.getBoundingClientRect();
                        const elRect = el.getBoundingClientRect();
                        const targetDocY = targetRect.top + window.scrollY + 80;
                        const elDocY = elRect.top + window.scrollY + elRect.height / 2;
                        return targetDocY - elDocY;
                    },
                    scale: 0.12,
                    opacity: 0,
                    ease: 'power3.out',
                    stagger: -0.05,
                    scrub: 1.8,
                },
                'landing-page-img-position-change'
            );

            botAnimationTimeLine.to(
                '.right-cards-wrapper .spray-card-item',
                {
                    x: (index, el) => {
                        const target = document.getElementById('about-author-img-box');
                        if (!target) return -380;
                        const targetRect = target.getBoundingClientRect();
                        const elRect = el.getBoundingClientRect();
                        return (targetRect.left + targetRect.width / 2) - (elRect.left + elRect.width / 2);
                    },
                    y: (index, el) => {
                        const target = document.getElementById('about-author-img-box');
                        if (!target) return 500;
                        const targetRect = target.getBoundingClientRect();
                        const elRect = el.getBoundingClientRect();
                        const targetDocY = targetRect.top + window.scrollY + 80;
                        const elDocY = elRect.top + window.scrollY + elRect.height / 2;
                        return targetDocY - elDocY;
                    },
                    scale: 0.12,
                    opacity: 0,
                    ease: 'power3.out',
                    stagger: -0.05,
                    scrub: 1.8,
                },
                'landing-page-img-position-change'
            );
        });

        // Mobile & Tablet Setup (max-width: 1023px)
        mm.add('(max-width: 1023px)', () => {
            const mobileTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: '#about-me',
                    start: 'top 85%',
                    end: 'top 20%',
                    scrub: 1.8,
                },
            });

            mobileTimeline.fromTo(
                '#about-author-img-box',
                { scale: 1.4, y: 35, opacity: 0.6 },
                { scale: 1, y: 0, opacity: 1, ease: 'power2.out' },
                'mobile-converge'
            );
        });
    });

    return (
        <section
            ref={bannerRef}
            id="banner"
            className="hero-one-fold w-full bg-[#FAF8F5] flex flex-col justify-between  pb-6 pt-2 sm:pb-8 relative"
        >
         

            {/* Sprayed Elements: Desktop Left Flank (4 Sleek Badges Sprayed on Perimeter) */}
            <div className="left-cards-wrapper hidden lg:block">
                {/* Left Card 1: Figma Plugin Achievement (Top Outer Left) */}
                <SprayCard
                    metric="1.5k+ Installs"
                    title="Figma to Code Plugin"
                    sub="HTML · Tailwind · React Component Gen"
                    tag="Community"
                    iconSrc="/logo/figma.svg"
                    className="w-[200px] xl:w-[225px] -rotate-3 hover:rotate-0 hover:scale-105"
                    style={{ top: '12%', left: '3%' }}
                />

                {/* Left Card 2: React Native Worklets Tech (Upper Mid Inner Left) */}
                <SprayCard
                    metric="120 FPS Native"
                    title="React Native (iOS &amp; Android)"
                    sub="Bridgeless JSI TurboModules &amp; Worklets"
                    tag="Mobile"
                    iconSrc="/logo/react-native.svg"
                    className="w-[200px] xl:w-[225px] rotate-2 hover:rotate-0 hover:scale-105"
                    style={{ top: '35%', left: '12%' }}
                />

                {/* Left Card 3: App Users Driven Achievement (Lower Mid Outer Left) */}
                <SprayCard
                    metric="20k+ App Users"
                    title="Driven via 30+ Next.js LPs"
                    sub="Sub-750ms LCP &amp; Edge RSC Streaming"
                    tag="Growth"
                    iconSrc="/logo/next.png"
                    className="w-[200px] xl:w-[225px] -rotate-2 hover:rotate-0 hover:scale-105"
                    style={{ top: '58%', left: '3%' }}
                />

                {/* Left Card 4: React 19 Frontend Tech (Bottom Inner Left) */}
                <SprayCard
                    metric="React 19 &amp; Next.js 15"
                    title="Server Actions &amp; Optimistic UI"
                    sub="Deterministic State Machines &amp; Zero-JS"
                    tag="Frontend"
                    iconSrc="/logo/react.png"
                    className="w-[200px] xl:w-[225px] rotate-3 hover:rotate-0 hover:scale-105"
                    style={{ top: '80%', left: '13%' }}
                />
            </div>

            {/* Sprayed Elements: Desktop Right Flank (4 Sleek Badges Sprayed on Perimeter) */}
            <div className="right-cards-wrapper hidden lg:block">
                {/* Right Card 1: Paid Conversions Achievement (Top Outer Right) */}
                <SprayCard
                    metric="1,500+ Paid Users"
                    title="Patient &amp; Member Funnels"
                    sub="High-Fidelity Onboarding Conversion"
                    tag="Conversions"
                    LucideIcon={CheckCircle2}
                    className="w-[200px] xl:w-[225px] rotate-3 hover:rotate-0 hover:scale-105"
                    style={{ top: '12%', right: '3%' }}
                />

                {/* Right Card 2: PostgreSQL Latency & DB Tech (Upper Mid Inner Right) */}
                <SprayCard
                    metric="p95 Latency &lt; 25ms"
                    title="PostgreSQL &amp; PgBouncer"
                    sub="EXPLAIN Profiled Composite B-Trees"
                    tag="Database"
                    iconSrc="/logo/postgreSQL.png"
                    className="w-[200px] xl:w-[225px] -rotate-2 hover:rotate-0 hover:scale-105"
                    style={{ top: '35%', right: '12%' }}
                />

                {/* Right Card 3: Deterministic Systems & Core Web Vitals (Lower Mid Outer Right) */}
                <SprayCard
                    metric="100% Core Web Vitals"
                    title="State &amp; Layout Invariants"
                    sub="CLS 0.000 · INP &lt; 25ms · Optimistic UI"
                    tag="Invariants"
                    LucideIcon={ShieldCheck}
                    className="w-[200px] xl:w-[225px] rotate-2 hover:rotate-0 hover:scale-105"
                    style={{ top: '58%', right: '3%' }}
                />

                {/* Right Card 4: Backend Node.js & TypeScript Contracts (Bottom Inner Right) */}
                <SprayCard
                    metric="End-to-End Type Safety"
                    title="Node.js &amp; TypeScript"
                    sub="Strict Monorepo Zod Contracts"
                    tag="Backend"
                    iconSrc="/logo/ts.png"
                    className="w-[200px] xl:w-[225px] -rotate-3 hover:rotate-0 hover:scale-105"
                    style={{ top: '80%', right: '13%' }}
                />
            </div>

            {/* Core Centered Selling Info: Balanced across 2 Clean Lines with Wide Breathing Space */}
            <div className="container max-w-4xl xl:max-w-5xl mx-auto px-4 text-center my-auto relative z-20 py-2">
                {/* Micro-Eyebrow */}
                <div className="hero-center-badge inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#E8E3DA] text-xs font-mono text-[#0E7490] font-medium mb-4 shadow-xs">
                    <Cpu size={13} />
                    <span>Scientific Architecture &amp; Latency Invariants</span>
                </div>

                {/* Master Display Headline: Full-Stack Engineer — Web & Mobile Specialist */}
                <h1 className="font-anton text-3xl sm:text-5xl md:text-6xl lg:text-[4.1rem] xl:text-[4.6rem] tracking-tight leading-[1] text-black uppercase mx-auto">
                    <span className="block">
                        <span className="inline-block hero-headline-word hero-bw-word">Full-Stack</span>{' '}
                        <span className="inline-block hero-headline-word hero-bw-word">Engineer</span>
                    </span>
                    <span className="block mt-1 sm:mt-2">
                        <span className="inline-block hero-headline-word hero-bw-word">Web</span>{' '}
                        <span className="inline-block hero-headline-word hero-bw-word">&amp;</span>{' '}
                        <span className="inline-block hero-headline-word hero-bw-word">Mobile</span>{' '}
                        <span className="inline-block hero-headline-word hero-bw-word">Specialist.</span>
                    </span>
                </h1>

                {/* Technical Elevator Pitch: Broad, Balanced 2-Line Layout */}
                <p className="hero-body-text text-sm sm:text-base md:text-[1.05rem] text-[#68645E] font-light leading-relaxed max-w-2xl xl:max-w-3xl mx-auto mt-4 sm:mt-5 text-balance">
                    Hi, I&apos;m <span className="text-[#191715] font-semibold">Kowshik Valipireddy</span>. A full-stack engineer and React Native specialist building resilient, low-latency applications with <strong className="text-[#191715] font-medium">Next.js 15, React 19, React Native, Node.js, and PostgreSQL</strong>. Every architectural decision is measured against frame budgets and deterministic state invariants.
                </p>

                {/* Centered Action CTAs */}
                <div className="hero-cta-group flex flex-wrap items-center justify-center gap-3.5 pt-6 sm:pt-7">
                    <Button
                        as="link"
                        href="#selected-projects"
                        onClick={() => trackEvent('Inspect Production Work Clicked', { section: 'Hero' })}
                        variant="primary"
                        className="banner-button px-6 py-3 rounded-xl font-medium bg-[#0E7490] hover:bg-[#0c627a] text-white transition-all text-sm shadow-md"
                    >
                        <span>Inspect Production Work</span>
                    </Button>

                    <Button
                        as="link"
                        target="_blank"
                        rel="noopener noreferrer"
                        href={GENERAL_INFO.upworkProfile}
                        onClick={() => trackEvent('Schedule Consultation Clicked', { target: 'UpworkProfile', section: 'Hero' })}
                        variant="outline"
                        className="banner-button px-6 py-3 rounded-xl font-medium border-[#E8E3DA] bg-white hover:bg-[#FAF8F5] text-[#191715] transition-colors text-sm inline-flex items-center gap-1.5 shadow-sm"
                    >
                        <span>Schedule Consultation</span>
                        <ArrowUpRight size={15} />
                    </Button>
                </div>
            </div>

            {/* Subtle bottom spacing */}
            <div className="h-2 sm:h-4" />
        </section>
    );
};

export default Banner;