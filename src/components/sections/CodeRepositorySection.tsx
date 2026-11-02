import React, { useState } from 'react';
import { Code, FileCode, CheckCircle2, Terminal, Info, Layers } from 'lucide-react';
import { CODE_SNIPPETS } from '../../data/posArchitectureData';
import { CodeBlock } from '../CodeBlock';

export const CodeRepositorySection: React.FC = () => {
  const [selectedSnippet, setSelectedSnippet] = useState(CODE_SNIPPETS[0]);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div id="cod-escpos" className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[rgba(0,180,216,0.2)] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#00B4D8]">
            <span>INSPECTOR DE CÓDIGO FUENTE .NET</span>
            <span>•</span>
            <span>[SYS.CODE.INSPECTOR]</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
            Repositorio C# & Controladores Críticos
          </h1>
        </div>
        <span className="px-2.5 py-1 rounded bg-[#0E1B38] text-xs font-mono text-[#48CAE4] border border-[#00B4D8]/30 self-start sm:self-auto">
          C# 9.0 • SYSTEM.IO.PORTS • WIN32 RAWINPUT
        </span>
      </div>

      {/* Code File Tabs */}
      <div className="flex flex-wrap gap-2">
        {CODE_SNIPPETS.map(file => {
          const isSelected = selectedSnippet.id === file.id;
          return (
            <button
              key={file.id}
              onClick={() => setSelectedSnippet(file)}
              className={`px-3.5 py-2 rounded-lg border text-xs font-mono transition-all flex items-center gap-2 cursor-pointer ${
                isSelected
                  ? 'bg-[#0E1B38] border-[#00B4D8] text-white shadow-[0_0_12px_rgba(0,180,216,0.3)]'
                  : 'bg-[#0A1128]/80 border-[rgba(0,180,216,0.2)] text-slate-400 hover:text-slate-200 hover:bg-[#0E1B38]/50'
              }`}
            >
              <FileCode className={`w-4 h-4 ${isSelected ? 'text-[#00B4D8]' : 'text-slate-500'}`} />
              <span className="font-medium">{file.filename}</span>
            </button>
          );
        })}
      </div>

      {/* Code Details & Architecture Note */}
      <div className="p-4 rounded-xl border border-[rgba(0,180,216,0.25)] bg-[#0A1128] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
        <div>
          <span className="text-[#00B4D8] font-semibold">{selectedSnippet.assembly}</span>
          <p className="text-slate-300 font-sans mt-0.5">{selectedSnippet.description}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="px-2 py-0.5 rounded bg-[#060D24] text-slate-400 border border-slate-700">
            {selectedSnippet.linesOfCode} Líneas
          </span>
          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            THREAD-SAFE
          </span>
        </div>
      </div>

      {/* Code Block Render */}
      <CodeBlock
        filename={selectedSnippet.filename}
        language={selectedSnippet.language}
        code={selectedSnippet.code}
        assembly={selectedSnippet.assembly}
        namespace={selectedSnippet.namespace}
      />
    </div>
  );
};
