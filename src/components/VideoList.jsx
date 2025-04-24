import { useEffect, useRef } from "react";
import { YOUTUBE_API_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { clearChatMessages } from "../utils/redux/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import { setVideos, setPageToken, setLoading } from "../utils/redux/videoSlice";
import Shimmer from "./Shimmer";
import { addToHistoryAndSync } from "../utils/redux/historyThunk";

const VideoList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((store) => store.videos.loading);
  const videos = useSelector((store) => store.videos.videos) || [];
  const pageToken = useSelector((store) => store.videos.pageToken);
  const user = useSelector((store) => store.user.currentUser);

  const bottomRef = useRef(null);

  const playWatchVideo = (video) => {
    const videoId = video.id.videoId || video.id;
    navigate(`/watch?v=${videoId}`);
    dispatch(addToHistoryAndSync(user.uid, video));
    dispatch(clearChatMessages());
  };

  const fetchVideos = async () => {
    if (loading) return;
    dispatch(setLoading(true));
    try {
      const response = await fetch(`${YOUTUBE_API_URL}&pageToken=${pageToken}`);
      if (!response.ok) throw new Error("Network error");
      const data = await response.json();
      const updatedVideos = [...videos, ...data?.items];
      dispatch(setVideos(updatedVideos));
      dispatch(setPageToken(data?.nextPageToken));
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Load first page
  useEffect(() => {
    fetchVideos();
  }, []);

  // Infinite scroll trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && pageToken) {
          fetchVideos(); // fetch next page
        }
      },
      {
        threshold: 1.0,
      }
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => {
      if (bottomRef.current) {
        observer.unobserve(bottomRef.current);
      }
    };
  }, [bottomRef.current, pageToken]);

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Trending Videos</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videos.length > 0 &&
          videos.map((video, index) => (
            <div
              onClick={() => playWatchVideo(video)}
              key={`${video.id.videoId || video.id}-${
                video.snippet.publishedAt
              }_${index}`}
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

        {loading &&
          Array.from({ length: 8 }).map((_, i) => (
            <Shimmer key={`skeleton-${i}`} />
          ))}
      </div>

      <div ref={bottomRef} className="h-10 my-4 col-span-full"></div>

      {loading && <p className="text-center text-gray-400">Loading...</p>}
    </div>
  );
};

export default VideoList;
