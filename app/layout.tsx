import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'SAC Planos | Arquitectura y Permisos en Santiago',
    template: '%s | SAC Planos',
  },
  description:
    'Más de 30 años elaborando planos, permisos de edificación y regularización de obras en Chile. Precisión técnica en cada proyecto.',
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    siteName: 'SAC Planos',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-white text-gray-900 font-body">
        {children}
      </body>
    </html>
  );
}
