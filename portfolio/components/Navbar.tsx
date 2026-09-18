'use client';

import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Github, Mail, Menu, X } from 'lucide-react';
import { GENERAL_INFO, SOCIAL_LINKS } from '@/lib/data';

const NAV_LINKS = [
    { name: 'About', url: '/#about-me' },
    { name: 'Pillars', url: '/#astryx-features' },
    { name: 'Stack', url: '/#my-stack' },
    { name: 'Experience', url: '/#my-experience' },
    { name: 'Projects', url: '/#selected-projects' },
    { name: 'Terminal', url: '/#engineering-benchmarks' },
    { name: 'Blog', url: '/blog' },
];

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    const githubUrl =
        SOCIAL_LINKS.find((s) => s.name === 'github')?.url ||
        'https://github.com/kowshik3383';

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
        <>
            <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4 pointer-events-none">
                <nav
                    className={cn(
                        'max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all duration-300 pointer-events-auto border',
                        scrolled
                            ? 'bg-white/90 backdrop-blur-xl border-[#E8E3DA] shadow-md shadow-neutral-900/5'
                            : 'bg-white/80 backdrop-blur-md border-[#E8E3DA] shadow-2xs',
                    )}
                >
                    {/* Brand / Logo (Personal Engineering Monogram) */}
                    <Link
                        href="/"
                        className="group flex items-center gap-2.5 text-[#0A1317] focus:outline-none"
                    >
                        <div className="size-7 rounded-lg bg-[#0064E0] text-white flex items-center justify-center font-outfit font-extrabold text-xs tracking-wider shadow-xs group-hover:scale-105 transition-transform">
                            KV
                        </div>
                        <div className="flex flex-col text-left">
                            <span className="font-outfit font-bold text-sm tracking-tight text-[#0A1317] group-hover:text-[#0064E0] transition-colors leading-tight">
                                KOWSHIK<span className="text-[#0064E0]">.</span>
                            </span>
                            <span className="text-[10px] font-mono text-[#4E606F] leading-none hidden sm:inline-block">
                                Full Stack &amp; Mobile
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Astryx-Style Navigation Links */}
                    <div className="hidden md:flex items-center gap-1 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#E8E3DA]">
                        {NAV_LINKS.map((link) => {
                            const isCurrentBlog = link.url === '/blog' && pathname?.startsWith('/blog');
                            return (
                                <Link
                                    key={link.name}
                                    href={link.url}
                                    className={cn(
                                        'px-3 py-1 rounded-full text-xs font-medium transition-all duration-150',
                                        isCurrentBlog
                                            ? 'text-[#0064E0] bg-white shadow-2xs font-semibold'
                                             : 'text-[#4E606F] hover:text-[#0A1317] hover:bg-white',
                                    )}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Right Action Bar (Availability pill, GitHub, Get in touch CTA) */}
                    <div className="flex items-center gap-2 sm:gap-2.5">
                        {/* Status Pill Badge */}
                        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-[11px] font-mono text-emerald-800 font-medium">
                            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span>Available for Roles</span>
                        </div>

                        {/* GitHub Button */}
                        <a
                            href={githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="size-8 rounded-full bg-[#FAF8F5] hover:bg-white border border-[#E8E3DA] flex items-center justify-center text-[#4E606F] hover:text-[#0A1317] transition-colors"
                            aria-label="GitHub Profile"
                        >
                            <Github size={15} />
                        </a>

                        {/* Primary CTA (Astryx Get Started Pill) */}
                        <button
                            onClick={handleEmailClick}
                            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#0064E0] hover:bg-[#0052b3] text-white text-xs font-medium transition-all shadow-xs group"
                        >
                            <span>Get started</span>
                            <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </button>

                        {/* Mobile Drawer Toggle */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden size-8 rounded-full bg-[#FAF8F5] hover:bg-white text-[#0A1317] border border-[#E8E3DA] flex items-center justify-center transition-colors"
                            aria-label="Toggle mobile menu"
                        >
                            {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
                        </button>
                    </div>
                </nav>
            </header>

            {/* Mobile Drawer Backdrop */}
            <div
                className={cn(
                    'fixed inset-0 z-40 bg-neutral-900/30 backdrop-blur-xs transition-opacity duration-300 md:hidden',
                    isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
                )}
                onClick={() => setIsMenuOpen(false)}
            />

            {/* Mobile Drawer Content */}
            <div
                className={cn(
                    'fixed top-0 right-0 bottom-0 w-[280px] sm:w-[320px] bg-[#FAF8F5]/98 border-l border-[#E8E3DA] z-50 p-6 flex flex-col justify-between transition-transform duration-300 ease-out md:hidden backdrop-blur-2xl shadow-2xl',
                    isMenuOpen ? 'translate-x-0' : 'translate-x-full',
                )}
            >
                <div className="space-y-6 pt-16">
                    <div className="flex items-center justify-between pb-3 border-b border-[#E8E3DA]">
                        <span className="text-[11px] font-mono uppercase tracking-widest text-[#4E606F]">Astryx System Nav</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-mono text-emerald-700">Matcha</span>
                    </div>

                    <nav className="flex flex-col space-y-2">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.name}
                                href={link.url}
                                onClick={() => setIsMenuOpen(false)}
                                className="text-base font-outfit font-semibold text-[#0A1317] hover:text-[#0064E0] transition-colors py-1.5 flex items-center justify-between"
                            >
                                <span>{link.name}</span>
                                <ArrowUpRight size={14} className="text-[#8A94A0]" />
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="space-y-4 pt-6 border-t border-[#E8E3DA]">
                    <button
                        onClick={() => {
                            setIsMenuOpen(false);
                            handleEmailClick();
                        }}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#0064E0] hover:bg-[#0052b3] text-white font-medium text-xs tracking-wide transition-all shadow-sm"
                    >
                        <Mail size={14} />
                        <span>Get in Touch</span>
                    </button>

                    <div className="flex items-center justify-center gap-4 text-xs font-mono text-[#4E606F]">
                        {SOCIAL_LINKS.map((social) => (
                            <a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noreferrer"
                                className="capitalize hover:text-[#0A1317] transition-colors"
                            >
                                {social.name}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}