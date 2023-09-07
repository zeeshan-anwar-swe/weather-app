import { Home, List, Settings, DarkMode, LightMode } from "@mui/icons-material";
import Logo from "../../public/weather.svg";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { data } from "../App";

export default function NavBar() {
  const contextData = useContext(data);

  const [iconSize, setIconSize] = useState("3rem");

  useEffect(() => {
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
    <div
      className={`${contextData.isDark ? "border-white border-2" : "bg-slate-800/50"
        } w-1/12 h-100 rounded-md inline-flex flex-col items-center text-white 
      max-md:w-full max-md:fixed max-md:bottom-0 max-md:bg-slate-800 z-50 max-md:h-16 max-md:order-last max-md:flex-row max-md:rounded-none
      `}
    >
      <div className=" w-4/5 flex  justify-center h-1/5 mb-6 animate-pulse max-md:hidden">
        <img src={Logo} alt="" className="w-4/5" />
      </div>

      <div className="w-full h-4/5 flex flex-col justify-center max-md:flex-row max-md:items-center max-md:ml-4">
        {/* ---------------------------------------------- */}
        <Link to={"/"} className="text-center w-4/5 m-auto my-2  ">
          <Home style={{ fontSize: iconSize }} />
          <p className="max-md:text-xs">Home</p>
        </Link>
        {/* ---------------------------------------------- */}

        {/* ---------------------------------------------- */}
        <Link to={"/cities"} className="text-center w-4/5 m-auto my-2">
          <List
            style={{
              fontSize: iconSize,
            }}
          />
          <p className="max-md:text-xs">Cities</p>
        </Link>
        {/* ---------------------------------------------- */}
      </div>

      <button
        className={` h-1/5 w-4/5 max-md:justify-center max-md:h-full`}
        style={{ color: "white" }}
        onClick={() => {
          contextData.setIsDark(!contextData.isDark);
        }}
      >
        {contextData.isDark ? (
          <div>
            <LightMode
              fontSize="large"
              className="hover:text-yellow-400"
            />
          </div>
        ) : (
          <div>
            <DarkMode fontSize="large" className="hover:text-yellow-400" />
          </div>
        )}
      </button>
    </div>
  );
}
