import React from 'react';
import { 
  Rocket, 
  Activity, 
  Zap, 
  CheckCircle2, 
  Terminal, 
  ShieldCheck, 
  TrendingUp, 
  Server,
  FileCode,
  HardDrive
} from 'lucide-react';
import { CodeBlock } from '../CodeBlock';

export const DeploymentBenchmarksSection: React.FC = () => {
  const innoSetupScript = `; -- InnoSetup Silent Installer Script for Mobile Solutions POS --
[Setup]
AppName=Mobile Solutions POS
AppVersion=4.8.2
DefaultDirName={autopf}\\MobileSolutions\\POS
DefaultGroupName=Mobile Solutions POS
OutputBaseFilename=MobileSolutionsPOS_Setup_v4.8.2
Compression=lzma2/ultra64
SolidCompression=yes
ArchitecturesInstallIn64BitMode=x64
PrivilegesRequired=admin

[Files]
Source: "bin\\Release\\*"; DestDir: "{app}"; Flags: recursesubdirs ignoreversion
Source: "drivers\\opos\\*"; DestDir: "{app}\\drivers"; Flags: ignoreversion

[Run]
; Ejecutar NGEN para precompilación de código intermedio a binario nativo
Filename: "{dotnet4064}\\ngen.exe"; Parameters: "install ""{app}\\MobileSolutions.POS.UI.exe"" /nologo /silent"; Flags: runhidden
Filename: "{dotnet4064}\\ngen.exe"; Parameters: "install ""{app}\\MobileSolutions.Hardware.dll"" /nologo /silent"; Flags: runhidden
; Registro de controladores OPOS CCO
Filename: "regsvr32.exe"; Parameters: "/s ""{app}\\drivers\\OposCashDrawer.ocx"""; Flags: runhidden
Filename: "regsvr32.exe"; Parameters: "/s ""{app}\\drivers\\OposPOSPrinter.ocx"""; Flags: runhidden`;

  return (
    <div className="space-y-10 animate-in fade-in duration-200">
      {/* Header */}
      <div id="bnc-scan" className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[rgba(0,180,216,0.2)] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#00B4D8]">
            <span>DESPLIEGUE MASIVO & BENCHMARK EN TIENDAS</span>
            <span>•</span>
            <span>[SYS.DEPLOY.BENCHMARK]</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
            Métricas de Rendimiento & Despliegue Masivo
          </h1>
        </div>
        <span className="px-2.5 py-1 rounded bg-[#0E1B38] text-xs font-mono text-[#48CAE4] border border-[#00B4D8]/30 self-start sm:self-auto">
          NGEN NATIVE PRECOMPILATION • INNOSETUP
        </span>
      </div>

      {/* Latency Comparison Bars */}
      <div className="p-6 rounded-xl border border-[rgba(0,180,216,0.28)] bg-gradient-to-br from-[#0A1128] to-[#070D1F] space-y-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#00B4D8]" />
            <span>Comparativa de Latencias: POS Web vs POS WinForms .NET</span>
          </h3>
          <span className="text-xs font-mono text-emerald-400">WINFORMS 8.5X MÁS RÁPIDO</span>
        </div>

        <div className="space-y-4 font-mono text-xs">
          {/* Metric 1 */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-slate-300">
              <span>Scan-to-Cart (Desde Láser USB hasta renderizado en pantalla):</span>
              <span className="text-[#00B4D8] font-bold">14 ms (WinForms) vs 120 ms (Web SPA)</span>
            </div>
            <div className="w-full h-3 bg-[#060D24] rounded-full overflow-hidden flex border border-slate-800">
              <div className="bg-[#00B4D8] h-full rounded-full" style={{ width: '12%' }} />
            </div>
          </div>

          {/* Metric 2 */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-slate-300">
              <span>Consumo de Memoria RAM tras 16 horas continuas:</span>
              <span className="text-[#48CAE4] font-bold">85 MB (CLR 4.8) vs 1,250 MB (Electron/Chromium)</span>
            </div>
            <div className="w-full h-3 bg-[#060D24] rounded-full overflow-hidden flex border border-slate-800">
              <div className="bg-[#48CAE4] h-full rounded-full" style={{ width: '8%' }} />
            </div>
          </div>

          {/* Metric 3 */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-slate-300">
              <span>Arranque en Frío (Cold Start con NGEN Precompilado):</span>
              <span className="text-emerald-400 font-bold">1.1 seg vs 4.8 seg (JIT no optimizado)</span>
            </div>
            <div className="w-full h-3 bg-[#060D24] rounded-full overflow-hidden flex border border-slate-800">
              <div className="bg-emerald-400 h-full rounded-full" style={{ width: '22%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* InnoSetup & NGEN Deployment Specification */}
      <div id="dep-installer" className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
            <Rocket className="w-5 h-5 text-[#00B4D8]" />
            <span>Script de Instalador Desatendido (InnoSetup + NGEN)</span>
          </h3>
          <span className="text-xs font-mono text-slate-400">[INNOSETUP.ISS]</span>
        </div>

        <CodeBlock
          filename="MobileSolutionsPOS_Installer.iss"
          language="pascal"
          code={innoSetupScript}
          assembly="InnoSetup 6.2 Compiler"
        />
      </div>

      {/* Deployment Best Practices Checklist */}
      <div id="dep-silent" className="p-6 rounded-xl border border-[rgba(0,180,216,0.25)] bg-[#080E21] space-y-4">
        <h4 className="font-display text-base font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span>Políticas de Despliegue en Cajas de Sucursales</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans text-slate-300">
          <div className="p-3.5 rounded bg-[#0A1128] border border-slate-800 space-y-1.5">
            <div className="font-semibold text-[#00B4D8] font-mono">Exclusiones Antivirus (Windows Defender)</div>
            <p className="text-slate-400 leading-relaxed">
              Excluir la carpeta de base de datos local SQLite y los archivos con extensión <code className="text-[#48CAE4]">.db-wal</code> y <code className="text-[#48CAE4]">.db-shm</code> para evitar bloqueos por inspección de procesos en tiempo real.
            </p>
          </div>
          <div className="p-3.5 rounded bg-[#0A1128] border border-slate-800 space-y-1.5">
            <div className="font-semibold text-[#48CAE4] font-mono">Energía de Puertos USB (Power Management)</div>
            <p className="text-slate-400 leading-relaxed">
              Desactivar en Administrador de Dispositivos la opción <em>&quot;Permitir que el equipo apague este dispositivo para ahorrar energía&quot;</em> en los concentradores USB raíz para evitar pérdidas de conexión del lector óptico.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
