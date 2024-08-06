require('dotenv').config();
const mongoose = require('mongoose');
const morgan = require('morgan');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth/auth.routes');
const userProfileToken = require('./routes/user.profile.routes')

const app = express();
const PORT = 5001;

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  credentials: true,
};

mongoose.connect(process.env.CONNECTION_STRING);

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

app.use('/api', authRoutes);
app.use('/api', userProfileToken)

app.listen(PORT, () => {
  console.log('Server listening on port 5001');
});
