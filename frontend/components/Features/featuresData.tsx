import { useTranslations } from "next-intl";
import { Feature } from "@/types/feature";

const useFeaturesData = (): Feature[] => {
  const t = useTranslations("HomePage.ourFeatures");

  const featuresData: Feature[] = [
    {
      id: 1,
      icon: "/images/icon/templates.svg",
      title: t("features.0.title"),
      description: t("features.0.description"),
    },
    {
      id: 2,
      icon: "/images/icon/subscription.svg",
      title: t("features.1.title"),
      description: t("features.1.description"),
    },
    {
      id: 3,
      icon: "/images/icon/dashboard.svg",
      title: t("features.2.title"),
      description: t("features.2.description"),
    },
    {
      id: 4,
      icon: "/images/icon/customize.svg",
      title: t("features.3.title"),
      description: t("features.3.description"),
    },
    {
      id: 5,
      icon: "/images/icon/preferences.svg",
      title: t("features.4.title"),
      description: t("features.4.description"),
    },
    {
      id: 6,
      icon: "/images/icon/icon-06.svg",
      title: t("features.5.title"),
      description: t("features.5.description"),
    },
  ];

  return featuresData;
};

export default useFeaturesData;
