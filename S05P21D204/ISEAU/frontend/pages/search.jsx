import axios from "axios";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Map from "../components/Map";
import ResultCard from "../components/ResultCard";
import fishingData from "../dummy/json/fishingDump.json";

const Search = () => {
  const [searchData, setSearchData] = useState({
    point: [],
  });
  const router = useRouter();

  const { location } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://j5d204.p.ssafy.io:8000/fishing/search/" + location);
      setSearchData({
        point: response.data,
      });
    };
    fetchData();
  }, []);

  return (
    <div>
      <Header placeholder={`${location}`} />

      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <h1 className="text-3xl font-semibold mt-2 mb-6">{location}의 검색 결과</h1>
          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            {/* <p className="button">어종</p>
            <p className="button">도구</p>
            <p className="button">물때</p> */}
          </div>

          <div className="flex flex-col">
            {searchData.point?.map(({ id }) => (
              <ResultCard key={id} id={id} />
            ))}
          </div>
        </section>
        {/* 우측 지도 부분 */}
        <section className="hidden xl:inline-flex xl:min-w-[800px]">
          {searchData && <Map searchData={searchData} />}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Search;
