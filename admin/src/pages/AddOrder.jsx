import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { AdminContext } from "../contexts/AdminContext";
import toast from "react-hot-toast";

const AddOrder = () => {
  const {backendUrl} = useContext(AdminContext)
  const [name, setName] = useState('');
  const [product, setProduct] = useState('');
  const [qty, setQty] = useState(1);

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      const {data} = await axios.post(backendUrl + "/admin/add-order", {name, product, quantity:qty}, {withCredentials:true})
      if(data.success){
        toast.success("order added");
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold text-[#7B542F] mb-4">Add Order</h1>
      <form onSubmit={handleSubmit} className="bg-white p-5 rounded-lg shadow-md border border-gray-200 space-y-4">
        <input type="text" placeholder="Customer Name" onChange={(e)=>setName(e.target.value)} value={name} className="border p-2 w-full rounded-md"/>
        <input type="text" placeholder="Product ID" onChange={(e)=>setProduct(e.target.value)} value={product} className="border p-2 w-full rounded-md"/>
        <input type="number" placeholder="Quantity" onChange={(e)=>setQty(e.target.value)} value={qty} className="border p-2 w-full rounded-md"/>
        <button className="bg-[#7B542F] text-white px-5 py-2 rounded-md hover:bg-[#6b4523]">
          Submit Order
        </button>
      </form>
    </div>
  );
};

export default AddOrder;
