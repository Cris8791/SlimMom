import //Src/Pages/DiaryPage/DiaryPage.jsx
React from 'react';
import styles from './DiaryPage.module.css';
import Calculator from '../../components/Calculator/Calculator.jsx';
import Diary from '../../components/Diary/Diary.jsx';
import ProductSearch from '../../components/ProductSearch/ProductSearch.jsx';

import { Typography, Box, MenuList } from '@mui/material';
import { Link } from 'react-router-dom';
import HorizontalRuleRoundedIcon from '@mui/icons-material/HorizontalRuleRounded';

export default function DiaryPage() {
  // Aici ar trebui să fie adus tipul de sânge din starea globală sau context, exemplu:
  const userBloodType = "O"; // Presupunem că acesta este adus din Redux/Context API

  return (
    <div className={styles.diaryPage}>
      <Box className={styles.navbar}>
        <Box className={styles.logo}>
          <Link to="/SlimMom">
            <Typography
              className={styles.logoTitle}
              sx={{
                fontFamily: 'Verdana, sans-serif',
                fontSize: '24px',
              }}
            >
              Slim<span className={styles.logoColor}>Mom</span>
            </Typography>
          </Link>
        </Box>
        <HorizontalRuleRoundedIcon
          sx={{
            marginLeft: '100px',
            fontSize: 'larger',
            transform: 'rotate(90deg)',
            color: '#21212133',
          }}
        />
        <MenuList
          sx={{
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'row',
            gap: '20px',
            padding: '0',
          }}
        >
          <li>
            <Link to="/diary" className={styles.link}>
              <Typography
                sx={{
                  padding: '0',
                  fontWeight: '700',
                  fontSize: '14px',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: ' #9b9faa',
                }}
              >
                Diary
              </Typography>
            </Link>
          </li>
          <li>
            <Link to="/calc" className={styles.link}>
              <Typography
                sx={{
                  padding: '0',
                  fontWeight: '700',
                  fontSize: '14px',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: ' #9b9faa',
                }}
              >
                Calculator
              </Typography>
            </Link>
          </li>
        </MenuList>
      </Box>

      {/* Componenta Diary */}
      <Diary />

      {/* Componenta Calculator */}
      <Calculator />

      {/* Componenta de căutare a produselor */}
      <ProductSearch bloodType={userBloodType} />
    </div>
  );
}
