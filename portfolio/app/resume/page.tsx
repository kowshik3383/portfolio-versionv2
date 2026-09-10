import { Metadata } from 'next';
import ResumeClient from './_components/ResumeClient';

export const metadata: Metadata = {
    title: 'Resume | Kowshik Valipireddy - Full Stack & Mobile Developer',
    description:
        'Single-page professional resume of Kowshik Valipireddy, Full Stack & Mobile Developer specializing in React, Next.js, React Native, Node.js, and PostgreSQL.',
    alternates: {
        canonical: 'https://kowshik-valipireddy.pages.dev/resume',
    },
    openGraph: {
        title: 'Kowshik Valipireddy - Resume',
        description:
            'Full Stack & Mobile Developer specializing in React, Next.js, React Native, Node.js, and PostgreSQL.',
        url: 'https://kowshik-valipireddy.pages.dev/resume',
        siteName: 'Kowshik Valipireddy Portfolio',
        locale: 'en_US',
        type: 'profile',
    },
};

export default function ResumePage() {
    return <ResumeClient />;
}
