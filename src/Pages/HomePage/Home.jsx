//Src/Pages/HomePage/Home.jsx
import React from 'react';
// import NavBar from 'components/NavBar/NavBar.jsx';
import IntakeCalories from 'components/IntakeCalories/IntakeCalories.jsx';
import styles from './Home.module.css';

export default function Home() {
  return (
    <div className={styles.homepage}>

      <IntakeCalories />
    </div>
  );
}
