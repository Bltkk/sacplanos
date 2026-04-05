# SAC Planos — Arreglo Admin + Migración a Base de Datos

---

## PARTE 1: Arreglar acceso al Admin en Hostinger

### Problema

La variable de entorno `ADMIN_PASSWORD` probablemente no está configurada en el servidor de Hostinger. Cuando falta, la API siempre rechaza la contraseña sin dar un mensaje claro.

### Cambios ya aplicados en el código

1. **`.env.local`** — Se eliminaron entradas duplicadas de `GMAIL_USER` y `GMAIL_APP_PASSWORD`
2. **`lib/env.ts`** — Ahora valida que `ADMIN_PASSWORD` exista al arrancar. Si falta, el build falla con un mensaje claro
3. **`app/api/admin/contactos/route.ts`** — Usa `env.adminPassword` (validado) en vez de `process.env.ADMIN_PASSWORD` directo
4. **`app/api/admin/contactos/csv/route.ts`** — Mismo cambio

### Pasos para arreglar en Hostinger

#### Opción A: Via SSH

```bash
# 1. Conectar por SSH a Hostinger
ssh usuario@tu-servidor-hostinger

# 2. Ir al directorio del proyecto
cd /ruta/a/sacplanos

# 3. Verificar si .env.local existe y tiene ADMIN_PASSWORD
cat .env.local | grep ADMIN_PASSWORD

# 4. Si NO aparece, agregar la variable
echo 'ADMIN_PASSWORD=8426SAC.' >> .env.local

# 5. Verificar que quedó bien (sin duplicados)
cat .env.local

# 6. Reconstruir y reiniciar
npm run build
pm2 restart sacplanos
```

#### Opción B: Via Panel de Hostinger

1. Ir a **Hostinger → Hosting → Manage → Avanzado → Variables de entorno** (si está disponible)
2. Agregar `ADMIN_PASSWORD` con valor `8426SAC.`
3. Reiniciar la aplicación Node.js desde el panel

#### Opción C: Via File Manager de Hostinger

1. Ir al **File Manager** en el panel de Hostinger
2. Navegar al directorio del proyecto
3. Buscar el archivo `.env.local` (activar "mostrar archivos ocultos")
4. Editarlo y verificar que contenga:

```
GMAIL_USER=contacto@sacplanos.cl
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
EMAIL_TO=administracion@sacplanos.cl
NEXT_PUBLIC_SITE_URL=https://sacplanos.cl
ADMIN_PASSWORD=8426SAC.
```

5. Guardar y reiniciar la aplicación

### Después de arreglar

- Subir los cambios de código con `git push` y hacer rebuild en el servidor
- Probar acceder a `/admin` con la contraseña `8426SAC.`
- Si sigue fallando, revisar los logs: `pm2 logs sacplanos` — ahora el error será explícito

---

## PARTE 2: Migración a Base de Datos

### ¿Por qué migrar?

El almacenamiento actual usa un archivo JSON (`data/contactos.json`) que tiene estos problemas:

- **Se pierde en redeploy** si no se respalda el directorio `data/`
- **Concurrencia** — si dos personas envían el formulario al mismo tiempo, un mensaje puede sobreescribir al otro
- **No escala** — leer y escribir todo el archivo cada vez es ineficiente con muchos registros
- **Sin respaldo automático** — si el archivo se corrompe, se pierde todo

### Opción recomendada: MySQL de Hostinger

Hostinger incluye MySQL gratis con el plan de hosting. Es la opción más natural porque ya está disponible, no hay que configurar nada extra, y es robusto para producción.

### Stack propuesto

| Herramienta | Rol |
|---|---|
| **Prisma** | ORM para TypeScript — genera tipos, migraciones, consultas seguras |
| **MySQL** | Base de datos incluida en Hostinger |

### Paso a paso para implementar

#### 1. Instalar dependencias

```bash
npm install prisma @prisma/client
npx prisma init
```

Esto crea:
- `prisma/schema.prisma` — definición del modelo
- `.env` — se usa para la URL de conexión (nosotros usaremos `.env.local`)

#### 2. Configurar el schema de Prisma

Crear/editar `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model Contacto {
  id         String   @id @default(cuid())
  nombre     String   @db.VarChar(80)
  email      String   @db.VarChar(255)
  telefono   String?  @db.VarChar(20)
  proyecto   String   @db.VarChar(200)
  mensaje    String   @db.Text
  ip         String   @db.VarChar(45)
  leido      Boolean  @default(false)
  respondido Boolean  @default(false)
  fecha      DateTime @default(now())

  @@map("contactos")
}
```

#### 3. Agregar variable de entorno

En `.env.local` agregar:

```bash
DATABASE_URL="mysql://USUARIO:CONTRASEÑA@HOST:3306/NOMBRE_BD"
```

Los datos los sacas del panel de Hostinger → **Bases de datos → MySQL**.

También agregar `'DATABASE_URL'` al array de validación en `lib/env.ts`.

#### 4. Crear la base de datos en Hostinger

1. Ir a **Hostinger → Bases de datos → MySQL**
2. Crear una base de datos nueva (ej: `sacplanos_db`)
3. Crear un usuario y asignarle permisos completos
4. Anotar: host, usuario, contraseña y nombre de BD

#### 5. Ejecutar la migración

```bash
npx prisma migrate dev --name init
```

Esto crea la tabla `contactos` en MySQL.

#### 6. Crear el cliente de Prisma

Crear `lib/prisma.ts`:

```typescript
import { PrismaClient } from '@prisma/client';

// Evitar múltiples instancias en desarrollo (hot reload)
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
```

#### 7. Reemplazar `lib/storage.ts`

El nuevo `storage.ts` usará Prisma en vez de JSON. Las funciones cambian a `async`:

```typescript
import { prisma } from './prisma';
import type { ContactFormData } from '@/schemas/contact';

// Guardar nuevo contacto
export async function saveContacto(data: ContactFormData, ip: string) {
  return prisma.contacto.create({
    data: { ...data, ip },
  });
}

// Obtener todos los contactos (más recientes primero)
export async function getContactos() {
  return prisma.contacto.findMany({
    orderBy: { fecha: 'desc' },
  });
}

// Marcar como leído
export async function marcarLeido(id: string) {
  try {
    await prisma.contacto.update({
      where: { id },
      data: { leido: true },
    });
    return true;
  } catch {
    return false;
  }
}

// Toggle respondido
export async function toggleRespondido(id: string) {
  const contacto = await prisma.contacto.findUnique({ where: { id } });
  if (!contacto) return null;

  const updated = await prisma.contacto.update({
    where: { id },
    data: { respondido: !contacto.respondido },
  });
  return updated.respondido;
}

// Eliminar contacto
export async function eliminarContacto(id: string) {
  try {
    await prisma.contacto.delete({ where: { id } });
    return true;
  } catch {
    return false;
  }
}

// Exportar a CSV
export async function contactosToCSV() {
  const contactos = await getContactos();
  const sep = ';';
  const headers = ['Fecha', 'Nombre', 'Email', 'Telefono', 'Tipo de Proyecto', 'Mensaje', 'Leido', 'Respondido'];

  const rows = contactos.map((c) => [
    formatFechaCSV(c.fecha),
    escapeCsv(c.nombre),
    escapeCsv(c.email),
    escapeCsv(c.telefono || 'No indicado'),
    escapeCsv(c.proyecto),
    escapeCsv(c.mensaje),
    c.leido ? 'Si' : 'No',
    c.respondido ? 'Si' : 'No',
  ]);

  return [headers.join(sep), ...rows.map((r) => r.join(sep))].join('\n');
}

function formatFechaCSV(date: Date): string {
  const dia = String(date.getDate()).padStart(2, '0');
  const mes = String(date.getMonth() + 1).padStart(2, '0');
  const anio = date.getFullYear();
  const hora = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  return `${dia}/${mes}/${anio} ${hora}:${min}`;
}

function escapeCsv(value: string): string {
  if (value.includes(';') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}
```

#### 8. Actualizar las API Routes

Todas las funciones de storage ahora son `async`, así que hay que agregar `await` en las rutas que las llaman. Los archivos a modificar:

- `app/api/contacto/route.ts` — `await saveContacto(...)`
- `app/api/admin/contactos/route.ts` — `await getContactos()`, `await marcarLeido()`, etc.
- `app/api/admin/contactos/csv/route.ts` — `await contactosToCSV()`

#### 9. Migrar datos existentes (opcional)

Si ya tienes contactos en el JSON, puedes migrarlos con un script:

```bash
# Crear scripts/migrate-json-to-db.ts
npx tsx scripts/migrate-json-to-db.ts
```

```typescript
// scripts/migrate-json-to-db.ts
import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function migrate() {
  const raw = fs.readFileSync('data/contactos.json', 'utf-8');
  const contactos = JSON.parse(raw);

  for (const c of contactos) {
    await prisma.contacto.create({
      data: {
        nombre: c.nombre,
        email: c.email,
        telefono: c.telefono || null,
        proyecto: c.proyecto,
        mensaje: c.mensaje,
        ip: c.ip || 'migrado',
        leido: c.leido ?? false,
        respondido: c.respondido ?? false,
        fecha: new Date(c.fecha),
      },
    });
  }

  console.log(`Migrados ${contactos.length} contactos`);
  await prisma.$disconnect();
}

migrate();
```

#### 10. Deploy en Hostinger

```bash
# En el servidor
git pull
npm install
npx prisma migrate deploy   # aplica migraciones en producción
npm run build
pm2 restart sacplanos
```

### Archivos nuevos/modificados (resumen)

| Archivo | Acción |
|---|---|
| `prisma/schema.prisma` | NUEVO — modelo de datos |
| `lib/prisma.ts` | NUEVO — cliente Prisma singleton |
| `lib/storage.ts` | MODIFICAR — cambiar JSON por Prisma |
| `lib/env.ts` | MODIFICAR — agregar DATABASE_URL |
| `app/api/contacto/route.ts` | MODIFICAR — agregar await |
| `app/api/admin/contactos/route.ts` | MODIFICAR — agregar await |
| `app/api/admin/contactos/csv/route.ts` | MODIFICAR — agregar await |
| `.env.local` | MODIFICAR — agregar DATABASE_URL |
| `.env.example` | MODIFICAR — agregar DATABASE_URL template |
| `package.json` | MODIFICAR — nuevas dependencias |

### Después de migrar

- [ ] Verificar que el formulario de contacto guarda en la BD
- [ ] Verificar que el admin muestra los contactos
- [ ] Verificar que CSV descarga correctamente
- [ ] Eliminar `data/contactos.json` y la carpeta `data/`
- [ ] Hacer backup periódico de MySQL desde el panel de Hostinger
