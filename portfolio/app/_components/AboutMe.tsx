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
            className="relative pt-8 pb-24 sm:pt-12 sm:pb-32 overflow-hidden bg-[#FAF8F5]"
            id="about-me"
        >
            <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" ref={container}>
                {/* Author Photo Convergence Focal Point */}
                <div
                    id="about-author-img-box"
                    className="about-author-img-box relative flex flex-col items-center text-center mb-10 sm:mb-14 py-1"
                >
                    {/* Concentric Precision Hairline Rings around Author Avatar */}
                    <div className="relative size-32 sm:size-40 mb-5">
                        {/* Outer rotating dashed precision ring */}
                        <div className="absolute -inset-3 sm:-inset-5 rounded-full border border-dashed border-[#0064E0]/35 animate-[spin_25s_linear_infinite] pointer-events-none" />
                        {/* Middle rotating hairline ring */}
                        <div className="absolute -inset-6 sm:-inset-8 rounded-full border border-[#E8E3DA] animate-[spin_35s_linear_infinite_reverse] pointer-events-none" />
                        {/* Subtle glow backdrop */}
                        <div className="absolute -inset-2 rounded-full bg-[#0064E0]/10 blur-xl pointer-events-none" />

                        {/* Author Photo from DEFAULT_AUTHOR */}
                        <div className="relative size-full rounded-full overflow-hidden border-4 border-white shadow-xl bg-white">
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

                    {/* First-Principles Architectural Statement */}
                    <div id="first-principles" className="max-w-3xl mx-auto space-y-4 px-4 mt-2 text-center scroll-mt-24">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-[11px] font-mono text-[#0064E0] font-medium mx-auto">
                            <span>FIRST-PRINCIPLES ENGINEERING</span>
                        </div>
                        <h2 className="font-outfit text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0A1317] leading-[1.1] mx-auto text-center text-balance">
                            Eliminating failure modes in distributed &amp; offline runtimes.
                        </h2>
                        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E8E3DA] shadow-2xs text-left max-w-2xl mx-auto space-y-3">
                            <div className="flex items-center justify-between gap-2 border-b border-[#E8E3DA] pb-3">
                                <span className="text-xs font-mono font-semibold text-[#0064E0]">CASE STUDY · TAP HEALTH</span>
                                <span className="text-[11px] font-mono text-[#4E606F]">Production Healthcare</span>
                            </div>
                            <p className="text-sm sm:text-base text-[#0A1317] font-medium leading-relaxed">
                                In patient health apps, intermittent connectivity and timezone shifts aren&apos;t edge cases — they are daily realities.
                            </p>
                            <p className="text-xs sm:text-sm text-[#4E606F] font-normal leading-relaxed">
                                At Tap Health, I eliminated state-synchronization deadlocks and UTC drift across continuous glucose tracking and daily meal logs by replacing fragile optimistic side-effects with an offline-first deterministic state machine and robust delta reconciliation.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Section Header */}
                <div id="engineering-benchmarks" className="mb-6 sm:mb-8 flex flex-col items-center justify-center text-center scroll-mt-24">
                    <SectionTitle
                        badge="INTERACTIVE CONSOLE"
                        title="KOWSHIK VALIPIREDDY CLI"
                        className="items-center mb-2"
                    />
                    <p className="font-mono text-xs uppercase tracking-widest text-[#4E606F]">
                        Interactive personal terminal bot · Sourced from verified profile data
                    </p>
                </div>

                {/* Interactive Personal Terminal CLI Bot */}
                <div className="about-fade max-w-5xl mx-auto">
                    <KowshikTerminal />
                </div>
            </div>
        </section>
    );
};

export default AboutMe;