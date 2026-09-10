'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';

gsap.registerPlugin(useGSAP);

const ParticleBackground = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Defer particle background so critical page render is never blocked
        const isBot = /bot|googlebot|crawler|spider|lighthouse|headlesschrome/i.test(navigator.userAgent);
        const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (isBot || isReducedMotion) return;

        const timer = setTimeout(() => {
            setMounted(true);
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    useGSAP(
        () => {
            if (!mounted || !containerRef.current) return;

            const particles = containerRef.current.querySelectorAll('.bg-particle');
            const w = window.innerWidth;
            const h = window.innerHeight;

            particles.forEach((particle) => {
                const startX = Math.random() * w;
                const startY = Math.random() * h;
                const size = Math.random() * 2 + 1;
                const dur = Math.random() * 8 + 8;

                gsap.set(particle, {
                    width: size,
                    height: size,
                    opacity: Math.random() * 0.4 + 0.1,
                    x: startX,
                    y: startY,
                });

                gsap.to(particle, {
                    y: `+=${h * 0.8}`,
                    duration: dur,
                    opacity: 0,
                    repeat: -1,
                    ease: 'none',
                });
            });
        },
        { scope: containerRef, dependencies: [mounted] }
    );

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden print:hidden" ref={containerRef} aria-hidden="true">
            {Array.from({ length: 25 }).map((_, i) => (
                <div
                    key={i}
                    className="bg-particle absolute rounded-full bg-white/40"
                />
            ))}
        </div>
    );
};

export default ParticleBackground;
