import React, { useContext } from "react";
import { data } from "../../App";
import { Day } from "../right-pannel-sub/day";

export default function Cities3DaysForcast() {
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
      }  h-78 rounded-md flex flex-col mb-1 h-1/2`}
    >
      <p className="ml-4 my-4 text-sm">3 DAYS FORECAST</p>
      <div className=" flex flex-col items-center justify-evenly h-full">
        {filteredData.slice(0, 3).map((item, index) => (
          <div key={index} className="w-full">
            <div className="w-11/12 h-12 overflow-hidden flex items-center justify-between m-auto">
              <span className="text-sm">
                <Day date={item.dt_txt.slice(0, 10)} />
              </span>
              <div className="flex items-center w-1/2">
                <img
                  className="w-20 drop-shadow-xl"
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt="Loading"
                />
                <span className="text-sm ml-2">
                  {item.weather[0].description}
                </span>
              </div>
              <span className="text-lg">
                {Math.floor(item.main.temp_max - 273.15)}/
                {Math.floor(item.main.temp_min - 273.15)}
              </span>
            </div>
            <hr
              className={`hr-c m-auto ${
                index === 2 && "hidden"
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
