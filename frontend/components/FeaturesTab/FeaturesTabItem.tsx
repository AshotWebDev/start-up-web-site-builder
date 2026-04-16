import React from "react";
import { FeatureTab } from "@/types/featureTab";
import Image from "next/image";

const FeaturesTabItem = ({ featureTab }: { featureTab: FeatureTab }) => {
  const { subTitle, description, img, illustrationText } = featureTab;

  return (
    <>
      <div className="flex items-center gap-8 lg:gap-19">
        <div className="md:w-1/2">
          <h2 className="xl:text-sectiontitle2 mb-7 text-3xl font-bold text-black dark:text-white">
            {subTitle}
          </h2>
          {/* <p className="mb-5">{}</p> */}
          <p className="w-11/12">{description}</p>
        </div>
        <div className="relative mx-auto hidden aspect-562/366 max-w-[550px] md:block md:w-1/2">
          <Image
            src={img}
            alt={illustrationText || ""}
            fill
            className="object-contain"
          />
        </div>
      </div>
    </>
  );
};

export default FeaturesTabItem;
