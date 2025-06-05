import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { SmoothScrolling } from "@/components/SmoothScrolling";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GestOS",
  description: "GestOS es una plataforma de gestión de proyectos y tareas que te permite organizar tu trabajo de manera eficiente.",
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
        <SmoothScrolling>
          {children}
        </SmoothScrolling>
      </body>
    </html>
  );
}
