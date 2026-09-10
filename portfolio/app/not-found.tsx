import TransitionLink from '@/components/TransitionLink';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-[80svh] flex flex-col items-center justify-center text-center px-6">
            <p className="font-mono text-sm tracking-widest text-primary mb-4">404 — PAGE NOT FOUND</p>
            <h1 className="font-anton text-6xl sm:text-8xl tracking-tight text-white mb-6">
                Lost In Space.
            </h1>
            <p className="text-neutral-400 max-w-md mb-8 text-base">
                The page or case study you are looking for doesn&apos;t exist or has moved.
            </p>
            <TransitionLink
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white font-medium transition-all text-sm"
            >
                <ArrowLeft size={16} />
                <span>Return to Home</span>
            </TransitionLink>
        </div>
    );
}
