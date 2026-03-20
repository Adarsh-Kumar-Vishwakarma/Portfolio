import React, { useEffect, useState } from 'react';

const messages = [
  'Portfolio systems online',
  'Responsive experience optimized',
  'Projects indexed and ready',
  'Contact channel secured',
  'AI assistant connected',
  `Last sync ${new Date().toLocaleTimeString()}`,
];

function formatUptime(seconds: number) {
  const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

const SystemStatusBar = () => {
  const [msgIdx, setMsgIdx] = useState(0);
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    const msgInterval = setInterval(() => {
      setMsgIdx((idx) => (idx + 1) % messages.length);
    }, 3500);

    return () => clearInterval(msgInterval);
  }, []);

  useEffect(() => {
    const uptimeInterval = setInterval(() => {
      setUptime((value) => value + 1);
    }, 1000);

    return () => clearInterval(uptimeInterval);
  }, []);

  return (
    <div className="flex w-full flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-xs text-slate-300 shadow-inner shadow-cyan-950/20 backdrop-blur">
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(74,222,128,0.8)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-sky-400 shadow-[0_0_18px_rgba(56,189,248,0.75)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-300 shadow-[0_0_18px_rgba(252,211,77,0.75)]" />
      </div>
      <span className="mono-text flex-1 truncate text-cyan-200">{messages[msgIdx]}</span>
      <span className="mono-text whitespace-nowrap text-slate-400">Uptime {formatUptime(uptime)}</span>
    </div>
  );
};

export default SystemStatusBar;
