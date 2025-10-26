import React, { useContext, useState } from 'react';
import BottomNav from '../AppComponents/BottomNav';
import axios from 'axios';
import { AppContext } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const { setUser, backendUrl } = useContext(AppContext);
  const [state, setState] = useState('login'); // login or signup
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const endpoint =
        state === 'login'
          ? `${backendUrl}/auth/login`
          : `${backendUrl}/auth/signup`;

      const res = await axios.post(endpoint, formData, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(
          state === 'login' ? 'Login successful!' : 'Signup successful!'
        );

        // ✅ Save user in context only (cookie handles persistence)
        setUser(res.data.user);
        localStorage.setItem('user', JSON.stringify(res.data.user));

        navigate('/');
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Something went wrong!');
    }
  };

  const handleGoogleLogin = () => {
    window.open(`${backendUrl}/auth/google`, "_self");
  };

  return (
    <div className='flex items-center justify-center mt-10'>
      <div className='bg-white text-gray-500 max-w-96 mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10'>
        <h2 className='text-2xl font-semibold mb-6 text-center text-gray-800'>
          {state === 'login' ? 'Welcome back' : 'Sign Up'}
        </h2>

        <form onSubmit={handleSubmit}>
          {state === 'signup' && (
            <input
              id='name'
              className='w-full bg-transparent border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4'
              type='text'
              placeholder='Full Name'
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}

          <input
            id='email'
            className='w-full bg-transparent border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4'
            type='email'
            placeholder='Enter your email'
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            id='password'
            className='w-full bg-transparent border mt-1 border-gray-500/30 outline-none rounded-full py-2.5 px-4'
            type='password'
            placeholder='Enter your password'
            value={formData.password}
            onChange={handleChange}
            required
          />

          <div className='text-right py-4'>
            <a className='text-blue-600 underline' href='#'>
              Forgot Password
            </a>
          </div>

          <button
            type='submit'
            className='w-full mb-3 bg-indigo-500 py-2.5 rounded-full text-white'
          >
            {state === 'login' ? 'Log in' : 'Sign Up'}
          </button>
        </form>

        {state === 'login' ? (
          <p
            onClick={() => setState('signup')}
            className='text-center mt-4 cursor-pointer'
          >
            Don’t have an account?{' '}
            <span className='text-blue-500 underline'>Signup</span>
          </p>
        ) : (
          <p
            onClick={() => setState('login')}
            className='text-center mt-4 cursor-pointer'
          >
            Already have an account?{' '}
            <span className='text-blue-500 underline'>Login</span>
          </p>
        )}

        <button
          onClick={handleGoogleLogin}
          type='button'
          className='w-full flex items-center gap-2 justify-center my-3 bg-white border border-gray-500/30 py-2.5 rounded-full text-gray-800'
        >
          <img
            className='h-4 w-4'
            src='https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png'
            alt='googleFavicon'
          />
          Log in with Google
        </button>
      </div>

      <BottomNav />
    </div>
  );
};

export default Login;
