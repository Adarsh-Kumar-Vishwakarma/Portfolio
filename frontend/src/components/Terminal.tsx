import React, { useEffect, useRef, useState } from 'react';

const PROMPT = 'hacker@portfolio:~$';
const initialLogs = [
  '[INFO] Welcome to the portfolio terminal.',
  '[SUCCESS] System initialized.',
  '[INFO] Type a command or try "help".',
];
const easterEggs: Record<string, string[] | (() => string[])> = {
  help: [
    '[INFO] Available commands:',
    'about, projects, skills, contact, clear, sudo rm -rf /, ascii, uptime, whoami, github, linkedin, sudo, hack, matrix',
  ],
  'sudo rm -rf /': [
    '[ERROR] Permission denied: You are not root!',
    '[WARNING] Nice try 😉',
  ],
  ascii: [
    '   _____           _ _             ',
    '  |  __ \\         | | |            ',
    '  | |__) |__  _ __| | | ___ _ __   ',
    '  |  ___/ _ \\|  __| | |/ _ \\  __|  ',
    '  | |  | (_) | |  | | |  __/ |     ',
    '  |_|   \\___/|_|  |_|_|\\___|_|     ',
    '[INFO] ASCII art loaded!'
  ],
  whoami: [
    '[INFO] User: hacker',
    '[INFO] Role: Developer/Terminal Enthusiast',
  ],
  github: [
    "[INFO] Opening GitHub... (not really, but here's the link: github.com/Adarsh-Kumar-Vishwakarma)"
  ],
  linkedin: [
    "[INFO] Opening LinkedIn... (not really, but here's the link: linkedin.com/in/adarsh-kumar-vishwakarma-6ba71a192/)"
  ],
  sudo: ['Nice try. You have no power here.'],
  hack: ['Hacking the mainframe...','Access denied.'],
  matrix: ['Wake up, Neo... The Matrix has you.'],
};

function getTime() {
  return new Date().toLocaleTimeString();
}

function formatUptime(seconds: number) {
  const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

const Terminal = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number | null>(null);
  const [booted, setBooted] = useState(false);
  const [uptime, setUptime] = useState(0);
  const [clock, setClock] = useState(getTime());
  const inputRef = useRef<HTMLDivElement>(null);
  const logEndRef = useRef<HTMLDivElement>(null);

  // Boot animation
  useEffect(() => {
    setBooted(false);
    setLogs([]);
    let i = 0;
    const bootLines = [
      '[BOOT] Initializing terminal...',
      '[BOOT] Loading modules...',
      '[BOOT] Establishing secure connection...',
      '[SUCCESS] Terminal ready.',
      ...initialLogs,
    ];
    const interval = setInterval(() => {
      setLogs((prev) => [...prev, bootLines[i]]);
      i++;
      if (i === bootLines.length) {
        clearInterval(interval);
        setBooted(true);
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Uptime and clock
  useEffect(() => {
    const uptimeInterval = setInterval(() => setUptime((u) => u + 1), 1000);
    const clockInterval = setInterval(() => setClock(getTime()), 1000);
    return () => {
      clearInterval(uptimeInterval);
      clearInterval(clockInterval);
    };
  }, []);

  // Scroll to bottom on new log
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Focus input on click
  useEffect(() => {
    if (booted) inputRef.current?.focus();
  }, [booted]);

  // Handle command submit
  const handleCommand = (cmd: string) => {
    if (!cmd.trim()) return;
    setLogs((prev) => [...prev, `${PROMPT} ${cmd}`]);
    setHistory((prev) => [...prev, cmd]);
    setHistoryIdx(null);
    if (cmd === 'clear') {
      setLogs([]);
      return;
    }
    if (cmd === 'uptime') {
      setLogs((prev) => [...prev, `[INFO] Uptime: ${formatUptime(uptime)}`]);
      return;
    }
    const egg = easterEggs[cmd];
    if (egg) {
      setLogs((prev) => [...prev, ...(typeof egg === 'function' ? egg() : egg)]);
      return;
    }
    setLogs((prev) => [...prev, `[ERROR] Command not found: ${cmd}`]);
  };

  // Handle input key events
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!input.trim()) return;
      handleCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      setHistoryIdx(idx => {
        const newIdx = idx === null ? history.length - 1 : Math.max(0, idx - 1);
        setInput(history[newIdx]);
        return newIdx;
      });
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (history.length === 0) return;
      setHistoryIdx(idx => {
        if (idx === null) return null;
        const newIdx = Math.min(history.length - 1, idx + 1);
        setInput(history[newIdx] || '');
        return newIdx === history.length ? null : newIdx;
      });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-[#181c23] border-2 border-[#4fd1c5] rounded-md shadow-2xl font-mono text-[13px] sm:text-base p-0 overflow-hidden my-8"
      onClick={() => inputRef.current?.focus()}
      role="region"
      aria-label="Terminal emulator"
    >
      {/* Terminal header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#23272e] border-b border-[#4fd1c5]">
        <span className="text-[#4fd1c5] font-bold">{PROMPT}</span>
        <span className="text-[#63b3ed]">{clock}</span>
        <span className="text-[#f6e05e]">Uptime: {formatUptime(uptime)}</span>
      </div>
      {/* Log feed */}
      <div className="h-48 sm:h-56 overflow-y-auto px-4 py-2 bg-[#181c23]">
        {logs.map((line, i) => (
          <div key={i} className="whitespace-pre text-[#a0aec0] animate-fade-in-fast">{line}</div>
        ))}
        <div ref={logEndRef} />
      </div>
      {/* Command input */}
      {booted && (
        <div className="flex items-center px-4 py-2 bg-[#23272e] border-t border-[#4fd1c5]">
          <span className="text-[#4fd1c5] font-bold mr-2 select-none">{PROMPT}</span>
          <div
            ref={inputRef}
            className="flex-1 outline-none bg-transparent min-h-[1em] whitespace-pre-wrap break-all focus:outline-none cursor-text relative text-[#f6e05e] text-base"
            contentEditable
            spellCheck={false}
            tabIndex={0}
            aria-label="Terminal command input"
            onInput={e => {
              setInput((e.target as HTMLDivElement).innerText.replace(/\n/g, ''));
              setHistoryIdx(null);
            }}
            onKeyDown={handleKeyDown}
            onBlur={e => e.currentTarget.focus()}
            suppressContentEditableWarning
          >
            {input}
            <span className="terminal-caret">&nbsp;</span>
          </div>
        </div>
      )}
      <style>{`
        .terminal-caret {
          display: inline-block;
          width: 10px;
          height: 1em;
          background: #4fd1c5;
          margin-left: -2px;
          animation: blink-block 1s steps(1) infinite;
          vertical-align: bottom;
        }
        @keyframes blink-block {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-fade-in-fast { animation: fadeInFast 0.3s; }
        @keyframes fadeInFast { from { opacity: 0; } to { opacity: 1; } }
        @media (max-width: 640px) {
          .max-w-2xl { max-width: 98vw; }
        }
      `}</style>
    </div>
  );
};

export default Terminal; 