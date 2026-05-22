import React, { useState, useCallback } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar/NavBar';
import Header from '../components/Header/Header';
import SearchBar from '../components/Searchbar/SearchBar';
import BookCard from '../components/Bookcard/BookCard';
import Loader from '../components/Loader/Loader';
import { useSearch } from '../context/SearchContext';

const Home = () => {

  const {
    searchResults: books,
    setSearchResults: setBooks,
    lastQuery: searchTerm,
    setLastQuery: setSearchTerm
  } = useSearch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

  // Categories for recommendation Feature
  const categories = ['Fiction', 'Comics', 'Self-Help', 'Fantasy', 'Science'];

  const fetchBooks = useCallback(async (queryOverride = null) => {
    const queryToUse = queryOverride || searchTerm;
    if (!queryToUse.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${queryToUse}&maxResults=40&printType=books&langRestrict=en&key=${API_KEY}`
      );

      const items = response.data.items || [];

      // Keep image filter so the UI stays clean
      const booksWithImages = items.filter(
        (book) => book.volumeInfo && book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail
      );

      setBooks(booksWithImages);

    } catch (err) {
      setError('Failed to fetch books. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [searchTerm, API_KEY, setBooks]);

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      fetchBooks();
    }
  };

  const handleCategoryClick = (category) => {
    const specialQuery = `subject:${category.toLowerCase()}`;
    setSearchTerm(category);
    fetchBooks(specialQuery);
  };

  return (
    <div
      className="bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop')" }}
    >
      <div className="bg-[#1b1e2a5f] backdrop-blur-sm min-h-screen transition-colors duration-300">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Header />

          <div className="mt-8">
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              handleSearch={handleSearch}
            />
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => handleCategoryClick(category)}
                  className="px-5 py-2 rounded-full bg-gray-900/80 hover:bg-blue-600 text-gray-300 hover:text-white border border-gray-600 hover:border-blue-500 font-medium transition-all duration-300 backdrop-blur-md shadow-lg flex items-center gap-2"
                >
                  {category === 'Comics' ? '🦸‍♂️' : category === 'Fiction' ? '📚' : category === 'Self-Help' ? '🧠' : category === 'Fantasy' ? '🐉' : '🔬'}
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-12">
            {loading && <Loader />}

            {error && <p className="text-center text-red-500 text-lg">{error}</p>}

            {!loading && !error && books.length === 0 && searchTerm && (
              <p className="text-center text-gray-300 text-lg">
                No books found for your query.
              </p>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;