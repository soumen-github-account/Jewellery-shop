import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../contexts/AdminContext";
import toast from "react-hot-toast";

const AllProducts = () => {
  const {jewelleryData, loading, totalJewelleryData, backendUrl, getJewelleryData} = useContext(AdminContext)
  const navigate = useNavigate();
  const [delLoading, setDelLoading] = useState(false)

  const deleteProduct = async(id) => {
    setDelLoading(true)
    try {
      const {data} = await axios.delete(backendUrl + `/products/delete-product/${id}`, {withCredentials: true})
      if(data.success){
        toast.success(data.message)
        getJewelleryData()
        setDelLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

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
            <div className="flex items-center justify-center w-full gap-2 mt-2">
              <button onClick={()=>deleteProduct(item.id)} className="bg-red-50 w-full text-red-500 rounded-md py-1 hover:bg-red-100 transition-all">
                Delete
              </button>
              <button onClick={() => navigate(`/edit-product/${item.id}`)} className="bg-blue-50 w-full text-blue-500 rounded-md py-1 hover:bg-blue-100 transition-all">
              Edit
            </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
