import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import logo from "../img/logo.png";
import { SearchIcon, GlobeAltIcon, UsersIcon, UserIcon } from "@heroicons/react/solid";
import { useRouter } from "next/dist/client/router";
//dropdown menu
import DropdownMenu from "./DropdownMenu";
import { ChevronDoubleRightIcon } from "@heroicons/react/solid";
import fishDump from "../dummy/json/fishDump.json";
import { Tab } from "@headlessui/react";
import { data } from "autoprefixer";
import axios from "axios";
import { useDispatch } from "react-redux";
import * as detailPointActions from "../store/modules/detailPoint";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Header = ({ placeholder }) => {
  const [searchInput, setSearchInput] = useState("");
  const [locationInfo, setLocationInfo] = useState(null);
  const [fishInfo, setFishInfo] = useState(null);
  const [locationSelected, setLocationSelected] = useState(true);
  const [fishSelected, setFishSelected] = useState(false);
  const [searchData, setSearchData] = useState(null);

  useEffect(() => {
    const keyWord = async () => {
      try {
        if (searchInput === "") {
          setLocationInfo(null);
          setFishInfo(null);
        } else {
          const response = await axios.get(
            "http://j5d204.p.ssafy.io:8000/fishing/search/auto/" + searchInput
          );

          var locationResult = response.data.filter((data) => data.address.includes(searchInput));
          var fishResult = fishDump.filter((data) =>
            data.fname.toLowerCase().includes(searchInput)
          );
          setLocationInfo(locationResult);
          setFishInfo(fishResult);
        }
      } catch (error) {
        console.log(error);
      }
    };

    keyWord();
  }, [searchInput, fishSelected, locationSelected, fishSelected]);

  const router = useRouter();

  const inputHandler = useCallback((e) => {
    setSearchInput(e.target.value);
  });

  const search = () => {
    router.push({
      pathname: "/search",
      query: {
        location: searchInput,
      },
    });
  };

  const goDetail = (id) => {
    const getData = async () => {
      const res = await axios.get("http://j5d204.p.ssafy.io:8000/fishing/" + id);
      setDetailPoint(res.data[0]);
    };
    getData();
    setSearchInput("");

    router.push({
      pathname: "/DetailPoint",
    });
  };
  const dispatch = useDispatch();
  const setDetailPoint = useCallback(
    (value) => {
      dispatch(detailPointActions.setDetailPoint(value));
    },
    [dispatch]
  );
  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-2 md:px-12">
      {/* 왼쪽 로고 영역 */}
      <div className="relative flex items-center h-12 cursor-pointer my-auto">
        <Image
          src={logo}
          layout="fill"
          objectFit="contain"
          objectPosition="left"
          onClick={() => {
            router.push("/");
          }}
        />
      </div>

      {/* 중앙 검색바 영역 */}
      <div className="flex items-center md:border-2 rounded-full py-1 md:shadow-sm">
        <input
          value={searchInput}
          className="flex-grow pl-5 
          bg-transparent outline-none 
          text-sm text-gray-600 placeholder-gray-400 scrollbar-hide"
          type="text"
          placeholder={placeholder || "검색을 시작해볼까요 ?"}
          onChange={inputHandler}
          onKeyPress={(e) => {
            if (e.key == "Enter") {
              search();
            }
          }}
        />
        <SearchIcon
          className="hidden md:inline-flex h-8 text-white bg-blue-300
          rounded-full p-2 cursor-pointer md:mx-2"
          onClick={search}
        />
      </div>

      {/* 우측 회원관련 영역 */}
      <DropdownMenu />
      {/* <div className="flex items-center space-x-4 justify-end text-gray-500">
        <div className="flex items-center border-2 p-1 rounded-full cursor-pointer">
            <MenuIcon className="h-6" />
            <UserCircleIcon className="h-6" />
        </div>
      </div> */}

      {/* 검색창에 입력된 것이 있을때 아래항목 보여주게 */}
      {searchInput && (
        <>
          <div className="flex flex-col col-span-3 mx-auto w-full lg:w-[550px] mt-2 h-[150px] shadow-md">
            <Tab.Group>
              <Tab.List className="flex p-1 space-x-1 bg-blue900/20 rounded-xl">
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg",
                      "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60",
                      selected
                        ? "bg-white shadow"
                        : "text-blue-100 hover:bg-white/[0.12] hover:text-blue-400"
                    )
                  }
                >
                  지역
                </Tab>
                <Tab
                  disabled
                  className={({ selected }) =>
                    classNames(
                      "w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg",
                      "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60 cursor-not-allowed ",
                      selected
                        ? "bg-white shadow"
                        : "text-blue-100 hover:bg-white/[0.12] hover:text-blue-400"
                    )
                  }
                >
                  어종
                </Tab>
              </Tab.List>
              <Tab.Panels className="mt-2 overflow-scroll scrollbar-hide">
                <Tab.Panel>
                  {locationInfo && (
                    <div>
                      {locationInfo.map(({ id, pointName, address, rate }) => {
                        return (
                          <div className="flex justify-between">
                            <p
                              className="cursor-pointer text-lg ml-5"
                              onClick={() => {
                                setSearchInput(address);
                              }}
                            >
                              📌 {address} [{pointName}]
                            </p>
                            <p
                              className="flex items-center cursor-pointer pr-5"
                              onClick={() => {
                                goDetail(id);
                              }}
                            >
                              <ChevronDoubleRightIcon className="h-5" />
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </Tab.Panel>
                <Tab.Panel>
                  {fishInfo && (
                    <>
                      {fishInfo.map(({ id, fname }) => {
                        return (
                          <div className="flex justify-between">
                            <p
                              className="cursor-pointer text-lg ml-5"
                              onClick={() => {
                                setSearchInput(fname);
                              }}
                            >
                              🐳 {fname}
                            </p>
                            <p className="flex items-center cursor-pointer pr-5" onClick={() => {}}>
                              <ChevronDoubleRightIcon className="h-5" />
                            </p>
                          </div>
                        );
                      })}
                    </>
                  )}
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
