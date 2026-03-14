const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

async function updateAdmin() {
  try {
    if (!process.env.MONGODB_URI) {
      console.error('❌ MONGODB_URI not found in .env.local');
      process.exit(1);
    }

    console.log('📡 Connecting to MongoDB Atlas...');
    await mongoose.connect(process.env.MONGODB_URI);

    const hashedPassword = await bcrypt.hash('Imesh@9451', 10);

    // Update existing admin or create new one
    const result = await User.findOneAndUpdate(
      { email: 'admin@example.com' },
      {
        email: 'imesh.fsd.info@gmail.com',
        password: hashedPassword
      },
      { upsert: true, new: true }
    );

    console.log('✅ Admin user updated successfully!');
    console.log('Email: imesh.fsd.info@gmail.com');
    console.log('Password: Imesh@9451');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error updating admin:', error);
    process.exit(1);
  }
}

updateAdmin();
