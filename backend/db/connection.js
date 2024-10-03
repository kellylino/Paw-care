import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

export async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas!');
    return client.db('pawCareDb');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

export default { connectToDatabase };
