import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, fetchUserData } from '../Redux/authSlice/authSlice';
import {
    Typography,
    Box,
    Button,
    TextField,
    MenuItem,
    CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Calculator() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);
    const loading = useSelector(state => state.auth.loading);
    const updateStatus = useSelector(state => state.auth.status);
    const updateError = useSelector(state => state.auth.error);

    const [formData, setFormData] = useState({
        height: '',
        age: '',
        currentWeight: '',
        desiredWeight: '',
        bloodType: '',
    });
    const [feedback, setFeedback] = useState('');
    const [isDataReady, setIsDataReady] = useState(false);

    useEffect(() => {
        if (!user) {
            dispatch(fetchUserData());
        } else {
            setFormData({
                height: user.height || '',
                age: user.age || '',
                currentWeight: user.currentWeight || '',
                desiredWeight: user.desiredWeight || '',
                bloodType: user.bloodType || '',
            });
            setIsDataReady(true);
        }
    }, [user, dispatch]);

    useEffect(() => {
        if (updateStatus === 'succeeded') {
            setFeedback('Datele au fost actualizate cu succes!');
            setTimeout(() => {
                setFeedback('');
                navigate('/diary');
            }, 2000);
        } else if (updateStatus === 'failed') {
            setFeedback(`Eroare la actualizarea datelor: ${updateError}`);
        }
    }, [updateStatus, updateError, navigate]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (Object.values(formData).some(value => value === '')) {
            setFeedback('Toate câmpurile sunt obligatorii');
            return;
        }

        setFeedback('Se actualizează datele...');

        const userData = {
            height: parseInt(formData.height, 10),
            age: parseInt(formData.age, 10),
            currentWeight: parseFloat(formData.currentWeight),
            desiredWeight: parseFloat(formData.desiredWeight),
            bloodType: formData.bloodType
        };

        try {
            await dispatch(updateUser(userData)).unwrap();
        } catch (error) {
            console.error('Eroare la actualizarea datelor:', error);
            setFeedback('A apărut o eroare. Vă rugăm să încercați din nou.');
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    if (!isDataReady) {
        return <Typography>Se încarcă datele utilizatorului...</Typography>;
    }

    return (
        <Box sx={{ width: '100%', maxWidth: 500, margin: 'auto', padding: 2 }}>
            <Typography variant="h6" gutterBottom>
                Actualizează detaliile tale
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Înălțime (cm)"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    margin="normal"
                    variant="outlined"
                    type="number"
                    required
                />
                <TextField
                    fullWidth
                    label="Vârstă"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    margin="normal"
                    variant="outlined"
                    type="number"
                    required
                />
                <TextField
                    fullWidth
                    label="Greutate curentă (kg)"
                    name="currentWeight"
                    value={formData.currentWeight}
                    onChange={handleChange}
                    margin="normal"
                    variant="outlined"
                    type="number"
                    required
                />
                <TextField
                    fullWidth
                    label="Greutate dorită (kg)"
                    name="desiredWeight"
                    value={formData.desiredWeight}
                    onChange={handleChange}
                    margin="normal"
                    variant="outlined"
                    type="number"
                    required
                />
                <TextField
                    select
                    fullWidth
                    label="Grupa de sânge"
                    name="bloodType"
                    value={formData.bloodType}
                    onChange={handleChange}
                    margin="normal"
                    variant="outlined"
                    required
                >
                    <MenuItem value="A">A</MenuItem>
                    <MenuItem value="B">B</MenuItem>
                    <MenuItem value="AB">AB</MenuItem>
                    <MenuItem value="O">O</MenuItem>
                </TextField>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                >
                    {user.height ? 'Actualizează' : 'Start losing weight'}
                </Button>
            </form>
            {feedback && (
                <Typography
                    color={feedback.includes('succes') ? 'success' : 'error'}
                    sx={{ mt: 2 }}
                >
                    {feedback}
                </Typography>
            )}
        </Box>
    );
}
