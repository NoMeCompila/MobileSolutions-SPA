import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Barcode, 
  Trash2, 
  Plus, 
  Minus, 
  CreditCard, 
  DollarSign, 
  Printer, 
  Scale, 
  Wifi, 
  WifiOff, 
  CheckCircle, 
  RotateCcw,
  Sparkles,
  Zap,
  HardDrive
} from 'lucide-react';
import { SAMPLE_POS_PRODUCTS } from '../../data/posArchitectureData';
import { POSCartItem } from '../../types';

interface TerminalSimulatorProps {
  onlineMode: boolean;
  onToggleOnlineMode: () => void;
  cart: POSCartItem[];
  setCart: React.Dispatch<React.SetStateAction<POSCartItem[]>>;
}

export const TerminalSimulatorSection: React.FC<TerminalSimulatorProps> = ({
  onlineMode,
  onToggleOnlineMode,
  cart,
  setCart
}) => {
  const [barcodeInput, setBarcodeInput] = useState('');
  const [ticketNumber, setTicketNumber] = useState(10482);
  const [lastPayment, setLastPayment] = useState<{ method: string; total: number; receipt: string } | null>(null);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [drawerKicked, setDrawerKicked] = useState(false);
  const [scaleWeight, setScaleWeight] = useState(1.45);
  const [offlineQueue, setOfflineQueue] = useState<number>(0);
  const [activeTabReceipt, setActiveTabReceipt] = useState<'preview' | 'hex'>('preview');

  // Sound synthesis via Web Audio API for tactile feedback
  const playPosBeep = (freq = 1200, duration = 0.08) => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // AudioContext fallback
    }
  };

  const handleAddProduct = (product: POSCartItem) => {
    playPosBeep(1400, 0.06);
    setCart(prev => {
      const existing = prev.find(item => item.sku === product.sku);
      if (existing) {
        return prev.map(item =>
          item.sku === product.sku
            ? { ...item, quantity: item.quantity + (product.isWeighed ? scaleWeight : 1) }
            : item
        );
      }
      return [...prev, { ...product, quantity: product.isWeighed ? scaleWeight : 1 }];
    });
  };

  const handleScanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!barcodeInput.trim()) return;

    const found = SAMPLE_POS_PRODUCTS.find(
      p => p.sku === barcodeInput.trim() || p.name.toLowerCase().includes(barcodeInput.toLowerCase())
    );

    if (found) {
      handleAddProduct(found);
      setBarcodeInput('');
    } else {
      // Add custom scanned item
      playPosBeep(450, 0.2); // error tone
      const customItem: POSCartItem = {
        id: `custom-${Date.now()}`,
        sku: barcodeInput.trim(),
        name: `Producto Escaneado (${barcodeInput})`,
        category: 'Varios',
        price: 25.0,
        quantity: 1,
        taxRate: 0.16,
        discount: 0
      };
      setCart(prev => [...prev, customItem]);
      setBarcodeInput('');
    }
  };

  const updateQuantity = (sku: string, delta: number) => {
    playPosBeep(900, 0.04);
    setCart(prev =>
      prev
        .map(item => {
          if (item.sku === sku) {
            const newQty = Math.max(0.1, Number((item.quantity + delta).toFixed(2)));
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter(item => item.quantity > 0)
    );
  };

  const removeItem = (sku: string) => {
    playPosBeep(600, 0.08);
    setCart(prev => prev.filter(item => item.sku !== sku));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Financial calculations
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalDiscount = cart.reduce((acc, item) => acc + (item.discount * item.quantity), 0);
  const taxableBase = Math.max(0, subtotal - totalDiscount);
  const totalIva = taxableBase * 0.16;
  const grandTotal = taxableBase + totalIva;

  // Checkout execution
  const handleCheckout = (paymentMethod: 'EFECTIVO' | 'TARJETA' | 'MIXTO') => {
    if (cart.length === 0) return;

    playPosBeep(1800, 0.12);
    setTimeout(() => playPosBeep(2400, 0.15), 140);

    // Trigger Cash Drawer kick pulse simulation
    if (paymentMethod === 'EFECTIVO' || paymentMethod === 'MIXTO') {
      setDrawerKicked(true);
      setTimeout(() => setDrawerKicked(false), 2200);
    }

    // Build thermal receipt text in 42-column ESC/POS format
    const lines: string[] = [];
    lines.push('       MOBILE SOLUTIONS POS       ');
    lines.push('    RETAIL ENTERPRISE SYSTEM      ');
    lines.push('       RFC: MSP-180420-NET        ');
    lines.push('  SUCURSAL 01 - MATRIZ CENTRO     ');
    lines.push('==========================================');
    lines.push(`FECHA: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`);
    lines.push(`TICKET FOLIO: #${ticketNumber}   TERM: POS-01`);
    lines.push(`CAJERO: JUAN PÉREZ [USR.42]`);
    lines.push(`MODO: ${onlineMode ? 'EN LÍNEA (CENTRAL)' : 'OFFLINE (SQLITE WAL)'}`);
    lines.push('------------------------------------------');
    lines.push('CANT DESC                           TOTAL ');
    lines.push('------------------------------------------');
    cart.forEach(item => {
      const lineTotal = (item.price * item.quantity).toFixed(2);
      const nameTrunc = item.name.substring(0, 24).padEnd(24, ' ');
      const qtyStr = item.quantity.toString().padStart(4, ' ');
      lines.push(`${qtyStr} ${nameTrunc} $${lineTotal.padStart(8, ' ')}`);
    });
    lines.push('------------------------------------------');
    lines.push(`SUBTOTAL:                      $${subtotal.toFixed(2).padStart(8, ' ')}`);
    if (totalDiscount > 0) {
      lines.push(`DESCUENTOS:                   -$${totalDiscount.toFixed(2).padStart(8, ' ')}`);
    }
    lines.push(`IVA (16%):                     $${totalIva.toFixed(2).padStart(8, ' ')}`);
    lines.push(`TOTAL GENERAL:                 $${grandTotal.toFixed(2).padStart(8, ' ')}`);
    lines.push('==========================================');
    lines.push(`FORMA DE PAGO:                 ${paymentMethod}`);
    lines.push(`AUTORIZACIÓN:                  AUTH-${Math.floor(100000 + Math.random() * 900000)}`);
    lines.push('           ¡GRACIAS POR SU COMPRA!        ');
    lines.push('         WWW.MOBILESOLUTIONSPOS.COM       ');
    lines.push(' [ESC/POS PAPER CUT COMMAND SENT: 1D 56 42] ');

    const receiptString = lines.join('\n');

    setLastPayment({
      method: paymentMethod,
      total: grandTotal,
      receipt: receiptString
    });

    if (!onlineMode) {
      setOfflineQueue(prev => prev + 1);
    }

    setTicketNumber(prev => prev + 1);
    setShowPaymentSuccess(true);
    setCart([]);
  };

  const handleSyncOfflineQueue = () => {
    if (offlineQueue === 0) return;
    playPosBeep(1200, 0.1);
    // Simulate sync
    setTimeout(() => {
      playPosBeep(2000, 0.2);
      setOfflineQueue(0);
    }, 800);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div id="sim-scanner" className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[rgba(0,180,216,0.2)] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#00B4D8]">
            <span>SIMULADOR INTERACTIVO WINFORMS</span>
            <span>•</span>
            <span>[SIM.POS.CORE]</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
            Terminal POS en Vivo & Motor de Venta
          </h1>
        </div>

        {/* Online / Offline switch */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <button
            onClick={onToggleOnlineMode}
            className={`px-3 py-1.5 rounded text-xs font-mono font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              onlineMode
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                : 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
            }`}
          >
            {onlineMode ? (
              <>
                <Wifi className="w-4 h-4 text-emerald-400" />
                <span>ONLINE // CENTRAL SQL SERVER</span>
              </>
            ) : (
              <>
                <WifiOff className="w-4 h-4 text-amber-400" />
                <span>OFFLINE // COLA LOCAL WAL ({offlineQueue})</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* POS Terminal Simulation Frame */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Product Scanner & Cart (7 columns) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Scanner Barcode Bar */}
          <div className="p-4 rounded-xl border border-[rgba(0,180,216,0.3)] bg-[#0A1128] shadow-lg space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-[#00B4D8]">
                <Barcode className="w-4 h-4" />
                <span>SIMULADOR DE LECTOR USB HID / RAWINPUT:</span>
              </span>
              <span className="text-slate-500 text-[10px]">PULSA ENTER O CLIC EN DEMO</span>
            </div>

            <form onSubmit={handleScanSubmit} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Escanea o teclea SKU (ej. 75010001001)..."
                  value={barcodeInput}
                  onChange={e => setBarcodeInput(e.target.value)}
                  className="w-full bg-[#060D24] border border-[rgba(0,180,216,0.3)] rounded px-3.5 py-2 text-sm font-mono text-white placeholder-slate-500 focus:outline-none focus:border-[#00B4D8] transition-colors"
                />
              </div>
              <button
                type="submit"
                className="cyber-button-primary px-4 py-2 rounded text-xs font-mono flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Escanear</span>
              </button>
            </form>

            {/* Quick Demo Products */}
            <div>
              <div className="text-[10px] font-mono text-slate-400 mb-1.5">
                ARTÍCULOS DE PRUEBA RÁPIDA (CATÁLOGO LOCAL):
              </div>
              <div className="flex flex-wrap gap-1.5">
                {SAMPLE_POS_PRODUCTS.map(prod => (
                  <button
                    key={prod.id}
                    type="button"
                    onClick={() => handleAddProduct(prod)}
                    className="px-2.5 py-1.5 rounded bg-[#0E1B38] text-[11px] text-slate-200 hover:text-[#48CAE4] border border-slate-700/80 hover:border-[#00B4D8]/50 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{prod.name.split(' ')[0]} {prod.name.split(' ')[1]}</span>
                    <span className="text-[#00B4D8] font-mono font-bold">${prod.price.toFixed(2)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Weighing scale quick tool */}
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2 text-slate-300">
                <Scale className="w-4 h-4 text-emerald-400" />
                <span>Báscula RS-232:</span>
                <span className="text-emerald-400 font-bold px-2 py-0.5 rounded bg-[#060D24] border border-slate-700">
                  {scaleWeight.toFixed(3)} KG
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setScaleWeight(prev => Math.max(0.2, Number((prev - 0.25).toFixed(3))))}
                  className="px-2 py-1 rounded bg-[#0E1B38] text-slate-300 text-[10px] hover:text-[#00B4D8]"
                >
                  -0.25kg
                </button>
                <button
                  type="button"
                  onClick={() => setScaleWeight(prev => Number((prev + 0.25).toFixed(3)))}
                  className="px-2 py-1 rounded bg-[#0E1B38] text-slate-300 text-[10px] hover:text-[#00B4D8]"
                >
                  +0.25kg
                </button>
                <button
                  type="button"
                  onClick={() => setScaleWeight(1.0)}
                  className="px-2 py-1 rounded bg-[#0E1B38] text-slate-300 text-[10px] hover:text-[#00B4D8]"
                >
                  Tarar 1.0kg
                </button>
              </div>
            </div>
          </div>

          {/* Cart Table (Windows Forms Grid Look & Feel) */}
          <div id="sim-cart" className="rounded-xl border border-[rgba(0,180,216,0.25)] bg-[#0A1128] overflow-hidden shadow-xl">
            <div className="px-4 py-3 bg-[#080E21] border-b border-[rgba(0,180,216,0.2)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-[#00B4D8]" />
                <span className="font-display font-semibold text-sm text-white">
                  Renglones de Venta ({cart.length} artículos)
                </span>
              </div>
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-rose-400 hover:text-rose-300 font-mono flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Vaciar Carrito</span>
                </button>
              )}
            </div>

            <div className="max-h-[340px] overflow-y-auto">
              {cart.length === 0 ? (
                <div className="p-10 text-center text-slate-500 font-mono text-xs space-y-2">
                  <Barcode className="w-8 h-8 text-slate-600 mx-auto opacity-50" />
                  <p>El carrito está vacío. Escanea o selecciona artículos de prueba arriba.</p>
                </div>
              ) : (
                <table className="w-full text-left border-collapse text-xs font-mono">
                  <thead>
                    <tr className="bg-[#060D24] border-b border-slate-800 text-[#48CAE4]">
                      <th className="py-2.5 px-3">Cant</th>
                      <th className="py-2.5 px-3">Descripción</th>
                      <th className="py-2.5 px-3 text-right">P. Unit</th>
                      <th className="py-2.5 px-3 text-right">Importe</th>
                      <th className="py-2.5 px-3 text-center">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {cart.map(item => {
                      const totalItem = (item.price * item.quantity) - (item.discount * item.quantity);
                      return (
                        <tr key={item.id} className="hover:bg-[#00B4D8]/5 transition-colors">
                          <td className="py-2.5 px-3 whitespace-nowrap">
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => updateQuantity(item.sku, -1)}
                                className="w-5 h-5 rounded bg-[#0E1B38] text-slate-300 hover:text-[#00B4D8] flex items-center justify-center border border-slate-700"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="font-bold text-slate-100 min-w-8 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.sku, 1)}
                                className="w-5 h-5 rounded bg-[#0E1B38] text-slate-300 hover:text-[#00B4D8] flex items-center justify-center border border-slate-700"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </td>
                          <td className="py-2.5 px-3">
                            <div className="font-sans font-medium text-slate-100 truncate max-w-[200px]">
                              {item.name}
                            </div>
                            <div className="text-[10px] text-slate-500 font-mono">
                              SKU: {item.sku} {item.isWeighed && '• Pesable'}
                            </div>
                          </td>
                          <td className="py-2.5 px-3 text-right text-slate-300">
                            ${item.price.toFixed(2)}
                          </td>
                          <td className="py-2.5 px-3 text-right font-bold text-[#00B4D8]">
                            ${totalItem.toFixed(2)}
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            <button
                              onClick={() => removeItem(item.sku)}
                              className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                              title="Eliminar producto"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>

            {/* Financial Summary Box */}
            <div className="p-4 bg-[#080E21] border-t border-[rgba(0,180,216,0.2)] flex flex-wrap items-center justify-between gap-4 font-mono">
              <div className="space-y-1 text-xs text-slate-400">
                <div className="flex gap-4">
                  <span>Subtotal:</span>
                  <span className="text-slate-200">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex gap-4">
                  <span>IVA (16%):</span>
                  <span className="text-slate-200">${totalIva.toFixed(2)}</span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-[10px] text-[#48CAE4] uppercase">TOTAL A COBRAR</div>
                <div className="text-2xl sm:text-3xl font-display font-bold text-white">
                  ${grandTotal.toFixed(2)}
                </div>
              </div>
            </div>

            {/* Checkout Action Buttons */}
            <div className="p-3 bg-[#0A1128] border-t border-[rgba(0,180,216,0.15)] grid grid-cols-2 sm:grid-cols-3 gap-2">
              <button
                disabled={cart.length === 0}
                onClick={() => handleCheckout('EFECTIVO')}
                className="py-2.5 px-3 rounded bg-emerald-500 text-[#060A17] font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-[0_0_12px_rgba(16,185,129,0.3)] cursor-pointer"
              >
                <DollarSign className="w-4 h-4" />
                <span>Efectivo (Gaveta)</span>
              </button>

              <button
                disabled={cart.length === 0}
                onClick={() => handleCheckout('TARJETA')}
                className="cyber-button-primary py-2.5 px-3 rounded text-xs flex items-center justify-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <CreditCard className="w-4 h-4" />
                <span>Tarjeta PinPad</span>
              </button>

              <button
                disabled={cart.length === 0}
                onClick={() => handleCheckout('MIXTO')}
                className="cyber-button-outline py-2.5 px-3 rounded text-xs col-span-2 sm:col-span-1 flex items-center justify-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <Zap className="w-4 h-4 text-[#00B4D8]" />
                <span>Pago Mixto</span>
              </button>
            </div>
          </div>

          {/* Solenoid Cash Drawer status banner */}
          {drawerKicked && (
            <div className="p-3 rounded-lg bg-amber-500/20 border border-amber-500/50 text-amber-200 text-xs font-mono flex items-center justify-between animate-bounce">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-400 animate-ping" />
                <span>¡GAVETA DE DINERO ABIERTA! COMANDO: [1B 70 00 19 FA] SOLENOIDE 24V ACTIVADO</span>
              </div>
              <span className="text-[10px] text-amber-300">RJ-11 PIN 2</span>
            </div>
          )}
        </div>

        {/* Right: Thermal Receipt & Hex Inspector (5 columns) */}
        <div id="sim-ticket" className="lg:col-span-5 space-y-4">
          <div className="rounded-xl border border-[rgba(0,180,216,0.3)] bg-[#0A1128] overflow-hidden shadow-xl">
            {/* Header Tabs */}
            <div className="px-4 py-2.5 bg-[#080E21] border-b border-[rgba(0,180,216,0.2)] flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <Printer className="w-4 h-4 text-[#00B4D8]" />
                <span className="font-semibold text-white">Impresora Térmica 80mm</span>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => setActiveTabReceipt('preview')}
                  className={`px-2 py-1 rounded text-[10px] ${
                    activeTabReceipt === 'preview'
                      ? 'bg-[#0E1B38] text-[#00B4D8] border border-[#00B4D8]/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Vista Ticket
                </button>
                <button
                  onClick={() => setActiveTabReceipt('hex')}
                  className={`px-2 py-1 rounded text-[10px] ${
                    activeTabReceipt === 'hex'
                      ? 'bg-[#0E1B38] text-[#00B4D8] border border-[#00B4D8]/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Trama Hex ESC/POS
                </button>
              </div>
            </div>

            {/* Thermal paper look */}
            <div className="p-4 bg-[#050A19] min-h-[420px] flex flex-col justify-between">
              {lastPayment ? (
                activeTabReceipt === 'preview' ? (
                  <div className="bg-[#FAF9F6] text-[#1A1A1A] font-mono text-[11px] p-4 rounded shadow-md border border-neutral-300 leading-tight select-text max-h-[460px] overflow-y-auto">
                    <pre className="whitespace-pre font-mono">{lastPayment.receipt}</pre>
                    {/* Visual Barcode on Receipt */}
                    <div className="mt-4 pt-2 border-t border-dashed border-neutral-400 text-center">
                      <div className="h-8 bg-neutral-900 mx-auto w-48 flex items-center justify-around px-1">
                        {Array.from({ length: 32 }).map((_, i) => (
                          <div
                            key={i}
                            className={`h-full ${i % 3 === 0 ? 'w-1 bg-white' : 'w-0.5 bg-neutral-900'}`}
                          />
                        ))}
                      </div>
                      <div className="text-[9px] mt-1 tracking-widest text-neutral-600">
                        *MSP-{ticketNumber}*
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-[#060D24] text-[#48CAE4] font-mono text-[11px] rounded border border-slate-800 leading-relaxed overflow-x-auto max-h-[460px]">
                    <div className="text-slate-400 pb-2 border-b border-slate-800 mb-2">
                      // TRAMA CRUDA ESC/POS ENVIADA A PUERTO SERIE COM1:
                    </div>
                    <div className="text-[#00B4D8] font-bold">
                      1B 40 <span className="text-slate-400 font-normal">// ESC @ Init</span>
                    </div>
                    <div className="text-[#00B4D8] font-bold">
                      1B 61 01 <span className="text-slate-400 font-normal">// ESC a 1 Center Align</span>
                    </div>
                    <div className="text-[#00B4D8] font-bold">
                      1B 45 01 <span className="text-slate-400 font-normal">// ESC E 1 Bold ON</span>
                    </div>
                    <div className="text-slate-300">
                      4D 6F 62 69 6C 65 20 53 6F 6C 75 74 69 6F 6E 73 20 50 4F 53 0A
                    </div>
                    <div className="text-[#00B4D8] font-bold">
                      1B 70 00 19 FA <span className="text-amber-400 font-normal">// Kick Cash Drawer</span>
                    </div>
                    <div className="text-[#00B4D8] font-bold">
                      1D 56 42 00 <span className="text-emerald-400 font-normal">// GS V 66 0 Partial Cut</span>
                    </div>
                  </div>
                )
              ) : (
                <div className="p-12 text-center text-slate-500 font-mono text-xs space-y-3">
                  <Printer className="w-10 h-10 text-slate-600 mx-auto opacity-40" />
                  <p>Realiza un cobro para generar e imprimir el ticket térmico en 80mm.</p>
                </div>
              )}

              {/* Status footer on receipt panel */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Buffer Impresora: <strong className="text-emerald-400">0 KB (Libre)</strong></span>
                <span className="text-slate-500">Cuchilla: Automática</span>
              </div>
            </div>
          </div>

          {/* Offline Queue Sync Manager Banner */}
          {!onlineMode && offlineQueue > 0 && (
            <div className="p-4 rounded-xl border border-amber-500/40 bg-[#0E1B38] space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-amber-300 font-semibold">
                <span className="flex items-center gap-1.5">
                  <HardDrive className="w-4 h-4 text-amber-400" />
                  <span>COLA TRANSACCIONAL LOCAL OFFLINE (WAL)</span>
                </span>
                <span className="px-1.5 py-0.2 rounded bg-amber-500/20 border border-amber-500/40">
                  {offlineQueue} Pendientes
                </span>
              </div>
              <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                Cada ticket se resguarda atómicamente en la base local SQLite con firma HMAC-SHA256 para prevenir fraude mientras no haya internet en la sucursal.
              </p>
              <button
                onClick={handleSyncOfflineQueue}
                className="w-full py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-[#060A17] font-semibold text-xs font-mono transition-colors flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Simular Sincronización Manual al Servidor Central</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
