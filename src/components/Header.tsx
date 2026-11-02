import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Search, 
  Menu, 
  X, 
  Download, 
  Cpu, 
  CheckCircle2, 
  Clock, 
  ShieldCheck,
  Maximize2,
  Minimize2,
  ShoppingCart
} from 'lucide-react';
import { SectionId } from '../types';
import { SYSTEM_META } from '../data/posArchitectureData';

interface HeaderProps {
  activeSection: SectionId;
  onSelectSection: (id: SectionId) => void;
  onToggleMobileSidebar: () => void;
  isMobileSidebarOpen: boolean;
  onOpenSearch: () => void;
  onExportDossier: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onSelectSection,
  onToggleMobileSidebar,
  isMobileSidebarOpen,
  onOpenSearch,
  onExportDossier,
  isFullscreen,
  onToggleFullscreen
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
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#080E21]/90 backdrop-blur-xl border-b border-[rgba(0,180,216,0.22)] px-4 flex items-center justify-between">
      {/* Left: Mobile Toggle & System Brand */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileSidebar}
          className="p-2 rounded lg:hidden text-slate-300 hover:text-[#00B4D8] hover:bg-[#0E1B38]"
          aria-label="Abrir menú"
        >
          {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onSelectSection('overview')}>
          <div className="w-9 h-9 rounded bg-gradient-to-br from-[#00B4D8] to-[#0077B6] flex items-center justify-center shadow-[0_0_15px_rgba(0,180,216,0.4)] border border-[#48CAE4]">
            <Cpu className="w-5 h-5 text-[#060A17]" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-sm sm:text-base tracking-tight text-slate-100">
                MOBILE SOLUTIONS POS
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#0077B6]/30 text-[#48CAE4] border border-[#00B4D8]/30 hidden sm:inline-block">
                WINFORMS .NET
              </span>
            </div>
            <div className="text-[10px] font-mono text-slate-400 hidden sm:flex items-center gap-2">
              <span className="text-[#00B4D8]">ARCHITECTURE MATRIX</span>
              <span>•</span>
              <span className="text-slate-500">SYS.VER.4.8.2-LTS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Middle: Live Telemetry Status Pill */}
      <div className="hidden md:flex items-center gap-4 px-3 py-1 rounded bg-[#0A1128] border border-[rgba(0,180,216,0.2)] text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00B4D8]"></span>
          </span>
          <span className="text-emerald-400 font-semibold">{SYSTEM_META.status}</span>
        </div>
        <span className="text-slate-600">|</span>
        <div className="flex items-center gap-1.5 text-slate-400">
          <Clock className="w-3.5 h-3.5 text-[#00B4D8]" />
          <span>{time || '00:00:00'}</span>
        </div>
        <span className="text-slate-600">|</span>
        <div className="flex items-center gap-1 text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-[#48CAE4]" />
          <span>OFFLINE-FIRST WAL</span>
        </div>
      </div>

      {/* Right: Quick actions & Search */}
      <div className="flex items-center gap-2">
        {/* Quick Simulator Jump */}
        <button
          onClick={() => onSelectSection('terminal-simulator')}
          className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium font-sans transition-all ${
            activeSection === 'terminal-simulator'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
              : 'cyber-button-outline hover:text-[#48CAE4]'
          }`}
        >
          <ShoppingCart className="w-3.5 h-3.5 text-emerald-400" />
          <span>Simulador POS</span>
        </button>

        {/* Global Search Button */}
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#0A1128] hover:bg-[#0E1B38] border border-[rgba(0,180,216,0.25)] text-slate-300 text-xs font-mono transition-colors"
          title="Buscar en la documentación (⌘K / Ctrl+K)"
        >
          <Search className="w-3.5 h-3.5 text-[#00B4D8]" />
          <span className="hidden md:inline">Buscar...</span>
          <kbd className="hidden sm:inline-block px-1.5 py-0.2 rounded bg-[#060D24] text-[10px] text-slate-400 border border-slate-700">
            ⌘K
          </kbd>
        </button>

        {/* Export Architecture Dossier */}
        <button
          onClick={onExportDossier}
          className="p-2 rounded bg-[#0A1128] hover:bg-[#0E1B38] border border-[rgba(0,180,216,0.25)] text-slate-300 hover:text-[#00B4D8] transition-colors"
          title="Descargar Dossier de Arquitectura (Markdown / Spec)"
        >
          <Download className="w-4 h-4" />
        </button>

        {/* Focus / Fullscreen Mode */}
        <button
          onClick={onToggleFullscreen}
          className="p-2 rounded bg-[#0A1128] hover:bg-[#0E1B38] border border-[rgba(0,180,216,0.25)] text-slate-300 hover:text-[#00B4D8] transition-colors"
          title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa / Modo Kiosko'}
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};
