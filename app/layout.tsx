import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'CEO Institute | EduPreneurX - World\'s First Revolutionary Programs & CEO Institute',
  description: 'Transform your entrepreneurial journey with EduPreneurX\'s revolutionary programs. Join the world\'s first CEO Institute offering GEEP, IEEP, GBLP, EIP, and ERBP programs.',
  keywords: 'CEO Institute, EduPreneurX, entrepreneurship programs, GEEP, IEEP, GBLP, business leadership',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
