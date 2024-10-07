import connectToDatabase from './db/connection.js';

async function testConnection() {
  try {
    const db = await connectToDatabase();
    console.log('Connected to MongoDB Atlas successfully!');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
}

testConnection();
