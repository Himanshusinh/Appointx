import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Inputbox from './Inputbox';
// Firebase imports
import { db, provider, auth } from '../../firebase/firebase.js';
import { signInWithPopup } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';

const Vendorsignin = () => {
  const navigate = useNavigate();

  // State hooks for form data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle sign-up button click
  const handlesignupclk = () => {
    navigate('/vendorsignup');
  };

  // Function to handle logo click
  const handlelogoclk = () => {
    navigate('/');
  };

  const handleemailinput = (e) => {
    setEmail(e.target.value);
  };

  const handlepasswordinput = (e) => {
    setPassword(e.target.value);
  };

  // Function to handle sign-in button click
  const handlesigninbtn = async () => {
    try {
      const vendorData = collection(db, 'vendoremailpassword');
      const getData = await getDocs(vendorData);
      const filterData = getData.docs.map((doc) => doc.data());

      const user = filterData.find((user) => user.email === email && user.password === password);
      if (user) {
        // Redirect to home page on successful sign-in
        navigate('/');
      } else {
        alert('Wrong ID or Password');
      }
    } catch (err) {
      console.error(err);
      alert('Error during sign-in. Please try again.');
    }
  };

  // Function to handle Google sign-in
  const handlewithgoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      // Redirect or handle post-authentication here
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Google sign-in failed. Please try again.');
    }
  };

  return (
    <div>
      <div>
        <img 
          src="/Selectionscreen/Logo.svg" 
          onClick={handlelogoclk} 
          className='w-32 m-10 cursor-pointer' 
          alt="Logo"
        />
      </div>

      <div className='flex justify-center'>
        <div className='flex flex-col'>
          <h1 className='text-4xl font-bold'>Welcome Back Vendor 👋</h1>
          <p className='mt-8 space-x-2'>
            Today is a new day. It's your day. You shape it. 
            Sign in to start managing your appointments.
          </p>
        </div>
      </div>

      <div className='flex justify-center mt-8 ml-[-100px]'>
        <div className='flex flex-col gap-5'>
          <Inputbox 
            label="Email" 
            placeholder="example@gmail.com" 
            value={email}
            handlechanges={handleemailinput}
          />
          <Inputbox 
            label="Password" 
            placeholder="Password" 
            type="password"
            value={password}
            handlechanges={handlepasswordinput}
          />
        </div>
      </div>

      <div className='flex justify-center mt-3'>
        <a className='ml-32 text-button text-sm cursor-pointer'>Forgot password?</a>
      </div>

      <div className='flex justify-center'>
        <button 
          className='bg-button w-96 h-12 rounded-xl text-white -ml-24 mt-3' 
          onClick={handlesigninbtn}
        >
          Sign in
        </button>
      </div>

      <div className='flex justify-center'>
        <p className='-ml-20 mt-8'>----------------------or----------------------</p>
      </div>

      <div className='flex justify-center'>
        <button 
          className='bg-signinwithgoogle w-96 h-12 rounded-xl -ml-20 mt-8 flex justify-center gap-2' 
          onClick={handlewithgoogle}
        >
          <img src="/core/google.svg" className='w-6 mt-3' alt="Google Logo" />
          <span className='mt-3'>Sign in with Google</span>
        </button>
      </div>

      <div className='flex justify-center -ml-20 mt-7'>
        You don't have an account?
        <span 
          className='text-button ml-2 cursor-pointer' 
          onClick={handlesignupclk}
        >
          Sign up
        </span>
      </div>

      <div className='flex justify-center mt-14'>
        <p className='text-silver'>© 2024 ALL RIGHTS RESERVED</p>
      </div>
    </div>
  );
};

export default Vendorsignin;
