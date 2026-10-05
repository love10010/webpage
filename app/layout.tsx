import type { Metadata } from "next";
import { Epilogue, Noto_Sans } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/context/LanguageContext";
import { AuthProvider } from "@/lib/context/AuthContext";
import AppShell from "@/components/AppShell";

const epilogue = Epilogue({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-epilogue",
  display: "swap",
});

const notoSans = Noto_Sans({
  subsets: ["latin", "devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Smart Mango Farm Portal | AgriGrove Konkan Hapus",
  description:
    "Enterprise precision agriculture portal for Ratnagiri GI-tagged Alphonso and Kesar mango orchards. Real-time telemetry, labor hiring, machinery rental, and automated harvest tracking.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${epilogue.variable} ${notoSans.variable} h-full antialiased`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-surface font-body-md text-on-surface">
        <LanguageProvider>
          <AuthProvider>
            <AppShell>{children}</AppShell>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
