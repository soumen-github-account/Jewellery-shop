import React, { useState } from 'react'
import { TbMenu } from "react-icons/tb";
import { BsBag } from "react-icons/bs";
import { MdOutlineAccountCircle } from "react-icons/md";
import { IoMdHeartEmpty } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import Menu from './Menu';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className='flex items-center justify-between px-10 text-[25px] pt-4 text-white bg-[#B5AEA1]'>
        <div onClick={()=>setIsOpen(true)} className='font-playfair flex items-center gap-4 cursor-pointer'>
            <TbMenu />
            <p className='text-[18px] font-bold'>MENU</p>
        </div>
        <div className='flex items-center gap-5'>
            <FiSearch onClick={()=>navigate('/search')} className='cursor-pointer' />
            <IoMdHeartEmpty onClick={()=>navigate('/wishlist')} className='text-[30px] cursor-pointer' />
            <BsBag onClick={()=>navigate('/cart')} className='cursor-pointer' />
            <MdOutlineAccountCircle onClick={()=>navigate('/profile')} className='text-[30px] cursor-pointer' />
        </div>
        <Menu open={isOpen} setOpen={setIsOpen} />
    </div>
  )
}

export default Navbar
