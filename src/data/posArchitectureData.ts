import { ArchitectureLayer, DatabaseTable, HardwarePeripheral, CodeSnippet, POSCartItem } from '../types';

export const SYSTEM_META = {
  title: 'Mobile Solutions POS',
  framework: '.NET Framework 4.8 / Windows Forms',
  language: 'C# 9.0',
  architecture: 'Offline-First N-Tier Architecture (HAL + Dapper + SQLite WAL + SQL Server)',
  uptimeTarget: '99.999% SLA en Puntos de Venta',
  latencyScanToCart: '< 18ms',
  coldStartTime: '1.1s (NGEN Native Image Generator)',
  ramFootprint: '82 - 94 MB Working Set',
  version: 'v4.8.2-LTS',
  status: 'ONLINE'
};

export const ARCHITECTURE_LAYERS: ArchitectureLayer[] = [
  {
    id: 'layer-presentation',
    name: 'Capa de Presentación (UI & Touch Experience)',
    code: 'SYS.UI.WINFORMS',
    color: '#00B4D8',
    description: 'Interfaz gráfica desarrollada en Windows Forms acelerada por GDI+ Double Buffering y controles DevExpress optimizados para pantallas táctiles de 10" a 24".',
    assemblies: [
      'MobileSolutions.POS.UI.exe',
      'MobileSolutions.POS.Controls.dll',
      'DevExpress.XtraBars.v21.2.dll'
    ],
    responsibilities: [
      'Captura táctil de alta respuesta y teclado virtual numérico en pantalla',
      'Interceptación de códigos de barra mediante Win32 RawInput API sin requerir foco en TextBox',
      'Renderizado a 60 FPS con eliminación de parpadeo (SetStyle OptimizedDoubleBuffer)',
      'Notificaciones sonoras POS y avisos visuales de confirmación de cobro',
      'Soporte multimonitor: Pantalla principal para cajero y segunda pantalla para cliente'
    ],
    technologies: ['Windows Forms', 'C# GDI+', 'Win32 User32.dll Hooks', 'DevExpress WinForms Skinning'],
    interfaces: ['ITouchPosView', 'IBarcodeNotificationHandler', 'ICustomerDisplayView']
  },
  {
    id: 'layer-business',
    name: 'Capa de Lógica de Negocio & Motor de Precios',
    code: 'SYS.CORE.ENGINE',
    color: '#48CAE4',
    description: 'Motor transaccional central con cálculo de impuestos compuestos, matrices de descuentos por volumen, control de inventario en tiempo real y turnos de caja.',
    assemblies: [
      'MobileSolutions.POS.Core.dll',
      'MobileSolutions.POS.Domain.dll'
    ],
    responsibilities: [
      'Evaluación de reglas de precios (2x1, mayoreo, monedero electrónico, cupones)',
      'Cálculo de impuestos fiscales (IVA 16%, IEPS desglosado, retenciones)',
      'Gestión de sesiones de caja (Arqueo, apertura, cortes X y Z, control de sobrantes/faltantes)',
      'Máquina de estados finitos para la transacción de venta (Borrador -> Pagada -> Fiscalizada)',
      'Autenticación criptográfica de operadores y roles con permisos granulares (RBAC)'
    ],
    technologies: ['C# Domain-Driven Design (DDD)', 'State Pattern', 'FluentValidation', 'Autofac IoC'],
    interfaces: ['IPricingEngine', 'ITransactionService', 'IShiftManager', 'ITaxCalculator']
  },
  {
    id: 'layer-hal',
    name: 'Capa de Abstracción de Hardware (HAL)',
    code: 'SYS.HAL.DRIVERS',
    color: '#58D6F1',
    description: 'Controladores desacoplados para periféricos punto de venta a través de puertos serie RS-232, USB Virtual COM, OPOS y sockets Ethernet.',
    assemblies: [
      'MobileSolutions.Hardware.dll',
      'MobileSolutions.Hardware.EscPos.dll',
      'MobileSolutions.Hardware.Opos.dll'
    ],
    responsibilities: [
      'Traductor universal ESC/POS con generación de tickets térmicos y corte guillotine automático',
      'Disparo de solenoide de gaveta de dinero vía pulso DK en pin 2 o tarjeta de relé USB',
      'Lector de básculas electrónicas con filtrado de fluctuaciones y comando Tare/Zero',
      'Transmisión de totales y bienvenida a Visor VFD de 20x2 caracteres en puerto COM',
      'Conexión con terminales bancarias PinPad (Verifone/Ingenico) bajo protocolo EMV/OPI'
    ],
    technologies: ['System.IO.Ports.SerialPort', 'Win32 Direct USB COM', 'ESC/POS Standard', 'OPOS Common Controls'],
    interfaces: ['IReceiptPrinter', 'IScaleReader', 'ICashDrawer', 'ICustomerVfdDisplay', 'IPinPadService']
  },
  {
    id: 'layer-data',
    name: 'Capa de Datos Híbrida & Resiliencia Offline',
    code: 'SYS.DATA.PERSISTENCE',
    color: '#0077B6',
    description: 'Arquitectura de doble persistencia: Caché local ultra-rápida SQLite con Write-Ahead Logging (WAL) y conexión a Microsoft SQL Server corporativo vía Dapper.',
    assemblies: [
      'MobileSolutions.Data.dll',
      'MobileSolutions.Data.Sqlite.dll',
      'Dapper.dll'
    ],
    responsibilities: [
      'Almacenamiento offline ininterrumpido ante caída de red o falla de servidor central',
      'Consultas parametrizadas de ultra-baja latencia (< 3ms) para búsqueda de catálogo de 150,000 SKUs',
      'Firma HMAC-SHA256 en cada registro local para prevenir manipulación no autorizada de tickets',
      'Gestión de conexiones resilientes con Polly (circuit breaker y reintentos automáticos)',
      'Mapeo objeto-relacional optimizado mediante micro-ORM Dapper'
    ],
    technologies: ['Microsoft SQL Server 2019', 'SQLite 3.39+ con WAL Mode', 'Dapper Micro-ORM', 'Polly Resilience Policy'],
    interfaces: ['ITransactionRepository', 'IProductCatalogRepository', 'IOfflineJournalQueue']
  },
  {
    id: 'layer-sync',
    name: 'Capa de Sincronización & Gateway Cloud',
    code: 'SYS.SYNC.GATEWAY',
    color: '#94CCFF',
    description: 'Servicio en segundo plano que transmite deltas de ventas, actualiza existencias e inventario y sincroniza cambios de precios sin bloquear la UI.',
    assemblies: [
      'MobileSolutions.SyncService.dll',
      'MobileSolutions.Shared.Contracts.dll'
    ],
    responsibilities: [
      'Detección automática de conectividad (Heartbeat periódico al servidor central)',
      'Empaquetado y compresión GZip de lotes de transacciones pendientes en cola',
      'Resolución de conflictos de concurrencia mediante timestamps e idempotency tokens',
      'Actualización delta de catálogo de productos (solo descarga artículos modificados)',
      'Cifrado en tránsito TLS 1.3 con validación de certificado digital de tienda'
    ],
    technologies: ['System.Threading.Tasks.Dataflow', 'GZipStream', 'HttpClient con SocketsHttpHandler', 'MessagePack'],
    interfaces: ['ISyncEngine', 'IConnectivityMonitor', 'IDeltaConflictResolver']
  }
];

export const HARDWARE_PERIPHERALS: HardwarePeripheral[] = [
  {
    id: 'periph-printer',
    name: 'Epson TM-T20III / TM-T88VI Thermal Printer',
    type: 'printer',
    protocol: 'ESC/POS Standard (Command Mode)',
    interfacePort: 'COM1 / USB Virtual Serial / Ethernet 9100',
    baudRate: '115200 bps, 8 Data Bits, None Parity, 1 Stop Bit',
    driverType: 'ESC/POS',
    description: 'Impresora térmica de 80mm de alta velocidad (250 mm/s) con buffer de 4KB y cuchilla de corte parcial.',
    status: 'connected',
    commands: [
      { name: 'Initialize Printer', hex: '1B 40', description: 'Restaura valores de fábrica y limpia buffer' },
      { name: 'Align Center', hex: '1B 61 01', description: 'Alinea texto al centro para encabezado' },
      { name: 'Emphasized Mode ON', hex: '1B 45 01', description: 'Activa texto en negrita de alta intensidad' },
      { name: 'Partial Cut Paper', hex: '1D 56 42 00', description: 'Alimenta papel 4 líneas y ejecuta corte de papel' },
      { name: 'Kick Cash Drawer Pin 2', hex: '1B 70 00 19 FA', description: 'Genera pulso eléctrico de 24V (50ms) en conector RJ-11' }
    ]
  },
  {
    id: 'periph-scanner',
    name: 'Honeywell Xenon 1900 / Zebra DS2208 2D Imager',
    type: 'scanner',
    protocol: 'Win32 RawInput Intercept / HID POS',
    interfacePort: 'USB HID (Device Class 0x03)',
    driverType: 'Win32 RawInput',
    description: 'Lector óptico 1D/2D con captura a nivel de mensaje de ventana Win32 para no depender del enfoque del cursor.',
    status: 'connected',
    commands: [
      { name: 'Register RawInput', hex: 'RIDEV_INPUTSINK', description: 'Registra interceptación global en el HWND del Formulario' },
      { name: 'Trigger Aiming Beep', hex: '07', description: 'Sonido de confirmación sonora de decodificación exitosa' },
      { name: 'Prefix Suffix Guard', hex: 'STX [DATA] ETX', description: 'Delimitadores de paquete para prevenir lecturas truncadas' }
    ]
  },
  {
    id: 'periph-scale',
    name: 'Mettler Toledo Ariva-S / CAS PD-II Scale',
    type: 'scale',
    protocol: 'Continuous Stream RS-232 / Toledo 8217 protocol',
    interfacePort: 'COM3 (Serial RS-232 DB9)',
    baudRate: '9600 bps, 7 Data Bits, Even Parity, 1 Stop Bit',
    driverType: 'Direct COM',
    description: 'Báscula de mostrador para productos pesables a granel (frutas, verduras, carnes) con calibración certificada.',
    status: 'connected',
    commands: [
      { name: 'Request Weight (Poll)', hex: '57 0D', description: 'Envía carácter "W" + CR para solicitar lectura de peso neto' },
      { name: 'Zero Command', hex: '5A 0D', description: 'Comando "Z" para calibrar en cero el platillo de pesaje' },
      { name: 'Tare Command', hex: '54 0D', description: 'Comando "T" para tarar el peso del contenedor' }
    ]
  },
  {
    id: 'periph-display',
    name: 'Partner Tech CD-7220 VFD Customer Display',
    type: 'display',
    protocol: 'Epson/Noritake VFD Command Set (20x2 char)',
    interfacePort: 'COM4 (Serial RS-232)',
    baudRate: '9600 bps, 8 Data Bits, None Parity, 1 Stop Bit',
    driverType: 'Direct COM',
    description: 'Visor fluorescente de vacío para visualización de precios y total al cliente durante el escaneo.',
    status: 'connected',
    commands: [
      { name: 'Clear Screen', hex: '0C', description: 'Limpia ambas líneas del visor fluorescente' },
      { name: 'Cursor Home', hex: '0B', description: 'Posiciona cursor en línea 1, columna 1' },
      { name: 'Move Line 2', hex: '1F 42', description: 'Mueve cursor a línea 2 para desplegar Total a Pagar' }
    ]
  },
  {
    id: 'periph-drawer',
    name: 'APG Series 100 Cash Drawer (Heavy Duty)',
    type: 'drawer',
    protocol: 'Dual Solenoid RJ-11 Pulse (Driven by Printer or USB Module)',
    interfacePort: 'RJ-11 DK Port',
    driverType: 'ESC/POS',
    description: 'Gaveta de efectivo con microinterruptor de estado de apertura (Switch Sensor) para auditoría de caja.',
    status: 'connected',
    commands: [
      { name: 'Query Drawer Status', hex: '10 04 01', description: 'Consulta en tiempo real (DLE EOT 1) si la gaveta está abierta o cerrada' },
      { name: 'Pulse Drawer 1', hex: '1B 70 00 1E 78', description: 'Pulso de apertura a bobina 1 (60ms ON / 240ms OFF)' }
    ]
  },
  {
    id: 'periph-pinpad',
    name: 'Verifone VX820 / Lane 3000 EMV PinPad',
    type: 'pinpad',
    protocol: 'ISO-8583 / ZVT / Direct OPI Integration',
    interfacePort: 'Ethernet LAN 192.168.1.150:8080',
    driverType: 'Ethernet TCP/IP',
    description: 'Terminal bancaria para cobro con chip, banda magnética y Contactless (NFC / Apple Pay / Google Pay).',
    status: 'connected',
    commands: [
      { name: 'Sale Auth Request', hex: '02 00 ... 03', description: 'Trama de inicio de transacción con monto y ticket ID' },
      { name: 'Cancel Operation', hex: '04 00 ... 03', description: 'Cancela cobro si el usuario presiona botón rojo en PinPad' }
    ]
  }
];

export const CODE_SNIPPETS: CodeSnippet[] = [
  {
    id: 'code-escpos',
    filename: 'EscPosPrinterDriver.cs',
    assembly: 'MobileSolutions.Hardware.EscPos.dll',
    namespace: 'MobileSolutions.Hardware.EscPos',
    language: 'csharp',
    description: 'Driver nativo ESC/POS implementado sobre System.IO.Ports.SerialPort con soporte para control de flujo RTS/CTS y emisión de bytes crudos.',
    linesOfCode: 98,
    code: `using System;
using System.IO.Ports;
using System.Text;
using MobileSolutions.Hardware.Contracts;

namespace MobileSolutions.Hardware.EscPos
{
    /// <summary>
    /// Driver de alto rendimiento para impresoras térmicas ESC/POS.
    /// Diseñado para operaciones sub-milimétricas en Mobile Solutions POS.
    /// </summary>
    public sealed class EscPosPrinterDriver : IReceiptPrinter, IDisposable
    {
        private readonly SerialPort _port;
        private readonly object _syncLock = new object();

        // Comandos ESC/POS estándar
        private static readonly byte[] CmdInit = new byte[] { 0x1B, 0x40 };
        private static readonly byte[] CmdAlignLeft = new byte[] { 0x1B, 0x61, 0x00 };
        private static readonly byte[] CmdAlignCenter = new byte[] { 0x1B, 0x61, 0x01 };
        private static readonly byte[] CmdAlignRight = new byte[] { 0x1B, 0x61, 0x02 };
        private static readonly byte[] CmdBoldOn = new byte[] { 0x1B, 0x45, 0x01 };
        private static readonly byte[] CmdBoldOff = new byte[] { 0x1B, 0x45, 0x00 };
        private static readonly byte[] CmdFeedAndCut = new byte[] { 0x1D, 0x56, 0x42, 0x00 };
        private static readonly byte[] CmdKickDrawer = new byte[] { 0x1B, 0x70, 0x00, 0x19, 0xFA };

        public EscPosPrinterDriver(string portName, int baudRate = 115200)
        {
            _port = new SerialPort(portName, baudRate, Parity.None, 8, StopBits.One)
            {
                Handshake = Handshake.RequestToSend,
                WriteTimeout = 3000,
                ReadTimeout = 2000,
                Encoding = Encoding.GetEncoding(850) // CodePage 850 (Latin-1)
            };
        }

        public void Open()
        {
            lock (_syncLock)
            {
                if (!_port.IsOpen)
                {
                    _port.Open();
                    _port.Write(CmdInit, 0, CmdInit.Length);
                }
            }
        }

        public void PrintTicket(ReceiptModel receipt)
        {
            lock (_syncLock)
            {
                Open();
                
                // Encabezado
                _port.Write(CmdAlignCenter, 0, CmdAlignCenter.Length);
                _port.Write(CmdBoldOn, 0, CmdBoldOn.Length);
                WriteTextLine(receipt.StoreName);
                _port.Write(CmdBoldOff, 0, CmdBoldOff.Length);
                WriteTextLine($"RFC: {receipt.StoreTaxId}");
                WriteTextLine($"Folio: {receipt.TicketNumber} | Terminal: {receipt.TerminalId}");
                WriteTextLine(new string('-', 42));

                // Detalle de Venta
                _port.Write(CmdAlignLeft, 0, CmdAlignLeft.Length);
                foreach (var item in receipt.Items)
                {
                    string line = $"{item.Quantity,2}x {item.Description,-24} {item.Total,10:C2}";
                    WriteTextLine(line);
                }

                WriteTextLine(new string('-', 42));

                // Totales
                _port.Write(CmdAlignRight, 0, CmdAlignRight.Length);
                WriteTextLine($"SUBTOTAL: {receipt.Subtotal,12:C2}");
                WriteTextLine($"IVA (16%): {receipt.TaxTotal,12:C2}");
                _port.Write(CmdBoldOn, 0, CmdBoldOn.Length);
                WriteTextLine($"TOTAL: {receipt.GrandTotal,12:C2}");
                _port.Write(CmdBoldOff, 0, CmdBoldOff.Length);

                // Corte de papel
                _port.Write(CmdFeedAndCut, 0, CmdFeedAndCut.Length);
            }
        }

        public void OpenCashDrawer()
        {
            lock (_syncLock)
            {
                Open();
                _port.Write(CmdKickDrawer, 0, CmdKickDrawer.Length);
            }
        }

        private void WriteTextLine(string text)
        {
            byte[] bytes = Encoding.GetEncoding(850).GetBytes(text + "\\n");
            _port.Write(bytes, 0, bytes.Length);
        }

        public void Dispose()
        {
            if (_port.IsOpen) _port.Close();
            _port.Dispose();
        }
    }
}`
  },
  {
    id: 'code-rawinput',
    filename: 'RawInputBarcodeHook.cs',
    assembly: 'MobileSolutions.POS.Controls.dll',
    namespace: 'MobileSolutions.POS.Controls.Hardware',
    language: 'csharp',
    description: 'Captura de escáner USB HID mediante la API de bajo nivel Win32 RawInput. Garantiza lectura instantánea sin perder el foco en formularios WinForms.',
    linesOfCode: 84,
    code: `using System;
using System.Runtime.InteropServices;
using System.Text;
using System.Windows.Forms;

namespace MobileSolutions.POS.Controls.Hardware
{
    /// <summary>
    /// Intercepta tramas de lectores de códigos de barra mediante Win32 RawInput (WM_INPUT).
    /// Evita la pérdida de lectura si el cajero no tiene el cursor en el campo de texto.
    /// </summary>
    public sealed class RawInputBarcodeHook : NativeWindow, IDisposable
    {
        private const int WM_INPUT = 0x00FF;
        private const int RID_INPUT = 0x10000003;
        private const int RIDEV_INPUTSINK = 0x00000100;

        public event Action<string> BarcodeScanned;
        private readonly StringBuilder _buffer = new StringBuilder();

        [StructLayout(LayoutKind.Sequential)]
        private struct RAWINPUTDEVICE
        {
            public ushort usUsagePage;
            public ushort usUsage;
            public uint dwFlags;
            public IntPtr hwndTarget;
        }

        [DllImport("user32.dll")]
        private static extern bool RegisterRawInputDevices(
            [MarshalAs(UnmanagedType.LPArray, SizeParamIndex = 1)] RAWINPUTDEVICE[] pRawInputDevices,
            uint uiNumDevices,
            uint cbSize);

        [DllImport("user32.dll")]
        private static extern uint GetRawInputData(
            IntPtr hRawInput,
            uint uiCommand,
            IntPtr pData,
            ref uint pcbSize,
            uint cbSizeHeader);

        public RawInputBarcodeHook(Form parentForm)
        {
            AssignHandle(parentForm.Handle);

            // Registrar dispositivos de teclado USB (UsagePage 0x01, Usage 0x06)
            var devices = new RAWINPUTDEVICE[]
            {
                new RAWINPUTDEVICE
                {
                    usUsagePage = 0x01, // Generic Desktop Controls
                    usUsage = 0x06,     // Keyboard
                    dwFlags = RIDEV_INPUTSINK, // Captura aun si la app no tiene foco directo
                    hwndTarget = Handle
                }
            };

            RegisterRawInputDevices(devices, (uint)devices.Length, (uint)Marshal.SizeOf(typeof(RAWINPUTDEVICE)));
        }

        protected override void WndProc(ref Message m)
        {
            if (m.Msg == WM_INPUT)
            {
                ProcessRawInput(m.LParam);
            }
            base.WndProc(ref m);
        }

        private void ProcessRawInput(IntPtr hRawInput)
        {
            // Decodifica la tecla escaneada a alta velocidad...
            // Al detectar tecla Enter (0x0D), dispara evento BarcodeScanned con el SKU acumulado.
        }

        public void Dispose()
        {
            ReleaseHandle();
        }
    }
}`
  },
  {
    id: 'code-sqlite-wal',
    filename: 'OfflineTransactionJournal.cs',
    assembly: 'MobileSolutions.Data.Sqlite.dll',
    namespace: 'MobileSolutions.Data.Sqlite',
    language: 'csharp',
    description: 'Gestor de persistencia transaccional offline utilizando SQLite con modo WAL (Write-Ahead Logging) y firma HMAC para integridad a prueba de fallos.',
    linesOfCode: 92,
    code: `using System;
using System.Data.SQLite;
using System.Security.Cryptography;
using System.Text;
using Dapper;
using MobileSolutions.POS.Domain.Entities;

namespace MobileSolutions.Data.Sqlite
{
    /// <summary>
    /// Cola transaccional offline local.
    /// Configura SQLite en modo WAL para escritura atómica en menos de 2ms.
    /// </summary>
    public sealed class OfflineTransactionJournal : IOfflineJournalQueue
    {
        private readonly string _connectionString;
        private readonly byte[] _hmacSecretKey;

        public OfflineTransactionJournal(string dbPath, byte[] hmacSecretKey)
        {
            _connectionString = $"Data Source={dbPath};Version=3;Journal Mode=WAL;Synchronous=Normal;BusyTimeout=5000;";
            _hmacSecretKey = hmacSecretKey;
            InitializeSchema();
        }

        private void InitializeSchema()
        {
            using (var conn = new SQLiteConnection(_connectionString))
            {
                conn.Open();
                // Activar PRAGMA optimizados para alta concurrencia en POS
                conn.Execute("PRAGMA journal_mode = WAL;");
                conn.Execute("PRAGMA synchronous = NORMAL;");
                conn.Execute("PRAGMA temp_store = MEMORY;");

                conn.Execute(@"
                    CREATE TABLE IF NOT EXISTS OfflineQueue (
                        QueueId INTEGER PRIMARY KEY AUTOINCREMENT,
                        TransactionGuid TEXT NOT NULL UNIQUE,
                        TerminalId TEXT NOT NULL,
                        PayloadJson TEXT NOT NULL,
                        TotalAmount REAL NOT NULL,
                        CreatedAt DATETIME NOT NULL,
                        IsSynced INTEGER NOT NULL DEFAULT 0,
                        HmacSignature TEXT NOT NULL
                    );
                    CREATE INDEX IF NOT EXISTS IX_OfflineQueue_Sync ON OfflineQueue(IsSynced, CreatedAt);
                ");
            }
        }

        public long EnqueueTransaction(SaleTransaction sale, string payloadJson)
        {
            string signature = ComputeHmac(payloadJson);

            using (var conn = new SQLiteConnection(_connectionString))
            {
                conn.Open();
                using (var tx = conn.BeginTransaction())
                {
                    string sql = @"
                        INSERT INTO OfflineQueue 
                        (TransactionGuid, TerminalId, PayloadJson, TotalAmount, CreatedAt, IsSynced, HmacSignature)
                        VALUES 
                        (@Guid, @Terminal, @Payload, @Total, @Created, 0, @Hmac);
                        SELECT last_insert_rowid();";

                    long id = conn.ExecuteScalar<long>(sql, new
                    {
                        Guid = sale.TransactionGuid.ToString(),
                        Terminal = sale.TerminalId,
                        Payload = payloadJson,
                        Total = sale.Total,
                        Created = DateTime.UtcNow,
                        Hmac = signature
                    }, tx);

                    tx.Commit();
                    return id;
                }
            }
        }

        private string ComputeHmac(string data)
        {
            using (var hmac = new HMACSHA256(_hmacSecretKey))
            {
                byte[] hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(data));
                return Convert.ToBase64String(hash);
            }
        }
    }
}`
  },
  {
    id: 'code-sync-engine',
    filename: 'SyncWorkerService.cs',
    assembly: 'MobileSolutions.SyncService.dll',
    namespace: 'MobileSolutions.SyncService',
    language: 'csharp',
    description: 'Servicio en background con reintentos exponenciales Polly, compresión GZip de lotes transaccionales y resolución de concurrencia.',
    linesOfCode: 104,
    code: `using System;
using System.IO;
using System.IO.Compression;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using MobileSolutions.Data.Sqlite;
using Polly;

namespace MobileSolutions.SyncService
{
    /// <summary>
    /// Worker asíncrono para transmisión continua de deltas transaccionales al servidor central.
    /// Implementa idempotencia y compresión para puntos de venta con conexiones celulares o inestables.
    /// </summary>
    public sealed class SyncWorkerService : IDisposable
    {
        private readonly HttpClient _httpClient;
        private readonly OfflineTransactionJournal _journal;
        private readonly CancellationTokenSource _cts = new CancellationTokenSource();
        private readonly string _centralApiEndpoint;

        public SyncWorkerService(OfflineTransactionJournal journal, string centralApiEndpoint, string storeAuthToken)
        {
            _journal = journal;
            _centralApiEndpoint = centralApiEndpoint;

            _httpClient = new HttpClient(new SocketsHttpHandler
            {
                PooledConnectionLifetime = TimeSpan.FromMinutes(15),
                EnableMultipleHttp2Connections = true
            })
            {
                Timeout = TimeSpan.FromSeconds(15)
            };
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", storeAuthToken);
        }

        public async Task StartSyncLoopAsync()
        {
            var retryPolicy = Policy
                .Handle<HttpRequestException>()
                .Or<TaskCanceledException>()
                .WaitAndRetryAsync(5, attempt => TimeSpan.FromSeconds(Math.Pow(2, attempt)));

            while (!_cts.Token.IsCancellationRequested)
            {
                try
                {
                    await FlushPendingQueueAsync(retryPolicy);
                    await Task.Delay(TimeSpan.FromSeconds(5), _cts.Token);
                }
                catch (OperationCanceledException) { break; }
                catch (Exception ex)
                {
                    // Registro en log de contingencia local
                    Console.WriteLine($"[SYNC ERR] Error de sincronización: {ex.Message}");
                    await Task.Delay(TimeSpan.FromSeconds(10), _cts.Token);
                }
            }
        }

        private async Task FlushPendingQueueAsync(IAsyncPolicy policy)
        {
            // Extrae paquete de hasta 50 transacciones sin sincronizar
            var pendingBatch = _journal.GetUnsyncedBatch(50);
            if (pendingBatch.Count == 0) return;

            string jsonPayload = SerializeBatch(pendingBatch);
            byte[] compressedBytes = CompressGZip(jsonPayload);

            await policy.ExecuteAsync(async () =>
            {
                using (var content = new ByteArrayContent(compressedBytes))
                {
                    content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
                    content.Headers.ContentEncoding.Add("gzip");
                    content.Headers.Add("X-Terminal-BatchId", Guid.NewGuid().ToString());

                    var response = await _httpClient.PostAsync($"{_centralApiEndpoint}/api/pos/v1/sync-batch", content, _cts.Token);
                    response.EnsureSuccessStatusCode();

                    // Marcar transacciones como sincronizadas en la base local SQLite
                    _journal.MarkBatchAsSynced(pendingBatch);
                }
            });
        }

        private byte[] CompressGZip(string rawText)
        {
            using (var memory = new MemoryStream())
            {
                using (var gzip = new GZipStream(memory, CompressionLevel.Optimal))
                using (var writer = new StreamWriter(gzip, Encoding.UTF8))
                {
                    writer.Write(rawText);
                }
                return memory.ToArray();
            }
        }

        public void Dispose()
        {
            _cts.Cancel();
            _httpClient.Dispose();
        }
    }
}`
  }
];

export const DATABASE_TABLES: DatabaseTable[] = [
  {
    name: 'Ventas_Transacciones',
    engine: 'Both',
    description: 'Cabecera transaccional de cada ticket de venta generado en la caja.',
    primaryKey: 'VentaID (BIGINT en SQL Server / INTEGER en SQLite)',
    columns: [
      { name: 'VentaID', type: 'BIGINT / INTEGER', nullable: false, description: 'Identificador secuencial de la venta' },
      { name: 'VentaGuid', type: 'UNIQUEIDENTIFIER / TEXT', nullable: false, description: 'GUID único global de la transacción' },
      { name: 'TerminalID', type: 'NVARCHAR(16) / TEXT', nullable: false, description: 'Identificador físico de la caja (ej. POS-01)' },
      { name: 'CajaSesionID', type: 'BIGINT / INTEGER', nullable: false, description: 'Referencia a la sesión o turno de cajero' },
      { name: 'CajeroUsuarioID', type: 'INT / INTEGER', nullable: false, description: 'Usuario que firmó la transacción' },
      { name: 'Subtotal', type: 'DECIMAL(18,4) / REAL', nullable: false, description: 'Monto antes de gravámenes y promociones' },
      { name: 'DescuentoTotal', type: 'DECIMAL(18,4) / REAL', nullable: false, description: 'Descuentos acumulados aplicados' },
      { name: 'ImpuestoIVA', type: 'DECIMAL(18,4) / REAL', nullable: false, description: 'Total de IVA 16% calculado' },
      { name: 'TotalGeneral', type: 'DECIMAL(18,4) / REAL', nullable: false, description: 'Monto final cobrado al cliente' },
      { name: 'Estado', type: 'TINYINT / INTEGER', nullable: false, description: '1: Pagada, 2: Cancelada, 3: Devolución' },
      { name: 'Sincronizado', type: 'BIT / INTEGER', nullable: false, description: 'Bandera de conciliación con servidor central' },
      { name: 'FechaHoraRegistro', type: 'DATETIME / TEXT', nullable: false, description: 'Timestamp UTC de alta del registro' }
    ],
    indices: [
      'PK_Ventas_VentaID (Clustered)',
      'IX_Ventas_Guid (UNIQUE VentaGuid)',
      'IX_Ventas_Sincronizacion (Sincronizado, FechaHoraRegistro)'
    ]
  },
  {
    name: 'Ventas_Detalle',
    engine: 'Both',
    description: 'Renglones individuales de productos, cantidades, precios unitarios e impuestos.',
    primaryKey: 'DetalleID',
    columns: [
      { name: 'DetalleID', type: 'BIGINT / INTEGER', nullable: false, description: 'ID autonumérico del renglón' },
      { name: 'VentaID', type: 'BIGINT / INTEGER', nullable: false, description: 'Clave foránea hacia Ventas_Transacciones' },
      { name: 'ProductoID', type: 'INT / INTEGER', nullable: false, description: 'Clave del producto en el catálogo maestro' },
      { name: 'CodigoBarras', type: 'VARCHAR(32) / TEXT', nullable: false, description: 'Código escaneado (EAN-13, UPC, Code128)' },
      { name: 'Descripcion', type: 'NVARCHAR(120) / TEXT', nullable: false, description: 'Nombre descriptivo capturado al momento' },
      { name: 'Cantidad', type: 'DECIMAL(12,4) / REAL', nullable: false, description: 'Unidades o kilogramos despachados' },
      { name: 'PrecioUnitario', type: 'DECIMAL(18,4) / REAL', nullable: false, description: 'Precio de lista vigente en la transacción' },
      { name: 'PorcentajeDescuento', type: 'DECIMAL(5,2) / REAL', nullable: false, description: 'Descuento porcentual otorgado' },
      { name: 'MontoImporte', type: 'DECIMAL(18,4) / REAL', nullable: false, description: 'Subtotal neto del renglón' },
      { name: 'EsPesable', type: 'BIT / INTEGER', nullable: false, description: 'Indica si provino de báscula RS-232' }
    ],
    indices: [
      'PK_Ventas_Detalle (Clustered)',
      'IX_Detalle_VentaID (FK VentaID)',
      'IX_Detalle_Producto (ProductoID)'
    ]
  },
  {
    name: 'Catalogo_Productos',
    engine: 'Both',
    description: 'Catálogo de artículos sincronizado desde ERP central hacia la base SQLite local.',
    primaryKey: 'ProductoID',
    columns: [
      { name: 'ProductoID', type: 'INT / INTEGER', nullable: false, description: 'ID primario del artículo' },
      { name: 'SKU', type: 'VARCHAR(32) / TEXT', nullable: false, description: 'Código interno de producto' },
      { name: 'CodigoPrincipal', type: 'VARCHAR(32) / TEXT', nullable: false, description: 'Código de barras primario para escaneo' },
      { name: 'Nombre', type: 'NVARCHAR(100) / TEXT', nullable: false, description: 'Nombre comercial para ticket y pantalla' },
      { name: 'Categoria', type: 'NVARCHAR(50) / TEXT', nullable: true, description: 'Departamento o clasificación comercial' },
      { name: 'PrecioVenta', type: 'DECIMAL(18,4) / REAL', nullable: false, description: 'Precio al público con impuestos' },
      { name: 'TasaIVA', type: 'DECIMAL(5,2) / REAL', nullable: false, description: 'Porcentaje de impuesto aplicable' },
      { name: 'PermiteBalanza', type: 'BIT / INTEGER', nullable: false, description: 'Requiere peso de báscula obligatorio' },
      { name: 'ExistenciaLocal', type: 'DECIMAL(12,4) / REAL', nullable: false, description: 'Stock calculado para prevención de agotados' },
      { name: 'UltimaModificacion', type: 'DATETIME / TEXT', nullable: false, description: 'Control de versión para sincronización delta' }
    ],
    indices: [
      'IX_Productos_CodigoPrincipal (Lookup rápido en <1ms)',
      'IX_Productos_SKU (Búsqueda por código interno)',
      'IX_Productos_Delta (UltimaModificacion)'
    ]
  },
  {
    name: 'Hardware_AuditLog',
    engine: 'SQLite (Local Cache)',
    description: 'Bitácora local de eventos de periféricos (apertura de cajón, errores de corte, desconexión de báscula).',
    primaryKey: 'LogID',
    columns: [
      { name: 'LogID', type: 'INTEGER', nullable: false, description: 'Autoincrementable' },
      { name: 'Dispositivo', type: 'TEXT', nullable: false, description: 'Printer, CashDrawer, Scale, BarcodeScanner' },
      { name: 'TipoEvento', type: 'TEXT', nullable: false, description: 'DRAWER_KICK, PAPER_OUT, SCALE_TARE, TIMEOUT' },
      { name: 'DetalleHex', type: 'TEXT', nullable: true, description: 'Trama de bytes enviada o recibida' },
      { name: 'FechaHora', type: 'DATETIME', nullable: false, description: 'Hora exacta del evento de hardware' }
    ],
    indices: [
      'IX_Audit_FechaHora (FechaHora DESC)'
    ]
  }
];

export const SAMPLE_POS_PRODUCTS: POSCartItem[] = [
  {
    id: 'prod-1',
    sku: '75010001001',
    name: 'Bebida Energética CyberBoost 473ml',
    category: 'Bebidas',
    price: 38.50,
    quantity: 1,
    taxRate: 0.16,
    discount: 0
  },
  {
    id: 'prod-2',
    sku: '75010001002',
    name: 'Snack Premium Almendras Tostadas 120g',
    category: 'Abarrotes',
    price: 54.00,
    quantity: 2,
    taxRate: 0.16,
    discount: 5.00
  },
  {
    id: 'prod-3',
    sku: '75010001003',
    name: 'Café Espresso Arábica Orgánico Grano',
    category: 'Cafetería',
    price: 185.00,
    quantity: 1,
    taxRate: 0.16,
    discount: 0
  },
  {
    id: 'prod-4',
    sku: '20000001004',
    name: 'Manzana Gala Importada (Pesable)',
    category: 'Frutas y Verduras',
    price: 49.90,
    quantity: 1.450,
    taxRate: 0.00,
    discount: 0,
    isWeighed: true,
    weightKg: 1.450
  },
  {
    id: 'prod-5',
    sku: '75010001005',
    name: 'Cable USB-C Reforzado Nylon 2m',
    category: 'Tecnología',
    price: 129.00,
    quantity: 1,
    taxRate: 0.16,
    discount: 10.00
  }
];
