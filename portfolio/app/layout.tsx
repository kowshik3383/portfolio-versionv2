import type { Metadata } from 'next';
import { Outfit, DM_Sans, JetBrains_Mono } from 'next/font/google';
import { ReactLenis } from 'lenis/react';

import 'lenis/dist/lenis.css';
import './globals.css';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import ScrollProgressIndicator from '@/components/ScrollProgressIndicator';
import StickyEmail from './_components/StickyEmail';
import FloatingNavDock from '@/components/FloatingNavDock';
import GuideBlob from '@/components/GuideBlob';
import LogRocketProvider from '@/components/LogRocketProvider';

const outfit = Outfit({
    weight: ['400', '500', '600', '700', '800'],
    style: 'normal',
    subsets: ['latin'],
    variable: '--font-outfit',
    display: 'swap',
});

const dmSans = DM_Sans({
    weight: ['400', '500', '600', '700'],
    style: 'normal',
    subsets: ['latin'],
    variable: '--font-dm-sans',
    display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
    weight: ['400', '500', '600', '700'],
    style: 'normal',
    subsets: ['latin'],
    variable: '--font-jetbrains-mono',
    display: 'swap',
});

export const metadata: Metadata = {
    title: {
        default:
            'Kowshik Valipireddy | Full Stack & React Native Mobile Engineer',
        template: '%s | Kowshik Valipireddy',
    },
    description:
        'Official portfolio & engineering blog of Kowshik Valipireddy. Full Stack Developer, React Native Mobile Engineer, and AI Solutions Specialist specializing in Next.js, React, React Native (iOS & Android), TypeScript, Node.js, and high-performance cross-platform apps.',
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
        'React Native Engineer',
        'React Native Developer Kowshik',
        'Mobile App Developer Kowshik',
        'Cross Platform Mobile Developer',
        'Full Stack Engineer Kowshik',
        'Frontend Developer Kowshik Valipireddy',
        'Next.js React Developer Kowshik',
        'React Native Expo Developer',
        'iOS Android Developer Kowshik',
        'Kowshik AI Engineer',
        'kowshik3383',
        'Kowshik Software Engineer',
    ],
    authors: [
        {
            name: 'Kowshik Valipireddy',
            url: 'https://kowshik-valipireddy.pages.dev',
        },
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
        title: 'Kowshik Valipireddy | Full Stack & React Native Mobile Engineer',
        description:
            'Official portfolio and engineering blog of Kowshik Valipireddy. Explore featured web & mobile projects, technical articles, and AI workflows.',
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
        title: 'Kowshik Valipireddy | Full Stack & React Native Engineer Portfolio',
        description:
            'Portfolio & technical engineering blog of Kowshik Valipireddy. Full Stack Development, React Native Mobile, React, Next.js, and AI.',
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
                    'Kowshik React Native Developer',
                ],
                givenName: 'Kowshik',
                familyName: 'Valipireddy',
                url: 'https://kowshik-valipireddy.pages.dev',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3iU7_eaFHg4VstsVmXTGALCaWwVpFs7ewYduzp1K4n94mvB1MeDC4wkA&s=10',
                jobTitle: 'Full Stack Developer & React Native Mobile Engineer',
                description:
                    'Full Stack Developer, React Native Mobile Engineer, and AI Solutions Specialist building high-performance cross-platform mobile and web systems.',
                sameAs: [
                    'https://github.com/kowshik3383',
                    'https://www.linkedin.com/in/kowshikvalipireddy',
                ],
                knowsAbout: [
                    'Kowshik Valipireddy',
                    'React Native',
                    'Mobile App Development',
                    'Cross-Platform iOS & Android',
                    'Expo',
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
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(personSchema),
                    }}
                />
            </head>
            <body
                className={`${outfit.variable} ${dmSans.variable} ${jetbrainsMono.variable} font-sans antialiased bg-[#FAF8F5] text-[#0A1317] selection:bg-[#0064E0] selection:text-white`}
                suppressHydrationWarning
            >
                <ReactLenis
                    root
                    options={{
                        lerp: 0.1,
                        duration: 1.4,
                    }}
                >
                    <main>{children}</main>
                    <Footer />
                    <ScrollProgressIndicator />
                    <ParticleBackground />
                    <StickyEmail />
                    <FloatingNavDock />
                    <GuideBlob />
                    <LogRocketProvider />
                </ReactLenis>
            </body>
        </html>
    );
}
