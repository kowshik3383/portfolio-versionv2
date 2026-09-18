'use client';

import TransitionLink from '@/components/TransitionLink';
import { IProject } from '@/types';
import { ArrowUpRight, Smartphone, Globe } from 'lucide-react';
import Image from 'next/image';

interface Props {
    index: number;
    project: IProject;
    selectedProject?: string | null;
    onMouseEnter: (_slug: string) => void;
}

const PROJECT_METRIC_BADGE: Record<string, string> = {
    'figma-to-code-plugin': 'Published on Figma Community · 100% Offline & Private',
    'ai-technical-interviewer': 'Real-Time Voice Streaming · Multi-Language Sandboxing',
    'healthtrack-analytics-platform': 'Optimistic UI · Instant Habit Logging',
    'antique-journal-ai-sanctuary': 'Zero-Knowledge Encryption · Semantic Memory',
};

const Project = ({ index, project, onMouseEnter }: Props) => {
    const isMobileProject =
        project.slug.includes('react-native') ||
        project.title.toLowerCase().includes('react native') ||
        project.title.toLowerCase().includes('mobile');
    const targetUrl = project.liveUrl || project.link;
    const metricBadge = PROJECT_METRIC_BADGE[project.slug];

    return (
        <div
            className="project-item group py-8 sm:py-10 border-b border-[#E8E3DA] first:pt-0 last:border-none transition-all duration-300 md:group-hover/projects:opacity-40 md:hover:!opacity-100"
            onMouseEnter={() => onMouseEnter(project.slug)}
        >
            {/* Mobile Thumbnail Card */}
            {targetUrl ? (
                <a
                    href={targetUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="md:hidden block mb-5 rounded-2xl overflow-hidden border border-[#E8E3DA] aspect-[16/9] relative group/img cursor-pointer shadow-xs"
                    aria-label={`Open ${project.title} live product`}
                >
                    <Image
                        src={project.thumbnail}
                        alt={`${project.title} project screenshot`}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover object-top group-hover/img:scale-105 transition-transform duration-300"
                        loading="lazy"
                    />
                    <div className="absolute top-3 right-3 p-2 rounded-full bg-white/95 backdrop-blur-sm text-[#0064E0] border border-[#E8E3DA] shadow-xs">
                        <ArrowUpRight size={14} />
                    </div>
                </a>
            ) : (
                <div className="md:hidden mb-5 rounded-2xl overflow-hidden border border-[#E8E3DA] aspect-[16/9] relative shadow-xs">
                    <Image
                        src={project.thumbnail}
                        alt={`${project.title} project screenshot`}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover object-top"
                        loading="lazy"
                    />
                </div>
            )}

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <span className="font-mono text-xs text-[#4E606F] font-semibold">
                            _{String(index + 1).padStart(2, '0')}.
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-[#0064E0] px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200">
                            {isMobileProject ? <Smartphone size={11} /> : <Globe size={11} />}
                            <span>{isMobileProject ? 'Mobile App' : 'Web Platform'}</span>
                        </span>
                        {metricBadge && (
                            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-800 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/80">
                                <span className="size-1.5 rounded-full bg-emerald-500 shrink-0" />
                                <span>{metricBadge}</span>
                            </span>
                        )}
                    </div>

                    {/* Title linked to specific LP */}
                    {targetUrl ? (
                        <a
                            href={targetUrl}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="inline-block group/title"
                        >
                            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-outfit font-bold text-[#0A1317] tracking-tight group-hover/title:text-[#0064E0] transition-colors flex items-center gap-3">
                                <span>{project.title}</span>
                                <ArrowUpRight
                                    size={20}
                                    className="opacity-0 -translate-x-2 translate-y-2 group-hover/title:opacity-100 group-hover/title:translate-x-0 group-hover/title:translate-y-0 transition-all text-[#0064E0] shrink-0"
                                />
                            </h3>
                        </a>
                    ) : (
                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-outfit font-bold text-[#0A1317] tracking-tight">
                            {project.title}
                        </h3>
                    )}

                    <p className="text-sm text-[#4E606F] font-normal max-w-2xl line-clamp-2 leading-relaxed">
                        {project.description}
                    </p>

                    {/* Tech Stack Chips */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                        {project.techStack.map((tech) => (
                            <span
                                key={tech}
                                className="px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#E8E3DA] text-xs text-[#0A1317] font-sans"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-2.5 pt-2 md:pt-0 shrink-0">
                    {targetUrl && (
                        <a
                            href={targetUrl}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#0064E0] hover:bg-[#0052B3] text-white text-xs font-medium transition-all shadow-xs"
                        >
                            <span>Live Preview</span>
                            <ArrowUpRight size={13} />
                        </a>
                    )}
                    <TransitionLink
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white hover:bg-[#FAF8F5] text-[#0A1317] border border-[#E8E3DA] text-xs font-medium transition-all shadow-2xs"
                    >
                        <span>Case Study</span>
                        <ArrowUpRight size={13} />
                    </TransitionLink>
                </div>
            </div>
        </div>
    );
};

export default Project;
