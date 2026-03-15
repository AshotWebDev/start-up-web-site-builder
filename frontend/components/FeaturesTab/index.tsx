"use client";
import Image from "next/image";
import { useState } from "react";
import FeaturesTabItem from "./FeaturesTabItem";
import { getFeaturesTabs } from "./featuresTabData";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { features } from "process";

const FeaturesTab = () => {
  const [currentTab, setCurrentTab] = useState("tabOne");
  const t = useTranslations("HomePage");
  const featureTabs = getFeaturesTabs(t);

  return (
    <>
      {/* <!-- ===== Features Tab Start ===== --> */}
      <section className="relative pt-18.5 pb-20 lg:pb-22.5">
        <div className="max-w-c-1390 relative mx-auto px-4 md:px-8 2xl:px-0">
          <div className="absolute -top-16 -z-1 mx-auto h-[350px] w-[90%]">
            <Image
              fill
              className="dark:hidden"
              src="/images/shape/shape-dotted-light.svg"
              alt="Dotted Shape"
            />
            <Image
              fill
              className="hidden dark:block"
              src="/images/shape/shape-dotted-dark.svg"
              alt="Dotted Shape"
            />
          </div>

          {/* <!-- Tab Menues Start --> */}
          <motion.div
            variants={{
              hidden: {
                opacity: 0,
                y: -20,
              },

              visible: {
                opacity: 1,
                y: 0,
              },
            }}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="animate_top border-stroke shadow-solid-5 dark:border-strokedark dark:bg-blacksection dark:shadow-solid-6 mb-15 flex flex-wrap justify-center rounded-[10px] border bg-white md:flex-nowrap md:items-center lg:gap-7.5 xl:mb-21.5 xl:gap-12.5"
          >
            {featureTabs.map((feature) => (
              <div
                key={feature.tabId}
                onClick={() => setCurrentTab(feature.tabId)}
                className={`border-stroke dark:border-strokedark relative flex w-full cursor-pointer items-center gap-4 border-b px-6 py-2 last:border-0 md:w-auto md:border-0 xl:px-13.5 xl:py-5 ${
                  currentTab === feature.tabId
                    ? "active before:bg-primary before:absolute before:bottom-0 before:left-0 before:h-1 before:w-full before:rounded-tl-[4px] before:rounded-tr-[4px]"
                    : ""
                }`}
              >
                {/* Շրջանաձև համարակալում */}
                <div className="border-stroke dark:border-strokedark dark:bg-blacksection flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border">
                  <p className="text-metatitle3 leading-none font-medium text-black dark:text-white">
                    {`0${feature.id}`}
                  </p>
                </div>

                {/* Տեքստային հատված */}
                <div className="flex-1">
                  <button className="xl:text-regular text-center text-sm font-medium text-black dark:text-white">
                    {feature.title}
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
          {/* <!-- Tab Menues End --> */}

          {/* <!-- Tab Content Start --> */}
          <motion.div
            variants={{
              hidden: {
                opacity: 0,
                y: -20,
              },

              visible: {
                opacity: 1,
                y: 0,
              },
            }}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="animate_top max-w-c-1154 mx-auto"
          >
            {featureTabs.map((feature, key) => (
              <div
                className={feature.tabId === currentTab ? "block" : "hidden"}
                key={key}
              >
                <FeaturesTabItem featureTab={feature} />
              </div>
            ))}
          </motion.div>
          {/* <!-- Tab Content End --> */}
        </div>
      </section>
      {/* <!-- ===== Features Tab End ===== --> */}
    </>
  );
};

export default FeaturesTab;
