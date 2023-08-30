import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { data } from "../App";
import DeleteIcon from "@mui/icons-material/Delete";
import { CircularProgress } from "@mui/material";
import { DUMMY_DATA } from "./dummy-data";
import { toast } from "react-toastify";

export const CityList = ({ city, setList, index }) => {
  const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
  const [cityLoading, setCityLoading] = useState(false);
  const [cityListData, setCityListData] = useState(DUMMY_DATA);
  const contextData = useContext(data);
  const fetch = async () => {
    try {
      setCityLoading(true);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
      );
      setCityListData(response.data);
      setCityLoading(false);
    } catch (error) {
      setCityLoading(false);

      index === 0 && toast.warn("Your Internet is not working")
    }
  };
  const [iconSize, setIconSize] = useState("3rem");

  const citySeter = async (cityName) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`
      );
      const weatherData = response.data;
      contextData.setWeatherData(weatherData);
      contextData.setIsLoading(false);
    } catch (error) {
      toast.warn("Your internet is not working");
    }
  };

  const deleteCity = async () => {
    const citiesName = localStorage.getItem("citiesData");
    const citiesNameArr = citiesName.split(",");
    if (citiesNameArr.length < 2) {
      localStorage.removeItem("citiesData");
      setList([]);
      toast.success(`${city} has been removed`);
      window.location.reload();
    } else {
      const filteredArray = citiesNameArr.filter((item) => item !== city);
      localStorage.setItem("citiesData", `${filteredArray}`);
      setList(filteredArray);
      toast.success(`${city} has been removed`);
      const firstCity = localStorage.getItem("citiesData").split(",");
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${firstCity[0]}&appid=${apiKey}`
      );
      const weatherData = response.data;
      contextData.setWeatherData(weatherData);
    }
  };

  useEffect(() => {
    fetch();
    const resizer = () => {
      window.innerWidth <= 768 ? setIconSize("2rem") : setIconSize("3rem");
    };
    window.addEventListener("resize", resizer);
    resizer();
    return () => {
      window.removeEventListener("resize", resizer);
    };
  }, []);

  return (
    <div className="w-full flex items-center">
      {cityLoading ? (
        <CircularProgress
          style={{ color: contextData.isDark ? "white" : "rgb(30 41 59)" }}
        />
      ) : (
        <div
          className={`${
            contextData.isDark
              ? "text-white border-2"
              : "bg-slate-800/50  text-gray-200"
          } w-full mt-6 rounded-md flex items-center justify-between 
          max-md:w-11/12 max-md:m-auto max-md:mt-4`}
        >
          <div
            onClick={() => citySeter(city)}
            className="flex items-center ml-6 max-md:ml-1 hover:cursor-pointer"
          >
            <img
              className="w-24 max-md:w-16 drop-shadow-xl mr-10 max-md:mr-10"
              src={`https://openweathermap.org/img/wn/${cityListData.list[0].weather[0].icon}@2x.png`}
              alt="Loading"
            />
            <div className="h-full">
              <h1 className="text-4xl max-md:text-xl">{city}</h1>
              <p>{`${
                parseInt(cityListData.list[0].dt_txt.slice(11, 13)) > 12
                  ? parseInt(cityListData.list[0].dt_txt.slice(11, 13)) -
                    12 +
                    ":00" +
                    " PM"
                  : cityListData.list[0].dt_txt.slice(11, 13) + ":00" + " AM"
              }`}</p>
            </div>
          </div>
          <div className="flex w-40 max-md:w-auto max-md:items-center">
            <button className="mr-6 max-md:mr-2" onClick={deleteCity}>
              <DeleteIcon style={{ fontSize: iconSize }} />
            </button>
            <h1 className="text-5xl font-bold antialiased max-md:text-3xl max-md:mr-2">
              {Math.floor(cityListData.list[0].main.temp - 273.15)}&deg;
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};
