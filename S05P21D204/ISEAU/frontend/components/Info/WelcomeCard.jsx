import React from "react";
import ReactPlayer from "react-player";
const WelcomeCard = () => {
  return (
    <div>
      <ReactPlayer playing={true} url={sea} height="100%" width="100%" loop />
    </div>
  );
};

export default WelcomeCard;
