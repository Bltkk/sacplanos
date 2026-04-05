// Validación de variables de entorno al arrancar
const vars = [
  'GMAIL_USER',
  'GMAIL_APP_PASSWORD',
  'EMAIL_TO',
  'NEXT_PUBLIC_SITE_URL',
  'ADMIN_PASSWORD',
  'DATABASE_URL',
] as const;

for (const key of vars) {
  if (!process.env[key]) {
    throw new Error(`[env] Variable de entorno faltante: ${key}`);
  }
}

export const env = {
  gmailUser: process.env.GMAIL_USER!,
  gmailPass: process.env.GMAIL_APP_PASSWORD!,
  emailTo: process.env.EMAIL_TO!,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL!,
  adminPassword: process.env.ADMIN_PASSWORD!,
  databaseUrl: process.env.DATABASE_URL!,
};
