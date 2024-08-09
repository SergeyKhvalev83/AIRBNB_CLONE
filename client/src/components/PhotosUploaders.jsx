import { useState } from 'react';
import axios from 'axios';

const PhotosUploaders = ({addedPhotos, onChange}) => {
  const [photoLink, setPhotoLink] = useState('');

  const addPhotoByLink = async (e) => {
    e.preventDefault();
    try {
      const { data: fileName } = await axios.post('/api/upload-by-link', {
        link: photoLink,
      });
      onChange((prev) => {
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
    onChange((prev) => {
      // set it as state as well
      return [...prev, ...response.data];
    });
  };

  return (
    <div>
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
              className="h-32 flex"
              key={Math.floor(Math.random() * 1000) + 1}
            >
              <img
                className="rounded-2xl w-full object-cover"
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
    </div>
  );
};

export default PhotosUploaders;
