import Signup from "@/components/Auth/Signup";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'RegisterPage' });

  return {
    title: t('metaData.title'),
    description: t('metaData.description'),
  };
}

export default function Register() {
  return (
    <>
      <Signup />
    </>
  );
}
