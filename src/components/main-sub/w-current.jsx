import { AddCircle } from "@mui/icons-material";
import React, { useContext, useEffect, useState } from "react";
import { data } from "../../App";
import { ToastContainer, toast } from "react-toastify";

export default function WeatherCurrent() {
  const contextData = useContext(data);


  const localData =
    localStorage.getItem("citiesData") !== null
      ? localStorage.getItem("citiesData").split(",")
      : "";

  const button = () => {
    localData.includes(contextData.weatherData.city.name) && contextData.setShowAdd(false);
  };

  useEffect(() => {
    button();
  }, [contextData.showAdd]);

  //City Saver
  const saveCity = () => {
    if (localStorage.getItem("citiesData") !== null) {
      const currentId = `${contextData.weatherData.city.name}`;
      const keysInLoacalStorage = localStorage.getItem("citiesData");
      const keysInLoacalStorageArr = keysInLoacalStorage.split(",");

      if (keysInLoacalStorageArr.includes(currentId)) {
        toast.warn("Already exist");
        contextData.setShowAdd(false);
      } else {
        const tempArr = keysInLoacalStorageArr;
        tempArr.push(currentId);
        localStorage.setItem("citiesData", `${tempArr}`);
        toast.success("City is added");
        contextData.setShowAdd(false);
      }
    } else {
      localStorage.setItem("citiesData", contextData.weatherData.city.name);
      toast.success("City is Added");
      contextData.setShowAdd(false);
    }
  };

  return (
    <div
      className={`
        text-white w-full rounded-md flex`}
    >
      <ToastContainer position="bottom-center" />
      <div className=" w-1/2 h-full ml-10 max-md:ml-0 max-md:flex max-md:flex-col max-md:justify-center">
        <h1 className="text-4xl font-medium max-sm:text-2xl ">
          {contextData.weatherData.city.name}
        </h1>
        <p className="text-lg max-sm:text-base">
          {contextData.weatherData.list[0].weather[0].description}
        </p>
        <p className="text-5xl font-bold antialiased max-sm:text-3xl">
          {Math.floor(contextData.weatherData.list[0].main.temp - 273.15)}&deg;
        </p>
      </div>
      <button onClick={saveCity} className={`${!contextData.showAdd ? "hidden" : "block"}`}>
        <AddCircle style={{fontSize:"3rem"}}/>
      </button>
      <div className="w-1/2 flex items-center justify-end">
        <img
          className="w-1/4  drop-shadow-xl mr-10 max-md:w-8/12 max-md:mr-0"
          src={`https://openweathermap.org/img/wn/${contextData.weatherData.list[0].weather[0].icon}@2x.png`}
          alt="Loading"
        />
      </div>
    </div>
  );
}
