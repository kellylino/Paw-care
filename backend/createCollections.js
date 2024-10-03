import { connectToDatabase } from './db/connection.js'; // Import the connection logic

async function createCollections() {
  try {
    const db = await connectToDatabase(); // Connect to MongoDB

    // Create collections
    await db.createCollection('accounts');
    await db.createCollection('users');
    await db.createCollection('pets');
    await db.createCollection('owners');
    await db.createCollection('givers');
    await db.createCollection('payments');
    await db.createCollection('messages');
    await db.createCollection('bookings');
    await db.createCollection('ai_recommendations');

    console.log('Collections created successfully.');
  } catch (error) {
    console.error('Error creating collections:', error);
  }
}

createCollections();
