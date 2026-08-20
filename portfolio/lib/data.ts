import { IProject } from '@/types';

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
    tools: [
        {
            name: 'Git',
            icon: '/logo/git.png',
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
        title: 'GenixAI Hospital Management',
        slug: 'genixai-hospital-management',
        liveUrl: 'https://app.genixai.info/',
        year: 2025,
        description: 'A smart healthcare dashboard to manage appointments, patient records, and prescriptions — powered by AI-driven voice recognition.',
        techStack: ['React', 'Tailwind CSS', 'Firebase', 'AI', 'Speech-to-Text'],
        thumbnail: 'https://i.ibb.co/WpKw1Qdf/Genix-Google-Chrome-13-04-2025-19-13-43.png',
        longThumbnail: 'https://i.ibb.co/WpKw1Qdf/Genix-Google-Chrome-13-04-2025-19-13-43.png',
        images: ['https://i.ibb.co/WpKw1Qdf/Genix-Google-Chrome-13-04-2025-19-13-43.png'],
        details: {
            overview: "GenixAI Hospital Management is an intelligent platform designed to streamline patient care. It helps hospitals and clinics automate appointment scheduling, generate medical notes using AI-powered speech-to-text, and simplify prescription handling.",
            features: [
                "AI-driven speech-to-text for quick note generation",
                "Seamless appointment booking and tracking",
                "Prescription uploads and import from external sources",
                "Patient history and record management",
                "Real-time notifications and role-based access"
            ],
            challenges: "Integrating accurate and fast speech-to-text transcription in real-world noisy environments was a core challenge. We overcame it by fine-tuning AI models and implementing custom noise-filtering layers. Additionally, prescription import compatibility across varying formats required robust parsing logic.",
            outcome: "The system reduced manual data entry by 65%, improved doctor efficiency, and significantly enhanced patient satisfaction by streamlining check-in and follow-up workflows."
        },
        link: 'https://app.genixai.info/'
    },
    {
        title: 'NextGen UI Landing Page',
        slug: 'nextgen-ui-landing-page',
        liveUrl: 'https://nextgen-mern-stack.vercel.app/',
        year: 2025,
        description: 'A futuristic and responsive landing page crafted to highlight modern UI/UX design principles and interaction patterns.',
        techStack: ['HTML5', 'CSS3', 'Tailwind CSS', 'JavaScript', 'Responsive Design'],
        thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80',
        longThumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80',
        images: ['https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80'],
        details: {
            overview: "NextGen is a concept landing page designed to demonstrate cutting-edge UI skills with a focus on clean layouts, fluid animations, and a modern aesthetic. It serves as a showcase for interactive components, consistent theming, and responsive behavior across devices.",
            features: [
                "Hero section with layered animations and CTA",
                "Mobile-first responsive layout",
                "Smooth scroll and section-based navigation",
                "Modern typography and glassmorphism effects",
                "Animated cards, tooltips, and hover states"
            ],
            challenges: "Achieving pixel-perfect responsiveness and maintaining consistent animation performance across all devices required careful layout planning and optimization. Advanced Tailwind utilities and custom breakpoints were used to achieve fluid responsiveness.",
            outcome: "The project effectively showcases UI proficiency and has been used as a template for multiple client presentations, helping secure design-related freelance work and collaborations."
        },
        link: 'https://nextgen-mern-stack.vercel.app/'
    },
    {
        title: 'DataMate - The ADA Platform',
        slug: 'datamate-ada-platform',
        liveUrl: 'https://datamate.connectplus.org.uk/',
        year: 2025,
        description: 'A robust and user-friendly platform designed to empower your data analysis journey with advanced AI tools and seamless integrations.',
        techStack: ['AI', 'Data Analysis', 'Machine Learning', 'API Integration'],
        thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
        longThumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
        images: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80'],
        details: {
            overview: "DataMate is a powerful platform that simplifies data analysis and enables users to build custom AI-powered analysts, integrate data sources seamlessly, and automate reporting. With a no-code interface, DataMate empowers users of all technical levels to gain valuable insights from their data.",
            features: [
                "Bot Studio: Build custom AI data analysts tailored to your specific needs. No coding experience required!",
                "Analyst Assist: Get intelligent suggestions and real-time insights for data interpretation.",
                "Seamless Integration: Integrate effortlessly with spreadsheets, CRMs, databases, and third-party APIs.",
                "Conversational AI: Interact with your data using natural language, asking questions and getting instant answers.",
                "Reporting Manager: Generate professional reports in minutes with customizable templates and automated scheduling."
            ],
            challenges: "Building a seamless integration system that could handle multiple data sources in real-time while maintaining performance was a significant challenge. Data security and user access control were also crucial areas of focus.",
            outcome: "DataMate successfully streamlined data workflows and empowered businesses to make data-driven decisions faster. With real-time insights, customizable reports, and powerful AI tools, DataMate significantly improved operational efficiency for its users."
        },
        link: 'https://datamate.connectplus.org.uk/'
    },
    {
        title: 'PostCrafts Auth System',
        slug: 'postcrafts-auth-system',
        liveUrl: 'https://mern-postcrafts-kowshik.vercel.app/',
        year: 2025,
        description: 'A secure and modern authentication system built using the MERN stack with full-featured login and registration flows.',
        techStack: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Tailwind CSS', 'JWT'],
        thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&auto=format&fit=crop&q=80',
        longThumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&auto=format&fit=crop&q=80',
        images: ['https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&auto=format&fit=crop&q=80'],
        details: {
            overview: "PostCrafts provides a clean and secure authentication interface using the MERN stack. It includes fully validated login and registration forms, token-based authentication, and responsive UI styling with Tailwind CSS.",
            features: [
                "User registration with input validation",
                "Secure login with JWT-based session handling",
                "Password hashing using bcrypt",
                "Persistent sessions and protected routes",
                "Tailwind-styled responsive UI with error feedback"
            ],
            challenges: "Ensuring secure password handling and session management was a key focus. JWT was integrated with refresh token logic for scalable session control. On the frontend, managing form validation and dynamic error handling required careful UX considerations.",
            outcome: "The auth module was successfully deployed and integrated into a broader content platform, serving as the foundation for protected user experiences and admin-level access control."
        },
        link: 'https://mern-postcrafts-kowshik.vercel.app/'
    },
    // Add the rest of the projects following the same pattern
];



export const MY_EXPERIENCE = [
    {
        title: 'Full Stack Developer',
        company: 'Tap Health',
        duration: 'April 2025 - Present',
    },
    {
        title: 'Full Stack Developer',
        company: 'ZarvisGenix',
        duration: 'Sep 2024 - April 2025',
    },

];
