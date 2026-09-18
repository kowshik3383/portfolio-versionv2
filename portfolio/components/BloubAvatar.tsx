'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export type BloubState =
    | 'idle'
    | 'thinking'
    | 'greeting'
    | 'building'
    | 'walking'
    | 'spotlight'
    | 'reading'
    | 'waving';

interface BloubAvatarProps {
    state?: BloubState;
    size?: number;
    className?: string;
    interactive?: boolean;
    showThinkingDots?: boolean;
}

interface EyeTransform {
    x: number;
    y: number;
    w: number;
    h: number;
    tilt: number;
}

// Expressions modeled as capsule eye transforms projected on the spherical black circle
const EYE_CONFIGS: Record<BloubState, { left: EyeTransform; right: EyeTransform }> = {
    // Rest / Idle: calm, centered capsule eyes
    idle: {
        left: { x: 40, y: 47, w: 7, h: 15, tilt: 0 },
        right: { x: 60, y: 47, w: 7, h: 15, tilt: 0 },
    },
    // Thinking: eyes shift up-left with curious tilt
    thinking: {
        left: { x: 36, y: 42, w: 6.5, h: 14, tilt: -7 },
        right: { x: 54, y: 43, w: 6.5, h: 14, tilt: -5 },
    },
    // Greeting / Welcome: friendly, bright, open symmetrical eyes (attentive, polite)
    greeting: {
        left: { x: 39, y: 46, w: 7.5, h: 15.5, tilt: 2 },
        right: { x: 61, y: 46, w: 7.5, h: 15.5, tilt: -2 },
    },
    // Building / Toolchain: alert, focused slightly downward
    building: {
        left: { x: 40, y: 49, w: 7, h: 14, tilt: 0 },
        right: { x: 60, y: 49, w: 7, h: 14, tilt: 0 },
    },
    // Walking / Timeline: eyes looking forward in direction of scroll
    walking: {
        left: { x: 44, y: 45, w: 7, h: 15, tilt: 4 },
        right: { x: 64, y: 45, w: 7, h: 15, tilt: 4 },
    },
    // Spotlight / Projects: eyes looking intently towards the left project cards
    spotlight: {
        left: { x: 34, y: 46, w: 7, h: 15, tilt: -3 },
        right: { x: 54, y: 46, w: 7, h: 15, tilt: -3 },
    },
    // Reading / Blog: eyes looking downward in relaxed reading posture
    reading: {
        left: { x: 40, y: 53, w: 6.5, h: 12, tilt: 2 },
        right: { x: 60, y: 53, w: 6.5, h: 12, tilt: -2 },
    },
    // Waving / Contact: joyful open eyes
    waving: {
        left: { x: 39, y: 45, w: 7.5, h: 15, tilt: 3 },
        right: { x: 61, y: 45, w: 7.5, h: 15, tilt: -3 },
    },
};

export default function BloubAvatar({
    state = 'idle',
    size = 100,
    className = '',
    interactive = false,
    showThinkingDots = false,
}: BloubAvatarProps) {
    const [isBlinking, setIsBlinking] = useState(false);
    const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    const lastMouseMoveRef = React.useRef<number>(0);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);
    }, []);

    // Natural periodic blinking with quick initial blink
    useEffect(() => {
        if (prefersReducedMotion) return;

        let blinkTimeout: NodeJS.Timeout;
        let unblinkTimeout: NodeJS.Timeout;

        const scheduleBlink = (delayMs: number) => {
            blinkTimeout = setTimeout(() => {
                setIsBlinking(true);
                unblinkTimeout = setTimeout(() => {
                    setIsBlinking(false);
                    // Subsequent natural blinks every 2.4 to 4.0s
                    scheduleBlink(2400 + Math.random() * 1600);
                }, 130);
            }, delayMs);
        };

        // Trigger early blink at 380ms so the visitor instantly sees life
        scheduleBlink(380);
        return () => {
            clearTimeout(blinkTimeout);
            clearTimeout(unblinkTimeout);
        };
    }, [prefersReducedMotion]);

    // Interactive gaze tracking when mouse moves
    useEffect(() => {
        if (!interactive || prefersReducedMotion) return;

        const handleMouseMove = (e: MouseEvent) => {
            lastMouseMoveRef.current = Date.now();
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const deltaX = (e.clientX - centerX) / centerX;
            const deltaY = (e.clientY - centerY) / centerY;
            const maxOffset = size >= 100 ? 4.2 : 2.5;
            setMouseOffset({
                x: Math.max(-maxOffset, Math.min(maxOffset, deltaX * maxOffset)),
                y: Math.max(-maxOffset, Math.min(maxOffset, deltaY * maxOffset)),
            });
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [interactive, prefersReducedMotion, size]);

    // Autonomous natural micro-glance when idle (prevents avatar from ever looking static)
    useEffect(() => {
        if (prefersReducedMotion) return;

        let glanceTimer: NodeJS.Timeout;
        let resetTimer: NodeJS.Timeout;

        const scheduleAutonomousGlance = () => {
            const delay = 1600 + Math.random() * 1400;
            glanceTimer = setTimeout(() => {
                // Only glance autonomously if mouse hasn't moved recently
                if (Date.now() - lastMouseMoveRef.current > 1200) {
                    const maxOffset = size >= 100 ? 3.5 : 2.0;
                    const randomX = (Math.random() - 0.5) * maxOffset;
                    const randomY = (Math.random() - 0.5) * (maxOffset * 0.7);
                    setMouseOffset({ x: randomX, y: randomY });

                    resetTimer = setTimeout(() => {
                        setMouseOffset({ x: 0, y: 0 });
                        scheduleAutonomousGlance();
                    }, 650);
                } else {
                    scheduleAutonomousGlance();
                }
            }, delay);
        };

        scheduleAutonomousGlance();
        return () => {
            clearTimeout(glanceTimer);
            clearTimeout(resetTimer);
        };
    }, [prefersReducedMotion, size]);

    const eyeCfg = EYE_CONFIGS[state] || EYE_CONFIGS.idle;
    const maskId = React.useId();

    return (
        <div
            className={cn('relative inline-flex items-center justify-center select-none', className)}
            style={{ width: size, height: size }}
        >
            <svg
                viewBox="0 0 100 100"
                width={size}
                height={size}
                className="overflow-visible drop-shadow-md"
                role="img"
                aria-label="Bloub avatar"
            >
                <defs>
                    {/* Bloub Cutout Eye Mask: Eyes are genuine cutouts through the black circle body */}
                    <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
                        {/* Perfect White Circle Base (Radius 36 centered at 50,50) */}
                        <circle cx="50" cy="50" r="36" fill="#FFFFFF" />

                        {/* Left Cutout Capsule Eye */}
                        <rect
                            x={eyeCfg.left.x - eyeCfg.left.w / 2 + mouseOffset.x}
                            y={eyeCfg.left.y - (isBlinking ? 1 : eyeCfg.left.h / 2) + mouseOffset.y}
                            width={eyeCfg.left.w}
                            height={isBlinking ? 2 : eyeCfg.left.h}
                            rx={eyeCfg.left.w / 2}
                            ry={eyeCfg.left.w / 2}
                            fill="#000000"
                            transform={`rotate(${eyeCfg.left.tilt}, ${eyeCfg.left.x}, ${eyeCfg.left.y})`}
                            style={{
                                transition: prefersReducedMotion
                                    ? 'none'
                                    : 'all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)',
                            }}
                        />

                        {/* Right Cutout Capsule Eye */}
                        <rect
                            x={eyeCfg.right.x - eyeCfg.right.w / 2 + mouseOffset.x}
                            y={
                                eyeCfg.right.y -
                                (isBlinking ? 1 : eyeCfg.right.h / 2) +
                                mouseOffset.y
                            }
                            width={eyeCfg.right.w}
                            height={isBlinking ? 2 : eyeCfg.right.h}
                            rx={eyeCfg.right.w / 2}
                            ry={eyeCfg.right.w / 2}
                            fill="#000000"
                            transform={`rotate(${eyeCfg.right.tilt}, ${eyeCfg.right.x}, ${eyeCfg.right.y})`}
                            style={{
                                transition: prefersReducedMotion
                                    ? 'none'
                                    : 'all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)',
                            }}
                        />
                    </mask>

                    {/* Rich black gradient with subtle top specular sheen */}
                    <linearGradient id="bloub-circle-sheen" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#1E2328" />
                        <stop offset="100%" stopColor="#0A0C0E" />
                    </linearGradient>
                </defs>

                {/* The Signature Solid Black Circle Body — Guaranteed Circle across ALL Sections */}
                <circle
                    cx="50"
                    cy="50"
                    r="36"
                    fill="url(#bloub-circle-sheen)"
                    mask={`url(#${maskId})`}
                />

                {/* Subtle soft curved reflection at the top of the sphere */}
                <path
                    d="M 36,22 C 44,19 56,19 64,22 C 61,24 53,25 46,25 C 40,25 37,23 36,22 Z"
                    fill="#FFFFFF"
                    opacity="0.12"
                    className="pointer-events-none"
                />

                {/* Floating thinking dots in thinking state */}
                {(showThinkingDots || state === 'thinking') && (
                    <g className="animate-pulse pointer-events-none">
                        <circle cx="82" cy="28" r="2.5" fill="#0A0C0E" opacity="0.8" />
                        <circle cx="88" cy="21" r="2" fill="#0A0C0E" opacity="0.6" />
                        <circle cx="92" cy="15" r="1.5" fill="#0A0C0E" opacity="0.4" />
                    </g>
                )}
            </svg>
        </div>
    );
}
