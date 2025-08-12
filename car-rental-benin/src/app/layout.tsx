import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "@/components/NextAuthProvider";
import Navigation from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Car Rental Bénin - Location de voitures au Bénin",
  description: "Plateforme de location de voitures au Bénin avec paiement Mobile Money. Réservez votre véhicule en ligne facilement.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <NextAuthProvider>
          <Navigation />
          <main>{children}</main>
        </NextAuthProvider>
      </body>
    </html>
  );
}
