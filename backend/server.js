import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection string - Update this based on your cluster
const mongoURI = 'mongodb+srv://dbUser:WeberFever99!@cluster0.sv6at.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; 

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// Example route
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});