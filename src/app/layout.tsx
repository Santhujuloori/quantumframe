import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticlesBg from "@/components/ParticlesBg";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quantum Frame | Cinematic Stories Beyond Imagination",
  description: "Welcome to the official hub of Quantum Frame. Explore space physics mysteries, mythological legends, anime sagas, and immersive sci-fi visual journeys.",
  metadataBase: new URL("https://quantumframe.tv"),
  openGraph: {
    title: "Quantum Frame | Cinematic Stories Beyond Reality",
    description: "Explore impossible camera journeys, cosmological science fiction, ancient mythological epics, and immersive CGI visual storytelling.",
    url: "https://quantumframe.tv",
    siteName: "Quantum Frame",
    images: [
      {
        url: "https://i.ytimg.com/vi/18dZo2AMIvs/maxresdefault.jpg",
        width: 1200,
        height: 630,
        alt: "Quantum Frame Cinematic Trailer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quantum Frame | Cinematic Stories Beyond Reality",
    description: "Explore impossible camera journeys, cosmological science fiction, ancient mythological epics, and immersive CGI visual storytelling.",
    images: ["https://i.ytimg.com/vi/18dZo2AMIvs/maxresdefault.jpg"],
    creator: "@QuantumFrame",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${orbitron.variable} h-full antialiased dark`}
      style={{ scrollBehavior: "smooth" }}
    >
      <body className="min-h-full flex flex-col bg-[#020204] text-[#f3f4f6] font-sans selection:bg-neon-blue/30 selection:text-white">
        <ParticlesBg />
        <Navbar />
        <main className="flex-grow pt-16 z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
