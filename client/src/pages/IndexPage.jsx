import { useEffect, useState } from 'react';
import axios from 'axios';

const IndexPage = () => {
  const [allPlaces, setAllPlaces] = useState([]);

  useEffect(() => {
    axios.get('/api/places').then(({ data }) => setAllPlaces(data));
  }, []);

  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md: grid-cols-3 lg: grid-cols-4">
      {allPlaces.length > 0 &&
        allPlaces.map((eachPlace) => (
          <div className="" key={eachPlace._id}>
            <div className="mb-2 bg-gray-500 rounded-2xl flex">
              {eachPlace.photos?.[0] && (
                <img className='rounded-2xl object-cover aspect-square'
                  src={`http://localhost:5001/uploads/${eachPlace.photos[0]}`}
                  alt="place photo"
                />
              )}
            </div>
            <h2 className='text-sm truncate leading-4'>{eachPlace.title}</h2>
            <h3 className='font-bold '>{eachPlace.address}</h3>

            
          </div>
        ))}
    </div>
  );
};

export default IndexPage;
