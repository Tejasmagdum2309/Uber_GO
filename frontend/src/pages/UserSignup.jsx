import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast,ToastContainer } from 'react-toastify'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'

const UserSignup = () => {
  const navigate = useNavigate()
  const { setUser } = useContext(UserDataContext)

  // Formik and Yup Validation Schema
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(3, 'First name must be at least 3 characters')
      .required('First name is required'),
    lastName: Yup.string()
      .min(4,"last name must be at least 4 characters")
      .required('Last name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  })

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values , { resetForm }) => {
      try {
        const newUser = {
          fullname: {
            firstname: values.firstName,
            lastname: values.lastName,
          },
          email: values.email,
          password: values.password,
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)

        if (response.status === 201) {
          const data = response.data
          setUser(data.user)
          localStorage.setItem('token', data.token)
          navigate('/home')
          toast.success('Account created successfully!')
        }
      } catch (error) {
        toast.error('Registration failed. Please try again.', {
          position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,

progress: undefined,
theme: "dark",
        })
      }

      resetForm();
    },
  })

  return ( <>
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-16 mb-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" alt="Logo" />

        <form onSubmit={formik.handleSubmit}>
          <h3 className='text-lg w-1/2 font-medium mb-2'>What's your name</h3>
          <div className='flex gap-4 mb-7'>
            <div className='w-1/2'>
            <input
              className='bg-[#eeeeee] w-full rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='First name'
              {...formik.getFieldProps('firstName')}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <div className="text-red-500 text-sm">{formik.errors.firstName}</div>
            )}</div>
            <div className='w-1/2'>
            <input
              className='bg-[#eeeeee] w-full rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Last name'
              {...formik.getFieldProps('lastName')}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <div className="text-red-500 text-sm">{formik.errors.lastName}</div>
            )}</div>
          </div>

          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input
            className={`bg-[#eeeeee] ${ !(formik.touched.email && formik.errors.email)  ? "mb-7" :  ""} rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base`}
            type="email"
            placeholder='email@example.com'
            {...formik.getFieldProps('email')}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm mb-6">{formik.errors.email}</div>
          )}

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input
            className={`bg-[#eeeeee]  ${ !(formik.touched.password && formik.errors.password)  ? "mb-7" :  ""} rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base`}
            type="password"
            placeholder='Password'
            {...formik.getFieldProps('password')}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-sm mb-6">{formik.errors.password}</div>
          )}

          <button
            type="submit"
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
          >
            Create Account
          </button>
        </form>

        <p className='text-center'>
          Already have an account? <Link to='/login' className='text-blue-600'>Login here</Link>
        </p>
      </div>
      {/* <div>
        <p className='text-[10px] leading-tight'>
          This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and
          <span className='underline'>Terms of Service apply</span>.
        </p>
      </div> */}
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
  )
}

export default UserSignup
