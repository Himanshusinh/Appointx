import React from 'react'

const Input = ({title, placeholder ,handlechanges}) => {


  return (
    <div className='mt-10 ml-12'>
    <div className='flex w-72 justify-between'>
    <span className='text-RegisterTitle'>{title}</span>
    <span><img className='' src="https://firebasestorage.googleapis.com/v0/b/appointx-badae.appspot.com/o/vendordetails%2Fquestionmark.svg?alt=media&token=62d3a366-99f0-42f5-a4c6-3847074dac70" /></span>
    </div>
    
    <input className='w-72 h-10 mt-2 p-3  border-spacing-5 border-2' type="text" placeholder={placeholder} onChange={handlechanges}/>
  </div>


  )
}

export default Input