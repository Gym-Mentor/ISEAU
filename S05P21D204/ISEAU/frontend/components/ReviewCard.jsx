import React from "react";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import { Avatar } from "@material-ui/core";
import StarRatingComponent from "react-star-rating-component";

const ReviewCard = ({ img, username, nickname, rating, date, desc }) => {
  return (
    <div className="my-2 cursor-pointer hover:scale-105 transform transition duration-300 ease-out border-solid border-4 rounded-2xl p-2  ">
      <div className="flex flex-row  w-[350px]">
        <Avatar className="post-avatar" src={img} />
        <p className="grid-rows-2">
          <p className="pl-2 text-sm ">{nickname}</p>
          <p className="pl-2 text-sm ">
            {date.slice(0, 4)}년 {date.slice(5, 7)}월 {date.slice(8, 10)}일
          </p>
          <StarRatingComponent name="rate1" starCount={5} value={rating} />
        </p>
      </div>
      <p className=" pl-2 text-sm line-clamp-3">{desc}</p>
    </div>
  );
};

export default ReviewCard;
