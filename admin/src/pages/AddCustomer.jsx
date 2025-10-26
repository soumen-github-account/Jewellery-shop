// frontend/src/components/AddCustomerProduct.js
import React, { useContext, useState } from "react";
import axios from "axios";
import { AdminContext } from "../contexts/AdminContext";

const AddCustomer = () => {
  const {backendUrl} = useContext(AdminContext)
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        backendUrl + "/auth/add-customer",
        form
      );
      setMessage("Customer product added/updated successfully!");
      setForm({
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
    } catch (err) {
      setMessage(err.response?.data?.message || "Error adding product.");
    }
  };

  return (
    <div className="px-10 pb-10 h-[90vh] overflow-y-scroll">
    <div className="w-full mx-auto mt-5 p-6 border-1 border-gray-300 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-[#7B542F]">Add / Update Customer</h2>
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
          required
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
          required
        />
        <button
          type="submit"
          className="w-full bg-[#7B542F] text-white p-2 rounded hover:bg-[#866240]"
        >
          Add / Update Product
        </button>
      </form>
    </div>
    </div>
  );
};

export default AddCustomer;
