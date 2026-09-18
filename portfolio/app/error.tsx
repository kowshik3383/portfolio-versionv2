'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { captureException } from '@/lib/logrocket';

export default function GlobalErrorPage({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Report unhandled client exception to LogRocket
        captureException(error, {
            digest: error.digest,
            route: typeof window !== 'undefined' ? window.location.pathname : undefined,
        });
    }, [error]);

    return (
        <div className="min-h-screen bg-[#FAF8F5] text-[#191715] flex flex-col items-center justify-center p-6 text-center font-mono">
            <div className="max-w-md p-8 rounded-2xl bg-white border border-[#E8E3DA] shadow-xl space-y-4">
                <div className="size-12 mx-auto rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xl font-bold">
                    !
                </div>
                <h2 className="text-xl font-bold text-neutral-900">Something went wrong</h2>
                <p className="text-xs text-neutral-500 leading-relaxed">
                    An unexpected runtime fault occurred. This error has been logged to LogRocket for investigation.
                </p>
                <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                        type="button"
                        onClick={() => reset()}
                        className="px-4 py-2 rounded-xl bg-[#0E7490] hover:bg-[#0c627a] text-white text-xs font-semibold transition-colors"
                    >
                        Try Again
                    </button>
                    <Link
                        href="/"
                        className="px-4 py-2 rounded-xl bg-[#FAF8F5] hover:bg-[#eae5dc] text-neutral-800 text-xs font-semibold transition-colors border border-[#E8E3DA]"
                    >
                        Return Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
