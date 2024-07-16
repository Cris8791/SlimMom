import React from 'react';
import css from './NavBar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../Redux/authSlice/authSlice';
import { Box, MenuList, Typography } from '@mui/material';
import HorizontalRuleRoundedIcon from '@mui/icons-material/HorizontalRuleRounded';

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const user = useSelector(state => state.auth.user);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

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
  {isLoggedIn ? [
    <li key="diary">
      <Link to="/diary" className={css.link}>
        <Typography sx={menuItemStyle}>
          Diary
        </Typography>
      </Link>
    </li>,
    <li key="calculator">
      <Link to="/calculator" className={css.link}>
        <Typography sx={menuItemStyle}>
          Calculator
        </Typography>
      </Link>
    </li>,
    <li key="username">
      <Typography sx={menuItemStyle}>
        {user?.name || 'User'}
      </Typography>
    </li>,
    <li key="logout">
      <Typography sx={menuItemStyle} onClick={handleLogout} style={{cursor: 'pointer'}}>
        Logout
      </Typography>
    </li>
  ] : [
    <li key="login">
      <Link to="/login" className={css.link}>
        <Typography sx={menuItemStyle}>
          Log in
        </Typography>
      </Link>
    </li>,
    <li key="registration">
      <Link to="/registration" className={css.link}>
        <Typography sx={menuItemStyle}>
          Registration
        </Typography>
      </Link>
    </li>
  ]}
</MenuList>
    </div>
  );
};

const menuItemStyle = {
  padding: '0',
  fontWeight: '700',
  fontSize: '14px',
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  color: ' #9b9faa',
};

export default NavBar;
