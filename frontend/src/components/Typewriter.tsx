import React, { useEffect, useRef, useState } from 'react';

interface TypewriterProps {
  text: string | string[];
  speed?: number; // ms per char
  delay?: number; // ms before start
  className?: string;
  onDone?: () => void;
}

const Typewriter: React.FC<TypewriterProps> = ({
  text,
  speed = 35,
  delay = 0,
  className = '',
  onDone,
}) => {
  const lines = Array.isArray(text) ? text : [text];
  const [displayed, setDisplayed] = useState<string[]>(['']);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [done, setDone] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setDisplayed(['']);
    setLineIdx(0);
    setCharIdx(0);
    setDone(false);
  }, [text]);

  useEffect(() => {
    if (done) return;
    if (lineIdx >= lines.length) {
      setDone(true);
      onDone?.();
      return;
    }
    if (charIdx > lines[lineIdx].length) {
      // Move to next line
      timeoutRef.current = setTimeout(() => {
        setDisplayed((prev) => [...prev, '']);
        setLineIdx((idx) => idx + 1);
        setCharIdx(0);
      }, 400);
      return;
    }
    if (charIdx <= lines[lineIdx].length) {
      timeoutRef.current = setTimeout(() => {
        setDisplayed((prev) => {
          const copy = [...prev];
          copy[lineIdx] = lines[lineIdx].slice(0, charIdx);
          return copy;
        });
        setCharIdx((idx) => idx + 1);
      }, lineIdx === 0 && charIdx === 0 ? delay : speed);
    }
    return () => timeoutRef.current && clearTimeout(timeoutRef.current);
  }, [charIdx, lineIdx, lines, speed, delay, done, onDone]);

  return (
    <div className={`typewriter font-mono whitespace-pre-wrap ${className}`} aria-live="polite">
      {displayed.map((line, i) => (
        <div key={i} className="inline-block">
          {line}
          {i === lineIdx && !done ? <span className="typewriter-caret">|</span> : null}
        </div>
      ))}
      <style>{`
        .typewriter-caret {
          display: inline-block;
          color: #4fd1c5;
          font-weight: bold;
          margin-left: 1px;
          animation: blink-caret 1s steps(1) infinite;
        }
        @keyframes blink-caret {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default Typewriter; 