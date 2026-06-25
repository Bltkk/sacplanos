// Variables de entorno requeridas en runtime.
// Solo validamos las que el código realmente usa (envío de email + URL del sitio).
// ADMIN_PASSWORD y DATABASE_URL se eliminaron: el almacenamiento pasó a memoria
// y las rutas de admin están deshabilitadas, por lo que ya no se consumen.
const vars = [
  'SMTP_USER',
  'SMTP_PASS',
  'EMAIL_TO',
  'NEXT_PUBLIC_SITE_URL',
] as const;

for (const key of vars) {
  if (!process.env[key]) {
    throw new Error('[env] Variable faltante: ' + key);
  }
}

export const env = {
  smtpUser: process.env.SMTP_USER!,
  smtpPass: process.env.SMTP_PASS!,
  emailTo: process.env.EMAIL_TO!,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL!,
};
