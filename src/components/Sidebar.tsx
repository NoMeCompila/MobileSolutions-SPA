import React, { useState } from 'react';
import { 
  Layers, 
  Cpu, 
  ShoppingCart, 
  Terminal, 
  Database, 
  Code, 
  Activity, 
  Rocket, 
  BookOpen, 
  Search, 
  Radio, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { SectionId } from '../types';

interface SidebarProps {
  activeSection: SectionId;
  onSelectSection: (id: SectionId) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  onOpenSearch: () => void;
}

interface NavGroup {
  label: string;
  items: {
    id: SectionId;
    title: string;
    tag: string;
    icon: React.ReactNode;
    badge?: string;
  }[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onSelectSection,
  isOpenMobile,
  onCloseMobile,
  onOpenSearch
}) => {
  const [filterQuery, setFilterQuery] = useState('');

  const navGroups: NavGroup[] = [
    {
      label: '01. CORE & OVERVIEW',
      items: [
        {
          id: 'overview',
          title: 'Resumen Ejecutivo',
          tag: '[SYS.OVW]',
          icon: <BookOpen className="w-4 h-4 text-[#00B4D8]" />,
          badge: 'v4.8'
        },
        {
          id: 'benchmarks',
          title: 'Rendimiento & SLA',
          tag: '[SYS.MET]',
          icon: <Activity className="w-4 h-4 text-[#48CAE4]" />,
          badge: '<18ms'
        }
      ]
    },
    {
      label: '02. ARQUITECTURA .NET',
      items: [
        {
          id: 'architecture',
          title: 'Matriz Multicapa WinForms',
          tag: '[ARC.LYR]',
          icon: <Layers className="w-4 h-4 text-[#00B4D8]" />
        },
        {
          id: 'hardware-hal',
          title: 'HAL & Periféricos POS',
          tag: '[HAL.ESC]',
          icon: <Cpu className="w-4 h-4 text-[#58D6F1]" />,
          badge: '6 Drivers'
        },
        {
          id: 'data-resilience',
          title: 'Persistencia & Resiliencia',
          tag: '[DAT.RES]',
          icon: <Database className="w-4 h-4 text-[#0077B6]" />,
          badge: 'WAL Mode'
        }
      ]
    },
    {
      label: '03. SIMULADORES ACTIVOS',
      items: [
        {
          id: 'terminal-simulator',
          title: 'Terminal POS en Vivo',
          tag: '[SIM.POS]',
          icon: <ShoppingCart className="w-4 h-4 text-emerald-400" />,
          badge: 'INTERACTIVO'
        },
        {
          id: 'hardware-console',
          title: 'Consola COM & Periféricos',
          tag: '[SIM.HAL]',
          icon: <Terminal className="w-4 h-4 text-amber-400" />,
          badge: 'LIVE HEX'
        }
      ]
    },
    {
      label: '04. CÓDIGO & DESPLIEGUE',
      items: [
        {
          id: 'code-repository',
          title: 'Inspector C# WinForms',
          tag: '[COD.NET]',
          icon: <Code className="w-4 h-4 text-[#94CCFF]" />,
          badge: '5 Sources'
        },
        {
          id: 'deployment',
          title: 'Despliegue & NGEN',
          tag: '[RES.DEP]',
          icon: <Rocket className="w-4 h-4 text-[#48CAE4]" />
        }
      ]
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar Container (280px fixed on desktop) */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-72 bg-[#0A1128]/95 backdrop-blur-xl border-r border-[rgba(0,180,216,0.18)] transition-transform duration-200 flex flex-col ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Quick Filter Box */}
        <div className="p-3 border-b border-[rgba(0,180,216,0.15)]">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-500" />
            <input
              type="text"
              placeholder="Filtrar secciones..."
              value={filterQuery}
              onChange={e => setFilterQuery(e.target.value)}
              className="w-full bg-[#080E21] border border-[rgba(0,180,216,0.2)] rounded px-8 py-1.5 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#00B4D8] transition-colors"
            />
            <button
              onClick={onOpenSearch}
              title="Abrir buscador global (⌘K)"
              className="absolute right-2 top-2 px-1.5 py-0.5 rounded bg-[#0E1B38] text-[9px] font-mono text-slate-400 border border-slate-700 hover:text-[#00B4D8]"
            >
              ⌘K
            </button>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {navGroups.map((group, gIdx) => {
            const filteredGroupItems = group.items.filter(item =>
              filterQuery === '' ||
              item.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
              item.tag.toLowerCase().includes(filterQuery.toLowerCase())
            );

            if (filteredGroupItems.length === 0) return null;

            return (
              <div key={gIdx} className="space-y-1.5">
                <div className="px-2 text-[10px] font-mono font-semibold tracking-wider text-[#48CAE4]/70">
                  {group.label}
                </div>
                <div className="space-y-1">
                  {filteredGroupItems.map(item => {
                    const isActive = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          onSelectSection(item.id);
                          onCloseMobile();
                        }}
                        className={`w-full text-left px-2.5 py-2 rounded text-xs transition-all flex items-center justify-between group ${
                          isActive
                            ? 'bg-[#00B4D8]/15 text-[#F8FAFC] border border-[#00B4D8]/50 shadow-[0_0_12px_rgba(0,180,216,0.25)]'
                            : 'text-slate-400 hover:text-slate-100 hover:bg-[#0E1B38]/60 border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className={`shrink-0 ${isActive ? 'text-[#00B4D8]' : 'text-slate-400 group-hover:text-[#48CAE4]'}`}>
                            {item.icon}
                          </span>
                          <span className="truncate font-sans font-medium">
                            {item.title}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0 ml-2">
                          <span className="text-[9px] font-mono text-[#00B4D8]/60">
                            {item.tag}
                          </span>
                          {item.badge && (
                            <span className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-medium ${
                              item.badge === 'INTERACTIVO'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 animate-pulse'
                                : 'bg-[#0E1B38] text-slate-300 border border-slate-700/60'
                            }`}>
                              {item.badge}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Telemetry Node Status at bottom of sidebar */}
        <div className="p-3 border-t border-[rgba(0,180,216,0.15)] bg-[#070D1F] text-[11px] font-mono">
          <div className="flex items-center justify-between text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span className="text-emerald-400 font-semibold">POS CLR 4.8</span>
            </span>
            <span className="text-slate-500 text-[10px]">x86 / x64 NGEN</span>
          </div>
          <div className="mt-2 text-[10px] text-slate-500 flex justify-between">
            <span>MEM: ~84 MB</span>
            <span className="text-[#00B4D8]">SYNC: OK</span>
          </div>
        </div>
      </aside>
    </>
  );
};
