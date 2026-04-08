import nodemailer from 'nodemailer';
import { env } from './env';
import type { ContactFormData } from '@/schemas/contact';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: env.gmailUser,
    pass: env.gmailPass.replace(/\s/g, ''), // App Password sin espacios (Google los muestra con espacios pero SMTP los rechaza)
  },
});

export async function sendContactEmail(data: ContactFormData) {
  await transporter.sendMail({
    from: `"SAC Planos Web" <${env.gmailUser}>`,
    to: env.emailTo,
    replyTo: data.email,
    subject: `Consulta web: ${data.proyecto}`,
    text: `
Nombre:    ${data.nombre}
Email:     ${data.email}
Teléfono:  ${data.telefono || 'No indicado'}
Proyecto:  ${data.proyecto}

Mensaje:
${data.mensaje}
    `.trim(),
  });
}
