import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signup, login } from '../redux/userSlice';

const validationSchemaSignUp = Yup.object({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  username: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[@$!%*?&#]/, 'Password must contain at least one special character')
    .required('Required'),
});

const validationSchemaLogin = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[@$!%*?&#]/, 'Password must contain at least one special character')
    .required('Required'),
});

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formikSignUp = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchemaSignUp,
    onSubmit: async (values) => {
      try {
        await dispatch(signup(values));
        console.log('Signup successful');
        navigate('/');
      } catch (error) {
        console.error('Signup error:', error);
      }
    },
  });

  const formikLogin = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchemaLogin,
    onSubmit: async (values) => {
      try {
        await dispatch(login(values));
        console.log('Login successful');
        navigate('/');
      } catch (error) {
        console.error('Login error:', error);
      }
    },
  });

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={formikLogin.handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formikLogin.handleChange}
          value={formikLogin.values.email}
        />
        {formikLogin.errors.email && <div>{formikLogin.errors.email}</div>}
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formikLogin.handleChange}
          value={formikLogin.values.password}
        />
        {formikLogin.errors.password && <div>{formikLogin.errors.password}</div>}
        <button type="submit">Login</button>
      </form>
      <h2>Sign Up</h2>
      <form onSubmit={formikSignUp.handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          onChange={formikSignUp.handleChange}
          value={formikSignUp.values.firstName}
        />
        {formikSignUp.errors.firstName && <div>{formikSignUp.errors.firstName}</div>}
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          onChange={formikSignUp.handleChange}
          value={formikSignUp.values.lastName}
        />
        {formikSignUp.errors.lastName && <div>{formikSignUp.errors.lastName}</div>}
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          onChange={formikSignUp.handleChange}
          value={formikSignUp.values.username}
        />
        {formikSignUp.errors.username && <div>{formikSignUp.errors.username}</div>}
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formikSignUp.handleChange}
          value={formikSignUp.values.email}
        />
        {formikSignUp.errors.email && <div>{formikSignUp.errors.email}</div>}
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formikSignUp.handleChange}
          value={formikSignUp.values.password}
        />
        {formikSignUp.errors.password && <div>{formikSignUp.errors.password}</div>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default LoginPage;
