import { useEffect, useState, useRef } from "react";
import { YOUTUBE_API_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToHistoryAndSync } from "../utils/redux/historyThunk";

const RecommendedVideos = () => {
  const [videos, setVideos] = useState([]);
  const [pageToken, setPageToken] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useSelector((store) => store.user.currentUser);
  const bottomRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    setLoading(true);
    fetchRelated();
  }, []);

  const fetchRelated = async () => {
    try {
      const data = await fetch(`${YOUTUBE_API_URL}&pageToken=${pageToken}`);
      const json = await data.json();
      setPageToken(json?.nextPageToken);
      const updatedVideos = [...videos, ...json?.items];
      setVideos(updatedVideos);
    } catch (error) {
      console.error("Error fetching related videos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && pageToken) {
          fetchRelated();
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
  }, [bottomRef, pageToken]);

  const storeInHistory = (video) => {
    dispatch(addToHistoryAndSync(user.uid, video));
    const videoId = video.id.videoId || video.id;
    navigate(`/watch?v=${videoId}`);
  };

  return (
    <>
      <div className=" overflow-y-auto pr-1">
        <h2 className="text-md font-semibold mb-2">Recommended Videos</h2>
        {videos.map((video, index) => {
          const videoId = video.id;
          const { title, thumbnails, channelTitle } = video.snippet;

          return (
            <div
              onClick={() => storeInHistory(video)}
              key={videoId + "_" + index}
              className="flex gap-2 mb-3 hover:bg-gray-100 rounded-lg p-1 transition duration-200 cursor-pointer"
            >
              <img
                src={thumbnails.medium.url}
                alt={title}
                className="w-40 h-24 object-cover rounded-md"
              />
              <div className="flex flex-col text-sm w-[calc(100%-10rem)]">
                <p className="font-semibold line-clamp-2 leading-tight">
                  {title}
                </p>
                <p className="text-gray-500 text-xs mt-1">{channelTitle}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div ref={bottomRef} className="h-10 my-4 col-span-full"></div>
      {loading && <p className="text-center text-gray-400">Loading...</p>}
    </>
  );
};

export default RecommendedVideos;
