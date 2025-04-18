const Youtube_Api_Key = process.env.REACT_APP_YOUTUBE_API_KEY;
export const YOUTUBE_API_URL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=IN&relevanceLanguage=en&maxResults=50&key=${Youtube_Api_Key}`;
export const YOUTUBE_Search_API_URL = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=surfing&key=${Youtube_Api_Key}`;
export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};
