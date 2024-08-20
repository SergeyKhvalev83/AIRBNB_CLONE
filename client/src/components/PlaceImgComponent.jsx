import {} from 'react';

const PlaceImgComponent = ({place, index=0, className=null}) => {
 
  if (!place?.photos.length) {
    return '';
  }

  if(!className){
    className="object-cover"
  }
  return (
    <>
      <img
        className={className}
        src={`http://localhost:5001/uploads/${place.photos[index]}`}
        alt="my-place-photo"
      />
    </>
  );
};

export default PlaceImgComponent;
