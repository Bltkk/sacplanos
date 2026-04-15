// Ruta deshabilitada
export async function GET() {
  return Response.json({ error: "No disponible" }, { status: 404 });
}

