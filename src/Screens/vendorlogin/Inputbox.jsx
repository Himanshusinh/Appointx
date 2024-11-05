import React, { useState } from 'react'

const Inputbox = ({label, placeholder ,handlechanges}) => {


  return (
    <div className='flex flex-col'>
        <label className='text-sm'>{label}</label>
        <input type="text" className='w-96 h-12 border-2 rounded-xl bg-inputbackground pl-2' placeholder={placeholder} onChange={handlechanges} />
    </div>

  )
}

export default Inputbox