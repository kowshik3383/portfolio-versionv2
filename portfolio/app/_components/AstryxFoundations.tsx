'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Gauge, Users, Sparkles, CheckCircle2 } from 'lucide-react';
import SectionTitle from '@/components/SectionTitle';

export default function AstryxFoundations() {
    const foundations = [
        {
            title: 'Design for speed',
            description:
                'Foundations you can trust, speed you can feel. The system is built so teams stop reinventing the basics and start shipping the ideas that matter.',
            linkText: 'Get started in minutes',
            href: '#selected-projects',
            icon: Gauge,
            badge: 'Sub-second LCP · 120 FPS',
        },
        {
            title: 'Built by the people who use it',
            description:
                'The system gets sharper when we put it to work in the real world. Using it in context strengthens the whole system for everyone.',
            linkText: 'Learn how to collaborate',
            href: '#contact',
            icon: Users,
            badge: 'Production Feedback Loop',
        },
        {
            title: "Ready for what's next",
            description:
                'The quality bar is accelerating. Astryx pairs opinionated foundations with flexible patterns so your system keeps pace, no matter how the craft evolves.',
            linkText: "See what's new",
            href: '#engineering-benchmarks',
            icon: Sparkles,
            badge: 'Agentic Workflows · MCP',
        },
    ];

    return (
        <section className="relative py-20 sm:py-28 bg-[#FAF8F5] border-t border-[#E8E3DA]">
            <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Metric Heading */}
                <div className="max-w-3xl mb-14 sm:mb-16">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-[11px] font-mono text-emerald-800 font-medium mb-3">
                        <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>PRODUCTION TRACK RECORD</span>
                    </div>
                    <h2 className="font-outfit text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-[#0A1317] leading-[1.1] mb-4">
                        Powers over 500,000+ users across web &amp; mobile
                    </h2>
                    <p className="text-base sm:text-lg text-[#4E606F] font-normal leading-relaxed text-balance">
                        Grown across years of production delivery, shaped by real-world performance budgets, strict cross-platform runtimes, and engineering teams who depend on it every day.
                    </p>
                </div>

                {/* 3 Foundation Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {foundations.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={item.title}
                                className="group p-7 sm:p-8 rounded-3xl bg-white border border-[#E8E3DA] hover:border-[#0064E0]/40 transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-md"
                            >
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="size-10 rounded-2xl bg-[#FAF8F5] border border-[#E8E3DA] flex items-center justify-center text-[#0064E0] group-hover:scale-110 transition-transform">
                                            <Icon size={20} />
                                        </div>
                                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FAF8F5] border border-[#E8E3DA] text-[#4E606F]">
                                            {item.badge}
                                        </span>
                                    </div>

                                    <h3 className="font-outfit text-xl sm:text-2xl font-bold tracking-tight text-[#0A1317]">
                                        {item.title}
                                    </h3>

                                    <p className="text-sm text-[#4E606F] font-normal leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>

                                <div className="pt-6 mt-6 border-t border-[#F0ECE4]">
                                    <Link
                                        href={item.href}
                                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0064E0] hover:text-[#0052B3] group/link"
                                    >
                                        <span>{item.linkText}</span>
                                        <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
