import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Columna 1: Logo y descripción */}
          <div>
            <div className="mb-4 bg-white rounded p-3 inline-block">
              <Image
                src="/logo.png"
                alt="Empresa SAC"
                width={160}
                height={50}
                className="h-12 w-auto"
              />
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Servicio de Arquitectura y Construcción. Más de 30 años
              de experiencia y en el mismo lugar. 100% garantizado.
            </p>
          </div>

          {/* Columna 2: Enlaces */}
          <div>
            <h3 className="text-brand-orange text-xs tracking-[0.14em] uppercase font-medium mb-4">
              Navegación
            </h3>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Inicio' },
                { href: '/#servicios', label: 'Servicios' },
                { href: '/proyectos', label: 'Proyectos' },
                { href: '/nosotros', label: 'Nosotros' },
                { href: '/contacto', label: 'Contacto' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Contacto */}
          <div>
            <h3 className="text-brand-orange text-xs tracking-[0.14em] uppercase font-medium mb-4">
              Contacto
            </h3>
            <ul className="space-y-3 text-white/60 text-sm">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p>empresaconstructora@sacplanos.cl</p>
                  <p>secretaria@sacplanos.cl</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <p>(+56 2) 2643 4156</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <a
                  href="https://maps.google.com/?q=Av+San+Pablo+8426+Of+14+Pudahuel+Santiago+Chile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Av. San Pablo N° 8426, Of. 14<br />Pudahuel, Santiago
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright — toda la franja es un link oculto al panel admin */}
        <Link
          href="/admin"
          className="border-t border-white/10 mt-12 pt-8 pb-8 block text-center text-white/40 text-sm tracking-wide hover:text-white/60 transition-colors"
          aria-label="Administración"
        >
          &copy; {currentYear} Empresa SAC Ltda. Todos los derechos reservados. | www.sacplanos.cl
        </Link>
      </div>
    </footer>
  );
}
