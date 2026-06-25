// Acceso a variables de entorno SIN romper el build.
//
// Importante: NO validamos al importar el módulo. Si lanzáramos un error aquí,
// 'next build' lo ejecutaría al analizar las rutas y el build fallaría cuando
// las variables no están presentes en el entorno de build (caso Hostinger).
//
// En su lugar, cada variable se lee de forma perezosa (getter) y solo se valida
// en runtime, en el momento en que el código realmente la necesita (p. ej. al
// enviar un email). Así el build siempre pasa y los errores de configuración
// aparecen con un mensaje claro únicamente al usar la función afectada.

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error('[env] Variable de entorno faltante: ' + key);
  }
  return value;
}

export const env = {
  get smtpUser() {
    return requireEnv('SMTP_USER');
  },
  get smtpPass() {
    return requireEnv('SMTP_PASS');
  },
  get emailTo() {
    return requireEnv('EMAIL_TO');
  },
  get siteUrl() {
    return requireEnv('NEXT_PUBLIC_SITE_URL');
  },
};
