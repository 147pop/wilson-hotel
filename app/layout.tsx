import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-garamond",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wilson Hotel ★★★ — Hospedate en el corazón de Salta",
  description:
    "Hotel 3 estrellas en el centro de Salta. Alojamiento con desayuno incluido, ubicación inmejorable a pasos de la Plaza 9 de Julio. Alvarado 950, Salta.",
  keywords: "hotel salta, wilson hotel, alojamiento salta, hotel centro salta, hospedaje salta",
  openGraph: {
    title: "Wilson Hotel ★★★ — Salta, Argentina",
    description: "Hotel 3 estrellas en el corazón de Salta. Desayuno incluido, ubicación céntrica.",
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${cormorant.variable} ${montserrat.variable} font-montserrat antialiased`}>
        {children}
      </body>
    </html>
  );
}
