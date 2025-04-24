import VideoList from "./VideoList";
import Buttonset from "./Buttonset";
import { useSelector } from "react-redux";
const MainContainer = () => {
  const isDarkMode = useSelector((store) => store.toggleDarkMode.darkMode);
  return (
    <div
      className={`flex flex-col items-center justify-start w-full h-full ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <Buttonset />
      <VideoList />
    </div>
  );
};
export default MainContainer;
