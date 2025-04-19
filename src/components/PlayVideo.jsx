import { useSearchParams } from "react-router-dom";
import Comments from "./Comments";
const PlayVideo = () => {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=1&showinfo=0&modestbranding=1`;
  console.log(videoUrl);
  return (
    <>
      <div className="w-full max-w-4xl p-4 aspect-video">
        <iframe
          className="w-full h-full rounded-xl shadow-lg"
          src={videoUrl}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          title="YouTube Video Player"
        ></iframe>
      </div>
      <div className="flex flex-col p-4">
        <Comments videoId={videoId} />
      </div>
    </>
  );
};
export default PlayVideo;
