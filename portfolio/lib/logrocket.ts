import LogRocket from 'logrocket';

export function trackEvent(name: string, properties?: Record<string, any>) {
    if (typeof window !== 'undefined') {
        try {
            LogRocket.track(name, properties);
        } catch {
            // Silently ignore if LogRocket is not yet initialized or blocked
        }
    }
}

export function identifyUser(userId: string, traits?: Record<string, any>) {
    if (typeof window !== 'undefined') {
        try {
            LogRocket.identify(userId, traits);
        } catch {
            // Silently ignore
        }
    }
}

export function captureException(error: Error | unknown, extra?: Record<string, any>) {
    if (typeof window !== 'undefined') {
        try {
            if (error instanceof Error) {
                LogRocket.captureException(error, extra ? { extra } : undefined);
            } else {
                LogRocket.captureMessage(String(error), extra ? { extra } : undefined);
            }
        } catch {
            // Silently ignore
        }
    }
}

export default LogRocket;
