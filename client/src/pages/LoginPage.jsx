import axios from 'axios';
import { useState, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  const inputEmailHandler = (e) => {
    setEmail(e.target.value);
  };

  const inputPassHandler = (e) => {
    setPassword(e.target.value);
  };

  const loginUserHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        '/api/login',
        {
          email,
          password,
        },
        
      );
      if (response.status === 200) {
        alert('Login successful');
        // const userParsed = response.json()
        setUser(response.data);
        setRedirect(true);
      }
    } catch (err) {
      console.log('ERROR WITH USER LOGIN: ', err);
      alert('Login failed... incorrect email or password');
    }
  };

  if (redirect) {
    return <Navigate to={'/account'} />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={loginUserHandler}>
          <input
            type="email"
            placeholder="your email"
            value={email}
            onChange={inputEmailHandler}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={inputPassHandler}
          />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don`t have and accoutn yet?{' '}
            <Link className="underline text-black" to={'/register'}>
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
