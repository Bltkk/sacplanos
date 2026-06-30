import Link from 'next/link';

const regularizacion = [
  'Planos en General',
  'Permiso de Edificación',
  'Recepción Final',
  'Fusión y Subdivisiones',
  'Proyectos nuevos de viviendas, colegios y comerciales',
  'Proyectos eléctricos',
  'Proyectos sanitarios',
  'Proyectos de gas',
];

const construccion = [
  'Construcciones de 1 y 2 pisos',
  'Construcciones de colegios y locales comerciales',
  'Remodelaciones',
  'Reparaciones',
];

const tramitesMunicipales = [
  'Corretaje de propiedades',
  'Tasaciones',
  'Certificados municipales',
  'Gestión ante la DOM',
];

export default function ServicesSection() {
  return (
    <section id="servicios" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header de sección */}
        <div className="text-center mb-20">
          <span className="text-brand-orange text-sm tracking-[0.14em] uppercase font-medium">
            Nuestros Servicios
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-gray-900 mt-4">
            Soluciones integrales en arquitectura y construcción
          </h2>
          <p className="text-brand-gray-text text-lg mt-5 max-w-3xl mx-auto">
            Desde 1989 a su servicio y en el mismo lugar.
            Ofrecemos un servicio completo, 100% garantizado.
          </p>
        </div>

        {/* Dos bloques de servicios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-brand-gray-mid">
          {/* Regularice su propiedad */}
          <div className="bg-white p-12 lg:p-16 hover:bg-brand-gray-light transition-colors">
            <div className="text-brand-orange mb-5">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="font-display text-3xl text-gray-900 mb-3">
              Regularice su Propiedad
            </h3>
            <p className="text-brand-gray-text text-base mb-8">
              Gestión integral ante la Dirección de Obras Municipales para
              regularizar su propiedad con alta tasa de aprobación.
            </p>
            <ul className="space-y-4">
              {regularizacion.map((item) => (
                <li key={item} className="flex items-start gap-3 text-base text-brand-gray-text">
                  <span className="text-brand-orange mt-1 shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Construya su proyecto */}
          <div className="bg-white p-12 lg:p-16 hover:bg-brand-gray-light transition-colors">
            <div className="text-brand-orange mb-5">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="font-display text-3xl text-gray-900 mb-3">
              Construya su Proyecto
            </h3>
            <p className="text-brand-gray-text text-base mb-8">
              Ejecutamos su proyecto de construcción con los más altos
              estándares de calidad y cumplimiento normativo.
            </p>
            <ul className="space-y-4">
              {construccion.map((item) => (
                <li key={item} className="flex items-start gap-3 text-base text-brand-gray-text">
                  <span className="text-brand-orange mt-1 shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Trámites Municipales */}
          <div className="bg-white p-12 lg:p-16 hover:bg-brand-gray-light transition-colors">
            <div className="text-brand-orange mb-5">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="font-display text-3xl text-gray-900 mb-3">
              Trámites Municipales
            </h3>
            <p className="text-brand-gray-text text-base mb-8">
              Asesoría y gestión completa en trámites inmobiliarios
              y procedimientos ante organismos municipales.
            </p>
            <ul className="space-y-4">
              {tramitesMunicipales.map((item) => (
                <li key={item} className="flex items-start gap-3 text-base text-brand-gray-text">
                  <span className="text-brand-orange mt-1 shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
