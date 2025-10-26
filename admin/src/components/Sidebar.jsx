import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { MdHome } from "react-icons/md";
import { FaProductHunt } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa6";
import { IoIosAddCircle } from "react-icons/io";
import { MdOutlineBorderColor } from "react-icons/md";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";

const Sidebar = () => {
    // const {atoken} = useContext(AdminContext)
    // const {dtoken} = useContext(DoctorContext)

  return (
    <div className='min-h-[90vh] bg-white border-r-1 border-r-gray-300'>
      <ul className='text-[#515151] mt-5'>
            <NavLink className={({isActive})=> `flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#7B542F] text-white rounded-md' : ''}`} to={'/admin-dashboard'}>
                <MdHome className='text-[26px]' />
                <p className='hidden md:block text-[18px]'>Dashboard</p>
            </NavLink>
            <NavLink className={({isActive})=> `flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#7B542F] text-white rounded-md' : ''}`} to={'/add-order'}>
                <MdOutlineBorderColor className='text-[26px]' />
                <p className='hidden md:block'>Add Order</p>
            </NavLink>
            <NavLink className={({isActive})=> `flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#7B542F] text-white rounded-md' : ''}`} to={'/all-orders'}>
                <FaCartArrowDown className='text-[26px]' />
                <p className='hidden md:block'>Orders</p>
            </NavLink>
            <NavLink className={({isActive})=> `flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#7B542F] text-white rounded-md' : ''}`} to={'/add-product'}>
                <IoIosAddCircle className='text-[26px]' />
                <p className='hidden md:block'>Add Product</p>
            </NavLink>
            <NavLink className={({isActive})=> `flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#7B542F] text-white rounded-md' : ''}`} to={'/all-product'}>
                <FaProductHunt className='text-[26px]' />
                <p className='hidden md:block'>All Product List</p>
            </NavLink>
            <NavLink className={({isActive})=> `flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#7B542F] text-white rounded-md' : ''}`} to={'/add-category'}>
                <IoIosAddCircle className='text-[26px]' />
                <p className='hidden md:block'>Add Category</p>
            </NavLink>
            <NavLink className={({isActive})=> `flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#7B542F] text-white rounded-md' : ''}`} to={'/all-category'}>
                <BiCategoryAlt className='text-[26px]' />
                <p className='hidden md:block'>All Category</p>
            </NavLink>
            <NavLink className={({isActive})=> `flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#7B542F] text-white rounded-md' : ''}`} to={'/add-banner'}>
                <IoIosAddCircle className='text-[26px]' />
                <p className='hidden md:block'>Add Banners</p>
            </NavLink>
            <NavLink className={({isActive})=> `flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#7B542F] text-white rounded-md' : ''}`} to={'/add-customer'}>
                <IoIosAddCircle className='text-[26px]' />
                <p className='hidden md:block'>Add Customers</p>
            </NavLink>
            <NavLink className={({isActive})=> `flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#7B542F] text-white rounded-md' : ''}`} to={'/all-customer'}>
                <MdOutlinePeopleAlt className='text-[26px]' />
                <p className='hidden md:block'>All Customers</p>
            </NavLink>
        </ul>
      
    </div>
  )
}

export default Sidebar
