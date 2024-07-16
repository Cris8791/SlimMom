//Src/Pages/RegisterPage/RegisterPage.jsx
import React from 'react';
import NavBar from 'components/NavBar/NavBar.jsx';
import Registration from 'components/Registration/Registration.jsx';
import styles from './RegisterPage.module.css';

export default function RegisterPage() {
  return (
    <div className={styles.registerpage}>
      <NavBar />
      <Registration />
    </div>
  );
};
