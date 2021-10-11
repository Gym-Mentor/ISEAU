import React, { useEffect } from "react";
import Image from "next/image";
import Aos from "aos";
import "aos/dist/aos.css";

const LargeCard = ({ img, title, description, buttonText }) => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <>
      <section data-aos="fade-up" className="relative py-16 cursor-default">
        <div className="relative h-96 min-w-[300px] ">
          <Image src={img} layout="fill" objectFit="cover" className="rounded-2xl" />
        </div>

        <div className="absolute top-32 left-12">
          <h3 className="text-4xl mb-3 w-64 text-gray-100">{title}</h3>
          <p className="text-gray-100">{description}</p>
          <button className="text-sm text-white bg-gray-900 px-4 py-2 rounded-lg mt-5 cursor-default">
            {buttonText}
          </button>
        </div>
      </section>
    </>
  );
};

export default LargeCard;
