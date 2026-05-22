import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [lastQuery, setLastQuery] = useState(''); 

  const resetSearch = () => {
    setSearchResults([]);
    setLastQuery('');
  };

  return (
    <SearchContext.Provider value={{ searchResults, setSearchResults, lastQuery, setLastQuery, resetSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  return useContext(SearchContext);
};