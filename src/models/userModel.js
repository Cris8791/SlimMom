//Src/s/userModel.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  height: { type: Number },
  age: { type: Number },
  currentWeight: { type: Number },
  desiredWeight: { type: Number },
  bloodType: { type: String }
});

// Criptarea parolei înainte de a salva utilizatorul
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next(); // Nu hash-ui parola dacă nu a fost modificată
  console.log('Before hashing password:', this.password);
  this.password = await bcrypt.hash(this.password, 10);
  console.log('After hashing password:', this.password);
  next();
});

// Verificarea parolei
userSchema.methods.comparePassword = async function(candidatePassword) {
  console.log('Comparing:', candidatePassword, 'with', this.password);
  return await bcrypt.compare(candidatePassword, this.password);
};


const User = mongoose.model('User', userSchema);
export default User;
