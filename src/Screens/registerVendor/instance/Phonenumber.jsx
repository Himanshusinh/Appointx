import React, { useState } from 'react';

const Phonenumber = ({ handleonchange }) => {
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // Allow only numbers
    if (value.length > 10) {
      setError('Phone number cannot exceed 10 digits');
    } else {
      setError('');
      handleonchange({ target: { value } });
    }
  };

  return (
    <div className='flex mt-2'>
      <label className='w-14 h-12 border-2 flex justify-center items-center p-3'>+91</label>
      <div className='relative'>
        <input
          className={`w-56 h-12 p-3 border-spacing-5 border-2 ${error ? 'border-red-500' : ''}`}
          type="text"
          placeholder='000 000 0000'
          onChange={handleInputChange}
          maxLength="10" // Limit input length
        />
        {error && <div className='absolute text-red-500 text-xs mt-1'>{error}</div>}
      </div>
    </div>
  );
};

export default Phonenumber;
