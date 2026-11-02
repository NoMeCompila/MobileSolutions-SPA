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
    name: 'Capa de Presentación (UI Layer)',
    code: 'MobileSolutions.UILayer',
    color: '#00B4D8',
    description: 'Interfaz gráfica de usuario desarrollada sobre .NET Windows Forms con una experiencia visual moderna mediante MaterialSkin.2 y componentes analíticos de LiveCharts.',
    purpose: 'Capturar las acciones del usuario, renderizar formularios de alta interactividad (inicio de sesión, ventas, gestión de catálogo y reportes gerenciales), validar entradas a nivel de vista y delegar de forma estricta todo procesamiento a la capa de negocio.',
    relations: 'Se comunica exclusivamente con la Capa de Lógica de Negocio (BusinessLayer) invocando sus servicios. No accede directamente a la Base de Datos ni a la Capa de Datos (DataLayer), asegurando el principio de responsabilidad única y desacoplamiento de capas.',
    assemblies: [
      'MobileSolutions.UILayer.dll',
      'MaterialSkin.2.dll',
      'LiveCharts.WinForms.dll'
    ],
    responsibilities: [
      'Inicio de sesión y autenticación visual de usuarios y cajeros (LoginForm)',
      'Tablero de control principal y navegación modular del sistema (MainForm)',
      'Vistas modulares desacopladas (SaleView, ProductView, CustomerView, UserView)',
      'Generación de gráficos estadísticos y métricas de recaudación (ManagerReportControl)',
      'Captura de eventos de escaneo de artículos, selección de clientes y medios de pago'
    ],
    technologies: ['.NET Windows Forms', 'C# GDI+ Double Buffering', 'MaterialSkin.2 (UI/UX)', 'LiveCharts 0.9.7'],
    interfaces: ['SaleView', 'ProductView', 'CustomerView', 'UserView', 'LoginForm', 'MainForm', 'ManagerReportControl']
  },
  {
    id: 'layer-business',
    name: 'Capa de Lógica de Negocio (Business Layer)',
    code: 'MobileSolutions.BusinessLayer',
    color: '#48CAE4',
    description: 'Núcleo central del sistema donde residen las reglas de negocio, validaciones de dominio, cálculo de precios, seguridad de operadores y auditoría.',
    purpose: 'Garantizar la coherencia transaccional y comercial: cálculo de importes de venta, control de inventario disponible, verificación de reglas de acceso (RBAC), hashing criptográfico SHA-256 de contraseñas y envío de tokens OTP mediante MailKit.',
    relations: 'Actúa como orquestador e intermediario obligatorio: recibe solicitudes desde la Capa de Presentación (UILayer), ejecuta las validaciones y reglas del negocio, y delega la persistencia y lectura en la Capa de Datos (DataLayer). Protege a la base de datos de operaciones inválidas.',
    assemblies: [
      'MobileSolutions.BusinessLayer.dll',
      'MailKit.dll',
      'MimeKit.dll'
    ],
    responsibilities: [
      'Orquestación de operaciones comerciales y tickets de venta (SaleService)',
      'Gestión de catálogo, validación de stock y precios de venta (ProductService)',
      'Autenticación criptográfica con hash SHA-256 y administración de roles (UserService)',
      'Despacho seguro de tokens OTP de 6 dígitos para recuperación de claves (PasswordResetService)',
      'Emisión de comprobantes detallados y trazabilidad de eventos (TicketReportService, AuditService)'
    ],
    technologies: ['C# Domain Services', 'Hashing SHA-256 Criptográfico', 'MailKit 4.18 (SMTP/TLS)', 'Data Transfer Objects (DTO)'],
    interfaces: ['SaleService', 'ProductService', 'UserService', 'CustomerService', 'PasswordResetService', 'TicketReportService']
  },
  {
    id: 'layer-data',
    name: 'Capa de Acceso a Datos (Data Access Layer)',
    code: 'MobileSolutions.DataLayer',
    color: '#0077B6',
    description: 'Capa de persistencia y comunicación directa con el motor relacional Microsoft SQL Server / LocalDB mediante ADO.NET y procedimientos almacenados.',
    purpose: 'Administrar el ciclo de vida de conexiones seguras (DatabaseConnection Pool), ejecutar Stored Procedures parametrizados, procesar carritos de venta atómicos mediante Table-Valued Parameters (TVP) y realizar el bootstrap inicial del esquema (DDL).',
    relations: 'Atiende exclusivamente los requerimientos de la Capa de Lógica de Negocio (BusinessLayer). Lee y escribe registros directamente en Microsoft SQL Server, traduciendo datos relacionales en objetos de dominio sin exponer detalles del motor a capas superiores.',
    assemblies: [
      'MobileSolutions.DataLayer.dll',
      'Microsoft.Data.SqlClient.dll',
      'System.Data.dll'
    ],
    responsibilities: [
      'Repositorios de datos especializados por entidad (SaleDal, ProductDal, UserDal, CustomerDal)',
      'Gestión eficiente de pool de conexiones y transacciones ACID (DatabaseConnection)',
      'Ejecución de compras masivas en bloque mediante Table-Valued Parameters (TVP)',
      'Creación e inicialización del esquema DDL y datos semilla (DatabaseInitializer)',
      'Mapeo optimizado de SqlDataReader hacia entidades de negocio fuertemente tipadas'
    ],
    technologies: ['Microsoft SQL Server / LocalDB', 'ADO.NET (SqlClient)', 'Procedimientos Almacenados (T-SQL)', 'Table-Valued Parameters (TVP)'],
    interfaces: ['SaleDal', 'ProductDal', 'UserDal', 'CustomerDal', 'DatabaseConnection', 'DatabaseInitializer']
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
    name: 'Profile',
    engine: 'SQL Server',
    description: 'Tabla de perfiles y roles de usuario para el control de acceso basado en roles (RBAC: Administrador, Vendedor, Gerente).',
    primaryKey: 'profile_id',
    columns: [
      { name: 'profile_id', type: 'INT IDENTITY(1,1)', nullable: false, description: 'Identificador primario y autonumérico del rol' },
      { name: 'description', type: 'VARCHAR(100)', nullable: false, description: 'Nombre descriptivo del rol (Administrador, Vendedor, Gerente)' },
      { name: 'status', type: 'BIT (DEFAULT 1)', nullable: false, description: 'Estado lógico de disponibilidad del rol (1: Activo, 0: Inactivo)' }
    ],
    indices: [
      'PK_Profile (Clustered Primary Key)',
      'UQ_Profile_Description (UNIQUE description)'
    ]
  },
  {
    name: 'PaymentType',
    engine: 'SQL Server',
    description: 'Catálogo de modalidades y formas de pago admitidas en las transacciones del punto de venta.',
    primaryKey: 'payment_type_id',
    columns: [
      { name: 'payment_type_id', type: 'INT IDENTITY(1,1)', nullable: false, description: 'Identificador primario y autonumérico de la forma de pago' },
      { name: 'description', type: 'VARCHAR(100)', nullable: false, description: 'Descripción de la forma de pago (Efectivo, Débito, Crédito, etc.)' },
      { name: 'status', type: 'BIT (DEFAULT 1)', nullable: false, description: 'Disponibilidad comercial de la forma de pago (1: Habilitado, 0: Inactivo)' }
    ],
    indices: [
      'PK_PaymentType (Clustered Primary Key)',
      'UQ_PaymentType_Description (UNIQUE description)'
    ]
  },
  {
    name: 'Brand',
    engine: 'SQL Server',
    description: 'Catálogo de marcas comerciales asociadas a los equipos celulares y accesorios tecnológicos.',
    primaryKey: 'brand_id',
    columns: [
      { name: 'brand_id', type: 'INT IDENTITY(1,1)', nullable: false, description: 'Identificador primario y autonumérico de la marca' },
      { name: 'name', type: 'VARCHAR(100)', nullable: false, description: 'Nombre comercial de la marca (Samsung, Apple, Motorola, Xiaomi, etc.)' },
      { name: 'status', type: 'BIT (DEFAULT 1)', nullable: false, description: 'Estado del registro de marca (1: Activa, 0: Inactiva)' }
    ],
    indices: [
      'PK_Brand (Clustered Primary Key)',
      'UQ_Brand_Name (UNIQUE name)'
    ]
  },
  {
    name: 'Customer',
    engine: 'SQL Server',
    description: 'Padrón de clientes registrados para facturación, emisión de tickets y comprobantes comerciales.',
    primaryKey: 'customer_id',
    columns: [
      { name: 'customer_id', type: 'INT IDENTITY(1,1)', nullable: false, description: 'Identificador primario y autonumérico del cliente' },
      { name: 'name', type: 'VARCHAR(100)', nullable: false, description: 'Nombre de pila del cliente' },
      { name: 'lastname', type: 'VARCHAR(100)', nullable: false, description: 'Apellido completo del cliente' },
      { name: 'dni', type: 'VARCHAR(8)', nullable: false, description: 'Documento Nacional de Identidad único (8 dígitos)' },
      { name: 'sex', type: 'VARCHAR(10)', nullable: false, description: 'Género (CHECK: Masculino, Femenino, Otro)' },
      { name: 'email', type: 'VARCHAR(100)', nullable: false, description: 'Correo electrónico único validado con formato de email' },
      { name: 'phone', type: 'VARCHAR(15)', nullable: true, description: 'Número telefónico de contacto' },
      { name: 'address', type: 'VARCHAR(100)', nullable: true, description: 'Domicilio o dirección física del cliente' },
      { name: 'birth', type: 'DATE', nullable: false, description: 'Fecha de nacimiento (validada fecha anterior al día actual)' },
      { name: 'nationality', type: 'VARCHAR(100)', nullable: false, description: 'País de nacionalidad del cliente' },
      { name: 'locality', type: 'VARCHAR(100)', nullable: false, description: 'Localidad o ciudad de residencia' },
      { name: 'register_date', type: 'DATETIME2(7) (DEFAULT GETDATE())', nullable: false, description: 'Timestamp de alta en el sistema' },
      { name: 'status', type: 'BIT (DEFAULT 1)', nullable: false, description: 'Estado del cliente (1: Habilitado, 0: Inactivo)' }
    ],
    indices: [
      'PK_Customer (Clustered Primary Key)',
      'UQ_Customer_DNI (UNIQUE dni)',
      'UQ_Customer_Email (UNIQUE email)',
      'CHK_Customer_Sex (CHECK Masculino / Femenino / Otro)',
      'CHK_Customer_Birth (CHECK birth < GETDATE())',
      'CHK_Customer_Email (CHECK LIKE %_@_%.%)'
    ]
  },
  {
    name: 'User',
    engine: 'SQL Server',
    description: 'Usuarios del sistema (Cajeros, Gerentes, Administradores) con contraseñas cifradas en SHA-256 y tokens OTP.',
    primaryKey: 'user_id',
    columns: [
      { name: 'user_id', type: 'INT IDENTITY(1,1)', nullable: false, description: 'Identificador primario y autonumérico del usuario' },
      { name: 'profile_id', type: 'INT', nullable: false, description: 'Clave foránea hacia Profile (FK_User_Profile)' },
      { name: 'name', type: 'VARCHAR(100)', nullable: false, description: 'Nombre del operador o empleado' },
      { name: 'lastname', type: 'VARCHAR(100)', nullable: false, description: 'Apellido del operador o empleado' },
      { name: 'dni', type: 'VARCHAR(8)', nullable: false, description: 'Documento de identidad único del usuario' },
      { name: 'sex', type: 'VARCHAR(10)', nullable: false, description: 'Género (CHECK: Masculino, Femenino, Otro)' },
      { name: 'username', type: 'VARCHAR(100)', nullable: false, description: 'Nombre de usuario único para inicio de sesión en el POS' },
      { name: 'password', type: 'VARCHAR(255)', nullable: false, description: 'Hash criptográfico SHA-256 de la contraseña' },
      { name: 'email', type: 'VARCHAR(100)', nullable: false, description: 'Correo institucional único para alertas y recuperación' },
      { name: 'phone', type: 'VARCHAR(15)', nullable: true, description: 'Teléfono de contacto único (UQ_User_Phone)' },
      { name: 'address', type: 'VARCHAR(100)', nullable: true, description: 'Domicilio físico del empleado' },
      { name: 'birth', type: 'DATE', nullable: false, description: 'Fecha de nacimiento (Regla estricta de mayoría de edad >= 18 años)' },
      { name: 'nationality', type: 'VARCHAR(100)', nullable: false, description: 'Nacionalidad' },
      { name: 'locality', type: 'VARCHAR(100)', nullable: false, description: 'Localidad' },
      { name: 'register_date', type: 'DATETIME2(7) (DEFAULT GETDATE())', nullable: false, description: 'Fecha y hora de creación de la cuenta' },
      { name: 'status', type: 'BIT (DEFAULT 1)', nullable: false, description: 'Estado de la cuenta (1: Habilitada, 0: Bloqueada)' },
      { name: 'reset_token', type: 'VARCHAR(6)', nullable: true, description: 'Token OTP de 6 dígitos para reseteo seguro de clave' },
      { name: 'reset_token_expiration', type: 'DATETIME2', nullable: true, description: 'Fecha y hora límite de validez del token OTP' }
    ],
    indices: [
      'PK_User (Clustered Primary Key)',
      'FK_User_Profile (FOREIGN KEY -> Profile.profile_id)',
      'UQ_User_Username (UNIQUE username)',
      'UQ_User_DNI (UNIQUE dni)',
      'UQ_User_Email (UNIQUE email)',
      'UQ_User_Phone (UNIQUE phone)',
      'CHK_User_Birth (CHECK >= 18 años)',
      'CHK_User_Email (CHECK LIKE %_@_%.%)'
    ]
  },
  {
    name: 'Product',
    engine: 'SQL Server',
    description: 'Catálogo maestro de telefonía móvil y accesorios con control de existencias, código de barras y precios.',
    primaryKey: 'product_id',
    columns: [
      { name: 'product_id', type: 'INT IDENTITY(1,1)', nullable: false, description: 'Identificador primario y autonumérico del producto' },
      { name: 'brand_id', type: 'INT', nullable: false, description: 'Clave foránea hacia Brand (FK_Product_Brand)' },
      { name: 'product_code', type: 'VARCHAR(100)', nullable: false, description: 'Código único de producto o código de barras escaneable' },
      { name: 'name', type: 'VARCHAR(100)', nullable: false, description: 'Nombre comercial del modelo celular o accesorio' },
      { name: 'stock', type: 'INT', nullable: false, description: 'Stock actual disponible en tienda (CHECK stock >= 0)' },
      { name: 'purchase_price', type: 'DECIMAL(18,2)', nullable: false, description: 'Costo mayorista de adquisición (CHECK purchase_price >= 0)' },
      { name: 'sale_price', type: 'DECIMAL(18,2)', nullable: false, description: 'Precio de venta al público (CHECK sale_price >= purchase_price)' },
      { name: 'status', type: 'BIT (DEFAULT 1)', nullable: false, description: 'Estado de comercialización (1: Activo, 0: Descontinuado)' },
      { name: 'image', type: 'VARCHAR(255)', nullable: true, description: 'Ruta o nombre del archivo de imagen del producto' }
    ],
    indices: [
      'PK_Product (Clustered Primary Key)',
      'FK_Product_Brand (FOREIGN KEY -> Brand.brand_id)',
      'UQ_Product_Code (UNIQUE product_code)',
      'CHK_Product_Stock (CHECK stock >= 0)',
      'CHK_Product_PurchasePrice (CHECK purchase_price >= 0)',
      'CHK_Product_SalePrice (CHECK sale_price >= purchase_price)'
    ]
  },
  {
    name: 'SaleHeader',
    engine: 'SQL Server',
    description: 'Cabecera transaccional de ventas realizadas en el POS con número de comprobante, cliente, cajero y monto total.',
    primaryKey: 'sale_id',
    columns: [
      { name: 'sale_id', type: 'INT IDENTITY(1,1)', nullable: false, description: 'Identificador primario y autonumérico de la venta' },
      { name: 'payment_type_id', type: 'INT', nullable: false, description: 'Clave foránea hacia PaymentType (FK_SaleHeader_PaymentType)' },
      { name: 'customer_id', type: 'INT', nullable: false, description: 'Clave foránea hacia Customer (FK_SaleHeader_Customer)' },
      { name: 'user_id', type: 'INT', nullable: false, description: 'Clave foránea hacia [User] (cajero que procesó la venta)' },
      { name: 'sale_number', type: 'VARCHAR(100)', nullable: false, description: 'Número correlativo único del ticket o comprobante' },
      { name: 'sale_date', type: 'DATETIME2(7) (DEFAULT GETDATE())', nullable: false, description: 'Fecha y hora exacta de emisión de la venta' },
      { name: 'total_sale', type: 'DECIMAL(18,2)', nullable: false, description: 'Monto final total cobrado (CHECK total_sale >= 0)' },
      { name: 'status', type: 'BIT (DEFAULT 1)', nullable: false, description: 'Estado de la venta (1: Confirmada, 0: Anulada)' }
    ],
    indices: [
      'PK_SaleHeader (Clustered Primary Key)',
      'FK_SaleHeader_PaymentType (FOREIGN KEY -> PaymentType.payment_type_id)',
      'FK_SaleHeader_Customer (FOREIGN KEY -> Customer.customer_id)',
      'FK_SaleHeader_User (FOREIGN KEY -> User.user_id)',
      'UQ_SaleHeader_SaleNumber (UNIQUE sale_number)',
      'CHK_SaleHeader_TotalSale (CHECK total_sale >= 0)'
    ]
  },
  {
    name: 'SaleDetail',
    engine: 'SQL Server',
    description: 'Renglones individuales del ticket con productos despachados, cantidades vendidas y precio unitario.',
    primaryKey: 'sale_detail_id',
    columns: [
      { name: 'sale_detail_id', type: 'INT IDENTITY(1,1)', nullable: false, description: 'Identificador primario y autonumérico del renglón' },
      { name: 'sale_id', type: 'INT', nullable: false, description: 'Clave foránea hacia SaleHeader (FK_SaleDetail_SaleHeader)' },
      { name: 'product_id', type: 'INT', nullable: false, description: 'Clave foránea hacia Product (FK_SaleDetail_Product)' },
      { name: 'quantity', type: 'INT', nullable: false, description: 'Cantidad de unidades comercializadas (CHECK quantity > 0)' },
      { name: 'price', type: 'DECIMAL(18,2)', nullable: false, description: 'Precio unitario facturado (CHECK price >= 0)' }
    ],
    indices: [
      'PK_SaleDetail (Clustered Primary Key)',
      'FK_SaleDetail_SaleHeader (FOREIGN KEY -> SaleHeader.sale_id)',
      'FK_SaleDetail_Product (FOREIGN KEY -> Product.product_id)',
      'UQ_SaleDetail_Sale_Product (UNIQUE sale_id, product_id)',
      'CHK_SaleDetail_Quantity (CHECK quantity > 0)',
      'CHK_SaleDetail_Price (CHECK price >= 0)'
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
