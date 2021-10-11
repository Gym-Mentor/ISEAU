import React from "react";
import Image from "next/image";
import bg from "../../img/background.gif";
import { ChevronDownIcon } from "@heroicons/react/solid";

const WelcomeBanner = () => {
  return (
    <div className="relative h-[300px] sm:h-[400px] lg:h-[100vh] xl:h-[100vh] 2xl:h-[100vh]">
      <Image src={bg} layout="fill" objectFit="cover" />
      <div className="absolute top-1/3  w-full text-center ">
        <p className="text-xl lg:text-3xl font-semibold">새로운 모험이 기다리고 있습니다</p>
        <p className="text-xl lg:text-3xl pt-5 font-semibold"> 언제나 당신과 함께합니다</p>
        <p className="text-xl lg:text-3xl pt-5 font-semibold">I SEA U</p>
        <div className="hidden lg:flex lg:pt-[360px]">
          <ChevronDownIcon className="h-10 mx-auto " />
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
