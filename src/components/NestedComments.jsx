import { useSelector } from "react-redux";
const NestedComments = ({ comments }) => {
  const isDarkMode = useSelector((store) => store.toggleDarkMode.darkMode);
  if (!comments) return null;
  const {
    authorDisplayName,
    authorProfileImageUrl,
    textDisplay,
    likeCount,
    publishedAt,
  } = comments.snippet;
  const replies = comments.replies?.comments || [];
  const textColor = isDarkMode ? "text-white" : "text-gray-800";
  // const backgroundColor = isDarkMode ? "bg-gray-800" : "bg-white";
  const borderColor = isDarkMode ? "border-gray-700" : "border-gray-200";
  const textDisplayStyle = isDarkMode ? "text-gray-300" : "text-gray-800";

  return (
    <div className={`flex flex-col border mb-4 pl-4 ${borderColor}`}>
      <div className="flex items-start gap-3 mb-2">
        <img
          src={authorProfileImageUrl}
          alt="profile"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="font-semibold text-sm">{authorDisplayName}</p>
          <p
            className={`text-sm ${textDisplayStyle} ${textColor}`}
            style={{ wordBreak: "break-word" }}
            dangerouslySetInnerHTML={{ __html: textDisplay }}
          />
          <div className="text-xs text-gray-500 mt-1">
            👍 {likeCount} • {new Date(publishedAt).toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Recursive rendering of replies */}
      {replies.length > 0 && (
        <div className="pl-6 border-l border-gray-300">
          {replies.map((reply) => (
            <NestedComments key={reply.id} comments={reply} />
          ))}
        </div>
      )}
    </div>
  );
};
export default NestedComments;
