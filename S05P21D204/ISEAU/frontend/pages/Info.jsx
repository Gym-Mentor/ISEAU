import React from "react";
import Header from "../components/Header";
import Section01 from "../components/Info/Section01";
import WelcomeCard from "../components/Info/WelcomeCard";
import { ChevronDownIcon } from "@heroicons/react/solid";
import WelcomeBanner from "../components/Info/WelcomeBanner";

const Info = () => {
  return (
    <div>
      <Header />
      {/* <Section01 /> */}
      <WelcomeBanner />

      {/* 사용자 리뷰 기반 추천 설명, 거리 기반 설명 */}
      <section className="my-2 px-2 w-full overflow-hidden lg:my-2 lg:px-2 lg:w-1/2 xl:my-2 xl:px-2 xl:w-1/2">
        언제 어디서든 멋진 포인트들을 추천받으실 수 있습니다.
      </section>
      {/* 추천 관련 사진  */}
      <section className="my-2 px-2 w-full overflow-hidden lg:my-2 lg:px-2 lg:w-1/2 xl:my-2 xl:px-2 xl:w-1/2">
        사진 및 영상
      </section>
      {/* 서비스 이용 방법 */}
      <section className="my-2 px-2 w-full overflow-hidden lg:my-2 lg:px-2 lg:w-1/2 xl:my-2 xl:px-2 xl:w-1/2">
        쉽고 간편한 서비스 이용
      </section>
      {/* 사용설명 관련 사진  */}
      <section className="my-2 px-2 w-full overflow-hidden lg:my-2 lg:px-2 lg:w-1/2 xl:my-2 xl:px-2 xl:w-1/2">
        설명 사진
      </section>
      {/* 바다 관련 사진 */}
      <section className="my-2 px-2 w-full overflow-hidden lg:my-2 lg:px-2 lg:w-1/2 xl:my-2 xl:px-2 xl:w-1/2">
        바다관련 사진
      </section>
      {/* 시작하기 버튼있는 곳 */}
      <section className="my-2 px-2 w-full overflow-hidden lg:my-2 lg:px-2 lg:w-1/2 xl:my-2 xl:px-2 xl:w-1/2">
        I SEA U에서 새로운 꿈을 찾아보세요. 많은 멋진 포인트들이 당신을 기다립니다. 버튼 (시작하기)
      </section>

      <footer className="flex lg:hidden fixed bottom-0 w-full z-50 bg-white mx-auto justify-center shadow-2xl ">
        <button
          className=" w-10/12 text-white bg-blue-400 px-8 py-3 sm:py-3 shadow-md rounded-md font-bold my-8 sm:my-12 hover:shadow-xl 
         active:scale-90 transition-transform duration-200 ease-out hover:scale-105"
        >
          시작하기
        </button>
      </footer>
    </div>
  );
};

export default Info;
