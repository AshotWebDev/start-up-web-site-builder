"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import FAQItem from "./FAQItem";
import { useTranslations } from "next-intl";
import { getFAQs } from "./faqData";

const FAQ = () => {
  const [activeFaq, setActiveFaq] = useState(1);
  const t = useTranslations("HomePage");
  const faqs = getFAQs(t);
  const handleFaqToggle = (id: number) => {
    activeFaq === id ? setActiveFaq(0) : setActiveFaq(id);
  };

  return (
    <>
      {/* <!-- ===== FAQ Start ===== --> */}
      <section className="overflow-hidden pb-20 lg:pb-25 xl:pb-30">
        <div className="relative mx-auto max-w-c-1235 px-4 md:px-8 xl:px-0">
          <div className="absolute -bottom-16 -z-1 h-full w-full">
            <Image
              fill
              src="/images/shape/shape-dotted-light.svg"
              alt="Dotted"
              className="dark:hidden"
            />
            <Image
              fill
              src="/images/shape/shape-dotted-light.svg"
              alt="Dotted"
              className="hidden dark:block"
            />
          </div>
          <div className="flex flex-col gap-8 md:flex-nowrap items-center">
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  x: -20,
                },

                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_left w-full"
            >
              {/* <span className="font-medium uppercase text-black dark:text-white">
                OUR FAQS
              </span> */}
              <h2 className="relative mb-6 text-3xl text-center font-bold text-black dark:text-white ">
                {t("frequentlyAskedQuestions.title")}
              </h2>

            </motion.div>

            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  x: 20,
                },

                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_right w-full"
            >
              <div className="rounded-lg bg-white shadow-solid-8 dark:border dark:border-strokedark dark:bg-blacksection">
                {faqs.map((faq, key) => (
                  <FAQItem
                    key={key}
                    faqData={{ ...faq, activeFaq, handleFaqToggle }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* <!-- ===== FAQ End ===== --> */}
    </>
  );
};

export default FAQ;
