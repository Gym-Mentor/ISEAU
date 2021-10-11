import React, { useEffect, useCallback, useState } from "react";
import Image from "next/image";
import { HeartIcon } from "@heroicons/react/outline";
import { StarIcon } from "@heroicons/react/solid";
import { useRouter } from "next/dist/client/router";
import { useSelector, useDispatch } from "react-redux";
import * as detailPointActions from "../store/modules/detailPoint";
import axios from "axios";
import notimg from "../img/imgnotfound.png";
import Aos from "aos";
import "aos/dist/aos.css";

const ResultCard = ({ id }) => {
  const [resultObj, setResultObj] = useState(null);

  const router = useRouter();

  useEffect(async () => {
    Aos.init({ duration: 2000 });
    const response = await axios.get("http://j5d204.p.ssafy.io:8000/fishing/" + id);

    setResultObj(response.data[0]);
  }, []);

  const detailPoint = () => {
    setDetailPoint(resultObj);
    router.push({
      pathname: "/DetailPoint",
    });
  };
  // id값으로 detailpoint 상태값 저장
  const dispatch = useDispatch();
  const setDetailPoint = useCallback(
    (value) => {
      dispatch(detailPointActions.setDetailPoint(value));
    },
    [dispatch]
  );
  return (
    <div
      data-aos="fade-up"
      className="flex py-7 px-2 pr-4 border-b cursor-pointer
    hover:opacity-80 hover:shadow-lg transition duration-200 ease-out
    first:border-t 
    "
      onClick={detailPoint}
    >
      {/* 사진 부분 */}
      <div className="relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0">
        <Image
          src={
            resultObj && resultObj.fishingImg === "../img/imgnotfound.png"
              ? `/assets/img/imgnotfound.png`
              : `/assets/img/${resultObj && resultObj.id}.png`
          }
          // src={notimg}
          layout="fill"
          objectFit="cover"
          className="rounded-2xl"
        />
      </div>
      {/* 설명 부분 */}
      <div className="flex flex-col flex-grow pl-5">
        <div className="flex justify-between">
          <p>
            [{resultObj && resultObj.name}] {resultObj && resultObj.address}
          </p>
          {/* <HeartIcon className="h-7 cursor-pointer" /> */}
        </div>
        <h4 className="text-xl">
          {resultObj && resultObj.pointName} ({resultObj && resultObj.category === 0 ? "⛵️" : "🪨"})
        </h4>
        <div className="border-b w-10 pt-2" />
        <p className="pt-5 text-sm text-gray-500 flex-grow">어종 : {resultObj && resultObj.fish}</p>
        {/* <p className="pt-2 text-sm text-gray-500 flex-grow">
          적정 물때 : {resultObj && resultObj.tide}
        </p> */}
        <p className="pt-2 text-sm text-gray-500 flex-grow">
          수심 : {resultObj && resultObj.dpwt}m / 지면 : {resultObj && resultObj.material}
        </p>

        <div className="flex justify-between items-end pt-5">
          <p className="flex items-center">
            <StarIcon className="h-4 text-red-400" />
            {resultObj && resultObj.rating}
            <p className="pl-2 text-sm text-gray-500">
              ({resultObj && resultObj.reviewCnt}개의 리뷰)
            </p>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
