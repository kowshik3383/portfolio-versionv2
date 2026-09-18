'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
    Terminal as TerminalIcon,
    RotateCcw,
    ExternalLink,
    Mail,
    ShieldCheck,
    Sparkles,
    Github,
    Linkedin,
    Briefcase,
} from 'lucide-react';
import {
    processCommand,
    TerminalOutputItem,
    SUGGESTED_COMMANDS,
} from '@/lib/terminalEngine';
import { PROFILE_DATA } from '@/lib/profileData';
import { trackEvent } from '@/lib/logrocket';

interface HistoryEntry {
    id: string;
    command?: string;
    output: TerminalOutputItem;
}

const BOOT_BANNER: TerminalOutputItem = {
    type: 'system',
    content: `kowshik@portfolio · zsh (v2.5.0)
Type a command or question about Kowshik Valipireddy to get an instant, data-backed answer.
Typos and informal questions ("when can he start", "what stack") are fully supported.`,
};

export default function KowshikTerminal() {
    const [history, setHistory] = useState<HistoryEntry[]>([
        {
            id: 'boot',
            output: BOOT_BANNER,
        },
    ]);
    const [inputVal, setInputVal] = useState('');
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyPointer, setHistoryPointer] = useState<number>(-1);
    const [isMatrixActive, setIsMatrixActive] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom on output change
    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
    }, [history, isMatrixActive, inputVal]);

    const execute = (cmdText: string) => {
        const trimmed = cmdText.trim();
        if (!trimmed) return;

        // Process command via deterministic engine
        const result = processCommand(trimmed);
        trackEvent('CLI Command Executed', { command: trimmed });

        if (result.action === 'CLEAR') {
            setHistory([]);
            setInputVal('');
            setHistoryPointer(-1);
            return;
        }

        if (result.action === 'MATRIX') {
            setIsMatrixActive(true);
            setTimeout(() => setIsMatrixActive(false), 3500);
        }

        if (result.action === 'MAIL_TRIGGER') {
            trackEvent('Sudo Hire-Me Triggered', { source: 'CLI' });
            // Trigger prefilled email client
            const mailUrl = `mailto:${PROFILE_DATA.contact.email}?subject=${encodeURIComponent(
                'Exploring a potential collaboration with Kowshik Valipireddy'
            )}&body=${encodeURIComponent(
                "Hi Kowshik,\n\nI was reviewing your portfolio CLI and would love to discuss an opportunity.\n\nBest regards,"
            )}`;
            if (typeof window !== 'undefined') {
                window.location.href = mailUrl;
            }
        }

        setHistory((prev) => [
            ...prev,
            {
                id: `${Date.now()}-${Math.random()}`,
                command: trimmed,
                output: result,
            },
        ]);

        // Save to command history for up/down arrow cycling
        setCommandHistory((prev) => [...prev, trimmed]);
        setHistoryPointer(-1);
        setInputVal('');
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        execute(inputVal);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length === 0) return;
            const nextPointer =
                historyPointer === -1
                    ? commandHistory.length - 1
                    : Math.max(0, historyPointer - 1);
            setHistoryPointer(nextPointer);
            setInputVal(commandHistory[nextPointer] || '');
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyPointer === -1) return;
            const nextPointer = historyPointer + 1;
            if (nextPointer >= commandHistory.length) {
                setHistoryPointer(-1);
                setInputVal('');
            } else {
                setHistoryPointer(nextPointer);
                setInputVal(commandHistory[nextPointer] || '');
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            const curr = inputVal.toLowerCase().trim();
            if (!curr) return;
            const match = SUGGESTED_COMMANDS.find((cmd) => cmd.startsWith(curr));
            if (match) {
                setInputVal(match);
            }
        }
    };

    const handleFocusContainer = () => {
        inputRef.current?.focus();
    };

    return (
        <div
            id="kowshik-cli"
            className="w-full rounded-2xl overflow-hidden bg-[#12131A] border border-[#252839] shadow-2xl shadow-neutral-950/30 text-[#CAD3F5] font-mono flex flex-col h-[520px] sm:h-[500px] transition-all relative"
            onClick={handleFocusContainer}
        >
            {/* 1. Terminal Window Chrome Header */}
            <div className="bg-[#181926] px-4 py-2.5 border-b border-[#252839] flex flex-wrap items-center justify-between gap-2 select-none shrink-0">
                {/* Traffic light dots + Prompt ID */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                        <span className="size-2.5 rounded-full bg-[#FF5F56] inline-block shadow-sm" />
                        <span className="size-2.5 rounded-full bg-[#FFBD2E] inline-block shadow-sm" />
                        <span className="size-2.5 rounded-full bg-[#27C93F] inline-block shadow-sm" />
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#8AADF4] font-medium">
                        <TerminalIcon size={12} className="text-[#0E7490]" />
                        <span>kowshik@portfolio: ~/engine (zsh)</span>
                        <span className="hidden sm:inline-block px-1.5 py-0.2 rounded bg-[#24273A] text-[10px] text-neutral-400">
                            v2.5.0
                        </span>
                    </div>
                </div>

                {/* Right utility info */}
                <div className="flex items-center gap-2 text-[10.5px] text-neutral-400">
                    <span className="hidden md:flex items-center gap-1">
                        <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Live Profile v2
                    </span>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            setHistory([]);
                        }}
                        title="Clear terminal"
                        className="px-2 py-0.5 rounded bg-[#24273A] hover:bg-[#2e3249] text-neutral-300 hover:text-white transition-all inline-flex items-center gap-1 text-[10px]"
                    >
                        <RotateCcw size={10} />
                        <span>clear</span>
                    </button>
                </div>
            </div>

            {/* 2. Quick Command Shortcut Chips Bar */}
            <div className="bg-[#151622] px-3.5 py-1.5 border-b border-[#252839]/70 flex items-center gap-1.5 overflow-x-auto no-scrollbar select-none shrink-0">
                <span className="text-[10px] text-neutral-500 uppercase tracking-widest mr-1 shrink-0 font-sans">
                    Try:
                </span>
                {SUGGESTED_COMMANDS.map((cmd) => (
                    <button
                        key={cmd}
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            execute(cmd);
                        }}
                        className={`px-2 py-0.5 rounded-md text-[10.5px] font-mono transition-all shrink-0 border ${
                            cmd === 'sudo hire-me'
                                ? 'bg-[#0E7490]/20 hover:bg-[#0E7490]/35 text-[#38BDF8] border-[#0E7490]/40 font-semibold'
                                : 'bg-[#202231] hover:bg-[#282b3d] text-neutral-300 hover:text-white border-[#2c3046]'
                        }`}
                    >
                        {cmd}
                    </button>
                ))}
            </div>

            {/* 3. Unified Terminal Stream (All outputs and active prompt inline) */}
            <div
                ref={scrollContainerRef}
                className="flex-1 overflow-y-auto p-4 space-y-3 text-[12px] leading-relaxed select-text cursor-text"
                onClick={handleFocusContainer}
            >
                {/* Matrix Easter Egg Overlay */}
                {isMatrixActive && (
                    <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-400 font-mono text-[11px] animate-pulse space-y-1">
                        <div>[SYSTEM DIAGNOSTIC STREAM INITIALIZED]</div>
                        <div>01001011 01001111 01010111 01010011 01001000 01001001 01001011</div>
                        <div>&gt; TurboModules connected · JSI thread 120 FPS · Zero hydration delta</div>
                        <div>&gt; Welcome to the real world, Engineer.</div>
                    </div>
                )}

                {/* History Output Stream */}
                {history.map((item) => (
                    <div key={item.id} className="space-y-1.5">
                        {/* Render command line if this was user input */}
                        {item.command && (
                            <div className="flex items-center gap-2 text-[#A6DA95] font-semibold">
                                <span className="text-[#8AADF4] font-normal select-none">
                                    kowshik@portfolio ~ %
                                </span>
                                <span className="text-white">{item.command}</span>
                            </div>
                        )}

                        {/* Render output content */}
                        {renderOutput(item.output)}
                    </div>
                ))}

                {/* 4. Active Inline Terminal Prompt Line (No detached bottom input bar) */}
                <form
                    onSubmit={handleFormSubmit}
                    className="flex items-start sm:items-center gap-2 pt-1 relative"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleFocusContainer();
                    }}
                >
                    <span className="text-[#8AADF4] text-xs font-semibold select-none shrink-0 leading-normal">
                        kowshik@portfolio ~ %
                    </span>
                    <div className="relative flex-1 flex items-center min-w-0">
                        {/* Visual Typed Text + Blinking Block Cursor */}
                        <div className="flex items-center flex-wrap font-mono text-xs text-white tracking-wide whitespace-pre pointer-events-none z-10 leading-normal">
                            <span>{inputVal}</span>
                            <span className="inline-block w-2 h-4 bg-[#8AADF4] ml-0.5 animate-pulse shadow-xs shadow-[#8AADF4]/50" />
                            {!inputVal && (
                                <span className="text-neutral-500 text-[11px] ml-2 select-none pointer-events-none hidden sm:inline">
                                    type a command (e.g. apps, total experience, notice period, sudo hire-me)...
                                </span>
                            )}
                        </div>

                        {/* Real input positioned over the prompt line */}
                        <input
                            ref={inputRef}
                            type="text"
                            value={inputVal}
                            onChange={(e) => setInputVal(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-text z-20 text-xs"
                            spellCheck={false}
                            autoComplete="off"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

// Sub-renderers for Rich Structured Outputs
function renderOutput(item: TerminalOutputItem) {
    if (item.type === 'error') {
        return (
            <div className="p-2.5 rounded-lg bg-red-950/20 border border-red-900/30 text-red-300 text-[11.5px] whitespace-pre-wrap">
                {item.content}
            </div>
        );
    }

    if (item.type === 'system') {
        return (
            <div className="p-3 rounded-xl bg-[#181926]/70 border border-[#252839] text-[#939AB7] text-[11.5px] whitespace-pre-wrap leading-relaxed">
                {item.content}
            </div>
        );
    }

    if (item.richData) {
        const { kind, payload } = item.richData;

        // Rich Help Menu
        if (kind === 'help') {
            return (
                <div className="space-y-2.5 pt-1">
                    <div className="text-[#8AADF4] font-semibold text-xs">
                        KOWSHIK VALIPIREDDY CLI · DIRECTORY OF COMMANDS
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-[11px]">
                        {payload.categories.map((cat: any) => (
                            <div
                                key={cat.name}
                                className="p-2.5 rounded-lg bg-[#181926] border border-[#252839] space-y-1.5"
                            >
                                <div className="text-[#F5A97F] font-semibold text-[10px] tracking-wider uppercase">
                                    {cat.name}
                                </div>
                                <div className="space-y-1">
                                    {cat.commands.map((c: any) => (
                                        <div key={c.cmd} className="space-y-0.5">
                                            <span className="text-[#A6DA95] font-semibold">
                                                {c.cmd}
                                            </span>
                                            <p className="text-neutral-400 text-[10px] leading-tight">
                                                {c.desc}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-[10px] text-neutral-400 italic">
                        Tip: You can also ask natural questions like &quot;when can he join&quot;, &quot;what is your stack&quot;, or click the chips above.
                    </div>
                </div>
            );
        }

        // Rich Apps List
        if (kind === 'apps') {
            return (
                <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between text-xs text-[#8AADF4] font-semibold">
                        <span>PRODUCTION APPLICATIONS SHIPPED BY KOWSHIK</span>
                        <span className="text-[10.5px] text-neutral-400 font-normal">
                            {payload.length} verified products
                        </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {payload.map((app: any) => (
                            <div
                                key={app.name}
                                className="p-2.5 rounded-lg bg-[#181926] border border-[#252839] hover:border-[#8AADF4]/40 transition-all space-y-1.5 text-xs flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between gap-1">
                                        <span className="font-semibold text-white truncate text-[11.5px]">
                                            {app.name}
                                        </span>
                                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#24273A] text-[#8AADF4] shrink-0">
                                            {app.tag}
                                        </span>
                                    </div>
                                    <p className="text-[10.5px] text-neutral-300 leading-snug mt-1">
                                        {app.oneLiner}
                                    </p>
                                    <div className="text-[10px] text-neutral-400 font-mono mt-1 truncate">
                                        Stack: {app.stack}
                                    </div>
                                </div>
                                <div className="pt-1.5 border-t border-[#252839]/60 flex items-center justify-end">
                                    <a
                                        href={app.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-[10.5px] text-[#8AADF4] hover:text-[#B7BDF8] font-semibold transition-colors"
                                    >
                                        <span>Open Live Product</span>
                                        <ExternalLink size={10} />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        // Rich Experience Breakdown
        if (kind === 'experience') {
            return (
                <div className="space-y-2 pt-1">
                    <div className="p-2.5 rounded-lg bg-[#181926] border border-[#252839] space-y-1 text-xs">
                        <div className="text-[#F5A97F] font-semibold text-[11px] uppercase tracking-wider">
                            VERIFIED EXPERIENCE: {payload.total}
                        </div>
                        <p className="text-neutral-300 text-[11px] leading-relaxed">
                            {payload.summary}
                        </p>
                    </div>
                    <div className="space-y-2">
                        {payload.roles.map((role: any) => (
                            <div
                                key={role.company}
                                className="p-3 rounded-lg bg-[#181926] border border-[#252839] space-y-1.5 text-xs"
                            >
                                <div className="flex flex-wrap items-center justify-between gap-1">
                                    <div className="flex items-center gap-1.5">
                                        <Briefcase size={12} className="text-[#8AADF4]" />
                                        <span className="font-semibold text-white">
                                            {role.title}
                                        </span>
                                        <span className="text-neutral-500">@</span>
                                        <span className="text-[#A6DA95] font-semibold">
                                            {role.company}
                                        </span>
                                    </div>
                                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#24273A] text-neutral-300 font-mono">
                                        {role.period}
                                    </span>
                                </div>
                                <ul className="space-y-1 pt-1 text-[11px] text-neutral-300">
                                    {role.highlights.map((highlight: string, idx: number) => (
                                        <li key={idx} className="flex items-start gap-1.5">
                                            <span className="text-[#8AADF4] shrink-0 leading-none mt-1">
                                                ›
                                            </span>
                                            <span>{highlight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        // Rich Skills Breakdown
        if (kind === 'skills') {
            return (
                <div className="space-y-2 pt-1">
                    <div className="text-xs text-[#8AADF4] font-semibold">
                        ENGINEERING STACK &amp; SPECIALIZATIONS
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div className="p-2.5 rounded-lg bg-[#181926] border border-[#252839] space-y-1.5">
                            <div className="text-[#A6DA95] font-semibold text-[10.5px] uppercase tracking-wider">
                                Mobile App Systems
                            </div>
                            <div className="flex flex-wrap gap-1">
                                {payload.mobile.map((item: string) => (
                                    <span
                                        key={item}
                                        className="px-2 py-0.5 rounded bg-[#24273A] text-neutral-200 text-[10.5px]"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="p-2.5 rounded-lg bg-[#181926] border border-[#252839] space-y-1.5">
                            <div className="text-[#8AADF4] font-semibold text-[10.5px] uppercase tracking-wider">
                                Frontend &amp; Web Systems
                            </div>
                            <div className="flex flex-wrap gap-1">
                                {payload.frontend.map((item: string) => (
                                    <span
                                        key={item}
                                        className="px-2 py-0.5 rounded bg-[#24273A] text-neutral-200 text-[10.5px]"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="p-2.5 rounded-lg bg-[#181926] border border-[#252839] space-y-1.5">
                            <div className="text-[#F5A97F] font-semibold text-[10.5px] uppercase tracking-wider">
                                Backend &amp; Persistence
                            </div>
                            <div className="flex flex-wrap gap-1">
                                {payload.backend.map((item: string) => (
                                    <span
                                        key={item}
                                        className="px-2 py-0.5 rounded bg-[#24273A] text-neutral-200 text-[10.5px]"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="p-2.5 rounded-lg bg-[#181926] border border-[#252839] space-y-1.5">
                            <div className="text-[#C6A0F6] font-semibold text-[10.5px] uppercase tracking-wider">
                                Cloud, DevTools &amp; APIs
                            </div>
                            <div className="flex flex-wrap gap-1">
                                {payload.cloud_tools.map((item: string) => (
                                    <span
                                        key={item}
                                        className="px-2 py-0.5 rounded bg-[#24273A] text-neutral-200 text-[10.5px]"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        // Rich Contact
        if (kind === 'contact') {
            return (
                <div className="p-3 rounded-lg bg-[#181926] border border-[#252839] space-y-2.5 text-xs">
                    <div className="text-[#8AADF4] font-semibold text-[11px] uppercase tracking-wider">
                        DIRECT CONTACT CHANNELS
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <a
                            href={`mailto:${payload.email}`}
                            className="p-2 rounded bg-[#24273A] hover:bg-[#2e3249] transition-all flex items-center gap-2 text-neutral-200 hover:text-white"
                        >
                            <Mail size={13} className="text-[#8AADF4]" />
                            <span className="truncate text-[11px]">{payload.email}</span>
                        </a>
                        <a
                            href={payload.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded bg-[#24273A] hover:bg-[#2e3249] transition-all flex items-center gap-2 text-neutral-200 hover:text-white"
                        >
                            <Linkedin size={13} className="text-[#0A66C2]" />
                            <span className="truncate text-[11px]">LinkedIn Profile</span>
                        </a>
                        <a
                            href={payload.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded bg-[#24273A] hover:bg-[#2e3249] transition-all flex items-center gap-2 text-neutral-200 hover:text-white"
                        >
                            <Github size={13} className="text-white" />
                            <span className="truncate text-[11px]">GitHub Profile</span>
                        </a>
                    </div>
                </div>
            );
        }

        // Rich sudo hire-me Easter Egg
        if (kind === 'sudo') {
            return (
                <div className="p-3.5 rounded-xl bg-[#0E7490]/15 border border-[#0E7490]/40 space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-[#38BDF8] font-bold tracking-wide">
                        <ShieldCheck size={16} />
                        <span>{payload.status}</span>
                    </div>
                    <p className="text-neutral-200 text-[11.5px] leading-relaxed">
                        {payload.message} A priority communication session has been opened.
                    </p>
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                        <a
                            href={`mailto:${payload.email}?subject=${encodeURIComponent(
                                payload.subject
                            )}`}
                            className="px-3 py-1.5 rounded-lg bg-[#0E7490] hover:bg-[#0c627a] text-white font-semibold text-[11px] transition-all inline-flex items-center gap-1.5 shadow-sm"
                        >
                            <Mail size={12} />
                            <span>Email Kowshik Directly</span>
                        </a>
                        <a
                            href={payload.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-lg bg-[#24273A] hover:bg-[#2e3249] text-neutral-200 text-[11px] transition-all inline-flex items-center gap-1.5"
                        >
                            <Linkedin size={12} />
                            <span>Connect on LinkedIn</span>
                        </a>
                    </div>
                </div>
            );
        }

        // Facts
        if (kind === 'facts') {
            return (
                <div className="p-3 rounded-lg bg-[#181926] border border-[#252839] space-y-1.5 text-xs">
                    <div className="text-[#F5A97F] font-semibold text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles size={12} />
                        <span>Engineering Invariants &amp; Trivia</span>
                    </div>
                    <ul className="space-y-1 text-[11.5px] text-neutral-300">
                        {payload.map((fact: string, i: number) => (
                            <li key={i} className="flex items-start gap-2">
                                <span className="text-[#8AADF4] font-mono">[{i + 1}]</span>
                                <span>{fact}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }

        // Raw JSON
        if (kind === 'json') {
            return (
                <pre className="p-3 rounded-lg bg-[#181926] border border-[#252839] text-[10.5px] text-emerald-400 overflow-x-auto">
                    {JSON.stringify(payload, null, 2)}
                </pre>
            );
        }
    }

    // Default plain text response
    return (
        <div className="text-[11.5px] text-[#CAD3F5] whitespace-pre-wrap leading-relaxed">
            {item.content}
        </div>
    );
}
