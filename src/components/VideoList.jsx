import { useEffect, useState } from "react";
import { YOUTUBE_API_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const VideoList = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const playWatchVideo = (video) => {
    const videoId = video.id.videoId || video.id;
    navigate(`/watch?v=${videoId}`);
  };

  const fetchVideos = async () => {
    try {
      const response = await fetch(YOUTUBE_API_URL);
      if (!response.ok) throw new Error("Network error");
      const data = await response.json();
      setVideos(data?.items);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Trending Videos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videos.map((video) => (
          <div
            onClick={() => playWatchVideo(video)}
            key={video.id}
            className="rounded-xl overflow-hidden shadow hover:shadow-lg transition duration-300 cursor-pointer"
          >
            <div className="aspect-video w-full">
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-3">
              <h2 className="text-sm font-semibold line-clamp-2">
                {video.snippet.title}
              </h2>
              <p className="text-gray-600 text-xs mt-1">
                {video.snippet.channelTitle}
              </p>
              <p className="text-gray-500 text-xs">
                {video.statistics?.viewCount
                  ? `${Number(
                      video.statistics.viewCount
                    ).toLocaleString()} views • `
                  : ""}
                {new Date(video.snippet.publishedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoList;
