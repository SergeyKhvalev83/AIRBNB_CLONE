import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PlaceImgComponent from '../components/PlaceImgComponent';
import NavigationComponent from '../components/NavigationComponent';
import BookingDatesComponent from '../components/BookingDatesComponent';

const MyBookingsPage = () => {
  const [myBookings, setMyBookings] = useState([]);

  // useEffect(() => {
  //   axios.get('/api/all-bookings').then((responce) => {
  //     setMyBookings(responce.data);
  //   });
  // }, []);


  useEffect(() => {
    axios.get('/api/all-bookings')
      .then(({ data }) => {
        // Ensure data is an array
        setMyBookings(Array.isArray(data) ? data : []);
      })
      .catch(error => {
        console.error('MybookingsPage API call failed:', error);
        setMyBookings([]); // Fallback to empty array on error
      });
  }, []);

  return (
    <div>
      <NavigationComponent />
      Bookings page
      {myBookings.length > 0 &&
        myBookings.map((eachBooking) => (
          <Link
            to={`/account/bookings/${eachBooking._id}`}
            className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden"
            key={eachBooking._id}
          >
            <div className="w-48 h-32">
              <PlaceImgComponent place={eachBooking.placeId} />
            </div>
            <div className="py-3 pr-3 grow">
              <h2 className="text-xl">{eachBooking.placeId.title}</h2>
              <BookingDatesComponent eachBooking={eachBooking} />
              <div className="text-xl">
                <div className="flex gap-1"></div>
              </div>

              <div className="flex gap-1 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                  />
                </svg>
                <span className="text-xl">
                  Total price: ${eachBooking.price}
                </span>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default MyBookingsPage;
