import React, { useEffect } from 'react';
import './App.css';
import Router from './Router';
import axios from 'axios';
import { currentuserKey, key } from './key';
import Header from './components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from './redux/currentUserSlice';
import { RootState } from './redux/store';
import NonRouter from './NonRouter';

function App() {
  const dispatch = useDispatch();
  const getCurrentUser = localStorage.getItem(currentuserKey);
  const currentUser = useSelector((state: RootState) => state.currentUser);

  useEffect(() => {
    if (getCurrentUser) {
      const currentUserData = JSON.parse(getCurrentUser)
      dispatch(setCurrentUser(currentUserData))  
    }
  }, []);

  return (
    <>
    <Header/>
    {currentUser ? (
      <Router />
    ) : (
      <NonRouter />
    )}
    </>
  );
}

export const rails = axios.create({
  baseURL: 'http://localhost:5000/',
  headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
  },
  responseType: 'json'
});

rails.interceptors.request.use(
  (config) => {
    if (!config.headers['Authorization']) {
      config.headers['Authorization'] = `Bearer ${localStorage.getItem(key)}`
    }
    return config
  },
  (error) => Promise.reject(error)
);

export default App;
