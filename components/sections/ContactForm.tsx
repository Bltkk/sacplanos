'use client';

import { useState } from 'react';
import { ContactSchema, type ContactFormData } from '@/schemas/contact';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [serverError, setServerError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setServerError('');

    const formData = new FormData(e.currentTarget);
    // Concatenar +56 al teléfono si el usuario ingresó dígitos
    const telefonoRaw = (formData.get('telefono') as string).replace(/\s/g, '');
    const telefono = telefonoRaw ? `+56${telefonoRaw}` : '';

    const data = {
      nombre: (formData.get('nombre') as string).trim(),
      email: (formData.get('email') as string).trim(),
      telefono,
      proyecto: (formData.get('proyecto') as string).trim(),
      mensaje: (formData.get('mensaje') as string).trim(),
    };

    // Validación client-side
    const result = ContactSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof ContactFormData;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    // Enviar al servidor
    setStatus('loading');
    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || 'Error al enviar el formulario.');
      }

      setStatus('success');
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus('error');
      setServerError(
        err instanceof Error ? err.message : 'Error inesperado. Intenta de nuevo.'
      );
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 p-8 text-center">
        <svg className="w-12 h-12 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <h3 className="font-display text-xl text-gray-900 mb-2">Mensaje enviado</h3>
        <p className="text-brand-gray-text text-sm">
          Nos pondremos en contacto contigo a la brevedad.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 text-brand-orange text-sm underline hover:no-underline"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Nombre */}
      <div>
        <label htmlFor="nombre" className="block text-sm text-gray-700 mb-1">
          Nombre completo *
        </label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          required
          className="w-full border border-brand-gray-mid px-4 py-3 text-sm focus:outline-none focus:border-brand-navy transition-colors"
          placeholder="Juan Pérez"
        />
        {errors.nombre && (
          <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm text-gray-700 mb-1">
          Correo electrónico *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full border border-brand-gray-mid px-4 py-3 text-sm focus:outline-none focus:border-brand-navy transition-colors"
          placeholder="juan@ejemplo.cl"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}
      </div>

      {/* Teléfono */}
      <div>
        <label htmlFor="telefono" className="block text-sm text-gray-700 mb-1">
          Teléfono (opcional)
        </label>
        <div className="flex">
          <span className="inline-flex items-center px-3 border border-r-0 border-brand-gray-mid bg-brand-gray-light text-brand-gray-text text-sm">
            +56
          </span>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            maxLength={9}
            className="flex-1 border border-brand-gray-mid px-4 py-3 text-sm focus:outline-none focus:border-brand-navy transition-colors"
            placeholder="912345678"
          />
        </div>
        {errors.telefono && (
          <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>
        )}
      </div>

      {/* Tipo de proyecto */}
      <div>
        <label htmlFor="proyecto" className="block text-sm text-gray-700 mb-1">
          Tipo de proyecto *
        </label>
        <input
          type="text"
          id="proyecto"
          name="proyecto"
          required
          className="w-full border border-brand-gray-mid px-4 py-3 text-sm focus:outline-none focus:border-brand-navy transition-colors"
          placeholder="Ej: Regularización de ampliación"
        />
        {errors.proyecto && (
          <p className="text-red-500 text-xs mt-1">{errors.proyecto}</p>
        )}
      </div>

      {/* Mensaje */}
      <div>
        <label htmlFor="mensaje" className="block text-sm text-gray-700 mb-1">
          Mensaje *
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          required
          rows={5}
          className="w-full border border-brand-gray-mid px-4 py-3 text-sm focus:outline-none focus:border-brand-navy transition-colors resize-none"
          placeholder="Cuéntanos sobre tu proyecto..."
        />
        {errors.mensaje && (
          <p className="text-red-500 text-xs mt-1">{errors.mensaje}</p>
        )}
      </div>

      {/* Error del servidor */}
      {status === 'error' && serverError && (
        <div className="bg-red-50 border border-red-200 p-4 text-red-700 text-sm">
          {serverError}
        </div>
      )}

      {/* Botón enviar */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-brand-orange text-white text-xs tracking-widest uppercase px-6 py-4 hover:bg-[#c55a00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Enviando...' : 'Enviar Mensaje'}
      </button>
    </form>
  );
}
