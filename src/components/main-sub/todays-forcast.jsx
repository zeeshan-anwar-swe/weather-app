import React, { useContext } from "react";
import { data } from "../../App";

export default function TodaysForcast() {
  const contextData = useContext(data);

  const oneDayForcast = contextData.weatherData.list.slice(0, 6);

  return (
    <div
      className={`${
        contextData.isDark
          ? " text-white border-white border-2"
          : "bg-slate-800/50  text-gray-200"
      } w-full rounded-md  my-6 py-2`}
    >
      <p className="ml-4">Today's Forcast</p>
      <div className="flex py-1 max-md:flex-col">
        {oneDayForcast.map((item, index) => (
          <>
            <div
              key={index}
              className="flex flex-col items-center py-4 w-1/6  b-r last:border-r-0  max-md:w-full  max-md:flex-row max-md:justify-between max-md:h-1/5"
            >
              <p className="max-md:ml-4 max-md:text-xl">{`${
                parseInt(item.dt_txt.slice(11, 13)) > 12
                  ? parseInt(item.dt_txt.slice(11, 13)) - 12 + ":00" + " PM"
                  : item.dt_txt.slice(11, 13) + ":00" + " AM"
              }`}</p>
              <img
                className="w-1/3 drop-shadow-xl max-md:w-1/4"
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt="Loading"
              />
              <p className="text-xl antialiased max-md:mr-4 max-md:text-4xl">
                {Math.floor(item.main.temp - 273.15)}&deg;
              </p>
            </div>
            <hr
              className={`hr-c m-auto md:hidden ${
                index === oneDayForcast.length - 1 && "hidden"
              }`}
            />
          </>
        ))}
      </div>
    </div>
  );
}
