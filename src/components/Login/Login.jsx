import React, { useState } from 'react';
import css from './Login.module.css';
import { useDispatch } from 'react-redux';
import { Box, FormControl, Typography, TextField, Button } from '@mui/material';
import { loginUser } from '../Redux/authSlice/authSlice.js';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      console.log('Attempting login with:', { email, password });
      const action = await dispatch(loginUser({ email, password }));
      console.log('Action returned by dispatch:', action);

      if (action.payload) {
        console.log('Login successful, payload:', action.payload);
        const { token, user } = action.payload;
        if (token) {
          console.log('Token found:', token);
          localStorage.setItem('token', token);
          // Verificăm dacă avem datele necesare pentru utilizator
          if (user && user.height && user.currentWeight && user.desiredWeight && user.bloodType) {
            navigate('/diary');
          } else {
            navigate('/calculator');
          }
        } else {
          throw new Error('No token in response');
        }
      } else if (action.error) {
        throw new Error(action.error.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login Error:', err);
      setError(err.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className={css.intake}>
      {error && <p>Error: {error}</p>}
      <Box
        sx={{
          height: '80vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          gap: '20px'
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
          Login
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
              id="email"
              name="email"
              value={email}
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
              value={password}
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
                >
                  Log in
                </Typography>
              </Button>
              <Button
                component={Link}
                to="/registration"
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
                >
                  Register
                </Typography>
              </Button>
            </Box>
          </FormControl>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </Box>
    </div>
  );
};

export default Login;
