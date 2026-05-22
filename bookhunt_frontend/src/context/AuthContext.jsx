import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/axiosConfig';

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token }); 
    }
  }, []);

  const createUser = async (email, password, username) => {
    const response = await api.post('/auth/signup', {
      username,
      email,
      password
    });
    return response.data;
  };

  // Verify Email
  const verifyEmail = async (email, otp) => {
    const response = await api.post('/auth/verify', {
      email,
      otp
    });
    return response.data;
  };

  const signIn = async (username, password) => {
    const response = await api.post('/auth/login', {
      username,
      password
    });
    
    const token = response.data; 
    localStorage.setItem('token', token);
    setUser({ token });
  };

  const logout = () => {
    localStorage.removeItem('token'); 
    setUser(null); 
  };

  return (
    <UserContext.Provider value={{ createUser, verifyEmail, user, logout, signIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};