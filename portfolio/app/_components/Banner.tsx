'use client';
import ArrowAnimation from '@/components/ArrowAnimation';
import Button from '@/components/Button';
import { GENERAL_INFO } from '@/lib/data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React, { useState, useEffect } from 'react';
import { Code2, Database, Palette } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ROLES = [
    {
        title: 'FRONTEND',
        subtitle: 'DEVELOPER',
        icon: Code2,
        gradient: 'from-blue-500 via-cyan-500 to-teal-500',
        description: 'Building high-performance, scalable, and responsive web solutions with modern frameworks and technologies.',
    },
    {
        title: 'BACKEND',
        subtitle: 'DEVELOPER',
        icon: Database,
        gradient: 'from-purple-500 via-pink-500 to-rose-500',
        description: 'Crafting robust server-side applications, APIs, and database architectures for seamless functionality.',
    },
    {
        title: 'WEB',
        subtitle: 'DESIGNER',
        icon: Palette,
        gradient: 'from-orange-500 via-amber-500 to-yellow-500',
        description: 'Creating beautiful, user-centric designs that blend aesthetics with exceptional user experiences.',
    },
];

const Banner = () => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const currentRole = ROLES[currentRoleIndex];

    // Auto-rotate roles
    useEffect(() => {
        const interval = setInterval(() => {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length);
                setIsAnimating(false);
            }, 300);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    // move the content a little up on scroll
    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'bottom 70%',
                    end: 'bottom 10%',
                    scrub: 1,
                },
            });

            tl.fromTo(
                '.slide-up-and-fade',
                { y: 0 },
                { y: -150, opacity: 0, stagger: 0.02 },
            );
        },
        { scope: containerRef },
    );

    const handleRoleClick = (index: number) => {
        if (index !== currentRoleIndex && !isAnimating) {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentRoleIndex(index);
                setIsAnimating(false);
            }, 300);
        }
    };

    return (
        <section className="relative overflow-hidden" id="banner">
            <ArrowAnimation />

            {/* Animated gradient background */}
            <div className="absolute inset-0 -z-10 opacity-20">
                <div
                    className={`absolute inset-0 transition-all duration-1000 blur-3xl`}
                    style={{ transform: 'scale(1.5)' }}
                />
            </div>

            <div
                className="container h-[100svh] min-h-[530px] max-md:pb-10 flex justify-between items-center max-md:flex-col"
                ref={containerRef}
            >
                <div className="max-md:grow max-md:flex flex-col justify-center items-start max-w-[600px]">
                    {/* Role indicator with icon */}
                    <div className="slide-up-and-fade mb-6 flex items-center gap-3">
                        <div className={`p-2.5 rounded-xl bg-gradient-to-br ${currentRole.gradient} shadow-lg transition-all duration-500`}>
                            <currentRole.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-primary/50 to-transparent" />
                    </div>

                    {/* Animated title */}
                    <h1 className={`banner-title slide-up-and-fade leading-[.95] text-6xl sm:text-[80px] font-anton transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                        <span className={`bg-gradient-to-r ${currentRole.gradient} bg-clip-text text-transparent`}>
                            {currentRole.title}
                        </span>
                        <br />
                        <span className="relative">
                            {currentRole.subtitle}
                            {/* <span className={`absolute -bottom-2 left-0 h-1 bg-gradient-to-r ${currentRole.gradient} transition-all duration-500`} style={{ width: '40%' }} /> */}
                        </span>
                    </h1>

                    {/* Role switcher pills */}
                    <div className="slide-up-and-fade mt-8 flex flex-wrap gap-2">
                        {ROLES.map((role, index) => (
                            <button
                                key={index}
                                onClick={() => handleRoleClick(index)}
                                className={`group relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${currentRoleIndex === index
                                    ? 'text-white shadow-lg scale-105'
                                    : 'text-muted-foreground hover:text-foreground bg-white/5 hover:bg-white/10'
                                    }`}
                            >
                                {currentRoleIndex === index && (
                                    <span className={`absolute inset-0 rounded-full bg-gradient-to-r ${role.gradient} -z-10`} />
                                )}
                                <span className="flex items-center gap-2">
                                    <role.icon className="w-3.5 h-3.5" />
                                    {role.title}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Description with fade animation */}
                    <p className={`banner-description slide-up-and-fade mt-6 text-lg text-muted-foreground transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                        Hi! I&apos;m{' '}
                        <span className="font-medium text-foreground relative inline-block">
                            Kowshik Valipireddy
                            {/* <span className={`absolute -bottom-0.5 left-0 h-0.5 w-full bg-gradient-to-r ${currentRole.gradient}`} /> */}
                        </span>
                        . A creative professional with 3+ years of experience in{' '}
                        <span className={`font-medium bg-gradient-to-r ${currentRole.gradient} bg-clip-text text-transparent`}>
                            {currentRole.description}
                        </span>
                    </p>

                    <div className="flex items-center gap-4 mt-9">
                        <Button
                            as="link"
                            target="_blank"
                            rel="noopener noreferrer"
                            href={GENERAL_INFO.upworkProfile}
                            variant="primary"
                            className="banner-button slide-up-and-fade group relative overflow-hidden"
                        >
                            <span className="relative z-10">Hire Me</span>
                            <span className={`absolute inset-0 bg-gradient-to-r ${currentRole.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                        </Button>

                        <Button
                            as="link"
                            href="#selected-projects"
                            variant="outline"
                            className="banner-button slide-up-and-fade hover:border-primary/50 transition-colors"
                        >
                            View Work
                        </Button>
                    </div>
                </div>

                {/* Stats section with enhanced styling */}
                <div className="md:absolute bottom-[10%] right-[4%] flex md:flex-col gap-4 md:gap-8 text-center md:text-right">
                    <div className="slide-up-and-fade group">
                        <div className="relative inline-block">
                            <div className={`text-3xl sm:text-4xl font-anton bg-gradient-to-r ${currentRole.gradient} bg-clip-text text-transparent mb-1.5 transition-all duration-500`}>
                                1.5+
                            </div>
                        </div>
                        <p className="text-neutral-300 text-sm font-medium">
                            Years of Experience
                        </p>
                    </div>

                    <div className="slide-up-and-fade group">
                        <div className="relative inline-block">
                            <div className={`text-3xl sm:text-4xl font-anton bg-gradient-to-r ${currentRole.gradient} bg-clip-text text-transparent mb-1.5 transition-all duration-500`}>
                                30+
                            </div>
                        </div>
                        <p className="text-neutral-300 text-sm font-medium">
                            Completed Projects
                        </p>
                    </div>

                    <div className="slide-up-and-fade group">
                        <div className="relative inline-block">
                            <div className={`text-3xl sm:text-4xl font-anton bg-gradient-to-r ${currentRole.gradient} bg-clip-text text-transparent mb-1.5 transition-all duration-500`}>
                                3+
                            </div>
                        </div>
                        <p className="text-neutral-300 text-sm font-medium">
                            Technologies Mastered
                        </p>
                    </div>
                </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-1/4 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
        </section>
    );
};

export default Banner;