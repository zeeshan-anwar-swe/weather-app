import React from "react";
import WeatherCurrent from "../components/main-sub/w-current";
import TodaysForcast from "../components/main-sub/todays-forcast";
import AirConditions from "../components/main-sub/air-conditions";
import HomeRightPannel from "../components/home-right-pannel";

export const Home = () => {
  return (
    <div className="w-full h-full flex justify-between max-md:items-center max-md:flex-col">
      <div className="w-9/12  flex flex-col justify-between  max-md:w-11/12">
        <WeatherCurrent />
        <TodaysForcast />
        <AirConditions />
      </div>
        <HomeRightPannel />
    </div>
  );
};
