// Ruta deshabilitada — base de datos eliminada
export async function GET() {
  return Response.json({ error: 'Ruta no disponible' }, { status: 404 });
}
import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { env } from '@/lib/env';

// Endpoint temporal de diagnóstico — ELIMINAR después de resolver el problema
export async function GET(req: NextRequest) {
  // Proteger con la contraseña admin
  const authHeader = req.headers.get('authorization');
  const password = authHeader?.replace('Bearer ', '');
  if (password !== env.adminPassword) {
    return Response.json({ error: 'No autorizado' }, { status: 401 });
  }

  const resultado: Record<string, unknown> = {
    timestamp: new Date().toISOString(),
    nodeVersion: process.version,
    platform: process.platform,
    arch: process.arch,
    databaseUrlSet: !!process.env.DATABASE_URL,
    // Mostrar host de la URL sin credenciales
    databaseHost: process.env.DATABASE_URL
      ? process.env.DATABASE_URL.replace(/\/\/.*@/, '//<credenciales>@')
      : 'NO CONFIGURADA',
  };

  // Intentar conectar a la BD
  try {
    await prisma.$connect();
    resultado.conexion = 'OK — conectado exitosamente';
  } catch (err) {
    resultado.conexion = 'ERROR';
    resultado.errorConexion = String(err);
    resultado.errorStack = err instanceof Error ? err.stack : undefined;
    return Response.json(resultado, { status: 500 });
  }

  // Intentar una consulta simple
  try {
    const count = await prisma.contacto.count();
    resultado.consulta = 'OK';
    resultado.totalContactos = count;
  } catch (err) {
    resultado.consulta = 'ERROR';
    resultado.errorConsulta = String(err);
    resultado.errorStack = err instanceof Error ? err.stack : undefined;
    return Response.json(resultado, { status: 500 });
  }

  return Response.json(resultado);
}
