import express from 'express';
import dotenv from 'dotenv';
import connectToDatabase from './db/connection.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Server is running!');
});

//Connect to db and start the server
async function startServer() {
  console.log('Starting server...');
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();
