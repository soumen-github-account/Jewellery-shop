import React from 'react'
import { RxCross2 } from "react-icons/rx";

import { BsBag } from "react-icons/bs";
import { MdOutlineAccountCircle } from "react-icons/md";
import { IoMdHeartEmpty } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { LuGalleryHorizontal, LuGalleryVerticalEnd } from "react-icons/lu";


const Menu = ({open, setOpen}) => {
    const navigate = useNavigate();
    if(!open){
        return null;
    }

  return (
    <div className='absolute left-5 top-5 z-50 pt-10'>
        <RxCross2 onClick={()=>setOpen(false)} className='right-2 top-2 absolute text-black bg-gray-200 p-1 text-[30px] rounded-md cursor-pointer hover:text-gray-500' />
      <div class="text-sm w-56 p-4 bg-white border border-gray-300/30 text-gray-500 rounded-md font-medium">
            <ul class="flex flex-col gap-2">
                <li onClick={()=>navigate('/all-product')} class="flex items-center gap-2 bg-[#B5AEA1] text-white cursor-pointer px-3 py-2 rounded">
                    <LuGalleryHorizontal />
                    <a>Show all product</a>
                </li>
                <li onClick={()=>navigate('/search')} class="flex items-center gap-3 cursor-pointer px-3 py-2 rounded hover:bg-gray-300/40 transition">
                    <FiSearch className='text-[20px]' />
                    <a>Search Product</a>
                </li>
                <div class="w-full h-px bg-gray-300/50 my-2"></div>
                <li onClick={()=>navigate('/wishlist')} class="flex items-center gap-3 cursor-pointer px-3 py-2 rounded hover:bg-gray-300/40 transition">
                    <IoMdHeartEmpty className='text-[20px]' />
                    <a>Wishlists</a>
                </li>
                <li onClick={()=>navigate('/cart')} class="flex items-center gap-3 cursor-pointer px-3 py-2 rounded hover:bg-gray-300/40 transition">
                    <BsBag className='text-[20px]' />                
                    <a>Cart</a>
                </li>
                <div class="w-full h-px bg-gray-300/50 my-2"></div>
                <li onClick={()=>navigate('/profile')} class="flex items-center gap-3 cursor-pointer px-3 py-2 rounded hover:bg-gray-300/40 transition">
                    <MdOutlineAccountCircle className='text-[20px]' />
                    <a>My Profile</a>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Menu
