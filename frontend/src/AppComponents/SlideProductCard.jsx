import React, { useContext } from "react";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { AppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

const SlideProductCard = ({ item }) => {
    const navigate = useNavigate()
    const { toggleWishlist, isInWishlist } = useContext(AppContext);
    const inWishlist = isInWishlist(item.id);
  return (
    <div className="flex flex-col min-w-35 items-start border-1 border-gray-300 shadow-xs font-playfair pb-2">
    <div className="relative overflow-hidden bg-white">
        <img
            onClick={()=>{navigate(`/product-view/${item.id}`); scrollTo(0,0)}}
            src={item.images[0]}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {inWishlist ? (
          <GoHeartFill onClick={() => toggleWishlist(item)} className="text-[30px] absolute p-1 top-3 right-2 bg-gray-50 text-[#7B542F] rounded-full" />
          )
          :
          (
          <GoHeart onClick={() => toggleWishlist(item)} className="text-[30px] absolute p-1 top-3 right-2 bg-gray-50 text-gray-500 rounded-full" />
          )
        }
        </div>
    <div onClick={()=>{navigate(`/product-view/${item.id}`); scrollTo(0,0)}} className="px-5 mt-3 cursor-pointer">
        <h1 className="line-clamp-2 font-bold text-[17px] max-sm:text-[15px] text-slate-800">{item.name}</h1>
        <p className="font-bold text-slate-500 text-sm max-sm:text-[13px]">{item.metal_type}</p>
        <p className="text-[20px] font-cinzel">₹ {item.discount_price}</p>
    </div>
    </div>
  );
};

export default SlideProductCard;
