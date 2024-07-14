//Src/Pages/LoginPage/LoginPage.jsx
import Login  from 'components/Login/Login.jsx';
import NavBar from 'components/NavBar/NavBar.jsx';
import React from 'react';
import styles from '../HomePage/Home.module.css';

export const LoginPage = () => {
  return (
    <div className={styles.homepage}>
      <NavBar />
      <Login />
    </div>
  );
};
