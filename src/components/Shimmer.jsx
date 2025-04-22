const Shimmer = () => {
  return (
    <div className="animate-pulse rounded-xl overflow-hidden bg-gray-200">
      <div className="aspect-video bg-gray-300" />
      <div className="p-3 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-3/4" />
        <div className="h-3 bg-gray-300 rounded w-1/2" />
      </div>
    </div>
  );
};
export default Shimmer;
