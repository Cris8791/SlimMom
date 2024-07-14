import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './src/models/userModel.js';

dotenv.config();

const testAuth = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const email = 'testauth@example.com';
    const plainPassword = 'testpassword123';

    // Ștergerea utilizatorului existent, dacă există
    await User.deleteOne({ email });
    console.log('Existing user deleted');

    // Crearea utilizatorului cu o parolă cunoscută
    const newUser = new User({ email, password: plainPassword, name: 'Test Auth User' });
    await newUser.save();
    console.log('User created successfully');

    // Găsirea utilizatorului și compararea parolei
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found');
      return;
    }

    console.log('Stored hashed password:', user.password); // Log hashed password
    console.log('Password to compare:', plainPassword); // Log password to compare

    const isMatch = await bcrypt.compare(plainPassword, user.password);
    if (isMatch) {
      console.log('Password matches!');
    } else {
      console.log('Password does not match');
    }
  } catch (error) {
    console.error('Error during auth test:', error);
  } finally {
    mongoose.disconnect();
  }
};

testAuth();
