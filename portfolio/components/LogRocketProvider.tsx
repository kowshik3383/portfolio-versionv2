'use client';

import { useEffect, useRef } from 'react';
import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';

export const LOGROCKET_APP_ID = 'j3t6u7/portfolio';

export default function LogRocketProvider() {
    const initializedRef = useRef(false);

    useEffect(() => {
        if (!initializedRef.current && typeof window !== 'undefined') {
            initializedRef.current = true;

            try {
                LogRocket.init(LOGROCKET_APP_ID, {
                    release: 'portfolio-v2.5.0',
                    console: {
                        shouldAggregateConsoleErrors: true,
                    },
                    network: {
                        requestSanitizer: (request) => {
                            return request;
                        },
                        responseSanitizer: (response) => {
                            return response;
                        },
                    },
                });

                // Set up React component click & performance tracking plugin
                (setupLogRocketReact as any)(LogRocket);
            } catch (err) {
                console.warn('[LogRocket] Failed to initialize:', err);
            }
        }
    }, []);

    return null;
}
