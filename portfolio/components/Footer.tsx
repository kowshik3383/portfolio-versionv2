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
            className="relative overflow-hidden border-t border-white/10 bg-neutral-950/60 pt-20 pb-12 sm:pt-28 sm:pb-16 print:hidden"
        >
            <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Statement CTA Box */}
                <div className="relative rounded-3xl bg-white/[0.02] border border-white/10 p-8 sm:p-12 lg:p-16 overflow-hidden backdrop-blur-xl mb-16">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-500/10 via-emerald-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

                    <div className="max-w-3xl space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-cyan-400">
                            <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
                            <span>Available for new contracts &amp; engineering roles</span>
                        </div>

                        <h2 className="text-4xl sm:text-6xl md:text-7xl font-anton text-white tracking-tight leading-[0.95] uppercase">
                            Let&apos;s Build Something{' '}
                            <span className="bg-gradient-to-r from-cyan-300 via-teal-200 to-emerald-300 bg-clip-text text-transparent">
                                Exceptional
                            </span>
                            .
                        </h2>

                        <p className="text-base sm:text-lg text-neutral-400 font-light max-w-xl">
                            Have an idea, web app, or React Native mobile project you want to bring to life? Let&apos;s connect and craft it together.
                        </p>

                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-4">
                            <button
                                onClick={handleEmailClick}
                                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-black font-semibold text-sm tracking-wide transition-all duration-200 hover:bg-primary-hover shadow-lg hover:shadow-cyan-400/20"
                            >
                                <Mail size={16} />
                                <span>Send Direct Email</span>
                            </button>

                            <button
                                onClick={handleCopy}
                                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-mono transition-colors"
                            >
                                {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                                <span>{copied ? 'Copied to Clipboard!' : GENERAL_INFO.email}</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer Navigation & Metadata Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/5 text-sm">
                    {/* Left: Monogram & Philosophy */}
                    <div className="md:col-span-5 space-y-3">
                        <Link href="/" className="text-lg font-anton tracking-wider text-white">
                            KOWSHIK<span className="text-primary">.</span>DEV
                        </Link>
                        <p className="text-xs text-neutral-400 font-light max-w-sm leading-relaxed">
                            Full-stack web engineer and React Native mobile developer dedicated to high performance, elegant UX, and robust system architecture.
                        </p>
                    </div>

                    {/* Middle: Fast Links */}
                    <div className="md:col-span-4 space-y-3">
                        <p className="text-xs font-mono uppercase tracking-widest text-neutral-300">Navigation</p>
                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-neutral-400">
                            <Link href="/#about-me" className="hover:text-white transition-colors">About</Link>
                            <Link href="/#my-stack" className="hover:text-white transition-colors">Stack</Link>
                            <Link href="/#my-experience" className="hover:text-white transition-colors">Experience</Link>
                            <Link href="/#selected-projects" className="hover:text-white transition-colors">Projects</Link>
                            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
                            <Link href="/resume" className="hover:text-cyan-400 text-neutral-300 font-medium transition-colors">Resume</Link>
                        </div>
                    </div>

                    {/* Right: Live Local Time & Socials */}
                    <div className="md:col-span-3 space-y-3">
                        <p className="text-xs font-mono uppercase tracking-widest text-neutral-300">Current Time</p>
                        <div className="inline-flex items-center gap-2 text-xs font-mono text-neutral-300 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/5">
                            <Clock size={13} className="text-cyan-400" />
                            <span>{time || 'Loading IST...'}</span>
                        </div>
                        <div className="flex items-center gap-4 pt-2 text-xs text-neutral-400">
                            {SOCIAL_LINKS.map((s) => (
                                <a
                                    key={s.name}
                                    href={s.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="capitalize hover:text-cyan-400 transition-colors inline-flex items-center gap-0.5"
                                >
                                    <span>{s.name}</span>
                                    <ArrowUpRight size={11} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Copyright & Credit */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-300">
                    <p>© {new Date().getFullYear()} Kowshik Valipireddy. All rights reserved.</p>
                    <p className="text-neutral-300">Engineered with Next.js 15 &amp; React 19</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
