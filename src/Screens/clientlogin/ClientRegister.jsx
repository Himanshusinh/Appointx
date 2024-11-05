import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Inputbox from './Inputbox';
// Firebase imports
import { db, auth, provider } from '../../firebase/firebase';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithPopup, onAuthStateChanged, reload } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';

const ClientRegister = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleSignInClick = () => {
    navigate('/clientSignin');
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [checkboxError, setCheckboxError] = useState('');
  const [waitingForVerification, setWaitingForVerification] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[@$!%*?&])(?=.*[0-9]).{8,}$/;
    return passwordRegex.test(password);
  };

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
    setConfirmPassword(e.target.value);
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

  const handleSignupBtn = async () => {
    if (!isChecked) {
      setCheckboxError('You must agree to the terms and conditions to sign up.');
      return;
    }

    if (emailError || passwordError || confirmPasswordError) {
      return;
    }

    if (!email || !password || !confirmPassword) {
      if (!email) setEmailError('Email is required.');
      if (!password) setPasswordError('Password is required.');
      if (!confirmPassword) setConfirmPasswordError('Confirm password is required.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await sendEmailVerification(user);

      await addDoc(collection(db, 'clientemailpassword'), {
        email: email,
        password: password,
        verified: false
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

  const handleGoogleAuth = async () => {
    try {
      await signInWithPopup(auth, provider);
      alert('Welcome to Appoint X!');
      navigate('/');
    } catch (err) {
      console.error('Error during Google Sign-In:', err);
      alert('Google Sign-In failed. Please try again.');
    }
  };

  const checkEmailVerification = async () => {
    const user = auth.currentUser;
    if (user) {
      await reload(user);
      if (user.emailVerified) {
        setVerificationStatus(true);
        setWaitingForVerification(false);
        navigate('/');
      } else {
        alert('Email not verified yet. Please check your inbox and verify your email.');
      }
    }
  };

  useEffect(() => {
    if (waitingForVerification) {
      const interval = setInterval(() => {
        checkEmailVerification();
      }, 5000); // Check every 5 seconds

      return () => clearInterval(interval);
    }
  }, [waitingForVerification]);

  return (
    <div>
      <div>
        <img
          src="/Selectionscreen/Logo.svg"
          onClick={handleLogoClick}
          className='w-32 m-10 cursor-pointer'
          alt="Logo"
        />
      </div>

      <div className='flex justify-center'>
        <div className='flex flex-col'>
          <h1 className='text-4xl font-bold'>Get Started now 👋</h1>
          <p className='mt-8 space-x-2'>
            Today is a new day. It's your day. You shape it. 
            Sign up to start <br /> managing your appointment.
          </p>
        </div>
      </div>

      <div className='flex justify-center mt-8 ml-[-100px]'>
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

      <div className='flex justify-center -ml-52 mt-3'>
        <input
          type="checkbox"
          className='-ml-2 mr-2'
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <p className='text-sm'>
          I agree to the <span>terms and conditions</span>
        </p>
      </div>

      {checkboxError && (
        <div className='flex justify-center -ml-52 mt-2'>
          <p className='text-red-500 text-sm ml-28'>{checkboxError}</p>
        </div>
      )}

      <div className='flex justify-center'>
        {!verificationSent ? (
          <button className='bg-button w-96 h-12 rounded-xl text-white -ml-24 mt-3' onClick={handleSignupBtn}>
            Sign up
          </button>
        ) : (
          <button className='bg-button w-96 h-12 rounded-xl text-white -ml-24 mt-3' onClick={checkEmailVerification}>
            Verify Email and Proceed
          </button>
        )}
      </div>

      <div className='flex justify-center'>
        <p className='-ml-20 mt-8'>----------------------or----------------------</p>
      </div>

      <div className='flex justify-center'>
        <button className='bg-signinwithgoogle w-96 h-12 rounded-xl -ml-20 mt-8 flex justify-center gap-2' onClick={handleGoogleAuth}>
          <img src="/core/google.svg" className='w-6 mt-3' alt="Google Logo" />
          <p className='text-black mt-3'>Sign in with Google</p>
        </button>
      </div>

      <div className='flex justify-center -ml-20 mt-7'>
        <p className='-ml-4 mt-8'>
          Already have an account? 
          <span className='text-blue-500 cursor-pointer' onClick={handleSignInClick}>Sign in</span>
        </p>
      </div>

      <div className='flex justify-center mt-14'>
        <p className='text-silver'>© 2024 ALL RIGHTS RESERVED</p>
      </div>
    </div>
  );
};

export default ClientRegister;
