import { NextRequest } from 'next/server';
import { getContactos, marcarLeido, toggleRespondido } from '@/lib/storage';

// Intentos fallidos por IP para rate limit manual (en memoria)
const intentosFallidos = new Map<string, { count: number; blockedUntil: number }>();

// Verificar contraseña admin — sin fallback débil
function isAuthorized(req: NextRequest): { ok: boolean; bloqueado?: boolean } {
  const ip = req.headers.get('x-forwarded-for') ?? 'anonymous';
  const ahora = Date.now();

  // Verificar si la IP está bloqueada
  const intentos = intentosFallidos.get(ip);
  if (intentos && intentos.blockedUntil > ahora) {
    return { ok: false, bloqueado: true };
  }

  const authHeader = req.headers.get('authorization');
  if (!authHeader) return { ok: false };

  const password = authHeader.replace('Bearer ', '');
  const adminPassword = process.env.ADMIN_PASSWORD;

  // Si no hay contraseña configurada, bloquear siempre
  if (!adminPassword) {
    console.error('[admin] ADMIN_PASSWORD no configurada en variables de entorno');
    return { ok: false };
  }

  const esValida = password === adminPassword;

  if (!esValida) {
    // Registrar intento fallido — bloquear por 15 min tras 5 intentos
    const actual = intentosFallidos.get(ip) ?? { count: 0, blockedUntil: 0 };
    actual.count += 1;
    if (actual.count >= 5) {
      actual.blockedUntil = ahora + 15 * 60 * 1000;
      actual.count = 0;
    }
    intentosFallidos.set(ip, actual);
    console.warn(`[admin] Intento fallido desde IP: ${ip} (intento ${actual.count})`);
  } else {
    // Login exitoso — limpiar intentos fallidos
    intentosFallidos.delete(ip);
  }

  return { ok: esValida };
}

// GET — Listar todos los contactos
export async function GET(req: NextRequest) {
  const auth = isAuthorized(req);
  if (auth.bloqueado) {
    return Response.json(
      { error: 'Demasiados intentos fallidos. Espera 15 minutos.' },
      { status: 429 }
    );
  }
  if (!auth.ok) {
    return Response.json({ error: 'No autorizado' }, { status: 401 });
  }

  const contactos = getContactos();
  const noLeidos = contactos.filter((c) => !c.leido).length;
  const sinResponder = contactos.filter((c) => !c.respondido).length;

  return Response.json({ contactos, total: contactos.length, noLeidos, sinResponder });
}

// PATCH — Marcar como leído o cambiar estado de respondido
export async function PATCH(req: NextRequest) {
  const auth = isAuthorized(req);
  if (auth.bloqueado) {
    return Response.json(
      { error: 'Demasiados intentos fallidos. Espera 15 minutos.' },
      { status: 429 }
    );
  }
  if (!auth.ok) {
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

  const ok = marcarLeido(body.id);
  if (!ok) {
    return Response.json({ error: 'Contacto no encontrado' }, { status: 404 });
  }

  return Response.json({ ok: true });
}
