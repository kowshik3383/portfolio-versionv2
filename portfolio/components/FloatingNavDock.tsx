'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { FloatingDock } from '@/components/ui/floating-dock';
import {
    Home,
    Terminal,
    FolderGit2,
    BookOpen,
    Mail,
    Github,
    Linkedin,
    Cpu,
} from 'lucide-react';
import { GENERAL_INFO, SOCIAL_LINKS } from '@/lib/data';

export default function FloatingNavDock() {
    const [isVisible, setIsVisible] = useState(false);
    const pathname = usePathname();

    const githubUrl =
        SOCIAL_LINKS.find((s) => s.name === 'github')?.url ||
        'https://github.com/kowshik3383';
    const linkedinUrl =
        SOCIAL_LINKS.find((s) => s.name === 'linkedin')?.url ||
        GENERAL_INFO.upworkProfile;

    const navItems = [
        {
            title: 'Home',
            icon: <Home className="size-full text-neutral-700 hover:text-black transition-colors" />,
            href: '/#banner',
        },
        {
            title: 'About',
            icon: <Cpu className="size-full text-neutral-700 hover:text-black transition-colors" />,
            href: '/#about-me',
        },
        {
            title: 'Kowshik CLI',
            icon: <Terminal className="size-full text-[#0E7490] hover:text-black transition-colors" />,
            href: '/#engineering-benchmarks',
        },
        {
            title: 'Projects',
            icon: <FolderGit2 className="size-full text-neutral-700 hover:text-black transition-colors" />,
            href: '/#selected-projects',
        },
        {
            title: 'Blog',
            icon: <BookOpen className="size-full text-neutral-700 hover:text-black transition-colors" />,
            href: '/blog',
        },
        {
            title: 'GitHub',
            icon: <Github className="size-full text-neutral-700 hover:text-black transition-colors" />,
            href: githubUrl,
        },
        {
            title: 'LinkedIn',
            icon: <Linkedin className="size-full text-[#0A66C2] transition-colors" />,
            href: linkedinUrl,
        },
        {
            title: 'Contact',
            icon: <Mail className="size-full text-[#0E7490] hover:text-black transition-colors" />,
            href: `mailto:${GENERAL_INFO.email}?subject=${encodeURIComponent(
                GENERAL_INFO.emailSubject
            )}`,
        },
    ];

    useEffect(() => {
        // If on another page like /blog, keep dock visible
        if (pathname && pathname !== '/') {
            setIsVisible(true);
            return;
        }

        const checkVisibility = () => {
            const target =
                document.getElementById('engineering-benchmarks') ||
                document.getElementById('about-me');

            if (!target) {
                setIsVisible(false);
                return;
            }

            const rect = target.getBoundingClientRect();
            // Show dock once user reaches the Engineering Benchmarks & Principles section
            if (rect.top <= window.innerHeight * 0.85) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', checkVisibility, { passive: true });
        checkVisibility();

        return () => window.removeEventListener('scroll', checkVisibility);
    }, [pathname]);

    return (
        <div className="fixed bottom-6 inset-x-0 z-50 flex items-center justify-center pointer-events-none print:hidden px-4">
            <AnimatePresence>
                {isVisible && (
                    <motion.aside
                        initial={{ opacity: 0, y: 35, scale: 0.92 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 35, scale: 0.92 }}
                        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                        aria-label="Floating Navigation Dock"
                        className="pointer-events-auto"
                    >
                        <FloatingDock
                            items={navItems}
                            desktopClassName="border-[#E8E3DA] bg-[#FAF8F5]/90 shadow-xl shadow-neutral-900/10"
                            mobileClassName="translate-y-0"
                        />
                    </motion.aside>
                )}
            </AnimatePresence>
        </div>
    );
}
