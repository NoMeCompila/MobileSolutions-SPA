import React, { useState } from 'react';
import { 
  Layers, 
  Cpu, 
  Database, 
  Server, 
  Workflow, 
  ChevronRight, 
  ShieldCheck, 
  FileCode, 
  Check, 
  ArrowDown, 
  ArrowRight,
  Radio
} from 'lucide-react';
import { ARCHITECTURE_LAYERS } from '../../data/posArchitectureData';
import { ArchitectureLayer } from '../../types';

export const ArchitectureSection: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState<ArchitectureLayer>(ARCHITECTURE_LAYERS[0]);
  const [activeStep, setActiveStep] = useState<number>(0);

  const workflowSteps = [
    {
      step: '01',
      title: 'Captura RawInput (Láser)',
      tier: 'Presentation / Win32',
      detail: 'El lector envía trama HID. El Hook intercepta WM_INPUT en 2ms sin requerir foco en pantalla.',
      badge: '2ms'
    },
    {
      step: '02',
      title: 'Búsqueda Catálogo (SQLite)',
      tier: 'Data Persistence',
      detail: 'Consulta parametrizada por índice IX_Productos_CodigoPrincipal en la base de datos local SQLite WAL.',
      badge: '<1ms'
    },
    {
      step: '03',
      title: 'Motor de Precios & Impuestos',
      tier: 'Core Business Logic',
      detail: 'Aplica reglas de mayoreo, promociones 2x1, cálculo de IVA (16%) y suma total al estado del carrito.',
      badge: '1ms'
    },
    {
      step: '04',
      title: 'Cobro & Firma Transaccional',
      tier: 'Resilience Journal',
      detail: 'Escritura atómica en SQLite con firma criptográfica HMAC-SHA256 para prevenir alteración de folios.',
      badge: '3ms'
    },
    {
      step: '05',
      title: 'Disparo HAL Periféricos',
      tier: 'Hardware Abstraction',
      detail: 'Transmisión de bytes ESC/POS a COM1 (impresora), pulso 24V al solenoide de la gaveta y visor VFD.',
      badge: '15ms'
    },
    {
      step: '06',
      title: 'Transmisión Delta Asíncrona',
      tier: 'Sync Cloud Gateway',
      detail: 'El worker en background empaqueta en GZip y envía hacia SQL Server central sin congelar la interfaz.',
      badge: 'Async'
    }
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-200">
      {/* Section Header */}
      <div id="arc-layers" className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[rgba(0,180,216,0.2)] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#00B4D8]">
            <span>ARQUITECTURA MULTICAPA DESACOPLADA</span>
            <span>•</span>
            <span>[ARC.LYR.MATRIX]</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
            Matriz de Arquitectura N-Tier (.NET Windows Forms)
          </h1>
        </div>
        <span className="px-2.5 py-1 rounded bg-[#0E1B38] text-xs font-mono text-[#48CAE4] border border-[#00B4D8]/30 self-start sm:self-auto">
          PATRÓN MVP + REPOSITORY + HAL FACTORY
        </span>
      </div>

      {/* Interactive Layer Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Layer Stack (5 columns) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono text-slate-400 mb-2 flex items-center justify-between">
            <span>SELECCIONA UNA CAPA ARQUITECTÓNICA:</span>
            <span className="text-[#00B4D8]">{ARCHITECTURE_LAYERS.length} Capas</span>
          </div>

          <div className="space-y-2.5">
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
                  <p className="text-xs text-slate-400 font-sans mt-1.5 line-clamp-2">
                    {layer.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Layer Drill-Down Details (7 columns) */}
        <div className="lg:col-span-7">
          <div className="p-6 rounded-xl border border-[rgba(0,180,216,0.35)] bg-gradient-to-br from-[#0A1128] to-[#070D1F] space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00B4D8]/5 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between border-b border-[rgba(0,180,216,0.2)] pb-4">
              <div>
                <span className="text-[10px] font-mono text-[#00B4D8] uppercase tracking-wider">
                  DETALLE DE ENSAMBLADOS Y CONTRATOS
                </span>
                <h3 className="font-display text-xl font-bold text-white mt-0.5">
                  {selectedLayer.name}
                </h3>
              </div>
              <span className="text-xs font-mono px-2 py-1 rounded bg-[#0077B6]/25 text-[#48CAE4] border border-[#00B4D8]/30">
                {selectedLayer.code}
              </span>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              {selectedLayer.description}
            </p>

            {/* Assemblies DLLs */}
            <div>
              <div className="text-xs font-mono text-slate-400 mb-2 flex items-center gap-1.5">
                <FileCode className="w-3.5 h-3.5 text-[#00B4D8]" />
                <span>ENSAMBLADOS .NET (.DLL / .EXE):</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedLayer.assemblies.map((assembly, aIdx) => (
                  <div
                    key={aIdx}
                    className="p-2.5 rounded bg-[#060D24] border border-slate-800 text-xs font-mono text-slate-200 flex items-center justify-between"
                  >
                    <span className="text-[#48CAE4] truncate">{assembly}</span>
                    <span className="text-[9px] text-slate-500 uppercase">IL Assembly</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Responsibilities */}
            <div>
              <div className="text-xs font-mono text-slate-400 mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>RESPONSABILIDADES DE DISEÑO:</span>
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

            {/* Interfaces & Contracts */}
            <div>
              <div className="text-xs font-mono text-slate-400 mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#94CCFF]" />
                <span>INTERFACES & INYECCIÓN DE DEPENDENCIAS (IoC):</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedLayer.interfaces.map((iface, iIdx) => (
                  <span
                    key={iIdx}
                    className="px-2.5 py-1 rounded bg-[#0E1B38] text-xs font-mono text-[#00B4D8] border border-[rgba(0,180,216,0.3)]"
                  >
                    {iface}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transactional Workflow Sequence (Interactive Pipeline) */}
      <div id="arc-cycle" className="p-6 rounded-xl border border-[rgba(0,180,216,0.25)] bg-[#0A1128]/90 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="text-xs font-mono text-[#00B4D8]">[ARC.FLOW.SEQUENCE]</div>
            <h2 className="font-display text-xl font-bold text-white">
              Flujo Transaccional de Alta Velocidad (Láser a Ticket)
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            LATENCIA TOTAL DE PASO: <strong className="text-[#00B4D8]">&lt; 25 ms</strong>
          </span>
        </div>

        <p className="text-xs text-slate-300 font-sans leading-relaxed">
          Haz clic en cada paso para inspeccionar cómo viaja el paquete de datos a través de las capas sin bloquear el hilo principal de la UI:
        </p>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {workflowSteps.map((ws, idx) => {
            const isActive = activeStep === idx;
            return (
              <div
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                  isActive
                    ? 'bg-[#0E1B38] border-[#00B4D8] shadow-[0_0_15px_rgba(0,180,216,0.35)]'
                    : 'bg-[#070D1F] border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                  <span className="text-[#00B4D8] font-bold">PASO {ws.step}</span>
                  <span className="px-1.5 py-0.2 rounded bg-[#0A1128] text-[#48CAE4] text-[10px] border border-slate-800">
                    {ws.badge}
                  </span>
                </div>
                <h4 className="font-display font-semibold text-sm text-slate-100">
                  {ws.title}
                </h4>
                <div className="text-[10px] font-mono text-slate-500 mt-0.5">
                  {ws.tier}
                </div>
                <p className="text-xs text-slate-300 font-sans mt-2 leading-relaxed">
                  {ws.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
