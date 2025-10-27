// import React from 'react'
// import logo from '../assets/logo.jpg'
// import { MdOutlineAccountCircle } from "react-icons/md";
// import { IoSearchOutline } from "react-icons/io5";
// import { LuSettings2 } from "react-icons/lu";

// const Navbar1 = () => {
//   return (
//     <div className='py-2 border-b-1 border-b-gray-200 shadow-xs'>
//         <div className='flex px-5 items-center justify-between'>
//             <div className='flex items-center gap-4'>
//                 <img src={logo} className='w-10 rounded-lg' alt="" />
//                 <p>CELESTIQUE</p>
//             </div>
//             <div className='text-[23px] text-slate-600'>
//                 <MdOutlineAccountCircle />
//             </div>
//         </div>

//         <div className='flex items-center justify-between gap-4 px-4 mt-3'>
            // <div className='flex w-full px-3 items-center gap-2 rounded-full border-1 border-gray-300 shadow-xs'>
            //     <IoSearchOutline className='text-[20px]' />
            //     <input type="text" className='outline-none h-8 mb-1 w-full cursor-pointer placeholder:text-[13px] placeholder:text-gray-500' placeholder='Search here'/>
            // </div>
//             <div className='bg-[#704F38] rounded-full p-2 text-[20px] text-white cursor-pointer shadow-md'>
//                 <LuSettings2 />
//             </div>
//         </div>
//     </div>
//   )
// }

// export default Navbar1
import React, { useEffect, useState } from "react";
import logo from "../assets/logo.jpg";
import { MdOutlineAccountCircle } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { LuSettings2 } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

const Navbar1 = () => {
  const navigate = useNavigate();
  const [showLogo, setShowLogo] = useState(true);
  const {user} = useContext(AppContext)

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScroll = () => {
      const currentY = window.scrollY;

      // Only update if state actually changes
      if (currentY > lastScrollY && showLogo) {
        setShowLogo(false);
      } else if (currentY < lastScrollY && !showLogo) {
        setShowLogo(true);
      }

      lastScrollY = currentY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showLogo]);

  return (
    <div
      className={`w-full border-b border-b-gray-200 shadow-sm bg-white transition-all duration-300 sticky top-0 z-50`}
    >
      {/* Logo + Account */}
      <div
        className={`flex px-5 mt-1 items-center justify-between py-1 transition-all duration-300 ${
          showLogo
            ? "opacity-100 h-auto visible"
            : "opacity-0 h-0 overflow-hidden invisible"
        }`}
      >
        <div className="flex items-center gap-3">
          <img src={logo} className="w-10 rounded-lg" alt="logo" />
          <p className="font-semibold text-gray-800 tracking-wide">
            CELESTIQUE
          </p>
        </div>
        <div className="text-[23px] text-slate-600">
          {
            user?.picture ? 
            <img onClick={()=>navigate('/profile')} src={user.picture} className="w-9 rounded-full cursor-pointer" alt=""/>
            :
            <MdOutlineAccountCircle onClick={()=>navigate('/profile')} className="cursor-pointer" />
          }
        </div>
      </div>

      {/* Search Bar */}
      <div
        className={`flex items-center justify-between gap-4 px-4 pb-2 transition-all duration-300 ${
          showLogo ? "mt-1" : "mt-2"
        }`}
      >
        <div onClick={()=>navigate('/search')} className='flex w-full px-3 items-center gap-2 rounded-full border-1 border-gray-300 shadow-xs'>
          <IoSearchOutline className='text-[20px]' />
          <input type="text" className='outline-none h-8 mb-1 w-full cursor-pointer placeholder:text-[13px] placeholder:text-gray-500' placeholder='Search for products, brands...'/>
        </div>
        <div onClick={()=>navigate('/all-product')} className="bg-[#704F38] rounded-full p-2 text-[20px] text-white cursor-pointer shadow-md">
          <LuSettings2 />
        </div>
      </div>
    </div>
  );
};

export default Navbar1;
