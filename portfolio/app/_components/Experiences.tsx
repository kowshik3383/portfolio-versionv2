'use client';

import SectionTitle from '@/components/SectionTitle';
import { MY_EXPERIENCE } from '@/lib/data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useRef } from 'react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Experiences = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Animate experience cards ONCE (no scrub = no duplication)
    useGSAP(
        () => {
            gsap.fromTo(
                '.experience-item',
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.25,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 70%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        },
        { scope: containerRef }
    );

    return (
        <section
            id="my-experience"
            className="relative overflow-hidden  py-32"
        >
            <div
                ref={containerRef}
                className="relative z-10 mx-auto max-w-6xl px-6"
            >
                {/* Header */}
                <div className="mb-24 text-center">
                    <SectionTitle title="My Experience" />
                    <p className="mt-4 font-mono text-sm tracking-wide text-neutral-500">
                        Career milestones and professional journey
                    </p>
                </div>

                {/* Timeline Wrapper */}
                <div className="relative pl-16">
                    {/* Vertical Line */}
                    <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-400 to-transparent" />

                    {/* Experience Items */}
                    <div className="space-y-16">
                        {MY_EXPERIENCE.map((item, index) => (
                            <div
                                key={`${item.title}-${index}`}
                                className="experience-item relative pl-16"
                            >
                                {/* Timeline Dot (perfectly aligned) */}
                                <div className="absolute left-6 top-10 -translate-x-1/2 z-10">
                                    <span className="absolute h-6 w-6 animate-ping rounded-full bg-cyan-400/20" />
                                    <span className="relative block h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.6)]" />
                                </div>

                                {/* Card */}
                                <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-950 p-10 transition-all duration-300 hover:translate-x-2 hover:shadow-[0_20px_60px_rgba(34,211,238,0.08)]">
                                    {/* Glow */}
                                    <div className="pointer-events-none absolute right-0 top-0 h-52 w-52 rounded-full bg-cyan-400/10 blur-3xl" />

                                    {/* Border */}
                                    <div className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent transition group-hover:border-cyan-400/20" />

                                    {/* Header */}
                                    <div className="mb-6 flex items-center gap-4">
                                        <span className="font-mono text-sm tracking-widest text-cyan-400">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <span className="font-mono text-sm uppercase tracking-wide text-neutral-400">
                                            {item.company}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="mb-6 text-3xl font-extrabold tracking-tight text-neutral-200 transition group-hover:text-white">
                                        {item.title}
                                    </h3>

                                    {/* Duration */}
                                    <div className="flex items-center gap-2 font-mono text-sm text-neutral-400">
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            fill="none"
                                            className="transition group-hover:text-cyan-400"
                                        >
                                            <circle
                                                cx="8"
                                                cy="8"
                                                r="6.5"
                                                stroke="currentColor"
                                                strokeWidth="1"
                                            />
                                            <path
                                                d="M8 4V8L11 10"
                                                stroke="currentColor"
                                                strokeWidth="1"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                        {item.duration}
                                    </div>

                                    {/* Shine */}
                                    <div className="pointer-events-none absolute inset-y-0 -left-full w-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent transition-all duration-700 group-hover:left-full" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Background Grid */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

            {/* Glow Sphere */}
            <div className="pointer-events-none absolute right-[-200px] top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-violet-600/10 blur-[120px]" />
        </section>
    );
};

export default Experiences;
