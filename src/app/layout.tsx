import '../styles/globals.css';
import { Inter } from 'next/font/google';
import Header from '../components/Header';
import ThemeHydration from '../components/ThemeHydration';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-white dark:bg-black text-black dark:text-white min-h-screen transition-colors`}>
        <ThemeHydration />
        <Header />
        <main className="w-full max-w-3xl md:max-w-4xl lg:max-w-5xl mx-auto px-2 sm:px-4 md:px-6 py-4 md:py-8">
          {children}
        </main>
      </body>
    </html>
  );
} 