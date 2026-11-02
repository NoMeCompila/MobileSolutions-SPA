export type SectionId = 
  | 'overview'
  | 'academic-docs'
  | 'architecture'
  | 'data-resilience';

export interface ArchitectureLayer {
  id: string;
  name: string;
  code: string;
  description: string;
  purpose?: string;
  relations?: string;
  assemblies: string[];
  responsibilities: string[];
  technologies: string[];
  interfaces: string[];
  color: string;
}

export interface HardwarePeripheral {
  id: string;
  name: string;
  type: 'printer' | 'scanner' | 'drawer' | 'scale' | 'display' | 'pinpad';
  protocol: string;
  interfacePort: string;
  baudRate?: string;
  description: string;
  driverType: 'OPOS' | 'ESC/POS' | 'Win32 RawInput' | 'Direct COM' | 'Ethernet TCP/IP';
  commands: { name: string; hex: string; description: string }[];
  status: 'connected' | 'idle' | 'transmitting' | 'error';
}

export interface DatabaseTable {
  name: string;
  engine: string;
  description: string;
  primaryKey: string;
  columns: {
    name: string;
    type: string;
    nullable: boolean;
    description: string;
  }[];
  indices: string[];
}

export interface POSCartItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  taxRate: number;
  discount: number;
  isWeighed?: boolean;
  weightKg?: number;
}
