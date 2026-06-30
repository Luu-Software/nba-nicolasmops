import http from 'node:http';
import { WebSocketServer } from 'ws';
import type { WebSocket, RawData } from 'ws';
import { readFileSync } from 'node:fs';
import { join, dirname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import open from 'open';

const __dir = dirname(fileURLToPath(import.meta.url));
const frontendDir = normalize(join(__dir, '../frontend'));

type Handler = (datos: Record<string, string>) => void;

interface MensajeCliente {
  evento: string;
  datos: Record<string, string>;
}

const contentTypes: Record<string, string> = {
  html: 'text/html; charset=utf-8',
  js: 'application/javascript',
  css: 'text/css',
  svg: 'image/svg+xml',
  png: 'image/png',
};

const handlers = new Map<string, Handler>();
let conexion: WebSocket | null = null;

/**
 * Registra un handler para un evento enviado desde el browser.
 * @param nombre - Nombre del evento (debe coincidir con el primer argumento de `emitirEvento` en el browser).
 * @param handler - Función que recibe los datos del evento.
 */
export function cuandoPasa(nombre: string, handler: Handler): void {
  handlers.set(nombre, handler);
}

/**
 * Envía un evento al browser. El browser lo recibe como un `CustomEvent` en `window`.
 * @param tipo - Nombre del evento; el browser escucha con `window.addEventListener(tipo, ...)`.
 * @param mensaje - Datos del evento; disponibles en `evento.detail` en el browser.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function enviarAlFrontend(tipo: string, mensaje: any): void {
  conexion?.send(JSON.stringify({ tipo, mensaje }));
}

/**
 * Inicia el servidor HTTP y abre el browser automáticamente.
 * @param puerto - Puerto en el que escucha el servidor (por defecto: 3000).
 */
export function iniciar(puerto: number = 3000): void {
  const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse): void => {
    const urlPath = req.url === '/' ? '/index.html' : (req.url ?? '/index.html');
    const filePath = normalize(join(frontendDir, urlPath));

    if (!filePath.startsWith(frontendDir)) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }

    const ext = filePath.split('.').pop() ?? '';

    try {
      const content = readFileSync(filePath, 'utf-8');
      res.writeHead(200, { 'Content-Type': contentTypes[ext] ?? 'text/plain' });
      res.end(content);
    } catch {
      res.writeHead(404);
      res.end('Not found');
    }
  });

  const wss = new WebSocketServer({ server });

  wss.on('connection', (socket: WebSocket): void => {
    conexion?.close();
    conexion = socket;
    socket.on('message', (data: RawData): void => {
      const msg = JSON.parse(data.toString()) as MensajeCliente;
      handlers.get(msg.evento)?.(msg.datos);
    });
  });

  server.listen(puerto, () => {
    const url = `http://localhost:${puerto}`;
    console.log(`Página en ${url}`);
    void open(url);
  });
}
