import { NextRequest } from 'next/server';
import { ContactSchema } from '@/schemas/contact';
import { sendContactEmail } from '@/lib/mailer';
import { ratelimit } from '@/lib/ratelimit';

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'anonymous';
  const { success } = await ratelimit.limit(ip);
  if (!success) {
    return Response.json(
      { error: 'Demasiados intentos. Espera un momento.' },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Formato invalido.' }, { status: 400 });
  }

  const result = ContactSchema.safeParse(body);
  if (!result.success) {
    return Response.json(
      { error: 'Datos invalidos.', details: result.error.flatten() },
      { status: 400 }
    );
  }

  try {
    await sendContactEmail(result.data);
    return Response.json({ ok: true });
  } catch (err) {
    console.error('[contacto] Error enviando email:', err);
    return Response.json(
      { error: 'Error al enviar. Intenta de nuevo o contactanos directamente.' },
      { status: 500 }
    );
  }
}
