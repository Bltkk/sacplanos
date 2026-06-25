import nodemailer from 'nodemailer';
import { env } from './env';
import type { ContactFormData } from '@/schemas/contact';

// El transporter se crea dentro de la función (no en el nivel del módulo) para
// que las variables SMTP se lean solo en runtime al enviar un email, y no
// durante 'next build' al importar este módulo.
export async function sendContactEmail(data: ContactFormData) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true,
    auth: {
      user: env.smtpUser,
      pass: env.smtpPass,
    },
  });

  await transporter.sendMail({
    from: '"SAC Planos Web" <' + env.smtpUser + '>',
    to: env.emailTo,
    replyTo: data.email,
    subject: 'Consulta web: ' + data.proyecto,
    text: [
      'Nombre:    ' + data.nombre,
      'Email:     ' + data.email,
      'Telefono:  ' + (data.telefono || 'No indicado'),
      'Proyecto:  ' + data.proyecto,
      '',
      'Mensaje:',
      data.mensaje,
    ].join('\n'),
  });
}

