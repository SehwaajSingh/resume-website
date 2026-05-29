import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SehwaajOS - Cloud & DevOps Workstation Portfolio",
  description: "An interactive, desktop-themed personal portfolio website for Sehwaaj, showcasing Cloud Engineering, DevOps pipelines, and Cybersecurity homelab architectures.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="antialiased bg-[#0c0e17] text-gray-100 overflow-hidden h-screen w-screen"
      >
        {children}
      </body>
    </html>
  );
}
