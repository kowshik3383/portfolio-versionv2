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
                <strong key={index} className="text-neutral-900 font-semibold">
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
            className="relative py-20 sm:py-28 overflow-hidden border-t border-[#E8E3DA] bg-[#FAF8F5]"
        >
            <div
                ref={containerRef}
                className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
            >
                {/* Header */}
                <div className="mb-14">
                    <SectionTitle title="ENGINEERING TRACK RECORD" />
                    <p className="font-mono text-xs uppercase tracking-widest text-[#68645E] -mt-5">
                        Production milestones, architecture ownership &amp; systems delivery
                    </p>
                </div>

                {/* Timeline Wrapper */}
                <div className="relative pl-6 sm:pl-10 border-l border-[#E8E3DA] space-y-12 sm:space-y-14">
                    {MY_EXPERIENCE.map((item, index) => (
                        <div
                            key={`${item.title}-${index}`}
                            className="experience-item relative group"
                        >
                            {/* Timeline Dot */}
                            <div className="absolute -left-[31px] sm:-left-[47px] top-6 z-10 flex items-center justify-center">
                                <span className="relative size-3 rounded-full bg-[#0E7490] ring-4 ring-[#FAF8F5]" />
                            </div>

                            {/* Experience Card */}
                            <div className="p-7 sm:p-9 rounded-2xl bg-white hover:bg-[#FAF8F5]/60 border border-[#E8E3DA] hover:border-[#0E7490]/40 transition-all duration-300 relative overflow-hidden shadow-sm">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                                    <div className="flex items-center gap-3">
                                        <span className="font-mono text-xs text-[#0E7490] font-semibold px-2.5 py-0.5 rounded-full bg-[#FAF8F5] border border-[#E8E3DA]">
                                            0{index + 1}
                                        </span>
                                        <span className="text-sm font-semibold tracking-wide text-[#191715] flex items-center gap-2">
                                            <Briefcase size={14} className="text-[#68645E]" />
                                            {item.company}
                                        </span>
                                    </div>

                                    <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#68645E] bg-[#FAF8F5] px-3 py-1 rounded-full border border-[#E8E3DA] self-start sm:self-auto">
                                        <Calendar size={12} className="text-[#0E7490]" />
                                        <span>{item.duration}</span>
                                    </div>
                                </div>

                                <h3 className="text-2xl sm:text-3xl font-anton text-[#191715] tracking-wide mb-4">
                                    {item.title}
                                </h3>

                                {item.highlights && item.highlights.length > 0 ? (
                                    <ul className="space-y-3 pt-3 border-t border-[#E8E3DA]">
                                        {item.highlights.map((bullet, bulletIdx) => (
                                            <li
                                                key={bulletIdx}
                                                className="flex items-start gap-3 text-sm sm:text-[14.5px] text-[#68645E] font-light leading-relaxed"
                                            >
                                                <span className="mt-2 size-1.5 rounded-full bg-[#0E7490] shrink-0" />
                                                <span>{renderFormattedText(bullet)}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : item.description ? (
                                    <p className="text-sm text-[#68645E] font-light leading-relaxed">
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
