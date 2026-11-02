import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { SectionId } from '../types';
import { SYSTEM_META } from '../data/posArchitectureData';
import productLogo from '../assets/icon_mobile_solutions.png';

interface HeaderProps {
  activeSection: SectionId;
  onSelectSection: (id: SectionId) => void;
  onToggleMobileSidebar: () => void;
  isMobileSidebarOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onSelectSection,
  onToggleMobileSidebar,
  isMobileSidebarOpen
}) => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('es-MX', { hour12: false }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-20 sm:h-24 bg-[#080E21]/95 backdrop-blur-xl border-b border-[rgba(0,180,216,0.3)] shadow-[0_4px_24px_rgba(0,0,0,0.5)] px-4 sm:px-8 flex items-center justify-between transition-all">
      {/* Left: Mobile Toggle & System Brand */}
      <div className="flex items-center gap-4 sm:gap-5">
        <button
          onClick={onToggleMobileSidebar}
          className="p-2.5 rounded-lg lg:hidden text-slate-300 hover:text-[#00B4D8] hover:bg-[#0E1B38] border border-slate-700/50"
          aria-label="Abrir menú"
        >
          {isMobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <div className="flex items-center gap-4 sm:gap-5 cursor-pointer select-none" onClick={() => onSelectSection('overview')}>
          {/* Prominent Product Logo */}
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl overflow-hidden flex items-center justify-center shadow-[0_0_20px_rgba(0,180,216,0.45)] border-2 border-[#00B4D8]/60 bg-[#060D24] p-1 flex-shrink-0 transition-transform hover:scale-105">
            <img
              src={productLogo}
              alt="Mobile Solutions Logo"
              className="w-full h-full object-contain"
            />
          </div>

          <div>
            <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
              <span className="font-display font-extrabold text-base sm:text-xl lg:text-2xl tracking-tight text-white leading-tight">
                MOBILE SOLUTIONS POS
              </span>
              <span className="text-[11px] sm:text-xs font-mono px-2.5 py-0.5 rounded-md bg-[#0077B6]/35 text-[#48CAE4] border border-[#00B4D8]/40 font-semibold hidden sm:inline-block">
                WINFORMS .NET
              </span>
            </div>
            <div className="text-xs sm:text-sm font-mono text-slate-400 hidden sm:flex items-center gap-2.5 mt-0.5">
              <span className="text-[#00B4D8] font-semibold">WINDOWS DESKTOP APP</span>
              <span>•</span>
              <span className="text-slate-400">VERSIÓN: 1.0.0-LTS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Live Telemetry Status Pill */}
      <div className="hidden md:flex items-center gap-5 px-4 sm:px-5 py-2.5 rounded-xl bg-[#0A1128] border border-[rgba(0,180,216,0.3)] shadow-[0_0_16px_rgba(0,180,216,0.12)] text-xs sm:text-sm font-mono">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00B4D8]"></span>
          </span>
          <span className="text-emerald-400 font-bold tracking-wide">{SYSTEM_META.status}</span>
        </div>
        <span className="text-slate-600">|</span>
        <div className="flex items-center gap-2 text-slate-300 font-medium">
          <Clock className="w-4 h-4 text-[#00B4D8]" />
          <span>{time || '00:00:00'}</span>
        </div>
        <span className="text-slate-600">|</span>
        <div className="flex items-center gap-2 text-slate-300">
          <ShieldCheck className="w-4 h-4 text-[#48CAE4]" />
          <span className="font-semibold text-[#48CAE4]">PSIONIC SOFTWARE</span>
        </div>
      </div>
    </header>
  );
};
