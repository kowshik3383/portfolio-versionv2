'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { GENERAL_INFO } from '@/lib/data';

export default function AstryxDiscoveryBanner() {
    const handleEmailClick = () => {
        const subject = encodeURIComponent(GENERAL_INFO.emailSubject);
        const body = encodeURIComponent(GENERAL_INFO.emailBody);
        const mailto = `mailto:${GENERAL_INFO.email}?subject=${subject}&body=${body}`;

        window.location.href = mailto;
        setTimeout(() => {
            window.open(
                `https://mail.google.com/mail/?view=cm&fs=1&to=${GENERAL_INFO.email}&su=${subject}&body=${body}`,
                '_blank',
            );
        }, 300);
    };

    return (
        <section className="relative py-12 sm:py-16 bg-[#FAF8F5]">
            <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative rounded-3xl bg-white border border-[#E8E3DA] p-8 sm:p-12 lg:p-16 overflow-hidden shadow-xs">
                    {/* Ambient Aurora Accents inside banner */}
                    <div
                        className="absolute -top-24 -right-24 size-96 rounded-full bg-[#0064E0]/10 blur-3xl pointer-events-none"
                        aria-hidden="true"
                    />
                    <div
                        className="absolute -bottom-24 -left-24 size-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"
                        aria-hidden="true"
                    />

                    <div className="relative z-10 max-w-3xl space-y-5">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#E8E3DA] text-xs font-mono text-emerald-800">
                            <span className="size-2 rounded-full bg-emerald-500 animate-ping" />
                            <span>Available for new contracts &amp; senior roles</span>
                        </div>

                        <h2 className="font-outfit text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0A1317] leading-[1.08]">
                            Let&apos;s build reliable <span className="text-[#0064E0]">software together</span>
                        </h2>

                        <p className="text-base sm:text-lg text-[#4E606F] font-normal leading-relaxed max-w-2xl">
                            Looking for a Senior Full Stack or React Native Engineer with 0-to-1 ownership experience? Open for high-impact engineering roles, contract consulting, and architectural advisory.
                        </p>

                        <div className="flex flex-wrap items-center gap-3.5 pt-4">
                            <button
                                onClick={handleEmailClick}
                                className="px-7 py-3 rounded-full font-outfit font-semibold bg-[#0064E0] hover:bg-[#0052B3] text-white transition-all text-sm shadow-xs inline-flex items-center gap-2"
                            >
                                <span>Get in touch</span>
                                <ArrowUpRight size={16} />
                            </button>

                            <Link
                                href="#selected-projects"
                                className="px-6 py-3 rounded-full font-outfit font-semibold border border-[#E8E3DA] bg-[#FAF8F5] hover:bg-white text-[#0A1317] transition-all text-sm inline-flex items-center gap-2 shadow-2xs"
                            >
                                <span>Explore work</span>
                                <ArrowRight size={14} className="text-[#4E606F]" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
