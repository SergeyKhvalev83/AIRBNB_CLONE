import { Link } from 'react-router-dom';

const RegisterPage = () => {
  return (
    <div>
       <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto">
        <input type="text" placeholder="John Doe" />
          <input type="email" placeholder="your email" />
          <input type="password" placeholder="password" />
          <button className="primary">Registration</button>
          <div className="text-center py-2 text-gray-500">
           Alreagy a member? <Link className="underline text-black" to={'/login'}>
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