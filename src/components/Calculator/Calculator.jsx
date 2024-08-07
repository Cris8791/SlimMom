import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../Redux/authSlice/authSlice';
import { Typography, Box, Button, TextField, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Calculator() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);
    const updateStatus = useSelector(state => state.auth.status);
    const updateError = useSelector(state => state.auth.error);

    const [height, setHeight] = useState('');
    const [age, setAge] = useState('');
    const [currentWeight, setCurrentWeight] = useState('');
    const [desiredWeight, setDesiredWeight] = useState('');
    const [bloodType, setBloodType] = useState('');
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
      if (user) {
        setHeight(user.height?.toString() || '');
        setAge(user.age?.toString() || '');
        setCurrentWeight(user.currentWeight?.toString() || '');
        setDesiredWeight(user.desiredWeight?.toString() || '');
        setBloodType(user.bloodType || '');
      }
    }, [user]);

    useEffect(() => {
        if (updateStatus === 'failed') {
            setFeedback(`Eroare la actualizarea datelor: ${updateError}`);
        } else if (updateStatus === 'succeeded') {
            setFeedback('Datele au fost actualizate cu succes!');
            setTimeout(() => {
                setFeedback('');
                navigate('/diary');
            }, 2000);
        }
    }, [updateStatus, updateError, navigate]);

    const handleSubmit = async (event) => {
      event.preventDefault();
      if (!height || !age || !currentWeight || !desiredWeight || !bloodType) {
        setFeedback('Toate câmpurile sunt obligatorii');
        return;
      }

      setFeedback('Se actualizează datele...');

      const userData = {
        currentWeight: parseFloat(currentWeight),
        height: parseInt(height, 10),
        age: parseInt(age, 10),
        desiredWeight: parseFloat(desiredWeight),
        bloodType
      };

      try {
        const resultAction = await dispatch(updateUser(userData));
        if (updateUser.fulfilled.match(resultAction)) {
          setFeedback('Datele au fost actualizate cu succes!');
          setTimeout(() => {
            setFeedback('');
            navigate('/diary');
          }, 2000);
        } else {
          setFeedback(`Eroare la actualizarea datelor: ${resultAction.error.message}`);
        }
      } catch (error) {
        setFeedback('A apărut o eroare. Vă rugăm să încercați din nou.');
      }
    };

    // În return:
    <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
      {user && user.height ? 'Actualizează' : 'Start losing weight'}
    </Button>

    return (
        <div className="calculator">
            <Box sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper', padding: 2 }}>
                <Typography variant="h6" gutterBottom>
                    {user && user.height ? 'Actualizează detaliile tale' : 'Completează detaliile tale'}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Înălțime (cm)"
                        value={height}
                        onChange={e => setHeight(e.target.value)}
                        margin="normal"
                        variant="outlined"
                        type="number"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Vârstă"
                        value={age}
                        onChange={e => setAge(e.target.value)}
                        margin="normal"
                        variant="outlined"
                        type="number"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Greutate curentă (kg)"
                        value={currentWeight}
                        onChange={e => setCurrentWeight(e.target.value)}
                        margin="normal"
                        variant="outlined"
                        type="number"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Greutate dorită (kg)"
                        value={desiredWeight}
                        onChange={e => setDesiredWeight(e.target.value)}
                        margin="normal"
                        variant="outlined"
                        type="number"
                        required
                    />
                    <TextField
                        select
                        fullWidth
                        label="Grupa de sânge"
                        value={bloodType}
                        onChange={e => setBloodType(e.target.value)}
                        margin="normal"
                        variant="outlined"
                        required
                    >
                        <MenuItem value="A">A</MenuItem>
                        <MenuItem value="B">B</MenuItem>
                        <MenuItem value="AB">AB</MenuItem>
                        <MenuItem value="O">O</MenuItem>
                    </TextField>
                    <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
  {user && user.height ? 'Actualizează' : 'Start losing weight'}
</Button>
                </form>
                {feedback && <Typography color="error" sx={{ mt: 2 }}>{feedback}</Typography>}
            </Box>
        </div>
    );
}
