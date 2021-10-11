import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import axios from "axios";
import { useSelector } from "react-redux";
const MediumCard = ({ img, title }) => {
  const router = useRouter();

  const [titleCategory, setTitleCategory] = useState(4);
  const uid = useSelector((state) => state.user.id);

  useEffect(() => {
    if (title === "모두 보기") setTitleCategory(2);
    if (title === "갯바위 낚시") setTitleCategory(1);
    if (title === "선상 낚시") setTitleCategory(0);
  }, [titleCategory]);

  const goLogin = () => {
    alert("로그인이 필요한 서비스입니다.");
    router.push({
      pathname: "/Login",
    });
  };

  const select = () => {
    {
      uid == -1
        ? goLogin()
        : router.push({
            pathname: "/RecommendCategory",
            query: {
              category: titleCategory,
            },
          });
    }
  };

  return (
    <div
      className="cursor-pointer hover:scale-105 transform transition duration-300 ease-out"
      onClick={select}
    >
      <div className="relative h-80 w-[372px]">
        <Image src={img} layout="fill" className="rounded-xl" />
      </div>
      <h3 className="mt-3 text-1xl">{title}</h3>
    </div>
  );
};

export default MediumCard;
