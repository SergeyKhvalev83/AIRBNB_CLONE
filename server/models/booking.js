const mongoose = require('mongoose');
const { Schema } = mongoose;

const Booking = new Schema({
  placeId: {
    type: mongoose.Schema.Types.ObjectId,
    require: 'true',
    ref: 'places',
  },
  booker: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  checkIn: { type: Date, require: true },
  checkOut: { type: Date, require: true },
  numberOfGuests: { type: Number, require: true },
  name: { type: String, require: true },
  phone: { type: Number, require: true },
  price: { type: Number, require: true },
});

module.exports = mongoose.model("bookings", Booking);
