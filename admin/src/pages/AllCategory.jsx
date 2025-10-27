import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AdminContext } from "../contexts/AdminContext";

const CategoryDashboard = () => {
    const {backendUrl} = useContext(AdminContext)
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get(backendUrl + "/admin/get");
      setCategories(res.data.data || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Delete category by ID
  const deleteCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      const { data } = await axios.delete(
        backendUrl + `/admin/delete-category/${id}`
      );
      if (data.success) {
        toast.success(data.message);
        fetchCategories(); 
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete category");
    }
  };

  return (
    <div className="p-6 w-full overflow-y-scroll h-[90vh]">
      <h2 className="text-2xl font-bold text-[#7B542F] mb-4">
        All Categories ({categories.length})
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="border border-gray-300 rounded-lg p-4 shadow-sm bg-gray-50 w-full"
          >
            {cat.image_url && (
              <img
                src={cat.image_url}
                alt="Category"
                className="w-32 h-32 object-cover rounded mb-3"
              />
            )}

            <h3 className="font-semibold text-lg">Category:</h3>
            <pre className="bg-white p-2 rounded text-sm">
              {JSON.stringify(cat.categories, null, 2)}
            </pre>

            <h4 className="font-semibold mt-2">Sub Categories:</h4>
            <pre className="bg-white p-2 rounded text-sm">
              {JSON.stringify(cat.subcategories, null, 2)}
            </pre>

            <h4 className="font-semibold mt-2">Sub Category 2:</h4>
            <pre className="bg-white p-2 rounded text-sm">
              {JSON.stringify(cat.subcategory2options, null, 2)}
            </pre>

            <div className="w-full flex justify-between items-center mt-3">
              <button
                onClick={() => navigate(`/edit-category/${cat.id}`)}
                className="bg-[#7B542F] text-white px-4 py-2 rounded hover:bg-[#916a47]"
              >
                Edit
              </button>
              <button
                onClick={() => deleteCategory(cat.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryDashboard;
