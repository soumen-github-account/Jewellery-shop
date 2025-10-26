
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from 'react-hot-toast'
import { AdminContext } from "../contexts/AdminContext";

const AllOrders = () => {
  const {backendUrl} = useContext(AdminContext)
  const [orders, setOrders] = useState([]);
  const [totalOrder, setTotalOrder] = useState(0);

  // Fetch all orders
  const getOrders = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/admin/get-orders", {
        withCredentials: true,
      });
      if (data.success) {
        setOrders(data.orders);
        setTotalOrder(data.totalOrders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Delete order by ID
  const deleteOrder = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      const { data } = await axios.delete(
        backendUrl + `/admin/delete-order/${id}`,
        { withCredentials: true }
      );
      if (data.success) {
        toast.success(data.message);
        getOrders(); // Refresh the list
      }
    } catch (error) {
      console.error("Delete order error:", error);
      alert("Failed to delete order");
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="h-[90vh] w-full overflow-y-scroll">
    <div className="p-6 w-full">
      <h1 className="text-xl font-semibold text-[#7B542F] mb-4">
        All Orders ({totalOrder})
      </h1>
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-[#F6F3EF] text-[#7B542F]">
            <tr>
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">Qty</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id} className="border-b-1 border-b-gray-200">
                <td className="p-3">{o.order_id}</td>
                <td className="p-3">{o.name}</td>
                <td className="p-3">{o.product}</td>
                <td className="p-3">{o.quantity}</td>
                <td onClick={()=>deleteOrder(o._id)} className="p-3 rounded-md bg-red-50 text-red-500 font-medium cursor-pointer flex items-center justify-center my-1 hover:bg-gray-100 transition-all">Delete</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default AllOrders;
