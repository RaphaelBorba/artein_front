import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import { Toaster } from "@/components/ui/toaster";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gestão de Clientes",
  description: "Gestão de Clientes",
  openGraph: {
    title: "Gestão de Clientes",
    description: "Gestão de Clientes",
    url: "/",
    type: "website",
    locale: "pt_BR",
    images: [
      {
        url: "/logo.jpeg",
        width: 1200,
        height: 630,
        alt: "Gestão de Clientes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/logo.jpeg"],
  },
  icons: {
    icon: "/logo.jpeg",
    apple: "/logo.jpeg",
    shortcut: "/logo.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pt-BR' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} overflow-y-auto overflow-x-hidden bg-geral-background text-muted antialiased`}
      >
        <Toaster />
        {children}
      </body>
    </html>
  );
}
