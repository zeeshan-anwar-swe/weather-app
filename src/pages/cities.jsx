import React, { useContext, useState, useEffect } from "react";
import { data } from "../App";
import CitiesRightPannel from "../components/cities-right-pannel";
import { CityList } from "../components/city-list";
import { Link } from "react-router-dom";
import { Home } from "@mui/icons-material";
import axios from "axios";

export const Cities = () => {
  const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

  const contextData = useContext(data);
  const [list, setList] = useState([]);

  if (localStorage.getItem("citiesData") !== null) {
    const firstCity = async () => {
      try {
        const firstCityData = localStorage.getItem("citiesData").split(",");
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${firstCityData[firstCityData.length-1]}&appid=${apiKey}`
        );
        const weatherData = response.data;
        contextData.setWeatherData(weatherData);
      } catch (error) {
        console.warn(error);
      }
    };
    
    useEffect(() => {
      firstCity();
      const localData = localStorage.getItem("citiesData");
      const cityList = localData !== null && localData.split(",");
      setList(cityList.reverse());
    }, []);
  }


  return (
    <div className="flex-grow flex justify-between max-md:flex-col max-md:w-full">
      <div className="w-9/12 text-white flex flex-col items-center overflow-scroll  max-md:w-full max-md:justify-center max-md:overflow-visible">
        {localStorage.getItem("citiesData") === null ? (
          <h1 className="text-4xl">
            You have no list kindly add some city from{" "}
            <Link to={"/"}>
              <Home style={{ fontSize: "3rem" }} />
            </Link>
          </h1>
        ) : (
          list.map((item, index) => (
            <CityList index={index} key={item} setList={setList} city={item} />
          ))
        )}
      </div>
      <CitiesRightPannel list={list} />
    </div>
  );
};
