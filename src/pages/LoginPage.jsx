import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import { auth } from '../Authentication/firebase.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
        .matches(/\d/, 'Password must contain at least one number')
        .matches(/[@$!%*?&]/, 'Password must contain at least one special character')
        .required('Required'),
});

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignup = async (values, { setSubmitting }) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
            const user = userCredential.user;
            dispatch(setUser({ uid: user.uid, displayName: user.displayName }));
            console.log('Signup successful');
            navigate('/'); // Navigate to the home page on successful login
        } catch (error) {
            console.error('Signup error:', error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleLogin = async (values, { setSubmitting }) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
            const user = userCredential.user;
            dispatch(setUser({ uid: user.uid, displayName: user.displayName }));
            console.log('Login successful');
            navigate('/'); // Navigate to the home page on successful login
        } catch (error) {
            console.error('Login error:', error.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
        <Navbar/>
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900" style={{overflow:'hidden'}}>Login / Signup</h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-[#efefef] py-8 px-6 shadow sm:rounded-lg sm:px-10">
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleLogin} // Change to handleSignup for signup form
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-6">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                            Email
                                        </label>
                                        <Field
                                            type="email"
                                            name="email"
                                            id="email"
                                            autoComplete="email"
                                            required
                                            className="mt-1 block w-full shadow-sm sm:text-sm focus:outline-none border-gray-300 rounded-md px-3 py-2"
                                        />
                                        <ErrorMessage name="email" component="p" className="mt-2 text-sm text-red-600" />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                            Password
                                        </label>
                                        <Field
                                            type="password"
                                            name="password"
                                            id="password"
                                            autoComplete="current-password"
                                            required
                                            className="mt-1 block w-full shadow-sm sm:text-sm focus:outline-none border-gray-300 rounded-md px-3 py-2"
                                        />
                                        <ErrorMessage name="password" component="p" className="mt-2 text-sm text-red-600" />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        {isSubmitting ? 'Submitting...' : 'Login'}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>

                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleSignup} // Change to handleLogin for login form
                        >
                        {({ isSubmitting }) => (
                            <Form className="mt-8 space-y-6">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                            Email
                                        </label>
                                        <Field
                                            type="email"
                                            name="email"
                                            id="email"
                                            autoComplete="email"
                                            required
                                            className="mt-1 block w-full shadow-sm sm:text-sm focus:outline-none border-gray-300 rounded-md px-3 py-2"
                                        />
                                        <ErrorMessage name="email" component="p" className="mt-2 text-sm text-red-600" />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                            Password
                                        </label>
                                        <Field
                                            type="password"
                                            name="password"
                                            id="password"
                                            autoComplete="current-password"
                                            required
                                            className="mt-1 block w-full shadow-sm sm:text-sm focus:outline-none border-gray-300 rounded-md px-3 py-2"
                                        />
                                        <ErrorMessage name="password" component="p" className="mt-2 text-sm text-red-600" />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        {isSubmitting ? 'Submitting...' : 'Signup'}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
        <Footer/>
     </>
    );
};

export default LoginPage;
