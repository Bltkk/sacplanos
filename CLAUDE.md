# PROMPT MAESTRO — SAC Planos · Claude Code

> Pega este prompt completo al inicio de tu sesión en Claude Code.
> Claude Code leerá el contexto completo y podrá ayudarte módulo a módulo.

---

## ROL Y CONTEXTO

Eres un desarrollador fullstack senior especializado en Next.js, TypeScript y buenas prácticas de seguridad web. Vas a construir el sitio web profesional de **SAC Planos** (sacplanos.cl), una empresa chilena de arquitectura, planos y permisos de edificación con más de 20 años de experiencia. El sitio reemplaza uno obsoleto y debe transmitir confianza, profesionalismo y modernidad.

El cliente es una PYME, por lo que la solución debe ser mantenible, económica en hosting y sin sobreingeniería.

---

## STACK TECNOLÓGICO DEFINIDO

| Capa | Tecnología | Justificación |
|---|---|---|
| Framework | Next.js 14 (App Router) | SSG, SEO, API Routes integradas |
| Lenguaje | TypeScript estricto | Tipado, menos bugs en prod |
| Estilos | Tailwind CSS | Rápido, consistente, sin CSS spaghetti |
| Validación | Zod | Schemas tipados, validación server+client |
| Email | Nodemailer + Gmail SMTP | Sin servicios de pago, usa cuenta existente |
| Rate limit | @upstash/ratelimit + Redis | Anti-spam, free tier suficiente |
| Hosting | **Hostinger** (VPS o Business Hosting) | Pedido explícito del cliente |
| Deploy | GitHub → Hostinger (Node.js app o export estático) | CI/CD manual o via webhook |
| Monitoreo | UptimeRobot (free) | Alertas por caída |
| Analytics | Plausible.io o Google Analytics 4 | A definir con el cliente |

---

## ARQUITECTURA DEL PROYECTO

### Estructura de carpetas (NO modificar sin justificación)

```
sacplanos/
│
├── app/                              # Next.js App Router
│   ├── layout.tsx                    # Root layout: Navbar + Footer + metadata global
│   ├── page.tsx                      # / → Inicio (Hero + Servicios + CTA)
│   ├── nosotros/
│   │   └── page.tsx                  # /nosotros → Historia + equipo + valores
│   ├── contacto/
│   │   └── page.tsx                  # /contacto → Formulario + datos de contacto
│   └── api/
│       ├── contacto/
│       │   └── route.ts              # POST /api/contacto → valida + envía email
│       └── health/
│           └── route.ts              # GET /api/health → {ok:true} para monitoreo
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx                # Navegación responsive con menú móvil
│   │   └── Footer.tsx                # Links + datos + copyright
│   └── sections/
│       ├── HeroSection.tsx
│       ├── ServicesSection.tsx
│       ├── AboutSection.tsx
│       └── ContactForm.tsx           # Form con validación client-side + feedback
│
├── lib/
│   ├── env.ts                        # Valida variables de entorno al arrancar
│   ├── mailer.ts                     # Config Nodemailer (usa process.env únicamente)
│   └── ratelimit.ts                  # Instancia Upstash rate limiter
│
├── schemas/
│   └── contact.ts                    # Zod schema compartido front+back
│
├── public/
│   ├── logo.svg
│   ├── og-image.jpg                  # 1200x630px para redes sociales
│   └── favicon.ico
│
├── .env.local                        # ← NUNCA subir a git
├── .env.example                      # ← SÍ subir (sin valores reales)
├── .gitignore                        # Incluir .env.local, .env*.local, node_modules
├── next.config.js                    # Headers de seguridad + configuración
└── tailwind.config.ts                # Colores institucionales como variables
```

---

## DISEÑO VISUAL — GUÍA COMPLETA

### Paleta de colores institucionales

```css
/* tailwind.config.ts → extend.colors */
colors: {
  brand: {
    navy:    '#0D2645',   /* Azul marino oscuro — fondo hero, footer */
    blue:    '#1A3C6E',   /* Azul institucional — iconos, acentos */
    orange:  '#E86C00',   /* Naranja — CTAs, highlights, líneas decorativas */
    white:   '#FFFFFF',
    gray: {
      light: '#F8F8F6',   /* Fondos de sección alternados */
      mid:   '#E8E8E8',   /* Bordes, separadores */
      text:  '#555555',   /* Texto secundario */
    }
  }
}
```

### Tipografía

- Display / headings: **Playfair Display** (serif, elegante, arquitectura)
- Body / UI: **Inter** o **DM Sans** (limpio, legible)
- Cargar desde Google Fonts en `app/layout.tsx`
- Escala: 12 / 14 / 16 / 20 / 28 / 38 / 52px

### Estética general

- Fondo base: blanco `#FFFFFF` con secciones alternadas en `#F8F8F6`
- Estilo: **arquitectura minimalista** — limpio, preciso, mucho espacio en blanco
- Sin gradientes llamativos, sin sombras pesadas
- Bordes `1px solid #E8E8E8` para separar secciones
- Líneas de acento naranja `#E86C00` en headers de sección (border-left o underline)
- Imágenes en escala de grises o tono frío (filtro CSS si es necesario)

### Páginas y secciones

#### `/` — Inicio
1. **Navbar**: Logo izquierda + links (Inicio / Servicios / Nosotros / Contacto) + botón CTA "Cotizar" naranja
2. **Hero**: Split layout — lado izquierdo fondo navy con título + descripción + 2 botones; lado derecho fondo gris claro con mockup de plano
3. **Estadísticas**: 3 números destacados (+800 proyectos / 20+ años / 100% DOM)
4. **Servicios** (3 cards con grid 1px gap):
   - Planos de arquitectura
   - Permisos de edificación
   - Regularización de obras
5. **CTA Band**: Banda oscura navy con texto + botón naranja
6. **Footer**: Logo + links + datos de contacto + copyright

#### `/nosotros` — Sobre nosotros
1. Header de página con título + breadcrumb
2. Historia de la empresa (texto + imagen)
3. Valores institucionales (3-4 items con icono)
4. Llamado a la acción → /contacto

#### `/contacto` — Contacto
1. Header de página
2. Grid 2 columnas: formulario izquierda + datos de contacto derecha
3. Formulario: Nombre / Teléfono / Email / Tipo de proyecto / Mensaje
4. Datos: teléfono, email, dirección, horario
5. Feedback visual al enviar (loading + éxito + error)

### Componentes de UI

```tsx
// Convención de clases Tailwind reutilizables
// Botón primario
"bg-[#E86C00] text-white text-xs tracking-widest uppercase px-6 py-3 hover:bg-[#c55a00] transition-colors"

// Botón outline
"border border-white text-white text-xs tracking-widest uppercase px-6 py-3 hover:bg-white hover:text-[#0D2645] transition-colors"

// Label de sección
"text-[#E86C00] text-xs tracking-[0.14em] uppercase font-medium"

// Título de sección
"text-3xl font-['Playfair_Display'] font-normal text-gray-900 leading-tight"
```

---

## BUENAS PRÁCTICAS — OBLIGATORIAS

### 1. Variables de entorno — NUNCA hardcodear

```ts
// lib/env.ts — ejecutar al importar, falla en build si falta variable
const vars = [
  'GMAIL_USER',
  'GMAIL_APP_PASSWORD',
  'EMAIL_TO',
  'NEXT_PUBLIC_SITE_URL',
] as const;

for (const key of vars) {
  if (!process.env[key]) {
    throw new Error(`[env] Variable de entorno faltante: ${key}`);
  }
}

export const env = {
  gmailUser: process.env.GMAIL_USER!,
  gmailPass: process.env.GMAIL_APP_PASSWORD!,
  emailTo:   process.env.EMAIL_TO!,
  siteUrl:   process.env.NEXT_PUBLIC_SITE_URL!,
};
```

```bash
# .env.example (subir a git — sin valores reales)
GMAIL_USER=contacto@sacplanos.cl
GMAIL_APP_PASSWORD=            # App Password Google (16 chars, con espacios)
EMAIL_TO=administracion@sacplanos.cl
NEXT_PUBLIC_SITE_URL=https://sacplanos.cl
UPSTASH_REDIS_REST_URL=        # Solo si usas rate limiting
UPSTASH_REDIS_REST_TOKEN=      # Solo si usas rate limiting
```

### 2. Validación con Zod (server + client)

```ts
// schemas/contact.ts
import { z } from 'zod';

export const ContactSchema = z.object({
  nombre:   z.string().min(2, 'Mínimo 2 caracteres').max(80),
  email:    z.string().email('Email inválido'),
  telefono: z.string()
             .regex(/^\+?56[0-9]{8,9}$/, 'Teléfono chileno inválido')
             .optional()
             .or(z.literal('')),
  proyecto: z.string().min(3).max(200),
  mensaje:  z.string().min(10, 'Mínimo 10 caracteres').max(1000),
});

export type ContactFormData = z.infer<typeof ContactSchema>;
```

### 3. API Route con validación, sanitización y rate limit

```ts
// app/api/contacto/route.ts
import { NextRequest } from 'next/server';
import { ContactSchema } from '@/schemas/contact';
import { sendContactEmail } from '@/lib/mailer';
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

  // Enviar email
  try {
    await sendContactEmail(result.data);
    return Response.json({ ok: true });
  } catch (err) {
    // No exponer detalles del error al cliente
    console.error('[contacto] Error enviando email:', err);
    return Response.json(
      { error: 'Error al enviar. Intenta de nuevo o contáctanos directamente.' },
      { status: 500 }
    );
  }
}
```

### 4. Nodemailer — configuración segura

```ts
// lib/mailer.ts
import nodemailer from 'nodemailer';
import { env } from './env';
import type { ContactFormData } from '@/schemas/contact';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: env.gmailUser,
    pass: env.gmailPass,   // App Password, NO la contraseña real
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
```

### 5. Headers de seguridad HTTP

```js
// next.config.js
const securityHeaders = [
  { key: 'X-Frame-Options',           value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options',    value: 'nosniff' },
  { key: 'Referrer-Policy',           value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy',        value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }];
  },
};

module.exports = nextConfig;
```

### 6. Rate limiting

```ts
// lib/ratelimit.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '60 s'),
  analytics: false,
});
```

### 7. SEO y metadata

```ts
// app/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  title: {
    default: 'SAC Planos | Arquitectura y Permisos en Santiago',
    template: '%s | SAC Planos',
  },
  description: 'Más de 20 años elaborando planos, permisos de edificación y regularización de obras en Chile. Precisión técnica en cada proyecto.',
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    siteName: 'SAC Planos',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};
```

### 8. .gitignore mínimo

```
# .gitignore
node_modules/
.next/
.env.local
.env*.local
*.env
.DS_Store
```

---

## HOSTING EN HOSTINGER — PASOS DE DEPLOY

### Opción A: Export estático (recomendada para páginas sin SSR)

```js
// next.config.js — agregar si no usas middleware ni edge functions
const nextConfig = {
  output: 'export',      // genera carpeta /out con HTML estático
  trailingSlash: true,
  // ... resto de config
};
```

```bash
npm run build    # genera /out
# Subir carpeta /out al File Manager de Hostinger → public_html
```

> LIMITACIÓN: con `output: 'export'` las API Routes no funcionan.
> El formulario necesita un servicio externo (Resend, Formspree) o usar
> Hostinger con Node.js activado (Opción B).

### Opción B: Node.js en Hostinger (recomendada — formulario propio)

1. En Hostinger → **Hosting → Manage → Node.js** → habilitar
2. Configurar Node.js version: 18.x o 20.x
3. Entry point: `server.js` (crear con `next start`)
4. Subir proyecto por SSH o Git

```bash
# En servidor Hostinger via SSH
git clone https://github.com/tu-usuario/sacplanos.git
cd sacplanos
npm install
npm run build
npm start       # o configurar PM2 para que no caiga
```

```bash
# PM2 para mantener el servidor vivo
npm install -g pm2
pm2 start npm --name "sacplanos" -- start
pm2 save
pm2 startup
```

### Variables de entorno en Hostinger

En el panel de Hostinger → **Environment Variables** o crear el archivo `.env.local` directamente en el servidor via SSH. Nunca en el repositorio.

---

## MIGRACIÓN GMAIL — ORDEN CRÍTICO

```
# Seguir este orden exacto para NO perder correos

Paso 1 → Crear App Password en Google Account
         (Cuenta Google → Seguridad → Verificación 2 pasos → Contraseñas de app)

Paso 2 → En nuevo DNS (Hostinger), agregar ANTES de cambiar MX:
         TXT  @   "v=spf1 include:_spf.google.com ~all"

Paso 3 → Configurar DKIM en Google Workspace Admin
         (Admin → Apps → Gmail → Autenticar email → Generar clave DKIM)
         Agregar registro TXT al DNS de Hostinger

Paso 4 → Cambiar registros MX en Hostinger a Google:
         MX  @  1   ASPMX.L.GOOGLE.COM
         MX  @  5   ALT1.ASPMX.L.GOOGLE.COM
         MX  @  5   ALT2.ASPMX.L.GOOGLE.COM
         MX  @  10  ALT3.ASPMX.L.GOOGLE.COM
         MX  @  10  ALT4.ASPMX.L.GOOGLE.COM

Paso 5 → Esperar propagación DNS (hasta 48 horas)

Paso 6 → Verificar: dig MX sacplanos.cl
         o usar: https://mxtoolbox.com/SuperTool.aspx

Paso 7 → Cambiar A/CNAME hacia Hostinger (sitio web)
         A    @    IP-DE-HOSTINGER
         CNAME www  @
```

---

## SEGURIDAD — CHECKLIST COMPLETO

```
VARIABLES DE ENTORNO
[ ] .env.local en .gitignore
[ ] .env.example subido sin valores reales
[ ] lib/env.ts valida presencia de todas las variables al arrancar
[ ] Ninguna variable sensible tiene prefijo NEXT_PUBLIC_

API Y FORMULARIO
[ ] Validación Zod en route handler (server-side, nunca confiar en cliente)
[ ] Rate limiting activo en /api/contacto (5 req/min por IP)
[ ] Respuestas de error genéricas (no exponer stack traces)
[ ] console.error para logs internos de errores
[ ] Método HTTP verificado (solo POST en /api/contacto)

HEADERS HTTP
[ ] X-Frame-Options: SAMEORIGIN (anti-clickjacking)
[ ] X-Content-Type-Options: nosniff
[ ] Strict-Transport-Security (HSTS)
[ ] Referrer-Policy configurado
[ ] Permissions-Policy: deshabilitar cámara/micrófono/geolocalización

HTTPS Y DOMINIO
[ ] SSL activo en Hostinger (Let's Encrypt)
[ ] HTTP redirige a HTTPS
[ ] www redirige a apex (o viceversa), consistente

EMAIL
[ ] Gmail App Password (NO contraseña real de la cuenta)
[ ] replyTo apunta al email del formulario (no al GMAIL_USER)
[ ] Plantilla de email legible en texto plano (sin HTML complejo)

DEPENDENCIAS
[ ] npm audit antes de deploy
[ ] Versiones fijadas en package.json (sin ^* libres en producción)
[ ] Solo instalar dependencias necesarias
```

---

## COMANDOS DE DESARROLLO

```bash
# Iniciar proyecto
npx create-next-app@latest sacplanos --typescript --tailwind --app --src-dir=no

# Dependencias del proyecto
npm install nodemailer zod
npm install @upstash/ratelimit @upstash/redis
npm install -D @types/nodemailer

# Desarrollo local
npm run dev          # http://localhost:3000

# Build y verificación
npm run build        # verifica TypeScript + genera build
npm run start        # corre build en local antes de subir

# Auditoría de seguridad
npm audit
npm audit fix
```

---

## INSTRUCCIONES PARA CLAUDE CODE

Cuando trabajes en este proyecto, sigue estas reglas:

1. **Lee este documento completo antes de generar cualquier código**
2. **Nunca hardcodear** URLs, credenciales, emails ni números de teléfono — siempre usar `process.env` o el objeto `env` de `lib/env.ts`
3. **Siempre tipar** con TypeScript estricto. Sin `any` implícito
4. **Validar en el servidor** aunque ya se valide en el cliente
5. **Un componente por archivo** en `components/`
6. **Comentar en español** los bloques de lógica de negocio
7. **Seguir la estructura de carpetas** definida arriba — no crear carpetas nuevas sin justificarlo
8. **Colores siempre desde Tailwind config** (`brand-navy`, `brand-orange`, etc.) — no hardcodear hex en JSX
9. **Formulario de contacto**: mostrar estado loading, éxito y error claramente al usuario
10. **Accesibilidad mínima**: labels en todos los inputs, alt en todas las imágenes, contraste suficiente

---

## CONTEXTO DEL CLIENTE

- **Empresa**: SAC Planos — arquitectura técnica, planos y trámites DOM en Chile
- **Dominio actual**: sacplanos.cl (mantener el mismo)
- **Correo actual**: Gmail corporativo (migrar sin pérdida de emails)
- **Nuevo hosting**: Hostinger (plan a confirmar: Business Hosting o VPS)
- **Páginas requeridas**: Inicio / Sobre nosotros / Contacto
- **Sin CMS**: el cliente no necesita editar contenido frecuentemente
- **Sin base de datos**: no hay usuarios, no hay login, no hay panel admin
- **Formulario de contacto**: único punto de interacción dinámica
- **Prioridad**: SEO local (Santiago, Chile), carga rápida, aspecto profesional

---

*Documento generado como guía de arquitectura para Claude Code.*
*Versión 1.0 — Proyecto SAC Planos*