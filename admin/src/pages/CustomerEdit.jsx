// frontend/src/components/EditCustomer.jsx
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { AdminContext } from "../contexts/AdminContext";
import toast from "react-hot-toast";

const CustomerEdit = () => {
  const {backendUrl} = useContext(AdminContext)
  const { id } = useParams(); // customer _id from URL
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    due: 0,
    check_no: "",
    productName: "",
    quantity: 1,
    price: 0,
  });

  const [message, setMessage] = useState("");

  // Fetch customer details
  const fetchCustomer = async () => {
    try {
      const res = await axios.get(backendUrl + `/auth/get-customer/${id}`);
      const customer = res.data;

      setForm({
        name: customer.name || "",
        email: customer.email || "",
        phone: customer.phone || "",
        address: customer.address || "",
        due: customer.due || 0,
        check_no: "", // optional, for new product
        productName: "", // optional, for new product
        quantity: 1,
        price: 0,
      });
    } catch (err) {
      console.error("Error fetching customer:", err);
      setMessage("Failed to load customer details.");
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(backendUrl + "/auth/add-customer", form);
      toast.success("Customer updated successfully!");
      // Optionally redirect back to dashboard
      navigate("/all-customer");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error updating customer.");
    }
  };

  return (
    <div className="px-10 pb-10 h-[90vh] overflow-scroll">
      <div className="w-full mx-auto mt-5 p-6 border-1 border-gray-300 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Edit Customer</h2>
        {message && <p className="mb-4 text-red-500">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Customer Name"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email (optional)"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="due"
            value={form.due}
            onChange={handleChange}
            placeholder="Due Amount"
            className="w-full p-2 border rounded"
            min="0"
          />
          <input
            type="text"
            name="check_no"
            value={form.check_no}
            onChange={handleChange}
            placeholder="Check No (optional)"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="productName"
            value={form.productName}
            onChange={handleChange}
            placeholder="Product Name"
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            className="w-full p-2 border rounded"
            min="1"
          />
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full p-2 border rounded"
            min="0"
          />
          <button
            type="submit"
            className="w-full bg-[#7B542F] text-white p-2 rounded hover:bg-[#866240]"
          >
            Update Customer
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerEdit;
