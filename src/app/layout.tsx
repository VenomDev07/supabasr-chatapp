import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import { AuthProvider } from "@/component/AuthProvider";


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Chat Application',
  description: 'A modern chat application built with Next.js, TypeScript, Tailwind CSS, and Supabase',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-full m-0 p-0`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
