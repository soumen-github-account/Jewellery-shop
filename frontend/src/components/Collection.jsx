import React from "react";
import ProductCard from "./ProductCard";
// import { jewelleryData } from "../assets/data";

import b1 from '../assets/b1.jpeg'
import b2 from '../assets/b2.jpeg'
import b3 from '../assets/b3.jpeg'
import JewelleryBrandsSection from "./JewelleryBrandsSection";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import CardSkeleon from "./CardSkeleon";


const Collection = () => {
  const {jewelleryData} = useContext(AppContext)
  const navigate = useNavigate()
  const isLoading = !Array.isArray(jewelleryData) || jewelleryData.length === 0;
  return (
    <div className="bg-[#FCFDF5] min-h-screen px-6 py-12 max-sm:py-5">
      {/* Grid Start */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 max-sm:gap-2">
        {
        isLoading ? 
        Array.from({ length: 6 }).map((_, i) => <CardSkeleon key={i} />)
        :
        jewelleryData.slice(0, 1).map((item) => (
          <ProductCard key={item.id} item={item} />
        ))
        }
      </div>
      {/* <div className="flex items-start justify-between w-full gap-8 mt-8 max-sm:mt-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 max-sm:gap-2">
            {jewelleryData.slice(0, 9).map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
          <img
            src={b3}
            alt="Classic Collection"
            className="rounded-md max-sm:hidden shadow-sm object-cover w-[30.5vw]"
          />
        </div> */}
        
        <JewelleryBrandsSection />
        <p className="sm:hidden font-bold text-2xl mt-4">Suggested for you</p>
      {/* <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 mt-8 max-sm:gap-2 max-sm:mt-4">
        {jewelleryData.slice(0, 6).map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
      <div className="flex items-start justify-between w-full gap-8 max-sm:gap-2 mt-8 max-sm:mt-2">
          <img
            src={b1}
            alt="Classic Collection"
            className="rounded-md max-sm:hidden shadow-sm object-cover w-[30.5vw]"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 max-sm:gap-2">
            {jewelleryData.slice(0, 9).map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </div>
        
        <div className="w-full flex items-center justify-center mt-8 font-playfair text-md text-slate-700">
          <button onClick={()=>navigate('/all-product')} className="rounded-md py-2 px-30 bg-gray-50 border-1 border-gray-300">Show All</button>
        </div> */}
    </div>
  );
};

export default Collection;
