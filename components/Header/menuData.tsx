import { useState, useEffect } from "react";
import { Menu } from "@/types/menu";
import { useLocale, useTranslations } from "next-intl";

const useMenuData = () => {
  const t = useTranslations("HeaderMenu")
  const locale = useLocale();
  
  const menuData: Menu[] = [
      {
        id: 1,
        title: t("home"),
        newTab: false,
        path: `/${locale}/`,
      },
      {
        id: 2,
        title: t("templates"),
        newTab: false,
        path: `/${locale}/templates`,
      },
      {
        id: 2.1,
        title: t("plans"),
        newTab: false,
        path: `/${locale}/plans`,
      },
      {
        id: 2.3,
        title: t("about"),
        newTab: false,
        path: `/${locale}/about`,
      },
      {
        id: 2.4,
        title: t("contact"),
        newTab: false,
        path: `/${locale}/contact`,
      },
    ]

  return menuData;
};

export default useMenuData;
