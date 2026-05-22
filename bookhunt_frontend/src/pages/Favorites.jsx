import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar/NavBar';
import BookCard from '../components/Bookcard/BookCard';
import Loader from '../components/Loader/Loader';
import { UserAuth } from '../context/AuthContext';
import api from '../api/axiosConfig';

const Favorites = () => {
  const [savedBooks, setSavedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = UserAuth();

  // Decode Username
  let username = null;
  if (user?.token) {
    try {
      username = JSON.parse(atob(user.token.split('.')[1])).sub;
    } catch (e) {}
  }

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!username) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get(`/favorites/${username}`);
        
        // Map the Spring Boot DB format to match the Google API format (BookCard)
        const mappedBooks = response.data.map(dbBook => ({
          id: dbBook.apiBookId,
          volumeInfo: {
            title: dbBook.title,
            authors: [dbBook.author],
            imageLinks: { thumbnail: dbBook.thumbnailUrl }
          }
        }));
        
        setSavedBooks(mappedBooks);
      } catch (err) {
        console.error(err);
        setError('Failed to load your collection.');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [username]);

  if (loading) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar />
      <div className="container mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-8 border-b border-gray-700 pb-4">My Collection</h1>
        
        {!username ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-400 mb-4">Please log in to view your collection.</p>
            <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold">
              Sign In
            </Link>
          </div>
        ) : error ? (
          <p className="text-center text-red-500 text-xl py-10">{error}</p>
        ) : savedBooks.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-400 mb-4">Your collection is empty.</p>
            <Link to="/" className="text-blue-500 hover:underline text-lg">
              Go find some books!
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {savedBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;