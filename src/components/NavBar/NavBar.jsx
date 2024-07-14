// Src/components/NavBar/NavBar.jsx
import React from 'react';
import css from './NavBar.module.css';
import { Link } from 'react-router-dom';
import { Box, MenuList, Typography } from '@mui/material';
import HorizontalRuleRoundedIcon from '@mui/icons-material/HorizontalRuleRounded';

const NavBar = () => {
  console.log("NavBar component rendered");
  return (
    <div className={css.navbar}>
      <Box className={css.logo}>
        <Link to="/SlimMom">
          <Typography
            className={css.logoTitle}
            sx={{
              fontFamily: 'Verdana, sans-serif',
              fontSize: '24px',
            }}
          >
            Slim<span className={css.logoColor}>Mom</span>
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
          <Link to="/login" className={css.link}>
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
              log in
            </Typography>
          </Link>
        </li>
        <li>
          <Link to="/registration" className={css.link}>
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
              Registration
            </Typography>
          </Link>
        </li>
      </MenuList>
    </div>
  );
};

export default NavBar;
