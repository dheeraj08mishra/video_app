import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../utils/redux/sidebarSlice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { storedSuggestions } from "../utils/redux/suggestionSlice";
import { searchEncodeQuery } from "../utils/constants";
import {
  setLoading,
  setSearchValue,
  setSelectedIndex,
  setSuggestions,
  clearSuggestions,
} from "../utils/redux/searchSlice";
import { logout } from "../utils/redux/userSlice";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useState } from "react";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user.currentUser);
  const storedKeyword = useSelector((store) => store.suggestion.keyword);
  const searchValue = useSelector((store) => store.search.value);
  const suggestions = useSelector((store) => store.search.suggestions);
  const selectedIndex = useSelector((store) => store.search.selectedIndex);
  const loading = useSelector((store) => store.search.loading);

  const toggleSideBar = () => {
    dispatch(toggleSidebar());
  };

  const handleValueChange = (e) => {
    dispatch(setSearchValue(e.target.value));
    dispatch(setSelectedIndex(-1)); // reset highlight
  };

  const handleClickOutside = (event) => {
    if (event.target.tagName !== "INPUT") {
      dispatch(clearSuggestions());
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchValue.trim()) {
        dispatch(setLoading(true));
        if (storedKeyword[searchValue.trim()]) {
          setSuggestions(storedKeyword[searchValue.trim()]);
          return;
        }
        fetchSuggestions(searchValue.trim());
      } else {
        dispatch(clearSuggestions());
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue]);

  const fetchSuggestions = async (query) => {
    try {
      const response = await fetch(
        `http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${query}`
      );
      const data = await response.json();
      dispatch(setSuggestions(data[1]));
      dispatch(storedSuggestions({ [data[0]]: data[1] }));
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

  const handleSuggestionClick = (selectedQuery) => {
    dispatch(setSearchValue(selectedQuery));
    dispatch(clearSuggestions());

    navigate(`/results?search_query=${selectedQuery}`);
    dispatch(setSearchValue(""));
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      const newIndex =
        selectedIndex < suggestions.length - 1
          ? selectedIndex + 1
          : selectedIndex;
      dispatch(setSelectedIndex(newIndex));
    } else if (event.key === "ArrowUp") {
      const newIndex = selectedIndex > 0 ? selectedIndex - 1 : -1;
      dispatch(setSelectedIndex(newIndex));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const selectedQuery =
        selectedIndex >= 0 ? suggestions[selectedIndex] : searchValue.trim();
      if (selectedQuery) {
        handleSuggestionClick(searchEncodeQuery(selectedQuery));
      }
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === "Escape") {
      dispatch(clearSuggestions());
    }
  };

  const handleUser = async () => {
    if (user) {
      try {
        await signOut(auth); // Firebase logout
        dispatch(logout()); // Redux logout
        navigate("/"); // Redirect to home
      } catch (err) {
        console.error("Error signing out:", err);
      }
    } else {
      navigate("/login"); // Optional: take to login page instead of "/"
    }
  };

  return (
    <>
      <div className="flex justify-between items-center px-4 py-2 shadow-md sticky top-0 bg-white z-50">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSideBar}
            className="text-xl px-2 cursor-pointer"
          >
            ≣
          </button>
          <Link to="/">
            <img
              className="w-24"
              src="https://www.gstatic.com/youtube/img/promos/growth/b337061115c0cba2c061eeb6dc208053b439bbeabc4a49c0374f4687dd27cf8c_244x112.webp"
              alt="logo"
            />
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex-grow max-w-xl mx-4 relative">
          <div className="flex">
            <input
              type="text"
              value={searchValue}
              onChange={handleValueChange}
              onFocus={() => setLoading(true)}
              onBlur={() => setTimeout(() => setLoading(false), 200)}
              onKeyDown={handleKeyDown}
              onKeyUp={handleKeyUp}
              className="flex-grow p-2 border border-gray-300 rounded-l-full focus:outline-none"
              placeholder="Search"
            />
            <button
              className="bg-gray-200 px-4 rounded-r-full border border-gray-300"
              onClick={() =>
                handleSuggestionClick(searchEncodeQuery(searchValue))
              }
            >
              🔍
            </button>
          </div>

          {loading && suggestions.length > 0 && (
            <ul className="absolute left-0 right-0 bg-white border border-gray-300 mt-1 rounded shadow z-50 max-h-60 overflow-y-auto">
              {suggestions.map((data, index) => (
                <li
                  key={index}
                  className={`px-4 py-2 flex items-center gap-2 cursor-pointer ${
                    index === selectedIndex
                      ? "bg-gray-300"
                      : "hover:bg-gray-200"
                  }`}
                  onClick={() => handleSuggestionClick(searchEncodeQuery(data))}
                >
                  <span>🔍</span>
                  {data}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right Icons */}
        <div className="flex space-x-4 items-center">
          {/* Future icons like upload, notifications, user profile */}
          {/* <button className="text-xl px-2 cursor-pointer"> logout</button> */}
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="text-xl px-2 relative"
          >
            <img
              className="w-8 h-8 rounded-full cursor-pointer"
              src={
                user?.photoURL ||
                "https://yt3.ggpht.com/yti/ANjgQV-JfW-A1DLg03Se5RByMUDC1LxlmyZtaZrZz5DHfePlJUwd=s88-c-k-c0x00ffffff-no-rj"
              }
              alt="user"
            />
          </button>
          {showDropdown && (
            <div className="absolute right-4 top-14 bg-white border rounded-lg shadow-lg z-50 w-48">
              <ul className="text-sm text-gray-700">
                <li className="px-4 py-2 hover:bg-gray-100">{user?.email}</li>
                <hr />
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setShowDropdown(false);
                    // navigate("/channel");
                  }}
                >
                  👤 Your Channel
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setShowDropdown(false);
                    // navigate("/watch-history");
                  }}
                >
                  📺 Watch History
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setShowDropdown(false);
                    // navigate("/settings");
                  }}
                >
                  ⚙️ Settings
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={handleUser}
                >
                  🚪 Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <Sidebar />
    </>
  );
};

export default Header;
