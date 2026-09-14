"use client"
import { GENERAL_INFO } from '@/lib/data';
import React from 'react';

const StickyEmail = () => {
    const handleEmailClick = () => {
        const mailto = `mailto:${GENERAL_INFO.email}?subject=${encodeURIComponent(
            GENERAL_INFO.emailSubject
        )}&body=${encodeURIComponent(GENERAL_INFO.emailBody)}`;

        // Try native mail app
        window.location.href = mailto;

        // Fallback for Android / Chrome
        setTimeout(() => {
            window.open(
                `https://mail.google.com/mail/?view=cm&fs=1&to=${GENERAL_INFO.email}&su=${encodeURIComponent(
                    GENERAL_INFO.emailSubject
                )}&body=${encodeURIComponent(GENERAL_INFO.emailBody)}`,
                '_blank'
            );
        }, 300);
    };
    return (
        <div className="max-xl:hidden fixed bottom-32 left-0 block print:hidden">
            <div
                onClick={handleEmailClick}
                className="px-3 text-neutral-500 font-mono text-xs tracking-[1.5px] cursor-pointer transition-colors hover:text-neutral-900"
                style={{
                    textOrientation: 'mixed',
                    writingMode: 'vertical-rl',
                }}
            >
                {GENERAL_INFO.email}
            </div>
        </div>
    );
};

export default StickyEmail;
