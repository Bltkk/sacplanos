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
