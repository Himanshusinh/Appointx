import React from 'react'

const LargeInput = ({title, placeholder,handellargeinput}) => {
  return (
    <div className='mt-10 ml-12'>
    <div className='flex w-72 justify-between'>
    <span className='text-RegisterTitle'>{title}</span>
    {/* <span><img className='' src="public/questionmark.svg" /></span> */}
    </div>
    
    <textarea className='w-[625px] h-28  border-2' type="text" placeholder={placeholder} onChange={handellargeinput} />
  </div>
  )
}

export default LargeInput