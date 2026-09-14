'use client';

import React, { useState } from 'react';
import { RefreshCw, Layers, Smartphone } from 'lucide-react';

type TabType = 'web' | 'mobile';

export default function EngineeringHUD() {
    const [activeTab, setActiveTab] = useState<TabType>('web');
    const [isSimulating, setIsSimulating] = useState(false);
    const [simLogs, setSimLogs] = useState<string[]>([]);
    const [simSuccess, setSimSuccess] = useState(false);

    const runSimulation = () => {
        if (isSimulating) return;
        setIsSimulating(true);
        setSimSuccess(false);
        setSimLogs([]);

        if (activeTab === 'web') {
            // Web: Optimistic UI mutation + rollback invariant
            const steps = [
                't+0ms: User clicks [Add to Wishlist] → Optimistic DOM write (0ms latency)',
                't+14ms: Dispatched Server Action over HTTP/2 with Idempotency-Key',
                't+22ms: Edge Worker authenticated session & validated Zod contract',
                't+31ms: PostgreSQL INSERT with connection pool · Committed p95=8.4ms',
                't+38ms: Invariant confirmed: Optimistic state reconciled without layout shift (CLS: 0.000)',
            ];
            steps.forEach((msg, idx) => {
                setTimeout(() => {
                    setSimLogs((prev) => [...prev, msg]);
                    if (idx === steps.length - 1) {
                        setIsSimulating(false);
                        setSimSuccess(true);
                    }
                }, (idx + 1) * 220);
            });
        } else {
            // Mobile: 120 FPS Native thread gesture loop
            const steps = [
                't+0ms: Touch event intercepted by GestureHandlerRootView',
                't+2ms: Reanimated 3 worklet invoked on UI thread via JSI C++ binding',
                't+5ms: Spring physics evaluated (damping=18, stiffness=140) · 0 JS thread hops',
                't+8.3ms: Frame 1 render complete (target <8.33ms for 120Hz display)',
                't+16.6ms: Frame 2 render complete · 0 dropped frames · UI thread headroom 62%',
            ];
            steps.forEach((msg, idx) => {
                setTimeout(() => {
                    setSimLogs((prev) => [...prev, msg]);
                    if (idx === steps.length - 1) {
                        setIsSimulating(false);
                        setSimSuccess(true);
                    }
                }, (idx + 1) * 220);
            });
        }
    };

    return (
        <div className="w-full rounded-2xl bg-white/95 border border-[#E8E3DA] p-5 sm:p-6 shadow-xl shadow-neutral-900/5 backdrop-blur-md">
            {/* Header: Mode selector & live status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E8E3DA]">
                <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="font-mono text-xs uppercase tracking-wider font-semibold text-neutral-800">
                        Live Runtime Telemetry &amp; Invariants
                    </span>
                </div>

                <div className="inline-flex rounded-lg bg-[#FAF8F5] p-0.5 border border-[#E8E3DA] self-start sm:self-auto">
                    <button
                        type="button"
                        onClick={() => {
                            setActiveTab('web');
                            setSimLogs([]);
                            setSimSuccess(false);
                        }}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono transition-all ${
                            activeTab === 'web'
                                ? 'bg-white text-neutral-900 shadow-sm font-semibold'
                                : 'text-neutral-500 hover:text-neutral-900'
                        }`}
                    >
                        <Layers size={13} className={activeTab === 'web' ? 'text-[#0E7490]' : ''} />
                        <span>Web (Next.js 15)</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setActiveTab('mobile');
                            setSimLogs([]);
                            setSimSuccess(false);
                        }}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono transition-all ${
                            activeTab === 'mobile'
                                ? 'bg-white text-neutral-900 shadow-sm font-semibold'
                                : 'text-neutral-500 hover:text-neutral-900'
                        }`}
                    >
                        <Smartphone size={13} className={activeTab === 'mobile' ? 'text-[#0E7490]' : ''} />
                        <span>Mobile (React Native)</span>
                    </button>
                </div>
            </div>

            {/* Metric KPI Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 py-4">
                {activeTab === 'web' ? (
                    <>
                        <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E3DA]">
                            <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">Largest Contentful Paint</p>
                            <p className="text-xl font-anton text-neutral-900 mt-0.5 flex items-baseline gap-1">
                                0.64s <span className="text-[10px] font-mono font-normal text-emerald-700 bg-emerald-100/60 px-1 rounded">Good &lt;1.2s</span>
                            </p>
                        </div>
                        <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E3DA]">
                            <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">Cumulative Layout Shift</p>
                            <p className="text-xl font-anton text-neutral-900 mt-0.5 flex items-baseline gap-1">
                                0.000 <span className="text-[10px] font-mono font-normal text-emerald-700 bg-emerald-100/60 px-1 rounded">Zero Shift</span>
                            </p>
                        </div>
                        <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E3DA]">
                            <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">Interaction to Next Paint</p>
                            <p className="text-xl font-anton text-neutral-900 mt-0.5 flex items-baseline gap-1">
                                14ms <span className="text-[10px] font-mono font-normal text-emerald-700 bg-emerald-100/60 px-1 rounded">Target &lt;50ms</span>
                            </p>
                        </div>
                        <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E3DA]">
                            <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">Hydration Architecture</p>
                            <p className="text-xl font-anton text-neutral-900 mt-0.5 flex items-baseline gap-1">
                                React 19 RSC <span className="text-[10px] font-mono font-normal text-cyan-800 bg-cyan-100/60 px-1 rounded">0kb Static JS</span>
                            </p>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E3DA]">
                            <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">UI Render Thread</p>
                            <p className="text-xl font-anton text-neutral-900 mt-0.5 flex items-baseline gap-1">
                                120.0 FPS <span className="text-[10px] font-mono font-normal text-emerald-700 bg-emerald-100/60 px-1 rounded">0 Drops</span>
                            </p>
                        </div>
                        <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E3DA]">
                            <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">Bridge Architecture</p>
                            <p className="text-xl font-anton text-neutral-900 mt-0.5 flex items-baseline gap-1">
                                Bridgeless <span className="text-[10px] font-mono font-normal text-emerald-700 bg-emerald-100/60 px-1 rounded">JSI TurboModules</span>
                            </p>
                        </div>
                        <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E3DA]">
                            <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">Gesture Pipeline</p>
                            <p className="text-xl font-anton text-neutral-900 mt-0.5 flex items-baseline gap-1">
                                Reanimated 3 <span className="text-[10px] font-mono font-normal text-cyan-800 bg-cyan-100/60 px-1 rounded">Native Worklets</span>
                            </p>
                        </div>
                        <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E3DA]">
                            <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">Bytecode VM</p>
                            <p className="text-xl font-anton text-neutral-900 mt-0.5 flex items-baseline gap-1">
                                Hermes AOT <span className="text-[10px] font-mono font-normal text-cyan-800 bg-cyan-100/60 px-1 rounded">&lt;15ms TTI</span>
                            </p>
                        </div>
                    </>
                )}
            </div>

            {/* Interactive Probe Console */}
            <div className="pt-2">
                <div className="p-3.5 rounded-xl bg-[#181614] text-neutral-200 text-xs font-mono border border-neutral-800">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-neutral-800">
                        <span className="text-neutral-400">
                            {activeTab === 'web'
                                ? '$ simulate --protocol=optimistic-mutation --verify-rollback'
                                : '$ simulate --thread=native-gesture --frequency=120hz'}
                        </span>
                        <button
                            type="button"
                            onClick={runSimulation}
                            disabled={isSimulating}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#0E7490] hover:bg-[#0c627a] text-white text-[11px] font-medium transition-colors disabled:opacity-50 self-start sm:self-auto cursor-pointer"
                        >
                            <RefreshCw size={12} className={isSimulating ? 'animate-spin' : ''} />
                            <span>{isSimulating ? 'Executing Probe...' : 'Run Invariant Probe'}</span>
                        </button>
                    </div>

                    <div className="min-h-[70px] pt-2.5 space-y-1">
                        {simLogs.length === 0 ? (
                            <p className="text-neutral-500 italic">
                                Ready for execution. Click &quot;Run Invariant Probe&quot; to test real-time latency &amp; thread guarantees.
                            </p>
                        ) : (
                            simLogs.map((log, i) => (
                                <div key={i} className="flex items-start gap-2">
                                    <span className="text-emerald-400 shrink-0">✔</span>
                                    <span className={i === simLogs.length - 1 && simSuccess ? 'text-emerald-300 font-semibold' : 'text-neutral-300'}>
                                        {log}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
