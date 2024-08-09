import { useState } from 'react';
import {  } from 'react-router-dom';
import axios from 'axios';
import PhotosUploaders from '../components/PhotosUploaders';
import PerksComponent from '../components/PerksComponent';

const NewPlacesFormPage = () => {
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);
  const [redirect, setRedirect] = useState('');

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

  const addNewPlaseHandler = async (ev) => {
    ev.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    };
    console.log('BASE BODY: ', placeData);
    const response = await axios.post('/api/my-places', { placeData });
    console.log('RESPONSE: ', response);

    // setRedirect('/account/places');
  };



  return (
    <div>
      <form onSubmit={addNewPlaseHandler}>
        {preInput('Title', 'Title for your place. Should be short and catchy')}
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

        <PhotosUploaders addedPhotos={addedPhotos} onChange={setAddedPhotos} />

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
              type="number"
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
              type="number"
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
  );
};

export default NewPlacesFormPage;
