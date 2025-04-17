import { useSearchParams } from "react-router-dom";
const PlayVideo = () => {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=1&showinfo=0&modestbranding=1`;
  console.log(videoUrl);
  return (
    // <div className="flex justify-center items-start p-4">
    <div className="w-full max-w-4xl p-4 aspect-video">
      <iframe
        className="w-full h-full rounded-xl shadow-lg"
        src={videoUrl}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        title="YouTube Video Player"
      ></iframe>
      {/* </div> */}
    </div>
  );
};
export default PlayVideo;
