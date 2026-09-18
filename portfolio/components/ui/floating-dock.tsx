'use client';

import { cn } from '@/lib/utils';
import {
    AnimatePresence,
    MotionValue,
    motion,
    useMotionValue,
    useSpring,
    useTransform,
} from 'framer-motion';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';

export const FloatingDock = ({
    items,
    desktopClassName,
    mobileClassName,
}: {
    items: { title: string; icon: React.ReactNode; href: string }[];
    desktopClassName?: string;
    mobileClassName?: string;
}) => {
    return (
        <>
            <FloatingDockDesktop items={items} className={desktopClassName} />
            <FloatingDockMobile items={items} className={mobileClassName} />
        </>
    );
};

const FloatingDockMobile = ({
    items,
    className,
}: {
    items: { title: string; icon: React.ReactNode; href: string }[];
    className?: string;
}) => {
    const [open, setOpen] = useState(false);
    return (
        <div className={cn('relative block md:hidden', className)}>
            <AnimatePresence>
                {open && (
                    <motion.div
                        layoutId="nav"
                        className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 flex flex-col gap-2 items-center"
                    >
                        {items.map((item, idx) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                }}
                                exit={{
                                    opacity: 0,
                                    y: 10,
                                    scale: 0.8,
                                    transition: {
                                        delay: idx * 0.03,
                                    },
                                }}
                                transition={{ delay: (items.length - 1 - idx) * 0.04 }}
                            >
                                <Link
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className="flex items-center gap-2 pl-3 pr-1.5 py-1.5 rounded-full bg-white/95 border border-[#E8E3DA] shadow-lg shadow-neutral-900/10 backdrop-blur-md text-xs font-mono text-[#191715]"
                                >
                                    <span>{item.title}</span>
                                    <div className="size-8 rounded-full bg-[#FAF8F5] border border-[#E8E3DA] flex items-center justify-center text-[#191715]">
                                        <div className="size-4 flex items-center justify-center">{item.icon}</div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                aria-label="Toggle navigation dock"
                className="size-12 rounded-full bg-[#191715] text-white flex items-center justify-center shadow-xl shadow-neutral-950/20 active:scale-95 transition-transform"
            >
                {open ? <X size={20} /> : <Menu size={20} />}
            </button>
        </div>
    );
};

const FloatingDockDesktop = ({
    items,
    className,
}: {
    items: { title: string; icon: React.ReactNode; href: string }[];
    className?: string;
}) => {
    const mouseX = useMotionValue(Infinity);
    return (
        <motion.div
            onMouseMove={(e) => mouseX.set(e.clientX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className={cn(
                'mx-auto hidden md:flex h-16 gap-3 items-center rounded-full bg-[#FAF8F5]/95 border border-[#E8E3DA] backdrop-blur-2xl px-5 shadow-2xl shadow-neutral-950/10',
                className
            )}
        >
            {items.map((item) => (
                <IconContainer mouseX={mouseX} key={item.title} {...item} />
            ))}
        </motion.div>
    );
};

function IconContainer({
    mouseX,
    title,
    icon,
    href,
}: {
    mouseX: MotionValue;
    title: string;
    icon: React.ReactNode;
    href: string;
}) {
    const ref = useRef<HTMLDivElement>(null);

    const distance = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    const widthTransform = useTransform(distance, [-150, 0, 150], [40, 72, 40]);
    const heightTransform = useTransform(distance, [-150, 0, 150], [40, 72, 40]);

    const widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 36, 20]);
    const heightTransformIcon = useTransform(distance, [-150, 0, 150], [20, 36, 20]);

    const width = useSpring(widthTransform, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });
    const height = useSpring(heightTransform, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });

    const widthIcon = useSpring(widthTransformIcon, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });
    const heightIcon = useSpring(heightTransformIcon, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });

    const [hovered, setHovered] = useState(false);

    return (
        <Link href={href}>
            <motion.div
                ref={ref}
                style={{ width, height }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="aspect-square rounded-full bg-white border border-[#E8E3DA] shadow-xs flex items-center justify-center relative transition-colors hover:border-[#0E7490]/40"
            >
                <AnimatePresence>
                    {hovered && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, x: '-50%' }}
                            animate={{ opacity: 1, y: 0, x: '-50%' }}
                            exit={{ opacity: 0, y: 2, x: '-50%' }}
                            className="px-2.5 py-1 whitespace-nowrap rounded-lg bg-[#191715] text-white border border-neutral-800 shadow-lg absolute left-1/2 -translate-x-1/2 -top-9 w-fit text-[11px] font-mono tracking-tight pointer-events-none z-50"
                        >
                            {title}
                        </motion.div>
                    )}
                </AnimatePresence>
                <motion.div
                    style={{ width: widthIcon, height: heightIcon }}
                    className="flex items-center justify-center text-[#191715]"
                >
                    {icon}
                </motion.div>
            </motion.div>
        </Link>
    );
}
