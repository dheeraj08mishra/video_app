import { useSelector, useDispatch } from "react-redux";
import { removeFromHistory, clearHistory } from "../utils/redux/historySlice";
import { saveHistoryToFirebase } from "../utils/redux/historyThunk";
import { useEffect } from "react";

const WatchHistory = () => {
  const watchHistory = useSelector((store) => store.history.history);
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.currentUser);

  const handleRemoveFromHistory = (video) => {
    const videoId = video.id.videoId || video.id;
    dispatch(removeFromHistory({ id: videoId }));
  };

  const handleClearAll = () => {
    dispatch(clearHistory());
  };

  useEffect(() => {
    if (user?.uid) {
      dispatch(saveHistoryToFirebase(user.uid, watchHistory));
    }
  }, [watchHistory, user?.uid]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Watch History</h2>
        {watchHistory.length > 0 && (
          <button
            onClick={handleClearAll}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Clear All
          </button>
        )}
      </div>

      {watchHistory.length === 0 ? (
        <p className="text-gray-500">No videos in your watch history.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 w-1/2">
          {watchHistory.length &&
            watchHistory.map((video, index) => {
              const videoId = video.id.videoId || video.id;
              const { title, thumbnails, channelTitle } = video.snippet;

              return (
                <div
                  key={`${videoId}_${index}`}
                  className="flex gap-4 items-start hover:bg-gray-100 p-3 rounded-lg transition"
                >
                  <a
                    href={`https://www.youtube.com/watch?v=${videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={thumbnails.medium.url}
                      alt={title}
                      className="w-40 h-24 object-cover rounded-md"
                    />
                  </a>

                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <p className="font-semibold line-clamp-2">{title}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {channelTitle}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRemoveFromHistory(video)}
                    className="text-red-500 text-lg hover:text-red-700"
                    title="Remove from history"
                  >
                    ❌
                  </button>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default WatchHistory;
