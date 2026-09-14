'use client';
import SectionTitle from '@/components/SectionTitle';
import { MY_STACK } from '@/lib/data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import Image from 'next/image';
import React, { useRef } from 'react';
import { Smartphone, Layout, Server, Database, Wrench, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CATEGORY_META: Record<string, { label: string; icon: any; gradient: string; desc: string }> = {
    mobile: {
        label: 'Mobile App Architecture',
        icon: Smartphone,
        gradient: 'from-emerald-400 to-cyan-400',
        desc: 'Fluid, cross-platform native iOS & Android applications',
    },
    frontend: {
        label: 'Frontend & Web Systems',
        icon: Layout,
        gradient: 'from-cyan-400 to-blue-500',
        desc: 'Fast, responsive, sub-second LCP modern web apps',
    },
    backend: {
        label: 'Backend APIs & Logic',
        icon: Server,
        gradient: 'from-purple-400 to-pink-500',
        desc: 'Robust REST/GraphQL services & business orchestration',
    },
    database: {
        label: 'Databases & ORMs',
        icon: Database,
        gradient: 'from-amber-400 to-orange-500',
        desc: 'Optimized schema modeling & low-latency persistence',
    },
    deployment: {
        label: 'Deployment & Mobile Release',
        icon: Rocket,
        gradient: 'from-cyan-400 to-emerald-400',
        desc: 'Vercel edge, EAS builds, App Store & Google Play distribution',
    },
    tools: {
        label: 'DevOps, Cloud & Tooling',
        icon: Wrench,
        gradient: 'from-blue-400 to-teal-400',
        desc: 'CI/CD, containerization & cloud infrastructure',
    },
};

const Skills = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.fromTo(
                '.stack-card',
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.15,
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
        <section id="my-stack" className="relative py-20 sm:py-28 overflow-hidden border-t border-[#E8E3DA] bg-[#FAF8F5]" ref={containerRef}>
            <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-14">
                    <SectionTitle title="TECHNICAL TOOLCHAIN" />
                    <p className="font-mono text-xs uppercase tracking-widest text-[#68645E] -mt-5">
                        Production ecosystems, runtime frameworks &amp; cloud deployment
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    {Object.entries(MY_STACK).map(([key, items]) => {
                        const meta = CATEGORY_META[key] || {
                            label: key.toUpperCase(),
                            icon: Layout,
                            gradient: '',
                            desc: '',
                        };
                        const Icon = meta.icon;

                        return (
                            <div
                                key={key}
                                className="stack-card group relative p-6 sm:p-8 rounded-2xl bg-white hover:bg-[#FAF8F5]/50 border border-[#E8E3DA] hover:border-[#0E7490]/40 transition-all duration-300 flex flex-col justify-between shadow-sm"
                            >
                                <div>
                                    {/* Header */}
                                    <div className="flex items-start justify-between gap-4 mb-6">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <Icon size={18} className="text-[#0E7490]" />
                                                <h3 className="text-xl sm:text-2xl font-anton text-[#191715] tracking-wide">
                                                    {meta.label}
                                                </h3>
                                            </div>
                                            <p className="text-xs text-[#68645E] font-mono">
                                                {meta.desc}
                                            </p>
                                        </div>

                                        <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-[#FAF8F5] text-[#68645E] border border-[#E8E3DA]">
                                            {items.length} technologies
                                        </span>
                                    </div>

                                    {/* Technology Pills Grid */}
                                    <div className="flex flex-wrap gap-2.5 sm:gap-3 pt-2">
                                        {items.map((item) => (
                                            <div
                                                key={item.name}
                                                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FAF8F5] hover:bg-white border border-[#E8E3DA] hover:border-[#0E7490]/40 transition-all duration-200 group/item shadow-2xs"
                                            >
                                                <div className="size-5 flex items-center justify-center shrink-0">
                                                    <Image
                                                        src={item.icon}
                                                        alt={`${item.name} logo`}
                                                        width={20}
                                                        height={20}
                                                        className="object-contain max-h-5 max-w-5 group-hover/item:scale-110 transition-transform"
                                                    />
                                                </div>
                                                <span className="text-xs sm:text-sm font-medium text-[#191715] group-hover/item:text-[#0E7490] font-mono">
                                                    {item.name}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Skills;
