import React from 'react';

const TAKVLogo = ({ size = 40, className = '' }) => (
  <div
    className={`inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 shadow-[0_10px_30px_rgba(15,23,42,0.35)] backdrop-blur ${className}`}
    style={{ height: size, minWidth: size * 2.45 }}
  >
    <span
      className="bg-gradient-to-r from-cyan-300 via-sky-400 to-amber-300 bg-clip-text font-['JetBrains_Mono'] text-transparent"
      style={{ fontSize: size * 0.38, letterSpacing: size * 0.08, fontWeight: 700 }}
    >
      TAKV
    </span>
  </div>
);

export default TAKVLogo;
