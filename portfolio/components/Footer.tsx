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
        <footer
            id="contact"
            className="relative overflow-hidden border-t border-[#E8E3DA] bg-[#FAF8F5] pt-20 pb-12 sm:pt-28 sm:pb-16 print:hidden"
        >
            <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Statement CTA Box */}
                <div className="relative rounded-3xl bg-white border border-[#E8E3DA] p-8 sm:p-12 lg:p-16 overflow-hidden shadow-sm mb-16">
                    <div className="max-w-3xl space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#E8E3DA] text-xs font-mono text-emerald-800">
                            <span className="size-2 rounded-full bg-emerald-500 animate-ping" />
                            <span>Available for new contracts &amp; engineering roles</span>
                        </div>

                        <h2 className="text-4xl sm:text-6xl md:text-7xl font-anton text-[#191715] tracking-tight leading-[0.95] uppercase">
                            Let&apos;s Build Something{' '}
                            <span className="text-[#0E7490]">
                                Exceptional
                            </span>
                            .
                        </h2>

                        <p className="text-base sm:text-lg text-[#68645E] font-light max-w-xl">
                            Have an idea, web app, or React Native mobile project you want to bring to life? Let&apos;s connect and engineer it together.
                        </p>

                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-4">
                            <button
                                onClick={handleEmailClick}
                                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#0E7490] hover:bg-[#0c627a] text-white font-semibold text-sm tracking-wide transition-all duration-200 shadow-sm"
                            >
                                <Mail size={16} />
                                <span>Send Direct Email</span>
                            </button>

                            <button
                                onClick={handleCopy}
                                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#FAF8F5] hover:bg-white border border-[#E8E3DA] text-[#191715] text-sm font-mono transition-colors"
                            >
                                {copied ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
                                <span>{copied ? 'Copied to Clipboard!' : GENERAL_INFO.email}</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer Navigation & Metadata Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#E8E3DA] text-sm">
                    {/* Left: Monogram & Philosophy */}
                    <div className="md:col-span-5 space-y-3">
                        <Link href="/" className="text-lg font-anton tracking-wider text-[#191715]">
                            KOWSHIK<span className="text-[#0E7490]">.</span>DEV
                        </Link>
                        <p className="text-xs text-[#68645E] font-light max-w-sm leading-relaxed">
                            Full-stack web engineer and React Native mobile developer dedicated to high performance, sub-second latency, and deterministic systems.
                        </p>
                    </div>

                    {/* Middle: Fast Links */}
                    <div className="md:col-span-4 space-y-3">
                        <p className="text-xs font-mono uppercase tracking-widest text-[#68645E]">Navigation</p>
                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-[#68645E]">
                            <Link href="/#about-me" className="hover:text-[#191715] transition-colors">Principles</Link>
                            <Link href="/#my-stack" className="hover:text-[#191715] transition-colors">Stack</Link>
                            <Link href="/#my-experience" className="hover:text-[#191715] transition-colors">Experience</Link>
                            <Link href="/#selected-projects" className="hover:text-[#191715] transition-colors">Projects</Link>
                            <Link href="/blog" className="hover:text-[#191715] transition-colors">Blog</Link>
                            <Link href="/resume" className="hover:text-[#0E7490] text-[#191715] font-medium transition-colors">Resume</Link>
                        </div>
                    </div>

                    {/* Right: Live Local Time & Socials */}
                    <div className="md:col-span-3 space-y-3">
                        <p className="text-xs font-mono uppercase tracking-widest text-[#68645E]">Current Time</p>
                        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#191715] px-3 py-1.5 rounded-lg bg-white border border-[#E8E3DA]">
                            <Clock size={13} className="text-[#0E7490]" />
                            <span>{time || 'Loading IST...'}</span>
                        </div>
                        <div className="flex items-center gap-4 pt-2 text-xs text-[#68645E]">
                            {SOCIAL_LINKS.map((s) => (
                                <a
                                    key={s.name}
                                    href={s.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="capitalize hover:text-[#191715] transition-colors inline-flex items-center gap-0.5"
                                >
                                    <span>{s.name}</span>
                                    <ArrowUpRight size={11} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Copyright & Credit */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#68645E]">
                    <p>© {new Date().getFullYear()} Kowshik Valipireddy. All rights reserved.</p>
                    <p className="text-[#68645E]">Engineered with Next.js 15 &amp; React 19</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
