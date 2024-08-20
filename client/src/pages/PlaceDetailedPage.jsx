import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BookingWidget from '../components/BookingWidget';
import PlaceGalleryWidget from '../components/PlaceGalleryWidget';
import AddressLink from '../components/AddressLink';

const PlaceDetailedPage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState({});

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/api/certain-my-place/${id}`).then((responce) => {
      setPlace(responce.data);
      console.log('PLACE', place);
    });
  }, [id]);

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
      <h1 className="text-3xl">{place.title}</h1>
      <AddressLink>{place.address} </AddressLink>
      <PlaceGalleryWidget place={place} />

      <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div className="mb-8">
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {place.description}
          </div>
          Check-in {place.checkIn} <br />
          Check-out {place.checkOut} <br />
          Max number of guests: {place.maxGuests}
        </div>
        <div>
          <BookingWidget place={place} />
        </div>
      </div>
      <div className="bg-white -mx-8 px-8 pt-1 pb-8 border-t">
        <div>
          <h2 className="pt-4 font-semibold text-2xl">Extra info</h2>
        </div>
        <div className="mb-4 mt-1 text-sm text-gray-700 leading-5">
          {place.extraInfo}
        </div>
      </div>
    </div>
  );
};

export default PlaceDetailedPage;
