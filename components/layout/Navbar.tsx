'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/#servicios', label: 'Servicios' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/contacto', label: 'Contacto' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-brand-gray-mid sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Empresa SAC - Servicio de Arquitectura y Construcción"
              width={280}
              height={90}
              className="h-16 sm:h-20 w-auto"
              priority
            />
          </Link>

          {/* Links desktop */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-brand-gray-text text-base tracking-wide hover:text-brand-navy transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contacto"
              className="bg-brand-orange text-white text-sm tracking-widest uppercase px-8 py-4 hover:bg-[#c55a00] transition-colors"
            >
              Cotizar
            </Link>
          </div>

          {/* Botón menú móvil */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-brand-navy"
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Menú móvil */}
        {isOpen && (
          <div className="md:hidden border-t border-brand-gray-mid pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-3 px-2 text-brand-gray-text text-sm hover:text-brand-navy transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contacto"
              onClick={() => setIsOpen(false)}
              className="block mt-2 text-center bg-brand-orange text-white text-xs tracking-widest uppercase px-6 py-3 hover:bg-[#c55a00] transition-colors"
            >
              Cotizar
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
