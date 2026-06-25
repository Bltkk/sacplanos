# SAC Planos — Sitio Web Corporativo

Sitio web institucional para empresa chilena de arquitectura especializada en elaboración de planos, gestión de permisos de edificación y regularización de obras ante la Dirección de Obras Municipales (DOM).

**Sitio en producción:** [sacplanos.cl](https://sacplanos.cl)

---

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Next.js 14 (App Router) |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS |
| Base de datos | MySQL (Prisma ORM) |
| Email | Nodemailer (SMTP Hostinger) |
| Validación | Zod |
| Deploy | Hostinger (Node.js + PM2) |

---

## Páginas

| Ruta | Descripción |
|---|---|
| `/` | Inicio — Hero, servicios y llamada a la acción |
| `/nosotros` | Historia, equipo y valores de la empresa |
| `/contacto` | Formulario de contacto con validación y envío por email |

### API

| Endpoint | Método | Descripción |
|---|---|---|
| `/api/contacto` | POST | Recibe el formulario, valida con Zod y envía email |
| `/api/health` | GET | Health check para monitoreo de uptime |

---

## Instalación local

```bash
git clone https://github.com/Bltkk/sacplanos.git
cd sacplanos
npm install
cp .env.example .env.local
# Completar las variables de entorno
npm run dev
```

Acceso en `http://localhost:3000`

**Requisitos:**
- Node.js 18+
- MySQL 8.0+ (para base de datos local)

## Variables de entorno

```env
SMTP_USER=                           # Email SMTP (ej: admin@sacplanos.cl)
SMTP_PASS=                           # Contraseña SMTP
EMAIL_TO=                            # Destino de las consultas del formulario
NEXT_PUBLIC_SITE_URL=                # URL pública del sitio (para SEO y og:url)
DATABASE_URL=                        # Connection string MySQL para Prisma

# Opcionales — rate limiting en nube
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

---

## Seguridad

- Rate limiting: 5 solicitudes por minuto por IP en el formulario de contacto
- Validación Zod en servidor y cliente (nombre, email, teléfono, mensaje)
- Headers HTTP: X-Frame-Options, X-Content-Type-Options, HSTS 2 años, Referrer-Policy, Permissions-Policy
- Respuestas de error genéricas (sin exposición de stack traces)

---

## Comandos

```bash
npm run dev     # Servidor de desarrollo en :3000
npm run build   # Build de producción
npm start       # Servidor de producción
npm run lint    # Verificación ESLint
```
