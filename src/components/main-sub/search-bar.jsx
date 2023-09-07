import React, { useContext, useEffect, useState } from "react";
import Location from "../../assets/location.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { data } from "../../App";
import axios from "axios";
import { useLocation } from "react-router";

export default function SearchBar() {
  const openWeatherApiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
  const openCageDataApiKey = import.meta.env.VITE_OPEN_CAGE_DATA_API_KEY;

  const location = useLocation();
  const currentRoute = location.pathname;
  const contextData = useContext(data);

  const [city, setCity] = useState("");
  const [wD, setWD] = useState("");

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log(latitude, longitude);
          try {
            contextData.setIsLoading(true);
            const apiUrl = `https://api.opencagedata.com/geocode/v1/json?key=${openCageDataApiKey}&q=${latitude}+${longitude}&pretty=1`;
            const res = await axios.get(apiUrl)
            const cityName = res.data.results[0].components.city
            const response2 = await axios.get(
              `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${openWeatherApiKey}`
            );
            const weatherData = response2.data;
            localStorage.setItem("weatherData", JSON.stringify(weatherData));
            contextData.setWeatherData(weatherData);
            const keysInLoacalStorage = localStorage.getItem("citiesData");
            const keysInLoacalStorageArr = keysInLoacalStorage.split(",");
            keysInLoacalStorageArr.includes(city)
              ? contextData.setShowAdd(true)
              : contextData.setShowAdd(true);
            contextData.setIsLoading(false);
          } catch (error) {
            toast.warn(
              error.code === 1
              && "Kindly Allow the location access."
            );
            contextData.setIsLoading(false);
          }
        },
        (error) => {
          toast.warn(
            error.code === 1
              ? "Kindly Allow the location access."
              : "Your Internet is not working."
          );
        }
      );
    } else {
      toast.warn("Geolocation is not supported by your browser.");
    }
  };

  const add = async (e) => {
    e.preventDefault();

    try {
      contextData.setIsLoading(true);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${openWeatherApiKey}`
      );
      const weatherData = response.data;
      contextData.setWeatherData(weatherData);
      localStorage.setItem("weatherData", JSON.stringify(weatherData));
      const currentId = `${weatherData.city.name}`;

      if (localStorage.getItem("citiesData") !== null) {
        const keysInLoacalStorage = localStorage.getItem("citiesData");
        const keysInLoacalStorageArr = keysInLoacalStorage.split(",");
        if (keysInLoacalStorageArr.includes(currentId)) {
          toast.warn("Already exist");
        } else {
          const tempArr = keysInLoacalStorageArr;
          tempArr.push(currentId);
          localStorage.setItem("citiesData", `${tempArr}`);
          toast.success("City is added");
        }
      } else {
        localStorage.setItem("citiesData", weatherData.city.name);
        toast.success("City is Added");
        contextData.setShowAdd(false);
      }
      contextData.setWeatherData(weatherData);
      contextData.setIsLoading(false);
    } catch (error) {
      toast.warn(
        error.code === "ERR_NETWORK"
          ? "Your internet is not working"
          : "Incorrect city name"
      );
      contextData.setIsLoading(false);
    }
  };

  const search = async (e) => {
    e.preventDefault();
    const keysInLoacalStorage = localStorage.getItem("citiesData");
    const keysInLoacalStorageArr = keysInLoacalStorage ? keysInLoacalStorage.split(",") : []
    keysInLoacalStorageArr.includes(city)
      ? contextData.setShowAdd(false)
      : contextData.setShowAdd(true);
    contextData.setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${openWeatherApiKey}`
      );
      const weatherData = response.data;
      localStorage.setItem("weatherData", JSON.stringify(weatherData));
      contextData.setWeatherData(weatherData);
      setWD(weatherData);
      contextData.setIsLoading(false);
    } catch (error) {
      toast.warn(
        error.code === "ERR_NETWORK"
          ? "Your internet is not working"
          : "Incorrect city name"
      );
      contextData.setIsLoading(false);
    }

  };

  useEffect(() => {
    localStorage.weatherData &&
      contextData.setWeatherData(
        JSON.parse(localStorage.getItem("weatherData"))
      );
  }, [wD]);

  return (
    <div
      className={`  ${contextData.isDark
        ? `border-white border-2 text-white`
        : `bg-slate-800/50`
        } w-full h-10-p mb-4 rounded-md max-md:rounded-none`}
    >
      <ToastContainer position="bottom-center" />
      <form
        onSubmit={currentRoute === "/" ? search : add}
        className=" h-full flex ml-4 p-2 items-center"
      >
        <input
          type="text"
          className={`w-full h-full outline-none text-white bg-transparent placeholder:text-white`}
          onChange={(e) => setCity(e.target.value)}
          required
          minLength={4}
          maxLength={500}
          placeholder="Search City"
        />
        <img
          onClick={() => getLocation()}
          className="w-4 mr-10 hover:cursor-pointer transition-opacity ease-in-out hover:opacity-50 "
          src={Location}
          alt="not found"
        />
        <button
          type="submit"
          className={` w-24 p-2 rounded-full mr-7 max-md:p-2  text-white border-2 hover:bg-white hover:text-black transition-colors ease-in-out max-sm:text-sm`}
        >
          {currentRoute === "/" ? "Search" : "Add"}
        </button>
      </form>
    </div>
  );
}
