import React, { useContext } from "react";
import { data } from "../App";
import { Day } from "./right-pannel-sub/day";

export default function HomeRightPannel() {
  const contextData = useContext(data);

  const filteredData = contextData.weatherData.list.filter((item, index) => {
    return index % 8 === 0;
  });

  return (
    <div
      className={`${
        contextData.isDark
          ? "border-white border-2 text-white"
          : "bg-slate-800/50 text-white"
      } w-hrp max-h-full rounded-md flex flex-col ml-6 max-md:ml-0 max-md:mt-4 max-md:w-11/12 max-md:h-auto`}
    >
      <p className="ml-4 mt-4 text-xl">5 DAYS FORECAST</p>
      <div className=" flex flex-col items-center justify-evenly h-full">
        {filteredData.map((item, index) => (
          <div key={index} className="w-full h-1/5">
            <div className="w-11/12  overflow-hidden flex items-center justify-between max-sm:justify-around m-auto">
              <span>
                <Day date={item.dt_txt.slice(0, 10)} />
              </span>
              <div className="flex items-center w-1/2">
                <img
                  className="w-20 drop-shadow-xl max-sm:w-15"
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt="Loading"
                />
                <span className="ml-2">{item.weather[0].description}</span>
              </div>
              <span className="max-sm:hidden">
                {Math.floor(item.main.temp_max - 273.15)}/
                {Math.floor(item.main.temp_min - 273.15)}
              </span>
            </div>
            <hr
              className={`hr-c m-auto ${
                index === filteredData.length - 1 && "hidden"
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
