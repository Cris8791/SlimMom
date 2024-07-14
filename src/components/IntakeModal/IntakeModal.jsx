// Src/components/IntakeModal/IntakeModal.jsx
import React from 'react';
import css from './IntakeModal.module.css';
import { Link } from 'react-router-dom';
import { Typography, Box, Button, Modal, Fade, MenuList } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const IntakeModal = ({ open, handleClose }) => {
  return (
    <div>
      <Modal
        position="relative"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box
            className={css.intakeModal}
            sx={{
              background: '#FFFFFF',
            }}
          >
            <Button
              onClick={handleClose}
              sx={{
                minWidth: '20px',
                height: '28px',
                padding: '0 4px',
                borderRadius: ' 50%',
                position: 'absolute',
                top: '6px',
                right: '6px',
                color: ' #000000',
                '&:hover': {
                  cursor: 'pointer',
                },
              }}
            >
              <CloseRoundedIcon sx={{ width: '18px' }} />
            </Button>
            <Typography
              sx={{
                fontFamily: 'Verdana, sans-serif',
                fontWeight: '700',
                fontize: '26px',
                lineHeight: '1.4',
                textAlign: 'center',
                color: '#212121',
              }}
            >
              Your recommended daily <br />
              calorie intake is <br />
              <span
                sx={{
                  fontFamily: 'Verdana, sans-serif',
                  fontWeight: '700',
                  fontSize: '48px',
                  letterSpacing: ' 0.04em',
                  textAlign: 'center',
                  color: '#264061',
                }}
              >
                .....
              </span>
              <span
                sx={{
                  fontFamily: 'Verdana, sans-serif',
                  fontWeight: '700',
                  fontSize: '14px',
                  letterSpacing: '0.04em',
                  color: '#212121',
                }}
              >
                kcal
              </span>
            </Typography>
            <MenuList
              sx={{
                borderTop: '1px solid #e0e0e0;',
                width: '330px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Verdana, sans-serif',
                  fontWeight: '700',
                  fontSize: '14px',
                  letterSpacing: '0.04em',
                  color: '#212121',
                }}
              >
                Foods you should not eat
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Verdana, sans-serif',
                  fontWeight: '400',
                  fontSize: '14px',
                  letterSpacing: '0.04em',
                  color: '#9b9faa',
                }}
              >
                1. Flour products{' '}
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Verdana, sans-serif',
                  fontWeight: '400',
                  fontSize: '14px',
                  letterSpacing: '0.04em',
                  color: '#9b9faa',
                }}
              >
                2. Milk
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Verdana, sans-serif',
                  fontWeight: '400',
                  fontSize: '14px',
                  letterSpacing: '0.04em',
                  color: '#9b9faa',
                }}
              >
                3. Red meat{' '}
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Verdana, sans-serif',
                  fontWeight: '400',
                  fontSize: '14px',
                  letterSpacing: '0.04em',
                  color: '#9b9faa',
                }}
              >
                4. Smoked meats
              </Typography>
            </MenuList>
            <Button
              sx={{
                boxShadow: '0 4px 10px 0 rgba(252, 132, 45, 0.5)',
                background: ' #fc842d',
                borderRadius: '30px',
                width: '210px',
                height: '43px',
                '&:hover': {
                  backgroundColor: '#fc842d',
                },
                '&:active': {
                  backgroundColor: '#fc842d',
                },
              }}
              component={Link}
              to="/login"
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
                Start losing weight
              </Typography>
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default IntakeModal;
