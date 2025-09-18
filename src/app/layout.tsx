import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ratnakaru Yalagathala",
  description:
    "Aerospace × Blockchain × AI — pioneering systems that are fast, intelligent, and built to last.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <body
        className={`${inter.className} bg-black text-zinc-200 antialiased`}
        style={{ backgroundColor: "#000", color: "#e4e4e7" }}
      >
        {children}
      </body>
    </html>
  );
}
