import axios from 'axios';
import { useContext, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import PlacesPage from './PlacesPage';
import NavigationComponent from '../components/NavigationComponent';

const AccountPage = () => {
  const [redirect, setRedirect] = useState(null);
  const { user, setUser, ready, setReady } = useContext(UserContext);
  let { subpage } = useParams();

  if (subpage === undefined) {
    subpage = 'profile';
  }

  const logoutHandler = async () => {
    await axios.post('/api/logout');
    setUser(null);
    setRedirect('/');
    console.log('redirect after logout ', redirect);
  };

  // if (!ready) {
  //   return 'loading...';
  // }

  if (!user & !redirect) {
    //ready &&
    return <Navigate to={'/login'} />;
  }

  if (redirect) {
    // to redirect after logout
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <NavigationComponent />
      {subpage === 'profile' && (
        <>
          <div className="text-center">
            Logged in as {user.name} ({user.email})
            <br />
            <button
              className="primary max-w-sm mx-auto mt-2"
              onClick={logoutHandler}
            >
              Logout
            </button>
          </div>
        </>
      )}

      {subpage === 'places' && <PlacesPage />}
    </div>

    //<div>ACCOUNT PAGE for {!!user && <div>{user.name}</div>}</div>
    //<div>ACCOUNT PAGE for {user?.name}</div>}</div>; works also
  );
};

export default AccountPage;
