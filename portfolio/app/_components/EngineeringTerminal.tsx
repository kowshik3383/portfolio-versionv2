'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
    Terminal,
    CheckCircle2,
    RotateCcw,
    Zap,
    Smartphone,
    Database,
    Layers,
    ShieldCheck,
    Play,
    Cpu,
    GitBranch,
    ChevronRight,
    CornerDownLeft,
    MapPin,
    User,
} from 'lucide-react';

type TerminalTab = 'audit' | 'profile' | 'benchmarks' | 'principles' | 'stack';

interface AuditStep {
    id: string;
    text: string;
    detail: string;
    status: 'pending' | 'running' | 'done';
}

const SCIENTIFIC_PRINCIPLES = [
    {
        id: 'p1',
        num: '01',
        title: 'Native Threading & 120 FPS Frame Budget',
        tag: 'Mobile Architecture',
        icon: Smartphone,
        tool: 'NativeBridge::measureFrameBudget()',
        toolResult: '120.0 FPS · 7.2ms render (<8.33ms budget) · 0 dropped frames',
        summary:
            'UI gestures and physics execute strictly on the native render thread via JSI C++ TurboModules and Reanimated 3 worklets, isolating UI responsiveness from heavy JS worker threads.',
        metric: '<8.33ms frame budget · Hermes AOT bytecode',
    },
    {
        id: 'p2',
        num: '02',
        title: 'Sub-Second Core Web Vitals & RSC Streaming',
        tag: 'Web Performance',
        icon: Zap,
        tool: 'Lighthouse::auditVitals()',
        toolResult: 'LCP 640ms · CLS 0.000 · INP 18ms · 100/100 Perf',
        summary:
            'Next.js 15 App Router streaming SSR delivers zero-bundle static component trees with instant edge hydration, rendering interactive DOM before client bundles finish parsing.',
        metric: 'p75 LCP < 750ms · Zero CLS · Edge Cached',
    },
    {
        id: 'p3',
        num: '03',
        title: 'Deterministic FSMs & Optimistic Rollbacks',
        tag: 'State Invariants',
        icon: ShieldCheck,
        tool: 'StateEngine::testRollback()',
        toolResult: 'Invariant preserved · Transactional revert in 4ms',
        summary:
            'Network failure is treated as an expected runtime state. UI mutations dispatch optimistically with idempotency keys, reverting deterministically without layout shift on network fault.',
        metric: 'Idempotency keys · Transactional rollback · Offline-first Zustand',
        diff: [
            { type: 'ctx', text: 'async function dispatchMutation(action) {' },
            { type: 'del', text: '  const res = await api.post(action); // Vulnerable to dropped packets' },
            { type: 'add', text: '  const snapshot = store.captureInvariant();' },
            { type: 'add', text: '  store.applyOptimistic(action);' },
            { type: 'add', text: '  try { await serverAction(action, { idempotencyKey }); }' },
            { type: 'add', text: '  catch { store.rollback(snapshot); showToast("Reverted"); }' },
            { type: 'ctx', text: '}' },
        ],
    },
    {
        id: 'p4',
        num: '04',
        title: 'Distributed Latency & PostgreSQL Profiling',
        tag: 'Data Persistence',
        icon: Database,
        tool: 'PostgresPool::explainAnalyze()',
        toolResult: 'Index Scan using idx_users_btree · Exec: 4.2ms · p95: 18.4ms',
        summary:
            'Queries are tuned with EXPLAIN (ANALYZE, BUFFERS) to eliminate sequential table scans. High-cardinality filters run over composite B-Tree indexes behind PgBouncer pooling.',
        metric: 'p95 query latency < 25ms · PgBouncer pool sizing',
    },
    {
        id: 'p5',
        num: '05',
        title: 'End-to-End Type Safety & Cross-Platform Parity',
        tag: 'Type Contracts',
        icon: Layers,
        tool: 'ContractValidator::verifySchemas()',
        toolResult: '42 shared Zod schemas · 0 type drifts · 100% strictNullChecks',
        summary:
            'Monorepo architecture binds Next.js server actions and React Native mobile clients to shared runtime Zod validators, eliminating drift between API responses and client models.',
        metric: 'Zod contract schemas · Strict TypeScript · Monorepo parity',
    },
];

export default function EngineeringTerminal() {
    const [activeTab, setActiveTab] = useState<TerminalTab>('audit');
    const [selectedPrinciple, setSelectedPrinciple] = useState<string>('p1');
    const [commandInput, setCommandInput] = useState<string>('');
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [isAuditing, setIsAuditing] = useState(false);
    const [auditSteps, setAuditSteps] = useState<AuditStep[]>([
        {
            id: '1',
            text: 'Validating Next.js 15 RSC Streaming Hydration',
            detail: 'p75 LCP = 640ms · 0 layout shifts (CLS 0.000) · 100% Core Web Vitals',
            status: 'done',
        },
        {
            id: '2',
            text: 'Measuring 120Hz Gesture Loop on Native UI Thread',
            detail: 'Frame render: 7.1ms (<8.33ms budget) · 0 dropped frames · 0 JS bridge hops',
            status: 'done',
        },
        {
            id: '3',
            text: 'Verifying Optimistic State Machine Rollback Invariant',
            detail: 'Simulated 500ms network timeout · transactional revert succeeded in 3.8ms',
            status: 'done',
        },
        {
            id: '4',
            text: 'Profiling PostgreSQL Pool via PgBouncer Connection Router',
            detail: 'Composite B-Tree Index Scan · Query exec: 4.2ms · p95 latency: 18.4ms',
            status: 'done',
        },
    ]);

    const terminalBodyRef = useRef<HTMLDivElement>(null);

    const runLiveAudit = () => {
        if (isAuditing) return;
        setIsAuditing(true);
        setActiveTab('audit');

        setAuditSteps((prev) =>
            prev.map((step) => ({ ...step, status: 'pending' }))
        );

        auditSteps.forEach((step, idx) => {
            setTimeout(() => {
                setAuditSteps((prev) =>
                    prev.map((s, i) =>
                        i === idx ? { ...s, status: 'running' } : s
                    )
                );
            }, idx * 400);

            setTimeout(() => {
                setAuditSteps((prev) =>
                    prev.map((s, i) =>
                        i === idx ? { ...s, status: 'done' } : s
                    )
                );
                if (idx === auditSteps.length - 1) {
                    setIsAuditing(false);
                }
            }, (idx + 1) * 400);
        });
    };

    const handleCommandSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const cmd = commandInput.trim().toLowerCase();
        if (!cmd) return;

        setCommandHistory((prev) => [...prev.slice(-3), `$ ${commandInput}`]);
        setCommandInput('');

        if (cmd === '/profile' || cmd === 'profile') {
            setActiveTab('profile');
        } else if (cmd === '/benchmarks' || cmd === 'benchmarks' || cmd === '1') {
            setActiveTab('benchmarks');
        } else if (cmd === '/principles' || cmd === 'principles' || cmd === '2') {
            setActiveTab('principles');
        } else if (cmd === '/audit' || cmd === 'audit' || cmd === '3') {
            runLiveAudit();
        } else if (cmd === '/stack' || cmd === 'stack' || cmd === '4') {
            setActiveTab('stack');
        } else if (cmd === '/clear' || cmd === 'clear') {
            setCommandHistory([]);
        } else if (cmd === '/help' || cmd === 'help') {
            setCommandHistory((prev) => [
                ...prev,
                'Commands: /audit, /benchmarks, /principles, /profile, /stack, /clear',
            ]);
        } else {
            setCommandHistory((prev) => [
                ...prev,
                `Command not recognized: "${cmd}". Type /help for available options.`,
            ]);
        }
    };

    useEffect(() => {
        if (terminalBodyRef.current) {
            terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
        }
    }, [activeTab, selectedPrinciple, auditSteps, commandHistory]);

    const currentPrincipleObj =
        SCIENTIFIC_PRINCIPLES.find((p) => p.id === selectedPrinciple) ||
        SCIENTIFIC_PRINCIPLES[0];

    return (
        <div className="w-full rounded-2xl overflow-hidden bg-[#16161E] border border-[#27273A] shadow-2xl shadow-neutral-950/25 text-[#C0CAF5] font-mono flex flex-col h-[480px] sm:h-[460px] transition-all">
            {/* 1. Terminal Window Chrome / Header Bar */}
            <div className="bg-[#1A1B26] px-4 py-2 border-b border-[#27273A] flex flex-wrap items-center justify-between gap-2 select-none shrink-0">
                {/* Window buttons & title badge */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                        <span className="size-2.5 rounded-full bg-[#FF5F56] inline-block" />
                        <span className="size-2.5 rounded-full bg-[#FFBD2E] inline-block" />
                        <span className="size-2.5 rounded-full bg-[#27C93F] inline-block" />
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#7AA2F7] font-medium">
                        <Terminal size={12} className="text-[#CD694A]" />
                        <span>kowshik-cli</span>
                        <span className="text-neutral-500 font-normal">v2.4.0</span>
                        <span className="hidden sm:inline-block px-1.5 py-0.2 rounded bg-[#24283B] text-[10px] text-neutral-400">
                            <GitBranch size={9} className="inline mr-1 text-[#9ECE6A]" />
                            main
                        </span>
                    </div>
                </div>

                {/* Quick-Click Command Navigation Pills */}
                <div className="flex items-center gap-1 text-[11px] overflow-x-auto no-scrollbar">
                    <button
                        type="button"
                        onClick={() => setActiveTab('audit')}
                        className={`px-2 py-0.5 rounded-md transition-all flex items-center gap-1 ${
                            activeTab === 'audit'
                                ? 'bg-[#24283B] text-[#E0AF68] border border-[#E0AF68]/30 shadow-xs font-semibold'
                                : 'text-neutral-400 hover:text-white hover:bg-[#24283B]/50'
                        }`}
                    >
                        <Play size={10} className={isAuditing ? 'animate-spin text-[#E0AF68]' : ''} />
                        <span>/audit</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setActiveTab('benchmarks')}
                        className={`px-2 py-0.5 rounded-md transition-all flex items-center gap-1 ${
                            activeTab === 'benchmarks'
                                ? 'bg-[#24283B] text-[#7AA2F7] border border-[#7AA2F7]/30 shadow-xs font-semibold'
                                : 'text-neutral-400 hover:text-white hover:bg-[#24283B]/50'
                        }`}
                    >
                        <Zap size={10} className={activeTab === 'benchmarks' ? 'text-[#7AA2F7]' : ''} />
                        <span>/benchmarks</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setActiveTab('principles')}
                        className={`px-2 py-0.5 rounded-md transition-all flex items-center gap-1 ${
                            activeTab === 'principles'
                                ? 'bg-[#24283B] text-[#9ECE6A] border border-[#9ECE6A]/30 shadow-xs font-semibold'
                                : 'text-neutral-400 hover:text-white hover:bg-[#24283B]/50'
                        }`}
                    >
                        <ShieldCheck size={10} className={activeTab === 'principles' ? 'text-[#9ECE6A]' : ''} />
                        <span>/principles</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setActiveTab('profile')}
                        className={`px-2 py-0.5 rounded-md transition-all flex items-center gap-1 ${
                            activeTab === 'profile'
                                ? 'bg-[#24283B] text-[#CD694A] border border-[#CD694A]/30 shadow-xs font-semibold'
                                : 'text-neutral-400 hover:text-white hover:bg-[#24283B]/50'
                        }`}
                    >
                        <User size={10} className={activeTab === 'profile' ? 'text-[#CD694A]' : ''} />
                        <span>/profile</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setActiveTab('stack')}
                        className={`px-2 py-0.5 rounded-md transition-all flex items-center gap-1 ${
                            activeTab === 'stack'
                                ? 'bg-[#24283B] text-[#BB9AF7] border border-[#BB9AF7]/30 shadow-xs font-semibold'
                                : 'text-neutral-400 hover:text-white hover:bg-[#24283B]/50'
                        }`}
                    >
                        <Layers size={10} className={activeTab === 'stack' ? 'text-[#BB9AF7]' : ''} />
                        <span>/stack</span>
                    </button>
                </div>
            </div>

            {/* 2. Scrollable Terminal Interior */}
            <div
                ref={terminalBodyRef}
                className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3 text-[12px] leading-relaxed select-text"
            >
                {/* Agent Session Header & Compact Metric Strip */}
                <div className="rounded-lg border border-[#CD694A]/40 p-2.5 bg-[#1A1B26]/80 text-[11px] space-y-1.5">
                    <div className="flex flex-wrap items-center justify-between gap-1.5">
                        <div className="flex items-center gap-2">
                            <span className="text-white font-semibold">Kowshik Valipireddy</span>
                            <span className="text-[#CD694A]">·</span>
                            <span className="text-[#7AA2F7]">Senior Design Technologist</span>
                            <span className="text-neutral-500 hidden sm:inline">(Systems &amp; Mobile Architect)</span>
                        </div>
                        <div className="flex items-center gap-2 text-neutral-400 text-[10.5px]">
                            <span className="flex items-center gap-1">
                                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                Available for Contracts
                            </span>
                            <span className="hidden md:inline text-neutral-500">·</span>
                            <span className="hidden md:inline text-neutral-400">cwd: ~/portfolio/engine</span>
                        </div>
                    </div>

                    {/* 4 Invariant Benchmark Chips */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-1 border-t border-[#27273A]/80 text-[10.5px]">
                        <div className="flex items-center justify-between px-2 py-1 rounded bg-[#16161E] border border-[#27273A]">
                            <span className="text-neutral-400">UI Thread</span>
                            <span className="text-[#9ECE6A] font-bold">120 FPS</span>
                        </div>
                        <div className="flex items-center justify-between px-2 py-1 rounded bg-[#16161E] border border-[#27273A]">
                            <span className="text-neutral-400">Web Vitals</span>
                            <span className="text-[#7AA2F7] font-bold">&lt;750ms LCP</span>
                        </div>
                        <div className="flex items-center justify-between px-2 py-1 rounded bg-[#16161E] border border-[#27273A]">
                            <span className="text-neutral-400">Shipped</span>
                            <span className="text-[#E0AF68] font-bold">30+ Apps</span>
                        </div>
                        <div className="flex items-center justify-between px-2 py-1 rounded bg-[#16161E] border border-[#27273A]">
                            <span className="text-neutral-400">Database p95</span>
                            <span className="text-[#BB9AF7] font-bold">&lt;25ms</span>
                        </div>
                    </div>
                </div>

                {/* TAB 1: Live Test Suite Audit (Default View) */}
                {activeTab === 'audit' && (
                    <div className="space-y-2 animate-fadeIn">
                        <div className="flex items-center justify-between text-[11px] text-[#E0AF68] bg-[#1A1B26] px-2.5 py-1.5 rounded-md border border-[#27273A]">
                            <div className="flex items-center gap-1.5 font-medium">
                                <Terminal size={11} />
                                <span>Running Test Suite: sys-audit --strict-invariants</span>
                            </div>
                            <button
                                type="button"
                                onClick={runLiveAudit}
                                disabled={isAuditing}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#24283B] hover:bg-[#2f354f] text-neutral-200 text-[10.5px] transition-all font-semibold"
                            >
                                <RotateCcw size={9} className={isAuditing ? 'animate-spin text-[#E0AF68]' : ''} />
                                <span>Re-run</span>
                            </button>
                        </div>

                        <div className="space-y-1.5">
                            {auditSteps.map((step) => (
                                <div
                                    key={step.id}
                                    className="p-2 rounded-md bg-[#1A1B26] border border-[#27273A] flex items-center justify-between text-[11.5px] gap-2"
                                >
                                    <div className="flex items-center gap-2 truncate">
                                        {step.status === 'done' ? (
                                            <CheckCircle2 size={12} className="text-[#9ECE6A] shrink-0" />
                                        ) : step.status === 'running' ? (
                                            <span className="size-2.5 rounded-full border-2 border-[#E0AF68] border-t-transparent animate-spin shrink-0" />
                                        ) : (
                                            <span className="size-2.5 rounded-full bg-neutral-700 shrink-0" />
                                        )}
                                        <span
                                            className={
                                                step.status === 'done'
                                                    ? 'text-neutral-200'
                                                    : step.status === 'running'
                                                    ? 'text-[#E0AF68] font-medium'
                                                    : 'text-neutral-500'
                                            }
                                        >
                                            {step.text}
                                        </span>
                                    </div>
                                    <div className="text-[10px] text-neutral-400 font-mono shrink-0">
                                        {step.status === 'done' ? (
                                            <span className="text-[#9ECE6A]">✓ pass</span>
                                        ) : (
                                            <span className="text-neutral-500">{step.status}</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {!isAuditing && (
                            <div className="p-2 rounded-md bg-[#9ECE6A]/10 border border-[#9ECE6A]/30 text-[11px] text-[#9ECE6A] flex items-center justify-between">
                                <span className="font-semibold">✓ 4/4 System Invariants Passed (0 errors, 0 dropped frames)</span>
                                <span className="text-[10px] text-neutral-400 font-mono">1.8s</span>
                            </div>
                        )}
                    </div>
                )}

                {/* TAB 2: Engineering Profile View */}
                {activeTab === 'profile' && (
                    <div className="space-y-2.5 animate-fadeIn">
                        <div className="p-3 rounded-lg bg-[#1A1B26] border border-[#27273A] space-y-2 text-xs">
                            <div className="text-[#CD694A] font-semibold text-xs uppercase tracking-wider">
                                Engineering Profile &amp; Bio
                            </div>
                            <p className="text-neutral-300 leading-relaxed text-[11.5px]">
                                Full-stack developer and cross-platform mobile engineer bridging design fidelity with systems-level performance across web and native platforms.
                            </p>
                        </div>

                        <div className="p-3 rounded-lg bg-[#1A1B26] border border-[#27273A] space-y-1.5 text-xs">
                            <div className="text-[10.5px] font-mono uppercase tracking-widest text-[#7AA2F7] font-semibold">
                                Core Specializations
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-neutral-300">
                                <div className="flex items-center gap-1.5">
                                    <CheckCircle2 size={11} className="text-[#9ECE6A] shrink-0" />
                                    <span>Next.js 15 &amp; React 19 RSC</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <CheckCircle2 size={11} className="text-[#9ECE6A] shrink-0" />
                                    <span>React Native &amp; Reanimated</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <CheckCircle2 size={11} className="text-[#9ECE6A] shrink-0" />
                                    <span>Node.js, PostgreSQL &amp; PgBouncer</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <CheckCircle2 size={11} className="text-[#9ECE6A] shrink-0" />
                                    <span>Deterministic FSMs &amp; Rollbacks</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 3: Benchmarks View */}
                {activeTab === 'benchmarks' && (
                    <div className="space-y-2 animate-fadeIn">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                            <div className="p-2.5 rounded-lg bg-[#1A1B26] border border-[#27273A] space-y-1">
                                <div className="text-neutral-400 text-[10.5px]">UI Thread Gesture Budget</div>
                                <div className="text-lg font-anton text-[#9ECE6A]">120 FPS · &lt;8.33ms Budget</div>
                                <div className="text-[10px] text-neutral-400">Reanimated 3 worklets · JSI C++ TurboModules</div>
                            </div>

                            <div className="p-2.5 rounded-lg bg-[#1A1B26] border border-[#27273A] space-y-1">
                                <div className="text-neutral-400 text-[10.5px]">Core Web Vitals p75 LCP</div>
                                <div className="text-lg font-anton text-[#7AA2F7]">&lt;750ms · 0.000 CLS</div>
                                <div className="text-[10px] text-neutral-400">Next.js 15 App Router Streaming SSR · Edge cached</div>
                            </div>

                            <div className="p-2.5 rounded-lg bg-[#1A1B26] border border-[#27273A] space-y-1">
                                <div className="text-neutral-400 text-[10.5px]">Production Track Record</div>
                                <div className="text-lg font-anton text-[#E0AF68]">30+ Shipped Systems</div>
                                <div className="text-[10px] text-neutral-400">Web platforms &amp; React Native mobile apps</div>
                            </div>

                            <div className="p-2.5 rounded-lg bg-[#1A1B26] border border-[#27273A] space-y-1">
                                <div className="text-neutral-400 text-[10.5px]">Database Query Latency</div>
                                <div className="text-lg font-anton text-[#BB9AF7]">p95 &lt; 25ms</div>
                                <div className="text-[10px] text-neutral-400">PgBouncer pool sizing · Composite B-Tree index scans</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 4: Principles View */}
                {activeTab === 'principles' && (
                    <div className="space-y-2 animate-fadeIn">
                        <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar text-xs">
                            {SCIENTIFIC_PRINCIPLES.map((p) => (
                                <button
                                    key={p.id}
                                    type="button"
                                    onClick={() => setSelectedPrinciple(p.id)}
                                    className={`px-2 py-0.5 rounded text-[10.5px] transition-all whitespace-nowrap ${
                                        selectedPrinciple === p.id
                                            ? 'bg-[#24283B] text-[#7AA2F7] border border-[#7AA2F7]/30 font-semibold'
                                            : 'text-neutral-400 hover:text-white'
                                    }`}
                                >
                                    P{p.num} · {p.tag}
                                </button>
                            ))}
                        </div>

                        <div className="p-2.5 rounded-lg bg-[#1A1B26] border border-[#27273A] space-y-1.5 text-xs">
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-white font-medium text-[11.5px]">
                                    Principle {currentPrincipleObj.num}: {currentPrincipleObj.title}
                                </span>
                            </div>
                            <div className="px-2 py-1 rounded bg-[#16161E] border border-[#27273A] text-[10.5px] text-[#9ECE6A] truncate">
                                ✓ {currentPrincipleObj.toolResult}
                            </div>
                            <p className="text-[11px] text-neutral-300 leading-relaxed">
                                {currentPrincipleObj.summary}
                            </p>
                        </div>
                    </div>
                )}

                {/* TAB 5: Stack View */}
                {activeTab === 'stack' && (
                    <div className="space-y-2 animate-fadeIn">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs">
                            <div className="p-2 rounded bg-[#1A1B26] border border-[#27273A]">
                                <div className="text-[#7AA2F7] text-[10.5px] font-semibold">Web</div>
                                <div className="text-white text-xs font-medium">Next.js 15</div>
                                <div className="text-[10px] text-neutral-400">React 19 RSC</div>
                            </div>
                            <div className="p-2 rounded bg-[#1A1B26] border border-[#27273A]">
                                <div className="text-[#9ECE6A] text-[10.5px] font-semibold">Mobile</div>
                                <div className="text-white text-xs font-medium">React Native</div>
                                <div className="text-[10px] text-neutral-400">Reanimated 3</div>
                            </div>
                            <div className="p-2 rounded bg-[#1A1B26] border border-[#27273A]">
                                <div className="text-[#E0AF68] text-[10.5px] font-semibold">Backend</div>
                                <div className="text-white text-xs font-medium">Node.js · Postgres</div>
                                <div className="text-[10px] text-neutral-400">PgBouncer Pool</div>
                            </div>
                            <div className="p-2 rounded bg-[#1A1B26] border border-[#27273A]">
                                <div className="text-[#CD694A] text-[10.5px] font-semibold">Contracts</div>
                                <div className="text-white text-xs font-medium">Strict Zod</div>
                                <div className="text-[10px] text-neutral-400">Type Parity</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Command History Logs */}
                {commandHistory.length > 0 && (
                    <div className="pt-1 border-t border-[#27273A]/60 space-y-0.5 text-xs text-neutral-400">
                        {commandHistory.map((line, i) => (
                            <div key={i} className="text-[10.5px]">
                                {line}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* 3. Pinned Agent Prompt Composer Bar */}
            <form
                onSubmit={handleCommandSubmit}
                className="bg-[#1A1B26] px-3.5 py-2 border-t border-[#27273A] flex items-center gap-2 shrink-0"
            >
                <span className="text-[#9ECE6A] text-xs font-semibold select-none">
                    kowshik@systems:~$
                </span>
                <input
                    type="text"
                    value={commandInput}
                    onChange={(e) => setCommandInput(e.target.value)}
                    placeholder="Type /benchmarks, /principles, /audit, /profile, /stack..."
                    className="flex-1 bg-transparent border-none outline-hidden text-xs text-white placeholder-neutral-500 font-mono"
                />
                <button
                    type="submit"
                    className="p-1 rounded bg-[#24283B] hover:bg-[#2f354f] text-neutral-400 hover:text-white transition-all text-xs"
                    title="Send command"
                >
                    <CornerDownLeft size={11} />
                </button>
            </form>
        </div>
    );
}
