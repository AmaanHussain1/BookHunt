import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  // Safe data extraction
  const title = book.volumeInfo.title || 'No Title Available';
  const author = book.volumeInfo.authors ? book.volumeInfo.authors[0] : 'Unknown Author';
  const thumbnail = book.volumeInfo.imageLinks?.thumbnail || 'https://placehold.co/128x192/1f2937/ffffff?text=No+Cover';

  return (
    <div className="relative group h-full">
      <Link 
        to={`/book/${book.id}`} 
        key={book.id} 
        className="block bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 ease-in-out h-full border border-gray-700 hover:border-blue-500"
      >
        <div className="relative">
          <img
            src={thumbnail}
            alt={`Cover of ${title}`}
            className="w-full h-48 object-cover"
            onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/128x192/1f2937/ffffff?text=No+Cover'; }}
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold truncate text-white mb-1">{title}</h3>
          <p className="text-sm text-gray-400 truncate">{author}</p>
        </div>
      </Link>
    </div>
  );
};

export default BookCard;