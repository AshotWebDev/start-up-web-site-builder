// import createMiddleware from "next-intl/middleware";

// export default createMiddleware({
//   locales: ["am", "en", "ru"],
//   defaultLocale: "am",
//   localeDetection: true,
// });

// // Type-safe matcher config
// export const config = {
//   matcher: ["/", "/(am|en|ru)/:path*"],
// };

import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

// i18n config
const intlMiddleware = createMiddleware({
  locales: ["am", "en", "ru"],
  defaultLocale: "am",
  localeDetection: true,
});

// sites config → համապատասխանի hosts ֆայլին
const sites = [
  { domain: "mywedding.localhost:3000", templateId: "wedding" },
  { domain: "bestshop.localhost:3000", templateId: "shop" },
];

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  console.log("Host:", host);

  const site = sites.find((s) => s.domain === host);
  console.log(site, "555");

  if (site) {
    return NextResponse.rewrite(
      new URL(`/templates/${site.templateId}`, req.url),
    );
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/", "/(am|en|ru)/:path*"],
};
