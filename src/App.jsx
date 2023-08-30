import { createContext, useState } from "react";
import MainBody from "./components/main-body";
import NavBar from "./components/nav-bar";
import { DUMMY_DATA } from "./components/dummy-data";

const data = createContext();

function App() {
  const [weatherData, setWeatherData] = useState(
    JSON.parse(localStorage.getItem("weatherData"))
  );
  const lSData = !localStorage.getItem("weatherData");
  const [isLoading, setIsLoading] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [showAdd, setShowAdd] = useState(true);

  return (
    <data.Provider
      value={{
        lSData: lSData,
        isDark: isDark,
        showAdd: showAdd,
        isLoading: isLoading,
        weatherData: weatherData,
        setIsDark: setIsDark,
        setShowAdd: setShowAdd,
        setIsLoading: setIsLoading,
        setWeatherData: setWeatherData,
      }}
    >
      <div
        className={`w-screen h-screen p-5 0 flex justify-between backdrop-blur-lg max-md:flex-col max-md:p-0 0
        ${isDark ? "bg-black-cp" : "bg-gray-cp"}
        
        `}
      >
        <NavBar />
        <MainBody />
      </div>
    </data.Provider>
  );
}

export { data };
export default App;
