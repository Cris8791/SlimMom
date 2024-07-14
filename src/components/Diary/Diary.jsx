//Src/components/Diary/Diary.jsx
import React from 'react';
import styles from './Diary.module.css';
import {
  Typography,
  Box,
  /* Button, */ List,
  Fab,
  FormControl,
  TextField,
  MenuList,
  Autocomplete,
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from 'react-redux';

export default function Diary() {
  const authState = useSelector(state => state.auth);
  const user = authState.user && authState.user.data;
  const allowedProductsAll = user?.infouser?.allowedProductsAll;
  console.log('allowedProductsAll:', allowedProductsAll);

  const renderProductList = () => {
    return allowedProductsAll.map((product, index) => (
      <MenuList
        key={`${product._id}-${index}`}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px',
          fontFamily: 'Verdana, sans-serif',
          fontWeight: '400',
          fontSize: '14px',
          letterSpacing: '0.04em',
          color: '#212121',
        }}
      >
        <li>
          <p className={styles.listStyle}>{product.title}</p>
        </li>

        <li className={styles.productInfo}>
          <p className={styles.listStyle}>{product.weight} g</p>
          <p className={styles.listStyle}> {product.calories} kcal</p>
          <CloseRoundedIcon
            sx={{ color: '#9B9FAA', fontSize: 'medium', cursor: 'pointer' }}
          />
        </li>
      </MenuList>
    ));
  };

  return (
    <div className={styles.diary}>
      <Box
        sx={{
          padding: '40px 0 0 20px',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'row',
          gap: '20px',
          marginBottom: '-50px',
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Verdana, sans-serif',
            fontWeight: '700',
            fontSize: '34px',
            textAlign: 'center',
            color: '#212121',
          }}
        >
          13.08.2023
        </Typography>
        <DateRangeIcon sx={{ color: '#9B9FAA', fontSize: 'medium' }} />
      </Box>
      <MenuList
        sx={{
          padding: '0 20px 0 20px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '-50px',
        }}
      >
        <li>
          <Autocomplete
            id="products"
            sx={{
              width: '380px',
            }}
            options={allowedProductsAll}
            autoHighlight
            getOptionLabel={option =>
              option && option.title ? option.title : ''
            }
            renderOption={(props, option) => (
              <Box component="li" {...props}>
                {option.title}
              </Box>
            )}
            renderInput={params => (
              <TextField
                {...params}
                variant="standard"
                placeholder="Enter product name"
                autoComplete="off"
                sx={{
                  width: '380px',
                  fontFamily: 'Verdana, sans-serif',
                  fontWeight: '700',
                  fontSize: '14px',
                  lineHeight: '0.4',
                  textAlign: 'center',
                  color: '#9B9FAA',

                  '& .MuiInput-underline:before': {
                    borderBottomColor: '#9B9FAA',
                    maxWidth: '380px',
                  },
                  '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                    borderBottomColor: '#9B9FAA',
                    maxWidth: '380px',
                  },
                  '& .MuiInput-underline:after': {
                    borderBottomColor: '#FC842D',
                    maxWidth: '380px',
                  },
                }}
                name="product"
                disableunderline="true"
                inputProps={{
                  style: {
                    fontFamily: 'Verdana, sans-serif',
                    fontWeight: '400',
                    fontSize: '14px',
                    letterSpacing: '0.04em',
                    color: '#212121',
                  },
                  ...params.inputProps,
                  autoComplete: 'new-password', // disable autocomplete and autofill
                }}
              />
            )}
          />
        </li>
        <li className={styles.productInfo}>
          <FormControl
            sx={{
              '@media screen and (max-width: 450px)': {
                maxWidth: '300px',
              },
            }}
          >
            <TextField
              variant="standard"
              placeholder="Grams"
              autoComplete="off"
              sx={{
                maxWidth: '70px',
                fontFamily: 'Verdana, sans-serif',
                fontWeight: '700',
                fontSize: '14px',
                lineHeight: '0.4',
                textAlign: 'end',
                color: '#9B9FAA',

                '& .MuiInput-underline:before': {
                  borderBottomColor: '#9B9FAA',
                  maxWidth: '70px',
                },
                '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                  borderBottomColor: '#9B9FAA',
                  maxWidth: '70px',
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: '#FC842D',
                  maxWidth: '70px',
                },
              }}
              name="grams"
              disableunderline="true"
            />
          </FormControl>
          <Fab
            size="small"
            className={styles.mediaBtn}
            sx={{
              bgcolor: '#FC842D',
              color: '#FFFFFF',
              '&:hover': {
                bgcolor: '#FC842D',
                color: '#FFFFFF',
              },
            }}
          >
            <AddIcon fontSize="smaller" />
          </Fab>
        </li>
      </MenuList>
      <Box
        sx={{
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '50px',
            background:
              'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1)) 80%',
            zIndex: 1,
          },
        }}
      >
        <List
          className={styles.box}
          sx={{
            width: '100%',
            bgcolor: 'background.paper',
            overflow: 'auto',
            maxHeight: 220,
            position: 'relative',
            '&::-webkit-scrollbar': {
              width: '7px',
              backgroundColor: '#F0F1F3',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#264061',
              borderRadius: '10px',
            },
            '& ul': { padding: 0 },
          }}
          subheader={<li />}
        >
          <MenuList
            sx={{
              marginLeft: '20px',
              width: '560px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              listStyle: 'none',
            }}
          >
            {renderProductList()}
          </MenuList>
        </List>
      </Box>
    </div>
  );
};
