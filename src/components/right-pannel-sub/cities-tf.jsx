import React, { useContext } from "react";
import { data } from "../../App";

export default function CitiesTodaysForcast() {
  const contextData = useContext(data);

  const oneDayForcast = contextData.weatherData.list.slice(0, 3);

  return (
    <div
      className={`${
        contextData.isDark
          ? " text-white border-white border-2"
          : "bg-slate-800/50  text-gray-200"
      } w-full rounded-md  my-6 py-2`}
    >
      <p className="ml-4">Today's Forcast</p>
      <div className="flex justify-between  py-1">
        {oneDayForcast.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-xs w-1/3 b-r last:border-r-0 "
          >
            <p>{`${
              parseInt(item.dt_txt.slice(11, 13)) > 12
                ? parseInt(item.dt_txt.slice(11, 13)) - 12 + ":00" + " PM"
                : item.dt_txt.slice(11, 13) + ":00" + " AM"
            }`}</p>
            <img
              className="w-5/12 drop-shadow-xl"
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt="Loading"
            />
            <p className="text-xl antialiased">
              {Math.floor(item.main.temp - 273.15)}&deg;
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
