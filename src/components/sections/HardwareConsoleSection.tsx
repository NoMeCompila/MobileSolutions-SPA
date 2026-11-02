import React, { useState } from 'react';
import { 
  Terminal, 
  Send, 
  Trash2, 
  Cpu, 
  Radio, 
  Play, 
  CheckCircle2, 
  RefreshCw, 
  Sliders,
  Tv
} from 'lucide-react';

interface LogEntry {
  id: string;
  time: string;
  port: string;
  direction: 'TX' | 'RX';
  hex: string;
  ascii: string;
}

export const HardwareConsoleSection: React.FC = () => {
  const [selectedPort, setSelectedPort] = useState('COM1');
  const [customHex, setCustomHex] = useState('1B 40');
  const [vfdMessage, setVfdMessage] = useState('BIENVENIDO A MSP');
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: '1', time: '12:00:01.120', port: 'COM1', direction: 'TX', hex: '1B 40', ascii: 'ESC @ (Init)' },
    { id: '2', time: '12:00:01.145', port: 'COM1', direction: 'RX', hex: '12', ascii: 'Status: OK' },
    { id: '3', time: '12:00:04.220', port: 'COM3', direction: 'TX', hex: '57 0D', ascii: 'W<CR> (Weight Poll)' },
    { id: '4', time: '12:00:04.238', port: 'COM3', direction: 'RX', hex: '02 31 2E 34 35 30 20 6B 67 03', ascii: 'STX 1.450 kg ETX' },
    { id: '5', time: '12:00:06.100', port: 'COM4', direction: 'TX', hex: '0C 42 49 45 4E 56 45 4E 49 44 4F', ascii: 'CLS + "BIENVENIDO"' }
  ]);

  const addLog = (port: string, direction: 'TX' | 'RX', hex: string, ascii: string) => {
    const now = new Date();
    const timeStr = `${now.toTimeString().split(' ')[0]}.${now.getMilliseconds().toString().padStart(3, '0')}`;
    setLogs(prev => [
      { id: Date.now().toString() + Math.random(), time: timeStr, port, direction, hex, ascii },
      ...prev.slice(0, 40)
    ]);
  };

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customHex.trim()) return;
    addLog(selectedPort, 'TX', customHex.trim(), 'Custom Packet');
    setTimeout(() => {
      addLog(selectedPort, 'RX', '06', 'ACK (Acknowledge)');
    }, 40);
  };

  const handleTestCommand = (port: string, name: string, hex: string, expectedRx: string, rxAscii: string) => {
    addLog(port, 'TX', hex, name);
    setTimeout(() => {
      addLog(port, 'RX', expectedRx, rxAscii);
    }, 55);
  };

  const handleSendVfd = () => {
    const hex = Array.from(new TextEncoder().encode(vfdMessage))
      .map(b => b.toString(16).toUpperCase().padStart(2, '0'))
      .join(' ');
    addLog('COM4', 'TX', `0C ${hex}`, `VFD: "${vfdMessage}"`);
    setTimeout(() => {
      addLog('COM4', 'RX', '06', 'ACK');
    }, 30);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div id="hcon-ports" className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[rgba(0,180,216,0.2)] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#00B4D8]">
            <span>TELEMETRÍA & DIAGNÓSTICO SERIAL NATIVO</span>
            <span>•</span>
            <span>[SIM.HAL.CONSOLE]</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
            Consola de Puertos COM & Telemetría de Periféricos
          </h1>
        </div>
        <span className="px-2.5 py-1 rounded bg-[#0E1B38] text-xs font-mono text-[#48CAE4] border border-[#00B4D8]/30 self-start sm:self-auto">
          WIN32 SERIALPORT EMULATOR
        </span>
      </div>

      {/* Main Grid: Controls vs Live Log */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Port Controls & Command Injector (5 columns) */}
        <div id="hcon-inject" className="lg:col-span-5 space-y-4">
          {/* Active COM Port Cards */}
          <div className="p-4 rounded-xl border border-[rgba(0,180,216,0.3)] bg-[#0A1128] space-y-3">
            <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[#00B4D8]">
                <Cpu className="w-4 h-4" />
                <span>PUERTOS COM ACTIVOS EN TERMINAL:</span>
              </span>
              <span className="text-emerald-400 text-[10px]">4 DISPONIBLES</span>
            </div>

            <div className="space-y-2">
              <div
                onClick={() => setSelectedPort('COM1')}
                className={`p-2.5 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                  selectedPort === 'COM1'
                    ? 'bg-[#0E1B38] border-[#00B4D8] shadow-[0_0_12px_rgba(0,180,216,0.3)]'
                    : 'bg-[#070D1F] border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="text-xs font-mono font-bold text-slate-100">COM1: Impresora TM-T20III</div>
                  <div className="text-[10px] text-slate-400 font-mono">115200 bps, 8N1, RTS/CTS</div>
                </div>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                  ONLINE
                </span>
              </div>

              <div
                onClick={() => setSelectedPort('COM3')}
                className={`p-2.5 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                  selectedPort === 'COM3'
                    ? 'bg-[#0E1B38] border-[#00B4D8] shadow-[0_0_12px_rgba(0,180,216,0.3)]'
                    : 'bg-[#070D1F] border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="text-xs font-mono font-bold text-slate-100">COM3: Báscula Ariva-S</div>
                  <div className="text-[10px] text-slate-400 font-mono">9600 bps, 7E1, Continuo</div>
                </div>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                  STREAMING
                </span>
              </div>

              <div
                onClick={() => setSelectedPort('COM4')}
                className={`p-2.5 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                  selectedPort === 'COM4'
                    ? 'bg-[#0E1B38] border-[#00B4D8] shadow-[0_0_12px_rgba(0,180,216,0.3)]'
                    : 'bg-[#070D1F] border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="text-xs font-mono font-bold text-slate-100">COM4: Visor VFD CD-7220</div>
                  <div className="text-[10px] text-slate-400 font-mono">9600 bps, 8N1, 20x2 char</div>
                </div>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                  READY
                </span>
              </div>
            </div>
          </div>

          {/* Quick Diagnostics Tests */}
          <div className="p-4 rounded-xl border border-[rgba(0,180,216,0.25)] bg-[#0A1128] space-y-3">
            <div className="text-xs font-mono text-slate-400">
              PRUEBAS RÁPIDAS DE COMUNICACIÓN HAL:
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleTestCommand('COM1', 'Query Printer Status', '10 04 01', '12', 'Status: Ready')}
                className="p-2 rounded bg-[#0E1B38] text-[11px] font-mono text-slate-200 hover:text-[#00B4D8] border border-slate-700 hover:border-[#00B4D8]/40 transition-all text-left"
              >
                <div className="text-white font-medium">Ping Impresora (COM1)</div>
                <div className="text-[10px] text-slate-400">DLE EOT 1 [10 04 01]</div>
              </button>

              <button
                type="button"
                onClick={() => handleTestCommand('COM1', 'Kick Drawer Solenoid', '1B 70 00 19 FA', '00', 'Drawer: OPEN')}
                className="p-2 rounded bg-[#0E1B38] text-[11px] font-mono text-slate-200 hover:text-[#00B4D8] border border-slate-700 hover:border-[#00B4D8]/40 transition-all text-left"
              >
                <div className="text-white font-medium">Pulso Gaveta (24V)</div>
                <div className="text-[10px] text-slate-400">ESC p 0 25 250</div>
              </button>

              <button
                type="button"
                onClick={() => handleTestCommand('COM3', 'Poll Scale Weight', '57 0D', '02 31 2E 34 35 30 20 6B 67 03', 'Weight: 1.450 kg')}
                className="p-2 rounded bg-[#0E1B38] text-[11px] font-mono text-slate-200 hover:text-[#00B4D8] border border-slate-700 hover:border-[#00B4D8]/40 transition-all text-left"
              >
                <div className="text-white font-medium">Leer Báscula (COM3)</div>
                <div className="text-[10px] text-slate-400">W + CR [57 0D]</div>
              </button>

              <button
                type="button"
                onClick={() => handleTestCommand('COM4', 'Clear VFD Display', '0C', '06', 'VFD Cleared')}
                className="p-2 rounded bg-[#0E1B38] text-[11px] font-mono text-slate-200 hover:text-[#00B4D8] border border-slate-700 hover:border-[#00B4D8]/40 transition-all text-left"
              >
                <div className="text-white font-medium">Limpiar VFD (COM4)</div>
                <div className="text-[10px] text-slate-400">Form Feed [0C]</div>
              </button>
            </div>
          </div>

          {/* VFD Message Injector */}
          <div className="p-4 rounded-xl border border-[rgba(0,180,216,0.25)] bg-[#0A1128] space-y-2">
            <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
              <Tv className="w-3.5 h-3.5 text-[#94CCFF]" />
              <span>ESCRIBIR MENSAJE AL VISOR VFD (LÍNEA 1):</span>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={vfdMessage}
                maxLength={20}
                onChange={e => setVfdMessage(e.target.value.toUpperCase())}
                className="flex-1 bg-[#060D24] border border-slate-700 rounded px-3 py-1.5 text-xs font-mono text-emerald-400 focus:outline-none focus:border-[#00B4D8]"
              />
              <button
                onClick={handleSendVfd}
                className="cyber-button-outline px-3 py-1.5 rounded text-xs font-mono text-[#00B4D8]"
              >
                Enviar
              </button>
            </div>
          </div>

          {/* Custom Hex Injector */}
          <form onSubmit={handleSendCustom} className="p-4 rounded-xl border border-[rgba(0,180,216,0.25)] bg-[#0A1128] space-y-2">
            <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
              <span>INYECCIÓN DIRECTA DE BYTES HEXADECIMALES ({selectedPort}):</span>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={customHex}
                onChange={e => setCustomHex(e.target.value)}
                placeholder="1B 40 1B 61 01"
                className="flex-1 bg-[#060D24] border border-slate-700 rounded px-3 py-1.5 text-xs font-mono text-[#48CAE4] focus:outline-none focus:border-[#00B4D8]"
              />
              <button
                type="submit"
                className="cyber-button-primary px-3 py-1.5 rounded text-xs font-mono flex items-center gap-1 cursor-pointer"
              >
                <Send className="w-3 h-3" />
                <span>TX</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Live Hex Telemetry Console (7 columns) */}
        <div id="hcon-hexlog" className="lg:col-span-7">
          <div className="rounded-xl border border-[rgba(0,180,216,0.3)] bg-[#060D24] overflow-hidden shadow-2xl flex flex-col h-[560px]">
            {/* Console Header */}
            <div className="px-4 py-2.5 bg-[#080E21] border-b border-[rgba(0,180,216,0.2)] flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#00B4D8]" />
                <span className="font-semibold text-white">Live Serial Telemetry Stream</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-500">{logs.length} tramas</span>
                <button
                  onClick={() => setLogs([])}
                  className="p-1 rounded text-slate-400 hover:text-rose-400 transition-colors"
                  title="Limpiar bitácora"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-4 overflow-y-auto flex-1 font-mono text-[11px] space-y-1.5 select-text">
              <div className="text-slate-500 pb-2 border-b border-slate-800 text-[10px] flex justify-between">
                <span>TIMESTAMP       DIR  PORT   HEX PAYLOAD</span>
                <span>ASCII DECODE</span>
              </div>

              {logs.map(log => {
                const isTx = log.direction === 'TX';
                return (
                  <div
                    key={log.id}
                    className={`flex items-start justify-between py-1 px-1.5 rounded transition-colors ${
                      isTx ? 'bg-[#00B4D8]/5 text-slate-200' : 'bg-emerald-500/5 text-emerald-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-slate-500">{log.time}</span>
                      <span className={`px-1 rounded text-[9px] font-bold ${
                        isTx ? 'bg-[#0077B6]/30 text-[#48CAE4]' : 'bg-emerald-500/30 text-emerald-300'
                      }`}>
                        {log.direction}
                      </span>
                      <span className="text-[#00B4D8]">{log.port}</span>
                      <span className="font-semibold">{log.hex}</span>
                    </div>
                    <span className="text-slate-400 text-[10px] italic">{log.ascii}</span>
                  </div>
                );
              })}
            </div>

            {/* Footer with Baud Rate Status */}
            <div className="px-4 py-2 bg-[#080E21] border-t border-[rgba(0,180,216,0.15)] flex items-center justify-between text-[10px] font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>BAUD: 115200 / 9600 bps</span>
              </div>
              <span className="text-[#00B4D8]">HANDSHAKE: RTS/CTS HARDWARE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
