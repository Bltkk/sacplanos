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

  try {
    // Guardar en archivo JSON (siempre funciona)
    saveContacto(result.data, ip);

    // Intentar enviar email (opcional, puede fallar si no hay credenciales)
    try {
      const { sendContactEmail } = await import('@/lib/mailer');
      await sendContactEmail(result.data);
    } catch (emailErr) {
      // Si el email falla, no es crítico — el contacto ya quedó guardado
      console.warn('[contacto] Email no enviado (credenciales no configuradas):', emailErr);
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error('[contacto] Error guardando contacto:', err);
    return Response.json(
      { error: 'Error al enviar. Intenta de nuevo o contáctanos directamente.' },
      { status: 500 }
    );
  }
}
