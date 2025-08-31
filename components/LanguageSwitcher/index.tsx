"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

const languages = [
  { code: "am", label: "Հայերեն", flag: "/images/icon/arm-flag.svg" },
  { code: "ru", label: "Русский", flag: "/images/icon/rus-flag.svg" },
  { code: "en", label: "English", flag: "/images/icon/eng-flag.svg" },
];

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

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
        className="flex items-center gap-2 border border-stroke py-2 px-4 rounded-full"
      >
        <img
          src={current.flag}
          alt={current.label}
          className="rounded-full w-[20px] h-[20px] object-cover"
        />
        <span>{current.label}</span>
      </button>

      {open && (
        <ul className="absolute top-14 right-0 w-full bg-white border border-stroke rounded-lg shadow-lg z-50">
          {languages
            .filter((l) => l.code !== current.code)
            .map((lang) => (
              <li key={lang.code} onClick={() => changeLanguage(lang.code)}>
                <div className="flex items-center gap-2 py-2 px-4 hover:bg-gray-100">
                  <img
                    src={lang.flag}
                    alt={lang.label}
                    className="rounded-full w-[20px] h-[20px] object-cover"
                  />
                  <span>{lang.label}</span>
                </div>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
