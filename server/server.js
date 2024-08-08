const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Import routes and middleware
const userRoute = require('./routes/usersRoutes');
const productRoute = require('./routes/productRoutes');
const { authenticate } = require('./middlewares/Authenticate');

// Middleware setup
app.use(cookieParser());
app.use(cors({ credentials: true, origin : "http://localhost:3000" }));
app.use(express.json());
app.use(morgan('dev')); // Log requests to the console

// Route setup
app.use('/api/user', userRoute);
app.use(authenticate); // Use the authenticate middleware for subsequent routes
app.use('/api/product', productRoute);

// Connect to the database and start the server
mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(process.env.SERVER_PORT || 5000, () => {
      console.log(`Server is listening on port ${process.env.SERVER_PORT || 5000}`);
    });
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });
