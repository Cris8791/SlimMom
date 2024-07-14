import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './src/models/userModel.js'; // Asigură-te că calea este corectă

dotenv.config();

const testPassword = async (email, password) => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found');
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      console.log('Password matches!');
    } else {
      console.log('Password does not match');
    }
  } catch (error) {
    console.error('Error testing password:', error);
  } finally {
    mongoose.disconnect();
  }
};

// Testează cu email și parola
testPassword('user2@example.com', 'securepassword1234');
