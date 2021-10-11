import React from "react";
import WelcomeCard from "./WelcomeCard";
import { ChevronDownIcon } from "@heroicons/react/solid";
import Image from "next/image";
import bg from "../../img/background.gif";
const Section01 = () => {
  return (
    <div className="bg-background bg-contain md:bg-cover bg-no-repeat w-full h-[40vh] sm:h-[50vh]  md:h-[100vh]">
      <div>
        <p className="text-xl text-center align-middle pt-[10%] md:pt-[15%] md:text-5xl font-bold">
          새로운 모험이 기다리고 있습니다
        </p>
        <p className="text-xl text-center align-middle pt-10 md:text-5xl font-bold">
          언제나 당신과 함께합니다
        </p>
        <p className="text-gray-300 md:text-black text-xl text-center align-middle pt-10 md:text-5xl font-bold">
          I SEA U
        </p>
        <p className="text-xl hidden text-center align-middle pt-10 md:text-5xl font-bold">🐳</p>
      </div>
      <div className="hidden md:flex md:pt-[50%] lg:pt-[25%] xl:pt-[15%]">
        <ChevronDownIcon className="h-10 mx-auto " />
      </div>
    </div>
  );
};

export default Section01;
