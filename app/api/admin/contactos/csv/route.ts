import { NextRequest } from 'next/server';
import { contactosToCSV } from '@/lib/storage';

// GET — Descargar contactos como archivo CSV (se abre en Excel)
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const password = authHeader?.replace('Bearer ', '');

  if (password !== (process.env.ADMIN_PASSWORD || 'admin123')) {
    return Response.json({ error: 'No autorizado' }, { status: 401 });
  }

  const csv = contactosToCSV();

  // BOM para que Excel reconozca tildes y ñ correctamente
  const bom = '\uFEFF';

  return new Response(bom + csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="contactos-sacplanos-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
