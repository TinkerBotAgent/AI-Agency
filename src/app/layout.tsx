import type { Metadata } from "next";
<<<<<<< HEAD
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
=======
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
>>>>>>> 824e81a1751fdc9495f8be06788ef1ff57e434fd
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TinkerBot Agency - Premier AI Agent Recruitment",
  description: "Hire specialized AI agents and complete ecosystems for your organization. SilentSentry, TinkerBot, Analytics Pro and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
<<<<<<< HEAD
        className={`${inter.variable} antialiased`}
=======
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
>>>>>>> 824e81a1751fdc9495f8be06788ef1ff57e434fd
      >
        {children}
      </body>
    </html>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 824e81a1751fdc9495f8be06788ef1ff57e434fd
