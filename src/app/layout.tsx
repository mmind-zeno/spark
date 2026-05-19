import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SPARK — KI Training von MMIND",
  description: "Gamifizierte KI-Trainingsplattform für das Erasmus-Programm. 5 Module, Quizzes, Badges und Zertifikat.",
  manifest: "/manifest.json",
  themeColor: "#6366F1",
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${inter.variable} h-full`}>
      <body className="min-h-dvh flex flex-col bg-[#FAFAFA]">{children}</body>
    </html>
  );
}
