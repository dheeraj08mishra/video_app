const Youtube_Api_Key = process.env.REACT_APP_YOUTUBE_API_KEY;
export const YOUTUBE_API_URL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&relevanceLanguage=en&maxResults=50&key=${Youtube_Api_Key}`;

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};
