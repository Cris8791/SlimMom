import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser, logoutUser } from '../Redux/authSlice/authSlice.js';
import { Typography, Box, Button, TextField, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Calculator() {
    const dispatch = useDispatch();
    const history = useNavigate();
    // const authState = useSelector(state => state.auth);

    const [height, setHeight] = useState('');
    const [age, setAge] = useState('');
    const [currentWeight, setCurrentWeight] = useState('');
    const [desiredWeight, setDesiredWeight] = useState('');
    const [bloodType, setBloodType] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(updateUser({ height, age, currentWeight, desiredWeight, bloodType }));
        history('/profile'); // Asum că există o rută unde utilizatorul poate vedea profilul actualizat
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        history('/login');
    };

    return (
        <div className="calculator">
            <Box sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper', padding: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Update your details
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Height (cm)"
                        value={height}
                        onChange={e => setHeight(e.target.value)}
                        margin="normal"
                        variant="outlined"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Age"
                        value={age}
                        onChange={e => setAge(e.target.value)}
                        margin="normal"
                        variant="outlined"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Current Weight (kg)"
                        value={currentWeight}
                        onChange={e => setCurrentWeight(e.target.value)}
                        margin="normal"
                        variant="outlined"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Desired Weight (kg)"
                        value={desiredWeight}
                        onChange={e => setDesiredWeight(e.target.value)}
                        margin="normal"
                        variant="outlined"
                        required
                    />
                    <TextField
                        select
                        fullWidth
                        label="Blood Type"
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
                    <Button type="submit" variant="contained" color="primary">
                        Save
                    </Button>
                </form>
                <Button variant="outlined" color="secondary" onClick={handleLogout}>
                    Logout
                </Button>
            </Box>
        </div>
    );
}
