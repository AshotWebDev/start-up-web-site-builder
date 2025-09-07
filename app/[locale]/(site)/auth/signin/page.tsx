import Signin from "@/components/Auth/Signin";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "LoginPage" });

  return {
    title: t("metaData.title"),
    description: t("metaData.description"),
  };
}

const SigninPage = () => {
  return <Signin />;
};

export default SigninPage;
