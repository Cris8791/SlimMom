import express from 'express';
import {
  registerUser, loginUser, logoutUser,
  updateUser, getAllUsers, getCurrentUser 
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.patch('/update', protect, updateUser); // Folosește PATCH consistent dacă aceasta este intenția
router.get('/', protect, admin, getAllUsers);
router.get('/current', protect, getCurrentUser);

export default router;
