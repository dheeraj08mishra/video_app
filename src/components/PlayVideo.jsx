import { useSearchParams } from "react-router-dom";
import Comments from "./Comments";
import VideoPlayer from "./VideoPlayer";
import LiveChat from "./LiveChat";
import RecommendedVideos from "./RecommendedVideos";

const PlayVideo = () => {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-row justify-center p-4 gap-4">
        {/* Video + Comments Section */}
        <div className="flex flex-col w-full max-w-4xl">
          <div className="aspect-video w-full">
            <VideoPlayer videoId={videoId} />
          </div>
          <div className="mt-4">
            <Comments videoId={videoId} />
          </div>
        </div>

        {/* Right Sidebar: Live Chat + Recommendations */}
        <div className="flex flex-col w-[400px] ">
          <div className="bg-white h-[500px] rounded-lg shadow border border-gray-200 p-2 flex flex-col">
            <LiveChat videoId={videoId} />
          </div>

          <div className="bg-white rounded-lg shadow border border-gray-200 p-2">
            <RecommendedVideos videoId={videoId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayVideo;
