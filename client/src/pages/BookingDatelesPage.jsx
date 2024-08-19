import {} from 'react';
import {useParams} from "react-router-dom"

const BookingDatelesPage = () => {
  const {id} = useParams();
  return (
    <div>
      {id}
    </div>
  );
};

export default BookingDatelesPage;