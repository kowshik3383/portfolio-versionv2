'use client';

import { GENERAL_INFO, SOCIAL_LINKS } from '@/lib/data';
import { ArrowUpRight, Copy, Check, Mail, Clock } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const Footer = () => {
    const [copied, setCopied] = useState(false);
    const [time, setTime] = useState<string>('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const timeStr = now.toLocaleTimeString('en-US', {
                timeZone: 'Asia/Kolkata',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
            });
            setTime(`${timeStr} IST`);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(GENERAL_INFO.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <footer
            id="contact"
            className="relative overflow-hidden border-t border-[#E8E3DA] bg-white pt-16 pb-28 sm:pt-20 sm:pb-16 print:hidden"
        >
            <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* 4-Column Astryx Footer Navigation */}
                <div className="grid grid-cols-2 md:grid-cols-12 gap-8 lg:gap-12 pb-12 sm:pb-16 border-b border-[#E8E3DA] text-sm">
                    {/* Brand & Monogram Column (Span 4) */}
                    <div className="col-span-2 md:col-span-4 space-y-4">
                        <Link href="/" className="flex items-center gap-2 text-[#0A1317] group">
                            <div className="size-6 rounded-md bg-[#0064E0] text-white flex items-center justify-center font-outfit font-extrabold text-[11px] tracking-wider group-hover:scale-105 transition-transform">
                                KV
                            </div>
                            <span className="font-outfit font-bold tracking-tight text-base text-[#0A1317]">
                                KOWSHIK VALIPIREDDY
                            </span>
                        </Link>
                        <p className="text-xs sm:text-sm text-[#4E606F] font-normal leading-relaxed max-w-sm">
                            Full-stack engineer &amp; React Native specialist. High-concurrency web systems, low-latency mobile apps, and agent-ready architectures.
                        </p>
                        <div className="pt-1 flex items-center gap-2 text-xs font-mono text-[#4E606F]">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#E8E3DA]">
                                <Clock size={12} className="text-[#0064E0]" />
                                <span>{time || 'IST (Asia/Kolkata)'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: System Architecture (Span 3) */}
                    <div className="col-span-1 md:col-span-3 space-y-3">
                        <p className="text-xs font-mono uppercase tracking-widest text-[#0A1317] font-semibold">Architecture</p>
                        <ul className="space-y-2 text-xs text-[#4E606F]">
                            <li>
                                <Link href="/#about-me" className="hover:text-[#0064E0] transition-colors">First Principles</Link>
                            </li>
                            <li>
                                <Link href="/#my-stack" className="hover:text-[#0064E0] transition-colors">Technical Toolchain</Link>
                            </li>
                            <li>
                                <Link href="/#engineering-benchmarks" className="hover:text-[#0064E0] transition-colors">Personal CLI Terminal</Link>
                            </li>
                            <li>
                                <Link href="/#selected-projects" className="hover:text-[#0064E0] transition-colors">Production Systems</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Work & Production (Span 3) */}
                    <div className="col-span-1 md:col-span-3 space-y-3">
                        <p className="text-xs font-mono uppercase tracking-widest text-[#0A1317] font-semibold">Production</p>
                        <ul className="space-y-2 text-xs text-[#4E606F]">
                            <li>
                                <Link href="/#selected-projects" className="hover:text-[#0064E0] transition-colors">Selected Projects</Link>
                            </li>
                            <li>
                                <Link href="/#my-experience" className="hover:text-[#0064E0] transition-colors">Engineering Track Record</Link>
                            </li>
                            <li>
                                <Link href="/blog" className="hover:text-[#0064E0] transition-colors">Technical Articles</Link>
                            </li>
                            <li>
                                <Link href="/resume" className="hover:text-[#0064E0] transition-colors">Verified Resume</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Contact & Socials (Span 2) */}
                    <div className="col-span-2 md:col-span-2 space-y-3">
                        <p className="text-xs font-mono uppercase tracking-widest text-[#0A1317] font-semibold">Connect</p>
                        <ul className="space-y-2 text-xs text-[#4E606F]">
                            <li>
                                <button
                                    onClick={handleCopy}
                                    className="hover:text-[#0064E0] transition-colors inline-flex items-center gap-1.5"
                                >
                                    <span>{copied ? 'Copied!' : 'Copy Email'}</span>
                                    {copied ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                                </button>
                            </li>
                            {SOCIAL_LINKS.map((s) => (
                                <li key={s.name}>
                                    <a
                                        href={s.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="capitalize hover:text-[#0064E0] transition-colors inline-flex items-center gap-1"
                                    >
                                        <span>{s.name}</span>
                                        <ArrowUpRight size={11} className="text-[#8A94A0]" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Legal & Tech reference */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#4E606F]">
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                        <p>© {new Date().getFullYear()} Kowshik Valipireddy. All rights reserved.</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-mono text-[#8A94A0]">
                        <span>React 19</span>
                        <span>·</span>
                        <span>Next.js 15</span>
                        <span>·</span>
                        <span>TypeScript</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
