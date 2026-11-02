import React from 'react';
import {
  Layers,
  Terminal,
  Server,
  GraduationCap,
  LayoutGrid,
  LockKeyhole,
  Home,
  Users,
  ClipboardCheck,
  Briefcase,
  Package,
  BarChart3,
  ShoppingCart,
  FileCode2,
  Cpu,
  Monitor,
  Database,
  AppWindow,
  GitBranch,
  ExternalLink
} from 'lucide-react';
import { SectionId } from '../../types';
import bannerImage from '../../assets/logo_mobile_solutions_dark.png';

interface OverviewSectionProps {
  onSelectSection: (id: SectionId) => void;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({ onSelectSection }) => {
  return (
    <div className="space-y-10 animate-in fade-in duration-200">
      {/* Hero Header */}
      <div id="ovw-top" className="relative p-6 sm:p-10 rounded-xl border border-[rgba(0,180,216,0.28)] bg-gradient-to-br from-[#0A1128]/90 via-[#0B1530]/80 to-[#060A17] overflow-hidden shadow-2xl">
        {/* Background glow and coordinate label */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00B4D8]/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

        {/* Banner destacado completo */}
        <div className="w-full flex justify-center mb-8">
          <div className="w-full max-w-4xl rounded-xl overflow-hidden border border-[rgba(0,180,216,0.3)] bg-[#050C1F]/90 shadow-[0_0_35px_rgba(0,180,216,0.2)] p-3 sm:p-5">
            <img
              src={bannerImage}
              alt="Mobile Solutions POS Banner"
              className="w-full h-auto max-h-[280px] sm:max-h-[320px] object-contain mx-auto filter drop-shadow-[0_0_20px_rgba(0,180,216,0.35)]"
            />
          </div>
        </div>

        {/* Contenido centrado, limpio y legible */}
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <div className="flex flex-col items-center gap-2">
            <a
              href="https://nomecompila.github.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0077B6]/25 border border-[#00B4D8]/40 text-[#48CAE4] text-xs font-mono w-fit hover:bg-[#0077B6]/40 hover:border-[#48CAE4] transition-all hover:scale-105 group cursor-pointer shadow-sm"
              title="Ver portfolio del dev: Fernando Caballero"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Ver Portfolio del Dev: Fernando Caballero</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#00B4D8] group-hover:text-white transition-colors" />
            </a>
            <a
              href="https://github.com/mNicolasPannunzio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0077B6]/25 border border-[#00B4D8]/40 text-[#48CAE4] text-xs font-mono w-fit hover:bg-[#0077B6]/40 hover:border-[#48CAE4] transition-all hover:scale-105 group cursor-pointer shadow-sm"
              title="Ver Portfolio del Dev: Pannunzio Mario Nicolas"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Ver Portfolio del Dev: Pannunzio Mario Nicolas</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#00B4D8] group-hover:text-white transition-colors" />
            </a>
          </div>

          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white leading-tight">
            Mobile Solutions POS
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00B4D8] via-[#48CAE4] to-[#94CCFF]">
              Windows Forms .NET
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans max-w-2xl mx-auto">
            Aplicación desktop de Punto de Venta (POS) desarrollada en <strong>.NET Windows Forms</strong> con foco principal en ser <strong>fácil de instalar y de usar</strong>. Cuenta con un <em>look &amp; feel</em> moderno, minimalista y práctico, incorporando un diseño en <strong>modo oscuro</strong> concebido para una interacción fluida y descansada a la vista durante jornadas operativas continuas.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-3 font-mono text-xs">
            <button
              onClick={() => onSelectSection('architecture')}
              className="cyber-button-primary px-5 py-2.5 rounded flex items-center gap-2 shadow-lg cursor-pointer"
            >
              <Layers className="w-4 h-4 text-white" />
              <span>Explorar Arquitectura de 3 Capas</span>
            </button>
            <button
              onClick={() => onSelectSection('academic-docs')}
              className="cyber-button-outline px-5 py-2.5 rounded flex items-center gap-2 cursor-pointer"
            >
              <GraduationCap className="w-4 h-4 text-[#00B4D8]" />
              <span>Ver Documentos Académicos</span>
            </button>
          </div>
        </div>
      </div>

      {/* Módulos del Sistema */}
      <div id="ovw-modules" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl sm:text-2xl font-semibold text-slate-100 flex items-center gap-2.5">
            <LayoutGrid className="w-5 h-5 text-[#00B4D8]" />
            <span>Módulos del Sistema</span>
          </h2>
          <span className="text-[11px] font-mono text-slate-400">[SYS.MODULES.CATALOG]</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1 - Autenticación: Login */}
          <div className="p-4 rounded-lg border border-[rgba(0,180,216,0.22)] bg-[#0A1128]/70 hover:border-[#48CAE4]/50 transition-all group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
                <span className="text-[#00B4D8] font-bold">01. ACCESO</span>
                <div className="p-1.5 rounded bg-[#060D24] border border-[#00B4D8]/30 group-hover:scale-105 transition-transform">
                  <LockKeyhole className="w-4 h-4 text-[#00B4D8]" />
                </div>
              </div>
              <h3 className="font-display font-bold text-sm text-white group-hover:text-[#48CAE4] transition-colors">
                Módulo de Autenticación: Vista "Login"
              </h3>
              <div className="text-[10px] font-mono text-[#00B4D8]/70 mt-0.5">
                LoginForm.cs • Hash SHA-256
              </div>
              <p className="text-[11px] text-slate-300 mt-2 font-sans leading-relaxed">
                Inicio de sesión seguro para cajeros y supervisores, control de acceso basado en roles (RBAC) y recuperación de clave mediante tokens OTP por correo.
              </p>
            </div>
          </div>

          {/* 2 - Principal: Home */}
          <div className="p-4 rounded-lg border border-[rgba(0,180,216,0.22)] bg-[#0A1128]/70 hover:border-[#48CAE4]/50 transition-all group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
                <span className="text-[#48CAE4] font-bold">02. NAVEGACIÓN</span>
                <div className="p-1.5 rounded bg-[#060D24] border border-[#00B4D8]/30 group-hover:scale-105 transition-transform">
                  <Home className="w-4 h-4 text-[#48CAE4]" />
                </div>
              </div>
              <h3 className="font-display font-bold text-sm text-white group-hover:text-[#48CAE4] transition-colors">
                Módulo Principal: Vista "Home"
              </h3>
              <div className="text-[10px] font-mono text-[#48CAE4]/70 mt-0.5">
                MainForm.cs • MaterialSkin.2
              </div>
              <p className="text-[11px] text-slate-300 mt-2 font-sans leading-relaxed">
                Contenedor central del sistema con barra de estado en vivo, datos de sesión activa, reloj en tiempo real y menú lateral para conmutar vistas de forma fluida.
              </p>
            </div>
          </div>

          {/* 3 - Gestión de Usuarios */}
          <div className="p-4 rounded-lg border border-[rgba(0,180,216,0.22)] bg-[#0A1128]/70 hover:border-[#48CAE4]/50 transition-all group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
                <span className="text-[#58D6F1] font-bold">03. USUARIOS</span>
                <div className="p-1.5 rounded bg-[#060D24] border border-[#00B4D8]/30 group-hover:scale-105 transition-transform">
                  <Users className="w-4 h-4 text-[#58D6F1]" />
                </div>
              </div>
              <h3 className="font-display font-bold text-sm text-white group-hover:text-[#48CAE4] transition-colors">
                Módulo de Gestión de Usuarios
              </h3>
              <div className="text-[10px] font-mono text-[#58D6F1]/70 mt-0.5">
                UserView.cs • UserService
              </div>
              <p className="text-[11px] text-slate-300 mt-2 font-sans leading-relaxed">
                Administración integral de empleados (altas, bajas lógicas, edición), asignación de perfiles (Admin, Gerente, Vendedor) y validación estricta de edad (≥ 18 años).
              </p>
            </div>
          </div>

          {/* 4 - Auditoría y Reportes */}
          <div className="p-4 rounded-lg border border-[rgba(0,180,216,0.22)] bg-[#0A1128]/70 hover:border-[#48CAE4]/50 transition-all group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
                <span className="text-[#94CCFF] font-bold">04. AUDITORÍA</span>
                <div className="p-1.5 rounded bg-[#060D24] border border-[#00B4D8]/30 group-hover:scale-105 transition-transform">
                  <ClipboardCheck className="w-4 h-4 text-[#94CCFF]" />
                </div>
              </div>
              <h3 className="font-display font-bold text-sm text-white group-hover:text-[#48CAE4] transition-colors">
                Módulo de Auditoría y Reportes
              </h3>
              <div className="text-[10px] font-mono text-[#94CCFF]/70 mt-0.5">
                AuditService.cs • Trazabilidad
              </div>
              <p className="text-[11px] text-slate-300 mt-2 font-sans leading-relaxed">
                Bitácora de seguridad con registro de eventos de sistema, inicios de sesión, anulaciones de comprobantes y trazabilidad de acciones operativas en caja.
              </p>
            </div>
          </div>

          {/* 5 - Gestión Comercial */}
          <div className="p-4 rounded-lg border border-[rgba(0,180,216,0.22)] bg-[#0A1128]/70 hover:border-[#48CAE4]/50 transition-all group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
                <span className="text-emerald-400 font-bold">05. CLIENTES & PAGOS</span>
                <div className="p-1.5 rounded bg-[#060D24] border border-emerald-500/30 group-hover:scale-105 transition-transform">
                  <Briefcase className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
              <h3 className="font-display font-bold text-sm text-white group-hover:text-emerald-300 transition-colors">
                Módulo de Gestión Comercial
              </h3>
              <div className="text-[10px] font-mono text-emerald-400/70 mt-0.5">
                CustomerService • PaymentType
              </div>
              <p className="text-[11px] text-slate-300 mt-2 font-sans leading-relaxed">
                Padrón de clientes con validación de DNI y formato de email, junto al catálogo de modalidades de cobro habilitadas (Efectivo, Débito, Crédito).
              </p>
            </div>
          </div>

          {/* 6 - Catálogo e Inventario: Vista "Productos" */}
          <div className="p-4 rounded-lg border border-[rgba(0,180,216,0.22)] bg-[#0A1128]/70 hover:border-[#48CAE4]/50 transition-all group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
                <span className="text-amber-400 font-bold">06. INVENTARIO</span>
                <div className="p-1.5 rounded bg-[#060D24] border border-amber-500/30 group-hover:scale-105 transition-transform">
                  <Package className="w-4 h-4 text-amber-400" />
                </div>
              </div>
              <h3 className="font-display font-bold text-sm text-white group-hover:text-amber-300 transition-colors">
                Catálogo e Inventario: "Productos"
              </h3>
              <div className="text-[10px] font-mono text-amber-400/70 mt-0.5">
                ProductView.cs • ProductService
              </div>
              <p className="text-[11px] text-slate-300 mt-2 font-sans leading-relaxed">
                Control maestro de telefonía móvil y accesorios: código de barras, marcas comerciales, precios de compra y venta, y existencias en tiempo real.
              </p>
            </div>
          </div>

          {/* 7 - Reportes Gerenciales y Analítica Comercial */}
          <div className="p-4 rounded-lg border border-[rgba(0,180,216,0.22)] bg-[#0A1128]/70 hover:border-[#48CAE4]/50 transition-all group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
                <span className="text-violet-400 font-bold">07. ANALÍTICA</span>
                <div className="p-1.5 rounded bg-[#060D24] border border-violet-500/30 group-hover:scale-105 transition-transform">
                  <BarChart3 className="w-4 h-4 text-violet-400" />
                </div>
              </div>
              <h3 className="font-display font-bold text-sm text-white group-hover:text-violet-300 transition-colors">
                Reportes Gerenciales & Analítica
              </h3>
              <div className="text-[10px] font-mono text-violet-400/70 mt-0.5">
                ManagerReportControl • LiveCharts
              </div>
              <p className="text-[11px] text-slate-300 mt-2 font-sans leading-relaxed">
                Tableros interactivos con gráficos estadísticos de recaudación, productos más vendidos, comparativas temporales y rendimiento comercial por cajero.
              </p>
            </div>
          </div>

          {/* 8 - Facturación y Punto de Venta */}
          <div className="p-4 rounded-lg border border-[rgba(0,180,216,0.22)] bg-[#0A1128]/70 hover:border-[#48CAE4]/50 transition-all group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
                <span className="text-cyan-400 font-bold">08. VENTA & COBRO</span>
                <div className="p-1.5 rounded bg-[#060D24] border border-cyan-500/30 group-hover:scale-105 transition-transform">
                  <ShoppingCart className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <h3 className="font-display font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                Facturación y Punto de Venta
              </h3>
              <div className="text-[10px] font-mono text-cyan-400/70 mt-0.5">
                SaleView.cs • TVP SQL Server
              </div>
              <p className="text-[11px] text-slate-300 mt-2 font-sans leading-relaxed">
                Terminal de cobro ágil: armado de carrito, cálculo automático de importes, emisión de tickets y persistencia atómica en SQL Server mediante TVP.
              </p>
            </div>
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
          {/* 1 - Lenguaje de Programación: C# */}
          <div className="p-4 rounded-lg border border-[rgba(0,180,216,0.2)] bg-[#0A1128]/80 space-y-3">
            <div className="flex items-center gap-2 text-[#00B4D8] font-mono text-xs font-semibold">
              <span className="p-1.5 rounded bg-[#00B4D8]/10 border border-[#00B4D8]/30">01</span>
              <span>LENGUAJE DE PROGRAMACIÓN</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded bg-[#060D24] border border-[#00B4D8]/30">
                <FileCode2 className="w-5 h-5 text-[#00B4D8]" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-slate-100">
                  C#
                </h3>
                <div className="text-[10px] font-mono text-[#00B4D8]/70">
                  Tipado Estricto & POO
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              Lenguaje moderno, robusto y fuertemente tipado de Microsoft. Aporta sintaxis orientada a objetos pura, programación asíncrona, LINQ y máxima seguridad de tipos en tiempo de compilación.
            </p>
            <div className="pt-1 flex flex-wrap gap-1.5 font-mono text-[10px]">
              <span className="px-2 py-0.5 rounded bg-[#0E1B38] text-[#48CAE4] border border-slate-700">C# 9.0</span>
              <span className="px-2 py-0.5 rounded bg-[#0E1B38] text-[#48CAE4] border border-slate-700">Orientado a Objetos</span>
              <span className="px-2 py-0.5 rounded bg-[#0E1B38] text-[#48CAE4] border border-slate-700">Type Safety</span>
            </div>
          </div>

          {/* 2 - Plataforma / Framework: .NET Framework */}
          <div className="p-4 rounded-lg border border-[rgba(0,180,216,0.2)] bg-[#0A1128]/80 space-y-3">
            <div className="flex items-center gap-2 text-[#48CAE4] font-mono text-xs font-semibold">
              <span className="p-1.5 rounded bg-[#00B4D8]/10 border border-[#00B4D8]/30">02</span>
              <span>PLATAFORMA / FRAMEWORK</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded bg-[#060D24] border border-[#00B4D8]/30">
                <Cpu className="w-5 h-5 text-[#48CAE4]" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-slate-100">
                  .NET Framework
                </h3>
                <div className="text-[10px] font-mono text-[#48CAE4]/70">
                  Runtime CLR Administrado
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              Plataforma consolidada y madura para sistemas desktop en Windows. Garantiza recolección de basura optimizada, estabilidad operativa en turnos extensos y acceso directo a APIs del sistema.
            </p>
            <div className="pt-1 flex flex-wrap gap-1.5 font-mono text-[10px]">
              <span className="px-2 py-0.5 rounded bg-[#0E1B38] text-[#48CAE4] border border-slate-700">.NET Framework 4.8</span>
              <span className="px-2 py-0.5 rounded bg-[#0E1B38] text-[#48CAE4] border border-slate-700">Common Language Runtime</span>
              <span className="px-2 py-0.5 rounded bg-[#0E1B38] text-[#48CAE4] border border-slate-700">Base Class Library</span>
            </div>
          </div>

          {/* 3 - Interfaz de Usuario (UI): Windows Forms + MaterialSkin.2 */}
          <div className="p-4 rounded-lg border border-[rgba(0,180,216,0.2)] bg-[#0A1128]/80 space-y-3">
            <div className="flex items-center gap-2 text-[#58D6F1] font-mono text-xs font-semibold">
              <span className="p-1.5 rounded bg-[#00B4D8]/10 border border-[#00B4D8]/30">03</span>
              <span>INTERFAZ DE USUARIO (UI)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded bg-[#060D24] border border-[#00B4D8]/30">
                <Monitor className="w-5 h-5 text-[#58D6F1]" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-slate-100">
                  WinForms + MaterialSkin.2
                </h3>
                <div className="text-[10px] font-mono text-[#58D6F1]/70">
                  UI Personalizada y Moderna
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              Interfaz de usuario personalizada con diseño moderno, controles táctiles ergonómicos y aceleración GDI+ sin flicker. Implementa modo oscuro nativo para confort visual del cajero.
            </p>
            <div className="pt-1 flex flex-wrap gap-1.5 font-mono text-[10px]">
              <span className="px-2 py-0.5 rounded bg-[#0E1B38] text-[#48CAE4] border border-slate-700">MaterialSkin.2</span>
              <span className="px-2 py-0.5 rounded bg-[#0E1B38] text-[#48CAE4] border border-slate-700">Windows Forms</span>
              <span className="px-2 py-0.5 rounded bg-[#0E1B38] text-[#48CAE4] border border-slate-700">Modo Oscuro</span>
            </div>
          </div>

          {/* 4 - Base de Datos: Microsoft SQL Server */}
          <div className="p-4 rounded-lg border border-[rgba(0,180,216,0.2)] bg-[#0A1128]/80 space-y-3">
            <div className="flex items-center gap-2 text-[#0077B6] font-mono text-xs font-semibold">
              <span className="p-1.5 rounded bg-[#00B4D8]/10 border border-[#00B4D8]/30">04</span>
              <span>BASE DE DATOS & PERSISTENCIA</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded bg-[#060D24] border border-[#00B4D8]/30">
                <Database className="w-5 h-5 text-[#94CCFF]" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-slate-100">
                  Microsoft SQL Server
                </h3>
                <div className="text-[10px] font-mono text-[#94CCFF]/70">
                  Procedimientos Almacenados
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              Persistencia relacional local con transaccionalidad ACID pura. Toda la operatoria está encapsulada en Procedimientos Almacenados y compras atómicas vía Table-Valued Parameters (TVP).
            </p>
            <div className="pt-1 flex flex-wrap gap-1.5 font-mono text-[10px]">
              <span className="px-2 py-0.5 rounded bg-[#0E1B38] text-[#48CAE4] border border-slate-700">MSSQLLocalDB</span>
              <span className="px-2 py-0.5 rounded bg-[#0E1B38] text-[#48CAE4] border border-slate-700">Stored Procedures</span>
              <span className="px-2 py-0.5 rounded bg-[#0E1B38] text-[#48CAE4] border border-slate-700">TVP Cart</span>
            </div>
          </div>

          {/* 5 - IDE Recomendado: Microsoft Visual Studio */}
          <div className="p-4 rounded-lg border border-[rgba(0,180,216,0.2)] bg-[#0A1128]/80 space-y-3">
            <div className="flex items-center gap-2 text-[#94CCFF] font-mono text-xs font-semibold">
              <span className="p-1.5 rounded bg-[#00B4D8]/10 border border-[#00B4D8]/30">05</span>
              <span>IDE RECOMENDADO</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded bg-[#060D24] border border-[#00B4D8]/30">
                <AppWindow className="w-5 h-5 text-[#94CCFF]" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-slate-100">
                  Microsoft Visual Studio
                </h3>
                <div className="text-[10px] font-mono text-[#94CCFF]/70">
                  Entorno de Desarrollo Oficial
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              Entorno integrado oficial de desarrollo para .NET. Provee diseñador visual de formularios Windows Forms, depuración interactiva de hilos, análisis estático y perfilado de rendimiento.
            </p>
            <div className="pt-1 flex flex-wrap gap-1.5 font-mono text-[10px]">
              <span className="px-2 py-0.5 rounded bg-[#0E1B38] text-[#48CAE4] border border-slate-700">Visual Studio 2022</span>
              <span className="px-2 py-0.5 rounded bg-[#0E1B38] text-[#48CAE4] border border-slate-700">WinForms Designer</span>
              <span className="px-2 py-0.5 rounded bg-[#0E1B38] text-[#48CAE4] border border-slate-700">Diagnostic Tools</span>
            </div>
          </div>

          {/* 6 - Control de Versiones: Git / GitHub */}
          <div className="p-4 rounded-lg border border-[rgba(0,180,216,0.2)] bg-[#0A1128]/80 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold">
              <span className="p-1.5 rounded bg-[#00B4D8]/10 border border-[#00B4D8]/30">06</span>
              <span>CONTROL DE VERSIONES</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded bg-[#060D24] border border-emerald-500/30">
                <GitBranch className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-slate-100">
                  Git / GitHub
                </h3>
                <div className="text-[10px] font-mono text-emerald-400/70">
                  Repositorio Colaborativo
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              Sistema de control de versiones distribuido con repositorio central alojado en GitHub. Trazabilidad completa de cambios, ramas por características e historial de commits del equipo.
            </p>
            <div className="pt-1 flex flex-wrap gap-1.5 font-mono text-[10px]">
              <span className="px-2 py-0.5 rounded bg-[#0E1B38] text-[#48CAE4] border border-slate-700">Git SCM</span>
              <span className="px-2 py-0.5 rounded bg-[#0E1B38] text-[#48CAE4] border border-slate-700">GitHub Cloud</span>
              <span className="px-2 py-0.5 rounded bg-[#0E1B38] text-[#48CAE4] border border-slate-700">Trazabilidad Sprints</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
