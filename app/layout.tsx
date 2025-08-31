import './globals.css';
import type { Metadata } from 'next';
import { Roboto_Slab } from 'next/font/google';
import { PatientProvider } from '@/contexts/PatientContext';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

const robotoSlab = Roboto_Slab({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MediCare - Portail Patient',
  description: 'Carnet de suivi médical digitalisé',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${robotoSlab.className}`}>
        <PatientProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <div className=" flex-1">
              <Sidebar />
              <main className="flex-1 ml-64 p-6">
                {children}
              </main>
            </div>
          </div>
        </PatientProvider>
      </body>
    </html>
  );
}