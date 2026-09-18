'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React, { useRef } from 'react';
import Image from 'next/image';
import SectionTitle from '@/components/SectionTitle';
import { DEFAULT_AUTHOR } from '@/lib/blogs';
import KowshikTerminal from './KowshikTerminal';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const AboutMe = () => {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.fromTo(
                '.about-fade',
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.1,
                    duration: 0.7,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: container.current,
                        start: 'top 75%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        },
        { scope: container }
    );

    return (
        <section
            className="relative pt-8 pb-28 sm:pt-12 sm:pb-36 overflow-hidden bg-[#FAF8F5]"
            id="about-me"
        >
            <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" ref={container}>
                {/* Author Photo Convergence Focal Point (Clean, Minimal, No Clutter) */}
                <div
                    id="about-author-img-box"
                    className="about-author-img-box relative flex flex-col items-center text-center mb-10 sm:mb-12 py-1"
                >
                    {/* Concentric Precision Hairline Rings around Author Avatar */}
                    <div className="relative size-32 sm:size-40 mb-4 sm:mb-5">
                        {/* Outer rotating dashed precision ring */}
                        <div className="absolute -inset-3 sm:-inset-5 rounded-full border border-dashed border-[#0E7490]/35 animate-[spin_25s_linear_infinite] pointer-events-none" />
                        {/* Middle rotating hairline ring */}
                        <div className="absolute -inset-6 sm:-inset-8 rounded-full border border-[#E8E3DA] animate-[spin_35s_linear_infinite_reverse] pointer-events-none" />
                        {/* Subtle glow backdrop */}
                        <div className="absolute -inset-2 rounded-full bg-[#0E7490]/10 blur-xl pointer-events-none" />

                        {/* Author Photo from DEFAULT_AUTHOR */}
                        <div className="relative size-full rounded-full overflow-hidden border-4 border-white shadow-2xl shadow-neutral-900/10 bg-white">
                            <Image
                                src={DEFAULT_AUTHOR.avatar}
                                alt={DEFAULT_AUTHOR.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 128px, 160px"
                                priority
                            />
                        </div>
                    </div>

                    {/* Clean Architectural Statement (Matching hero display typography & drop-shadow) */}
                    <div className="max-w-4xl mx-auto space-y-2.5 px-4 mt-3 sm:mt-4 text-center">
                        <h2 className="font-anton text-2xl sm:text-4xl md:text-5xl lg:text-[3.2rem] tracking-tight text-black leading-[1.05] uppercase mx-auto text-center">
                            <span className="block">
                                <span className="inline-block hero-bw-word">Governed</span>{' '}
                                <span className="inline-block hero-bw-word">by</span>{' '}
                                <span className="inline-block hero-bw-word">Verifiable</span>{' '}
                                <span className="inline-block hero-bw-word">Latency,</span>
                            </span>
                            <span className="block mt-1 sm:mt-1.5">
                                <span className="inline-block hero-bw-word">Frame</span>{' '}
                                <span className="inline-block hero-bw-word">Budgets,</span>{' '}
                                <span className="inline-block hero-bw-word">&amp;</span>{' '}
                                <span className="inline-block hero-bw-word">Deterministic</span>{' '}
                                <span className="inline-block hero-bw-word">State</span>{' '}
                                <span className="inline-block hero-bw-word">Invariants.</span>
                            </span>
                        </h2>
                        <p className="text-xs sm:text-sm text-[#68645E] font-light max-w-xl mx-auto leading-relaxed text-center">
                            Every metric, framework, and conversion funnel flows from first-principles systems engineering.
                        </p>
                    </div>
                </div>

                {/* Section Header */}
                <div id="engineering-benchmarks" className="mb-6 sm:mb-8 flex flex-col items-center justify-center text-center scroll-mt-24">
                    <SectionTitle
                        title="KOWSHIK VALIPIREDDY CLI"
                        className="justify-center mb-3"
                    />
                    <p className="font-mono text-xs uppercase tracking-widest text-[#68645E]">
                        Interactive personal terminal bot · Sourced from verified profile data
                    </p>
                </div>

                {/* Interactive Personal Terminal CLI Bot: Real Data, Instant Responses & Actionable Easter Eggs */}
                <div className="about-fade max-w-5xl mx-auto">
                    <KowshikTerminal />
                </div>
            </div>
        </section>
    );
};

export default AboutMe;