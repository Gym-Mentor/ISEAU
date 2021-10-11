import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useSelector } from "react-redux";

const DetailMap = () => {
  const point = useSelector(({ detailPoint }) => detailPoint);
  const [clickedLocation, setClickedLocation] = useState({});
  function getWindowDimensions() {
    if (typeof window !== "undefined") {
      const { innerWidth: width, innerHeight: height } = window;
      return {
        width: (width / 100) * 90,
        height,
      };
    } else {
      return {
        width: 0,
        height: 0,
      };
    }
  }

  function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
      if (typeof window !== "undefined") {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }
    }, []);

    return windowDimensions;
  }

  const { height, width } = useWindowDimensions();

  useEffect(() => {
    setViewport((state) => ({
      ...state,
      width: width,
    }));
  }, [width]);

  useEffect(() => {
    setViewport((state) => ({
      ...state,
      longitude: Number(point.longitude),
      latitude: Number(point.latitude),
    }));
  }, [point]);
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    longitude: Number(point.longitude),
    latitude: Number(point.latitude),
    zoom: 10,
  });

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/jaedenist/cktspge5j5d5418opcln0d1jx"
      mapboxApiAccessToken={process.env.map_key}
      {...viewport}
      onViewportChange={(nextView) => {
        setViewport(nextView);
      }}
    >
      <div>
        <Marker longitude={Number(point.longitude)} latitude={Number(point.latitude)}>
          <p
            role="img"
            className="cursor-pointer text-2xl animate-bounce"
            onClick={() => setClickedLocation(point)}
            aria-label="push-pin"
          >
            🐳
          </p>
        </Marker>

        {clickedLocation === point ? (
          <Popup
            className="z-50"
            closeOnClick={true}
            onClose={() => setClickedLocation({})}
            latitude={Number(point.latitude)}
            longitude={Number(point.longitude)}
            offsetLeft={10}
            offsetTop={-10}
          >
            {point.pointName}
          </Popup>
        ) : (
          false
        )}
      </div>
    </ReactMapGL>
  );
};

export default DetailMap;
