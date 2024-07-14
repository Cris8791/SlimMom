//Src/Pages/RegisterPage/RegisterPage.jsx
import { NavBar } from 'components/NavBar/NavBar.jsx';
import Registration from 'components/Registration/Registration.jsx';
import React from 'react';
import styles from '../HomePage/Home.module.css';

export const RegisterPage = () => {
  return (
    <div className={styles.homepage}>
      <NavBar />
      <Registration />
    </div>
  );
};
