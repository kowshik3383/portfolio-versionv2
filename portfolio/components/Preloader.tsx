'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useEffect, useRef, useState } from 'react';

gsap.registerPlugin(useGSAP);

const Preloader = () => {
    const preloaderRef = useRef<HTMLDivElement>(null);
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        // Fast-path: check if crawler/bot or if already shown in this session
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

    useGSAP(
        () => {
            if (!shouldRender || !preloaderRef.current) return;

            const tl = gsap.timeline({
                defaults: {
                    ease: 'power2.out',
                },
                onComplete: () => {
                    setShouldRender(false);
                },
            });

            tl.to('.name-text span', {
                y: 0,
                stagger: 0.03,
                duration: 0.2,
            })
                .to(
                    '.preloader-item',
                    {
                        y: '100%',
                        duration: 0.35,
                        stagger: 0.04,
                    },
                    '+=0.15'
                )
                .to('.name-text span', { autoAlpha: 0, duration: 0.15 }, '<')
                .to(
                    preloaderRef.current,
                    {
                        autoAlpha: 0,
                        duration: 0.2,
                    },
                    '<'
                );
        },
        { scope: preloaderRef, dependencies: [shouldRender] }
    );

    if (!shouldRender) return null;

    return (
        <div
            className="fixed inset-0 z-[6] flex pointer-events-none"
            ref={preloaderRef}
            aria-hidden="true"
        >
            <div className="preloader-item h-full w-[10%] bg-black"></div>
            <div className="preloader-item h-full w-[10%] bg-black"></div>
            <div className="preloader-item h-full w-[10%] bg-black"></div>
            <div className="preloader-item h-full w-[10%] bg-black"></div>
            <div className="preloader-item h-full w-[10%] bg-black"></div>
            <div className="preloader-item h-full w-[10%] bg-black"></div>
            <div className="preloader-item h-full w-[10%] bg-black"></div>
            <div className="preloader-item h-full w-[10%] bg-black"></div>
            <div className="preloader-item h-full w-[10%] bg-black"></div>
            <div className="preloader-item h-full w-[10%] bg-black"></div>

            <p className="name-text flex text-[20vw] lg:text-[200px] font-anton text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 leading-none overflow-hidden text-white">
                <span className="inline-block translate-y-full">K</span>
                <span className="inline-block translate-y-full">O</span>
                <span className="inline-block translate-y-full">W</span>
                <span className="inline-block translate-y-full">S</span>
                <span className="inline-block translate-y-full">H</span>
                <span className="inline-block translate-y-full">I</span>
                <span className="inline-block translate-y-full">K</span>
            </p>
        </div>
    );
};

export default Preloader;
