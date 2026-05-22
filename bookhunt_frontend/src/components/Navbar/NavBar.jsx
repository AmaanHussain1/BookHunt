import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Library, X, AlignJustify, LogOut } from 'lucide-react';
import { UserAuth } from '../../context/AuthContext';
import { useSearch } from '../../context/SearchContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = UserAuth();
  const { resetSearch } = useSearch();
  const navigate = useNavigate();

  // Decode the JWT token to get the username
  let username = "BookHunter";
  if (user?.token) {
    try {
      const payload = JSON.parse(atob(user.token.split('.')[1]));
      username = payload.sub; // 'sub' is where Spring Boot stored username
    } catch (e) {
      console.error("Could not decode token");
    }
  }

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
    resetSearch();
  };

  const handleResetAndNav = () => {
    resetSearch();
    setIsOpen(false);
  };

  const closeMenu = () => setIsOpen(false);

  const linkClass = ({ isActive }) =>
    `font-medium transition-colors duration-300 ${isActive ? 'text-blue-500' : 'text-gray-400 hover:text-blue-500'}`;

  return (
    <nav className="bg-[#101928] backdrop-blur-md shadow-lg sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-5 py-3.5">
        <div className="flex justify-between items-center">

          <NavLink to="/" onClick={handleResetAndNav} className="flex items-center gap-2 z-50">
            <Library className="text-blue-500" size={30} />
            <span className="text-xl font-bold text-white">
              Book<span className="text-blue-500">Hunt</span>
            </span>
          </NavLink>

          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" onClick={handleResetAndNav} className={linkClass}>Home</NavLink>
            <NavLink to="/about" className={linkClass}>About</NavLink>
            <NavLink to="/collection" onClick={handleResetAndNav} className={linkClass}>My Collection</NavLink>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {user?.token ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-400 text-sm">
                  Hello, <span className="text-white font-bold">{username}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-2"
                >
                  <LogOut size={17} /> Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <NavLink to="/login" className="text-gray-300 hover:text-blue-500 font-medium transition-colors">
                  Sign In
                </NavLink>
                <NavLink to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md font-medium transition-colors shadow-lg shadow-blue-500/30">
                  Sign Up
                </NavLink>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-500 focus:outline-none">
              {isOpen ? <X size={28} /> : <AlignJustify size={28} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div className={`${isOpen ? 'block' : 'hidden'} md:hidden mt-4 pb-4 bg-[#182030] rounded-lg p-4`}>
          <div className="flex flex-col space-y-4">
            <NavLink to="/" className={linkClass} onClick={handleResetAndNav}>Home</NavLink>
            <NavLink to="/about" className={linkClass} onClick={closeMenu}>About</NavLink>
            <NavLink to="/collection" className={linkClass} onClick={handleResetAndNav}>My Collection</NavLink>

            <div className="border-t border-gray-300 my-2 pt-2">
              {user?.token ? (
                <div className="flex flex-col gap-4">
                  <span className="text-gray-400 text-sm">
                    Signed in as: <span className="text-gray-100 font-bold">{username}</span>
                  </span>
                  <button onClick={handleLogout} className="bg-red-500 text-white py-2 rounded-md">
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <NavLink to="/login" className="text-center text-gray-300 py-2 border border-gray-400 rounded-md" onClick={closeMenu}>
                    Sign In
                  </NavLink>
                  <NavLink to="/signup" className="text-center bg-blue-600 text-white py-2 rounded-md" onClick={closeMenu}>
                    Sign Up
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;