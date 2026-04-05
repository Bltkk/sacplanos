import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin — SAC Planos',
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Layout sin Navbar ni Footer para el panel admin
  return <>{children}</>;
}
