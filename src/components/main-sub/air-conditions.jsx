import React, { useContext } from "react";
import { data } from "../../App";
import {
  DeviceThermostat,
  Air,
  WaterDrop,
  Brightness7,
  Flag,
} from "@mui/icons-material";

export default function AirConditions() {
  const contextData = useContext(data);
  return (
    <div
      className={`${
        contextData.isDark
          ? " text-white border-white border-2"
          : "bg-slate-800/50  text-gray-200"
      } w-full rounded-md py-4 mb-1`}
    >
      <div className="mx-4 flex justify-between">
        <p>Air Conditions</p>
        
      </div>

      <div className="w-full flex justify-around py-2">
        <div className="w-2/5 h-full">
          <DeviceThermostat />
          <span className="ml-2"> Real Feel</span>
          <h1 className="text-2xl ml-9 mb-4 ">
            {Math.floor(
              parseInt(contextData.weatherData.list[0].main.feels_like) - 273.15
            )}
            &deg;
          </h1>
          <WaterDrop />
          <span className="ml-2">humidity</span>
          <h1 className="text-2xl ml-9">
            {contextData.weatherData.list[0].main.humidity}%{" "}
          </h1>
        </div>
        <div className="w-2/5 h-full">
          <Air />
          <span className="ml-2">Wind</span>
          <h1 className="text-2xl ml-9 mb-4">
            {contextData.weatherData.list[0].wind.speed} km/h
          </h1>

          <Flag />
          <span className="ml-2">Country</span>
          <h1 className="text-2xl ml-9">
            {contextData.weatherData.city.country}
          </h1>
        </div>
      </div>
    </div>
  );
}
