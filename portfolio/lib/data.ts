import { IProject, IExperience } from '@/types';
export const GENERAL_INFO = {
    email: 'kowshikvalipireddy@gmail.com',

    emailSubject: "Exploring a potential collaboration",
    emailBody:
        "Hi Kowshik,\n\nI hope you're doing well. I came across your work and would love to explore the possibility of collaborating on a project. If this sounds interesting, I’d be happy to share more details and hear your thoughts.\n\nLooking forward to connecting.",

    upworkProfile: 'https://www.linkedin.com/in/kowshikvalipireddy/',
};

export const SOCIAL_LINKS = [
    { name: 'github', url: 'https://github.com/kowshik3383' },
    { name: 'linkedin', url: 'https://www.linkedin.com/in/kowshikvalipireddy' },
    { name: 'facebook', url: 'https://www.linkedin.com/in/kowshikvalipireddy' },
];

export const MY_STACK = {
    mobile: [
        {
            name: 'React Native',
            icon: '/logo/react-native.svg',
        },
        {
            name: 'Expo',
            icon: '/logo/expo.svg',
        },
        {
            name: 'iOS & Android',
            icon: '/logo/react.png',
        },
        {
            name: 'Redux / Zustand',
            icon: '/logo/redux.png',
        },
    ],
    frontend: [
        {
            name: 'JavaScript',
            icon: '/logo/js.png',
        },
        {
            name: 'TypeScript',
            icon: '/logo/ts.png',
        },
        {
            name: 'React',
            icon: '/logo/react.png',
        },
        {
            name: 'Next.js',
            icon: '/logo/next.png',
        },
        {
            name: 'Redux',
            icon: '/logo/redux.png',
        },
        {
            name: 'Tailwind CSS',
            icon: '/logo/tailwind.png',
        },
        {
            name: 'GSAP',
            icon: '/logo/gsap.png',
        },
        {
            name: 'Framer Motion',
            icon: '/logo/framer-motion.png',
        },
        {
            name: 'Sass',
            icon: '/logo/sass.png',
        },
        {
            name: 'Bootstrap',
            icon: '/logo/bootstrap.svg',
        },
    ],
    backend: [
        {
            name: 'Node.js',
            icon: '/logo/node.png',
        },
        {
            name: 'NestJS',
            icon: '/logo/nest.svg',
        },
        {
            name: 'Express.js',
            icon: '/logo/express.png',
        },
    ],
    database: [
        {
            name: 'MySQL',
            icon: '/logo/mysql.svg',
        },
        {
            name: 'PostgreSQL',
            icon: '/logo/postgreSQL.png',
        },
        {
            name: 'MongoDB',
            icon: '/logo/mongodb.svg',
        },
        {
            name: 'Prisma',
            icon: '/logo/prisma.png',
        },
    ],
    deployment: [
        {
            name: 'Vercel',
            icon: '/logo/vercel.svg',
        },
        {
            name: 'EAS & App Store/Play Store',
            icon: '/logo/expo.svg',
        },
        {
            name: 'Docker Containers',
            icon: '/logo/docker.svg',
        },
        {
            name: 'AWS Cloud',
            icon: '/logo/aws.png',
        },
    ],
    tools: [
        {
            name: 'Git & GitHub',
            icon: '/logo/git.png',
        },
        {
            name: 'Figma & Plugin Dev',
            icon: '/logo/figma.svg',
        },
        {
            name: 'Docker',
            icon: '/logo/docker.svg',
        },
        {
            name: 'AWS',
            icon: '/logo/aws.png',
        },
    ],
};

export const PROJECTS: IProject[] = [
    {
        title: 'Figma to Code [HTML, Tailwind, React]',
        slug: 'figma-to-code-plugin',
        liveUrl: 'https://www.figma.com/community/plugin/1670837309887282952/figma-to-code-html-tailwind-react',
        year: 2026,
        description: 'A professional Figma Community plugin that converts Figma frames, components, and Auto Layouts into clean, responsive HTML, Tailwind CSS (v3 & v4), React JSX, and Next.js projects 100% offline.',
        techStack: ['Figma Plugin API', 'TypeScript', 'Tailwind CSS', 'React (JSX)', 'HTML5 & CSS3', 'Design Tokens', 'Next.js Export'],
        thumbnail: '/c96141d7cf5528a042ffdc81b2207244be355d8d.png',
        longThumbnail: '/c96141d7cf5528a042ffdc81b2207244be355d8d.png',
        images: ['/c96141d7cf5528a042ffdc81b2207244be355d8d.png'],
        details: {
            overview: "Figma to Code is an official Figma Community plugin engineered to bridge the gap between design and production development. It converts complex Figma frames, components, typography, variables, and Auto Layout structures into clean, responsive, production-ready code in seconds — running 100% offline inside the Figma desktop client without external API keys.",
            features: [
                "Supported Frameworks: Tailwind CSS (v3 & v4), Semantic HTML5 & CSS3, React (JSX), Next.js project exports, Vite, Svelte, and Styled Components.",
                "100% Offline & Private: Operates entirely inside the Figma client sandbox with zero telemetry and no external cloud dependency.",
                "One-Click Full Project Export: Downloads complete, runnable projects as .zip files with generated component code and asset bundles.",
                "Smart Asset & Icon Handling: Automatic detection, scaling, and export for PNG raster assets and clean SVG vector icons.",
                "Design Tokens & Figma Variables: Extracts colors, gradients, and custom design variables into reusable code tokens.",
                "Auto Layout Translation: Maps Figma flex auto-layouts directly into responsive CSS Flexbox and Grid structures.",
                "In-Plugin Live Responsive Preview: Real-time viewport preview across mobile and desktop breakpoints directly within Figma Dev Mode."
            ],
            challenges: "Parsing deeply nested Figma scene graphs, converting divergent layout constraints into clean CSS Flexbox without visual layout drift, and serializing raster and vector assets into downloadable zip bundles fully offline.",
            outcome: "Published on the official Figma Community with instant adoption, empowering designers and developers to export pixel-perfect code in one click."
        },
        link: 'https://www.figma.com/community/plugin/1670837309887282952/figma-to-code-html-tailwind-react'
    },
    {
        title: 'AI Technical Interviewer',
        slug: 'ai-technical-interviewer',
        liveUrl: 'https://ai-interviewer-ten-delta.vercel.app/',
        year: 2025,
        description: 'A voice-first AI technical evaluation platform that speaks aloud, observes candidate keystrokes live via WebSockets, provides proactive hints when stuck, and outputs structured hiring decision scorecards.',
        techStack: ['Next.js 15', 'React 19', 'TypeScript', 'WebSockets', 'Shunya Labs AI Voice', 'Monaco Editor', 'OpenRouter AI', 'Tailwind CSS'],
        thumbnail: '/image (6).png',
        longThumbnail: '/image (6).png',
        images: ['/image (6).png'],
        details: {
            overview: "AI Technical Interviewer is an authentic technical assessment platform powered by conversational voice AI and real-time code observability. The AI conducts natural dialogue using Shunya Labs Zero-TTS, inspects uncommitted buffer changes over WebSockets in an embedded Monaco Editor, delivers gentle spoken coaching hints during pauses (>35s), and compiles candidate solutions in isolated sandboxes to generate comprehensive radar scorecards.",
            features: [
                "Voice-First Dialogue: Neural voice speech synthesis with Shunya Labs Zero-TTS (Varun voice profile) and real-time turn-taking silence detection.",
                "Live Keystroke Observability: Monaco Editor streaming live code over WebSockets with proactive micro-hints when candidates stall.",
                "9 Specialized Language Banks: Pre-loaded junior, mid, and senior coding challenges across JavaScript, Python, Java, C++, C, C#, SQL, HTML5, and CSS3.",
                "Multi-Model Fallback Chain: OpenRouter orchestration with automatic silent failovers across Claude 3.5 Sonnet, GPT-4o, Gemini 2.5 Pro, DeepSeek, and LLaMA 3.3.",
                "Deterministic FSM & Sandboxing: Finite state machine preventing hallucinated interview states and measuring runtime, stderr, and memory safely.",
                "Hiring Decision Scorecards: Interactive competency radar matrix, rubric audit logs, and PDF export."
            ],
            challenges: "Achieving sub-second voice latency while simultaneously synchronizing continuous WebSocket editor deltas and orchestrating multi-model LLM failovers. Solved by implementing a deterministic finite state machine on the server, lightweight delta buffers, and client-side audio streaming.",
            outcome: "Delivered a realistic, high-fidelity technical interview simulator across 9 programming ecosystems with zero rate-limit aborts and human-level conversational cadence."
        },
        link: 'https://ai-interviewer-ten-delta.vercel.app/'
    },
    {
        title: 'HealthTrack Analytics Platform',
        slug: 'healthtrack-analytics-platform',
        liveUrl: 'https://tracker-mocha-ten.vercel.app/',
        year: 2025,
        description: 'A full-stack health and fitness analytics dashboard featuring personalized onboarding, meal planning, hydration logs, sleep cadence, and interactive progress charts.',
        techStack: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Prisma ORM', 'PostgreSQL', 'Recharts', 'NextAuth'],
        thumbnail: '/image (5).png',
        longThumbnail: '/image (5).png',
        images: ['/image (5).png'],
        details: {
            overview: "HealthTrack is a full-stack health and fitness management ecosystem built on Next.js 15 App Router and PostgreSQL. It empowers users to schedule workouts, monitor hydration levels, log daily meals, track sleep duration, and visualize fitness progress through responsive charts.",
            features: [
                "Multi-Step Onboarding Architecture: Intuitive 5-step guided setup (StepBasicInfo, StepActivity, StepTargets, StepReview, ProgressSidebar) calculating personalized BMR & macros.",
                "Interactive Modal Logging Suite: Quick modals for AddMeal, LogExercise, LogWater, and guided ProductTour.",
                "Comprehensive Health & Habit Tracking: Modules for analytics, calendar scheduling, hydration, workouts, meal planning, and sleep tracking.",
                "PostgreSQL & Prisma Persistence: Type-safe database modeling for daily nutrition, fitness timeseries, and user goals.",
                "Interactive Data Visualizations: Dynamic charts illustrating caloric deficits, macro splits, and weekly exercise frequency."
            ],
            challenges: "Handling multi-step state synchronization during user onboarding while calculating dynamic caloric targets and ensuring instant optimistic UI updates across diverse health logging categories.",
            outcome: "Delivered a high-performance wellness dashboard with sub-second API responses, seamless mobile-responsive workflows, and complete daily health progress visibility."
        },
        link: 'https://tracker-mocha-ten.vercel.app/'
    },
    {
        title: 'Antique Journal - AI Tactile Sanctuary',
        slug: 'antique-journal-ai-sanctuary',
        liveUrl: 'https://antique-journal2.vercel.app/',
        year: 2025,
        description: 'A tactile digital haven combining the mindful weight of leather-bound paper with AI semantic memory recall, emotional chronometer tracking, and zero-knowledge client encryption.',
        techStack: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Semantic AI Search', 'Client Encryption', 'Vector Embeddings'],
        thumbnail: '/image (4).png',
        longThumbnail: '/image (4).png',
        images: ['/image (4).png'],
        details: {
            overview: "Antique Journal recreates the meditative focus of writing on archival rag paper while augmenting memory with AI intelligence. It features semantic memory recall, evening reflection synthesis, an interactive mood chronometer, and archival photo plates with strict privacy protection.",
            features: [
                "Tactile Digital Typography: Distraction-free editorial canvas with continuous autosave, custom serif typography, and tactile paper styling.",
                "AI Semantic Memory Recall: Natural language querying over personal archives allowing users to query past realizations and life themes.",
                "Evening Mirror & Synthesis: Thoughtful end-of-day AI reflection highlighting emotional cadence, recurring habits, and personal growth.",
                "Quiet Mood Chronometer: One-gesture emotional topography logging across calm, grateful, inspired, resilient, pensive, and triumphant states.",
                "Zero-Knowledge Encryption: Strict client-side encryption and passkey authentication with zero telemetry or tracking.",
                "Archival Photo Plates: Seamless image embedding to preserve visual textures alongside prose."
            ],
            challenges: "Balancing the nostalgic, skeuomorphic feel of physical bound paper with high-performance responsive web typography and secure client-side vector search without compromising zero-knowledge privacy.",
            outcome: "Built a tranquil, deeply private digital sanctuary with lightning-fast semantic recall, serving as a lifelong archive for thoughtful writers."
        },
        link: 'https://antique-journal2.vercel.app/'
    }
];

export const MY_EXPERIENCE: IExperience[] = [
    {
        title: 'Full Stack & Mobile Developer',
        company: 'Tap Health',
        duration: 'April 2025 - Present',
        highlights: [
            'Architected and shipped core patient health flows in **React, Next.js, and React Native** — including daily glucose tracking, meal logging, and multi-step onboarding.',
            'Identified and resolved critical application bottlenecks, navigation deadlocks, date/timezone issues, and state sync bugs, significantly improving reliability.',
            'Designed and shipped **30+ high-performance landing pages** in Next.js 15, optimizing for sub-second LCP and higher user conversion.',
            'Collaborated directly with clinicians, users, and product teams to translate real-world medical pain points into intuitive, accessible mobile & web experiences.',
            'Implemented end-to-end **analytics and event-tracking funnels**, providing complete visibility into patient drop-off and retention.',
        ],
    },
    {
        title: 'Full Stack & React Native Developer',
        company: 'ZarvisGenix',
        duration: 'Sep 2024 – Apr 2025',
        highlights: [
            'Built and deployed **multiple production digital products from scratch** across web and mobile using React, React Native, Node.js, and PostgreSQL.',
            'Engineered scalable **doctor portals, HR platforms, and administrative dashboards** with role-based access control (RBAC) and real-time data sync.',
            'Developed and integrated **AI-powered speech-to-text pipelines**, enabling intelligent voice transcription and automated user workflows.',
            'Implemented secure authentication, rate-limited REST APIs, and type-safe database schemas with Prisma ORM.',
            '**Pitched product architecture directly to investors and stakeholders**, translating business requirements into scalable, production-ready software.',
        ],
    },
];
