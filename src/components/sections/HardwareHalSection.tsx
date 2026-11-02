import React, { useState } from 'react';
import { 
  Cpu, 
  Printer, 
  Barcode, 
  Scale, 
  CreditCard, 
  Tv, 
  Radio, 
  Terminal, 
  CheckCircle2, 
  Info,
  ShieldAlert
} from 'lucide-react';
import { HARDWARE_PERIPHERALS } from '../../data/posArchitectureData';
import { HardwarePeripheral } from '../../types';

export const HardwareHalSection: React.FC = () => {
  const [selectedPeripheral, setSelectedPeripheral] = useState<HardwarePeripheral>(HARDWARE_PERIPHERALS[0]);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  const getIconForType = (type: HardwarePeripheral['type']) => {
    switch (type) {
      case 'printer': return <Printer className="w-5 h-5 text-[#00B4D8]" />;
      case 'scanner': return <Barcode className="w-5 h-5 text-[#48CAE4]" />;
      case 'scale': return <Scale className="w-5 h-5 text-emerald-400" />;
      case 'display': return <Tv className="w-5 h-5 text-[#94CCFF]" />;
      case 'pinpad': return <CreditCard className="w-5 h-5 text-purple-400" />;
      case 'drawer': return <Cpu className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-200">
      {/* Header */}
      <div id="hal-drivers" className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[rgba(0,180,216,0.2)] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#00B4D8]">
            <span>CAPA DE CONTROLADORES NATIVOS</span>
            <span>•</span>
            <span>[SYS.HAL.DRIVERS]</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
            Hardware Abstraction Layer (HAL) & Periféricos POS
          </h1>
        </div>
        <span className="px-2.5 py-1 rounded bg-[#0E1B38] text-xs font-mono text-[#48CAE4] border border-[#00B4D8]/30 self-start sm:self-auto">
          PROTOCOLOS ESC/POS • OPOS • RS-232 • RAWINPUT
        </span>
      </div>

      {/* Peripherals Selector Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {HARDWARE_PERIPHERALS.map((p) => {
          const isSelected = selectedPeripheral.id === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setSelectedPeripheral(p)}
              className={`p-3 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between h-28 ${
                isSelected
                  ? 'bg-[#0E1B38] border-[#00B4D8] shadow-[0_0_15px_rgba(0,180,216,0.3)]'
                  : 'bg-[#0A1128]/70 border-[rgba(0,180,216,0.18)] hover:border-[#48CAE4]/40 hover:bg-[#0E1B38]/50'
              }`}
            >
              <div className="flex items-center justify-between">
                {getIconForType(p.type)}
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div>
                <div className="font-display font-semibold text-xs text-slate-100 line-clamp-1">
                  {p.name.split(' ')[0]}
                </div>
                <div className="text-[10px] font-mono text-slate-400 truncate">
                  {p.driverType}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Peripheral Deep Dive */}
      <div className="p-6 rounded-xl border border-[rgba(0,180,216,0.3)] bg-gradient-to-br from-[#0A1128] to-[#070D1F] space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(0,180,216,0.2)] pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-[#0E1B38] border border-[#00B4D8]/30">
              {getIconForType(selectedPeripheral.type)}
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#00B4D8] uppercase">
                PERIFÉRICO SELECCIONADO
              </span>
              <h2 className="font-display text-xl font-bold text-white">
                {selectedPeripheral.name}
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-xs font-mono">
            <span className="px-2.5 py-1 rounded bg-[#060D24] text-[#48CAE4] border border-slate-700">
              Puerto: {selectedPeripheral.interfacePort}
            </span>
            {selectedPeripheral.baudRate && (
              <span className="px-2.5 py-1 rounded bg-[#060D24] text-slate-300 border border-slate-700">
                {selectedPeripheral.baudRate}
              </span>
            )}
            <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>DRIVER NATIVO .NET</span>
            </span>
          </div>
        </div>

        {/* Description & Technical Rationale */}
        <div className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
          {selectedPeripheral.description}
        </div>

        {/* Command Set & Hex Table */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-300">
            <span className="flex items-center gap-1.5 text-[#00B4D8] font-semibold">
              <Terminal className="w-4 h-4" />
              <span>JUEGO DE COMANDOS & TRAMAS DE BYTES DIRECTAS:</span>
            </span>
            <span className="text-slate-500">Haz clic en una trama para copiar el Hex</span>
          </div>

          <div className="overflow-x-auto rounded-lg border border-[rgba(0,180,216,0.2)] bg-[#060D24]">
            <table className="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr className="bg-[#0A1128] border-b border-[rgba(0,180,216,0.2)] text-[#48CAE4]">
                  <th className="py-2.5 px-4 font-semibold">Función / Comando</th>
                  <th className="py-2.5 px-4 font-semibold">Trama Hexadecimal (Bytes)</th>
                  <th className="py-2.5 px-4 font-semibold">Descripción del Protocolo</th>
                  <th className="py-2.5 px-4 text-right font-semibold">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {selectedPeripheral.commands.map((cmd, idx) => (
                  <tr key={idx} className="hover:bg-[#00B4D8]/5 transition-colors">
                    <td className="py-3 px-4 font-medium text-slate-200">
                      {cmd.name}
                    </td>
                    <td className="py-3 px-4 text-[#00B4D8] font-bold">
                      <code>{cmd.hex}</code>
                    </td>
                    <td className="py-3 px-4 text-slate-300 font-sans text-xs">
                      {cmd.description}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleCopyHex(cmd.hex)}
                        className="px-2 py-1 rounded bg-[#0E1B38] text-[10px] text-slate-300 hover:text-[#48CAE4] border border-slate-700 hover:border-[#00B4D8]/40 transition-all"
                      >
                        {copiedHex === cmd.hex ? '¡Copiado!' : 'Copiar'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Hardware Isolation Notice */}
        <div className="p-4 rounded-lg bg-[#0E1B38]/60 border border-[rgba(0,180,216,0.2)] flex items-start gap-3 text-xs font-sans text-slate-300">
          <Info className="w-4 h-4 text-[#00B4D8] shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-white">Aislamiento por Concurrencia de Hilos:</strong> Todos los periféricos ejecutan sus operaciones de lectura y escritura en hilos dedicados utilizando <code className="font-mono text-[#48CAE4]">System.Threading.Tasks</code> y bloqueos <code className="font-mono text-[#48CAE4]">lock(_syncLock)</code> para garantizar que ninguna impresora sin papel o balanza desconectada detenga el hilo principal de la interfaz WinForms.
          </div>
        </div>
      </div>
    </div>
  );
};
