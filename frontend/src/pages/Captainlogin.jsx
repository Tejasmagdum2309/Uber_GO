import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../context/CapatainContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Captainlogin = () => {
  const { setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  // Formik and Yup Validation Schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/captains/login`,
          values
        );

        if (response.status === 200) {
          const data = response.data;

          setCaptain(data.captain);
          localStorage.setItem('token', data.token);
          toast.success('Login successful!');
          navigate('/captain-home');
        }
      } catch (error) {
        toast.error('Login failed. Please check your credentials.');
      }
      finally {
        resetForm();
      }

    },
  });

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <ToastContainer />
      <div>
        <img
          className='w-20 mb-3'
          src='https://www.svgrepo.com/show/505031/uber-driver.svg'
          alt='Uber Driver Logo'
        />

        <form onSubmit={formik.handleSubmit}>
          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input
            className={`bg-[#eeeeee]  ${ !(formik.touched.email && formik.errors.email)  ? "mb-7" :  ""}  rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base`}
            type='email'
            placeholder='email@example.com'
            {...formik.getFieldProps('email')}
          />
          {formik.touched.email && formik.errors.email && (
            <div className='text-red-500 text-sm mb-6'>{formik.errors.email}</div>
          )}

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input
            className={`bg-[#eeeeee]  ${ !(formik.touched.password && formik.errors.password)  ? "mb-7" :  ""}  rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base`}
            type='password'
            placeholder='Password'
            {...formik.getFieldProps('password')}
          />
          {formik.touched.password && formik.errors.password && (
            <div className='text-red-500 text-sm mb-6'>{formik.errors.password}</div>
          )}

          <button
            type='submit'
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg'
          >
            Login
          </button>
        </form>

        <p className='text-center'>
          Join a fleet?{' '}
          <Link to='/captain-signup' className='text-blue-600'>
            Register as a Captain
          </Link>
        </p>
      </div>
      <div>
        <Link
          to='/login'
          className='bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg'
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default Captainlogin;
