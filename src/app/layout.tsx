import '../styles/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>Header (placeholder)</header>
        {children}
      </body>
    </html>
  );
} 