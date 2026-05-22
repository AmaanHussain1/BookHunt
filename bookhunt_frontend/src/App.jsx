import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import BookDetails from './pages/BookDetails.jsx';
import SignUp from './pages/SignUp.jsx';
import Login from './pages/Login.jsx';
import Favorites from './pages/Favorites.jsx';

const App = () => {
  return (
    <div className="bg-gray-900 min-h-screen">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/book/:bookId' element={<BookDetails />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/collection' element={<Favorites />} />
      </Routes>
    </div>
  );
};

export default App;