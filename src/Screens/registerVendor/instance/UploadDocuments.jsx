import React, { useState } from 'react';

const UploadDocuments = ({ title, isRequired, onUpload, maxFileSizeMB = 5 }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const maxSizeInBytes = maxFileSizeMB * 1048576; // Convert MB to bytes

      if (selectedFile.size > maxSizeInBytes) {
        setError(`File size exceeds ${maxFileSizeMB} MB. Please choose a smaller file.`);
        setFile(null);
        setFileName('');
        if (onUpload) {
          onUpload(null);
        }
        return;
      }

      setError('');
      setFile(URL.createObjectURL(selectedFile));
      setFileName(selectedFile.name);
      if (onUpload) {
        onUpload(selectedFile);
      }
    }
  };

  return (
    <div className='ml-32 mt-10'>
      <span className='text-xl font-bold'>
        {title} {isRequired && <span className='text-red-500'>*</span>}
      </span>
      <div
        className='w-[400px] h-64 bg-white mt-2 rounded-xl flex flex-col items-center justify-center cursor-pointer'
        style={{
          backgroundImage: file ? `url(${file})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        onClick={() => document.getElementById(`fileInput-${title}`).click()}
      >
        <input
          id={`fileInput-${title}`}
          type='file'
          onChange={handleFileChange}
          className='hidden'
        />
        {!file && !error && (
          <>
            <div className='flex flex-col items-center'>
              <img
                className='w-12 mb-2'
                src="https://firebasestorage.googleapis.com/v0/b/appointx-badae.appspot.com/o/vendordetails%2Ffile-add.svg?alt=media&token=c136d996-b75b-48ab-8d6f-e9c751ed1358"
                alt="Add File"
              />
              <span className='text-l font-bold'>
                {fileName || 'Click to Upload'}
              </span>
            </div>
            {isRequired && !file && (
              <span className='text-red-500 text-sm mt-2'>
                This field is required.
              </span>
            )}
          </>
        )}
        {error && (
          <div className='text-red-500 text-sm text-center'>
            {error}
          </div>
        )}
      </div>
      {file && !error && (
        <div className='flex justify-center text-l font-bold mt-4'>
          {fileName}
        </div>
      )}
    </div>
  );
};

export default UploadDocuments;
