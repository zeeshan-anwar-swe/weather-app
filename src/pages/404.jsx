import React from "react";
import vid404 from "../assets/404.mp4"
import { Link } from "react-router-dom";

export const Page404 = () => {
  return <div className="w-full flex flex-col items-center">
   <video className=" m-auto rounded-full "
        autoPlay
        muted
        loop
        style={{ width: '80%', maxWidth: '500px' }}
      >
        <source src={vid404} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Link to={"/"}>
        <button className="text-white rounded-xl border-2 p-2 mb-5">
            Go Back to Home
        </button>
      </Link>
    </div>;
};
