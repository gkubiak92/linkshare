import createMiddleware from "next-intl/middleware";
import { localePrefix } from "@/i18n/navigation";
import { locales } from "@/i18n/i18n";

export default createMiddleware({
  locales,
  localePrefix,
  defaultLocale: "en",
});

export const config = {
  matcher: [
    "/",
    `/(en|pl)/:path*`,
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
