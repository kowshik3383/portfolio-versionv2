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

interface CategoryMetaItem {
    label: string;
    icon: any;
    desc: string;
    built: string;
}

const CATEGORY_META: Record<string, CategoryMetaItem> = {
    mobile: {
        label: 'Mobile App Architecture',
        icon: Smartphone,
        desc: 'React Native, Expo & Native Worklets',
        built: 'Architected patient health logging flows, glucose monitors, and JSI TurboModules for iOS & Android.',
    },
    frontend: {
        label: 'Frontend & Web Systems',
        icon: Layout,
        desc: 'Next.js 15, React 19 & TypeScript',
        built: 'Shipped 30+ high-performance landing pages with sub-750ms LCP, Server Actions, and optimistic state.',
    },
    backend: {
        label: 'Backend & Speech Pipelines',
        icon: Server,
        desc: 'Node.js, Express & WebSockets',
        built: 'Engineered RBAC doctor portals, real-time voice streaming, and authenticated REST endpoints.',
    },
    database: {
        label: 'Databases & Timeseries',
        icon: Database,
        desc: 'PostgreSQL, Prisma & MySQL',
        built: 'Modeled type-safe relational schemas, nutrition telemetry logs, and optimized relational queries.',
    },
    deployment: {
        label: 'Deployment & Mobile Release',
        icon: Rocket,
        desc: 'Vercel, EAS & App Stores',
        built: 'Automated multi-platform CI/CD via Expo EAS, App Store/Play Store releases, and Vercel edge CDN.',
    },
    tools: {
        label: 'Tooling, Plugins & Sandbox',
        icon: Wrench,
        desc: 'Figma API, Docker & Git',
        built: 'Authored 100% offline Figma plugins, Docker sandbox runtimes, and live WebSocket telemetry.',
    },
};

const Skills = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.fromTo(
                '.stack-card',
                { y: 35, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.12,
                    duration: 0.7,
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
                    <SectionTitle badge="STACK & ECOSYSTEM" title="TECHNICAL TOOLCHAIN" />
                    <p className="font-mono text-xs uppercase tracking-widest text-[#4E606F] -mt-5">
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
                                className="stack-card group relative p-6 sm:p-8 rounded-3xl bg-white hover:bg-[#FAF8F5]/60 border border-[#E8E3DA] hover:border-[#0064E0]/40 transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-md"
                            >
                                <div>
                                    {/* Header */}
                                    <div className="flex items-start justify-between gap-4 mb-6">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <div className="size-8 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0064E0]">
                                                    <Icon size={16} />
                                                </div>
                                                <h3 className="text-xl sm:text-2xl font-outfit font-bold text-[#0A1317] tracking-tight">
                                                    {meta.label}
                                                </h3>
                                            </div>
                                            <p className="text-xs text-[#4E606F] font-mono">
                                                {meta.desc}
                                            </p>
                                        </div>

                                        <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#FAF8F5] text-[#4E606F] border border-[#E8E3DA] shrink-0">
                                            {items.length} technologies
                                        </span>
                                    </div>

                                    {/* Technology Pills Grid */}
                                    <div className="flex flex-wrap gap-2 sm:gap-2.5 pt-2 mb-4">
                                        {items.map((item) => (
                                            <div
                                                key={item.name}
                                                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F5] hover:bg-white border border-[#E8E3DA] hover:border-[#0064E0]/40 transition-all duration-200 group/item shadow-2xs"
                                            >
                                                <div className="size-4 flex items-center justify-center shrink-0">
                                                    <Image
                                                        src={item.icon}
                                                        alt={`${item.name} logo`}
                                                        width={16}
                                                        height={16}
                                                        className="object-contain max-h-4 max-w-4 group-hover/item:scale-110 transition-transform"
                                                    />
                                                </div>
                                                <span className="text-xs font-medium text-[#0A1317] group-hover/item:text-[#0064E0] font-sans">
                                                    {item.name}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* What I Built Narrative Proof */}
                                    <div className="pt-3 border-t border-[#E8E3DA]/80">
                                        <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#0064E0] font-semibold mb-1">
                                            <span>SHIPPED IN PRODUCTION</span>
                                        </div>
                                        <p className="text-xs text-[#4E606F] leading-relaxed">
                                            {meta.built}
                                        </p>
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
