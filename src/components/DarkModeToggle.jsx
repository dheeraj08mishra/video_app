import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleDarkMode } from "../utils/redux/toggleDarkMode";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
const DarkModeToggle = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((store) => store.toggleDarkMode.darkMode);
  const [isToggled, setIsToggled] = useState(isDarkMode);

  const handleToggle = () => {
    setIsToggled(!isToggled);
    dispatch(toggleDarkMode());
  };
  return (
    <button
      onClick={handleToggle}
      className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 transition duration-300"
    >
      {isToggled ? (
        <BsFillSunFill className="text-yellow-500" />
      ) : (
        <BsFillMoonFill className="text-gray-800" />
      )}
    </button>
  );
};
export default DarkModeToggle;
