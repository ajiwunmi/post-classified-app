// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import ClientSessionProvider from '@/app/context/ClientSessionProvider';

export const metadata: Metadata = {
  title: 'TeorClassifieds',
  description: 'Marketplace styled like Teor UI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <ClientSessionProvider>{children}</ClientSessionProvider>
      </body>
    </html>
  );
}
