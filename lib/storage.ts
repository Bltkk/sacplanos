import { prisma } from './prisma';
import type { ContactFormData } from '@/schemas/contact';

// Tipo exportado para usar en las API routes y el admin
export interface ContactRecord {
  id: string;
  nombre: string;
  email: string;
  telefono: string | null;
  proyecto: string;
  mensaje: string;
  ip: string;
  leido: boolean;
  respondido: boolean;
  fecha: Date;
}

// Guardar un nuevo contacto
export async function saveContacto(data: ContactFormData, ip: string): Promise<ContactRecord> {
  return prisma.contacto.create({
    data: {
      nombre: data.nombre,
      email: data.email,
      telefono: data.telefono || null,
      proyecto: data.proyecto,
      mensaje: data.mensaje,
      ip,
    },
  });
}

// Obtener todos los contactos (más recientes primero)
export async function getContactos(): Promise<ContactRecord[]> {
  return prisma.contacto.findMany({
    orderBy: { fecha: 'desc' },
  });
}

// Marcar contacto como leído
export async function marcarLeido(id: string): Promise<boolean> {
  try {
    await prisma.contacto.update({
      where: { id },
      data: { leido: true },
    });
    return true;
  } catch {
    return false;
  }
}

// Cambiar estado de respondido (toggle)
export async function toggleRespondido(id: string): Promise<boolean | null> {
  const contacto = await prisma.contacto.findUnique({ where: { id } });
  if (!contacto) return null;

  const updated = await prisma.contacto.update({
    where: { id },
    data: { respondido: !contacto.respondido },
  });
  return updated.respondido;
}

// Eliminar un contacto por ID
export async function eliminarContacto(id: string): Promise<boolean> {
  try {
    await prisma.contacto.delete({ where: { id } });
    return true;
  } catch {
    return false;
  }
}

// Exportar contactos a formato CSV con separador punto y coma (Excel lo lee mejor)
export async function contactosToCSV(): Promise<string> {
  const contactos = await getContactos();
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
function formatFechaCSV(date: Date): string {
  const dia = String(date.getDate()).padStart(2, '0');
  const mes = String(date.getMonth() + 1).padStart(2, '0');
  const anio = date.getFullYear();
  const hora = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  return `${dia}/${mes}/${anio} ${hora}:${min}`;
}

// Escapar valores para CSV (con separador punto y coma)
function escapeCsv(value: string): string {
  if (value.includes(';') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}
