import { z } from 'zod';

// Solo letras, espacios, tildes y ñ — no permite emails ni números
const soloNombres = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;

export const ContactSchema = z.object({
  nombre: z
    .string()
    .min(2, 'Mínimo 2 caracteres')
    .max(80)
    .regex(soloNombres, 'Ingresa solo tu nombre (sin números ni símbolos)'),
  email: z.string().email('Email inválido'),
  telefono: z
    .string()
    .regex(/^\+56\d{9}$/, 'Formato: +56XXXXXXXXX (9 dígitos después de +56)')
    .optional()
    .or(z.literal('+56'))
    .or(z.literal('')),
  proyecto: z.string().min(3, 'Mínimo 3 caracteres').max(200),
  mensaje: z.string().min(10, 'Mínimo 10 caracteres').max(1000),
});

export type ContactFormData = z.infer<typeof ContactSchema>;
