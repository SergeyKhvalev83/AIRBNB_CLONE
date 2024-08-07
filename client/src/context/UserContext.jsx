import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false)

  useEffect(() => { //to check if cookie token presented (to keep login) in case browser refresh
    if (!user) {
      axios.get('/api/profile').then(({data}) => {
        setUser(data);
        setReady(true)
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, ready, setReady }}>
      {children}
    </UserContext.Provider>
  );
}
