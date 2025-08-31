import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";

export default createMiddleware({
  locales: ["am", "en"],
  defaultLocale: "am",
  localeDetection: true, // detects cookies and headers
});

// Type-safe matcher config
export const config = {
  matcher: ["/", "/(am|en)/:path*"],
};
