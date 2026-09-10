'use client';

import SectionTitle from '@/components/SectionTitle';
import { MY_EXPERIENCE } from '@/lib/data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useRef } from 'react';
import { Calendar, Briefcase } from 'lucide-react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const renderFormattedText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return (
                <strong key={index} className="text-white font-medium">
                    {part.slice(2, -2)}
                </strong>
            );
        }
        return <span key={index}>{part}</span>;
    });
};

const Experiences = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.fromTo(
                '.experience-item',
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.2,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 75%',
                        toggleActions: 'play none none reverse',
                    },
                },
            );
        },
        { scope: containerRef },
    );

    return (
        <section
            id="my-experience"
            className="relative py-24 sm:py-32 overflow-hidden border-t border-white/5"
        >
            <div
                ref={containerRef}
                className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
            >
                {/* Header */}
                <div className="mb-16">
                    <SectionTitle title="MY EXPERIENCE" />
                    <p className="font-mono text-sm tracking-wide text-neutral-400 -mt-6">
                        Career milestones &amp; engineering journey
                    </p>
                </div>

                {/* Timeline Wrapper */}
                <div className="relative pl-6 sm:pl-10 border-l border-white/10 space-y-12 sm:space-y-16">
                    {MY_EXPERIENCE.map((item, index) => (
                        <div
                            key={`${item.title}-${index}`}
                            className="experience-item relative group"
                        >
                            {/* Timeline Dot */}
                            <div className="absolute -left-[31px] sm:-left-[47px] top-6 z-10 flex items-center justify-center">
                                <span className="absolute size-5 rounded-full bg-cyan-400/20 animate-ping" />
                                <span className="relative size-3 rounded-full bg-cyan-400 ring-4 ring-neutral-950 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
                            </div>

                            {/* Experience Card */}
                            <div className="p-7 sm:p-9 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 hover:border-cyan-400/30 transition-all duration-300 relative overflow-hidden backdrop-blur-sm">
                                <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                                    <div className="flex items-center gap-3">
                                        <span className="font-mono text-xs text-cyan-400 font-semibold px-2.5 py-0.5 rounded-full bg-cyan-400/10 border border-cyan-400/20">
                                            0{index + 1}
                                        </span>
                                        <span className="text-sm font-semibold tracking-wide text-white flex items-center gap-2">
                                            <Briefcase size={14} className="text-neutral-400" />
                                            {item.company}
                                        </span>
                                    </div>

                                    <div className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 bg-white/[0.03] px-3 py-1 rounded-full border border-white/5 self-start sm:self-auto">
                                        <Calendar size={12} className="text-cyan-400" />
                                        <span>{item.duration}</span>
                                    </div>
                                </div>

                                <h3 className="text-2xl sm:text-3xl font-anton text-white tracking-wide mb-4">
                                    {item.title}
                                </h3>

                                {item.highlights && item.highlights.length > 0 ? (
                                    <ul className="space-y-3 pt-3 border-t border-white/5">
                                        {item.highlights.map((bullet, bulletIdx) => (
                                            <li
                                                key={bulletIdx}
                                                className="flex items-start gap-3 text-sm sm:text-[14.5px] text-neutral-300 font-light leading-relaxed"
                                            >
                                                <span className="mt-2 size-1.5 rounded-full bg-cyan-400 shrink-0 shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
                                                <span>{renderFormattedText(bullet)}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : item.description ? (
                                    <p className="text-sm text-neutral-300 font-light leading-relaxed">
                                        {item.description}
                                    </p>
                                ) : null}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experiences;
