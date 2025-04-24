import React, { useState, useEffect } from "react";
import { YOUTUBE_API_URL_VideoCategories } from "../utils/constants";
import { useDispatch } from "react-redux";
import { setVideos, setLoading } from "../utils/redux/videoSlice";
const Buttonset = () => {
  const [buttons, setButtons] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const dispatch = useDispatch();
  const Youtube_Api_Key = process.env.REACT_APP_YOUTUBE_API_KEY;

  useEffect(() => {
    fetchButtons();
  }, []);

  const fetchButtons = async () => {
    try {
      const response = await fetch(YOUTUBE_API_URL_VideoCategories);
      const data = await response.json();
      const categories = data.items
        .filter((item) => item.snippet.assignable)
        .map((item) => ({
          id: item.id,
          name: item.snippet.title,
        }));
      setButtons(categories);
    } catch (error) {
      console.error("Error fetching buttons:", error);
    }
  };

  const handleSelectedButtonFilter = async (button) => {
    setSelectedCategory(button.id);
    dispatch(setLoading(true));

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=IN&videoCategoryId=${button.id}&maxResults=20&key=${Youtube_Api_Key}`
      );
      const data = await response.json();
      dispatch(setVideos(data.items));
    } catch (error) {
      console.log("Failed to fetch filtered videos", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="w-full px-4 py-4">
      <div className="flex overflow-x-auto scrollbar-hide whitespace-nowrap gap-3">
        {buttons.map((button) => (
          <button
            key={button.id}
            onClick={() => handleSelectedButtonFilter(button)}
            className={`px-4 py-2 rounded-lg shadow-md transition duration-300 flex-shrink-0 ${
              selectedCategory === button.id
                ? "bg-red-600 text-white"
                : "bg-gray-600 hover:bg-gray-800 text-white"
            }`}
          >
            {button.name}
          </button>
        ))}
      </div>
    </div>
  );
};
export default Buttonset;
