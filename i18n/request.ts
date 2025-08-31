import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

// Explicitly type supported locales
export const locales = ["am", "en"] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  const resolvedLocale: string = (await requestLocale) || "am"; // ✅ await is necessary

  const locale: Locale = locales.includes(resolvedLocale as Locale)
    ? (resolvedLocale as Locale)
    : "am";

  if (!locales.includes(locale)) {
    notFound();
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
