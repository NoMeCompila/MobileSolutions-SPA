import React from 'react';
import { 
  Cpu, 
  Zap, 
  Database, 
  ShieldCheck, 
  Activity, 
  Layers, 
  Terminal, 
  CheckCircle, 
  TrendingUp,
  Server,
  ArrowRight,
  HardDrive
} from 'lucide-react';
import { SYSTEM_META } from '../../data/posArchitectureData';
import { SectionId } from '../../types';

interface OverviewSectionProps {
  onSelectSection: (id: SectionId) => void;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({ onSelectSection }) => {
  return (
    <div className="space-y-10 animate-in fade-in duration-200">
      {/* Hero Header */}
      <div id="ovw-top" className="relative p-6 sm:p-8 rounded-xl border border-[rgba(0,180,216,0.28)] bg-gradient-to-br from-[#0A1128]/90 via-[#0B1530]/80 to-[#060A17] overflow-hidden shadow-2xl">
        {/* Background glow and coordinate label */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00B4D8]/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute top-4 right-4 text-[10px] font-mono text-[#00B4D8]/60 border border-[#00B4D8]/30 px-2 py-0.5 rounded bg-[#060D24]">
          COORD: [SYS.POS.01]
        </div>

        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0077B6]/25 border border-[#00B4D8]/40 text-[#48CAE4] text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>ARQUITECTURA DE SOFTWARE & RECURSOS CLAVE</span>
          </div>

          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white leading-tight">
            Mobile Solutions POS
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00B4D8] via-[#48CAE4] to-[#94CCFF]">
              Windows Forms .NET Matrix
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
            Plataforma de Punto de Venta de misión crítica orientada a retail de alto volumen.
            Combina la inmediatez de <strong>Windows Forms con aceleración GDI+</strong>, una capa de abstracción
            de periféricos nativa (<strong>ESC/POS, RS-232, OPOS</strong>) y una arquitectura <strong>offline-first</strong> con SQLite en modo WAL y sincronización asíncrona hacia SQL Server.
          </p>

          <div className="pt-2 flex flex-wrap gap-3 font-mono text-xs">
            <button
              onClick={() => onSelectSection('terminal-simulator')}
              className="cyber-button-primary px-4 py-2.5 rounded flex items-center gap-2 shadow-lg cursor-pointer"
            >
              <Zap className="w-4 h-4" />
              <span>Probar Simulador Interactivo</span>
            </button>
            <button
              onClick={() => onSelectSection('architecture')}
              className="cyber-button-outline px-4 py-2.5 rounded flex items-center gap-2 cursor-pointer"
            >
              <Layers className="w-4 h-4 text-[#00B4D8]" />
              <span>Explorar Matriz Multicapa</span>
            </button>
          </div>
        </div>
      </div>

      {/* Production Metrics & KPIs */}
      <div id="ovw-metrics" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl sm:text-2xl font-semibold text-slate-100 flex items-center gap-2.5">
            <Activity className="w-5 h-5 text-[#00B4D8]" />
            <span>Métricas de Producción & SLA en Punto de Venta</span>
          </h2>
          <span className="text-[11px] font-mono text-slate-400">[SYS.METRICS.TELEMETRY]</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg border border-[rgba(0,180,216,0.22)] bg-[#0A1128]/70 hover:border-[#48CAE4]/50 transition-all group">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
              <span>SCAN-TO-CART</span>
              <Zap className="w-4 h-4 text-[#00B4D8]" />
            </div>
            <div className="text-3xl font-display font-bold text-white group-hover:text-[#48CAE4] transition-colors">
              {SYSTEM_META.latencyScanToCart}
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5 font-sans leading-normal">
              Latencia de captura desde láser USB/RS232 hasta renderizado en pantalla sin pérdida de foco.
            </p>
          </div>

          <div className="p-4 rounded-lg border border-[rgba(0,180,216,0.22)] bg-[#0A1128]/70 hover:border-[#48CAE4]/50 transition-all group">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
              <span>DISPONIBILIDAD SLA</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-display font-bold text-white group-hover:text-emerald-300 transition-colors">
              99.999%
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5 font-sans leading-normal">
              Operación ininterrumpida ante desconexión de red o caída de servidor central.
            </p>
          </div>

          <div className="p-4 rounded-lg border border-[rgba(0,180,216,0.22)] bg-[#0A1128]/70 hover:border-[#48CAE4]/50 transition-all group">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
              <span>MEMORIA WORKING SET</span>
              <Cpu className="w-4 h-4 text-[#58D6F1]" />
            </div>
            <div className="text-3xl font-display font-bold text-white group-hover:text-[#58D6F1] transition-colors">
              {SYSTEM_META.ramFootprint}
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5 font-sans leading-normal">
              CLR 4.8 optimizado con Garbage Collection Workstation para terminales de 4GB RAM.
            </p>
          </div>

          <div className="p-4 rounded-lg border border-[rgba(0,180,216,0.22)] bg-[#0A1128]/70 hover:border-[#48CAE4]/50 transition-all group">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
              <span>ARRANQUE EN FRÍO</span>
              <TrendingUp className="w-4 h-4 text-[#94CCFF]" />
            </div>
            <div className="text-3xl font-display font-bold text-white group-hover:text-[#94CCFF] transition-colors">
              {SYSTEM_META.coldStartTime}
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5 font-sans leading-normal">
              Precompilado nativo con NGEN (Native Image Generator) eliminando latencia JIT inicial.
            </p>
          </div>
        </div>
      </div>

      {/* Technological Stack Matrix */}
      <div id="ovw-stack" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl sm:text-2xl font-semibold text-slate-100 flex items-center gap-2.5">
            <Server className="w-5 h-5 text-[#00B4D8]" />
            <span>Stack Tecnológico Certificado</span>
          </h2>
          <span className="text-[11px] font-mono text-slate-400">[SYS.STACK.MATRIX]</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border border-[rgba(0,180,216,0.2)] bg-[#0A1128]/80 space-y-3">
            <div className="flex items-center gap-2 text-[#00B4D8] font-mono text-xs font-semibold">
              <span className="p-1.5 rounded bg-[#00B4D8]/10 border border-[#00B4D8]/30">01</span>
              <span>LENGUAJE & RUNTIME</span>
            </div>
            <h3 className="font-display text-lg font-bold text-slate-100">
              C# 9.0 en .NET Framework 4.8
            </h3>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              Compatibilidad absoluta con Windows 7 Embedded, Windows 10 IoT Enterprise y Windows 11 Pro. Acceso directo a la API Win32 y control de memoria sin intermediación de navegador.
            </p>
            <div className="pt-1 flex flex-wrap gap-1.5 font-mono text-[10px]">
              <span className="px-2 py-0.5 rounded bg-[#0E1B38] text-[#48CAE4] border border-slate-700">CLR 4.8</span>
              <span className="px-2 py-0.5 rounded bg-[#0E1B38] text-[#48CAE4] border border-slate-700">Win32 API P/Invoke</span>
              <span className="px-2 py-0.5 rounded bg-[#0E1B38] text-[#48CAE4] border border-slate-700">Workstation GC</span>
            </div>
          </div>

          <div className="p-4 rounded-lg border border-[rgba(0,180,216,0.2)] bg-[#0A1128]/80 space-y-3">
            <div className="flex items-center gap-2 text-[#48CAE4] font-mono text-xs font-semibold">
              <span className="p-1.5 rounded bg-[#00B4D8]/10 border border-[#00B4D8]/30">02</span>
              <span>INTERFAZ & TOUCH UX</span>
            </div>
            <h3 className="font-display text-lg font-bold text-slate-100">
              Windows Forms + GDI+ Doble Buffer
            </h3>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              Controles táctiles de alta respuesta con renderizado libre de flicker. Componentes DevExpress WinForms personalizados con diseño industrial para uso rudo de cajeros.
            </p>
            <div className="pt-1 flex flex-wrap gap-1.5 font-mono text-[10px]">
              <span className="px-2 py-0.5 rounded bg-[#0E1B38] text-[#48CAE4] border border-slate-700">DoubleBuffering</span>
              <span className="px-2 py-0.5 rounded bg-[#0E1B38] text-[#48CAE4] border border-slate-700">RawInput WM_INPUT</span>
              <span className="px-2 py-0.5 rounded bg-[#0E1B38] text-[#48CAE4] border border-slate-700">DevExpress 21.2</span>
            </div>
          </div>

          <div className="p-4 rounded-lg border border-[rgba(0,180,216,0.2)] bg-[#0A1128]/80 space-y-3">
            <div className="flex items-center gap-2 text-[#58D6F1] font-mono text-xs font-semibold">
              <span className="p-1.5 rounded bg-[#00B4D8]/10 border border-[#00B4D8]/30">03</span>
              <span>HARDWARE HAL & PERIFÉRICOS</span>
            </div>
            <h3 className="font-display text-lg font-bold text-slate-100">
              Controladores Seriales & OPOS
            </h3>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              Capa HAL pluggable para impresoras térmicas ESC/POS (Epson/Star), básculas de peso RS-232 continuo (Mettler Toledo/CAS), visores VFD y solenoide de gaveta de dinero.
            </p>
            <div className="pt-1 flex flex-wrap gap-1.5 font-mono text-[10px]">
              <span className="px-2 py-0.5 rounded bg-[#0E1B38] text-[#48CAE4] border border-slate-700">ESC/POS 80mm</span>
              <span className="px-2 py-0.5 rounded bg-[#0E1B38] text-[#48CAE4] border border-slate-700">RS-232 DB9</span>
              <span className="px-2 py-0.5 rounded bg-[#0E1B38] text-[#48CAE4] border border-slate-700">RJ-11 DK 24V</span>
            </div>
          </div>

          <div className="p-4 rounded-lg border border-[rgba(0,180,216,0.2)] bg-[#0A1128]/80 space-y-3">
            <div className="flex items-center gap-2 text-[#0077B6] font-mono text-xs font-semibold">
              <span className="p-1.5 rounded bg-[#00B4D8]/10 border border-[#00B4D8]/30">04</span>
              <span>PERSISTENCIA DUAL</span>
            </div>
            <h3 className="font-display text-lg font-bold text-slate-100">
              SQLite (WAL) + SQL Server 2019
            </h3>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              Escritura local atómica en &lt;2ms gracias a SQLite con Write-Ahead Logging. Micro-ORM Dapper para mapeos sin sobrecarga y consultas de catálogo parametrizadas.
            </p>
            <div className="pt-1 flex flex-wrap gap-1.5 font-mono text-[10px]">
              <span className="px-2 py-0.5 rounded bg-[#0E1B38] text-[#48CAE4] border border-slate-700">SQLite 3.39 WAL</span>
              <span className="px-2 py-0.5 rounded bg-[#0E1B38] text-[#48CAE4] border border-slate-700">Dapper Micro-ORM</span>
              <span className="px-2 py-0.5 rounded bg-[#0E1B38] text-[#48CAE4] border border-slate-700">HMAC-SHA256</span>
            </div>
          </div>

          <div className="p-4 rounded-lg border border-[rgba(0,180,216,0.2)] bg-[#0A1128]/80 space-y-3">
            <div className="flex items-center gap-2 text-[#94CCFF] font-mono text-xs font-semibold">
              <span className="p-1.5 rounded bg-[#00B4D8]/10 border border-[#00B4D8]/30">05</span>
              <span>SINCRONIZACIÓN ASÍNCRONA</span>
            </div>
            <h3 className="font-display text-lg font-bold text-slate-100">
              Gateway Daemon & Compresión GZip
            </h3>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              Agente en background con políticas Polly de reintentos con jitter, compresión de lotes transaccionales y resolución de concurrencia mediante tokens de idempotencia.
            </p>
            <div className="pt-1 flex flex-wrap gap-1.5 font-mono text-[10px]">
              <span className="px-2 py-0.5 rounded bg-[#0E1B38] text-[#48CAE4] border border-slate-700">Polly Retry/Breaker</span>
              <span className="px-2 py-0.5 rounded bg-[#0E1B38] text-[#48CAE4] border border-slate-700">GZip Payload</span>
              <span className="px-2 py-0.5 rounded bg-[#0E1B38] text-[#48CAE4] border border-slate-700">HTTP/2 Sockets</span>
            </div>
          </div>

          <div className="p-4 rounded-lg border border-[rgba(0,180,216,0.2)] bg-[#0A1128]/80 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold">
              <span className="p-1.5 rounded bg-[#00B4D8]/10 border border-[#00B4D8]/30">06</span>
              <span>DESPLIEGUE & ACTUALIZACIÓN</span>
            </div>
            <h3 className="font-display text-lg font-bold text-slate-100">
              InnoSetup & NGEN Precompilador
            </h3>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              Instalador desatendido para despliegue automatizado en cientos de sucursales con precompilación de código intermedio (IL) a ensamblado máquina nativo.
            </p>
            <div className="pt-1 flex flex-wrap gap-1.5 font-mono text-[10px]">
              <span className="px-2 py-0.5 rounded bg-[#0E1B38] text-[#48CAE4] border border-slate-700">InnoSetup Script</span>
              <span className="px-2 py-0.5 rounded bg-[#0E1B38] text-[#48CAE4] border border-slate-700">ngen.exe install</span>
              <span className="px-2 py-0.5 rounded bg-[#0E1B38] text-[#48CAE4] border border-slate-700">Silent Auto-Update</span>
            </div>
          </div>
        </div>
      </div>

      {/* Rationale: Why Windows Forms .NET for POS? */}
      <div id="ovw-evolution" className="p-6 rounded-xl border border-[rgba(0,180,216,0.25)] bg-[#080E21] space-y-4">
        <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
          <Terminal className="w-5 h-5 text-[#00B4D8]" />
          <span>Fundamento de Ingeniería: ¿Por qué Windows Forms .NET en Cajas Registradoras?</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans text-slate-300">
          <div className="p-3.5 rounded bg-[#0A1128] border border-slate-800 space-y-2">
            <div className="font-semibold text-[#00B4D8] font-mono">1. Acceso Directo al Hardware</div>
            <p className="text-slate-400 leading-relaxed">
              Las aplicaciones web en navegadores sufren de limitaciones de seguridad para abrir sockets COM serie puros o interactuar con el solenoide de 24V de la gaveta. .NET maneja interrupciones de hardware en nanosegundos.
            </p>
          </div>
          <div className="p-3.5 rounded bg-[#0A1128] border border-slate-800 space-y-2">
            <div className="font-semibold text-[#48CAE4] font-mono">2. Cero Fugas de Memoria en Turnos de 16h</div>
            <p className="text-slate-400 leading-relaxed">
              A diferencia de Electron o Chromium que acumulan gigabytes tras miles de ventas, el CLR 4.8 con recolección de basura determinista se mantiene estable en menos de 95 MB durante semanas continuas de operación.
            </p>
          </div>
          <div className="p-3.5 rounded bg-[#0A1128] border border-slate-800 space-y-2">
            <div className="font-semibold text-[#58D6F1] font-mono">3. Captura USB RawInput sin Foco</div>
            <p className="text-slate-400 leading-relaxed">
              Si un cajero hace clic accidentalmente fuera de la casilla del escáner, los navegadores pierden la lectura. Con Win32 RawInput hooks, Mobile Solutions POS intercepta el código de barras sin importar qué ventana tenga el foco.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
