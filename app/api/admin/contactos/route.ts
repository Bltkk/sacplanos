import { NextRequest } from 'next/server';
import { getContactos, marcarLeido, toggleRespondido } from '@/lib/storage';

// Verificar contraseña admin
function isAuthorized(req: NextRequest): boolean {
  const authHeader = req.headers.get('authorization');
  if (!authHeader) return false;

  const password = authHeader.replace('Bearer ', '');
  return password === (process.env.ADMIN_PASSWORD || 'admin123');
}

// GET — Listar todos los contactos
export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return Response.json({ error: 'No autorizado' }, { status: 401 });
  }

  const contactos = getContactos();
  const noLeidos = contactos.filter((c) => !c.leido).length;
  const sinResponder = contactos.filter((c) => !c.respondido).length;

  return Response.json({ contactos, total: contactos.length, noLeidos, sinResponder });
}

// PATCH — Marcar como leído o cambiar estado de respondido
export async function PATCH(req: NextRequest) {
  if (!isAuthorized(req)) {
    return Response.json({ error: 'No autorizado' }, { status: 401 });
  }

  let body: { id?: string; accion?: 'leido' | 'respondido' };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Formato inválido' }, { status: 400 });
  }

  if (!body.id) {
    return Response.json({ error: 'ID requerido' }, { status: 400 });
  }

  const accion = body.accion || 'leido';

  if (accion === 'respondido') {
    const nuevoEstado = toggleRespondido(body.id);
    if (nuevoEstado === null) {
      return Response.json({ error: 'Contacto no encontrado' }, { status: 404 });
    }
    return Response.json({ ok: true, respondido: nuevoEstado });
  }

  // Default: marcar como leído
  const ok = marcarLeido(body.id);
  if (!ok) {
    return Response.json({ error: 'Contacto no encontrado' }, { status: 404 });
  }

  return Response.json({ ok: true });
}
