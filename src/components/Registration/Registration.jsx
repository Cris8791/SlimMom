import React from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import css from './Registration.module.css';
import { Box, FormControl, Typography, TextField, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import {
 
  registerUser,
} from 'components/Redux/authSlice/authSlice.js';

const Registration = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await dispatch(registerUser(formData));

      setFormData({ name: '', email: '', password: '' });
      navigate('/calculator');
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className={css.register}>
      {error && <p>Error: {error}</p>}
      <Box
        sx={{
          height: '80vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',

        }}
      >
        <Typography
          sx={{
            paddingLeft: '20px',
            fontFamily: 'Verdana, sans-serif',
            fontWeight: '700',
            fontSize: '14px',
            lineHeight: '0.4',
            textTransform: 'uppercase',
            color: '#FC842D',
          }}
        >
          Registration
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '40px',
              paddingLeft: '20px',

              '@media screen and (max-width: 450px)': {
                maxWidth: '300px',
              },
            }}
          >
            <TextField
              onChange={handleChange}
              required
              id="name"
              name="name"
              value={formData.name}
              variant="standard"
              placeholder="Name *"
              autoComplete="name"
              sx={{
                fontFamily: 'Verdana, sans-serif',
                fontWeight: '700',
                fontSize: '14px',
                letterSpacing: '0.04em',
                color: '#9b9faa',
                '& .MuiInput-underline:before': {
                  borderBottomColor: '#9B9FAA',
                },
                '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                  borderBottomColor: '#9B9FAA',
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: '#FC842D',
                },
              }}
            />
            <TextField
              onChange={handleChange}
              required
              id="email"
              name="email"
              value={formData.email}
              variant="standard"
              placeholder="Email *"
              type="email"
              autoComplete="email"
              sx={{
                fontFamily: 'Verdana, sans-serif',
                fontWeight: '700',
                fontSize: '14px',
                letterSpacing: '0.04em',
                color: '#9b9faa',
                '& .MuiInput-underline:before': {
                  borderBottomColor: '#9B9FAA',
                },
                '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                  borderBottomColor: '#9B9FAA',
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: '#FC842D',
                },
              }}
            />
            <TextField
              onChange={handleChange}
              required
              id="password"
              name="password"
              value={formData.password}
              variant="standard"
              placeholder="Password *"
              type="password"
              autoComplete="current-password"
              sx={{
                fontFamily: 'Verdana, sans-serif',
                fontWeight: '700',
                fontSize: '14px',
                letterSpacing: '0.04em',
                color: '#9b9faa',
                '& .MuiInput-underline:before': {
                  borderBottomColor: '#9B9FAA',
                },
                '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                  borderBottomColor: '#9B9FAA',
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: '#FC842D',
                },
              }}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '40px',
                paddingLeft: '20px',
              }}
            >
              <Button
                type="submit"
                style={{
                  boxShadow: '0 4px 10px 0 rgba(252, 132, 45, 0.5)',
                  background: ' #fc842d',
                  borderRadius: '30px',
                  width: '181px',
                  height: '43px',
                  '&:hover': {
                    backgroundColor: '#fc842d',
                  },
                  '&:active': {
                    backgroundColor: '#fc842d',
                  },
                }}
              >
                <Typography
                  sx={{
                    textTransform: 'none',
                    fontFamily: 'Verdana, sans-serif',
                    fontWeight: ' 700',
                    fontSize: '14px',
                    letterSpacing: '0.04em',
                    textAlign: 'center',
                    color: '#fff',
                  }}
                >
                  Register
                </Typography>
              </Button>
              <Button
                sx={{
                  boxShadow: '0 4px 10px 0 rgba(252, 132, 45, 0.5)',
                  background: ' #fc842d',
                  borderRadius: '30px',
                  width: '181px',
                  height: '43px',
                  '&:hover': {
                    backgroundColor: '#fc842d',
                  },
                  '&:active': {
                    backgroundColor: '#fc842d',
                  },
                }}
              >
                <Typography
                  sx={{
                    textTransform: 'none',
                    fontFamily: 'Verdana, sans-serif',
                    fontWeight: ' 700',
                    fontSize: '14px',
                    letterSpacing: '0.04em',
                    textAlign: 'center',
                    color: '#fff',
                  }}
                  component={Link}
                  to="/login"
                >
                  Log in
                </Typography>
              </Button>
            </Box>
          </FormControl>
        </form>
      </Box>
    </div>
  );
};

export default Registration;
