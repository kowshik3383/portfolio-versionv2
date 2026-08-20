import type { Metadata } from 'next';
import { Anton, Roboto } from 'next/font/google';
import { ReactLenis } from 'lenis/react';

import 'lenis/dist/lenis.css';
import './globals.css';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Preloader from '../components/Preloader';
import ParticleBackground from '@/components/ParticleBackground';
import ScrollProgressIndicator from '@/components/ScrollProgressIndicator';
import StickyEmail from './_components/StickyEmail';

const antonFont = Anton({
    weight: '400',
    style: 'normal',
    subsets: ['latin'],
    variable: '--font-anton',
    display: 'swap',
    preload: true,
});

const robotoFlex = Roboto({
    weight: ['400', '500', '700'],
    style: 'normal',
    subsets: ['latin'],
    variable: '--font-roboto-flex',
    display: 'swap',
    preload: true,
});

export const metadata: Metadata = {
    title: {
        default: 'Kowshik Valipireddy | Full Stack Developer & AI Engineer Portfolio',
        template: '%s | Kowshik Valipireddy',
    },
    description:
        'Official portfolio & engineering blog of Kowshik Valipireddy. Full Stack Developer and AI Engineer specializing in React, Next.js, TypeScript, Node.js, and high-performance web solutions.',
    keywords: [
        'Kowshik',
        'Valipireddy',
        'Kowshik Valipireddy',
        'kowshik valipireddy',
        'Kowshik Developer',
        'Valipireddy Developer',
        'Kowshik Portfolio',
        'Valipireddy Portfolio',
        'Kowshik Valipireddy Portfolio',
        'Full Stack Engineer Kowshik',
        'Frontend Developer Kowshik Valipireddy',
        'Next.js React Developer Kowshik',
        'Kowshik AI Engineer',
        'kowshik3383',
        'Kowshik Software Engineer',
    ],
    authors: [
        { name: 'Kowshik Valipireddy', url: 'https://kowshik-valipireddy.pages.dev' },
        { name: 'Kowshik' },
        { name: 'Valipireddy' },
    ],
    creator: 'Kowshik Valipireddy',
    publisher: 'Kowshik Valipireddy',
    metadataBase: new URL('https://kowshik-valipireddy.pages.dev'),
    alternates: {
        canonical: 'https://kowshik-valipireddy.pages.dev',
    },
    openGraph: {
        title: 'Kowshik Valipireddy | Full Stack Developer & AI Engineer',
        description:
            'Official portfolio and engineering blog of Kowshik Valipireddy. Explore featured web projects, technical articles, and AI workflows.',
        url: 'https://kowshik-valipireddy.pages.dev',
        siteName: 'Kowshik Valipireddy Portfolio',
        type: 'website',
        locale: 'en_US',
        images: [
            {
                url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
                width: 1200,
                height: 630,
                alt: 'Kowshik Valipireddy Portfolio',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Kowshik Valipireddy | Full Stack Developer Portfolio',
        description:
            'Portfolio & technical engineering blog of Kowshik Valipireddy. Full Stack Development, React, Next.js, and AI.',
        images: [
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
        ],
        creator: '@kowshik3383',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: 'WMm0NPpO5LZS9y6vHnHhJyk4nAXR69_ZRqS4svbD6Q8',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const personSchema = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Person',
                '@id': 'https://kowshik-valipireddy.pages.dev/#person',
                name: 'Kowshik Valipireddy',
                alternateName: [
                    'Kowshik',
                    'Valipireddy',
                    'kowshik3383',
                    'Kowshik V',
                    'kowshik valipireddy',
                    'Kowshik Developer',
                ],
                givenName: 'Kowshik',
                familyName: 'Valipireddy',
                url: 'https://kowshik-valipireddy.pages.dev',
                image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
                jobTitle: 'Full Stack Developer & AI Engineer',
                description:
                    'Full Stack Developer and AI Solutions Engineer specializing in Next.js, React, Node.js, and high-performance web systems.',
                sameAs: [
                    'https://github.com/kowshik3383',
                    'https://www.linkedin.com/in/kowshikvalipireddy',
                ],
                knowsAbout: [
                    'Kowshik Valipireddy',
                    'Full Stack Development',
                    'Frontend Engineering',
                    'Backend Engineering',
                    'Next.js',
                    'React',
                    'TypeScript',
                    'Node.js',
                    'AI Agents',
                    'PostgreSQL',
                    'Prisma',
                ],
            },
            {
                '@type': 'WebSite',
                '@id': 'https://kowshik-valipireddy.pages.dev/#website',
                url: 'https://kowshik-valipireddy.pages.dev',
                name: 'Kowshik Valipireddy - Official Portfolio & Blog',
                alternateName: [
                    'Kowshik Portfolio',
                    'Valipireddy Portfolio',
                    'Kowshik Valipireddy Website',
                ],
                publisher: {
                    '@id': 'https://kowshik-valipireddy.pages.dev/#person',
                },
            },
        ],
    };

    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
                />
            </head>
            <body
                className={`${antonFont.variable} ${robotoFlex.variable} antialiased`}
                suppressHydrationWarning
            >
                <ReactLenis
                    root
                    options={{
                        lerp: 0.1,
                        duration: 1.4,
                    }}
                >
                    <Navbar />
                    <main>{children}</main>
                    <Footer />
                    <Preloader />
                    <ScrollProgressIndicator />
                    <ParticleBackground />
                    <StickyEmail />
                </ReactLenis>
            </body>
        </html>
    );
}
