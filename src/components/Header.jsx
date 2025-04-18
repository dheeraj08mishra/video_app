import Sidebar from "./Sidebar";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../utils/redux/sidebarSlice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [loading, setLoading] = useState(false);

  const toggleSideBar = () => {
    dispatch(toggleSidebar());
  };

  const handleValueChange = (e) => {
    setSearchValue(e.target.value);
    setSelectedIndex(-1); // reset highlight
  };

  const handleClickOutside = (event) => {
    if (event.target.tagName !== "INPUT") {
      setSuggestions([]);
      setLoading(false);
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
        setLoading(true);
        fetchSuggestions(searchValue.trim());
      } else {
        setSuggestions([]);
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchValue]);

  const fetchSuggestions = async (query) => {
    try {
      const response = await fetch(
        `http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${query}`
      );
      const data = await response.json();
      setSuggestions(data[1]);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleSuggestionClick = (selectedQuery) => {
    setSearchValue(selectedQuery);
    setSuggestions([]);
    setLoading(false);

    navigate(`/results?search_query=${selectedQuery}`);
    setSelectedIndex(-1); // reset highlight
    setSearchValue("");
    setLoading(false);
    setSuggestions([]);
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      setSelectedIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (event.key === "ArrowUp") {
      setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : -1));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const selectedQuery =
        selectedIndex >= 0 ? suggestions[selectedIndex] : searchValue.trim();
      if (selectedQuery) {
        handleSuggestionClick(selectedQuery);
      }
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === "Escape") {
      setSuggestions([]);
      setLoading(false);
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
              onClick={() => handleSuggestionClick(searchValue.trim())}
            >
              🔍
            </button>
          </div>

          {loading && suggestions.length > 0 && (
            <ul className="absolute left-0 right-0 bg-white border border-gray-300 mt-1 rounded shadow z-50 max-h-60 overflow-y-auto">
              {suggestions.map((s, index) => (
                <li
                  key={index}
                  className={`px-4 py-2 flex items-center gap-2 cursor-pointer ${
                    index === selectedIndex
                      ? "bg-gray-300"
                      : "hover:bg-gray-200"
                  }`}
                  onClick={() => handleSuggestionClick(s)}
                >
                  <span>🔍</span>
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right Icons */}
        <div className="flex space-x-4 items-center">
          {/* Future icons like upload, notifications, user profile */}
        </div>
      </div>

      <Sidebar />
    </>
  );
};

export default Header;
