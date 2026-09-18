'use client';

import React, { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import BloubAvatar, { BloubState } from './BloubAvatar';
import gsap from 'gsap';

interface SectionBlobConfig {
    state: BloubState;
    caption: string;
    label: string;
}

const SECTION_CONFIG: Record<string, SectionBlobConfig> = {
    banner: {
        state: 'idle',
        label: 'Welcome',
        caption: "Hey, welcome! Let's explore.",
    },
    'about-me': {
        state: 'thinking',
        label: 'First-Principles',
        caption: 'How I approach hard engineering.',
    },
    'first-principles': {
        state: 'thinking',
        label: 'First-Principles',
        caption: 'How I approach hard engineering.',
    },
    'my-stack': {
        state: 'building',
        label: 'Toolchain',
        caption: 'Tools I use to ship.',
    },
    'my-experience': {
        state: 'walking',
        label: 'Timeline',
        caption: 'Growing ownership over time.',
    },
    'selected-projects': {
        state: 'spotlight',
        label: 'Projects',
        caption: "Verified things I've built.",
    },
    'latest-blogs': {
        state: 'reading',
        label: 'Articles',
        caption: 'How I communicate technical ideas.',
    },
    contact: {
        state: 'waving',
        label: 'Connect',
        caption: "Let's build something together.",
    },
};

export default function GuideBlob() {
    const [currentSection, setCurrentSection] = useState<string>('banner');
    const [introAvatarState, setIntroAvatarState] = useState<BloubState>('idle');
    const [isIntroComplete, setIsIntroComplete] = useState(false);
    const [isBubbleVisible, setIsBubbleVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const overlayRef = useRef<HTMLDivElement>(null);
    const introTextRef = useRef<HTMLDivElement>(null);
    const blobContainerRef = useRef<HTMLDivElement>(null);
    const floatBobRef = useRef<HTMLDivElement>(null);
    const shadowRef = useRef<HTMLDivElement>(null);
    const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 640);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Initial Loading Overlay & Traveling Animation
    useEffect(() => {
        if (!blobContainerRef.current || !overlayRef.current) return;

        const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (isReducedMotion) {
            setIsIntroComplete(true);
            setIsBubbleVisible(true);
            return;
        }

        const isMobileView = window.innerWidth < 640;
        const tl = gsap.timeline();

        // 1. Initial State: Center big blob in overlay
        gsap.set(blobContainerRef.current, {
            position: 'fixed',
            left: '50vw',
            top: isMobileView ? '36vh' : '40vh',
            xPercent: -50,
            yPercent: -50,
            scale: 1,
            zIndex: 10000,
        });

        // Continuous floating bob loop for the avatar
        const floatTween = gsap.to(floatBobRef.current, {
            y: isMobileView ? -7 : -10,
            duration: 1.3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
        });

        // Breathing floor shadow underneath centered avatar
        let shadowTween: gsap.core.Tween | null = null;
        if (shadowRef.current) {
            shadowTween = gsap.to(shadowRef.current, {
                scale: 0.8,
                opacity: 0.35,
                duration: 1.3,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
            });
        }

        // 2. Reveal text smoothly below big blob with expression choreography
        tl.to({}, { duration: 0.15 })
            .fromTo(
                introTextRef.current,
                { opacity: 0, y: 20, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power2.out' }
            )
            // Morph into polite greeting as text reveals
            .call(() => setIntroAvatarState('greeting'), [], '+=0.1')
            // Morph into joyful greeting eyes
            .call(() => setIntroAvatarState('waving'), [], '+=0.85')
            // Hold for reading
            .to({}, { duration: 1.1 })
            // Eyes look forward in flight direction before takeoff
            .call(() => setIntroAvatarState('walking'))
            // Fade out intro greeting text
            .to(introTextRef.current, {
                opacity: 0,
                y: -15,
                duration: 0.35,
                ease: 'power2.in',
            })
            // Fade out overlay background and floor shadow
            .to(
                [overlayRef.current, shadowRef.current].filter(Boolean),
                {
                    opacity: 0,
                    duration: 0.5,
                    ease: 'power2.inOut',
                },
                '-=0.15'
            )
            // 3. Travel Animation: Big black circle blob glides from center to right-bottom corner
            .to(
                blobContainerRef.current,
                {
                    left: () => `${window.innerWidth - (window.innerWidth < 640 ? 36 : 56)}px`,
                    top: () => `${window.innerHeight - (window.innerWidth < 640 ? 44 : 56)}px`,
                    scale: () => (window.innerWidth < 640 ? 46 / 110 : 56 / 140),
                    duration: 0.95,
                    ease: 'power3.inOut',
                    onComplete: () => {
                        floatTween.kill();
                        if (shadowTween) shadowTween.kill();
                        gsap.set(floatBobRef.current, { y: 0 });
                        setIsIntroComplete(true);
                        setIsBubbleVisible(true);

                        // Auto-hide bubble after 5.5 seconds of inactivity
                        if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
                        hideTimeoutRef.current = setTimeout(() => {
                            setIsBubbleVisible(false);
                        }, 5500);
                    },
                },
                '<'
            );

        return () => {
            tl.kill();
            floatTween.kill();
            if (shadowTween) shadowTween.kill();
            if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
        };
    }, []);

    // Gentle continuous float when docked in bottom right corner
    useEffect(() => {
        if (!isIntroComplete || !floatBobRef.current) return;
        const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (isReducedMotion) return;

        const dockedFloat = gsap.to(floatBobRef.current, {
            y: -4,
            duration: 1.8,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
        });

        return () => {
            dockedFloat.kill();
        };
    }, [isIntroComplete]);

    // IntersectionObserver watching the sections once docked
    useEffect(() => {
        if (!isIntroComplete) return;

        const handleIntersect: IntersectionObserverCallback = (entries) => {
            const visibleEntries = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

            if (visibleEntries.length > 0) {
                const targetId = visibleEntries[0].target.id;
                if (SECTION_CONFIG[targetId] && targetId !== currentSection) {
                    setCurrentSection(targetId);
                    setIsBubbleVisible(true);

                    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
                    hideTimeoutRef.current = setTimeout(() => {
                        setIsBubbleVisible(false);
                    }, 5000);
                }
            }
        };

        const observer = new IntersectionObserver(handleIntersect, {
            root: null,
            rootMargin: '-15% 0px -25% 0px',
            threshold: [0.15, 0.4, 0.7],
        });

        Object.keys(SECTION_CONFIG).forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => {
            observer.disconnect();
            if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
        };
    }, [isIntroComplete, currentSection]);

    const activeConfig = SECTION_CONFIG[currentSection] || SECTION_CONFIG.banner;

    const handleBlobClick = () => {
        if (!isIntroComplete) return;
        setIsBubbleVisible((prev) => !prev);
    };

    return (
        <>
            {/* Fullscreen Loading Screen Overlay */}
            {!isIntroComplete && (
                <div
                    ref={overlayRef}
                    className="fixed inset-0 z-[9998] bg-[#FAF8F5] flex flex-col items-center justify-center select-none pointer-events-auto"
                    aria-live="polite"
                    aria-label="Loading portfolio"
                >
                    {/* Ambient subtle glow behind avatar */}
                    <div className="absolute size-96 rounded-full bg-neutral-200/50 blur-3xl pointer-events-none" />

                    {/* Greeting text positioned directly below the centered big blob */}
                    <div
                        ref={introTextRef}
                        className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-md mx-auto space-y-2.5 mt-36 sm:mt-52"
                    >
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E8E3DA] text-[11px] font-mono text-[#0064E0] shadow-2xs">
                            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span>Kowshik Valipireddy Portfolio</span>
                        </div>

                        <p className="font-outfit text-xl sm:text-3xl font-bold text-[#0A1317] tracking-tight leading-snug">
                            Hey, I&apos;m <span className="text-[#0064E0]">[Blob]</span>.
                        </p>

                        <p className="font-sans text-xs sm:text-base text-[#4E606F] font-normal leading-relaxed">
                            Kowshik sent me ahead to say hi.
                        </p>
                    </div>
                </div>
            )}

            {/* The Single Black Circle Avatar Blob (Starts Big in Center, Travels to Bottom-Right) */}
            <div
                ref={blobContainerRef}
                className={cn(
                    'select-none',
                    isIntroComplete
                        ? 'fixed bottom-4 right-3 sm:bottom-6 sm:right-8 z-40 !scale-100 !left-auto !top-auto !translate-x-0 !translate-y-0'
                        : 'z-[9999]'
                )}
            >
                <div className="relative pointer-events-auto flex flex-col items-center">
                    {/* Speech Bubble: Only active once docked at bottom-right */}
                    {isIntroComplete && (
                        <div
                            className={cn(
                                'absolute bottom-full mb-2.5 sm:mb-3 right-0 w-max max-w-[190px] sm:max-w-[210px] transition-all duration-300 transform',
                                isBubbleVisible || isHovered
                                    ? 'opacity-100 translate-y-0 scale-100'
                                    : 'opacity-0 translate-y-2 scale-95 pointer-events-none'
                            )}
                        >
                            <div className="relative rounded-2xl bg-white/95 backdrop-blur-md border border-[#E8E3DA] px-3 py-2 sm:px-3.5 sm:py-2.5 shadow-xl shadow-neutral-900/10 text-right">
                                <div className="flex items-center justify-end gap-1.5 mb-0.5 sm:mb-1">
                                    <span className="size-1.5 rounded-full bg-[#0064E0] animate-pulse shrink-0" />
                                    <span className="text-[9.5px] sm:text-[10px] font-mono uppercase tracking-wider text-[#4E606F]">
                                        {activeConfig.label}
                                    </span>
                                </div>

                                <p className="font-outfit font-semibold text-[11px] sm:text-xs text-[#0A1317] leading-snug">
                                    {activeConfig.caption}
                                </p>

                                <div
                                    className="absolute -bottom-1.5 right-5 sm:right-6 size-3 rotate-45 bg-white border-r border-b border-[#E8E3DA]"
                                    aria-hidden="true"
                                />
                            </div>
                        </div>
                    )}

                    {/* Floating Bob Wrapper */}
                    <div ref={floatBobRef} className="will-change-transform flex items-center justify-center">
                        {/* Black Circle Avatar Button */}
                        <button
                            type="button"
                            onClick={handleBlobClick}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            aria-label={`Guide Blob: ${activeConfig.caption}. Click to toggle message.`}
                            className={cn(
                                'group relative rounded-full flex items-center justify-center cursor-pointer transition-transform duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0064E0]',
                                isIntroComplete ? 'size-11 sm:size-14' : 'size-[110px] sm:size-[140px]',
                                isHovered && (isIntroComplete ? 'scale-110' : 'scale-105')
                            )}
                        >
                            <BloubAvatar
                                size={isIntroComplete ? (isMobile ? 44 : 56) : (isMobile ? 110 : 140)}
                                state={isIntroComplete ? activeConfig.state : introAvatarState}
                                interactive={true}
                                showThinkingDots={isIntroComplete && activeConfig.state === 'thinking'}
                            />
                        </button>
                    </div>

                    {/* Floor breathing shadow on loading screen */}
                    {!isIntroComplete && (
                        <div
                            ref={shadowRef}
                            className="w-20 sm:w-24 h-3 sm:h-3.5 rounded-full bg-[#0A1317]/15 blur-[5px] pointer-events-none mt-2 will-change-transform"
                        />
                    )}
                </div>
            </div>
        </>
    );
}
