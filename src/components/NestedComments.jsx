const NestedComments = ({ comments }) => {
  if (!comments) return null;
  const {
    authorDisplayName,
    authorProfileImageUrl,
    textDisplay,
    likeCount,
    publishedAt,
  } = comments.snippet;
  const replies = comments.replies?.comments || [];

  return (
    <div className="flex flex-col border-b border-gray-200 mb-4 pl-4">
      <div className="flex items-start gap-3 mb-2">
        <img
          src={authorProfileImageUrl}
          alt="profile"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="font-semibold text-sm">{authorDisplayName}</p>
          <p
            className="text-sm text-gray-800"
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
