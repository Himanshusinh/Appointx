import React from 'react'

const RegisterHeader = () => {
  return (
    <>
        <div className='flex justify-between'>
            <img className='text-3xl ml-20 mt-10 w-32' src='https://firebasestorage.googleapis.com/v0/b/appointx-badae.appspot.com/o/core%2FLogo.svg?alt=media&token=30d7d35a-0bfd-4a5a-89a7-1c7a6c508cbf'></img>
            <div className='flex mr-10 mt-10 gap-2'><span className='text-nowrap text-s mt-3'>Already a member?</span> <img className='w-3 align-middle mt-3' src="https://firebasestorage.googleapis.com/v0/b/appointx-badae.appspot.com/o/vendordetails%2FVector.svg?alt=media&token=a8e2c0a8-7b4a-4c38-9745-6ee77b1aa2b1"  /></div>
        </div>

        <div className='flex justify-between mt-8'>
            <span className='text-5xl font-semibold ml-20 '>Input Your <br></br> Information</span>
            <p className='flex flex-wrap mr-32'>We need you to help us with some basic information for your account creation. Here are our  terms and conditions. <br></br> Please read them carefully. </p>
        </div>




    
    </>
  )
}

export default RegisterHeader