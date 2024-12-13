import type { Metadata } from "next";
import { Cairo, Outfit } from "next/font/google";
import "./globals.css";
import { i18n } from "@/i18n-config";
import { cn } from "@/lib/utils";

const outfit = Outfit({ subsets: ["latin"] });
const cairo = Cairo({ subsets: ["arabic"] });

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{
    lang: string;
  }>;
}>) {
  const lang = (await params).lang;
  return (
    <html lang="en">
      <body
        className={cn(
          lang === "ar" ? cairo.className : outfit.className,
          "relative"
        )}
      >
        {children}
      </body>
    </html>
  );
}
