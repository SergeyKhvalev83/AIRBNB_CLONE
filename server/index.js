require('dotenv').config();
const path = require('path');
const helmet = require('helmet');

const mongoose = require('mongoose');
const morgan = require('morgan');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth/auth.routes');
const userProfileToken = require('./routes/user.profile.routes');
const uploadImgByLinkRoutes = require('./routes/uploads.routes');
const userPlaces = require('./routes/userPlaces.routes');
const allPlacesRoutes = require('./routes/places.router');
const specPlaceRouter = require('./routes/spec.place.routes');
const bookingRouter = require('./routes/book.places.routes');

const app = express();
let port = process.env.PORT;
if (port == null || port == '') {
  port = 8000;
}

// if (process.env.NODE_ENV === 'production') {
//   app.use('/', express.static('client/build'));

//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client/build/index.html'));
//   });
// }

if (process.env.NODE_ENV === 'production') {
  // app.use('/', express.static('../client/dist'));
  app.use('/', express.static(path.resolve(__dirname, '../client/dist')));//!!!!!!!!!
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
  });
}



app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    fontSrc: ["'self'", "https://fonts.gstatic.com"],
    styleSrc: ["'self'", "https://fonts.googleapis.com"],
  },
}));


const corsOptions = {
  // origin: 'http://localhost:5173',
  origin: "https://air-bnb-clone-mern-8157ba05deb7.herokuapp.com",
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  credentials: true,
};

mongoose.connect(process.env.CONNECTION_STRING);
const pathToUploads = path.resolve(path.resolve(__dirname, 'uploads'));

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use('/uploads', express.static(pathToUploads));

app.use('/api', authRoutes);
app.use('/api', userProfileToken);
app.use('/api', uploadImgByLinkRoutes);
app.use('/api', userPlaces);
app.use('/api', allPlacesRoutes);
app.use('/api', specPlaceRouter);
app.use('/api', bookingRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
