import React from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

const Navbar2 = ({name}) => {
    const {user} = useContext(AppContext);
    const navigate = useNavigate()
  return (
    <div className='fixed bg-white font-playfair w-full left-0 shadow-sm flex items-center justify-between px-5 py-2 z-50'>
        <div onClick={()=>navigate(-1)} className='rounded-full p-1 text-2xl border-1 border-gray-300'>
            <IoIosArrowRoundBack />
        </div>
        <h1 className='text-xl font-medium'>{name}</h1>
        <div className='rounded-full p-1 border-1 border-gray-300'>
            {
              user?.picture ?
              <img onClick={()=>{navigate('/profile'); scrollTo(0,0)}} src={user.picture} className='w-7 rounded-full cursor-pointer' alt="" />
              :
              <User onClick={()=>{navigate('/profile'); scrollTo(0,0)}} className='w-5.5 h-5.5 cursor-pointer' />
            }
        </div>
    </div>
  )
}

export default Navbar2
