import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="min-h-[600px] grid grid-cols-1 lg:grid-cols-2">
      {/* Lado izquierdo — contenido */}
      <div className="bg-brand-navy flex items-center px-8 sm:px-12 lg:px-20 py-20">
        <div className="max-w-lg">
          <span className="text-brand-orange text-xs tracking-[0.14em] uppercase font-medium">
            Servicio de Arquitectura y Construcción
          </span>
          <h1 className="font-display text-4xl sm:text-5xl text-white mt-4 leading-tight">
            Desde 1989 a su servicio y en el mismo lugar
          </h1>
          <p className="text-white/70 mt-6 leading-relaxed">
            Regularice su propiedad o construya su proyecto con Empresa SAC Ltda.
            Planos, permisos de edificación, recepción final, fusiones,
            subdivisiones y construcción. 100% garantizado.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <Link
              href="/contacto"
              className="bg-brand-orange text-white text-xs tracking-widest uppercase px-6 py-3 hover:bg-[#c55a00] transition-colors"
            >
              Solicitar Cotización
            </Link>
            <Link
              href="/#servicios"
              className="border border-white text-white text-xs tracking-widest uppercase px-6 py-3 hover:bg-white hover:text-brand-navy transition-colors"
            >
              Ver Servicios
            </Link>
          </div>
        </div>
      </div>

      {/* Lado derecho — imagen corporativa */}
      <div className="bg-brand-gray-light flex items-center justify-center p-0">
        <Image
          src="/imagen_corporativa.png"
          alt="Empresa SAC - Servicio de Arquitectura y Construcción"
          width={800}
          height={600}
          className="w-full h-full object-cover"
          priority
        />
      </div>
    </section>
  );
}
