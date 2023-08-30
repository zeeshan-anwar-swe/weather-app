import React, { useContext, useEffect } from "react";
import { data } from "../App";
import CitiesWeatherCurrent from "./right-pannel-sub/cities-cw";
import CitiesTodaysForcast from "./right-pannel-sub/cities-tf";
import Cities3DaysForcast from "./right-pannel-sub/cities-3d-forcast";

export default function CitiesRightPannel({list}) {
  const contextData = useContext(data);

  const filteredData = contextData.weatherData.list.filter((item, index) => {
    return index % 8 === 0;
  });
  return (
    <div
      className={`${localStorage.getItem("citiesData")=== null && "hidden" } w-hrp ml-6 text-white max-h-full rounded-md flex flex-col justify-between max-md:w-11/12 max-md: max-sm:ml-3 max-md:mt-11`}
    >
      <CitiesWeatherCurrent />
      <hr
        className={`hr-c m-auto mt-6 `}
      />
      <CitiesTodaysForcast/>
      <Cities3DaysForcast />
    </div>
  );
}
