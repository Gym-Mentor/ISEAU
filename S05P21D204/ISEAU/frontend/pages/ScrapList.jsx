import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Banner from "../components/Banner";
import { useSelector } from "react-redux";
import RecommendCard from "../components/RecommendCard";

const ScrapList = () => {
  const user = useSelector(({ user }) => user);
  const [scrapList, setScrapList] = useState();
  const getScrapList = async () => {
    await axios({
      url: "http://j5d204.p.ssafy.io:8000/fishing/scrap/list/" + user.id,
      dataType: "json",
      method: "GET",
    })
      .then((response) => {
        if (response.data === "") return;
        setScrapList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getScrapList();
  }, []);
  return (
    <div>
      <Header />

      <main className="max-w-7xl mx-auto px-8 pt-8 sm:px-16 mb-16">
        <section className="pt-5">
          <div className="flex flex-wrap -mx-1 overflow-hidden md:-mx-2 lg:-mx-4 xl:-mx-2">
            {scrapList !== undefined
              ? scrapList?.map(({ id, fishingImg, pointname, address, rating, category }) => (
                  <div className="my-5 px-9 w-full overflow-hidden md:my-2 md:px-2 md:w-1/2 lg:my-4 lg:px-4 lg:w-1/2 xl:my-2 xl:px-2 xl:w-1/3">
                    <RecommendCard
                      key={id}
                      id={id}
                      fishingimg={fishingImg}
                      pointname={pointname}
                      address={address}
                      rating={rating}
                      category={category}
                    />
                  </div>
                ))
              : false}
          </div>
          {scrapList == undefined ? (
            <h1 className="font-bold text-center text-lg my-10 ">저장된 낚시 포인트가 없습니다</h1>
          ) : (
            false
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ScrapList;
