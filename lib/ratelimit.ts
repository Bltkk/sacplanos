// Rate limiting simple en memoria (sin Redis)
// Limita 5 solicitudes por minuto por IP
const intentos = new Map<string, { count: number; reset: number }>();

export const ratelimit = {
  limit: async (ip: string) => {
    const ahora = Date.now();
    const ventana = 60 * 1000; // 1 minuto
    const limite = 5;

    const registro = intentos.get(ip);

    if (!registro || ahora > registro.reset) {
      intentos.set(ip, { count: 1, reset: ahora + ventana });
      return { success: true };
    }

    if (registro.count >= limite) {
      return { success: false };
    }

    registro.count++;
    return { success: true };
  },
};

