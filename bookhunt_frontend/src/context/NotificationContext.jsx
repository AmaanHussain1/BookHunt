import React, { createContext, useContext, useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({
    message: '',
    type: 'info',
    isVisible: false
  });

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type, isVisible: true });
    

    setTimeout(() => {
      setNotification((prev) => ({ ...prev, isVisible: false }));
    }, 3000);
  };

  const closeNotification = () => {
    setNotification((prev) => ({ ...prev, isVisible: false }));
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      
      {/* RESPONSIVE NOTIFICATION UI COMPONENT */}
      <div 
        className={`fixed z-[100] transition-all duration-300 transform 
          /* MOBILE STYLES: Centered at top, 90% width */
          top-24 left-1/2 -translate-x-1/2 w-[90%] max-w-sm
          /* DESKTOP STYLES: Top Right, auto width */
          md:top-24 md:right-5 md:left-auto md:translate-x-0 md:w-auto
          ${notification.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5 pointer-events-none'}
        `}
      >
        <div className={`flex items-center justify-between gap-3 px-6 py-4 rounded-lg shadow-2xl border backdrop-blur-sm ${
          notification.type === 'error' 
            ? 'bg-red-900/95 border-red-500 text-white' 
            : 'bg-green-900/95 border-green-500 text-white'
        }`}>
          <div className="flex items-center gap-3">
             {notification.type === 'error' ? <AlertCircle size={24} className="shrink-0" /> : <CheckCircle size={24} className="shrink-0" />}
             <p className="font-medium text-sm sm:text-base">{notification.message}</p>
          </div>
          <button onClick={closeNotification} className="ml-4 hover:opacity-70 shrink-0 p-1">
            <X size={18} />
          </button>
        </div>
      </div>
      
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  return useContext(NotificationContext);
};