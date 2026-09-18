'use client';
import SectionTitle from '@/components/SectionTitle';
import { PROJECTS } from '@/lib/data';
import { cn } from '@/lib/utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import Image from 'next/image';
import React, { useRef, useState, MouseEvent } from 'react';
import Project from './Project';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ProjectList = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const projectListRef = useRef<HTMLDivElement>(null);
    const imageContainer = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const [selectedProject, setSelectedProject] = useState<string | null>(
        PROJECTS[0].slug,
    );

    // update imageRef.current href based on the cursor hover position
    // also update image position
    useGSAP(
        (context, contextSafe) => {
            // show image on hover
            if (window.innerWidth < 768) {
                setSelectedProject(null);
                return;
            }

            const handleMouseMove = contextSafe?.((e: MouseEvent) => {
                if (!containerRef.current) return;
                if (!imageContainer.current) return;

                if (window.innerWidth < 768) {
                    setSelectedProject(null);
                    return;
                }

                const containerRect =
                    containerRef.current?.getBoundingClientRect();
                const imageRect =
                    imageContainer.current.getBoundingClientRect();
                const offsetTop = e.clientY - containerRect.y;

                // if cursor is outside the container, hide the image
                if (
                    containerRect.y > e.clientY ||
                    containerRect.bottom < e.clientY ||
                    containerRect.x > e.clientX ||
                    containerRect.right < e.clientX
                ) {
                    return gsap.to(imageContainer.current, {
                        duration: 0.3,
                        opacity: 0,
                    });
                }

                gsap.to(imageContainer.current, {
                    y: offsetTop - imageRect.height / 2,
                    duration: 1,
                    opacity: 1,
                    ease: 'power2.out',
                });
            }) as any;

            window.addEventListener('mousemove', handleMouseMove);

            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
            };
        },
        { scope: containerRef, dependencies: [containerRef.current] },
    );

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top bottom',
                    end: 'top 80%',
                    toggleActions: 'restart none none reverse',
                    scrub: 1,
                },
            });

            tl.from(containerRef.current, {
                y: 150,
                opacity: 0,
            });
        },
        { scope: containerRef },
    );

    const handleMouseEnter = (slug: string) => {
        if (window.innerWidth < 768) {
            setSelectedProject(null);
            return;
        }

        setSelectedProject(slug);
    };

    return (
        <section className="relative py-20 sm:py-28 overflow-hidden border-t border-[#E8E3DA] bg-[#FAF8F5]" id="selected-projects">
            <div className="container relative z-10">
                <div className="mb-14">
                    <SectionTitle badge="FEATURED WORK" title="SELECTED PRODUCTION SYSTEMS" />
                    <p className="font-mono text-xs uppercase tracking-widest text-[#68645E] -mt-5">
                        Shipped web platforms, cross-platform mobile apps &amp; developer tools
                    </p>
                </div>

                <div className="group/projects relative" ref={containerRef}>
                    {selectedProject !== null && (
                        <div
                            className="hidden fixed right-8 xl:right-16 top-1/2 -translate-y-1/2 z-50 pointer-events-none w-[280px] xl:w-[380px] aspect-[3/4] opacity-0"
                            ref={imageContainer}
                        >
                            {/* Image container with border and shadow */}
                            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl ring-1 ring-[#E8E3DA] bg-white">
                                {PROJECTS.map((project) => (
                                    <Image
                                        src={project.thumbnail}
                                        alt={`${project.title} live showcase`}
                                        width={400}
                                        height={533}
                                        sizes="(max-width: 1200px) 280px, 380px"
                                        loading="lazy"
                                        decoding="async"
                                        className={cn(
                                            'absolute inset-0 transition-all duration-700 ease-out w-full h-full object-cover scale-105',
                                            {
                                                'opacity-0 scale-95':
                                                    project.slug !==
                                                    selectedProject,
                                                'opacity-100 scale-105':
                                                    project.slug ===
                                                    selectedProject,
                                            },
                                        )}
                                        ref={imageRef}
                                        key={project.slug}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    <div
                        className="flex flex-col divide-y divide-[#E8E3DA]"
                        ref={projectListRef}
                    >
                        {PROJECTS.map((project, index) => (
                            <Project
                                index={index}
                                project={project}
                                selectedProject={selectedProject}
                                onMouseEnter={handleMouseEnter}
                                key={project.slug}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectList;