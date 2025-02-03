import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CaptainDataContext } from '../context/CapatainContext';
import axios from 'axios';

const CaptainSignup = () => {
  const navigate = useNavigate();
  const { setCaptain } = useContext(CaptainDataContext);

  // Formik setup for form handling
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      vehicleColor: '',
      vehiclePlate: '',
      vehicleCapacity: '',
      vehicleType: ''
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
      vehicleColor: Yup.string().required('Vehicle color is required'),
      vehiclePlate: Yup.string().required('Vehicle plate is required'),
      vehicleCapacity: Yup.number()
        .positive('Vehicle capacity must be positive')
        .required('Vehicle capacity is required'),
      vehicleType: Yup.string().required('Vehicle type is required')
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const captainData = {
          fullname: {
            firstname: values.firstName,
            lastname: values.lastName
          },
          email: values.email,
          password: values.password,
          vehicle: {
            color: values.vehicleColor,
            plate: values.vehiclePlate,
            capacity: values.vehicleCapacity,
            vehicleType: values.vehicleType
          }
        };

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData);

        if (response.status === 201) {
          const data = response.data;
          setCaptain(data.captain);
          localStorage.setItem('token', data.token);
          navigate('/captain-home');
        }
        resetForm();
      } catch (error) {
        console.error('Error registering captain:', error);
      }
    }
  });

  return (
    <div className="py-5 px-5 h-screen flex flex-col justify-between">
      <div>
        <img className="w-20 mb-3" src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />

        <form onSubmit={formik.handleSubmit}>
          <h3 className="text-lg w-full font-medium mb-2">What's our Captain's name</h3>
          <div className="flex gap-4 mb-7">
            <div className='w-1/2'>
            <input
              className="bg-[#eeeeee] w-full rounded-lg px-4 py-2 border text-lg placeholder:text-base"
              type="text"
              name="firstName"
              placeholder="First name"
              {...formik.getFieldProps('firstName')}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className="text-red-500 text-sm">{formik.errors.firstName}</div>
            ) : null}</div>

            <div className='w-1/2'>
            <input
              className="bg-[#eeeeee] w-full rounded-lg px-4 py-2 border text-lg placeholder:text-base"
              type="text"
              name="lastName"
              placeholder="Last name"
              {...formik.getFieldProps('lastName')}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div className="text-red-500 text-sm">{formik.errors.lastName}</div>
            ) : null}</div>
          </div>

          <h3 className="text-lg font-medium mb-2">What's our Captain's email</h3>
          <input
            className={`bg-[#eeeeee] ${ !(formik.touched.email && formik.errors.email)  ? "mb-7" :  ""}  rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base`}
            type="email"
            name="email"
            placeholder="email@example.com"
            {...formik.getFieldProps('email')}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm mb-6">{formik.errors.email}</div>
          ) : null}

          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            className={`bg-[#eeeeee] ${ !(formik.touched.password && formik.errors.password)  ? "mb-7" :  ""}  rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base`}
            type="password"
            name="password"
            placeholder="password"
            {...formik.getFieldProps('password')}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500 text-sm mb-6">{formik.errors.password}</div>
          ) : null}

          <h3 className="text-lg font-medium mb-2">Vehicle Information</h3>
          <div className="flex gap-4 mb-7">
            <div className='w-1/2'>
            <input
              className="bg-[#eeeeee] w-full rounded-lg px-4 py-2 border text-lg placeholder:text-base"
              type="text"
              name="vehicleColor"
              placeholder="Vehicle Color"
              {...formik.getFieldProps('vehicleColor')}
            />
            {formik.touched.vehicleColor && formik.errors.vehicleColor ? (
              <div className="text-red-500 text-sm">{formik.errors.vehicleColor}</div>
            ) : null}</div>
            <div className='w-1/2'>

            <input
              className="bg-[#eeeeee] w-full rounded-lg px-4 py-2 border text-lg placeholder:text-base"
              type="text"
              name="vehiclePlate"
              placeholder="Vehicle Plate"
              {...formik.getFieldProps('vehiclePlate')}
            />
            {formik.touched.vehiclePlate && formik.errors.vehiclePlate ? (
              <div className="text-red-500 text-sm">{formik.errors.vehiclePlate}</div>
            ) : null} </div>
          </div>
          <div className="flex gap-4 mb-7">
          <div className='w-1/2'>

            <input
              className="bg-[#eeeeee] w-full rounded-lg px-4 py-2 border text-lg placeholder:text-base"
              type="number"
              name="vehicleCapacity"
              placeholder="Vehicle Capacity"
              {...formik.getFieldProps('vehicleCapacity')}
            />
            {formik.touched.vehicleCapacity && formik.errors.vehicleCapacity ? (
              <div className="text-red-500 text-sm">{formik.errors.vehicleCapacity}</div>
            ) : null} </div>

<div className='w-1/2'>

            <select
              className="bg-[#eeeeee] w-full rounded-lg px-4 py-2 border text-lg placeholder:text-base"
              name="vehicleType"
              {...formik.getFieldProps('vehicleType')}
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>
            {formik.touched.vehicleType && formik.errors.vehicleType ? (
              <div className="text-red-500 text-sm">{formik.errors.vehicleType}</div>
            ) : null} </div>
          </div>

          <button
            className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base"
            type="submit"
          >Create Captain Account</button>
        </form>

        <p className="text-center">Already have an account? <Link to="/captain-login" className="text-blue-600">Login here</Link></p>
      </div>
      
    </div>
  );
};

export default CaptainSignup;
