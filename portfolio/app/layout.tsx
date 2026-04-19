import type { Metadata } from 'next';
import { Anton, Roboto } from 'next/font/google';
import { ReactLenis } from 'lenis/react';

import 'lenis/dist/lenis.css';
import './globals.css';
import Footer from '@/components/Footer';
import ScrollProgressIndicator from '@/components/ScrollProgressIndicator';
import ParticleBackground from '@/components/ParticleBackground';
import Navbar from '@/components/Navbar';
// import CustomCursor from '@/components/CustomCursor';
import Preloader from '../components/Preloader';
import StickyEmail from './_components/StickyEmail';
const antonFont = Anton({
    weight: '400',
    style: 'normal',
    subsets: ['latin'],
    variable: '--font-anton',
});

const robotoFlex = Roboto({
    weight: ['100', '400', '500', '600', '700', '800'],
    style: 'normal',
    subsets: ['latin'],
    variable: '--font-roboto-flex',
});
export const metadata: Metadata = {
  title: 'Kowshik Valipireddy | Frontend Developer Portfolio (Next.js, React, Performance)',
  description:
    'Frontend Developer specializing in Next.js, React, and performance optimization. Explore real-world projects, case studies, and solutions to common frontend problems like slow websites, SEO issues, and bad UI/UX.',

  keywords: [
    // Core identity
    'Kowshik Valipireddy',
    'Kowshik portfolio',
    'Frontend developer portfolio',
    'Next.js developer',
    'React developer',
    'Frontend developer India',

    // Skill-based searches
    'Next.js performance optimization',
    'React performance tuning',
    'frontend optimization techniques',
    'SEO for Next.js',
    'improve website speed',
    'Core Web Vitals fix',

    // Problem-based (high traffic 🔥)
    'why website is slow',
    'fix slow React app',
    'Next.js SEO issues',
    'bad frontend performance fix',
    'frontend bugs troubleshooting',
    'UI UX problems and solutions',

    // Negative / doubt-based (VERY IMPORTANT 💀)
    'frontend developer mistakes',
    'common React mistakes',
    'Next.js disadvantages',
    'is Next.js worth it',
    'bad portfolio examples',
    'how not to design a website',
    'frontend security vulnerabilities',
    'XSS in React apps',
    'frontend vulnerabilities examples',

    // Hiring intent
    'hire frontend developer India',
    'freelance React developer',
    'Next.js expert for hire',
    'frontend developer projects',
    'real world frontend case studies',

    // Personal branding + trust
    'Kowshik developer reviews',
    'Kowshik frontend projects',
    'is Kowshik developer good',
  ],

  verification: {
    google: 'MrESzIcdtoSJTe-uVECDVYysvrxosTQ1h2T-hvRcVx0',
  },

  openGraph: {
    title: 'Kowshik Valipireddy | Frontend Developer Portfolio',
    description:
      'Explore frontend projects, performance optimizations, and solutions to real-world UI, SEO, and speed problems.',
    url: 'https://portfolio-versionv2-mlj2.vercel.app',
    siteName: 'Kowshik Portfolio',
    type: 'website',
  },
};
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
       
            <body
                className={`${antonFont.variable} ${robotoFlex.variable} antialiased`}
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

                    {/* <CustomCursor /> */}
                    <Preloader />
                    <ScrollProgressIndicator />
                    <ParticleBackground />
                    <StickyEmail />
                </ReactLenis>
            </body>
        </html>
    );
}
