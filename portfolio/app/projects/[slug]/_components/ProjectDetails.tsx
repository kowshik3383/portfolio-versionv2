'use client';
import parse from 'html-react-parser';
import TransitionLink from '@/components/TransitionLink';
import { IProject } from '@/types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { ArrowLeft, ExternalLink, Github, Smartphone, Globe, Calendar, Layers, User } from 'lucide-react';
import { useRef } from 'react';
import Image from 'next/image';

interface Props {
    project: IProject;
}

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ProjectDetails = ({ project }: Props) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isMobileProject =
        project.slug.includes('react-native') ||
        project.title.toLowerCase().includes('react native') ||
        project.title.toLowerCase().includes('mobile');

    useGSAP(
        () => {
            if (!containerRef.current) return;

            gsap.fromTo(
                '.case-fade',
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.1,
                    duration: 0.7,
                    ease: 'power2.out',
                },
            );
        },
        { scope: containerRef },
    );

    return (
        <section className="relative pt-24 pb-24 sm:pb-32 overflow-hidden min-h-screen" ref={containerRef}>
            {/* Ambient background glow */}
            <div className="absolute top-1/4 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

            <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back navigation */}
                <div className="case-fade mb-10">
                    <TransitionLink
                        back
                        href="/"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white text-xs font-mono transition-colors group"
                    >
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Return to all projects</span>
                    </TransitionLink>
                </div>

                {/* Case Study Header */}
                <div className="case-fade space-y-6 pb-12 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-xs font-mono">
                            {isMobileProject ? <Smartphone size={13} /> : <Globe size={13} />}
                            <span>{isMobileProject ? 'React Native Mobile Case Study' : 'Web Platform Case Study'}</span>
                        </span>
                        {project.year && (
                            <span className="text-xs font-mono text-neutral-400">
                                {project.year}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-anton text-white tracking-tight leading-[0.95] uppercase">
                            {project.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-3 shrink-0">
                            {project.liveUrl && (
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-black font-semibold text-xs tracking-wide uppercase transition-all hover:bg-primary-hover shadow-lg"
                                >
                                    <span>Live Preview</span>
                                    <ExternalLink size={14} />
                                </a>
                            )}
                            {project.sourceCode && (
                                <a
                                    href={project.sourceCode}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-mono transition-colors"
                                >
                                    <Github size={15} />
                                    <span>Source Code</span>
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Metadata Bento Bar */}
                <div className="case-fade grid grid-cols-1 sm:grid-cols-3 gap-6 py-8 border-b border-white/10">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-wider">
                            <Layers size={13} className="text-cyan-400" />
                            <span>Technologies</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                            {project.techStack.map((tech) => (
                                <span
                                    key={tech}
                                    className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/5 text-xs text-neutral-300 font-mono"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    {project.role && (
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-wider">
                                <User size={13} className="text-teal-400" />
                                <span>Role &amp; Contribution</span>
                            </div>
                            <p className="text-xs sm:text-sm text-neutral-300 font-light">
                                {parse(project.role)}
                            </p>
                        </div>
                    )}

                    {project.year && (
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-wider">
                                <Calendar size={13} className="text-emerald-400" />
                                <span>Timeline</span>
                            </div>
                            <p className="text-xs sm:text-sm text-neutral-300 font-mono">
                                Completed in {project.year}
                            </p>
                        </div>
                    )}
                </div>

                {/* Project Narrative */}
                <div className="case-fade py-12 space-y-6 max-w-3xl">
                    <h2 className="text-2xl font-anton text-white tracking-wide uppercase">
                        Project Overview &amp; Architecture
                    </h2>
                    <div className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed space-y-4 prose-invert markdown-text">
                        {parse(project.description)}
                    </div>
                </div>

                {/* Visual Artifacts / Gallery */}
                <div className="case-fade space-y-8 pt-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <h2 className="text-2xl font-anton text-white tracking-wide uppercase">
                            Interface &amp; Visual Showcase
                        </h2>
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
                            >
                                <span>Open Live Product</span>
                                <ExternalLink size={13} />
                            </a>
                        )}
                    </div>

                    <div className="space-y-6">
                        {project.images.map((image, idx) => {
                            const targetUrl = project.liveUrl || project.link;
                            return (
                                <div key={image} className="relative">
                                    {targetUrl ? (
                                        <a
                                            href={targetUrl}
                                            target="_blank"
                                            rel="noreferrer noopener"
                                            className="group relative block w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] cursor-pointer"
                                            title={`Open ${project.title} live product`}
                                        >
                                            <Image
                                                src={image}
                                                alt={`${project.title} screenshot ${idx + 1}`}
                                                fill
                                                sizes="(max-width: 1024px) 100vw, 900px"
                                                className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                                            />

                                            {/* Hover banner */}
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black/80 backdrop-blur-md text-white border border-white/20 text-xs font-mono tracking-wide shadow-2xl group-hover:scale-105 transition-transform">
                                                    <span>Open Live Product</span>
                                                    <ExternalLink size={14} className="text-cyan-400" />
                                                </span>
                                            </div>

                                            <div className="absolute top-4 right-4 p-3 rounded-xl bg-black/70 backdrop-blur-md text-white border border-white/10 group-hover:bg-primary group-hover:text-black transition-colors">
                                                <ExternalLink size={16} />
                                            </div>
                                        </a>
                                    ) : (
                                        <div className="group relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02]">
                                            <Image
                                                src={image}
                                                alt={`${project.title} screenshot ${idx + 1}`}
                                                fill
                                                sizes="(max-width: 1024px) 100vw, 900px"
                                                className="object-cover object-top"
                                            />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectDetails;
