import type { Metadata } from 'next';
import Link from 'next/link';
import ProjectsGallery from '@/components/sections/ProjectsGallery';

export const metadata: Metadata = {
  title: 'Proyectos Realizados',
  description:
    'Galería de proyectos realizados por SAC: viviendas, edificios e instituciones construidas con precisión técnica en Chile. Desde 1989 a su servicio.',
};

export default function ProyectosPage() {
  return (
    <>
      {/* Header de página */}
      <section className="bg-brand-navy py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-brand-orange text-xs tracking-[0.14em] uppercase font-medium">
            Nuestro Trabajo
          </span>
          <h1 className="font-display text-3xl sm:text-4xl text-white mt-3">
            Proyectos Realizados
          </h1>
          <div className="flex items-center gap-2 mt-4 text-white/50 text-sm">
            <Link href="/" className="hover:text-white transition-colors">
              Inicio
            </Link>
            <span>/</span>
            <span className="text-white/80">Proyectos</span>
          </div>
        </div>
      </section>

      {/* Galería */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-3xl text-gray-900">
              Desde 1989 construyendo en Chile
            </h2>
            <p className="text-brand-gray-text text-lg mt-5">
              Una selección de viviendas, edificios e instituciones que hemos
              proyectado y construido. Cada obra refleja nuestro compromiso con
              la calidad y la precisión técnica.
            </p>
          </div>

          <ProjectsGallery />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand-gray-light">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl text-gray-900 mb-4">
            ¿Quieres que tu proyecto sea el próximo?
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
