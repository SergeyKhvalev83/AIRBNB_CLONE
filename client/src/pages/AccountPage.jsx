import axios from 'axios';
import { useContext } from 'react';
import { Navigate, Link, useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const AccountPage = () => {
  const { user, ready } = useContext(UserContext);
  const { subpage } = useParams();
  const linkClasses = (type = null) => {
    let classes = 'py-2 px-6';
    if (type === subpage || (subpage === undefined && type === 'profile')) {
      classes += ' bg-primary text-white rounded-full';
    }

    return classes;
  };

  if (!ready) {
    return 'loading...';
  }

  if (ready && !user) {
    return <Navigate to={'/login'} />;
  }

  return (
    <div>
      <nav className="w-full flex justify-center mt-8 gap-2">
        <Link className={linkClasses('profile')} to="/account/">
          My account
        </Link>
        <Link className={linkClasses('bookings')} to="/account/bookings">
          My bookings
        </Link>
        <Link className={linkClasses('places')} to="/account/places">
          My accommodations
        </Link>
      </nav>
    </div>

    //<div>ACCOUNT PAGE for {!!user && <div>{user.name}</div>}</div>
    //<div>ACCOUNT PAGE for {user?.name}</div>}</div>; works also
  );
};

export default AccountPage;
