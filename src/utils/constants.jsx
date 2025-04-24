const Youtube_Api_Key = process.env.REACT_APP_YOUTUBE_API_KEY;
export const YOUTUBE_API_URL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=IN&relevanceLanguage=en&maxResults=20&key=${Youtube_Api_Key}`;

export const YOUTUBE_Search_API_URL = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&key=${Youtube_Api_Key}`;
export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};
export const searchEncodeQuery = (query) => query.trim().split(" ").join("+");

export const YOUTUBE_COMMENT_API_URL = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=replies%2Csnippet%2Cid&maxResults=50&order=relevance&key=${Youtube_Api_Key}&videoId=`;

export const YOUTUBE_RECOMMENDATION_API_URL = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=25&key=${Youtube_Api_Key}&relatedToVideoId=`;

export const emojiList = [
  "😄",
  "🔥",
  "😂",
  "🎉",
  "😍",
  "👍",
  "🥳",
  "💯",
  "😎",
  "🤔",
];
export const dummyMessages = [
  "This video is 🔥🔥🔥",
  "Can't stop watching!",
  "The editing is top-notch 🎬",
  "Who's watching in 2025? 😂",
  "Legendary content 👏",
  "This deserves more views 💯",
  "Amazing work by the creator!",
  "Any recommendations like this one?",
  "I just learned so much!",
  "Can someone explain the last part?",
];

export const YOUTUBE_API_URL_VideoCategories =
  "https://youtube.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=IN&key=" +
  Youtube_Api_Key;
