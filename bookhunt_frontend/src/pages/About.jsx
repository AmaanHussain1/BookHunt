import React from 'react';
import Navbar from '../components/Navbar/NavBar';

const About = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar />
      <div className="container mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold text-center text-blue-500 mb-8">
          About <span className='text-white'>BookHunt</span>
        </h1>

        <div className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
          <p className="text-lg mb-6 text-gray-300 leading-relaxed">
            Welcome to <span className="font-semibold text-white">BookHunt</span>, your secure digital sanctuary for book discovery and curation. We moved beyond simple searching to give you a personalized space to build the library of your dreams.
          </p>

          <p className="text-lg mb-6 text-gray-300 leading-relaxed">
            Powered by the <span className="text-blue-400">Google Books API</span> on the frontend, BookHunt utilizes a custom-built Java backend to ensure your data is safe. With our robust architecture, you can create a secure account, log in from any device, and save your favorite books into your personal collection for safekeeping.
          </p>

          <div className="mt-8 pt-6 border-t border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Built With Modern Tech</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-400">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span> React & Vite (Frontend UI)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span> Tailwind CSS (Responsive Design)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span> Spring Boot & Java (REST API)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span> PostgreSQL (Relational Database)
              </li>
              <li className="flex items-center gap-2 mt-2 sm:mt-0 col-span-1 sm:col-span-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span> Spring Security & JWT (Stateless Authentication)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;