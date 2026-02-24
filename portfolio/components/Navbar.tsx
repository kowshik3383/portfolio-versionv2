'use client';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { MoveUpRight, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { GENERAL_INFO, SOCIAL_LINKS } from '@/lib/data';

const COLORS = [
    'bg-gradient-to-br from-yellow-400 to-orange-500 text-black',
    'bg-gradient-to-br from-blue-500 to-indigo-600 text-white',
    'bg-gradient-to-br from-teal-400 to-cyan-500 text-black',
    'bg-gradient-to-br from-indigo-500 to-purple-600 text-white',
];

const MENU_LINKS = [
    {
        name: 'Home',
        url: '/',
    },
    {
        name: 'About Me',
        url: '/#about-me',
    },
    {
        name: 'Experience',
        url: '/#my-experience',
    },
    {
        name: 'Projects',
        url: '/#selected-projects',
    },
];

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const router = useRouter();
    const handleEmailClick = () => {
        const mailto = `mailto:${GENERAL_INFO.email}?subject=${encodeURIComponent(
            GENERAL_INFO.emailSubject
        )}&body=${encodeURIComponent(GENERAL_INFO.emailBody)}`;

        // Try native mail app
        window.location.href = mailto;

        // Fallback for Android / Chrome
        setTimeout(() => {
            window.open(
                `https://mail.google.com/mail/?view=cm&fs=1&to=${GENERAL_INFO.email}&su=${encodeURIComponent(
                    GENERAL_INFO.emailSubject
                )}&body=${encodeURIComponent(GENERAL_INFO.emailBody)}`,
                '_blank'
            );
        }, 300);
    };

    return (
        <>
            <div className="sticky top-0 z-[4]">
                <button
                    className={cn(
                        'group size-14 absolute top-5 right-5 md:right-10 z-[2]',
                        'backdrop-blur-sm bg-background/30 rounded-full',
                        'border border-white/10 hover:border-white/20 transition-all duration-300',
                        'hover:shadow-lg hover:shadow-primary/20',
                        'flex items-center justify-center',
                    )}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span
                        className={cn(
                            'inline-block w-5 h-0.5 bg-foreground rounded-full absolute duration-300',
                            {
                                'rotate-45': isMenuOpen,
                                '-translate-y-1.5 md:group-hover:rotate-12': !isMenuOpen,
                            },
                        )}
                    ></span>
                    <span
                        className={cn(
                            'inline-block w-5 h-0.5 bg-foreground rounded-full absolute duration-300',
                            {
                                '-rotate-45': isMenuOpen,
                                'translate-y-1.5 md:group-hover:-rotate-12': !isMenuOpen,
                            },
                        )}
                    ></span>
                </button>
            </div>

            <div
                className={cn(
                    'overlay fixed inset-0 z-[2] bg-black/80 backdrop-blur-sm transition-all duration-500',
                    {
                        'opacity-0 invisible pointer-events-none': !isMenuOpen,
                    },
                )}
                onClick={() => setIsMenuOpen(false)}
            ></div>

            <div
                className={cn(
                    'fixed top-0 right-0 h-[100dvh] w-[500px] max-w-[calc(100vw-3rem)] transform translate-x-full transition-transform duration-700 z-[3] overflow-hidden',
                    'flex flex-col lg:justify-center py-10',
                    { 'translate-x-0': isMenuOpen },
                )}
            >
                {/* Animated background with gradient */}
                <div
                    className={cn(
                        'fixed inset-0 scale-150 translate-x-1/2 rounded-[50%] duration-700 delay-150 z-[-2]',
                        'bg-gradient-to-br from-background-light via-background-light to-background',
                        {
                            'translate-x-0': isMenuOpen,
                        },
                    )}
                ></div>

                {/* Subtle grain texture overlay */}
                <div className="fixed inset-0 z-[-1] opacity-[0.02] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>

                <div className="grow flex md:items-center w-full max-w-[340px] mx-8 sm:mx-auto">
                    <div className="flex gap-12 lg:gap-16 lg:justify-between max-lg:flex-col w-full">
                        <div className="max-lg:order-2 space-y-6">
                            <div className="flex items-center gap-2">
                                <div className="h-px w-6 bg-gradient-to-r from-transparent to-muted-foreground/50"></div>
                                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground/80 uppercase">
                                    Social
                                </p>
                            </div>
                            <ul className="space-y-4">
                                {SOCIAL_LINKS.map((link, idx) => (
                                    <li
                                        key={link.name}
                                        className={cn(
                                            'opacity-0 translate-x-4 transition-all duration-500',
                                            {
                                                'opacity-100 translate-x-0': isMenuOpen,
                                            },
                                        )}
                                        style={{
                                            transitionDelay: `${300 + idx * 50}ms`,
                                        }}
                                    >
                                        <a
                                            href={link.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="group text-base capitalize inline-flex items-center gap-2 hover:text-primary transition-colors relative"
                                        >
                                            <span className="relative">
                                                {link.name}
                                                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300"></span>
                                            </span>
                                            <MoveUpRight
                                                size={14}
                                                className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300"
                                            />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center gap-2">
                                <div className="h-px w-6 bg-gradient-to-r from-transparent to-muted-foreground/50"></div>
                                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground/80 uppercase">
                                    Menu
                                </p>
                            </div>
                            <ul className="space-y-4">
                                {MENU_LINKS.map((link, idx) => (
                                    <li
                                        key={link.name}
                                        className={cn(
                                            'opacity-0 translate-x-4 transition-all duration-500',
                                            {
                                                'opacity-100 translate-x-0': isMenuOpen,
                                            },
                                        )}
                                        style={{
                                            transitionDelay: `${200 + idx * 50}ms`,
                                        }}
                                    >
                                        <button
                                            onClick={() => {
                                                router.push(link.url);
                                                setIsMenuOpen(false);
                                            }}
                                            onMouseEnter={() => setHoveredIndex(idx)}
                                            onMouseLeave={() => setHoveredIndex(null)}
                                            className="group text-xl font-medium flex items-center gap-3 relative"
                                        >
                                            <span
                                                className={cn(
                                                    'relative size-4 rounded-full flex items-center justify-center transition-all duration-300',
                                                    'before:absolute before:inset-0 before:rounded-full before:bg-white/5 before:scale-100',
                                                    'group-hover:before:scale-150 group-hover:before:opacity-0 before:transition-all before:duration-500',
                                                    COLORS[idx],
                                                    {
                                                        'scale-125 shadow-lg': hoveredIndex === idx,
                                                    },
                                                )}
                                            >
                                                <MoveUpRight
                                                    size={10}
                                                    className={cn(
                                                        'scale-0 transition-all duration-300',
                                                        {
                                                            'scale-100 rotate-0': hoveredIndex === idx,
                                                        },
                                                    )}
                                                />
                                            </span>
                                            <span className="relative">
                                                {link.name}
                                                <span
                                                    className={cn(
                                                        'absolute -bottom-1 left-0 h-px bg-gradient-to-r transition-all duration-300',
                                                        COLORS[idx],
                                                        {
                                                            'w-full opacity-30': hoveredIndex === idx,
                                                            'w-0 opacity-0': hoveredIndex !== idx,
                                                        },
                                                    )}
                                                ></span>
                                            </span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div
                    className={cn(
                        'w-full max-w-[340px] mx-8 sm:mx-auto space-y-4 opacity-0 translate-y-4 transition-all duration-500 delay-500',
                        {
                            'opacity-100 translate-y-0': isMenuOpen,
                        },
                    )}
                >
                    <div className="flex items-center gap-2">
                        <div className="h-px w-6 bg-gradient-to-r from-transparent to-muted-foreground/50"></div>
                        <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground/80 uppercase">
                            Get in Touch
                        </p>
                    </div>
                    <a
                        onClick={handleEmailClick}
                        className="group inline-flex cursor-pointer items-center gap-3 px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300"
                    >

                        <Mail
                            size={16}
                            className="text-muted-foreground group-hover:text-primary transition-colors"
                        />
                        <span className="text-sm font-medium">{GENERAL_INFO.email}</span>
                        <MoveUpRight
                            size={14}
                            className="ml-auto opacity-0 group-hover:opacity-100 -translate-y-1 translate-x-1 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300"
                        />
                    </a>

                </div>
            </div>
        </>
    );
};

export default Navbar;