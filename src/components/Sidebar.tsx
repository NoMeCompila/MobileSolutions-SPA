import React from 'react';
import {
  Layers,
  Database,
  Code,
  GraduationCap,
  MonitorCheck
} from 'lucide-react';
import { SectionId } from '../types';

interface SidebarProps {
  activeSection: SectionId;
  onSelectSection: (id: SectionId) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  onOpenSearch?: () => void;
}

interface NavGroup {
  label: string;
  items: {
    id: SectionId;
    title: string;
    icon: React.ReactNode;
  }[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onSelectSection,
  isOpenMobile,
  onCloseMobile
}) => {
  const navGroups: NavGroup[] = [
    {
      label: '01. CORE & OVERVIEW',
      items: [
        {
          id: 'overview',
          title: 'Resumen Del Producto',
          icon: <MonitorCheck className="w-5.5 h-5.5 text-[#00B4D8]" />
        },
        {
          id: 'academic-docs',
          title: 'Documentos Académicos',
          icon: <GraduationCap className="w-5.5 h-5.5 text-[#48CAE4]" />
        }
      ]
    },
    {
      label: '02. ARQUITECTURA .NET',
      items: [
        {
          id: 'architecture',
          title: 'Arquitectura de 3 Capas',
          icon: <Layers className="w-5.5 h-5.5 text-[#00B4D8]" />
        },
        {
          id: 'data-resilience',
          title: 'Modelo de Base de Datos',
          icon: <Database className="w-5.5 h-5.5 text-[#0077B6]" />
        }
      ]
    },
    {
      label: '03. CÓDIGO & DESARROLLO',
      items: [
        {
          id: 'code-repository',
          title: 'Código y Desarrollo',
          icon: <Code className="w-5.5 h-5.5 text-[#94CCFF]" />
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

      {/* Sidebar Container (340px width to ensure full section text visibility) */}
      <aside
        className={`fixed top-20 sm:top-24 bottom-0 left-0 z-40 w-[340px] bg-[#0A1128]/95 backdrop-blur-xl border-r border-[rgba(0,180,216,0.22)] shadow-[4px_0_24px_rgba(0,0,0,0.35)] transition-transform duration-200 flex flex-col justify-between ${isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
      >
        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-6 sm:py-8 space-y-8">
          {navGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-3">
              {/* Category Header: Larger, bolder and clearer */}
              <div className="px-2 pb-2 text-xs sm:text-[13px] font-mono font-extrabold tracking-wider text-[#00B4D8] uppercase border-b border-[rgba(0,180,216,0.18)]">
                {group.label}
              </div>

              {/* Category Items */}
              <div className="space-y-2">
                {group.items.map(item => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelectSection(item.id);
                        onCloseMobile();
                      }}
                      className={`w-full text-left px-3.5 py-3.5 rounded-xl transition-all flex items-center group cursor-pointer ${isActive
                        ? 'bg-[#00B4D8]/20 text-white border border-[#00B4D8]/60 shadow-[0_0_16px_rgba(0,180,216,0.3)] font-semibold'
                        : 'text-slate-300 hover:text-white hover:bg-[#0E1B38]/80 border border-transparent font-medium'
                        }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0 w-full">
                        <span className={`shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-[#00B4D8]' : 'text-slate-400 group-hover:text-[#48CAE4]'}`}>
                          {item.icon}
                        </span>
                        <span className="font-sans text-[15px] sm:text-base leading-snug tracking-tight whitespace-nowrap">
                          {item.title}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
};
