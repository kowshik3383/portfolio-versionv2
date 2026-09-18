'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import BloubAvatar, { BloubState } from './BloubAvatar';

gsap.registerPlugin(useGSAP);

export default function Preloader() {
    const preloaderRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [shouldRender, setShouldRender] = useState(false);
    const [avatarState, setAvatarState] = useState<BloubState>('idle');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const isBot = /bot|googlebot|crawler|spider|robot|crawling|lighthouse|headlesschrome/i.test(
                navigator.userAgent
            );
            const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const alreadyShown = sessionStorage.getItem('preloader-shown');

            if (isBot || isReducedMotion || alreadyShown) {
                return;
            }

            sessionStorage.setItem('preloader-shown', 'true');
            setShouldRender(true);
        }
    }, []);

    // Morph the avatar state while loading
    useEffect(() => {
        if (!shouldRender) return;

        const timer1 = setTimeout(() => {
            setAvatarState('wink');
        }, 900);

        const timer2 = setTimeout(() => {
            setAvatarState('waving');
        }, 1600);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, [shouldRender]);

    useGSAP(
        () => {
            if (!shouldRender || !preloaderRef.current) return;

            const tl = gsap.timeline({
                defaults: { ease: 'power3.out' },
                onComplete: () => {
                    setShouldRender(false);
                },
            });

            // Reveal content
            tl.fromTo(
                contentRef.current,
                { opacity: 0, y: 20, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.6, delay: 0.1 }
            )
                .fromTo(
                    '.preloader-text',
                    { opacity: 0, y: 10 },
                    { opacity: 1, y: 0, duration: 0.45, stagger: 0.08 },
                    '-=0.2'
                )
                // Hold for user to read greeting
                .to({}, { duration: 1.4 })
                // Smoothly dismiss preloader upwards with curtain exit
                .to(contentRef.current, {
                    opacity: 0,
                    y: -25,
                    scale: 0.95,
                    duration: 0.45,
                    ease: 'power2.in',
                })
                .to(
                    preloaderRef.current,
                    {
                        opacity: 0,
                        duration: 0.4,
                        ease: 'power2.inOut',
                    },
                    '-=0.15'
                );
        },
        { scope: preloaderRef, dependencies: [shouldRender] }
    );

    if (!shouldRender) return null;

    return (
        <div
            ref={preloaderRef}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#FAF8F5] select-none"
            aria-live="polite"
            aria-label="Loading portfolio"
        >
            {/* Ambient subtle glow behind avatar */}
            <div className="absolute size-72 rounded-full bg-neutral-200/40 blur-3xl pointer-events-none" />

            <div
                ref={contentRef}
                className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-md mx-auto space-y-6"
            >
                {/* Black Animated Avatar from jeremy-prt/bloub */}
                <div className="relative cursor-pointer transition-transform duration-300 hover:scale-105">
                    <BloubAvatar size={110} state={avatarState} interactive />
                </div>

                {/* Friendly Greeting Message */}
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E8E3DA] text-[11px] font-mono text-[#0064E0] shadow-2xs">
                        <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Kowshik Valipireddy Portfolio</span>
                    </div>

                    <p className="preloader-text font-outfit text-xl sm:text-2xl font-bold text-[#0A1317] tracking-tight leading-snug">
                        Hey, I'm <span className="text-[#0064E0]">Blob</span>.
                    </p>

                    <p className="preloader-text font-sans text-sm sm:text-base text-[#4E606F] font-normal leading-relaxed">
                        Kowshik sent me ahead to say hi.
                    </p>
                </div>
            </div>
        </div>
    );
}
