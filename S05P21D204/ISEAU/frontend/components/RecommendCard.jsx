import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/dist/client/router";
import axios from "axios";

import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import img from "../img/loc.jpeg";
import * as detailPointActions from "../store/modules/detailPoint";

const RecommendCard = ({ id, fishingimg, pointName, address, rating, category }) => {
  const router = useRouter();
  const detailPoint = async () => {
    const response = await axios.get("http://j5d204.p.ssafy.io:8000/fishing/" + id);
    setDetailPoint(response.data[0]);
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
      className="sm:w-[372px] cursor-pointer hover:opacity-70 hover:shadow-lg transition duration-300 ease-out"
      onClick={detailPoint}
    >
      <div className="relative h-80 w-[372px]">
        <Image
          // fishingimg === 낫파운드면, 낫파운드 이미지 보여주고, 그게 아닐경우에 fhishingimg === REF!면
          src={
            fishingimg === "../img/imgnotfound.png"
              ? `/assets/img/imgnotfound.png`
              : `/assets/img/${id}.png`
          }
          layout="fill"
          className="rounded-xl"
        />
      </div>
      <div className="mt-2">
        <p className="text-sm font-bold text-blue-500 ">[{category === 0 ? "선상" : "갯바위"}]</p>
      </div>
      <div className="flex justify-between mt-1">
        <h3 className="text-1xl font-bold">
          [{address}] {pointName}
        </h3>
        <p className="flex items-center ">
          <StarIcon className="h-4 text-red-400" />
          {rating}
        </p>
      </div>
      {/* <div className="flex justify-between">
        <p className="pt-1 text-sm text-gray-500 ">어종 : {description.fish}</p>
      </div> */}
    </div>
  );
};

export default RecommendCard;
