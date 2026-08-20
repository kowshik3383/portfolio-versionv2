import { notFound } from 'next/navigation';
import ProjectDetails from './_components/ProjectDetails';
import { PROJECTS } from '@/lib/data';
import { Metadata } from 'next';

export const generateStaticParams = async () => {
    return PROJECTS.map((project) => ({ slug: project.slug }));
};

export const generateMetadata = async ({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
    const { slug } = await params;
    const project = PROJECTS.find((project) => project.slug === slug);

    if (!project) {
        return {
            title: 'Project Not Found | Kowshik Valipireddy',
            description: 'The requested case study could not be found.',
        };
    }

    const canonicalUrl = `https://kowshik-valipireddy.pages.dev/projects/${project.slug}`;
    const ogImage = project.thumbnail || project.images?.[0] || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80';

    return {
        title: `${project.title} - ${project.techStack.slice(0, 3).join(', ')} | Case Study by Kowshik Valipireddy`,
        description: project.details?.overview || project.description,
        keywords: [
            ...project.techStack,
            project.title,
            'Kowshik Valipireddy',
            'Full Stack Portfolio',
            'Web Development Case Study',
            'Software Engineer Project',
        ],
        authors: [{ name: 'Kowshik Valipireddy', url: 'https://kowshik-valipireddy.pages.dev' }],
        creator: 'Kowshik Valipireddy',
        publisher: 'Kowshik Valipireddy',
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: `${project.title} - Case Study by Kowshik Valipireddy`,
            description: project.details?.overview || project.description,
            url: canonicalUrl,
            siteName: 'Kowshik Valipireddy Portfolio',
            locale: 'en_US',
            type: 'website',
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: `${project.title} Preview`,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${project.title} - Case Study by Kowshik Valipireddy`,
            description: project.details?.overview || project.description,
            images: [ogImage],
            creator: '@kowshik3383',
        },
    };
};

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const project = PROJECTS.find((project) => project.slug === slug);

    if (!project) {
        return notFound();
    }

    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: project.title,
        description: project.details?.overview || project.description,
        applicationCategory: 'WebApplication',
        operatingSystem: 'Any',
        url: `https://kowshik-valipireddy.pages.dev/projects/${project.slug}`,
        image: project.thumbnail || project.images?.[0],
        author: {
            '@type': 'Person',
            name: 'Kowshik Valipireddy',
            url: 'https://kowshik-valipireddy.pages.dev',
        },
        creator: {
            '@type': 'Person',
            name: 'Kowshik Valipireddy',
        },
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <ProjectDetails project={project} />
        </>
    );
};

export default Page;
