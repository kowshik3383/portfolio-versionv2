'use client';

import React, { useRef, useEffect, useState } from 'react';
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
    Sparkles,
    Layers,
    Code2,
    ArrowRight,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface SprayTechIconProps {
    name: string;
    iconSrc: string;
    className?: string;
    style?: React.CSSProperties;
}

const SprayTechIcon: React.FC<SprayTechIconProps> = ({
    name,
    iconSrc,
    className = '',
    style,
}) => {
    return (
        <div
            style={style}
            title={name}
            aria-label={name}
            className={`spray-card-item size-14 xl:size-16 rounded-2xl bg-white/95 backdrop-blur-md border border-[#E8E3DA] shadow-xs flex items-center justify-center transition-all duration-300 hover:scale-115 hover:shadow-lg hover:border-[#0064E0]/40 group select-none ${className}`}
        >
            <Image
                src={iconSrc}
                alt={name}
                width={32}
                height={32}
                className="object-contain max-h-8 max-w-8 group-hover:scale-110 transition-transform duration-200"
            />
        </div>
    );
};

const Banner = () => {
    const bannerRef = useRef<HTMLDivElement>(null);
    const [activeTheme, setActiveTheme] = useState<'matcha' | 'astryx' | 'slate'>('matcha');

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
                { opacity: 0, y: 25, rotateX: 10 },
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
                { opacity: 0, scale: 0.7, x: -35 },
                { opacity: 1, scale: 1, x: 0, stagger: 0.06, duration: 0.6 },
                '-=0.45'
            )
            .fromTo(
                '.right-cards-wrapper .spray-card-item',
                { opacity: 0, scale: 0.7, x: 35 },
                { opacity: 1, scale: 1, x: 0, stagger: 0.06, duration: 0.6 },
                '-=0.55'
            );

        // 2. Scroll-Driven Convergence to Author Photo in AboutMe
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

            botAnimationTimeLine.fromTo(
                '#about-author-img-box',
                {
                    scale: 1.6,
                    y: 50,
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
                { scale: 1.3, y: 30, opacity: 0.6 },
                { scale: 1, y: 0, opacity: 1, ease: 'power2.out' },
                'mobile-converge'
            );
        });
    });

    return (
        <section
            ref={bannerRef}
            id="banner"
            className="hero-one-fold w-full bg-[#FAF8F5] astryx-aurora flex flex-col justify-between pb-8 pt-12 sm:pt-16 sm:pb-12 relative overflow-hidden"
        >
            {/* Sprayed Elements: Desktop Left Flank */}
            <div className="left-cards-wrapper hidden lg:block">
                <SprayTechIcon
                    name="React Native"
                    iconSrc="/logo/react-native.svg"
                    className="-rotate-6 hover:rotate-0"
                    style={{ top: '14%', left: '7%' }}
                />

                <SprayTechIcon
                    name="React.js"
                    iconSrc="/logo/react.png"
                    className="rotate-3 hover:rotate-0"
                    style={{ top: '36%', left: '15%' }}
                />

                <SprayTechIcon
                    name="Next.js"
                    iconSrc="/logo/next.png"
                    className="-rotate-3 hover:rotate-0"
                    style={{ top: '58%', left: '7%' }}
                />

                <SprayTechIcon
                    name="JavaScript"
                    iconSrc="/logo/js.png"
                    className="rotate-6 hover:rotate-0"
                    style={{ top: '80%', left: '15%' }}
                />
            </div>

            {/* Sprayed Elements: Desktop Right Flank */}
            <div className="right-cards-wrapper hidden lg:block">
                <SprayTechIcon
                    name="TypeScript"
                    iconSrc="/logo/ts.png"
                    className="rotate-6 hover:rotate-0"
                    style={{ top: '14%', right: '7%' }}
                />

                <SprayTechIcon
                    name="Node.js"
                    iconSrc="/logo/node.png"
                    className="-rotate-3 hover:rotate-0"
                    style={{ top: '36%', right: '15%' }}
                />

                <SprayTechIcon
                    name="PostgreSQL"
                    iconSrc="/logo/postgreSQL.png"
                    className="rotate-3 hover:rotate-0"
                    style={{ top: '58%', right: '7%' }}
                />

                <SprayTechIcon
                    name="Figma"
                    iconSrc="/logo/figma.svg"
                    className="-rotate-6 hover:rotate-0"
                    style={{ top: '80%', right: '15%' }}
                />
            </div>

            {/* Core Centered Hero Pitch */}
            <div className="container max-w-4xl xl:max-w-5xl mx-auto px-4 text-center my-auto relative z-20 py-4">
                {/* Identity Kicker Status Pill */}
                <div className="hero-reveal-meta inline-flex flex-wrap items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#E8E3DA] text-xs font-mono text-[#0064E0] font-medium mb-5 shadow-2xs">
                    <span className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60 font-semibold text-[11px]">
                        <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Full Stack &amp; Mobile Engineer</span>
                    </span>
                    <span className="text-[#4E606F]">Specializing in High-Reliability Systems</span>
                </div>

                {/* Master Display Headline */}
                <h1 className="font-outfit text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] xl:text-[4.75rem] font-extrabold tracking-tight leading-[1.08] text-[#0A1317] mx-auto">
                    <span className="block">
                        <span className="inline-block hero-headline-word hero-bw-word">Engineered for reliability.</span>
                    </span>
                    <span className="block mt-1 sm:mt-2 text-[#0064E0]">
                        <span className="inline-block hero-headline-word">Measured in production.</span>
                    </span>
                </h1>

                {/* Technical Elevator Pitch */}
                <p className="hero-body-text text-sm sm:text-base md:text-lg text-[#4E606F] font-normal leading-relaxed max-w-2xl xl:max-w-3xl mx-auto mt-4 sm:mt-5 text-balance px-2 sm:px-0">
                    Building high-reliability health systems, offline-first developer tooling, and high-conversion web apps. Sourced from first-principles engineering by <strong className="text-[#0A1317] font-semibold">Kowshik Valipireddy</strong> — specializing in cross-platform React Native, Next.js 15, and deterministic state architectures.
                </p>

                {/* Mobile-First Tech Icon Grid/Ribbon (Touch-optimized for viewports < 1024px) */}
                <div className="lg:hidden mt-5 pt-1 flex items-center justify-center flex-wrap gap-2.5 sm:gap-3 max-w-xs sm:max-w-md mx-auto">
                    {[
                        { name: 'React Native', src: '/logo/react-native.svg' },
                        { name: 'React.js', src: '/logo/react.png' },
                        { name: 'Next.js', src: '/logo/next.png' },
                        { name: 'TypeScript', src: '/logo/ts.png' },
                        { name: 'Node.js', src: '/logo/node.png' },
                        { name: 'PostgreSQL', src: '/logo/postgreSQL.png' },
                        { name: 'Figma', src: '/logo/figma.svg' },
                        { name: 'JavaScript', src: '/logo/js.png' },
                    ].map((tech) => (
                        <div
                            key={tech.name}
                            title={tech.name}
                            aria-label={tech.name}
                            className="size-11 sm:size-12 rounded-2xl bg-white/95 border border-[#E8E3DA] shadow-2xs flex items-center justify-center p-2 transition-transform active:scale-90"
                        >
                            <Image
                                src={tech.src}
                                alt={tech.name}
                                width={26}
                                height={26}
                                className="object-contain max-h-6 max-w-6"
                            />
                        </div>
                    ))}
                </div>

                {/* Responsive Action CTAs: Full-width stacked on mobile, row on tablet/desktop */}
                <div className="hero-cta-group flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3 pt-5 sm:pt-7 max-w-xs sm:max-w-none mx-auto w-full">
                    <Button
                        as="link"
                        href="#selected-projects"
                        onClick={() => trackEvent('View Projects Clicked', { section: 'Hero' })}
                        variant="primary"
                        className="px-6 py-3.5 sm:py-3 rounded-full font-outfit font-semibold bg-[#0064E0] hover:bg-[#0052B3] text-white transition-all text-sm shadow-xs justify-center"
                    >
                        <span>View selected projects</span>
                        <ArrowUpRight size={15} />
                    </Button>

                    <Button
                        as="link"
                        href="#about-me"
                        onClick={() => trackEvent('Read Principles Clicked', { section: 'Hero' })}
                        variant="outline"
                        className="px-6 py-3.5 sm:py-3 rounded-full font-outfit font-semibold border-[#E8E3DA] bg-white hover:bg-[#FAF8F5] text-[#0A1317] transition-all text-sm inline-flex items-center justify-center gap-1.5 shadow-2xs"
                    >
                        <span>Read first-principles</span>
                        <ArrowRight size={14} className="text-[#8A94A0]" />
                    </Button>
                </div>

                {/* Verified Production Telemetry Pill Bar */}
                <div className="mt-6 sm:mt-8 pt-2 sm:pt-4 inline-flex flex-wrap items-center justify-center gap-2 max-w-xl mx-auto">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-[#E8E3DA] text-[11px] font-mono text-[#4E606F] shadow-2xs">
                        <span className="size-1.5 rounded-full bg-emerald-500" />
                        <span>Sub-750ms LCP</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-[#E8E3DA] text-[11px] font-mono text-[#4E606F] shadow-2xs">
                        <span className="size-1.5 rounded-full bg-blue-500" />
                        <span>React Native JSI</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-[#E8E3DA] text-[11px] font-mono text-[#4E606F] shadow-2xs">
                        <span className="size-1.5 rounded-full bg-purple-500" />
                        <span>Zero-Telemetry Tooling</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-[#E8E3DA] text-[11px] font-mono text-[#4E606F] shadow-2xs">
                        <span className="size-1.5 rounded-full bg-amber-500" />
                        <span>Deterministic FSM</span>
                    </div>
                </div>
            </div>

            {/* Subtle bottom spacing */}
            <div className="h-2 sm:h-4" />
        </section>
    );
};

export default Banner;