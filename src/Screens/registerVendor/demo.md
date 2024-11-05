import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Input from './instance/Input';
import Box from './instance/Box';
import Phonenumber from './instance/Phonenumber';
import Options from './instance/Options';
import LargeInput from './instance/LargeInput';
import UploadDocuments from './instance/UploadDocuments';
import { db } from '../../firebase/firebase.js';
import { collection, doc, setDoc } from 'firebase/firestore';

const RegisterInput = () => {
  const { uid } = useParams(); // Get UID from URL parameters

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');

  const [phonenumber, setPhonenumber] = useState('');
  const [franchise, setFranchise] = useState('');
  const [businessDescription, setBusinessDescription] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [license, setLicense] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState(null); // State to track selected Box

  const handleDocumentUpload = (type) => (file) => {
    if (type === 'profilePhoto') {
      setProfilePhoto(file);
    } else if (type === 'license') {
      setLicense(file);
    }
  };

  const handleChange = (setter) => (e) => setter(e.target.value);
  const handleCheckboxChange = () => setTermsAccepted(!termsAccepted);

  const experienceRanges = ['0<0', '1<2', '3<4', '5>..'];

  const handleRegisterButton = async () => {
    if (!termsAccepted) {
      alert('You must agree to the terms and conditions to sign up.');
      return;
    }

    if (!profilePhoto) {
      alert('Profile Photo is required.');
      return;
    }

    try {
      const vendorRef = doc(collection(db, 'VendorDetails'), uid); // Use UID for document ID
      await setDoc(vendorRef, {
        firstname,
        lastname,
        companyname: companyName,
        companyemail: companyEmail,
        phonenumber,
        franchise,
        description: businessDescription,
        companyaddress: companyAddress,
        profilePhoto: profilePhoto ? profilePhoto.name : null, // Store file name or path
        license: license ? license.name : null, // Store file name or path
        experience: selectedExperience !== null ? experienceRanges[selectedExperience] : null, // Store selected experience
      });
      alert('Data Uploaded Successfully');
    } catch (err) {
      console.error('Error uploading data:', err);
    }
  };

  const handleBoxClick = (index) => {
    setSelectedExperience(index); // Set the selected experience
  };

  return (
    <>
      <div className='flex mt-10'>
        <div>
          <img className='ml-20' src="https://firebasestorage.googleapis.com/v0/b/appointx-badae.appspot.com/o/vendordetails%2FLine%207.png?alt=media&token=9a459838-0bb4-4f3b-9715-b806a454b051" alt="Line" />

          <div className='flex ml-8'>
            <Input title="First Name" placeholder="Your Name" width="96" handlechanges={handleChange(setFirstname)} />
            <Input title="Last Name" placeholder="Surname" handlechanges={handleChange(setLastname)} />
          </div>

          <div className='flex ml-8'>
            <Input title="Company" placeholder="Company Name" handlechanges={handleChange(setCompanyName)} />
            <Input title="Work email" placeholder="Email" handlechanges={handleChange(setCompanyEmail)} />
          </div>

          <div className='flex ml-20 mt-10'>
            <div>
              <span className='text-RegisterTitle'>Number of Experience</span>
              <div className='flex gap-5 mt-2'>
                {experienceRanges.map((range, index) => (
                  <Box
                    key={index}
                    range={range}
                    isSelected={selectedExperience === index}
                    onClick={() => handleBoxClick(index)}
                  />
                ))}
              </div>
            </div>

            <div className='ml-14'>
              <span className='text-RegisterTitle'>Phone Number</span>
              <Phonenumber handleonchange={handleChange(setPhonenumber)} />
            </div>
          </div>

          <div className='flex ml-20 mt-10'>
            <div className='flex'>
              <Options />
            </div>

            <div className='-mt-16'>
              <Input title="Describe Business Type (Self Developed or Franchise)" handlechanges={handleChange(setFranchise)} />
            </div>
          </div>

          <div className='flex ml-8'>
            <LargeInput title="Business Description" handellargeinput={handleChange(setBusinessDescription)} />
          </div>

          <div className='flex ml-8'>
            <LargeInput title="Company Address" handellargeinput={handleChange(setCompanyAddress)} />
          </div>

          <div className='flex ml-20 mt-5'>
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={handleCheckboxChange}
              id="terms"
              aria-label="Terms and conditions"
            />
            <label htmlFor="terms" className='ml-2 mt-2'>I agree with <span className='text-blue-600'>Terms and Conditions</span></label>

            <button
              className='ml-[250px] w-32 h-10 text-center text-white bg-maintheme cursor-pointer'
              onClick={handleRegisterButton}
            >
              Register
            </button>
          </div>
        </div>

        <div className='ml-10'>
          <img src="https://firebasestorage.googleapis.com/v0/b/appointx-badae.appspot.com/o/vendordetails%2FLine%209.png?alt=media&token=a11ddf3e-bb85-458a-b6d6-e238518f5425" alt="Line" />
        </div>

        <div>
          <img className='ml-10' src="https://firebasestorage.googleapis.com/v0/b/appointx-badae.appspot.com/o/vendordetails%2FLine%208.png?alt=media&token=d23c8720-8554-49bc-b54c-828421e43754" alt="Line" />

          <div>
            <UploadDocuments 
              title="Upload Profile Photo" 
              isRequired={true} 
              maxFileSizeMB={2}  // Limit to 2 MB
              onUpload={handleDocumentUpload('profilePhoto')}
            />
            <UploadDocuments 
              title="Upload Licence (optional)" 
              isRequired={false} 
              maxFileSizeMB={10} // Limit to 10 MB
              onUpload={handleDocumentUpload('license')}
            />
          </div>
        </div>
      </div>

      <div className="w-auto bg-footerBackgroundColor flex align-center p-20 justify-center mt-10">
        <div>
          <a className='text-4xl font-semibold'>AppointX</a>
          <p className='w-80 text-xs pt-2 text-DescriptionColor'>
            Effortlessly book doctor visits, spa sessions, or business meetings on our user-friendly platform. Stay organized and never miss an appointment with our streamlined booking system!
          </p>
        </div>

        <div className="ml-20">
          <a className='text-2xl font-semibold'>Useful Links</a>
          <ul>
            <li className='text-DescriptionColor pt-2'>Home</li>
            <li className='text-DescriptionColor pt-2'>Service</li>
            <li className='text-DescriptionColor pt-2'>Blog</li>
            <li className='text-DescriptionColor pt-2'>About</li>
          </ul>
        </div>

        <div className="ml-32">
          <a className='text-2xl font-semibold'>Contact</a>
          <p className='text-DescriptionColor'>appointx@gmail.com</p>
        </div>
      </div>
    </>
  );
};

export default RegisterInput;
