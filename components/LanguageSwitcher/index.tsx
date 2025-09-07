"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Languages");
  const languages = [
    { code: "am", label: t("am"), flag: "/images/icon/arm-flag.svg" },
    { code: "ru", label: t("ru"), flag: "/images/icon/rus-flag.svg" },
    { code: "en", label: t("en"), flag: "/images/icon/eng-flag.svg" },
  ];

  const current = languages.find((l) => l.code === locale) || languages[0];

  const changeLanguage = (code: string) => {
    setOpen(false);

    // Split path and replace the first segment with new locale
    const segments = pathname.split("/");
    segments[1] = code;

    router.push(segments.join("/")); // ✅ navigate to new locale path
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="border-stroke flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2"
      >
        <img
          src={current.flag}
          alt={current.label}
          className="h-[20px] w-[20px] rounded-full object-cover"
        />
        <span>{current.label}</span>
      </button>

      {open && (
        <ul className="border-stroke absolute top-14 right-0 z-50 w-full rounded-lg border bg-white shadow-lg">
          {languages
            .filter((l) => l.code !== current.code)
            .map((lang) => (
              <li key={lang.code} onClick={() => changeLanguage(lang.code)}>
                <div className="flex cursor-pointer items-center gap-2 px-4 py-2 hover:bg-gray-100">
                  <img
                    src={lang.flag}
                    alt={lang.label}
                    className="h-[20px] w-[20px] rounded-full object-cover"
                  />
                  <span className="text-[13px]">{lang.label}</span>
                </div>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
