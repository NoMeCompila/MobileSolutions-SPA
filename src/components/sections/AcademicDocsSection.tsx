import React from 'react';
import { 
  GraduationCap, 
  FileText, 
  ExternalLink, 
  BookOpen, 
  Trello, 
  FileCode2, 
  Wrench, 
  Download, 
  Github, 
  Users, 
  CheckCircle2,
  Building2,
  Calendar
} from 'lucide-react';

export const AcademicDocsSection: React.FC = () => {
  const documents = [
    {
      id: 'ers',
      title: 'Especificación de Requisitos (ERS)',
      standard: 'ESTÁNDAR IEEE 830-1998',
      description: 'Documento formal de Especificación de Requerimientos de Software que define el alcance, casos de uso, restricciones y requisitos funcionales y no funcionales del sistema.',
      badge: 'OFICIAL // IEEE 830',
      badgeColor: 'text-[#00B4D8] border-[#00B4D8]/30 bg-[#0077B6]/20',
      icon: <FileText className="w-6 h-6 text-[#00B4D8]" />,
      url: 'https://github.com/NoMeCompila/Taller-de-Programaci-n-2---2026---Grupo-97/raw/master/Documentacion/Especificaci%C3%B3n_de_Requerimientos_de_Software_(ERS).pdf',
      actionLabel: 'Ver Documento ERS (PDF)'
    },
    {
      id: 'notion',
      title: 'Workspace de Proyecto en Notion',
      standard: 'GESTIÓN & DOCUMENTACIÓN TÉCNICA',
      description: 'Documentación viva del proyecto con actas de cátedra, especificaciones de módulos de venta y catálogo, y diagramas de flujo de datos.',
      badge: 'WORKSPACE NOTION',
      badgeColor: 'text-[#48CAE4] border-[#48CAE4]/30 bg-[#0A1128]',
      icon: <BookOpen className="w-6 h-6 text-[#48CAE4]" />,
      url: 'https://app.notion.com/p/3ca29f1da19b807aa1fbf49ea7b57e76?v=3ca29f1da19b8041b625000ca7394d52&source=copy_link',
      actionLabel: 'Abrir Notion'
    },
    {
      id: 'trello',
      title: 'Tablero Ágil SCRUM en Trello',
      standard: 'HISTORIAS DE USUARIO & BACKLOG',
      description: 'Seguimiento ágil del ciclo de vida del software en sprints, división de tareas por capas (UI, BLL, DAL) y criterios de aceptación.',
      badge: 'TABLERO SCRUM',
      badgeColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
      icon: <Trello className="w-6 h-6 text-emerald-400" />,
      url: 'https://trello.com/b/IpIYZi7e/%F0%9F%96%A5%EF%B8%8F-mobile-solutions',
      actionLabel: 'Ver Tablero Trello'
    },
    {
      id: 'manual-user',
      title: 'Manual de Usuario Final',
      standard: 'GUÍA OPERATIVA DEL SISTEMA',
      description: 'Instrucciones detalladas de uso para cajeros, vendedores y administradores: operaciones de venta, gestión de stock, arqueos y reportes.',
      badge: 'MANUAL OPERATIVO',
      badgeColor: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
      icon: <FileCode2 className="w-6 h-6 text-amber-400" />,
      url: 'https://docs.google.com/document/d/1gMv7HCl5TO2FgIHZoueDL4V_0zivxB1sFEEXmL62ta4/edit?usp=sharing',
      actionLabel: 'Ver Manual de Usuario'
    },
    {
      id: 'manual-tech',
      title: 'Documentación Técnica para Devs',
      standard: 'ARQUITECTURA & CÓDIGO',
      description: 'Especificación técnica de la solución: arquitectura en 3 capas, procedimientos almacenados SQL Server, autenticación con SHA-256 y hashing de contraseñas.',
      badge: 'GUÍA DESARROLLADOR',
      badgeColor: 'text-[#94CCFF] border-[#94CCFF]/30 bg-[#0A1128]',
      icon: <FileCode2 className="w-6 h-6 text-[#94CCFF]" />,
      url: 'https://docs.google.com/document/d/1ruEoIVVfTFhDXZRdqf16DIo-IoCUYLJTjG5yUbkBl9A/edit?usp=sharing',
      actionLabel: 'Ver Documentación Devs'
    },
    {
      id: 'install-guide',
      title: 'Guía de Instalación del Sistema',
      standard: 'DESPLIEGUE EN WINDOWS',
      description: 'Requisitos de entorno (Windows 10/11, .NET Framework 4.8 / .NET 10, SQL Server / LocalDB) y pasos para instalación desatendida.',
      badge: 'GUÍA DE INSTALACIÓN',
      badgeColor: 'text-violet-400 border-violet-500/30 bg-violet-500/10',
      icon: <Wrench className="w-6 h-6 text-violet-400" />,
      url: 'https://docs.google.com/document/d/1fjoNUZiVWfsCgXLFiN6v5X17Gk1FBvZad0ekbCi2krQ/edit?usp=sharing',
      actionLabel: 'Ver Guía de Instalación'
    },
    {
      id: 'installer',
      title: 'Instalador Oficial (Setup .EXE)',
      standard: 'PAQUETE AUTOCONTENIDO INNOSETUP',
      description: 'Descarga directa del instalador compilado MobileSolutions_Setup.exe con dependencias, base de datos de prueba precargada y configuración de entorno.',
      badge: 'DESCARGA DIRECTA',
      badgeColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
      icon: <Download className="w-6 h-6 text-emerald-400" />,
      url: 'https://drive.google.com/file/d/1OV-645-w63hBUZMsG9Db5mw3DcU_VgCJ/view?usp=sharing',
      actionLabel: 'Descargar MobileSolutions_Setup.exe'
    },
    {
      id: 'github',
      title: 'Repositorio Central en GitHub',
      standard: 'CONTROL DE VERSIONES & COMMITS',
      description: 'Código fuente C# completo de la solución (.slnx, UILayer, BusinessLayer, DataLayer y scripts SQL Server).',
      badge: 'CÓDIGO FUENTE',
      badgeColor: 'text-slate-200 border-slate-700 bg-slate-800/40',
      icon: <Github className="w-6 h-6 text-slate-200" />,
      url: 'https://github.com/NoMeCompila/Taller-de-Programaci-n-2---2026---Grupo-97',
      actionLabel: 'Explorar en GitHub'
    }
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-200">
      {/* Header Institucional y Académico */}
      <div className="p-6 sm:p-8 rounded-2xl border border-[rgba(0,180,216,0.3)] bg-gradient-to-br from-[#0A1128] via-[#0B1530] to-[#060A17] space-y-5 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#00B4D8]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0077B6]/25 border border-[#00B4D8]/40 text-[#48CAE4] text-xs font-mono font-semibold">
            <GraduationCap className="w-4 h-4 text-[#00B4D8]" />
            <span>UNIVERSIDAD NACIONAL DEL NORDESTE • FACENA</span>
          </div>
          <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#00B4D8]" />
            <span>AÑO LECTIVO 2026</span>
          </span>
        </div>

        <div>
          <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Documentos Académicos & Requerimientos
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
            Repositorio integral de especificaciones formales, manuales operativos, tablero ágil y recursos técnicos elaborados para la cátedra <strong>Taller de Programación II</strong> (Licenciatura en Sistemas de Información).
          </p>
        </div>

        {/* Ficha Académica del Equipo */}
        <div className="pt-2 border-t border-[rgba(0,180,216,0.15)] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-300">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#00B4D8]" />
            <span className="text-slate-400">Integrantes:</span>
            <span className="text-white font-semibold">Fernando Caballero</span>
            <span className="text-slate-500">•</span>
            <span className="text-white font-semibold">Pannunzio Mario Nicolas</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <Building2 className="w-4 h-4 text-[#48CAE4]" />
            <span>Cátedra: Taller de Programación II • Grupo 97</span>
          </div>
        </div>
      </div>

      {/* Grid de Documentos y Recursos */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#00B4D8]" />
            <span>Recursos Oficiales del Proyecto</span>
          </h2>
          <span className="text-xs font-mono text-slate-400">8 DOCUMENTOS ENLAZADOS</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {documents.map(doc => (
            <div 
              key={doc.id}
              className="p-5 sm:p-6 rounded-xl border border-[rgba(0,180,216,0.22)] bg-[#0A1128]/80 hover:bg-[#0E1B38] hover:border-[#00B4D8]/50 transition-all flex flex-col justify-between group shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="p-2.5 rounded-lg bg-[#060D24] border border-[#00B4D8]/30 group-hover:scale-105 transition-transform">
                    {doc.icon}
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded border ${doc.badgeColor}`}>
                    {doc.badge}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-white group-hover:text-[#00B4D8] transition-colors">
                    {doc.title}
                  </h3>
                  <div className="text-[11px] font-mono text-[#00B4D8]/70 mt-0.5">
                    {doc.standard}
                  </div>
                </div>

                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {doc.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[rgba(0,180,216,0.12)]">
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#0077B6]/25 hover:bg-[#00B4D8]/30 border border-[#00B4D8]/40 text-xs font-mono text-[#48CAE4] hover:text-white transition-all font-semibold w-full justify-center group-hover:shadow-[0_0_12px_rgba(0,180,216,0.2)]"
                >
                  <span>{doc.actionLabel}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#00B4D8] group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

