const Buttonset = () => {
  return (
    <div className="flex overflow-x-auto gap-3 px-4 py-2">
      <button className="text-white bg-gray-600 hover:bg-gray-950 px-4 py-2 rounded-lg shadow-md transition duration-300">
        Cricket
      </button>
      <button className="text-white bg-gray-600 hover:bg-gray-950 px-4 py-2 rounded-lg shadow-md transition duration-300">
        Football
      </button>
      <button className="text-white bg-gray-600 hover:bg-gray-950 px-4 py-2 rounded-lg shadow-md transition duration-300">
        Tennis
      </button>
      <button className="text-white bg-gray-600 hover:bg-gray-950 px-4 py-2 rounded-lg shadow-md transition duration-300">
        News
      </button>
      <button className="text-white bg-gray-600 hover:bg-gray-950 px-4 py-2 rounded-lg shadow-md transition duration-300">
        Movies
      </button>
    </div>
  );
};

export default Buttonset;
