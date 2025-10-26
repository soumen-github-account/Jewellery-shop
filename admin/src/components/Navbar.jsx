import React, { useContext } from 'react'
import logo from '../assets/logo.jpg'

const Navbar = () => {
    
  return (
    <div className='flex items-center justify-between px-4 sm:px-10 py-3 border-b-1 border-b-gray-400 bg-white'>
      <div className='flex items-center gap-2 text-sm'>
        <img src={logo} className='w-10 rounded-md cursor-pointer' alt="" />
        <h1 className='text-[20px] font-bold'>SencoGold</h1>
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>Admin</p>
      </div>
      {/* <button onClick='' className='bg-blue-400 text-white text-sm px-10 py-2 rounded-full'>Log out</button> */}
    </div>
  )
}

export default Navbar