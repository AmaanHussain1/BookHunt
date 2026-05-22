import React from 'react';

const Header = () => {
  return (
    <header className="text-center py-6 lg:py-12">
      <h1 className="lg:text-5xl text-2xl font-bold text-white mb-3">
        Start Your BookHunt
      </h1>
      <p className="text-sm lg:text-lg text-gray-400 max-w-2xl mx-auto">
        Explore a vast library of books. Search by title, author, or keyword to discover your next adventure, and <span className="text-blue-400">save your favorites</span> to build your personal collection.
      </p>
    </header>
  );
};

export default Header;