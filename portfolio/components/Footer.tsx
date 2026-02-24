'use client';

import { GENERAL_INFO } from '@/lib/data';

const Footer = () => {
    const handleEmailClick = () => {
        const subject = encodeURIComponent(GENERAL_INFO.emailSubject);
        const body = encodeURIComponent(GENERAL_INFO.emailBody);

        const mailto = `mailto:${GENERAL_INFO.email}?subject=${subject}&body=${body}`;

        // Try native mail app
        window.location.href = mailto;

        // Gmail fallback (Android / Chrome)
        setTimeout(() => {
            window.open(
                `https://mail.google.com/mail/?view=cm&fs=1&to=${GENERAL_INFO.email}&su=${subject}&body=${body}`,
                '_blank'
            );
        }, 300);
    };

    return (
        <footer
            id="contact"
            className="relative overflow-hidden border-t border-gray-800/50 "
        >
            <div className="container mx-auto px-4 py-16 sm:py-20">
                <div className="mx-auto max-w-4xl space-y-8 text-center">
                    {/* Heading */}
                    <div className="space-y-3">
                        <p className="text-base font-medium uppercase tracking-wide text-gray-400 sm:text-lg">
                            Have a project in mind?
                        </p>
                        <h2 className="text-xl text-gray-300 sm:text-2xl">
                            Let&apos;s work together
                        </h2>
                    </div>

                    {/* Email CTA */}
                    <button
                        onClick={handleEmailClick}
                        className="group relative inline-block focus:outline-none"
                        aria-label="Send email"
                    >
                        <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text font-anton text-3xl text-transparent transition-transform duration-300 group-hover:scale-105 sm:text-5xl md:text-6xl">
                            {GENERAL_INFO.email}
                        </span>
                        <span className="mt-2 block h-0.5 origin-left scale-x-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 transition-transform duration-300 group-hover:scale-x-100" />
                    </button>

                    {/* Divider */}
                    <div className="pt-8">
                        <div className="mx-auto h-px w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
                    </div>

                    {/* Footer Bottom */}
                    <div className="space-y-4 pt-8">
                        <div
                            onClick={handleEmailClick}
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 text-sm text-gray-500 transition-colors duration-200 hover:text-gray-300"
                        >
                            <span className="relative">
                                Design &amp; built by Kowshik Valipireddy
                                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-gray-300 transition-transform duration-200 group-hover:scale-x-100" />
                            </span>
                        </div>

                        <p className="text-xs text-gray-600">
                            © {new Date().getFullYear()} All rights reserved
                        </p>
                    </div>
                </div>
            </div>

            {/* Decorative blobs */}
        </footer>
    );
};

export default Footer;
