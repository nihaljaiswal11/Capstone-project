import '../styles/globals.css';
import { Inter } from 'next/font/google';
import Header from '../components/Header';
import ApolloClientProvider from '../components/ApolloProvider';
import ThemeHydration from '../components/ThemeHydration';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-white dark:bg-black text-black dark:text-white min-h-screen transition-colors`}>
        <ThemeHydration />
        <ApolloClientProvider>
          <Header />
          <main className="max-w-3xl mx-auto w-full px-4 py-8">
            {children}
          </main>
        </ApolloClientProvider>
      </body>
    </html>
  );
} 