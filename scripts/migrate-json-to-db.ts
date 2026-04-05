/**
 * Script para migrar contactos del archivo JSON a la base de datos MySQL.
 *
 * Ejecutar con: npx tsx scripts/migrate-json-to-db.ts
 *
 * Requisitos:
 * - npm install tsx (si no está instalado)
 * - Tener .env.local con DATABASE_URL configurado
 * - Haber ejecutado: npx prisma migrate dev --name init
 * - Tener el archivo data/contactos.json con datos
 */
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

interface LegacyContact {
  id: string;
  nombre: string;
  email: string;
  telefono?: string;
  proyecto: string;
  mensaje: string;
  ip: string;
  leido: boolean;
  respondido: boolean;
  fecha: string;
}

async function migrate() {
  const dataFile = path.join(process.cwd(), 'data', 'contactos.json');

  if (!fs.existsSync(dataFile)) {
    console.log('No se encontró data/contactos.json — nada que migrar.');
    return;
  }

  const raw = fs.readFileSync(dataFile, 'utf-8');
  const contactos: LegacyContact[] = JSON.parse(raw);

  if (contactos.length === 0) {
    console.log('El archivo JSON está vacío — nada que migrar.');
    return;
  }

  console.log(`Migrando ${contactos.length} contactos...`);

  let migrados = 0;
  let errores = 0;

  for (const c of contactos) {
    try {
      await prisma.contacto.create({
        data: {
          nombre: c.nombre,
          email: c.email,
          telefono: c.telefono || null,
          proyecto: c.proyecto,
          mensaje: c.mensaje,
          ip: c.ip || 'migrado-desde-json',
          leido: c.leido ?? false,
          respondido: c.respondido ?? false,
          fecha: new Date(c.fecha),
        },
      });
      migrados++;
    } catch (err) {
      errores++;
      console.error(`Error migrando contacto "${c.nombre}":`, err);
    }
  }

  console.log(`\nResultado: ${migrados} migrados, ${errores} errores.`);

  if (errores === 0) {
    console.log('\nMigración exitosa. Puedes eliminar data/contactos.json cuando confirmes que todo funciona.');
  }
}

migrate()
  .catch((err) => {
    console.error('Error fatal en migración:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
