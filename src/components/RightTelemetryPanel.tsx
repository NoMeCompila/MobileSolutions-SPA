import React from 'react';
import { Activity, Cpu, HardDrive, Wifi, CheckCircle2, ChevronRight, Play } from 'lucide-react';
import { SectionId } from '../types';

interface RightTelemetryPanelProps {
  activeSection: SectionId;
  onSelectSection: (id: SectionId) => void;
  onlineMode: boolean;
  onToggleOnlineMode: () => void;
  cartCount: number;
}

export const RightTelemetryPanel: React.FC<RightTelemetryPanelProps> = ({
  activeSection,
  onSelectSection,
  onlineMode,
  onToggleOnlineMode,
  cartCount
}) => {
  // Navigation nodes for the current section
  const sectionAnchors: Record<SectionId, { label: string; id: string }[]> = {
    overview: [
      { label: 'Visión General', id: 'ovw-top' },
      { label: 'Métricas de Producción', id: 'ovw-metrics' },
      { label: 'Stack Tecnológico', id: 'ovw-stack' },
      { label: 'Evolución Arquitectónica', id: 'ovw-evolution' }
    ],
    architecture: [
      { label: 'Capas del Sistema (N-Tier)', id: 'arc-layers' },
      { label: 'Patrón de Comunicación', id: 'arc-patterns' },
      { label: 'Ciclo Transaccional', id: 'arc-cycle' }
    ],
    'hardware-hal': [
      { label: 'HAL Drivers Matriz', id: 'hal-drivers' },
      { label: 'Impresoras ESC/POS', id: 'hal-printer' },
      { label: 'Básculas RS-232', id: 'hal-scale' },
      { label: 'Win32 RawInput Scanner', id: 'hal-scanner' }
    ],
    'terminal-simulator': [
      { label: 'Escaneo de Códigos', id: 'sim-scanner' },
      { label: 'Carrito & Pesaje', id: 'sim-cart' },
      { label: 'Ticket Térmico 80mm', id: 'sim-ticket' },
      { label: 'Simulador Offline/Online', id: 'sim-resilience' }
    ],
    'hardware-console': [
      { label: 'Puertos Serie COM', id: 'hcon-ports' },
      { label: 'Inyección de Comandos', id: 'hcon-inject' },
      { label: 'Hex Log en Tiempo Real', id: 'hcon-hexlog' }
    ],
    'data-resilience': [
      { label: 'Esquema Relacional', id: 'dat-schema' },
      { label: 'SQLite WAL Mode', id: 'dat-wal' },
      { label: 'Gateway de Sincronización', id: 'dat-sync' }
    ],
    'code-repository': [
      { label: 'EscPosPrinterDriver.cs', id: 'cod-escpos' },
      { label: 'RawInputBarcodeHook.cs', id: 'cod-rawinput' },
      { label: 'OfflineJournal.cs', id: 'cod-wal' },
      { label: 'SyncWorkerService.cs', id: 'cod-sync' }
    ],
    benchmarks: [
      { label: 'Scan-to-Cart <18ms', id: 'bnc-scan' },
      { label: 'Arranque Frío NGEN', id: 'bnc-cold' },
      { label: 'Cola WAL 100k Tickets', id: 'bnc-queue' }
    ],
    deployment: [
      { label: 'Empaquetado InnoSetup', id: 'dep-installer' },
      { label: 'Optimización NGEN', id: 'dep-ngen' },
      { label: 'Despliegues Masivos', id: 'dep-silent' }
    ]
  };

  const currentAnchors = sectionAnchors[activeSection] || [];

  return (
    <aside className="hidden xl:block fixed top-16 bottom-0 right-0 w-64 bg-[#0A1128]/80 backdrop-blur-xl border-l border-[rgba(0,180,216,0.18)] p-4 overflow-y-auto space-y-6 text-xs font-mono">
      {/* Node Telemetry Box */}
      <div className="p-3 rounded-lg border border-[rgba(0,180,216,0.25)] bg-[#070D1F]/90 shadow-inner">
        <div className="flex items-center justify-between text-[#00B4D8] mb-2 font-semibold">
          <span className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-[#48CAE4]" />
            <span>ESTADO TERMINAL</span>
          </span>
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            ACTIVO
          </span>
        </div>

        <div className="space-y-2 text-[11px] text-slate-300">
          <div className="flex justify-between">
            <span className="text-slate-500">Framework:</span>
            <span className="text-slate-200">CLR 4.8 / WinForms</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Scan-to-Cart:</span>
            <span className="text-[#00B4D8] font-bold">14.2 ms</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Working Set RAM:</span>
            <span className="text-slate-200">84.6 MB</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Local SQLite:</span>
            <span className="text-emerald-400">WAL / Normal</span>
          </div>
          <div className="flex justify-between items-center pt-1 border-t border-slate-800">
            <span className="text-slate-500">Red Tienda:</span>
            <button
              onClick={onToggleOnlineMode}
              className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                onlineMode 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              }`}
            >
              {onlineMode ? '● ONLINE' : '○ OFFLINE (WAL)'}
            </button>
          </div>
        </div>
      </div>

      {/* On This Page Nodal Navigation */}
      <div>
        <div className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider mb-2 flex items-center justify-between">
          <span>EN ESTA PÁGINA</span>
          <span className="text-[#00B4D8]">[NAV.NODAL]</span>
        </div>

        <ul className="space-y-1">
          {currentAnchors.map((anchor, idx) => (
            <li key={idx}>
              <a
                href={`#${anchor.id}`}
                className="block px-2.5 py-1.5 rounded text-slate-400 hover:text-[#48CAE4] hover:bg-[#0E1B38] transition-colors flex items-center justify-between group"
              >
                <span className="truncate">{anchor.label}</span>
                <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-[#00B4D8] shrink-0" />
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Fast Action to Simulator */}
      <div className="p-3 rounded-lg border border-[#00B4D8]/30 bg-gradient-to-br from-[#0E1B38]/60 to-[#070D1F] space-y-2">
        <div className="text-[11px] font-semibold text-slate-100 flex items-center gap-1.5">
          <Play className="w-3 h-3 text-[#00B4D8]" />
          <span>PROBAR SIMULADOR</span>
        </div>
        <p className="text-[10px] text-slate-400 font-sans leading-relaxed">
          Interactúa con el flujo real de cobro, impresión de tickets y desconexión de red.
        </p>
        <button
          onClick={() => onSelectSection('terminal-simulator')}
          className="w-full py-1.5 rounded bg-[#00B4D8] text-[#060A17] font-semibold text-[11px] hover:bg-[#48CAE4] transition-all flex items-center justify-center gap-1.5 shadow-[0_0_12px_rgba(0,180,216,0.3)]"
        >
          <span>Abrir Terminal</span>
          {cartCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-[#060A17] text-[#00B4D8] text-[9px]">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* Peripherals Status List */}
      <div>
        <div className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider mb-2">
          ESTADO PERIFÉRICOS
        </div>
        <div className="space-y-1.5 text-[10px]">
          <div className="flex items-center justify-between p-1.5 rounded bg-[#080E21] border border-slate-800">
            <span className="text-slate-300">TM-T20III (COM1)</span>
            <span className="text-emerald-400 font-medium">READY</span>
          </div>
          <div className="flex items-center justify-between p-1.5 rounded bg-[#080E21] border border-slate-800">
            <span className="text-slate-300">Honeywell 1900</span>
            <span className="text-emerald-400 font-medium">HOOK OK</span>
          </div>
          <div className="flex items-center justify-between p-1.5 rounded bg-[#080E21] border border-slate-800">
            <span className="text-slate-300">Báscula Ariva-S</span>
            <span className="text-emerald-400 font-medium">0.000 KG</span>
          </div>
          <div className="flex items-center justify-between p-1.5 rounded bg-[#080E21] border border-slate-800">
            <span className="text-slate-300">Cajón APG RJ-11</span>
            <span className="text-slate-400 font-medium">CLOSED</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
