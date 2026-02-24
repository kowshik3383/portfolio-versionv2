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
        <div className="max-xl:hidden fixed bottom-32 left-0 block">
            <div
                onClick={handleEmailClick}
                className="px-3 text-muted-foreground tracking-[1px] transition-all !bg-bottom hover:text-foreground hover:!bg-center"
                style={{
                    // background:
                    //     'linear-gradient(to bottom, hsl(var(--muted-foreground)) 0% 33.33%, hsl(var(--primary)) 33.33% 66.66%, hsl(var(--muted-foreground)) 66.66% 100%)',
                    // backgroundSize: '100% 300%',

                    // backgroundClip: 'text',
                    // color: 'transparent',

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
