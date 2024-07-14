//Src/Pages/CalculatorPage/CalculatorPage.jsx
import React from 'react';
import styles from './CalculatorPage.module.css';
import { Calculator } from 'components/Calculator/Calculator.jsx';
import { IntakeCalories } from 'components/IntakeCalories/IntakeCalories.jsx';
import { Link } from 'react-router-dom';
import HorizontalRuleRoundedIcon from '@mui/icons-material/HorizontalRuleRounded';
import { Box, MenuList, Typography } from '@mui/material';

export const CalculatorPage = () => {
  return (
    <div className={styles.calcPage}>
      <Box>
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

        <IntakeCalories />
      </Box>
      <Box>
        <Calculator />
      </Box>
    </div>
  );
};
