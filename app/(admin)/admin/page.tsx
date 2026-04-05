'use client';

import { useState, useEffect, useCallback } from 'react';

interface ContactRecord {
  id: string;
  nombre: string;
  email: string;
  telefono?: string;
  proyecto: string;
  mensaje: string;
  fecha: string;
  leido: boolean;
  respondido: boolean;
}

interface ApiResponse {
  contactos: ContactRecord[];
  total: number;
  noLeidos: number;
  sinResponder: number;
}

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const fetchContactos = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/contactos', {
        headers: { Authorization: `Bearer ${password}` },
      });

      if (!res.ok) {
        if (res.status === 401) {
          setIsLoggedIn(false);
          setError('Contraseña incorrecta');
          return;
        }
        throw new Error('Error al cargar');
      }

      const json: ApiResponse = await res.json();
      setData(json);
      setError('');
    } catch {
      setError('Error al cargar los contactos');
    } finally {
      setLoading(false);
    }
  }, [password]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchContactos();
    }
  }, [isLoggedIn, fetchContactos]);

  // Iniciar sesión
  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setIsLoggedIn(true);
  }

  // Marcar como leído
  async function handleMarcarLeido(id: string) {
    await fetch('/api/admin/contactos', {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${password}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, accion: 'leido' }),
    });
    fetchContactos();
  }

  // Eliminar contacto con confirmación
  async function handleEliminar(id: string, nombre: string) {
    if (!confirm(`¿Eliminar la cotización de "${nombre}"? Esta acción no se puede deshacer.`)) return;

    await fetch('/api/admin/contactos', {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${password}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    setSelectedId(null);
    fetchContactos();
  }

  // Cambiar estado respondido / no respondido
  async function handleToggleRespondido(id: string) {
    await fetch('/api/admin/contactos', {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${password}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, accion: 'respondido' }),
    });
    fetchContactos();
  }

  // Descargar CSV
  async function handleDescargarCSV() {
    const res = await fetch('/api/admin/contactos/csv', {
      headers: { Authorization: `Bearer ${password}` },
    });

    if (!res.ok) return;

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contactos-sacplanos-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // Formatear fecha a formato chileno
  function formatFecha(iso: string) {
    return new Date(iso).toLocaleString('es-CL', {
      timeZone: 'America/Santiago',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  // Pantalla de login
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-brand-gray-light flex items-center justify-center p-4">
        <div className="bg-white border border-brand-gray-mid p-8 w-full max-w-sm">
          <h1 className="font-display text-2xl text-brand-navy mb-2">
            Panel de Administración
          </h1>
          <p className="text-brand-gray-text text-sm mb-6">
            Ingresa la contraseña para ver los contactos recibidos.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm text-gray-700 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-brand-gray-mid px-4 py-3 text-sm focus:outline-none focus:border-brand-navy"
                placeholder="Ingresa la contraseña"
                required
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
            <button
              type="submit"
              className="w-full bg-brand-navy text-white text-xs tracking-widest uppercase px-6 py-3 hover:bg-brand-blue transition-colors"
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Panel principal
  const selected = data?.contactos.find((c) => c.id === selectedId);

  return (
    <div className="min-h-screen bg-brand-gray-light">
      {/* Header admin */}
      <div className="bg-brand-navy text-white px-4 sm:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl">SAC Planos — Contactos</h1>
          {data && (
            <p className="text-white/60 text-xs mt-1">
              {data.total} total · {data.noLeidos} sin leer · {data.sinResponder} sin responder
            </p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleDescargarCSV}
            className="bg-brand-orange text-white text-xs tracking-widest uppercase px-4 py-2 hover:bg-[#c55a00] transition-colors"
          >
            Descargar Excel
          </button>
          <button
            onClick={fetchContactos}
            disabled={loading}
            className="border border-white/30 text-white text-xs tracking-widest uppercase px-4 py-2 hover:bg-white/10 transition-colors disabled:opacity-50"
          >
            {loading ? 'Cargando...' : 'Actualizar'}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 p-4 text-red-700 text-sm mb-6">
            {error}
          </div>
        )}

        {!data || data.contactos.length === 0 ? (
          <div className="bg-white border border-brand-gray-mid p-12 text-center">
            <svg className="w-16 h-16 mx-auto text-brand-gray-mid mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h2 className="font-display text-xl text-gray-900 mb-2">
              No hay contactos aún
            </h2>
            <p className="text-brand-gray-text text-sm">
              Los mensajes del formulario de contacto aparecerán aquí.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Lista de contactos */}
            <div className="lg:col-span-1 space-y-2 max-h-[75vh] overflow-y-auto">
              {data.contactos.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setSelectedId(c.id);
                    if (!c.leido) handleMarcarLeido(c.id);
                  }}
                  className={`w-full text-left p-4 border transition-colors ${
                    selectedId === c.id
                      ? 'bg-brand-navy text-white border-brand-navy'
                      : c.leido
                        ? 'bg-white border-brand-gray-mid hover:bg-brand-gray-light'
                        : 'bg-white border-brand-orange hover:bg-orange-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-sm font-medium ${selectedId === c.id ? 'text-white' : 'text-gray-900'}`}>
                      {c.nombre}
                    </span>
                    <div className="flex items-center gap-2 shrink-0">
                      {c.respondido && (
                        <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                          selectedId === c.id ? 'bg-green-400/30 text-green-200' : 'bg-green-100 text-green-600'
                        }`}>
                          Respondido
                        </span>
                      )}
                      {!c.leido && selectedId !== c.id && (
                        <span className="w-2 h-2 bg-brand-orange rounded-full" />
                      )}
                    </div>
                  </div>
                  <p className={`text-xs truncate ${selectedId === c.id ? 'text-white/70' : 'text-brand-gray-text'}`}>
                    {c.proyecto}
                  </p>
                  <p className={`text-xs mt-1 ${selectedId === c.id ? 'text-white/50' : 'text-brand-gray-text/60'}`}>
                    {formatFecha(c.fecha)}
                  </p>
                </button>
              ))}
            </div>

            {/* Detalle del contacto */}
            <div className="lg:col-span-2">
              {selected ? (
                <div className="bg-white border border-brand-gray-mid p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="font-display text-2xl text-gray-900">
                        {selected.nombre}
                      </h2>
                      <p className="text-brand-gray-text text-sm mt-1">
                        {formatFecha(selected.fecha)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-3 py-1 ${selected.leido ? 'bg-blue-50 text-blue-600' : 'bg-orange-100 text-orange-700'}`}>
                        {selected.leido ? 'Leído' : 'Nuevo'}
                      </span>
                      <span className={`text-xs px-3 py-1 ${selected.respondido ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-600'}`}>
                        {selected.respondido ? 'Respondido' : 'Sin responder'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                    <div>
                      <label className="text-xs text-brand-gray-text uppercase tracking-wider">Email</label>
                      <p className="text-sm text-gray-900 mt-1">
                        <a href={`mailto:${selected.email}`} className="text-brand-blue hover:underline">
                          {selected.email}
                        </a>
                      </p>
                    </div>
                    <div>
                      <label className="text-xs text-brand-gray-text uppercase tracking-wider">Teléfono</label>
                      <p className="text-sm text-gray-900 mt-1">
                        {selected.telefono || 'No indicado'}
                      </p>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-xs text-brand-gray-text uppercase tracking-wider">Tipo de proyecto</label>
                      <p className="text-sm text-gray-900 mt-1">{selected.proyecto}</p>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-brand-gray-text uppercase tracking-wider">Mensaje</label>
                    <div className="mt-2 p-4 bg-brand-gray-light text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {selected.mensaje}
                    </div>
                  </div>

                  {/* Acciones */}
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.proyecto)} - SAC Planos`}
                      className="bg-brand-navy text-white text-xs tracking-widest uppercase px-6 py-3 hover:bg-brand-blue transition-colors"
                    >
                      Responder por Email
                    </a>
                    <button
                      onClick={() => handleToggleRespondido(selected.id)}
                      className={`text-xs tracking-widest uppercase px-6 py-3 transition-colors border ${
                        selected.respondido
                          ? 'bg-green-100 border-green-300 text-green-700 hover:bg-green-200'
                          : 'bg-white border-red-300 text-red-600 hover:bg-red-50'
                      }`}
                    >
                      {selected.respondido ? '✓ Marcado como respondido' : 'Marcar como respondido'}
                    </button>
                    <button
                      onClick={() => handleEliminar(selected.id, selected.nombre)}
                      className="text-xs tracking-widest uppercase px-6 py-3 border border-gray-300 text-gray-400 hover:bg-red-50 hover:border-red-400 hover:text-red-600 transition-colors ml-auto"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white border border-brand-gray-mid p-12 text-center text-brand-gray-text">
                  <p>Selecciona un contacto para ver los detalles</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
