import { useState } from 'react';
import { differenceInCalendarDays } from 'date-fns';

const BookingWidget = ({ place }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');

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

  let numberOfNightsToBook = 0;
  if (checkIn && checkOut) {
    numberOfNightsToBook = differenceInCalendarDays(checkOut, checkIn);
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

      <button className="primary mt-4">
        Book this place
        {numberOfNightsToBook > 0 && (
          <>
            <span> ${numberOfNightsToBook * place.price}</span>
          </>
        )}
      </button>
    </div>
  );
};

export default BookingWidget;
