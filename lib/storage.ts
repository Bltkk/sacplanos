import fs from 'fs';
import path from 'path';
import type { ContactFormData } from '@/schemas/contact';

// Ruta al archivo JSON donde se guardan los contactos
const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'contactos.json');

export interface ContactRecord extends ContactFormData {
  id: string;
  fecha: string;
  ip: string;
  leido: boolean;
  respondido: boolean;
}

// Asegurar que el directorio y archivo existan
function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, '[]', 'utf-8');
  }
}

// Leer todos los contactos
export function getContactos(): ContactRecord[] {
  ensureDataFile();
  const raw = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(raw) as ContactRecord[];
}

// Guardar un nuevo contacto
export function saveContacto(data: ContactFormData, ip: string): ContactRecord {
  const contactos = getContactos();

  const record: ContactRecord = {
    ...data,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    fecha: new Date().toISOString(),
    ip,
    leido: false,
    respondido: false,
  };

  contactos.unshift(record); // Más reciente primero
  fs.writeFileSync(DATA_FILE, JSON.stringify(contactos, null, 2), 'utf-8');

  return record;
}

// Marcar contacto como leído
export function marcarLeido(id: string): boolean {
  const contactos = getContactos();
  const contacto = contactos.find((c) => c.id === id);
  if (!contacto) return false;

  contacto.leido = true;
  fs.writeFileSync(DATA_FILE, JSON.stringify(contactos, null, 2), 'utf-8');
  return true;
}

// Eliminar un contacto por ID
export function eliminarContacto(id: string): boolean {
  const contactos = getContactos();
  const index = contactos.findIndex((c) => c.id === id);
  if (index === -1) return false;

  contactos.splice(index, 1);
  fs.writeFileSync(DATA_FILE, JSON.stringify(contactos, null, 2), 'utf-8');
  return true;
}

// Cambiar estado de respondido
export function toggleRespondido(id: string): boolean | null {
  const contactos = getContactos();
  const contacto = contactos.find((c) => c.id === id);
  if (!contacto) return null;

  contacto.respondido = !contacto.respondido;
  fs.writeFileSync(DATA_FILE, JSON.stringify(contactos, null, 2), 'utf-8');
  return contacto.respondido;
}

// Exportar contactos a formato CSV con separador punto y coma (Excel lo lee mejor)
export function contactosToCSV(): string {
  const contactos = getContactos();
  const sep = ';';
  const headers = ['Fecha', 'Nombre', 'Email', 'Telefono', 'Tipo de Proyecto', 'Mensaje', 'Leido', 'Respondido'];

  const rows = contactos.map((c) => [
    escapeCsv(formatFechaCSV(c.fecha)),
    escapeCsv(c.nombre),
    escapeCsv(c.email),
    escapeCsv(c.telefono || 'No indicado'),
    escapeCsv(c.proyecto),
    escapeCsv(c.mensaje),
    c.leido ? 'Si' : 'No',
    c.respondido ? 'Si' : 'No',
  ]);

  return [headers.join(sep), ...rows.map((r) => r.join(sep))].join('\n');
}

// Formatear fecha para CSV
function formatFechaCSV(iso: string): string {
  const d = new Date(iso);
  const dia = String(d.getDate()).padStart(2, '0');
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  const anio = d.getFullYear();
  const hora = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');
  return `${dia}/${mes}/${anio} ${hora}:${min}`;
}

// Escapar valores para CSV (con separador punto y coma)
function escapeCsv(value: string): string {
  if (value.includes(';') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}
