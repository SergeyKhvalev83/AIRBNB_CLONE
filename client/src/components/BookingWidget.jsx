import { useState, useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { differenceInCalendarDays } from 'date-fns';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
 
const BookingWidget = ({ place }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [redirect, setRedirect] = useState('');
  const { user } = useContext(UserContext);


useEffect(()=>{
  setFullName(user.name)
},[user])

  let numberOfNightsToBook = 0;
  if (checkIn && checkOut) {
    numberOfNightsToBook = differenceInCalendarDays(checkOut, checkIn);
  }

  const checkInHandler = (ev) => {
    setCheckIn(ev.target.value);
  };

  const checkOutHandler = (ev) => {
    setCheckOut(ev.target.value);
  };

  const numberOfGuestsHandler = (ev) => {
    setNumberOfGuests(ev.target.value);
  };

  const fullNameHandler = (ev) => {
    setFullName(ev.target.value);
  };

  const mobileNumberHandler = (ev) => {
    setMobile(ev.target.value);
  };

  const bookingPlaceHangler = async () => {
    try {
      const responce = await axios.post('/api/booking', {
        placeId: place._id,
        checkIn,
        checkOut,
        numberOfGuests,
        name: fullName,
        phone: mobile,
        price: numberOfNightsToBook * place.price,
        booker: user._id,

      });

      const bookingId = responce.data._id;

      if (bookingId) {
        setRedirect(`/account/bookings/${bookingId}`);
      }
    } catch (err) {
      console.log('ERROR TO SEND BOOKING INFO: ', err);
    }
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: ${place.price} / per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <lable>Check-in:</lable>
            <input type="date" value={checkIn} onChange={checkInHandler} />
          </div>
          <div className="py-3 px-4 border-l">
            <lable>Check-out:</lable>
            <input type="date" value={checkOut} onChange={checkOutHandler} />
          </div>
        </div>

        <div className="py-3 px-4 border-t">
          <lable>Number of guests: </lable>
          <input
            type="number"
            placeholder="1"
            value={numberOfGuests}
            onChange={numberOfGuestsHandler}
          />
        </div>
        {numberOfNightsToBook > 0 && (
          <div className="py-3 px-4 border-t">
            <lable> Your full name: </lable>
            <input
              type="text"
              placeholder="Sergey Kvalev"
              value={fullName}
              onChange={fullNameHandler}
            />
            <lable> Phone number: </lable>
            <input
              type="tel"
              placeholder="(222) 333-222"
              value={mobile}
              onChange={mobileNumberHandler}
            />
          </div>
        )}
      </div>

      <button className="primary mt-4" onClick={bookingPlaceHangler}>
        Book this place
        {numberOfNightsToBook > 0 && (
          <div>
            <span> ${numberOfNightsToBook * place.price}</span>
          </div>
        )}
      </button>
    </div>
  );
};

export default BookingWidget;
