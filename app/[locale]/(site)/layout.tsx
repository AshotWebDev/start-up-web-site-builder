// "use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Lines from "@/components/Lines";
import ScrollToTop from "@/components/ScrollToTop";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import "../../globals.css";
const inter = Inter({ subsets: ["latin"] });

import ToasterContext from "../../context/ToastContext";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import ThemeProviderClient from "@/components/ThemeProviderClient";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {

  const { locale } = await params;
  const messages = await getMessages({ locale });
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`dark:bg-black ${inter.className}`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
        <ThemeProviderClient>
          {/* <Lines /> */}
          <Header />
          <ToasterContext />
          {children}
          <Footer />
          <ScrollToTop />
        </ThemeProviderClient>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
