import React, { useState } from 'react';
import { 
  Layers, 
  ShieldCheck, 
  FileCode, 
  Check, 
  Info,
  Target,
  Network,
  Cpu,
  Workflow,
  ExternalLink
} from 'lucide-react';
import { ARCHITECTURE_LAYERS } from '../../data/posArchitectureData';
import { ArchitectureLayer } from '../../types';

export const ArchitectureSection: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState<ArchitectureLayer>(ARCHITECTURE_LAYERS[0]);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Section Header */}
      <div id="arc-layers" className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[rgba(0,180,216,0.2)] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#00B4D8]">
            <span>ARQUITECTURA DE 3 CAPAS (UI, BLL, DAL)</span>
            <span>•</span>
            <span>[ARC.3TIER.NET]</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
            Arquitectura de 3 Capas
          </h1>
        </div>
        <span className="px-2.5 py-1 rounded bg-[#0E1B38] text-xs font-mono text-[#48CAE4] border border-[#00B4D8]/30 self-start sm:self-auto">
          PATRÓN 3 CAPAS + ADO.NET + MATERIALSKIN
        </span>
      </div>

      {/* Interactive Layer Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: 3 Layer Selection Cards (4 columns) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-mono text-slate-400 mb-2 flex items-center justify-between">
            <span>CAPAS DEL SISTEMA:</span>
            <span className="text-[#00B4D8]">{ARCHITECTURE_LAYERS.length} Capas</span>
          </div>

          <div className="space-y-3">
            {ARCHITECTURE_LAYERS.map((layer, index) => {
              const isSelected = selectedLayer.id === layer.id;
              return (
                <div
                  key={layer.id}
                  onClick={() => setSelectedLayer(layer)}
                  className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#0E1B38] border-[#00B4D8] shadow-[0_0_20px_rgba(0,180,216,0.3)] translate-x-1'
                      : 'bg-[#0A1128]/80 border-[rgba(0,180,216,0.2)] hover:border-[#48CAE4]/60 hover:bg-[#0E1B38]/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-mono font-bold text-[#00B4D8]">
                        0{index + 1}
                      </span>
                      <span className="font-display font-semibold text-sm text-slate-100">
                        {layer.name}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#060D24] text-[#48CAE4] border border-slate-700">
                      {layer.code}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-sans mt-2 line-clamp-2 leading-relaxed">
                    {layer.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Layer Drill-Down Details (8 columns) */}
        <div className="lg:col-span-8">
          <div className="p-6 rounded-xl border border-[rgba(0,180,216,0.35)] bg-gradient-to-br from-[#0A1128] to-[#070D1F] space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#00B4D8]/5 rounded-full blur-3xl pointer-events-none" />

            {/* Header of Selected Layer */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[rgba(0,180,216,0.2)] pb-4">
              <div>
                <span className="text-[10px] font-mono text-[#00B4D8] uppercase tracking-wider">
                  DETALLE Y ANÁLISIS DE LA CAPA
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-0.5">
                  {selectedLayer.name}
                </h3>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#0077B6]/25 text-[#48CAE4] border border-[#00B4D8]/30 self-start sm:self-auto">
                {selectedLayer.code}
              </span>
            </div>

            {/* Section 1: ¿De qué se trata? */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-mono text-[#00B4D8]">
                <Info className="w-3.5 h-3.5 text-[#48CAE4]" />
                <span className="font-bold">¿DE QUÉ SE TRATA ESTA CAPA?</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed pl-5 border-l-2 border-[#00B4D8]/30">
                {selectedLayer.description}
              </p>
            </div>

            {/* Section 2: ¿Para qué sirve? */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <Target className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-bold">¿PARA QUÉ SIRVE?</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed pl-5 border-l-2 border-emerald-500/30">
                {selectedLayer.purpose}
              </p>
            </div>

            {/* Section 3: ¿Cómo se relaciona con las demás? */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-mono text-[#94CCFF]">
                <Network className="w-3.5 h-3.5 text-[#94CCFF]" />
                <span className="font-bold">¿CÓMO SE RELACIONA CON LAS DEMÁS CAPAS?</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed pl-5 border-l-2 border-[#94CCFF]/30">
                {selectedLayer.relations}
              </p>
            </div>

            {/* Core Responsibilities */}
            <div>
              <div className="text-xs font-mono text-slate-400 mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>RESPONSABILIDADES Y TAREAS CLAVE:</span>
              </div>
              <ul className="space-y-2 text-xs font-sans text-slate-300">
                {selectedLayer.responsibilities.map((resp, rIdx) => (
                  <li key={rIdx} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Assemblies DLLs & Technologies */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-[rgba(0,180,216,0.15)]">
              <div>
                <div className="text-xs font-mono text-slate-400 mb-2 flex items-center gap-1.5">
                  <FileCode className="w-3.5 h-3.5 text-[#00B4D8]" />
                  <span>ENSAMBLADOS .NET:</span>
                </div>
                <div className="space-y-1.5">
                  {selectedLayer.assemblies.map((assembly, aIdx) => (
                    <div
                      key={aIdx}
                      className="p-2 rounded bg-[#060D24] border border-slate-800 text-xs font-mono text-[#48CAE4] flex items-center justify-between"
                    >
                      <span className="truncate">{assembly}</span>
                      <span className="text-[9px] text-slate-500 uppercase">.NET Assembly</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs font-mono text-slate-400 mb-2 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-[#94CCFF]" />
                  <span>TECNOLOGÍAS / COMPONENTES:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedLayer.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-1 rounded bg-[#0E1B38] text-[11px] font-mono text-[#94CCFF] border border-[rgba(0,180,216,0.25)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Classes & Interfaces */}
            <div>
              <div className="text-xs font-mono text-slate-400 mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#00B4D8]" />
                <span>CLASES Y SERVICIOS PRINCIPALES:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedLayer.interfaces.map((iface, iIdx) => (
                  <span
                    key={iIdx}
                    className="px-2.5 py-1 rounded bg-[#060D24] text-xs font-mono text-[#48CAE4] border border-slate-800"
                  >
                    {iface}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive 3-Tier Architecture Diagram (Archify Engine) */}
      <div className="p-6 rounded-xl border border-[rgba(0,180,216,0.3)] bg-gradient-to-br from-[#0A1128] to-[#070D1F] space-y-4 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#00B4D8]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[rgba(0,180,216,0.2)] pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#00B4D8]">
              <Workflow className="w-3.5 h-3.5 text-[#48CAE4]" />
              <span>DIAGRAMA ESTRUCTURAL • ARCHIFY ENGINE</span>
              <span>•</span>
              <span>[3-TIER ARCHITECTURE]</span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white mt-1">
              Topología de 3 Niveles: Flujo y Relación Entre Capas
            </h2>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <a
              href="/mobile-solutions-3layers.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0E1B38] text-xs font-mono text-[#48CAE4] border border-[#00B4D8]/30 hover:bg-[#00B4D8]/20 transition-all shadow-sm"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Abrir en Pantalla Completa</span>
            </a>
          </div>
        </div>

        <p className="text-xs text-slate-300 font-sans leading-relaxed">
          Diagrama interactivo de 3 niveles generado con Archify en estilo <em>Blueprint Dark Mode</em>. Modela la relación vertical descendente estricta entre la <strong>Capa de Presentación</strong> (Nivel 1), la <strong>Capa de Lógica de Negocio</strong> (Nivel 2) y la <strong>Capa de Acceso a Datos</strong> (Nivel 3), garantizando la separación de incumbencias y la resiliencia transaccional.
        </p>

        {/* Embedded Interactive Viewer */}
        <div className="w-full h-[620px] rounded-lg border border-[rgba(0,180,216,0.25)] overflow-hidden bg-[#050B1A] shadow-inner relative">
          <iframe
            src="/mobile-solutions-3layers.html?theme=dark&embed=1"
            title="Diagrama 3 Capas Mobile Solutions POS"
            className="w-full h-full border-0"
          />
        </div>
      </div>
    </div>
  );
};
