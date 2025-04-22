import { useEffect, useRef } from "react";
import { FaPause, FaPlay, FaPaperPlane } from "react-icons/fa";
import { dummyMessages } from "../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import {
  setChatMessages,
  setIsPaused,
  setIsTyping,
  setUserInput,
} from "../utils/redux/chatSlice";

import { YOUTUBE_API_URL } from "../utils/constants";

const randomAvatar = () =>
  `https://i.pravatar.cc/40?img=${Math.floor(Math.random() * 70) + 1}`;

const LiveChat = ({ videoId }) => {
  const dispatch = useDispatch();
  const isPaused = useSelector((store) => store.chat.isPaused);
  const isTyping = useSelector((store) => store.chat.isTyping);
  const chatMessages = useSelector((store) => store.chat.chatMessages);
  const userInput = useSelector((store) => store.chat.userInput);
  const chatRef = useRef();

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatMessages]);

  useEffect(() => {
    if (isPaused) return;

    const typingTimeout = setTimeout(() => {
      dispatch(setIsTyping(true));
      const sendTimeout = setTimeout(() => {
        const randomMessage =
          dummyMessages[Math.floor(Math.random() * dummyMessages.length)];
        const newMessage = {
          id: Date.now(),
          userName: `User${Math.floor(Math.random() * 1000)}`,
          message: randomMessage,
          avatar: randomAvatar(),
        };
        const updated = [...chatMessages.slice(-299), newMessage];
        dispatch(setChatMessages(updated));
        dispatch(setIsTyping(false));
      }, 1500);
      return () => clearTimeout(sendTimeout);
    }, 2000);

    return () => clearTimeout(typingTimeout);
  }, [chatMessages, isPaused]);

  useEffect(() => {
    const fetchRecomResults = async () => {
      try {
        const response = await fetch(YOUTUBE_API_URL);
        const data = await response.json();

        console.log(data);
      } catch (error) {
        navigate("/error", {
          state: {
            message: "Something went wrong while fetching search results.",
            status: 500,
            statusText: "Internal Error",
          },
        });
      }
    };

    if (videoId) {
      fetchRecomResults();
    }
  }, [videoId]);

  const handleSend = () => {
    if (!userInput.trim()) return;
    const userMessage = {
      id: Date.now(),
      userName: "You",
      message: userInput.trim(),
      avatar: randomAvatar(),
    };
    const updated = [...chatMessages.slice(-299), userMessage];
    dispatch(setChatMessages(updated));
    dispatch(setUserInput(""));
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Live Chat</h2>
        <button
          className="text-sm text-white bg-gray-800 px-3 py-1 rounded hover:bg-gray-700"
          onClick={() => dispatch(setIsPaused(!isPaused))}
        >
          {isPaused ? (
            <span className="flex items-center gap-1">
              <FaPlay /> Resume
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <FaPause /> Pause
            </span>
          )}
        </button>
      </div>

      {/* Messages */}
      <div
        ref={chatRef}
        className="flex-grow overflow-y-scroll space-y-2 mb-2 pr-1"
      >
        {chatMessages.map((msg) => (
          <div key={msg.id} className="flex gap-2 items-start text-sm">
            <img
              src={msg.avatar}
              alt="avatar"
              className="w-8 h-8 rounded-full"
            />
            <div>
              <span className="font-semibold">{msg.userName}: </span>
              <span>{msg.message}</span>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="text-gray-500 italic text-xs mt-2 ml-10">
            Someone is typing...
          </div>
        )}
      </div>

      {/* Input */}
      <div className="mt-auto flex items-center gap-2">
        <input
          type="text"
          placeholder="Send a message..."
          className="flex-grow border border-gray-300 rounded px-2 py-1 text-sm"
          value={userInput}
          onChange={(e) => dispatch(setUserInput(e.target.value))}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="text-white bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default LiveChat;
