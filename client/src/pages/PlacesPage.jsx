import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import PerksComponent from '../components/PerksComponent';

const PlacesPage = () => {
  const { action } = useParams();
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]); // to display added photos on page
  const [photoLink, setPhotoLink] = useState('');
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);

  const inputHeader = (text) => {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  };

  const inputDescription = (text) => {
    return <p className="text-gray-500 text-sm">{text}</p>;
  };

  const preInput = (header, description) => {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  };

  const addPhotoByLink = async (e) => {
    e.preventDefault();
    try {
      const { data: fileName } = await axios.post('/api/upload-by-link', {
        link: photoLink,
      });
      setAddedPhotos((prev) => {
        return [...prev, fileName];
      });
      setPhotoLink('');
    } catch (err) {
      console.log(err);
    }
  };

  const uploadPhoto = async (ev) => {
    const files = ev.target.files; // we take files from ev
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      // to append all photos loaded from device
      data.append('photos', files[i]);
    }
    const response = await axios.post('/api/uploads', data, {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    });
    console.log('DATA!!!!: ', response.data);
    setAddedPhotos((prev) => {
      // set it as state as well
      return [...prev, ...response.data];
    });
  };

  return (
    <div>
      {action !== 'new' && (
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
        </div>
      )}
      {action === 'new' && (
        <div>
          <form>
            {preInput(
              'Title',
              'Title for your place. Should be short and catchy',
            )}
            <input
              type="text"
              placeholder="title, for example: My lovely apt."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {preInput('Address', 'Address to your place')}
            <input
              type="text"
              placeholder="address"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
            {preInput('Photos', 'More = better')}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add a link ...jpeg"
                value={photoLink}
                onChange={(e) => {
                  setPhotoLink(e.target.value);
                }}
              />
              <button
                className="bg-gray-200 px-4 rounded-2xl"
                onClick={addPhotoByLink}
              >
                Add&nbsp;photo
              </button>
            </div>
            <div className="mt-2 grid gap-2 grid-cols md: grid-cols-4 lg:grid-cals-6">
              {addedPhotos.length > 0 &&
                addedPhotos.map((eachPhotoName) => (
                  <div
                    className="h-32"
                    key={Math.floor(Math.random() * 1000) + 1}
                  >
                    <img
                      className="rounded-2xl"
                      src={`http://localhost:5001/uploads/${eachPhotoName}`}
                      alt="photoOfPlace"
                    />
                  </div>
                ))}
              <label className="h-32 cursor-pointer flex gap-1 items-center justify-center border bg-transparent rounded-2xl  text-xl text-gray-600">
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={uploadPhoto}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                  />
                </svg>
                Upload
              </label>
            </div>
            {preInput('Description', 'description of the place')}
            <textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            {preInput('Perks', 'select all the perks of your place')}
            <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
              <PerksComponent selected={perks} onChange={setPerks} />
            </div>

            {preInput('Extra info', 'house rules, ect')}
            <textarea
              value={extraInfo}
              onChange={(e) => {
                setExtraInfo(e.target.value);
              }}
            />
            {preInput(
              'Check in & out times',
              'add check in and out times, remember to have some time window for cleaning the room between guests',
            )}
            <div className="grid gap-2 sm:grid-cols-3">
              <div>
                <h3 className="mt-2 -mb-1">Check in time</h3>
                <input
                  type="text"
                  placeholder="14 pm"
                  value={checkIn}
                  onChange={(e) => {
                    setCheckIn(e.target.value);
                  }}
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Check out time</h3>
                <input
                  type="text"
                  placeholder="11 am"
                  value={checkOut}
                  onChange={(e) => {
                    setCheckOut(e.target.value);
                  }}
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Max number of guests</h3>
                <input
                  type="number"
                  value={maxGuests}
                  onChange={(e) => {
                    setMaxGuests(e.target.value);
                  }}
                />
              </div>
            </div>
            <div>
              <button className="primary my-4">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PlacesPage;
