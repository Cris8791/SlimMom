// src/middleware/authMiddleware.js

import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';  // Asigură-te că importul modelului de utilizator este corect

export const protect = async (req, res, next) => {
  console.log("JWT_SECRET in middleware:", process.env.JWT_SECRET);
  console.log("Entering protect middleware");
  console.log("Headers received:", req.headers);

  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    console.log("Authorization header found");
    token = req.headers.authorization.split(' ')[1];
    console.log("Token received:", token);

    try {
      console.log("JWT_SECRET used for token verification:", process.env.JWT_SECRET);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded token:", decoded);

      console.log("Searching for user with ID:", decoded.userId);
      req.user = await User.findById(decoded.userId).select('-password');

      if (!req.user) {
        console.log("User not found in database");
        return res.status(401).json({ message: 'User not found' });
      }

      console.log("User found:", req.user);
      next();
    } catch (error) {
      console.error("Token verification error:", error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    console.log("No token found in Authorization header");
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401).json({ message: 'Not authorized as an admin' });
    }
};
