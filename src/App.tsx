import React, { useState, useEffect } from 'react';
import { SectionId } from './types';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { SearchModal } from './components/SearchModal';

import { OverviewSection } from './components/sections/OverviewSection';
import { AcademicDocsSection } from './components/sections/AcademicDocsSection';
import { ArchitectureSection } from './components/sections/ArchitectureSection';
import { DataResilienceSection } from './components/sections/DataResilienceSection';

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('overview');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Global keyboard shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewSection onSelectSection={setActiveSection} />;
      case 'academic-docs':
        return <AcademicDocsSection />;
      case 'architecture':
        return <ArchitectureSection />;
      case 'data-resilience':
        return <DataResilienceSection />;
      default:
        return <OverviewSection onSelectSection={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#060A17] text-[#F8FAFC] flex flex-col font-sans bg-cyber-grid selection:bg-[#00B4D8]/30 selection:text-[#48CAE4]">
      {/* Top Cyber Navigation Bar */}
      <Header
        activeSection={activeSection}
        onSelectSection={setActiveSection}
        onToggleMobileSidebar={() => setIsMobileSidebarOpen(prev => !prev)}
        isMobileSidebarOpen={isMobileSidebarOpen}
      />

      {/* Main Structural Body */}
      <div className="flex-1 flex pt-20 sm:pt-24">
        {/* Left Fixed 280px Navigation Tree */}
        <Sidebar
          activeSection={activeSection}
          onSelectSection={setActiveSection}
          isOpenMobile={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
          onOpenSearch={() => setIsSearchOpen(true)}
        />

        {/* Central Content Canvas */}
        <main className="flex-1 min-w-0 px-4 sm:px-8 lg:px-12 py-8 lg:ml-[340px] transition-all">
          <div className="max-w-6xl mx-auto w-full">
            {renderActiveSection()}
          </div>
        </main>
      </div>

      {/* Global Quick Search Modal (Cmd+K) */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectSection={setActiveSection}
      />
    </div>
  );
}
