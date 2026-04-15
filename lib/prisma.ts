// Archivo deshabilitado — base de datos eliminada
export {};
import { PrismaClient } from '@prisma/client';

// Evitar múltiples instancias en desarrollo (hot reload crea conexiones nuevas)
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
