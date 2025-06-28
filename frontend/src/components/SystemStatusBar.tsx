import React, { useEffect, useState } from 'react';

const messages = [
  '[System: Online] [Status: Ready] [Connection: Secure]',
  '[Fetching data...]',
  '[Compiling projects...]',
  '[Connection established]',
  '[All systems operational]',
  '[Syncing with GitHub...]',
  '[Last login: ' + new Date().toLocaleString() + ']',
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
      setUptime((u) => u + 1);
    }, 1000);
    return () => clearInterval(uptimeInterval);
  }, []);

  return (
    <div className="w-full flex items-center gap-3 px-4 py-2 bg-[#23272e] font-mono text-xs sm:text-sm rounded-t-xl select-none">
      {/* Status lights */}
      <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse mr-1" />
      <span className="inline-block w-2 h-2 rounded-full bg-yellow-400 animate-pulse-slow mr-1" />
      <span className="inline-block w-2 h-2 rounded-full bg-red-400 animate-pulse-slower mr-3" />
      {/* Rotating message */}
      <span className="text-[#4fd1c5]">{messages[msgIdx]}</span>
      <span className="mx-2 text-[#f6e05e]">|</span>
      {/* Uptime */}
      <span className="text-[#63b3ed]">Uptime: {formatUptime(uptime)}</span>
      {/* Blinking dot */}
      <span className="ml-2 text-[#f6e05e] animate-blink">●</span>
      <style>{`
        .animate-pulse-slow { animation: pulse 2.5s cubic-bezier(0.4,0,0.6,1) infinite; }
        .animate-pulse-slower { animation: pulse 4s cubic-bezier(0.4,0,0.6,1) infinite; }
        @keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:.5;} }
        .animate-blink { animation: blink 1s steps(2,start) infinite; }
        @keyframes blink { to { visibility: hidden; } }
      `}</style>
    </div>
  );
};

export default SystemStatusBar; 