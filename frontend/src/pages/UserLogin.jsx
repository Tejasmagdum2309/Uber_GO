import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
const UserLogin = () => {
  const { setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  // Validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 4 characters')
      .required('Password is required'),
  });

  // Formik for form handling
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/users/login`,
          values
        );

        if (response.status === 200) {
          const data = response.data;
          setUser(data.user);
          localStorage.setItem('token', data.token);
          navigate('/home');
        }
      } catch (error) {
        console.log(error)
        // console.error('Login error:', error.response?.data || error.message);
        toast.error(error.response.data.message, {
          position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,

progress: undefined,
theme: "dark",
        });
      }

      resetForm();
    },
  });

  return (
    <>
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s"
          alt="logo"
        />

        <form onSubmit={formik.handleSubmit}>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            className="bg-[#eeeeee] mb-2 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            name="email"
            placeholder="email@example.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm mb-4">{formik.errors.email}</div>
          )}

          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            className="bg-[#eeeeee] mb-2 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
            type="password"
            name="password"
            placeholder="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-sm mb-4">{formik.errors.password}</div>
          )}

          <button
            type="submit"
            className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base"
          >
            Login
          </button>
        </form>

        <p className="text-center">
          New here? <Link to="/signup" className="text-blue-600">Create new Account</Link>
        </p>
      </div>
      <div>
        <Link
          to="/captain-login"
          className="bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
    
    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default UserLogin;
