import { NextRequest } from 'next/server';
import { ContactSchema } from '@/schemas/contact';
import { sendContactEmail } from '@/lib/mailer';
import { ratelimit } from '@/lib/ratelimit';

export async function POST(req: NextRequest) {
  // Rate limiting por IP
  const ip = req.headers.get('x-forwarded-for') ?? 'anonymous';
  const { success } = await ratelimit.limit(ip);
  if (!success) {
    return Response.json(
      { error: 'Demasiados intentos. Espera un momento.' },
      { status: 429 }
    );
  }

  // Parsear body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Formato inválido.' }, { status: 400 });
  }

  // Validar con Zod
  const result = ContactSchema.safeParse(body);
  if (!result.success) {
    return Response.json(
      { error: 'Datos inválidos.', details: result.error.flatten() },
      { status: 400 }
    );
  }

  // Enviar email — único destino: la casilla configurada en EMAIL_TO
  try {
    await sendContactEmail(result.data);
    return Response.json({ ok: true });
  } catch (err) {
    console.error('[contacto] Error enviando email:', err);
    return Response.json(
      { error: 'Error al enviar. Intenta de nuevo o contáctanos directamente.' },
      { status: 500 }
    );
  }
}
import { NextRequest } from 'next/server';
import { ContactSchema } from '@/schemas/contact';
import { saveContacto } from '@/lib/storage';
import { ratelimit } from '@/lib/ratelimit';

export async function POST(req: NextRequest) {
  // Rate limiting por IP
  const ip = req.headers.get('x-forwarded-for') ?? 'anonymous';
  const { success } = await ratelimit.limit(ip);
  if (!success) {
    return Response.json(
      { error: 'Demasiados intentos. Espera un momento.' },
      { status: 429 }
    );
  }

  // Parsear y validar
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Formato inválido.' }, { status: 400 });
  }

  const result = ContactSchema.safeParse(body);
  if (!result.success) {
    return Response.json(
      { error: 'Datos inválidos.', details: result.error.flatten() },
      { status: 400 }
    );
  }

  // 1. Enviar email — acción principal y crítica
  try {
    const { sendContactEmail } = await import('@/lib/mailer');
    await sendContactEmail(result.data);
  } catch (emailErr) {
    console.error('[contacto] Error enviando email:', emailErr);
    return Response.json(
      { error: 'Error al enviar. Intenta de nuevo o contáctanos directamente.' },
      { status: 500 }
    );
  }

  // 2. Guardar en base de datos — secundario, no bloquea la respuesta
  try {
    await saveContacto(result.data, ip);
    console.log('[contacto] Guardado en BD exitosamente');
  } catch (dbErr) {
    // Si la BD falla, el email ya se envió — logueamos con detalle para diagnosticar
    console.error('[contacto] ERROR al guardar en BD (email sí enviado):', {
      error: String(dbErr),
      stack: dbErr instanceof Error ? dbErr.stack : undefined,
      platform: process.platform,
      arch: process.arch,
    });
  }

  return Response.json({ ok: true });
}
