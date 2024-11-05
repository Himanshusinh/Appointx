import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Inputbox from './Inputbox';
import { db, auth, provider } from '../../firebase/firebase';
import { createUserWithEmailAndPassword, sendEmailVerification, reload, signInWithPopup } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';

const Vendorsignup = () => {
  const navigate = useNavigate();

  // State variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [checkboxError, setCheckboxError] = useState('');
  const [waitingForVerification, setWaitingForVerification] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [userUID, setUserUID] = useState('');

  // Validation functions
  const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  const validatePassword = (password) => /^(?=.*[A-Z])(?=.*[@$!%*?&])(?=.*[0-9]).{8,}$/.test(password);

  // Input handlers
  const handleEmailInput = (e) => {
    setEmail(e.target.value);
    if (!validateEmail(e.target.value)) {
      setEmailError('Please enter a valid email address with "@" and ".com".');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
    if (!validatePassword(e.target.value)) {
      setPasswordError(
        <div>
          <a>Password must contain at least 8 characters, <br /> 1 uppercase letter, 1 number, and 1 special character <br /> (@, $, !, %, *, ?, &)</a>
        </div>
      );
    } else {
      setPasswordError('');
    }
  };

  const handleConfirmPassInput = (e) => {
    setConfirmpassword(e.target.value);
    if (e.target.value !== password) {
      setConfirmPasswordError('Passwords do not match.');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (isChecked) {
      setCheckboxError('You must agree to the terms and conditions to sign up.');
    } else {
      setCheckboxError('');
    }
  };

  // Handle signup button
  const handleSignupBtn = async () => {
    if (!isChecked) {
      setCheckboxError('You must agree to the terms and conditions to sign up.');
      return;
    }

    if (emailError || passwordError || confirmPasswordError) {
      return;
    }

    if (!email || !password || !confirmpassword) {
      if (!email) setEmailError('Email is required.');
      if (!password) setPasswordError('Password is required.');
      if (!confirmpassword) setConfirmPasswordError('Confirm password is required.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setUserUID(user.uid);

      await sendEmailVerification(user);
      await addDoc(collection(db, 'vendoremailpassword'), {
        email: email,
        password: password,
        verified: false,
        uid: user.uid,
      });

      alert('Verification email sent! Please check your inbox.');
      setVerificationSent(true);
      setWaitingForVerification(true);
    } catch (err) {
      console.error('Signup error:', err.message);
      if (err.code === 'auth/email-already-in-use') {
        setEmailError('Email is already in use.');
      } else if (err.code === 'auth/invalid-email') {
        setEmailError('Invalid email address.');
      } else if (err.code === 'auth/weak-password') {
        setPasswordError('Password is too weak.');
      } else {
        setEmailError('An error occurred. Please try again.');
      }
    }
  };

  const checkEmailVerification = async () => {
    const user = auth.currentUser;
    if (user) {
      await reload(user);
      if (user.emailVerified) {
        setWaitingForVerification(false);
        navigate(`/vendorRegister/${userUID}`); // Redirect to RegisterMain with UID
      } else {
        alert('Email not verified yet. Please check your inbox and verify your email.');
      }
    }
  };

  useEffect(() => {
    if (waitingForVerification) {
      const interval = setInterval(() => {
        checkEmailVerification();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [waitingForVerification]);


  const handlesigninwithgoogle = async () => {
    try{
      await signInWithPopup(auth, provider);
    }catch(err){
      console.error(err);
      
    }
  }

  return (
    <div>
      <div>
        <img
          src="/Selectionscreen/Logo.svg"
          className='w-32 m-10 cursor-pointer'
          alt="Logo"
          onClick={() => navigate('/')}
        />
      </div>

      <div className='flex justify-center'>
        <div className='flex flex-col'>
          <h1 className='text-4xl font-bold'>Get Started With Your <br /> Appointments 👋</h1>
          <p className='mt-8'>
            Today is a new day. It's your day. You shape it.<br />  Sign upto start managing your appointments.
          </p>
        </div>
      </div>

      <div className='flex justify-center mt-8'>
        <div className='flex flex-col gap-5'>
          <div>
            <Inputbox label="Email" placeholder="example@gmail.com" handlechanges={handleEmailInput} />
            {emailError && <p className='text-red-500 text-sm'>{emailError}</p>}
          </div>
          <div>
            <Inputbox label="Password" placeholder="At least 8 characters" handlechanges={handlePasswordInput} />
            {passwordError && <p className='text-red-500 text-sm'>{passwordError}</p>}
          </div>
          <div>
            <Inputbox label="Confirm Password" placeholder="Confirm password" handlechanges={handleConfirmPassInput} />
            {confirmPasswordError && <p className='text-red-500 text-sm'>{confirmPasswordError}</p>}
          </div>
        </div>
      </div>

      <div className='flex justify-center mt-3 -ml-28'>
        <input
          type="checkbox"
          className='mr-2'
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <p className='text-sm'>
          I agree to the <span className='text-blue-500 cursor-pointer'>terms and conditions</span>
        </p>
      </div>

      {checkboxError && (
        <div className='flex justify-center mt-2'>
          <p className='text-red-500 text-sm'>{checkboxError}</p>
        </div>
      )}

      <div className='flex justify-center mt-3'>
        {!verificationSent ? (
          <button className='bg-maintheme w-96 h-12 rounded-xl text-white' onClick={handleSignupBtn}>
            Sign up
          </button>
        ) : (
          <button className='bg-maintheme w-96 h-12 rounded-xl text-white' onClick={checkEmailVerification}>
            Verify Email and Proceed
          </button>
        )}
      </div>

      <div className='flex justify-center mt-8'>
        <p>----------------------or----------------------</p>
      </div>

      <div className='flex justify-center mt-8'>
        <button className='bg-signinwithgoogle w-96 h-12 rounded-xl flex justify-center gap-2' onClick={handlesigninwithgoogle}>
          <img src="/core/google.svg" className='w-6 mt-3' alt="Google Logo" />
          <span className='mt-3'>Sign in with Google</span>
        </button>
      </div>

      <div className='flex justify-center mt-7'>
        <p>You already have an account? <span className='text-maintheme ml-2 cursor-pointer' onClick={() => navigate('/vendorsignin')}>Sign in</span></p>
      </div>

      <div className='flex justify-center mt-14'>
        <p className='text-gray-500'>© 2024 ALL RIGHTS RESERVED</p>
      </div>
    </div>
  );
};

export default Vendorsignup;
