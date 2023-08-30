import CircularProgress from "@mui/material/CircularProgress";
import { Route, Routes } from "react-router-dom";
import SearchBar from "./main-sub/search-bar";
import { Cities } from "../pages/cities";
import { Home } from "../pages/home";
import { data } from "../App";
import { useContext, useEffect } from "react";
import { Page404 } from "../pages/404";

export default function MainBody() {
  const contextData = useContext(data);
  useEffect(() => {}, [contextData.isLoading]);
  return (
    <div className="w-full h-full ml-6 overflow-hidden max-md:ml-0 ">
      <SearchBar />
      <div className="w-full h-90-p flex justify-between  max-md:overflow-scroll">
        {contextData.lSData ? (
          <h1 className="text-2xl m-auto text-white">
            Please search a city....
          </h1>
        ) : contextData.isLoading ? (
          <div className="w-full flex justify-center">
            <CircularProgress
              style={{ color: contextData.isDark ? "white" : "rgb(30 41 59)" }}
            />
          </div>
        ) : (
          <Routes>
            <Route path="/" exact Component={Home} />
            <Route path="/cities" Component={Cities} />
            <Route path="*" Component={Page404} />
          </Routes>
        )}
      </div>
    </div>
  );
}
