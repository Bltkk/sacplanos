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
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Rate limiter: 5 solicitudes por minuto por IP
// En desarrollo local sin Upstash, se puede desactivar con variable de entorno vacía
const hasRedis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN;

// Fallback para desarrollo local sin Redis
const mockRatelimit = {
  limit: async () => ({ success: true, limit: 5, remaining: 5, reset: 0 }),
};

export const ratelimit = hasRedis
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(5, '60 s'),
      analytics: false,
    })
  : mockRatelimit;
