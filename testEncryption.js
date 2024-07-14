import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './src/models/userModel.js';

dotenv.config();

const testEncryption = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const email = 'test@example.com';
    const plainPassword = 'testpassword123';

    // Ștergerea utilizatorului existent, dacă există
    await User.deleteOne({ email });
    console.log('Existing user deleted');

    // Crearea utilizatorului cu o parolă cunoscută
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    console.log('Hashed Password:', hashedPassword);

    const newUser = new User({ email, password: plainPassword, name: 'Test User' }); // salvăm parola brută pentru a permite pre-save hook-ul să hash-uiască
    await newUser.save();
    console.log('User created successfully');

    // Găsirea utilizatorului și compararea parolei
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found');
      return;
    }

    const isMatch = await bcrypt.compare(plainPassword, user.password);
    if (isMatch) {
      console.log('Password matches!');
    } else {
      console.log('Password does not match');
    }
  } catch (error) {
    console.error('Error during encryption test:', error);
  } finally {
    mongoose.disconnect();
  }
};

testEncryption();
