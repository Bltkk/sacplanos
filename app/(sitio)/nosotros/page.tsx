import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Nosotros',
  description:
    'Conoce la historia, valores y equipo de SAC Planos. Más de 20 años de experiencia en arquitectura técnica en Chile.',
};

const valores = [
  {
    title: 'Precisión Técnica',
    description:
      'Cada plano y documento es elaborado con rigurosidad normativa, minimizando observaciones y rechazos.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Compromiso',
    description:
      'Acompañamos a nuestros clientes en cada etapa del proceso, desde el diseño hasta la aprobación final.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    title: 'Experiencia',
    description:
      'Más de dos décadas resolviendo proyectos de diversa complejidad nos respaldan.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    title: 'Transparencia',
    description:
      'Comunicación clara sobre plazos, costos y estado de los trámites en todo momento.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
];

export default function NosotrosPage() {
  return (
    <>
      {/* Header de página */}
      <section className="bg-brand-navy py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-brand-orange text-xs tracking-[0.14em] uppercase font-medium">
            Sobre Nosotros
          </span>
          <h1 className="font-display text-3xl sm:text-4xl text-white mt-3">
            Nuestra Historia
          </h1>
          <div className="flex items-center gap-2 mt-4 text-white/50 text-sm">
            <Link href="/" className="hover:text-white transition-colors">
              Inicio
            </Link>
            <span>/</span>
            <span className="text-white/80">Nosotros</span>
          </div>
        </div>
      </section>

      {/* Historia */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-brand-orange text-xs tracking-[0.14em] uppercase font-medium">
                Quiénes Somos
              </span>
              <h2 className="font-display text-3xl text-gray-900 mt-3 mb-6">
                Más de 20 años construyendo confianza
              </h2>
              <div className="space-y-4 text-brand-gray-text leading-relaxed">
                <p>
                  SAC Planos nació con la misión de simplificar el proceso de
                  obtención de permisos de edificación en Chile. Desde nuestros
                  inicios, hemos acompañado a cientos de familias, empresas y
                  profesionales en la materialización de sus proyectos.
                </p>
                <p>
                  Nuestro equipo combina experiencia técnica con un profundo
                  conocimiento de la normativa chilena, lo que nos permite
                  ofrecer soluciones eficientes y con alta tasa de aprobación
                  ante las Direcciones de Obras Municipales.
                </p>
                <p>
                  Hoy, con más de 800 proyectos realizados, seguimos
                  comprometidos con la misma precisión y dedicación del
                  primer día.
                </p>
              </div>
            </div>
            <div className="bg-brand-gray-light aspect-[4/3] flex items-center justify-center border border-brand-gray-mid">
              <div className="text-center text-brand-gray-text">
                <svg className="w-16 h-16 mx-auto mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm tracking-wide uppercase opacity-50">
                  Foto del equipo / oficina
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-20 bg-brand-gray-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-brand-orange text-xs tracking-[0.14em] uppercase font-medium">
              Nuestros Valores
            </span>
            <h2 className="font-display text-3xl text-gray-900 mt-3">
              Lo que nos define
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {valores.map((valor) => (
              <div key={valor.title} className="bg-white p-8 border border-brand-gray-mid">
                <div className="text-brand-orange mb-4">{valor.icon}</div>
                <h3 className="font-display text-lg text-gray-900 mb-2">
                  {valor.title}
                </h3>
                <p className="text-brand-gray-text text-sm leading-relaxed">
                  {valor.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl text-gray-900 mb-4">
            ¿Listo para comenzar tu proyecto?
          </h2>
          <p className="text-brand-gray-text mb-8">
            Cuéntanos sobre tu proyecto y te entregaremos una cotización sin compromiso.
          </p>
          <Link
            href="/contacto"
            className="inline-block bg-brand-orange text-white text-xs tracking-widest uppercase px-8 py-4 hover:bg-[#c55a00] transition-colors"
          >
            Solicitar Cotización
          </Link>
        </div>
      </section>
    </>
  );
}
