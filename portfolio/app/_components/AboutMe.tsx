'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const AboutMe = () => {
    const container = React.useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    id: 'about-me-in',
                    trigger: container.current,
                    start: 'top 70%',
                    end: 'bottom bottom',
                    scrub: 0.5,
                },
            });

            tl.from('.slide-up-and-fade', {
                y: 150,
                opacity: 0,
                stagger: 0.05,
            });
        },
        { scope: container },
    );

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    id: 'about-me-out',
                    trigger: container.current,
                    start: 'bottom 50%',
                    end: 'bottom 10%',
                    scrub: 0.5,
                },
            });

            tl.to('.slide-up-and-fade', {
                y: -150,
                opacity: 0,
                stagger: 0.02,
            });
        },
        { scope: container },
    );

    return (
        <section className="about-me-section" id="about-me">
            <div className="about-me-container" ref={container}>
                {/* Hero Statement */}
                <div className="hero-statement-wrapper">
                    <h2 className="hero-statement slide-up-and-fade">
                        I design and build with users at the center—every decision driven by{' '}
                        <span className="highlight">real needs</span>, not assumptions.
                    </h2>
                </div>

                {/* Section Divider */}
                <div className="section-divider slide-up-and-fade">
                    <span className="divider-text">This is me.</span>
                    <div className="divider-line"></div>
                </div>

                {/* Main Content Grid */}
                <div className="content-grid">
                    {/* Left Column - Name */}
                    <div className="name-column">
                        <div className="name-wrapper slide-up-and-fade">
                            <span className="greeting">Hi, I&apos;m</span>
                            <h3 className="name">Kowshik Valipireddy</h3>
                            <div className="accent-line"></div>
                        </div>
                    </div>

                    {/* Right Column - Bio */}
                    <div className="bio-column">
                        <div className="bio-content">
                            <p className="bio-paragraph slide-up-and-fade">
                                I am a frontend and backend developer with a strong foundation in web design,
                                capable of building complete digital products from initial concept to
                                production-ready deployment. I don&apos;t just write code — I translate ideas,
                                requirements, and problems into{' '}
                                <span className="emphasis">fast, scalable, and visually refined</span> web
                                experiences.
                            </p>

                            <p className="bio-paragraph slide-up-and-fade">
                                My work is driven by a user-centered design philosophy, where every interface
                                decision is guided by usability, clarity, and real user behavior. I combine
                                clean UI design with solid engineering practices to ensure performance,
                                accessibility, and responsiveness across all devices and platforms.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Decorative Background Element */}
                <div className="bg-decoration"></div>
            </div>            <style jsx>{`
                .about-me-section {
                    position: relative;
                    padding: 8rem 0 12rem;
                    overflow: hidden;
                }

                .about-me-container {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 0 2rem;
                    position: relative;
                    z-index: 2;
                }

                /* Hero Statement */
                .hero-statement-wrapper {
                    margin-bottom: 8rem;
                }

                .hero-statement {
                    font-family: inherit;
                    font-size: clamp(2.5rem, 6vw, 5rem);
                    font-weight: 300;
                    line-height: 1.2;
                    letter-spacing: -0.02em;
                    color: #f3f4f6;
                    max-width: 1100px;
                }

                .highlight {
                    position: relative;
                    font-weight: 600;
                    color: #ffffff;
                    background: linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                /* Section Divider */
                .section-divider {
                    display: flex;
                    align-items: center;
                    gap: 2rem;
                    margin-bottom: 5rem;
                }

                .divider-text {
                    font-size: 0.875rem;
                    font-weight: 400;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                    color: #d1d5db;
                    white-space: nowrap;
                }

                .divider-line {
                    height: 1px;
                    flex: 1;
                    background: linear-gradient(to right, #4b5563 0%, transparent 100%);
                }

                /* Content Grid */
                .content-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 4rem;
                }

                @media (min-width: 768px) {
                    .content-grid {
                        grid-template-columns: 5fr 7fr;
                        gap: 6rem;
                    }
                }

                /* Name Column */
                .name-column {
                    position: relative;
                }

                .name-wrapper {
                    position: sticky;
                    top: 8rem;
                }

                .greeting {
                    display: block;
                    font-size: 1.125rem;
                    font-weight: 400;
                    color: #d1d5db;
                    margin-bottom: 0.75rem;
                    letter-spacing: 0.05em;
                }

                .name {
                    font-family: inherit;
                    font-size: clamp(3rem, 5vw, 4.5rem);
                    font-weight: 800;
                    letter-spacing: -0.03em;
                    color: #ffffff;
                    line-height: 1;
                    margin: 0 0 1.5rem 0;
                    text-transform: lowercase;
                }

                .accent-line {
                    width: 60px;
                    height: 3px;
                    background: linear-gradient(to right, #00d4ff, #7c3aed);
                    border-radius: 2px;
                }

                /* Bio Column */
                .bio-column {
                    position: relative;
                }

                .bio-content {
                    max-width: 550px;
                }

                .bio-paragraph {
                    font-size: 1.25rem;
                    font-weight: 300;
                    line-height: 1.8;
                    color: #e5e7eb;
                    margin-bottom: 2rem;
                }

                .bio-paragraph:last-child {
                    margin-bottom: 0;
                }

                .emphasis {
                    color: #ffffff;
                    font-weight: 500;
                    font-style: italic;
                }

                /* Decorative Background */
                .bg-decoration {
                    position: absolute;
                    top: 20%;
                    right: -10%;
                    width: 600px;
                    height: 600px;
                    background: radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 1;
                    filter: blur(80px);
                }

                /* Responsive adjustments */
                @media (max-width: 767px) {
                    .about-me-section {
                        padding: 5rem 0 8rem;
                    }

                    .hero-statement-wrapper {
                        margin-bottom: 5rem;
                    }

                    .section-divider {
                        margin-bottom: 3rem;
                    }

                    .name-wrapper {
                        position: relative;
                        top: 0;
                    }

                    .bio-paragraph {
                        font-size: 1.125rem;
                    }
                }

                /* Animation enhancement */
                .slide-up-and-fade {
                    will-change: transform, opacity;
                }

                /* Hover effects for interactive feel */
                @media (hover: hover) {
                    .name:hover {
                        background: linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                        transition: all 0.3s ease;
                    }
                }
            `}</style>
        </section>
    );
};

export default AboutMe;