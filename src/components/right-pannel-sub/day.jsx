import React from "react";

export const Day = ({ date }) => {
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const fullDate = new Date(date);
  const dayOfWeek = fullDate.getDay();
  return dayNames[dayOfWeek];
};
