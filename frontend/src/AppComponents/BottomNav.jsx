import React, { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { IoBagOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { LuGalleryVerticalEnd } from "react-icons/lu";
import { MdOutlineAccountCircle } from "react-icons/md";
import { NavLink } from "react-router-dom";

const BottomNav = () => {

  const navItems = [
    { id: "home", icon: <AiFillHome size={22} />, label: "Home", url:"/" },
    { id: "search", icon: <LuGalleryVerticalEnd size={22} />, label: "Search", url:"/all-product" },
    { id: "bag", icon: <IoBagOutline size={22} />, label: "Bag", url:"/cart" },
    { id: "wishlist", icon: <FaRegHeart size={22} />, label: "Wishlist", url:"/wishlist" },
    { id: "profile", icon: <MdOutlineAccountCircle size={22} />, label: "Profile", url:"/profile" },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-[#18181B] text-white w-[90%] max-w-md flex justify-around items-center py-2 rounded-full shadow-lg z-50 sm:hidden">
      {navItems.map((item) => (
        <NavLink
          key={item.id}
          to={item.url}
          onClick={()=>scrollTo(0,0)}
          className={({isActive})=>`flex flex-col items-center justify-center relative transition-all duration-300 cursor-pointer ${
            isActive ? "text-[#7C573B]" : "text-gray-400"
          }`}
        >
          {({ isActive }) => (
            <div
              className={`p-2 rounded-full transition-all duration-300 flex items-center justify-center ${
                isActive ? "bg-white text-[#7C573B]" : "bg-transparent"
              }`}
            >
              {item.icon}
            </div>
          )}
        </NavLink>
      ))}
    </div>
  );
};

export default BottomNav;
