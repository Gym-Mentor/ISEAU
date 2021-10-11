import React from "react";
import Image from "next/image";
import wallpaper from "../img/fisherman.jpg";
const Banner = () => {
  return (
    <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[750px]">
      <Image src={wallpaper} layout="fill" objectFit="cover" />
      <div className="absolute top-1/3 sm:top-1/2 w-full text-center ">
        <p className="text-md sm:text-xl font-semibold">언제든지, 바다가 당신을 기다립니다 !</p>
        <button
          className="text-blue-400 bg-white px-8 py-2 sm:py-3 shadow-md rounded-full font-bold my-8 sm:my-12 hover:shadow-xl 
         active:scale-90 transition-transform duration-200 ease-out hover:scale-105
        "
        >
          I SEA U
        </button>
      </div>
    </div>
  );
};

export default Banner;
