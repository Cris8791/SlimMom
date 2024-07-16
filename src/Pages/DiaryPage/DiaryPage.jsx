import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './DiaryPage.module.css';
import Calculator from '../../components/Calculator/Calculator.jsx';
import Diary from '../../components/Diary/Diary.jsx';
import ProductSearch from '../../components/ProductSearch/ProductSearch.jsx';
import { Typography, Box, MenuList } from '@mui/material';
import HorizontalRuleRoundedIcon from '@mui/icons-material/HorizontalRuleRounded';

export default function DiaryPage() {
  const user = useSelector(state => state.auth.user?.data);
  const userBloodType = user?.bloodType || "O";

  return (
    <div className={styles.diaryPage}>
      <Box className={styles.navbar}>
        <Box className={styles.logo}>
          <Link to="/SlimMom">
            <Typography className={styles.logoTitle} sx={{ fontFamily: 'Verdana, sans-serif', fontSize: '24px' }}>
              Slim<span className={styles.logoColor}>Mom</span>
            </Typography>
          </Link>
        </Box>
        <HorizontalRuleRoundedIcon sx={{ marginLeft: '100px', fontSize: 'larger', transform: 'rotate(90deg)', color: '#21212133' }} />
        <MenuList sx={{ listStyle: 'none', display: 'flex', flexDirection: 'row', gap: '20px', padding: '0' }}>
          <li>
            <Link to="/diary" className={styles.link}>
              <Typography sx={{ padding: '0', fontWeight: '700', fontSize: '14px', letterSpacing: '0.04em', textTransform: 'uppercase', color: ' #9b9faa' }}>
                Diary
              </Typography>
            </Link>
          </li>
          <li>
            <Link to="/calc" className={styles.link}>
              <Typography sx={{ padding: '0', fontWeight: '700', fontSize: '14px', letterSpacing: '0.04em', textTransform: 'uppercase', color: ' #9b9faa' }}>
                Calculator
              </Typography>
            </Link>
          </li>
        </MenuList>
      </Box>

      <Diary />
      <Calculator />
      <ProductSearch bloodType={userBloodType} />
    </div>
  );
}
