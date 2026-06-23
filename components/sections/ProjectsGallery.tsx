'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { proyectos, type Categoria } from '@/data/proyectos';

// Categorías disponibles para el filtro (se anteponen "Todos")
const categorias: Array<'Todos' | Categoria> = ['Todos', 'Vivienda', 'Institucional'];

export default function ProjectsGallery() {
  const [filtro, setFiltro] = useState<'Todos' | Categoria>('Todos');
  // Índice de la foto abierta en el lightbox, o null si está cerrado
  const [activo, setActivo] = useState<number | null>(null);

  const visibles =
    filtro === 'Todos'
      ? proyectos
      : proyectos.filter((p) => p.categoria === filtro);

  // Navegación dentro del lightbox (circular)
  const cerrar = useCallback(() => setActivo(null), []);
  const siguiente = useCallback(
    () => setActivo((i) => (i === null ? i : (i + 1) % visibles.length)),
    [visibles.length],
  );
  const anterior = useCallback(
    () => setActivo((i) => (i === null ? i : (i - 1 + visibles.length) % visibles.length)),
    [visibles.length],
  );

  // Teclado: Esc cierra, flechas navegan. Bloquea scroll del fondo.
  useEffect(() => {
    if (activo === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') cerrar();
      if (e.key === 'ArrowRight') siguiente();
      if (e.key === 'ArrowLeft') anterior();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [activo, cerrar, siguiente, anterior]);

  const fotoActiva = activo !== null ? visibles[activo] : null;

  return (
    <>
      {/* Filtros por categoría */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setFiltro(cat);
              setActivo(null);
            }}
            className={`text-xs tracking-widest uppercase px-6 py-3 border transition-colors ${
              filtro === cat
                ? 'bg-brand-navy text-white border-brand-navy'
                : 'bg-white text-brand-gray-text border-brand-gray-mid hover:border-brand-navy'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grilla de proyectos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-brand-gray-mid">
        {visibles.map((proyecto, i) => (
          <button
            key={proyecto.src}
            onClick={() => setActivo(i)}
            className="group relative block aspect-[4/3] overflow-hidden bg-white"
            aria-label={`Ampliar foto: ${proyecto.titulo}`}
          >
            <Image
              src={proyecto.src}
              alt={proyecto.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Overlay con título al pasar el cursor */}
            <div className="absolute inset-0 bg-brand-navy/0 group-hover:bg-brand-navy/60 transition-colors flex items-end">
              <div className="p-5 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-brand-orange text-[11px] tracking-widest uppercase">
                  {proyecto.categoria}
                </span>
                <p className="text-white font-display text-lg leading-tight mt-1">
                  {proyecto.titulo}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {fotoActiva && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 sm:p-8"
          onClick={cerrar}
          role="dialog"
          aria-modal="true"
          aria-label={fotoActiva.titulo}
        >
          {/* Cerrar */}
          <button
            onClick={cerrar}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/80 hover:text-white p-2 z-10"
            aria-label="Cerrar"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Anterior */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              anterior();
            }}
            className="absolute left-2 sm:left-6 text-white/70 hover:text-white p-2 z-10"
            aria-label="Foto anterior"
          >
            <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Imagen + título (no cierra al hacer clic dentro) */}
          <div
            className="relative max-w-5xl w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full" style={{ height: '80vh' }}>
              <Image
                src={fotoActiva.src}
                alt={fotoActiva.alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
            <div className="text-center mt-4">
              <span className="text-brand-orange text-[11px] tracking-widest uppercase">
                {fotoActiva.categoria}
              </span>
              <p className="text-white font-display text-xl mt-1">{fotoActiva.titulo}</p>
            </div>
          </div>

          {/* Siguiente */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              siguiente();
            }}
            className="absolute right-2 sm:right-6 text-white/70 hover:text-white p-2 z-10"
            aria-label="Foto siguiente"
          >
            <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
