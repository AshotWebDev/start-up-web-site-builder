import { Testimonial } from "@/types/testimonial";
import Image from "next/image";

const SingleTestimonial = ({ review }: { review: Testimonial }) => {
  const { name, designation, image, content } = review;
  return (
    <div className="shadow-solid-9 dark:border-strokedark dark:bg-blacksection rounded-lg bg-white p-9 pt-7.5 dark:border dark:shadow-none">
      <div className="border-stroke dark:border-strokedark mb-7.5 flex justify-between border-b pb-6">
        <div>
          <h3 className="text-metatitle3 mb-1.5 text-black dark:text-white">
            {name}
          </h3>
          <p>{designation}</p>
        </div>
        <Image width={60} height={50} className="" src={image} alt={name} />
      </div>

      <p>{content}</p>
    </div>
  );
};

export default SingleTestimonial;
