import React from "react";
import { Search } from "lucide-react";

const SearchBar = ({ searchTerm, setSearchTerm, handleSearch }) => {
  const onFormSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <form onSubmit={onFormSubmit} className="w-full max-w-xl mx-auto">
      <div className="relative flex items-center group">
        <input
          type="text"
          placeholder="Search for books by title, author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full lg:pl-5 pl-3 pr-16 py-3 lg:text-lg text-white bg-gray-700 border-2 border-gray-600 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm"
        />
        <button
          type="submit"
          className="absolute right-0 top-0 h-full lg:px-5 px-3.5 text-gray-300 bg-blue-500 hover:bg-blue-700 rounded-r-xl hover:text-white focus:outline-none transition-colors duration-300"
          aria-label="Search"
        >
          <Search
            size={20}
            className="transition-transform duration-300 group-hover:scale-110"
          />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
