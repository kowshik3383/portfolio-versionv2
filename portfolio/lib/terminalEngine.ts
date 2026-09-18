import { PROFILE_DATA } from './profileData';

export interface TerminalOutputItem {
    type: 'command' | 'response' | 'error' | 'system';
    commandText?: string;
    content?: string;
    richData?: {
        kind: 'help' | 'apps' | 'experience' | 'skills' | 'contact' | 'sudo' | 'facts' | 'json';
        payload?: any;
    };
    action?: 'CLEAR' | 'MAIL_TRIGGER' | 'MATRIX';
}

// Levenshtein distance for fuzzy matching typos
export function getLevenshteinDistance(a: string, b: string): number {
    const matrix: number[][] = [];
    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, // substitution
                    matrix[i][j - 1] + 1,     // insertion
                    matrix[i - 1][j] + 1      // deletion
                );
            }
        }
    }
    return matrix[b.length][a.length];
}

interface CommandDefinition {
    primary: string;
    aliases: string[];
    description: string;
    handler: (_args: string[]) => TerminalOutputItem;
}

const COMMANDS: CommandDefinition[] = [
    {
        primary: 'help',
        aliases: ['?', 'commands', 'menu', 'man'],
        description: 'Display all available commands & navigation guide',
        handler: () => ({
            type: 'response',
            richData: {
                kind: 'help',
                payload: {
                    categories: [
                        {
                            name: 'CAREER & BACKGROUND',
                            commands: [
                                { cmd: 'total experience', desc: 'Breakdown of 2+ years across Tap Health & ZarvisGenix' },
                                { cmd: 'notice period', desc: 'Current availability, start date, and work authorization' },
                                { cmd: 'about', desc: 'Summary of Kowshik Valipireddy & design technologist focus' },
                            ],
                        },
                        {
                            name: 'WORK & SKILLS',
                            commands: [
                                { cmd: 'apps', desc: 'Shipped production apps (Figma plugin, AI Interviewer, etc.)' },
                                { cmd: 'stack', desc: 'Mobile, frontend, backend & cloud tools categorized' },
                                { cmd: 'facts', desc: 'Engineering invariants, 120 FPS frame budgets & fun trivia' },
                            ],
                        },
                        {
                            name: 'ACTIONS & CONTACT',
                            commands: [
                                { cmd: 'contact', desc: 'Direct email, LinkedIn, and GitHub links' },
                                { cmd: 'sudo hire-me', desc: 'Root authorization CTA with direct hiring links' },
                                { cmd: 'clear', desc: 'Clear terminal scrollback' },
                            ],
                        },
                    ],
                },
            },
        }),
    },
    {
        primary: 'total experience',
        aliases: ['experience', 'exp', 'roles', 'work-history', 'history', 'tap health', 'zarvisgenix'],
        description: 'Kowshik’s work history and verified engineering roles',
        handler: () => ({
            type: 'response',
            richData: {
                kind: 'experience',
                payload: {
                    total: PROFILE_DATA.experience.total,
                    summary: PROFILE_DATA.experience.summary,
                    roles: PROFILE_DATA.experience.roles,
                },
            },
        }),
    },
    {
        primary: 'notice period',
        aliases: ['notice', 'availability', 'available', 'status', 'start', 'hire', 'relocate', 'location'],
        description: 'Current notice period and role eligibility',
        handler: () => ({
            type: 'response',
            content: `✦ STATUS: ${PROFILE_DATA.availability.status}
✦ NOTICE PERIOD: ${PROFILE_DATA.availability.noticePeriod}
✦ OPEN TO:
${PROFILE_DATA.availability.openTo.map((item) => `  • ${item}`).join('\n')}
✦ LOCATION: ${PROFILE_DATA.location}
✦ AUTHORIZATION: ${PROFILE_DATA.availability.workAuthorization}`,
        }),
    },
    {
        primary: 'apps',
        aliases: ['projects', 'shipped', 'portfolio', 'figma', 'interviewer', 'healthtrack', 'antique'],
        description: 'List production applications with live links and tech stacks',
        handler: () => ({
            type: 'response',
            richData: {
                kind: 'apps',
                payload: PROFILE_DATA.apps,
            },
        }),
    },
    {
        primary: 'stack',
        aliases: ['skills', 'tech', 'technologies', 'tools', 'languages'],
        description: 'Categorized engineering stack (Mobile, Web, Backend, Cloud)',
        handler: () => ({
            type: 'response',
            richData: {
                kind: 'skills',
                payload: PROFILE_DATA.skills,
            },
        }),
    },
    {
        primary: 'contact',
        aliases: ['email', 'reach', 'socials', 'linkedin', 'github', 'upwork'],
        description: 'Get direct email and verified profile links',
        handler: () => ({
            type: 'response',
            richData: {
                kind: 'contact',
                payload: PROFILE_DATA.contact,
            },
        }),
    },
    {
        primary: 'about',
        aliases: ['whoami', 'bio', 'kowshik', 'valipireddy', 'info'],
        description: 'Personal bio, philosophy, and engineering focus',
        handler: () => ({
            type: 'response',
            content: `${PROFILE_DATA.name}
Role: ${PROFILE_DATA.role}
Location: ${PROFILE_DATA.location}

${PROFILE_DATA.bio}

Core Engineering Tenet:
"Every metric, framework, and conversion funnel flows from first-principles systems engineering — 120 FPS gesture physics on native threads and sub-second edge SSR."`,
        }),
    },
    {
        primary: 'sudo hire-me',
        aliases: ['hire-me', 'sudo', 'hireme', 'interview'],
        description: 'Execute root authorization to initiate interview/contract',
        handler: () => ({
            type: 'response',
            action: 'MAIL_TRIGGER',
            richData: {
                kind: 'sudo',
                payload: {
                    status: 'AUTH_SUCCESS: Root privileges granted',
                    email: PROFILE_DATA.contact.email,
                    subject: 'Exploring a potential collaboration with Kowshik Valipireddy',
                    message: 'Root clearance confirmed. Direct priority channel initiated.',
                    upwork: PROFILE_DATA.contact.upwork,
                    linkedin: PROFILE_DATA.contact.linkedin,
                },
            },
        }),
    },
    {
        primary: 'facts',
        aliases: ['fun', 'funfacts', 'trivia'],
        description: 'Engineering invariants, 120 FPS benchmarks & trivia',
        handler: () => ({
            type: 'response',
            richData: {
                kind: 'facts',
                payload: PROFILE_DATA.funFacts,
            },
        }),
    },
    {
        primary: 'clear',
        aliases: ['cls', 'reset'],
        description: 'Clear terminal display',
        handler: () => ({
            type: 'response',
            action: 'CLEAR',
        }),
    },
    {
        primary: 'matrix',
        aliases: ['neo'],
        description: 'Enter the Matrix (easter egg)',
        handler: () => ({
            type: 'response',
            action: 'MATRIX',
            content: 'Wake up, Neo... The Matrix has you. Follow the white rabbit. 🐇\n[Matrix telemetry stream engaged for 3 seconds...]',
        }),
    },
    {
        primary: 'ls',
        aliases: ['dir'],
        description: 'List working directory contents',
        handler: () => ({
            type: 'response',
            content: `total 42
-rw-r--r--  1 kowshik  staff   2.4K profile.json
-rw-r--r--  1 kowshik  staff   1.8K figma-to-code-plugin.tsx
-rw-r--r--  1 kowshik  staff   1.2K ai-interviewer-webrtc.ts
-rw-r--r--  1 kowshik  staff   3.1K tap-health-glucose.tsx
-rwxr-xr-x  1 kowshik  staff    512 sudo-hire-me*
drwxr-xr-x  8 kowshik  staff    256 apps/`,
        }),
    },
    {
        primary: 'cat profile.json',
        aliases: ['cat', 'profile.json', 'dump'],
        description: 'View raw profile.json source of truth',
        handler: () => ({
            type: 'response',
            richData: {
                kind: 'json',
                payload: PROFILE_DATA,
            },
        }),
    },
    {
        primary: 'date',
        aliases: ['time'],
        description: 'Display current system time',
        handler: () => ({
            type: 'response',
            content: new Date().toUTCString() + ' (Synchronized via Edge NTP)',
        }),
    },
];

// Find closest command using alias matching, keyword searching, and Levenshtein distance
export function processCommand(rawInput: string): TerminalOutputItem {
    const input = rawInput.trim();
    if (!input) {
        return { type: 'response', content: '' };
    }

    const lowerInput = input.toLowerCase();

    // 1. Handle special direct commands
    if (lowerInput.startsWith('echo ')) {
        return { type: 'response', content: input.substring(5) };
    }

    // 2. Exact match on primary or aliases
    for (const def of COMMANDS) {
        if (def.primary === lowerInput || def.aliases.includes(lowerInput)) {
            return def.handler([]);
        }
    }

    // 3. Keyword heuristic check
    // e.g., "when can you start" -> notice period
    if (
        lowerInput.includes('start') ||
        lowerInput.includes('notice') ||
        lowerInput.includes('available') ||
        lowerInput.includes('joining') ||
        lowerInput.includes('relocate')
    ) {
        const noticeDef = COMMANDS.find((c) => c.primary === 'notice period');
        if (noticeDef) return noticeDef.handler([]);
    }

    // "how much experience" -> total experience
    if (
        lowerInput.includes('experience') ||
        lowerInput.includes('years') ||
        lowerInput.includes('role') ||
        lowerInput.includes('company') ||
        lowerInput.includes('work')
    ) {
        const expDef = COMMANDS.find((c) => c.primary === 'total experience');
        if (expDef) return expDef.handler([]);
    }

    // "what apps did you build" -> apps
    if (
        lowerInput.includes('project') ||
        lowerInput.includes('app') ||
        lowerInput.includes('built') ||
        lowerInput.includes('product')
    ) {
        const appsDef = COMMANDS.find((c) => c.primary === 'apps');
        if (appsDef) return appsDef.handler([]);
    }

    // "what technologies do you know" -> stack
    if (
        lowerInput.includes('stack') ||
        lowerInput.includes('skill') ||
        lowerInput.includes('tech') ||
        lowerInput.includes('framework')
    ) {
        const stackDef = COMMANDS.find((c) => c.primary === 'stack');
        if (stackDef) return stackDef.handler([]);
    }

    // "how to contact" -> contact
    if (
        lowerInput.includes('contact') ||
        lowerInput.includes('email') ||
        lowerInput.includes('linkedin') ||
        lowerInput.includes('phone')
    ) {
        const contactDef = COMMANDS.find((c) => c.primary === 'contact');
        if (contactDef) return contactDef.handler([]);
    }

    // 4. Fuzzy Levenshtein matching on all primaries and aliases
    let bestMatch: { cmd: CommandDefinition; distance: number; term: string } | null = null;
    const candidates = COMMANDS.flatMap((c) => [
        { cmd: c, term: c.primary },
        ...c.aliases.map((a) => ({ cmd: c, term: a })),
    ]);

    for (const candidate of candidates) {
        const dist = getLevenshteinDistance(lowerInput, candidate.term);
        // Only consider if distance is small relative to word length
        const maxAllowed = Math.max(2, Math.floor(candidate.term.length * 0.35));
        if (dist <= maxAllowed) {
            if (!bestMatch || dist < bestMatch.distance) {
                bestMatch = { cmd: candidate.cmd, distance: dist, term: candidate.term };
            }
        }
    }

    if (bestMatch) {
        const result = bestMatch.cmd.handler([]);
        // Prepend friendly fuzzy note if not identical
        if (bestMatch.term !== lowerInput) {
            if (result.content) {
                result.content = `[Interpreted "${input}" as "${bestMatch.cmd.primary}"]\n\n` + result.content;
            }
        }
        return result;
    }

    // 5. Fallback for unrecognized command
    return {
        type: 'error',
        content: `zsh: command not found: "${input}"
Type "help" for available commands, or try:
  • apps
  • total experience
  • notice period
  • stack
  • contact
  • sudo hire-me`,
    };
}

export const SUGGESTED_COMMANDS = [
    'help',
    'apps',
    'total experience',
    'notice period',
    'stack',
    'contact',
    'sudo hire-me',
];
