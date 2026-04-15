import nodemailer from 'nodemailer';
import { env } from './env';
import type { ContactFormData } from '@/schemas/contact';

// Transporter SMTP de Hostinger (no Gmail)
const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 465,
  secure: true, // SSL/TLS
  auth: {
    user: env.smtpUser,
    pass: env.smtpPass,
  },
});

export async function sendContactEmail(data: ContactFormData) {
  await transporter.sendMail({
    from: `"SAC Planos Web" <${env.smtpUser}>`,
    to: env.emailTo,
    replyTo: data.email,
    subject: `Consulta web: ${data.proyecto}`,
    text: `
Nombre:    ${data.nombre}
Email:     ${data.email}
Telefono:  ${data.telefono || 'No indicado'}
Proyecto:  ${data.proyecto}

Mensaje:
${data.mensaje}
    `.trim(),
  });
}
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
