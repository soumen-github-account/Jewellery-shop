import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../contexts/AdminContext";

const AllProducts = () => {
  const {jewelleryData, loading, totalJewelleryData} = useContext(AdminContext)
  const navigate = useNavigate();

  if(loading){
    return (
      <p>Loading please wait</p>
    )
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-5 text-[#7B542F]">All Products ({totalJewelleryData})</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {jewelleryData.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/edit-product/${item.id}`)}
            className="cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-3"
          >
            <img
              src={item.images[0]}
              alt={item.name}
              className="w-full h-40 object-contain rounded-lg"
            />
            <p className="mt-2 font-semibold text-gray-800 text-sm">
              {item.name}
            </p>
            <p className="text-gray-500 text-xs">{item.metal_type}</p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-[#7B542F] font-semibold text-sm">
                ₹{item.discount_price}
              </span>
              <span className="text-xs text-gray-400 line-through">
                ₹{item.original_price}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
