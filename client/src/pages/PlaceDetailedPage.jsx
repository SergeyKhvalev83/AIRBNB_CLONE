import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const PlaceDetailedPage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState([]);

  console.log('PLACE ID: ', id);
  useEffect(() => {
    axios
      .get(`/api/certain-my-place/${id}`)
      .then(( response ) => {
        setPlace(response.data);
      });
  }, []);

  return (
    <div>
      More datailes about that place
      {place.address}
    </div>
  );
};

export default PlaceDetailedPage;
