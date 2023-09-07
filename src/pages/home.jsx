import React from "react";
import WeatherCurrent from "../components/main-sub/w-current";
import TodaysForcast from "../components/main-sub/todays-forcast";
import AirConditions from "../components/main-sub/air-conditions";
import HomeRightPannel from "../components/home-right-pannel";
import axios from "axios";

export const Home = () => {



  // fetch(apiUrl)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     if (data.results && data.results.length > 0) {
  //       const city = data.results[0].components.city;
  //       console.log(`City: ${city}`);
  //     } else {
  //       console.error('City not found for the provided coordinates.');
  //     }
  //   })
  //   .catch((error) => {
  //     console.error('Error fetching data:', error);
  //   });

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
