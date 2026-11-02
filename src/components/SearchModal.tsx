import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Cpu, Server, Database, Terminal, ArrowRight } from 'lucide-react';
import { ARCHITECTURE_LAYERS, DATABASE_TABLES } from '../data/posArchitectureData';
import { SectionId } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSection: (sectionId: SectionId) => void;
}

interface SearchItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Arquitectura' | 'Hardware' | 'Base de Datos' | 'Módulos';
  sectionId: SectionId;
  tag: string;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectSection
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Aggregate searchable items
  const allItems: SearchItem[] = [
    { id: 'sec-overview', title: 'Resumen Del Producto & Contexto', subtitle: 'Mobile Solutions POS en Windows Forms .NET', category: 'Módulos', sectionId: 'overview', tag: '[SYS.OVW]' },
    { id: 'sec-academic-docs', title: 'Documentos Académicos & Requerimientos', subtitle: 'Especificación ERS IEEE 830, Notion, Trello y manuales', category: 'Módulos', sectionId: 'academic-docs', tag: '[DOC.ACA]' },

    ...ARCHITECTURE_LAYERS.map(l => ({
      id: l.id,
      title: l.name,
      subtitle: l.description,
      category: 'Arquitectura' as const,
      sectionId: 'architecture' as SectionId,
      tag: l.code
    })),

    ...DATABASE_TABLES.map(t => ({
      id: t.name,
      title: `Tabla: ${t.name}`,
      subtitle: `${t.description} (${t.engine})`,
      category: 'Base de Datos' as const,
      sectionId: 'data-resilience' as SectionId,
      tag: `[DB.TAB]`
    }))
  ];

  const filteredItems = query.trim() === ''
    ? allItems.slice(0, 8)
    : allItems.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
        item.tag.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < filteredItems.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : filteredItems.length - 1));
    } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
      e.preventDefault();
      onSelectSection(filteredItems[selectedIndex].sectionId);
      onClose();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-[#060A17]/85 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl rounded-xl border border-[rgba(0,180,216,0.35)] bg-[#0A1128] shadow-2xl shadow-cyan-950/40 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[rgba(0,180,216,0.2)] bg-[#080E21]">
          <Search className="w-5 h-5 text-[#00B4D8] mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Buscar por módulo, protocolo, tabla SQL, periférico o código C#..."
            className="w-full bg-transparent text-sm md:text-base text-slate-100 placeholder-slate-500 focus:outline-none font-mono"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-slate-200 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-[#0E1B38] border border-slate-700 rounded">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 divide-y divide-slate-800/40 max-h-[460px]">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-slate-400 font-mono text-sm">
              No se encontraron coincidencias para &quot;{query}&quot;
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectSection(item.sectionId);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#00B4D8]/15 border border-[#00B4D8]/40 shadow-sm'
                      : 'hover:bg-slate-800/40 border border-transparent'
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="p-2 rounded bg-[#0E1B38] text-[#48CAE4] shrink-0 mt-0.5">
                      {item.category === 'Arquitectura' && <Server className="w-4 h-4" />}
                      {item.category === 'Hardware' && <Cpu className="w-4 h-4" />}
                      {item.category === 'Base de Datos' && <Database className="w-4 h-4" />}
                      {item.category === 'Módulos' && <Terminal className="w-4 h-4" />}
                    </div>
                    <div className="truncate">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-100 text-sm">{item.title}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#0077B6]/20 text-[#48CAE4] border border-[#00B4D8]/20">
                          {item.tag}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 truncate mt-0.5 font-sans">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <span className="text-[11px] font-mono text-slate-500 hidden sm:inline-block">
                      {item.category}
                    </span>
                    <ArrowRight className={`w-4 h-4 ${isSelected ? 'text-[#00B4D8]' : 'text-slate-600'}`} />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 bg-[#060D24] border-t border-[rgba(0,180,216,0.15)] flex items-center justify-between text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-3">
            <span><kbd className="px-1.5 py-0.5 bg-[#0E1B38] rounded text-slate-300">↑↓</kbd> Navegar</span>
            <span><kbd className="px-1.5 py-0.5 bg-[#0E1B38] rounded text-slate-300">↵</kbd> Seleccionar</span>
          </div>
          <span className="text-[#00B4D8]">Mobile Solutions POS Architecture Matrix</span>
        </div>
      </div>
    </div>
  );
};
