import './globals.css';
import type { Metadata } from 'next';
import { Roboto_Slab } from 'next/font/google';
import { PatientProvider } from '@/contexts/PatientContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import PageTransition from '@/components/PageTransition';

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
    <html lang="fr" suppressHydrationWarning>
      <body className={`${robotoSlab.className} transition-colors duration-300 bg-[#a3c6e0] dark:bg-gray-900`}>
        <ThemeProvider>
          <PatientProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <div className="flex-1">
                <Sidebar />
                <main className="flex-1 ml-72 p-6">
                  <PageTransition>
                    {children}
                  </PageTransition>
                </main>
              </div>
            </div>
          </PatientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}