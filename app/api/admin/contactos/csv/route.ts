// Ruta deshabilitada — base de datos eliminada
export async function GET() {
  return Response.json({ error: 'Ruta no disponible' }, { status: 404 });
}
// Ruta deshabilitada — base de datos eliminada
export async function GET() {
  return Response.json({ error: 'Ruta no disponible' }, { status: 404 });
}
import { NextRequest } from 'next/server';
import { contactosToCSV } from '@/lib/storage';
import { env } from '@/lib/env';

// GET — Descargar contactos como archivo CSV (se abre en Excel)
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const password = authHeader?.replace('Bearer ', '');

  // Usa env validado — si ADMIN_PASSWORD no existe, el build falla
  if (password !== env.adminPassword) {
    return Response.json({ error: 'No autorizado' }, { status: 401 });
  }

  const csv = await contactosToCSV();

  // BOM para que Excel reconozca tildes y ñ correctamente
  const bom = '\uFEFF';

  return new Response(bom + csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="contactos-sacplanos-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
