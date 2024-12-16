import type { Metadata } from "next";
import { Cairo, Outfit } from "next/font/google";
import "./[lang]/globals.css";
import { cn } from "@/lib/utils";
import ThemeProvider from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import CanvasCursor from "@/components/cusor";
import "./css/base.css";
import "./css/embla.css";

const cairo = Cairo({ subsets: ["arabic"] });

export const metadata: Metadata = {
  title: "المركز الليبي لبحوث اللدائن",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = "ar";
  return (
    <html
      lang={lang}
      dir={lang === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <body className={cn(cairo.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <CanvasCursor />
          <Toaster />
        </ThemeProvider>{" "}
      </body>
    </html>
  );
}
