import type { Metadata } from 'next';
import Link from 'next/link';
import ContactForm from '@/components/sections/ContactForm';

export const metadata: Metadata = {
  title: 'Contacto',
  description:
    'Contáctanos para cotizar tu proyecto de planos, permisos de edificación o regularización de obras.',
};

export default function ContactoPage() {
  return (
    <>
      {/* Header de página */}
      <section className="bg-brand-navy py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-brand-orange text-xs tracking-[0.14em] uppercase font-medium">
            Contacto
          </span>
          <h1 className="font-display text-3xl sm:text-4xl text-white mt-3">
            Conversemos sobre tu proyecto
          </h1>
          <div className="flex items-center gap-2 mt-4 text-white/50 text-sm">
            <Link href="/" className="hover:text-white transition-colors">
              Inicio
            </Link>
            <span>/</span>
            <span className="text-white/80">Contacto</span>
          </div>
        </div>
      </section>

      {/* Contenido */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Formulario */}
            <div>
              <span className="text-brand-orange text-xs tracking-[0.14em] uppercase font-medium">
                Escríbenos
              </span>
              <h2 className="font-display text-2xl text-gray-900 mt-3 mb-8">
                Solicita tu cotización
              </h2>
              <ContactForm />
            </div>

            {/* Datos de contacto */}
            <div>
              <span className="text-brand-orange text-xs tracking-[0.14em] uppercase font-medium">
                Información
              </span>
              <h2 className="font-display text-2xl text-gray-900 mt-3 mb-8">
                Datos de contacto
              </h2>

              <div className="space-y-8">
                {/* Teléfono */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-gray-light flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Teléfonos</h3>
                    <p className="text-brand-gray-text text-sm mt-1">(+56 2) 2643 6318</p>
                    <p className="text-brand-gray-text text-sm">(+56 2) 2643 4156</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-gray-light flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Correo electrónico</h3>
                    <p className="text-brand-gray-text text-sm mt-1">empresaconstructora@sacplanos.cl</p>
                    <p className="text-brand-gray-text text-sm">secretaria@sacplanos.cl</p>
                  </div>
                </div>

                {/* Dirección */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-gray-light flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Dirección</h3>
                    <a
                      href="https://maps.google.com/?q=Av+San+Pablo+8426+Of+14+Pudahuel+Santiago+Chile"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-gray-text text-sm mt-1 hover:text-brand-blue transition-colors block"
                    >
                      Av. San Pablo N° 8426, Of. 14<br />Pudahuel, Santiago
                    </a>
                  </div>
                </div>

                {/* Horario */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-gray-light flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Horario de atención</h3>
                    <p className="text-brand-gray-text text-sm mt-1">
                      Lunes a Viernes: 9:00 - 18:00
                    </p>
                    <p className="text-brand-gray-text text-sm">
                      Sábado: 10:00 - 14:00
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
