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

const Project = ({ index, project, onMouseEnter }: Props) => {
    const isMobileProject =
        project.slug.includes('react-native') ||
        project.title.toLowerCase().includes('react native') ||
        project.title.toLowerCase().includes('mobile');
    const targetUrl = project.liveUrl || project.link;

    return (
        <div
            className="project-item group py-8 sm:py-10 border-b border-white/10 first:pt-0 last:border-none transition-all duration-300 md:group-hover/projects:opacity-40 md:hover:!opacity-100"
            onMouseEnter={() => onMouseEnter(project.slug)}
        >
            {/* Mobile Thumbnail Card - Direct link to specific LP */}
            {targetUrl ? (
                <a
                    href={targetUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="md:hidden block mb-5 rounded-xl overflow-hidden border border-white/10 aspect-[16/9] relative group/img cursor-pointer"
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
                    <div className="absolute top-3 right-3 p-2 rounded-lg bg-black/70 backdrop-blur-sm text-cyan-400 border border-white/10">
                        <ArrowUpRight size={14} />
                    </div>
                </a>
            ) : (
                <div className="md:hidden mb-5 rounded-xl overflow-hidden border border-white/10 aspect-[16/9] relative">
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
                    <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-neutral-400 font-semibold">
                            _{String(index + 1).padStart(2, '0')}.
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-cyan-400 px-2 py-0.5 rounded bg-cyan-400/10 border border-cyan-400/20">
                            {isMobileProject ? <Smartphone size={11} /> : <Globe size={11} />}
                            <span>{isMobileProject ? 'Mobile App' : 'Web Platform'}</span>
                        </span>
                    </div>

                    {/* Title linked to specific LP */}
                    {targetUrl ? (
                        <a
                            href={targetUrl}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="inline-block group/title"
                        >
                            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-anton text-white tracking-wide group-hover/title:text-cyan-300 transition-colors flex items-center gap-3">
                                <span>{project.title}</span>
                                <ArrowUpRight
                                    size={22}
                                    className="opacity-0 -translate-x-2 translate-y-2 group-hover/title:opacity-100 group-hover/title:translate-x-0 group-hover/title:translate-y-0 transition-all text-cyan-400 shrink-0"
                                />
                            </h3>
                        </a>
                    ) : (
                        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-anton text-white tracking-wide">
                            {project.title}
                        </h3>
                    )}

                    <p className="text-sm text-neutral-400 font-light max-w-2xl line-clamp-2">
                        {project.description}
                    </p>

                    {/* Tech Stack Chips */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                        {project.techStack.map((tech) => (
                            <span
                                key={tech}
                                className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/5 text-xs text-neutral-300 font-mono"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-3 pt-2 md:pt-0 shrink-0">
                    {targetUrl && (
                        <a
                            href={targetUrl}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-400/10 hover:bg-cyan-400/20 text-cyan-400 border border-cyan-400/20 text-xs font-mono transition-colors"
                        >
                            <span>Live Preview</span>
                            <ArrowUpRight size={13} />
                        </a>
                    )}
                    <TransitionLink
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 text-xs font-mono transition-colors"
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
