import { AddCircle } from "@mui/icons-material";
import React, { useContext, useState } from "react";
import { data } from "../../App";

export default function CitiesWeatherCurrent() {
  const contextData = useContext(data);

  return (
    <>
      <div
        className={`
      text-white flex items-center justify-between rounded-md`}
      >
        <div className=" w-1/2 ml-4 h-full flex flex-col justify-center">
          <h1 className="text-3xl font-medium ">
            {contextData.weatherData.city.name}
          </h1>
          <p className="text-sm">
            {contextData.weatherData.list[0].weather[0].description}
          </p>
        </div>

        <div className="flex items-center justify-end">
          <img
            className="w-20 drop-shadow-xl mr-4"
            src={`https://openweathermap.org/img/wn/${contextData.weatherData.list[0].weather[0].icon}@2x.png`}
            alt="Loading"
          />
        </div>
      </div>
      <p className="text-4xl ml-4 font-semibold">
        {Math.floor(contextData.weatherData.list[0].main.temp - 273.15)}&deg;
      </p>
    </>
  );
}
