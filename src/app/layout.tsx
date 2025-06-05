import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { SmoothScrolling } from "@/components/SmoothScrolling";
import { I18nProvider } from "@/components/I18nProvider";
import { Analytics } from "@vercel/analytics/next";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GestOS",
  description: "GestOS es una aplicación para controlar tu ordenador con gestos.",
  icons: {
    icon: "/Icono.ico",
    shortcut: "/Icono.ico",
    apple: "/Icono.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="relative">
      <body className={clsx(dmSans.className, "antialiased bg-[#EAEEFE]")}>
        <I18nProvider>
          <SmoothScrolling>
            {children}
          </SmoothScrolling>
        </I18nProvider>
        <Analytics />
      </body>
    </html>
  );
}
