import React, { useContext } from "react";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { AppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ item }) => {
    const navigate = useNavigate()
    const { toggleWishlist, isInWishlist, toggleLoading } = useContext(AppContext);
    const inWishlist = isInWishlist(item.id);
  return (
    <div className="flex flex-col items-start border-1 border-gray-300 shadow-xs font-playfair pb-2">
    <div className="relative overflow-hidden bg-white">
        <img
            onClick={()=>{navigate(`/product-view/${item.id}`); scrollTo(0,0)}}
            src={item.images[0]}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {/* {inWishlist ? (
          <GoHeartFill onClick={() => toggleWishlist(item)} className="text-[30px] absolute p-1 top-3 right-2 bg-gray-50 text-[#7B542F] rounded-full" />
          )
          :
          (
          <GoHeart onClick={() => toggleWishlist(item)} className="text-[30px] absolute p-1 top-3 right-2 bg-gray-50 text-gray-500 rounded-full" />
          )
        } */}

        <button
          onClick={() => toggleWishlist(item)}
          disabled={toggleLoading} // disable while loading
          className={`absolute top-3 right-2 p-1 rounded-full bg-gray-50 transition-all ${
            toggleLoading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          }`}
        >
          {inWishlist ? (
            <GoHeartFill className="text-[23px] text-[#7B542F]" />
          ) : (
            <GoHeart className="text-[23px] text-gray-500" />
          )}
        </button>

        {/* Best Seller Tag */}

          {item?.tags?.includes("Best Seller") && (
            <div className="absolute top-0 sm:top-3 sm:left-[-20px] left-[-40px] bg-[#E25C77] text-white text-[9px] sm:text-[11px] font-semibold tracking-wider px-10 py-[3px] rounded-md rotate-[-18deg] shadow-md flex items-center gap-[4px]">
              <span>BEST SELLER</span>
              <span className="text-[12px]">✨</span>
            </div>
          )}
        </div>
    <div onClick={()=>{navigate(`/product-view/${item.id}`); scrollTo(0,0)}} className="px-5 mt-3 cursor-pointer">
        <h1 className="line-clamp-2 font-bold text-[17px] max-sm:text-[15px] text-slate-800">{item.name}</h1>
        <p className="font-bold text-slate-500 text-sm max-sm:text-[13px]">{item.metal_type}</p>
        <p className="text-[20px] font-cinzel">₹ {item.discount_price}</p>
    </div>
    </div>
  );
};

export default ProductCard;

// import React, { useContext } from "react";
// import { GoHeart, GoHeartFill } from "react-icons/go";
// import { AppContext } from "../contexts/AppContext";

// const ProductCard = ({ item }) => {
//   const { toggleWishlist, isInWishlist } = useContext(AppContext);
//   const inWishlist = isInWishlist(item.id);

//   return (
//     <div className="flex flex-col items-start border border-gray-200 shadow-sm font-playfair pb-2 rounded-xl">
//       <div className="relative overflow-hidden bg-white">
//         <img
//           src={item.images[0]}
//           alt={item.name}
//           className="w-full h-[250px] object-cover transition-transform duration-300 hover:scale-105"
//         />

//         <button
//           onClick={() => toggleWishlist(item)}
//           className="absolute top-3 right-2 p-1 rounded-full bg-gray-50 shadow-md"
//         >
//           {inWishlist ? (
//             <GoHeartFill className="text-[25px] text-[#7B542F]" />
//           ) : (
//             <GoHeart className="text-[25px] text-gray-500" />
//           )}
//         </button>
//       </div>

//       <div className="px-5 mt-3">
//         <h1 className="line-clamp-2 font-bold text-[17px] text-slate-800">
//           {item.name}
//         </h1>
//         <p className="font-bold text-slate-500 text-sm">{item.metalType}</p>
//         <p className="text-[20px] font-cinzel">₹ {item.discountPrice}</p>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
