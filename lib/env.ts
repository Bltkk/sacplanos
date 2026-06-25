const vars = [
  'SMTP_USER',
  'SMTP_PASS',
  'EMAIL_TO',
  'NEXT_PUBLIC_SITE_URL',
  'ADMIN_PASSWORD',
  'DATABASE_URL',
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
  adminPassword: process.env.ADMIN_PASSWORD!,
  databaseUrl: process.env.DATABASE_URL!,
};

