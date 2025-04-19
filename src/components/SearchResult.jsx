import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { YOUTUBE_Search_API_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { closeSidebar } from "../utils/redux/sidebarSlice";

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const query = searchParams.get("search_query");

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${YOUTUBE_Search_API_URL}&q=${query}`);
        const data = await response.json();
        if (data?.error?.errors?.[0]?.reason === "quotaExceeded") {
          navigate("/error", {
            state: {
              message: "YouTube API quota exceeded. Please try again later.",
              status: 403,
              statusText: "Quota Exceeded",
            },
          });
          return;
        }
        setSearchResults(data.items || []);
      } catch (error) {
        navigate("/error", {
          state: {
            message: "Something went wrong while fetching search results.",
            status: 500,
            statusText: "Internal Error",
          },
        });
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  const handleVideoClick = (videoId) => {
    dispatch(closeSidebar());
    navigate(`/watch?v=${videoId}`);
  };

  return (
    <div className="px-4 py-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Search results for "{query}"</h1>

      {loading ? (
        <p>Loading...</p>
      ) : searchResults.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {searchResults.map((video) => {
            const snippet = video.snippet;
            const videoId = video.id.videoId;
            if (!videoId || !snippet?.thumbnails) return null;

            return (
              <div
                key={videoId}
                className="flex flex-col sm:flex-row gap-4 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition"
                onClick={() => handleVideoClick(videoId)}
              >
                <div className="w-full sm:w-64 aspect-video rounded-lg overflow-hidden">
                  <img
                    src={snippet.thumbnails.medium.url}
                    alt={snippet.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-start">
                  <h2 className="text-lg font-semibold line-clamp-2">
                    {snippet.title}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {snippet.channelTitle} •{" "}
                    {new Date(snippet.publishedAt).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-700 mt-2 line-clamp-3">
                    {snippet.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchResult;
