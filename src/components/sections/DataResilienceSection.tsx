import React, { useState } from 'react';
import {
  Database,
  HardDrive,
  Server,
  Lock,
  RotateCcw,
  FileText,
  Key,
  Layers,
  ChevronRight,
  ShieldCheck,
  Check,
  Network,
  ExternalLink,
  Maximize2
} from 'lucide-react';
import { DATABASE_TABLES } from '../../data/posArchitectureData';
import { DatabaseTable } from '../../types';

export const DataResilienceSection: React.FC = () => {
  const [selectedTable, setSelectedTable] = useState<DatabaseTable>(DATABASE_TABLES[0]);
  const [showDdl, setShowDdl] = useState(false);

  const generateDdl = (table: DatabaseTable) => {
    const cols = table.columns
      .map(c => `    [${c.name}] ${c.type} ${c.nullable ? 'NULL' : 'NOT NULL'}`)
      .join(',\n');
    const idxs = table.indices
      .map(i => `-- Index: ${i}`)
      .join('\n');

    return `-- DDL Schema Definition for Mobile Solutions POS\n-- Engine: ${table.engine}\n\nCREATE TABLE [dbo].[${table.name}] (\n${cols},\n    CONSTRAINT [PK_${table.name}] PRIMARY KEY CLUSTERED ([${table.primaryKey}])\n);\n\n${idxs}\nGO`;
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-200">
      {/* Header */}
      <div id="dat-schema" className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[rgba(0,180,216,0.2)] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#00B4D8]">
            <span>PERSISTENCIA RELACIONAL & ARQUITECTURA DAL</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
            Modelo de Base de Datos: Microsoft SQL Server
          </h1>
        </div>
        <span className="px-2.5 py-1 rounded bg-[#0E1B38] text-xs font-mono text-[#48CAE4] border border-[#00B4D8]/30 self-start sm:self-auto">
          ADO.NET + STORED PROCEDURES
        </span>
      </div>

      {/* Rationale Grid: Local vs Central */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-xl border border-[rgba(0,180,216,0.28)] bg-gradient-to-br from-[#0A1128] to-[#070D1F] space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-[#00B4D8]">
            <span className="flex items-center gap-1.5 font-bold">
              <HardDrive className="w-4 h-4 text-[#48CAE4]" />
              <span>PERSISTENCIA LOCAL: MICROSOFT SQL SERVER / LOCALDB</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-[#0E1B38] text-[10px] text-emerald-300">
              ACID • LOCALDB
            </span>
          </div>
          <p className="text-xs text-slate-300 font-sans leading-relaxed">
            La solución Mobile Solutions POS persiste sus datos localmente sobre Microsoft SQL Server / (localdb)\MSSQLLocalDB mediante la Capa de Acceso a Datos (DAL). Garantiza transaccionalidad ACID pura, integridad referencial mediante claves foráneas y aislamiento estricto en la estación comercial.
          </p>
          <div className="pt-1 flex flex-wrap gap-1.5 text-[10px] font-mono">
            <span className="px-2 py-0.5 rounded bg-[#060D24] text-[#48CAE4] border border-slate-700">TrustServerCertificate=True</span>
            <span className="px-2 py-0.5 rounded bg-[#060D24] text-[#48CAE4] border border-slate-700">SqlClient Pool</span>
            <span className="px-2 py-0.5 rounded bg-[#060D24] text-[#48CAE4] border border-slate-700">Bootstrap DDL</span>
          </div>
        </div>

        <div className="p-5 rounded-xl border border-[rgba(0,180,216,0.28)] bg-gradient-to-br from-[#0A1128] to-[#070D1F] space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-[#0077B6]">
            <span className="flex items-center gap-1.5 font-bold text-[#94CCFF]">
              <Server className="w-4 h-4 text-[#94CCFF]" />
              <span>LÓGICA EN BASE DE DATOS: STORED PROCEDURES & TVP</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-[#0E1B38] text-[10px] text-slate-300">
              100% PROCEDIMIENTOS ALMACENADOS
            </span>
          </div>
          <p className="text-xs text-slate-300 font-sans leading-relaxed">
            Toda la operatoria (CRUD de clientes, usuarios, ventas atómicas mediante Table-Valued Parameters, reportes analíticos y auditoría) está encapsulada en procedimientos almacenados optimizados con hashing criptográfico SHA-256 en contraseñas.
          </p>
          <div className="pt-1 flex flex-wrap gap-1.5 text-[10px] font-mono">
            <span className="px-2 py-0.5 rounded bg-[#060D24] text-[#94CCFF] border border-slate-700">TVP Sales Cart</span>
            <span className="px-2 py-0.5 rounded bg-[#060D24] text-[#94CCFF] border border-slate-700">SHA-256 Passwords</span>
            <span className="px-2 py-0.5 rounded bg-[#060D24] text-[#94CCFF] border border-slate-700">Audit Trace</span>
          </div>
        </div>
      </div>

      {/* Interactive Entity-Relationship Diagram (Archify Blueprint) */}
      <div className="p-6 rounded-xl border border-[rgba(0,180,216,0.3)] bg-gradient-to-br from-[#0A1128] to-[#070D1F] space-y-4 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#00B4D8]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[rgba(0,180,216,0.2)] pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#00B4D8]">
              <Network className="w-3.5 h-3.5 text-[#48CAE4]" />
              <span>DIAGRAMA ENTIDAD-RELACIÓN (ERD)</span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white mt-1">
              Diagrama ER Interactivo: Cardinalidades & Claves Foráneas
            </h2>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <a
              href="/mobile-solutions-erd.html"
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
          Diagrama interactivo generado con motor Archify en estilo <em>Blueprint Dark Mode</em>. Representa las 8 tablas de Microsoft SQL Server de <code className="text-[#48CAE4] font-mono">CreateDB.sql</code>, sus claves primarias autonuméricas, claves foráneas, restricciones de unicidad y relaciones de 1 a Muchos (Crow&apos;s Foot).
        </p>

        {/* Embedded Interactive Viewer */}
        <div className="w-full h-[660px] rounded-lg border border-[rgba(0,180,216,0.25)] overflow-hidden bg-[#050B1A] shadow-inner relative">
          <iframe
            src="/mobile-solutions-erd.html?theme=dark&embed=1"
            title="Diagrama ER Mobile Solutions POS"
            className="w-full h-full border-0"
          />
        </div>
      </div>

      {/* Database Schema Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Table Selector (4 columns) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
            <span>TABLAS MAESTRAS DEL MODELO:</span>
            <span className="text-[#00B4D8]">{DATABASE_TABLES.length} Tablas</span>
          </div>

          <div className="space-y-2">
            {DATABASE_TABLES.map(table => {
              const isSelected = selectedTable.name === table.name;
              return (
                <div
                  key={table.name}
                  onClick={() => {
                    setSelectedTable(table);
                    setShowDdl(false);
                  }}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${isSelected
                    ? 'bg-[#0E1B38] border-[#00B4D8] shadow-[0_0_12px_rgba(0,180,216,0.3)]'
                    : 'bg-[#0A1128]/70 border-[rgba(0,180,216,0.2)] hover:border-[#48CAE4]/50'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-xs text-slate-100 truncate">
                      {table.name}
                    </span>
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#060D24] text-[#48CAE4] border border-slate-700">
                      {table.engine}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-sans mt-1 line-clamp-1">
                    {table.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Table Blueprint (8 columns) */}
        <div className="lg:col-span-8">
          <div className="p-6 rounded-xl border border-[rgba(0,180,216,0.3)] bg-gradient-to-br from-[#0A1128] to-[#070D1F] space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[rgba(0,180,216,0.2)] pb-3">
              <div>
                <span className="text-[10px] font-mono text-[#00B4D8]">
                  ESQUEMA RELACIONAL SELECCIONADO
                </span>
                <h3 className="font-display text-lg font-bold text-white">
                  {selectedTable.name}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowDdl(!showDdl)}
                  className="px-2.5 py-1 rounded bg-[#0E1B38] text-xs font-mono text-[#00B4D8] border border-[rgba(0,180,216,0.3)] hover:bg-[#00B4D8]/10 transition-colors"
                >
                  {showDdl ? 'Ver Columnas' : 'Ver DDL SQL'}
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-300 font-sans">
              {selectedTable.description}
            </p>

            {showDdl ? (
              <div className="p-4 rounded-lg bg-[#060D24] border border-slate-800 text-[11px] font-mono text-[#48CAE4] overflow-x-auto select-text leading-relaxed">
                <pre>{generateDdl(selectedTable)}</pre>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-lg border border-[rgba(0,180,216,0.2)] bg-[#060D24]">
                <table className="w-full text-left border-collapse text-xs font-mono">
                  <thead>
                    <tr className="bg-[#0A1128] border-b border-[rgba(0,180,216,0.2)] text-[#48CAE4]">
                      <th className="py-2.5 px-3">Columna</th>
                      <th className="py-2.5 px-3">Tipo de Dato</th>
                      <th className="py-2.5 px-3">Nullable</th>
                      <th className="py-2.5 px-3">Descripción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {selectedTable.columns.map(col => (
                      <tr key={col.name} className="hover:bg-[#00B4D8]/5 transition-colors">
                        <td className="py-2.5 px-3 text-slate-100 font-bold flex items-center gap-1.5">
                          {selectedTable.primaryKey.includes(col.name) && (
                            <Key className="w-3 h-3 text-amber-400 shrink-0" />
                          )}
                          <span>{col.name}</span>
                        </td>
                        <td className="py-2.5 px-3 text-[#00B4D8]">
                          {col.type}
                        </td>
                        <td className="py-2.5 px-3 text-slate-400">
                          {col.nullable ? 'YES' : 'NO'}
                        </td>
                        <td className="py-2.5 px-3 text-slate-300 font-sans text-[11px]">
                          {col.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Indices */}
            <div className="pt-2">
              <div className="text-[11px] font-mono text-slate-400 mb-1.5">
                ÍNDICES DE ALTA VELOCIDAD:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedTable.indices.map((idx, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded bg-[#060D24] text-[10px] font-mono text-slate-300 border border-slate-700"
                  >
                    {idx}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
