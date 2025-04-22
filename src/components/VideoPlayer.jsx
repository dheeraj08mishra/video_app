function VideoPlayer({ videoId }) {
  const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=1&showinfo=0&modestbranding=1`;
  return (
    <iframe
      className="w-full h-full rounded-xl shadow-lg"
      src={videoUrl}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      title="YouTube Video Player"
    ></iframe>
  );
}

export default VideoPlayer;
