import React, { useEffect, useState } from 'react';

const getRandom = (min: number, max: number, decimals = 0) =>
  +(Math.random() * (max - min) + min).toFixed(decimals);

const LiveStatsPanel = () => {
  const [cpu, setCpu] = useState(getRandom(10, 80));
  const [mem, setMem] = useState(getRandom(1.2, 7.5, 1));
  const [net, setNet] = useState(getRandom(2, 50, 1));
  const [disk, setDisk] = useState(getRandom(20, 90));

  useEffect(() => {
    const interval = setInterval(() => {
      setCpu(getRandom(10, 80));
      setMem(getRandom(1.2, 7.5, 1));
      setNet(getRandom(2, 50, 1));
      setDisk(getRandom(20, 90));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="fixed right-4 bottom-4 sm:right-4 sm:bottom-4 left-1/2 sm:left-auto sm:translate-x-0 -translate-x-1/2 sm:w-56 w-11/12 max-w-xs z-50 bg-[#23272e]/95 border-2 border-[#4fd1c5] rounded-xl shadow-lg font-mono text-xs sm:text-sm p-3 flex flex-col gap-1 select-none"
      style={{backdropFilter: 'blur(2px)'}}
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[#4fd1c5] font-bold">$</span>
        <span className="text-[#63b3ed]">system-stats</span>
      </div>
      <div className="flex justify-between"><span className="text-[#f6e05e]">CPU</span> <span className="text-[#4fd1c5]">{cpu}%</span></div>
      <div className="flex justify-between"><span className="text-[#f6e05e]">Memory</span> <span className="text-[#4fd1c5]">{mem} GB / 8 GB</span></div>
      <div className="flex justify-between"><span className="text-[#f6e05e]">Network</span> <span className="text-[#4fd1c5]">{net} Mbps</span></div>
      <div className="flex justify-between"><span className="text-[#f6e05e]">Disk</span> <span className="text-[#4fd1c5]">{disk}% used</span></div>
    </div>
  );
};

export default LiveStatsPanel; 