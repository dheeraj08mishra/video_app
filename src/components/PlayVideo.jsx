import { useSearchParams } from "react-router-dom";
import Comments from "./Comments";
import VideoPlayer from "./VideoPlayer";
import LiveChat from "./LiveChat";
import RecommendedVideos from "./RecommendedVideos";
import { useSelector } from "react-redux";

const PlayVideo = () => {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const isDarkMode = useSelector((store) => store.toggleDarkMode.darkMode);
  const textColor = isDarkMode ? "text-white" : "text-gray-800";
  const borderColor = isDarkMode ? "border-gray-700" : "border-gray-200";
  const textDisplayStyle = isDarkMode ? "text-gray-300" : "text-gray-800";
  const backgroundColor = isDarkMode ? "bg-gray-800" : "bg-white";

  return (
    <div className={`flex flex-col min-h-screen ${backgroundColor}`}>
      <div className="flex flex-row justify-center p-4 gap-4">
        {/* Video + Comments Section */}
        <div className="flex flex-col w-full max-w-4xl">
          <div className="aspect-video w-full">
            <VideoPlayer videoId={videoId} />
          </div>
          <div className={`mt-4 ${textColor}`}>
            <Comments videoId={videoId} />
          </div>
        </div>

        {/* Right Sidebar: Live Chat + Recommendations */}
        <div className="flex flex-col w-[400px] ">
          <div
            className={`${backgroundColor} ${borderColor} h-[500px] rounded-lg shadow border p-2 flex flex-col`}
          >
            <LiveChat videoId={videoId} />
          </div>

          <div
            className={`${backgroundColor} rounded-lg shadow border ${borderColor} p-2`}
          >
            <RecommendedVideos videoId={videoId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayVideo;
