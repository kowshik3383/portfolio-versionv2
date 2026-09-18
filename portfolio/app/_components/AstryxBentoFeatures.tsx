'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    ArrowRight,
    Sparkles,
    Check,
    Palette,
    Layers,
    Bot,
    LayoutTemplate,
    Sliders,
    Zap,
    Cpu,
    CheckCircle2,
} from 'lucide-react';
import SectionTitle from '@/components/SectionTitle';

interface ThemeColor {
    name: string;
    label: string;
    primary: string;
    bg: string;
    badge: string;
}

const THEMES: ThemeColor[] = [
    { name: 'matcha', label: 'Matcha', primary: '#0D8626', bg: '#EAF7EE', badge: 'text-emerald-800 bg-emerald-50 border-emerald-200' },
    { name: 'astryx', label: 'Astryx Blue', primary: '#0064E0', bg: '#EBF4FF', badge: 'text-blue-800 bg-blue-50 border-blue-200' },
    { name: 'cyber', label: 'Cyan Slate', primary: '#089DD0', bg: '#E6F8FC', badge: 'text-cyan-800 bg-cyan-50 border-cyan-200' },
    { name: 'sunset', label: 'Warm Coral', primary: '#EB6E00', bg: '#FFF3E8', badge: 'text-orange-800 bg-orange-50 border-orange-200' },
];

export default function AstryxBentoFeatures() {
    const [selectedTheme, setSelectedTheme] = useState<ThemeColor>(THEMES[0]);
    const [sliderVal, setSliderVal] = useState<number>(85);
    const [isSwitchActive, setIsSwitchActive] = useState<boolean>(true);
    const [radioSelection, setRadioSelection] = useState<'express' | 'free'>('free');
    const [copiedCmd, setCopiedCmd] = useState<boolean>(false);

    const mcpCommand = 'npx astryx-mcp scaffold --template=mobile-next';

    const handleCopyCmd = () => {
        navigator.clipboard.writeText(mcpCommand);
        setCopiedCmd(true);
        setTimeout(() => setCopiedCmd(false), 2000);
    };

    return (
        <section id="astryx-features" className="relative py-20 sm:py-28 bg-[#FAF8F5] border-t border-[#E8E3DA]">
            <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="mb-14">
                    <SectionTitle title="ASTRYX ARCHITECTURE &amp; TEMPLATES" />
                    <p className="font-mono text-xs uppercase tracking-widest text-[#4E606F] -mt-5">
                        Modular design tokens, 170+ accessible components &amp; agent-ready primitives
                    </p>
                </div>

                {/* 4-Card Bento Grid (Matching astryx.atmeta.com) */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
                    {/* Card 1: Themes that fit your brand (Span 7) */}
                    <div className="md:col-span-7 rounded-3xl bg-white border border-[#E8E3DA] p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:border-[#0064E0]/40 transition-all duration-300 relative overflow-hidden group">
                        {/* Interactive Theme Sandbox Preview */}
                        <div
                            className="w-full rounded-2xl p-5 mb-6 border transition-all duration-300"
                            style={{
                                backgroundColor: selectedTheme.bg,
                                borderColor: `${selectedTheme.primary}40`,
                            }}
                        >
                            <div className="flex items-center justify-between gap-3 mb-4">
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium border ${selectedTheme.badge}`}>
                                    <span className="size-1.5 rounded-full" style={{ backgroundColor: selectedTheme.primary }} />
                                    <span>{selectedTheme.label} Theme</span>
                                </span>
                                <span className="text-[11px] font-mono text-[#4E606F]">Live Token Switcher</span>
                            </div>

                            {/* Theme Swatches Selector */}
                            <div className="flex items-center gap-2.5 pt-1">
                                {THEMES.map((theme) => (
                                    <button
                                        key={theme.name}
                                        onClick={() => setSelectedTheme(theme)}
                                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 border ${
                                            selectedTheme.name === theme.name
                                                ? 'bg-white shadow-xs border-neutral-300 text-[#0A1317]'
                                                : 'bg-white/60 hover:bg-white border-transparent text-[#4E606F]'
                                        }`}
                                    >
                                        <span className="size-2.5 rounded-full shrink-0" style={{ backgroundColor: theme.primary }} />
                                        <span>{theme.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Text & Link */}
                        <div>
                            <h3 className="font-outfit text-2xl sm:text-3xl font-bold tracking-tight text-[#0A1317] mb-2">
                                Themes that fit your brand
                            </h3>
                            <p className="text-sm sm:text-base text-[#4E606F] font-normal leading-relaxed mb-6">
                                Fully customizable themes ready for use. Make it yours without starting from scratch. Built with OKLCH dynamic tokens, light/dark adaptation, and seamless design tokens.
                            </p>
                            <Link
                                href="#selected-projects"
                                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0064E0] hover:text-[#0052B3] group/link"
                            >
                                <span>Explore themes</span>
                                <ArrowRight size={15} className="group-hover/link:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    {/* Card 2: Over 170 components (Span 5) */}
                    <div className="md:col-span-5 rounded-3xl bg-white border border-[#E8E3DA] p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:border-[#0064E0]/40 transition-all duration-300 relative overflow-hidden group">
                        {/* Live Micro-Component Sandbox */}
                        <div className="w-full rounded-2xl bg-[#FAF8F5] border border-[#E8E3DA] p-4 mb-6 space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                                    <Sparkles size={11} className="text-emerald-600" />
                                    <span>Limited time</span>
                                </span>
                                {/* Interactive Toggle Switch */}
                                <button
                                    onClick={() => setIsSwitchActive(!isSwitchActive)}
                                    className={`w-10 h-5 rounded-full transition-colors relative p-0.5 ${
                                        isSwitchActive ? 'bg-[#0064E0]' : 'bg-neutral-300'
                                    }`}
                                    aria-label="Toggle demo switch"
                                >
                                    <div
                                        className={`size-4 rounded-full bg-white transition-transform ${
                                            isSwitchActive ? 'translate-x-5' : 'translate-x-0'
                                        }`}
                                    />
                                </button>
                            </div>

                            {/* Interactive Progress Bar */}
                            <div className="space-y-1 pt-1">
                                <div className="flex justify-between text-[11px] font-mono text-[#4E606F]">
                                    <span>Accessible Progress</span>
                                    <span>{sliderVal}%</span>
                                </div>
                                <div
                                    className="w-full h-2 rounded-full bg-neutral-200 overflow-hidden cursor-pointer"
                                    onClick={(e) => {
                                        const rect = e.currentTarget.getBoundingClientRect();
                                        const pct = Math.round(((e.clientX - rect.left) / rect.width) * 100);
                                        setSliderVal(Math.max(10, Math.min(100, pct)));
                                    }}
                                >
                                    <div
                                        className="h-full bg-[#0064E0] rounded-full transition-all duration-300"
                                        style={{ width: `${sliderVal}%` }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Text & Link */}
                        <div>
                            <div className="font-mono text-xs text-[#0064E0] font-bold mb-1 tracking-wider">
                                Aa · ACCESSIBLE PRIMITIVES
                            </div>
                            <h3 className="font-outfit text-2xl sm:text-3xl font-bold tracking-tight text-[#0A1317] mb-2">
                                Over 170 components
                            </h3>
                            <p className="text-sm sm:text-base text-[#4E606F] font-normal leading-relaxed mb-6">
                                Accessible and themeable React components with built-in spacing, dark mode, and flexible styling across web &amp; React Native.
                            </p>
                            <Link
                                href="#my-stack"
                                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0064E0] hover:text-[#0052B3] group/link"
                            >
                                <span>Explore components</span>
                                <ArrowRight size={15} className="group-hover/link:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    {/* Card 3: A design system that your agent can use (Span 5) */}
                    <div className="md:col-span-5 rounded-3xl bg-white border border-[#E8E3DA] p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:border-[#0064E0]/40 transition-all duration-300 relative overflow-hidden group">
                        {/* Terminal / Agent Snippet */}
                        <div className="w-full rounded-2xl bg-[#0A1317] text-white p-4 mb-6 font-mono text-xs space-y-2 border border-neutral-800 shadow-inner">
                            <div className="flex items-center justify-between text-[11px] text-neutral-400 pb-2 border-b border-neutral-800">
                                <span className="flex items-center gap-1.5">
                                    <Bot size={13} className="text-emerald-400" />
                                    <span>Agent MCP Runner</span>
                                </span>
                                <span className="text-[10px] text-emerald-400">Ready</span>
                            </div>
                            <div className="flex items-center justify-between gap-2 pt-1">
                                <code className="text-neutral-200 truncate">
                                    <span className="text-emerald-400">$ </span>{mcpCommand}
                                </code>
                                <button
                                    onClick={handleCopyCmd}
                                    className="p-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[10px] shrink-0 transition-colors"
                                >
                                    {copiedCmd ? <Check size={12} className="text-emerald-400" /> : 'Copy'}
                                </button>
                            </div>
                        </div>

                        {/* Text & Link */}
                        <div>
                            <h3 className="font-outfit text-2xl sm:text-3xl font-bold tracking-tight text-[#0A1317] mb-2">
                                A design system that your agent can use
                            </h3>
                            <p className="text-sm sm:text-base text-[#4E606F] font-normal leading-relaxed mb-6">
                                Scaffold projects, browse templates, generate themes, and get agent-ready docs from the command line or Model Context Protocol (MCP).
                            </p>
                            <Link
                                href="#engineering-benchmarks"
                                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0064E0] hover:text-[#0052B3] group/link"
                            >
                                <span>Launch agent CLI</span>
                                <ArrowRight size={15} className="group-hover/link:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    {/* Card 4: Ready to ship templates (Span 7) */}
                    <div className="md:col-span-7 rounded-3xl bg-white border border-[#E8E3DA] p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:border-[#0064E0]/40 transition-all duration-300 relative overflow-hidden group">
                        {/* Templates Preview Badges */}
                        <div className="w-full rounded-2xl bg-[#FAF8F5] border border-[#E8E3DA] p-4 sm:p-5 mb-6">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div className="p-3 rounded-xl bg-white border border-[#E8E3DA] shadow-2xs space-y-1">
                                    <span className="text-[10px] font-mono text-[#0064E0] font-semibold">01 · MOBILE</span>
                                    <p className="text-xs font-semibold text-[#0A1317]">React Native / Expo</p>
                                    <p className="text-[10px] text-[#4E606F]">TurboModules &amp; Worklets</p>
                                </div>
                                <div className="p-3 rounded-xl bg-white border border-[#E8E3DA] shadow-2xs space-y-1">
                                    <span className="text-[10px] font-mono text-emerald-600 font-semibold">02 · FULL STACK</span>
                                    <p className="text-xs font-semibold text-[#0A1317]">Next.js 15 Platform</p>
                                    <p className="text-[10px] text-[#4E606F]">Server Actions &amp; Edge</p>
                                </div>
                                <div className="p-3 rounded-xl bg-white border border-[#E8E3DA] shadow-2xs space-y-1">
                                    <span className="text-[10px] font-mono text-purple-600 font-semibold">03 · AI AGENT</span>
                                    <p className="text-xs font-semibold text-[#0A1317]">MCP Tool Pipeline</p>
                                    <p className="text-[10px] text-[#4E606F]">Autonomous Orchestration</p>
                                </div>
                            </div>
                        </div>

                        {/* Text & Link */}
                        <div>
                            <h3 className="font-outfit text-2xl sm:text-3xl font-bold tracking-tight text-[#0A1317] mb-2">
                                Ready to ship templates
                            </h3>
                            <p className="text-sm sm:text-base text-[#4E606F] font-normal leading-relaxed mb-6">
                                Production-ready architectures for common applications, native mobile apps, and distributed SaaS — just plug in your domain logic and deploy.
                            </p>
                            <Link
                                href="#selected-projects"
                                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0064E0] hover:text-[#0052B3] group/link"
                            >
                                <span>Explore templates</span>
                                <ArrowRight size={15} className="group-hover/link:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
