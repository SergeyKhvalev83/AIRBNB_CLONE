import {useEffect,useState} from 'react';
import {Link} from "react-router-dom"
import axios from "axios"

import NavigationComponent from '../components/NavigationComponent';

const MyBookingsPage = () => {
  const [myBookings, setMyBookings] = useState([])

 
useEffect(()=>{
  axios.get('/api/all-bookings').then(responce =>{
    setMyBookings(responce.data)
    console.log("!!!!!!!!!!!!!!: ", myBookings)
  })
}, [])


  return (
    <div>
      <NavigationComponent />
      Bookings page
      {myBookings.length > 0 && 
        myBookings.map((eachBooking) =>(
          <div key={eachBooking._id}>
             <Link to={`/account/bookings/${eachBooking._id}`}>{eachBooking.booker}
          {eachBooking.name}</Link>
          </div>
         

        ))
      }
    </div>
  );
};

export default MyBookingsPage;
