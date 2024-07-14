//Src/controllers/userController.js
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// const secretKey = process.env.JWT_SECRET || 'your_secret_key_here';  // Utilizează o variabilă de mediu pentru cheia secretă

// Funcție pentru a genera un JWT
function generateToken(user) {
  console.log("JWT_SECRET used for token generation:", process.env.JWT_SECRET);
  return jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
}
console.log("Generated token:", generateToken);

// Înregistrarea unui utilizator nou
export async function registerUser(req, res) {
  try {
    const { email, password, name } = req.body;
    const newUser = new User({ email, password, name });
    await newUser.save();

    const token = generateToken(newUser);
    res.status(201).json({ token, userId: newUser._id, email: newUser.email, name: newUser.name });
  } catch (error) {
    res.status(500).json({ message: 'Error registering new user.', error: error.message });
  }
}
// Autentificarea unui utilizator
export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    console.log("Login attempt with email:", email);

    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found with email:", email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    console.log('Stored hashed password:', user.password); // Log hashed password
    console.log('Password to compare:', password); // Log password to compare

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password does not match for email:", email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    console.log("JWT_SECRET in login:", process.env.JWT_SECRET);
    const token = generateToken(user);
    res.json({ token, userId: user._id, email: user.email, name: user.name });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
}

// Logout User
export function logoutUser(req, res) {
  // Aici poți implementa logica pentru invalidarea token-ului pe server dacă este necesar
  res.status(200).send({ message: "Logged out successfully" });
}

export const updateUser = async (req, res) => {
  console.log("req.user în updateUser:", req.user);
  const { height, age, currentWeight, desiredWeight, bloodType } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.height = height || user.height;
    user.age = age || user.age;
    user.currentWeight = currentWeight || user.currentWeight;
    user.desiredWeight = desiredWeight || user.desiredWeight;
    user.bloodType = bloodType || user.bloodType;


    await user.save();
    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user details', error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};
