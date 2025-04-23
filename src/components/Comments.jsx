import { useEffect } from "react";
import { YOUTUBE_COMMENT_API_URL } from "../utils/constants";
import NestedComments from "./NestedComments";
import { useDispatch, useSelector } from "react-redux";
import { setComments, setLoading } from "../utils/redux/commentSlice";

const Comments = ({ videoId }) => {
  const dispatch = useDispatch();
  const comments = useSelector((store) => store.comment.comments);
  const loading = useSelector((store) => store.comment.loading);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`${YOUTUBE_COMMENT_API_URL}${videoId}`, {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        });
        if (!response.ok) {
          // throw new Error("Failed to fetch comments");
          dispatch(setComments([]));
          dispatch(setLoading(false));
          return;
        }
        const data = await response.json();
        dispatch(setComments(data.items));
        dispatch(setLoading(true));
      } catch (error) {
        // console.error("Error fetching comments:", error);
        dispatch(setComments([]));
        dispatch(setLoading(false));
      }
    };
    if (videoId) fetchComments();
  }, [videoId]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Comments</h2>
      {loading && comments.length === 0 ? (
        <p>No comments found.</p>
      ) : (
        comments.map((thread) => (
          <NestedComments
            key={thread.id}
            comments={{
              ...thread.snippet.topLevelComment,
              replies: thread.replies,
            }}
          />
        ))
      )}
    </div>
  );
};

export default Comments;
