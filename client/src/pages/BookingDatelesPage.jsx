import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AddressLink from '../components/AddressLink';
import PlaceGalleryWidget from '../components/PlaceGalleryWidget';
import BookingDatesComponent from '../components/BookingDatesComponent';

const BookingDatelesPage = () => {
  const [booking, setBooking] = useState([]);
  const { id } = useParams();
  console.log('booking: ', booking);

  useEffect(() => {
    axios.get('/api/all-bookings').then((response) => {
      const currBooking = response.data.find(({ _id }) => _id === id);
      console.log('!!!!!!!!!$$$: ', currBooking);

      if (currBooking) {
        setBooking(currBooking);
      }
    });
  }, [id]);

  if (booking.length === 0) {
    return '';
  }
  return (
    <div className="my-8">
      <h1 className="text-3xl">{booking.placeId.title}</h1>
      <AddressLink className={'my-2'}> {booking.placeId.address} </AddressLink>
      <div className="flex justify-between items-center bg-gray-200 p-6 my-6 rounded-2xl">
        <div>
          <h2 className="text-2xl mb-4">Your booking information</h2>
          <BookingDatesComponent eachBooking={booking.placeId} />
        </div>
        <div className='bg-primary rounded-2xl text-white p-6'>
          <div>Total price:</div>
          <div className='text-3xl'>${booking.price}</div>
        </div>
      </div>
      <PlaceGalleryWidget place={booking.placeId} />
    </div>
  );
};

export default BookingDatelesPage;
