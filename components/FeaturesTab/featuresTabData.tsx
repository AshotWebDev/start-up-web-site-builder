// featuresTabs.js
export const getFeaturesTabs = (t) => [
  {
    id: '1',
    tabId: 'tabOne',
    title: t("featuresTabSection.tabs.tab1.title"),
    subTitle: t("featuresTabSection.tabs.tab1.subTitle"),
    description: t("featuresTabSection.tabs.tab1.description"),
    img: "/images/features/featuresTab1Img.png",
    illustrationText: t("featuresTabSection.tabs.tab1.illustrationText"),
  },
  {
    id: '2',
    tabId: 'tabTwo',
    title: t("featuresTabSection.tabs.tab2.title"),
    subTitle: t("featuresTabSection.tabs.tab2.subTitle"),
    description: t("featuresTabSection.tabs.tab2.description"),
    img: "/images/features/featuresTab2Img.png",
    illustrationText: t("featuresTabSection.tabs.tab2.illustrationText"),
  },
  {
    id: '3',
    tabId: 'tabThree',
    title: t("featuresTabSection.tabs.tab3.title"),
    subTitle: t("featuresTabSection.tabs.tab3.subTitle"),
    description: t("featuresTabSection.tabs.tab3.description"),
    img: "/images/features/featuresTab3Img.png",
    illustrationText: t("featuresTabSection.tabs.tab3.illustrationText"),
  },
];
