import dotenv from 'dotenv';
import path from 'node:path';
import { defineConfig } from 'prisma/config';

// Cargar .env.local (Next.js lo hace automático, Prisma CLI no)
dotenv.config({ path: path.resolve(__dirname, '.env.local') });

export default defineConfig({
  schema: path.resolve(__dirname, 'prisma', 'schema.prisma'),
  migrations: {
    path: path.resolve(__dirname, 'prisma', 'migrations'),
  },
  datasource: {
    url: process.env.DATABASE_URL!,
  },
});
