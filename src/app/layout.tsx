import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SPARK — KI Training von MMIND",
  description: "Gamifizierte KI-Trainingsplattform für das Erasmus-Programm. 5 Module, Quizzes, Badges und Zertifikat.",
  manifest: "/manifest.json",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? "https://spark.mmind.space"),
  openGraph: {
    title: "SPARK — KI Training mit Zertifikat",
    description: "5 KI-Module, Quizzes, Badges und offizielles Zertifikat. Kostenlos, ohne Login.",
    url: "https://spark.mmind.space",
    siteName: "SPARK",
    locale: "de_CH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SPARK — KI Training von MMIND",
    description: "Gamifizierte KI-Trainingsplattform für das Erasmus-Programm.",
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#6366F1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${inter.variable} h-full`}>
      <body className="min-h-dvh flex flex-col bg-[#FAFAFA]">
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  );
}
