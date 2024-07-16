//Src/Pages/LoginPage/LoginPage.jsx
import React from 'react';
import NavBar from 'components/NavBar/NavBar.jsx';


import Login from 'components/Login/Login.jsx';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  return (
    <div className={styles.loginpage}>
     
      <Login />
    </div>
  );
};
