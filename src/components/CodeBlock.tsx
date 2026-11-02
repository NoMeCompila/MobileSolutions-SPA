import React, { useState } from 'react';
import { Copy, Check, Terminal, FileCode } from 'lucide-react';

interface CodeBlockProps {
  filename: string;
  language: string;
  code: string;
  assembly?: string;
  namespace?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  filename,
  language,
  code,
  assembly,
  namespace
}) => {
  const [copied, setCopied] = useState(false);
  const [showHex, setShowHex] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.trim().split('\n');

  return (
    <div className="rounded-lg border border-[rgba(0,180,216,0.25)] bg-[#070D1F] overflow-hidden shadow-xl shadow-black/50">
      {/* Top Header Tab */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-[#0A1128] border-b border-[rgba(0,180,216,0.18)] text-xs font-mono">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <div className="flex items-center gap-2 pl-2 border-l border-slate-700/60">
            <FileCode className="w-4 h-4 text-[#00B4D8]" />
            <span className="font-semibold text-slate-100">{filename}</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#0077B6]/30 text-[#48CAE4] border border-[#00B4D8]/30">
              {language.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-1 sm:mt-0">
          {assembly && (
            <span className="text-[11px] text-slate-400 hidden md:inline-block">
              Assembly: <span className="text-[#48CAE4]">{assembly}</span>
            </span>
          )}
          <button
            onClick={() => setShowHex(!showHex)}
            className="px-2 py-1 rounded bg-[#0E1B38] text-[11px] text-slate-300 hover:text-[#48CAE4] border border-[rgba(0,180,216,0.2)] transition-colors flex items-center gap-1"
          >
            <Terminal className="w-3 h-3 text-[#00B4D8]" />
            <span>{showHex ? 'Modo Código' : 'Hex Dump Mode'}</span>
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#00B4D8]/15 hover:bg-[#00B4D8]/25 text-[#48CAE4] border border-[#00B4D8]/40 transition-all font-mono text-[11px]"
            title="Copiar código al portapapeles"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copiado</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#48CAE4]" />
                <span>Copiar</span>
              </>
            )}
          </button>
        </div>
      </div>

      {namespace && (
        <div className="px-4 py-1.5 bg-[#060D24] border-b border-slate-800/80 text-[11px] font-mono text-slate-400 flex items-center justify-between">
          <span>Namespace: <strong className="text-slate-300">{namespace}</strong></span>
          <span className="text-slate-500">{lines.length} líneas</span>
        </div>
      )}

      {/* Code Body */}
      <div className="p-4 overflow-x-auto text-[13px] leading-relaxed font-mono bg-[#050A19]/90 max-h-[520px] select-text">
        {showHex ? (
          <div className="text-slate-400 space-y-1">
            <div className="text-[11px] text-[#48CAE4] pb-2 border-b border-slate-800">
              Offset(h)  -- Hexadecimal Representation --                 ASCII
            </div>
            {lines.slice(0, 30).map((line, idx) => {
              const offset = (idx * 16).toString(16).padStart(8, '0');
              const bytes = Array.from(new TextEncoder().encode(line.substring(0, 16)));
              const hexBytes = bytes.map(b => b.toString(16).padStart(2, '0').toUpperCase()).join(' ');
              const ascii = line.substring(0, 16).replace(/[^\x20-\x7E]/g, '.');
              return (
                <div key={idx} className="flex gap-4 hover:bg-[#00B4D8]/5 px-1 py-0.5 rounded">
                  <span className="text-[#00B4D8]/60 select-none">{offset}</span>
                  <span className="text-slate-300 w-96 font-medium">{hexBytes.padEnd(48, ' ')}</span>
                  <span className="text-slate-400">{ascii}</span>
                </div>
              );
            })}
          </div>
        ) : (
          <table className="w-full border-collapse">
            <tbody>
              {lines.map((line, index) => {
                const lineNum = index + 1;
                // Basic syntax coloring highlights for C#
                const isComment = line.trim().startsWith('//') || line.trim().startsWith('///') || line.trim().startsWith('/*') || line.trim().startsWith('*');
                const isDirective = line.trim().startsWith('using ') || line.trim().startsWith('namespace ');
                
                return (
                  <tr key={index} className="hover:bg-[#00B4D8]/5 transition-colors group">
                    <td className="w-10 pr-4 text-right text-slate-600 select-none text-[12px] group-hover:text-slate-400 border-r border-slate-800/80">
                      {lineNum}
                    </td>
                    <td className="pl-4 whitespace-pre">
                      {isComment ? (
                        <span className="text-slate-500 italic">{line}</span>
                      ) : isDirective ? (
                        <span className="text-[#48CAE4] font-medium">{line}</span>
                      ) : (
                        <span className="text-slate-200">
                          {line
                            .split(/(public|private|protected|internal|class|struct|sealed|static|readonly|async|await|void|string|int|long|byte|bool|decimal|var|new|return|if|else|foreach|using|lock)/g)
                            .map((part, pIdx) => {
                              if (['public','private','protected','internal','class','struct','sealed','static','readonly','async','await','void','string','int','long','byte','bool','decimal','var','new','return','if','else','foreach','using','lock'].includes(part)) {
                                return <span key={pIdx} className="text-[#00B4D8] font-semibold">{part}</span>;
                              }
                              if (part.includes('"')) {
                                return <span key={pIdx} className="text-amber-300">{part}</span>;
                              }
                              return part;
                            })}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
