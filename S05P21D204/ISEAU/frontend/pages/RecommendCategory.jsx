import axios from "axios";
import { useRouter } from "next/dist/client/router";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import Header from "../components/Header";
import RecommendCard from "../components/RecommendCard";
import * as detailPointActions from "../store/modules/detailPoint";
import fishingData from "../dummy/json/fishingDump.json";

const RecommendCategory = () => {
  const router = useRouter();

  const { category } = router.query;
  const [cateParse, setCateParse] = useState(Number(category));
  const [getCategory, setGetCategory] = useState(4);
  const [userId, setUserId] = useState("");
  const uid = useSelector((state) => state.user.id);
  const [recommData, setRecommData] = useState([]);

  const [result, setResult] = useState([]);
  const [item, setItem] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMoreData = async () => {
    setIsLoading(true);
    setResult(result.concat(item.slice(0, 21)));
    setItem(item.slice(21));
    setIsLoading(false);
  };

  const _infiniteScroll = useCallback(() => {
    let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);

    let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);

    let clientHeight = document.documentElement.clientHeight;
    scrollHeight -= 100;
    if (scrollTop + clientHeight >= scrollHeight && isLoading === false) {
      fetchMoreData();
    }
  }, [isLoading]);

  const getFetchData = async () => {
    await axios
      .get("http://j5d204.p.ssafy.io:8000/recommend/category/" + uid + "/" + cateParse)
      .then((res) => {
        let response = res.data;
        setResult(response.slice(0, 21));
        response = response.slice(21);
        setItem(response);
        setIsLoading(false);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };

  useEffect(async () => {
    setCateParse(Number(category));
    setUserId(uid);
    await getFetchData();
  }, [category]);

  useEffect(() => {
    window.addEventListener("scroll", _infiniteScroll, true);
    return () => window.removeEventListener("scroll", _infiniteScroll, true);
  }, [_infiniteScroll]);

  const Routing = (value) => {
    router.push({
      pathname: "/RecommendCategory",
      query: {
        category: value,
      },
    });
  };
  const HandlerSelected = async (value) => {
    setCateParse(value);
    await getFetchData();

    Routing(value);
  };

  const goDetail = (id) => {
    const getData = async () => {
      const res = await axios.get("http://j5d204.p.ssafy.io:8000/fishing/" + id);
      setDetailPoint(res.data[0]);
    };
    getData();

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
    <div>
      <Header />

      <main className="max-w-7xl mx-auto px-8 pt-8 sm:px-16 mb-16">
        <section>
          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            <p
              className={cateParse === 2 ? `button_selected` : `button`}
              onClick={() => HandlerSelected(2)}
            >
              전체 보기
            </p>
            <p
              className={cateParse === 1 ? `button_selected` : `button`}
              onClick={() => HandlerSelected(1)}
            >
              갯바위 포인트
            </p>
            <p
              className={cateParse === 0 ? `button_selected` : `button`}
              onClick={() => HandlerSelected(0)}
            >
              선상 포인트
            </p>
          </div>
        </section>
        <section className="pt-5">
          <div className="flex flex-wrap -mx-1 overflow-hidden md:-mx-2 lg:-mx-4 xl:-mx-2">
            {result.map(({ id, fishingImg, pointName, address, rating, category }) => (
              <div
                className="my-5 px-9 w-full overflow-hidden md:my-2 md:px-2 md:w-1/2 lg:my-4 lg:px-4 lg:w-1/2 xl:my-2 xl:px-2 xl:w-1/3"
                onClick={() => {
                  goDetail(id);
                }}
              >
                <RecommendCard
                  key={id}
                  id={id}
                  fishingimg={fishingImg}
                  pointName={pointName}
                  address={address}
                  rating={rating}
                  category={category}
                />
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default RecommendCategory;
