// import 'dotenv/config';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const inputNameHandler = (e) => {
    setName(e.target.value);
  };

  const inputEmailHandler = (e) => {
    setEmail(e.target.value);
  };

  const inputPassHandler = (e) => {
    setPassword(e.target.value);
  };

  const registerUserHandler = async (e) => {
    e.preventDefault();
    try {
      // console.log("ASS", process.env.SERVER_BASE_URL) // remove this after you've confirmed it is working
      await axios.post(`/api/registry`, {
        name,
        email,
        password,
      });

      alert('Registration successful. Now you can log in');
    } catch (err) {
      alert('Email already in use...');
    }
  };

  return (
    <div>
      <div className="mt-4 grow flex items-center justify-around">
        <div className="mb-64">
          <h1 className="text-4xl text-center mb-4">Register</h1>
          <form className="max-w-md mx-auto" onSubmit={registerUserHandler}>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={inputNameHandler}
            />
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
            <button className="primary">Registration</button>
            <div className="text-center py-2 text-gray-500">
              Alreagy a member?{' '}
              <Link className="underline text-black" to={'/login'}>
                Login now
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
