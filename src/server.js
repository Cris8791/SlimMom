// src/server.js
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js'; // Import the product routes
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Configure dotenv for loading environment variables
import dotenv from 'dotenv';
dotenv.config();
console.log("JWT_SECRET loaded:", process.env.JWT_SECRET);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

// Use bodyParser.json() to parse JSON requests
app.use(bodyParser.json());

// Define routes for users and products
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes); // Use the product routes
app.use('/api', productRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.log('Failed to connect to MongoDB', err));

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '../', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}
