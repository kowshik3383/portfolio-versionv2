'use client';

import Link from 'next/link';
import { useState } from 'react';
import { trackEvent } from '@/lib/logrocket';
import {
    MapPin,
    Phone,
    Mail,
    Globe,
    Linkedin,
    Github,
    ExternalLink,
    Printer,
    ArrowLeft,
    Download,
} from 'lucide-react';

export default function ResumeClient() {
    const [isPrinting, setIsPrinting] = useState(false);

    const handlePrint = () => {
        setIsPrinting(true);
        trackEvent('Resume Print Triggered');
        const iframe = document.createElement('iframe');
        iframe.style.position = 'fixed';
        iframe.style.right = '0';
        iframe.style.bottom = '0';
        iframe.style.width = '0';
        iframe.style.height = '0';
        iframe.style.border = 'none';
        iframe.src = '/resume.html';
        document.body.appendChild(iframe);

        iframe.onload = () => {
            setTimeout(() => {
                try {
                    iframe.contentWindow?.focus();
                    iframe.contentWindow?.print();
                } catch {
                    window.open('/resume.html', '_blank');
                }
                setIsPrinting(false);
                setTimeout(() => {
                    if (document.body.contains(iframe)) {
                        document.body.removeChild(iframe);
                    }
                }, 2000);
            }, 300);
        };
    };

    return (
        <main className="min-h-screen bg-neutral-100 text-[#18181b] py-6 sm:py-10 px-2 sm:px-4 print:p-0 print:bg-white print:m-0">
            {/* Top Toolbar (Hidden when printing) */}
            <div className="max-w-[210mm] mx-auto mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden px-2">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-neutral-50 text-neutral-800 text-xs font-mono transition-colors border border-neutral-300 shadow-sm"
                >
                    <ArrowLeft size={14} />
                    <span>Return to Portfolio</span>
                </Link>

                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <a
                        href="/resume.html"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-neutral-50 text-neutral-700 hover:text-neutral-900 border border-neutral-300 text-xs font-mono transition-colors shadow-sm"
                    >
                        <span>Standalone View</span>
                        <ExternalLink size={12} />
                    </a>

                    <a
                        href="/resume.html"
                        download="Kowshik-Valipireddy-Resume.html"
                        onClick={() => trackEvent('Resume Download HTML Clicked')}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-neutral-50 text-neutral-700 hover:text-neutral-900 border border-neutral-300 text-xs font-mono transition-colors shadow-sm"
                    >
                        <Download size={13} />
                        <span>Download HTML</span>
                    </a>

                    <a
                        href="/Kowshik-Valipireddy-Resume.pdf"
                        download="Kowshik-Valipireddy-Resume.pdf"
                        onClick={() => trackEvent('Resume Download PDF Clicked')}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white font-semibold text-xs tracking-wider uppercase transition-transform hover:scale-105 hover:bg-primary.hover shadow-md active:scale-95"
                    >
                        <Download size={15} />
                        <span>Download PDF</span>
                    </a>

                    <button
                        onClick={handlePrint}
                        disabled={isPrinting}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-neutral-50 text-neutral-800 font-medium text-xs tracking-wider uppercase transition-all border border-neutral-300 shadow-sm active:scale-95 disabled:opacity-50"
                    >
                        <Printer size={15} />
                        <span>{isPrinting ? 'Preparing...' : 'Print / Save PDF'}</span>
                    </button>
                </div>
            </div>

            {/* Resume Sheet Container (Strict A4 single-page bounds) */}
            <div className="resume-sheet max-w-[210mm] mx-auto bg-white border border-neutral-300 rounded-xl shadow-xl overflow-hidden print:border-none print:shadow-none print:rounded-none print:max-w-none print:w-full print:bg-white">
                <div className="p-7 sm:p-9 md:p-10 print:p-8 space-y-3.5 text-[10px] sm:text-[10.5px] leading-[1.34] text-[#27272a] font-sans">
                    
                    {/* Header */}
                    <header className="text-center space-y-1.5 pb-2 border-b border-[#e4e4e7]">
                        <h1 className="text-2xl sm:text-[26px] font-bold tracking-tight text-[#09090b]">
                            Kowshik Valipireddy
                        </h1>

                        {/* Contact Bar 1 */}
                        <div className="flex flex-wrap items-center justify-center gap-x-3.5 gap-y-1 text-[10px] text-[#52525b]">
                            <span className="inline-flex items-center gap-1">
                                <MapPin size={11} className="text-[#71717a]" />
                                <span>Hyderabad, Telangana, India</span>
                            </span>
                            <span className="text-[#a1a1aa] hidden sm:inline">·</span>
                            <a
                                href="tel:+918328107601"
                                className="inline-flex items-center gap-1 hover:text-[#09090b] transition-colors"
                            >
                                <Phone size={11} className="text-[#71717a]" />
                                <span>+91-8328107601</span>
                            </a>
                            <span className="text-[#a1a1aa] hidden sm:inline">·</span>
                            <a
                                href="mailto:kowshikvalipireddy@gmail.com"
                                className="inline-flex items-center gap-1 hover:text-[#09090b] transition-colors font-medium text-[#18181b]"
                            >
                                <Mail size={11} className="text-[#71717a]" />
                                <span>kowshikvalipireddy@gmail.com</span>
                            </a>
                        </div>

                        {/* Contact Bar 2 */}
                        <div className="flex flex-wrap items-center justify-center gap-x-3.5 gap-y-1 text-[10px] text-[#52525b]">
                            <a
                                href="https://kowshik-valipireddy.pages.dev"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 hover:text-[#09090b] transition-colors"
                            >
                                <Globe size={11} className="text-[#71717a]" />
                                <span>kowshik-valipireddy.pages.dev</span>
                            </a>
                            <span className="text-[#a1a1aa] hidden sm:inline">·</span>
                            <a
                                href="https://www.linkedin.com/in/kowshikvalipireddy"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 hover:text-[#09090b] transition-colors"
                            >
                                <Linkedin size={11} className="text-[#71717a]" />
                                <span>LinkedIn</span>
                            </a>
                            <span className="text-[#a1a1aa] hidden sm:inline">·</span>
                            <a
                                href="https://github.com/kowshik3383"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 hover:text-[#09090b] transition-colors"
                            >
                                <Github size={11} className="text-[#71717a]" />
                                <span>GitHub</span>
                            </a>
                        </div>

                        {/* Summary Narrative */}
                        <p className="text-[10px] text-[#3f3f46] text-left pt-1.5 leading-[1.36]">
                            <strong className="font-semibold text-[#09090b]">Full Stack &amp; React Native Engineer</strong> with <strong className="font-semibold text-[#09090b]">2+ years</strong> of experience shipping production mobile and web applications. Built healthcare products with <strong className="font-semibold text-[#09090b]">100K+ downloads</strong> across iOS and Android, with strong experience in <strong className="font-semibold text-[#09090b]">React Native, Next.js, TypeScript, Node.js, and PostgreSQL</strong>.
                        </p>
                    </header>

                    {/* EXPERIENCE */}
                    <section className="space-y-2">
                        <div className="flex items-center justify-between border-b border-[#e4e4e7] pb-0.5">
                            <h2 className="text-[11.5px] font-bold tracking-wider text-[#09090b] uppercase font-sans">
                                Experience
                            </h2>
                            <span className="text-[9.5px] font-mono text-[#71717a]">
                                2+ yrs full-time
                            </span>
                        </div>

                        {/* Tap Health */}
                        <div className="space-y-0.5">
                            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5">
                                <div>
                                    <h3 className="font-bold text-[11px] text-[#09090b] inline">
                                        Full Stack &amp; Mobile Developer
                                    </h3>
                                    <span className="text-[#71717a] text-[10.5px]"> — </span>
                                    <span className="font-medium text-[#18181b] text-[10.5px]">
                                        Tap Health
                                    </span>
                                </div>
                                <div className="text-[9.5px] text-[#71717a] font-mono shrink-0">
                                    <span>Apr 2025 – Present</span>
                                </div>
                            </div>

                            <ul className="list-disc pl-4 space-y-0.5 text-[9.8px] sm:text-[10px] text-[#27272a] marker:text-[#71717a]">
                                <li>
                                    Built and shipped patient-facing healthcare experiences in <strong className="font-semibold text-[#09090b]">React Native, Next.js, and TypeScript</strong>, including glucose tracking, meal logging, and multi-step onboarding.
                                </li>
                                <li>
                                    Integrated backend APIs and synchronized patient data across mobile and web flows, resolving state-management and navigation issues affecting core user journeys.
                                </li>
                                <li>
                                    Diagnosed complex navigation deadlocks, race conditions, and date/timezone bugs, improving application reliability across platforms.
                                </li>
                                <li>
                                    Designed and shipped <strong className="font-semibold text-[#09090b]">30+ Next.js landing pages</strong>, optimizing rendering and Web Vitals for fast page loads and smooth user experiences.
                                </li>
                                <li>
                                    Implemented product analytics and event-tracking funnels to identify onboarding and patient journey drop-off points.
                                </li>
                            </ul>
                        </div>

                        {/* ZarvisGenix */}
                        <div className="space-y-0.5 pt-0.5">
                            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5">
                                <div>
                                    <h3 className="font-bold text-[11px] text-[#09090b] inline">
                                        Full Stack &amp; React Native Developer
                                    </h3>
                                    <span className="text-[#71717a] text-[10.5px]"> — </span>
                                    <span className="font-medium text-[#18181b] text-[10.5px]">
                                        ZarvisGenix
                                    </span>
                                </div>
                                <div className="text-[9.5px] text-[#71717a] font-mono shrink-0">
                                    <span>Sep 2024 – Apr 2025</span>
                                </div>
                            </div>

                            <ul className="list-disc pl-4 space-y-0.5 text-[9.8px] sm:text-[10px] text-[#27272a] marker:text-[#71717a]">
                                <li>
                                    Built and deployed production web and mobile products using <strong className="font-semibold text-[#09090b]">React, React Native, Node.js, and PostgreSQL</strong>.
                                </li>
                                <li>
                                    Developed clinician portals, administrative dashboards, and HR platforms with RBAC, authentication, and data synchronization.
                                </li>
                                <li>
                                    Integrated speech-to-text pipelines to support voice transcription and automated workflows.
                                </li>
                                <li>
                                    Designed PostgreSQL schemas with Prisma ORM and built secure, rate-limited REST APIs.
                                </li>
                                <li>
                                    Worked directly with stakeholders and investors to turn product requirements into technical architectures and production releases.
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* PROJECTS */}
                    <section className="space-y-2">
                        <div className="flex items-center justify-between border-b border-[#e4e4e7] pb-0.5">
                            <h2 className="text-[11.5px] font-bold tracking-wider text-[#09090b] uppercase font-sans">
                                Projects
                            </h2>
                            <span className="text-[9.5px] font-mono text-[#71717a]">
                                3 Production Products
                            </span>
                        </div>

                        {/* Figma to Code */}
                        <div className="space-y-0.5">
                            <div className="flex flex-wrap items-baseline justify-between gap-1">
                                <div>
                                    <span className="font-bold text-[10.8px] text-[#09090b]">
                                        Figma to Code
                                    </span>
                                    <span className="text-[#71717a] text-[10px]"> · TypeScript, Figma Plugin API, React, Tailwind</span>
                                </div>
                                <div className="text-[9.5px] text-[#52525b] font-mono">
                                    <a
                                        href="https://www.figma.com/community/plugin/1670837309887282952/figma-to-code-html-tailwind-react"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-[#09090b] underline font-medium inline-flex items-center gap-0.5"
                                    >
                                        <span>Figma Community</span>
                                        <ExternalLink size={8} />
                                    </a>
                                </div>
                            </div>
                            <p className="text-[9.8px] sm:text-[10px] text-[#3f3f46]">
                                Official Figma Community plugin that converts Figma frames and Auto Layout structures into responsive HTML, Tailwind CSS, React JSX, and Next.js output. Runs entirely inside the Figma client and packages generated projects into downloadable ZIP files.
                            </p>
                        </div>

                        {/* AI Technical Interviewer */}
                        <div className="space-y-0.5">
                            <div className="flex flex-wrap items-baseline justify-between gap-1">
                                <div>
                                    <span className="font-bold text-[10.8px] text-[#09090b]">
                                        AI Technical Interviewer
                                    </span>
                                    <span className="text-[#71717a] text-[10px]"> · Next.js, WebSockets, Monaco Editor, Voice AI</span>
                                </div>
                                <div className="text-[9.5px] text-[#52525b] font-mono">
                                    <a
                                        href="https://ai-interviewer-ten-delta.vercel.app/"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-[#09090b] underline font-medium inline-flex items-center gap-0.5"
                                    >
                                        <span>Live Platform</span>
                                        <ExternalLink size={8} />
                                    </a>
                                </div>
                            </div>
                            <p className="text-[9.8px] sm:text-[10px] text-[#3f3f46]">
                                Real-time technical assessment platform combining voice interaction, WebSocket-based editor streaming, Monaco Editor, model fallback, and automated evaluation workflows.
                            </p>
                        </div>

                        {/* HealthTrack */}
                        <div className="space-y-0.5">
                            <div className="flex flex-wrap items-baseline justify-between gap-1">
                                <div>
                                    <span className="font-bold text-[10.8px] text-[#09090b]">
                                        HealthTrack Analytics
                                    </span>
                                    <span className="text-[#71717a] text-[10px]"> · Next.js, React, Prisma, PostgreSQL</span>
                                </div>
                                <div className="text-[9.5px] text-[#52525b] font-mono">
                                    <a
                                        href="https://tracker-mocha-ten.vercel.app/"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-[#09090b] underline font-medium inline-flex items-center gap-0.5"
                                    >
                                        <span>Live Platform</span>
                                        <ExternalLink size={8} />
                                    </a>
                                </div>
                            </div>
                            <p className="text-[9.8px] sm:text-[10px] text-[#3f3f46]">
                                Full-stack health and fitness platform with guided onboarding, BMR/macro calculations, nutrition and hydration logging, workout tracking, and relational analytics.
                            </p>
                        </div>
                    </section>

                    {/* TECHNICAL SKILLS */}
                    <section className="space-y-1.5">
                        <div className="border-b border-[#e4e4e7] pb-0.5">
                            <h2 className="text-[11.5px] font-bold tracking-wider text-[#09090b] uppercase font-sans">
                                Technical Skills
                            </h2>
                        </div>

                        <div className="space-y-1 text-[10px]">
                            <div className="grid grid-cols-12 gap-1 sm:gap-2">
                                <span className="col-span-3 sm:col-span-2 font-bold text-[#09090b]">Languages</span>
                                <span className="col-span-9 sm:col-span-10 text-[#3f3f46]">
                                    TypeScript, JavaScript, SQL, Python, HTML, CSS
                                </span>
                            </div>
                            <div className="grid grid-cols-12 gap-1 sm:gap-2">
                                <span className="col-span-3 sm:col-span-2 font-bold text-[#09090b]">Frontend</span>
                                <span className="col-span-9 sm:col-span-10 text-[#3f3f46]">
                                    React, Next.js, Tailwind CSS
                                </span>
                            </div>
                            <div className="grid grid-cols-12 gap-1 sm:gap-2">
                                <span className="col-span-3 sm:col-span-2 font-bold text-[#09090b]">Mobile</span>
                                <span className="col-span-9 sm:col-span-10 text-[#3f3f46]">
                                    React Native, Expo, React Navigation, iOS &amp; Android
                                </span>
                            </div>
                            <div className="grid grid-cols-12 gap-1 sm:gap-2">
                                <span className="col-span-3 sm:col-span-2 font-bold text-[#09090b]">Backend</span>
                                <span className="col-span-9 sm:col-span-10 text-[#3f3f46]">
                                    Node.js, Express.js, REST APIs, WebSockets
                                </span>
                            </div>
                            <div className="grid grid-cols-12 gap-1 sm:gap-2">
                                <span className="col-span-3 sm:col-span-2 font-bold text-[#09090b]">Data</span>
                                <span className="col-span-9 sm:col-span-10 text-[#3f3f46]">
                                    PostgreSQL, Prisma ORM
                                </span>
                            </div>
                            <div className="grid grid-cols-12 gap-1 sm:gap-2">
                                <span className="col-span-3 sm:col-span-2 font-bold text-[#09090b]">Tools</span>
                                <span className="col-span-9 sm:col-span-10 text-[#3f3f46]">
                                    Git, GitHub, Docker, Vercel, Figma Plugin API, Postman
                                </span>
                            </div>
                        </div>
                    </section>

                    {/* EDUCATION */}
                    <section className="space-y-1">
                        <div className="flex items-center justify-between border-b border-[#e4e4e7] pb-0.5">
                            <h2 className="text-[11.5px] font-bold tracking-wider text-[#09090b] uppercase font-sans">
                                Education
                            </h2>
                            <span className="text-[9.5px] font-mono text-[#71717a]">
                                2023 – 2026
                            </span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5">
                            <div>
                                <h3 className="font-bold text-[10.8px] text-[#09090b] inline">
                                    B.Sc, Computer Science
                                </h3>
                                <span className="text-[#71717a] text-[10px]"> — </span>
                                <span className="text-[#3f3f46] text-[10.5px]">
                                    Satavahana University · Telangana, India
                                </span>
                            </div>
                        </div>
                    </section>

                    {/* ACHIEVEMENTS */}
                    <section className="space-y-1">
                        <div className="border-b border-[#e4e4e7] pb-0.5">
                            <h2 className="text-[11.5px] font-bold tracking-wider text-[#09090b] uppercase font-sans">
                                Highlights
                            </h2>
                        </div>

                        <ul className="list-disc pl-4 space-y-0.5 text-[9.8px] sm:text-[10px] text-[#27272a] marker:text-[#71717a]">
                            <li>
                                Shipped production React Native features for an application with <strong className="font-semibold text-[#09090b]">100K+ downloads</strong> across iOS and Android.
                            </li>
                            <li>
                                Published an official <strong className="font-semibold text-[#09090b]">Figma Community plugin</strong> for automated design-to-code generation.
                            </li>
                            <li>
                                Built and deployed <strong className="font-semibold text-[#09090b]">4+ production web and mobile products</strong> end-to-end.
                            </li>
                        </ul>
                    </section>
                </div>
            </div>
        </main>
    );
}
