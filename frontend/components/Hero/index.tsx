"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

const Hero = () => {
  const t = useTranslations();


  return (
    <section className="overflow-hidden pb-20 pt-35 md:pt-40 xl:pb-25 xl:pt-46">
      <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-8 xl:gap-32.5">
          {/* Տեքստային հատված */}
          <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
            <h1 className="mb-5 pr-0 lg:pr-16 text-3xl font-bold text-black dark:text-white">
              {t("HomePage.banner.title")}
            </h1>
            <p>{t("HomePage.banner.description")}</p>

            <div className="mt-10">
                <div className="flex flex-wrap gap-5">
                  <button
                    aria-label="get started button"
                    className="flex rounded-full bg-black px-7.5 py-2.5 text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark dark:hover:bg-blackho cursor-pointer"
                  >
                    {t("buttons.7")}
                  </button>
                </div>
            </div>
          </div>

          {/* Նկարի հատված */}
          <div className="w-full lg:w-1/2 animate_right">
            <div className="relative 2xl:-mr-7.5">
              <div className="relative aspect-700/444 w-full">
                <Image
                  src="/images/hero/home-page-banner-img.png"
                  alt={t("HomePage.banner.illustrationText")}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
