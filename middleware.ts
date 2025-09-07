import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["am", "en", "ru"], 
  defaultLocale: "am",
  localeDetection: true,
});

// Type-safe matcher config
export const config = {
  matcher: ["/", "/(am|en|ru)/:path*"],
};
