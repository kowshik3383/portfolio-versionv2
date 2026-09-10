'use client';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Mail, Menu, X } from 'lucide-react';
import { GENERAL_INFO, SOCIAL_LINKS } from '@/lib/data';

const NAV_LINKS = [
    { name: 'About', url: '/#about-me' },
    { name: 'Stack', url: '/#my-stack' },
    { name: 'Experience', url: '/#my-experience' },
    { name: 'Projects', url: '/#selected-projects' },
    { name: 'Blog', url: '/blog' },
    { name: 'Resume', url: '/resume' },
];

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

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
                        'max-w-5xl mx-auto flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all duration-300 pointer-events-auto border',
                        scrolled
                            ? 'bg-neutral-950/80 backdrop-blur-xl border-white/10 shadow-2xl shadow-black/60'
                            : 'bg-neutral-900/40 backdrop-blur-md border-white/5',
                    )}
                >
                    {/* Brand / Logo */}
                    <Link
                        href="/"
                        className="group flex items-center gap-2.5 text-white font-anton tracking-wider text-base sm:text-lg focus:outline-none"
                    >
                        <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="group-hover:text-primary transition-colors">
                            KOWSHIK<span className="text-primary">.</span>DEV
                        </span>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center gap-1 sm:gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/5">
                        {NAV_LINKS.map((link) => {
                            const isCurrentBlog = link.url === '/blog' && pathname?.startsWith('/blog');
                            return (
                                <Link
                                    key={link.name}
                                    href={link.url}
                                    className={cn(
                                        'px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200',
                                        isCurrentBlog
                                            ? 'text-white bg-white/10 shadow-sm'
                                            : 'text-neutral-300 hover:text-white hover:bg-white/5',
                                    )}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Right CTA / Menu Toggle */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        <button
                            onClick={handleEmailClick}
                            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white text-xs font-medium transition-all group"
                        >
                            <span>Hire Me</span>
                            <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </button>

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 transition-colors"
                            aria-label="Toggle mobile menu"
                        >
                            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
                        </button>
                    </div>
                </nav>
            </header>

            {/* Mobile Drawer Overlay */}
            <div
                className={cn(
                    'fixed inset-0 z-40 bg-black/80 backdrop-blur-md transition-opacity duration-300 md:hidden',
                    isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
                )}
                onClick={() => setIsMenuOpen(false)}
            />

            {/* Mobile Drawer Content */}
            <div
                className={cn(
                    'fixed top-0 right-0 bottom-0 w-[280px] sm:w-[320px] bg-neutral-950/95 border-l border-white/10 z-50 p-6 flex flex-col justify-between transition-transform duration-300 ease-out md:hidden backdrop-blur-2xl shadow-2xl',
                    isMenuOpen ? 'translate-x-0' : 'translate-x-full',
                )}
            >
                <div className="space-y-6 pt-16">
                    <p className="text-[11px] font-mono uppercase tracking-widest text-neutral-500">Navigation</p>
                    <nav className="flex flex-col space-y-3">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.name}
                                href={link.url}
                                onClick={() => setIsMenuOpen(false)}
                                className="text-lg font-anton tracking-wide text-neutral-200 hover:text-primary transition-colors py-1 flex items-center justify-between"
                            >
                                <span>{link.name}</span>
                                <ArrowUpRight size={14} className="text-neutral-500" />
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="space-y-6 pt-6 border-t border-white/10">
                    <button
                        onClick={() => {
                            setIsMenuOpen(false);
                            handleEmailClick();
                        }}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-black font-semibold text-xs tracking-wider uppercase transition-transform active:scale-95"
                    >
                        <Mail size={15} />
                        <span>Start Conversation</span>
                    </button>

                    <div className="flex items-center justify-center gap-4 text-xs text-neutral-400">
                        {SOCIAL_LINKS.map((social) => (
                            <a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noreferrer"
                                className="capitalize hover:text-white transition-colors"
                            >
                                {social.name}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;