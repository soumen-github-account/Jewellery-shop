// frontend/src/components/DashBoard.jsx
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../contexts/AdminContext";

const AllCustomers = () => {
  const {backendUrl} = useContext(AdminContext)
  const [customers, setCustomers] = useState([]);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Fetch all customers
  const fetchCustomers = async () => {
    try {
      const res = await axios.get(backendUrl + "/auth/get-customer");
      const data = Array.isArray(res.data.customers) ? res.data.customers : [];
      setCustomers(data);
      setTotalCustomers(res.data.count);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching customers:", err);
      setCustomers([]);
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchCustomers();
  }, []);

  // Filter customers based on search input
  const filteredCustomers = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (customers.length === 0) {
    return <p className="text-center mt-10">No customers found.</p>;
  }

  return (
    <div className="p-5 w-full">
    <div className="w-full mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-[#7B542F]">Customer List ({totalCustomers})</h2>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or phone..."
          className="w-full p-2 border-1 border-gray-300 rounded"
        />
      </div>

      <div className="h-[70vh] overflow-y-scroll w-full">

      {filteredCustomers.length === 0 ? (
        <p className="text-center mt-10">No matching customers found.</p>
      ) : (
        filteredCustomers.map((customer) => (
          <div
            key={customer._id}
            className="mb-4 p-4 border-1 border-gray-300 rounded shadow bg-gray-50"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold">{customer.name}</h3>
                <p>Email: {customer.email || "N/A"}</p>
                <p>Phone: {customer.phone}</p>
                <p>Address: {customer.address || "N/A"}</p>
                <p>Due: ₹{customer.due || 0}</p>
              </div>
              <button
                onClick={() => navigate(`/customer/edit/${customer._id}`)}
                className="bg-[#7B542F] text-white px-5 py-1 rounded hover:bg-[#916a47]"
              >
                Edit
              </button>
            </div>

            <div className="mt-2">
              <h4 className="font-semibold">Products:</h4>
              {Array.isArray(customer.products) && customer.products.length > 0 ? (
                <ul className="list-disc ml-5">
                  {customer.products.map((p, idx) => (
                    <li key={idx}>
                      {p.productName} - Qty: {p.quantity} - Price: ₹{p.price} -{" "}
                      {new Date(p.purchasedAt).toLocaleDateString()}
                      {p.check_no && ` - Check No: ${p.check_no}`}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No products yet</p>
              )}
            </div>
          </div>
        ))
      )}
      </div>
    </div>
    </div>
  );
};

export default AllCustomers;
