import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NavigationComponent from '../components/NavigationComponent';

const PlacesPage = () => {
  const [myPlaces, setMyPlaces] = useState([]);

  useEffect(() => {
    axios.get('/api/my-places').then(({ data }) => {
      setMyPlaces(data);
    });
  }, []);

  return (
    <div>
      <NavigationComponent />

      <div className="text-center">
        <Link
          className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full "
          to={'/account/places/new'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
              clipRule="evenodd"
            />
          </svg>
          Add new place
        </Link>
        <div className="mt-4">
          {myPlaces.length > 0 &&
            myPlaces.map((eachPlace) => (
              <Link
                to={'/account/my-places/' + eachPlace._id}
                key={eachPlace._id}
                className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl"
              >
                <div>
                
                      <div
                        className="flex justify-center w-32 h-32 bg-gray-300 shrink-0"
                      >
                        <img className='object-cover'
                          src={`http://localhost:5001/uploads/${eachPlace.photos[0]}`}
                          alt="my-place-photo"
                        />
                      </div>
                 
                </div>
                <div className="text-justify">
                  <h2 className="text-xl">{eachPlace.title}</h2>
                  <p className="text-sm mt-2">{eachPlace.description}</p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PlacesPage;
