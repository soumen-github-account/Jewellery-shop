import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Category = () => {
  const { backendUrl } = useContext(AppContext);
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${backendUrl}/admin/get`);
      setCategoryData(res.data.data || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="mt-8 px-3">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-[20px]">Category</h1>
        <span
          onClick={() => navigate("/all-product")}
          className="text-[#6D503A] font-bold text-[14px] cursor-pointer"
        >
          See all
        </span>
      </div>

      {/* Category List */}
      <div className="scroll-hide mt-2 flex items-center justify-start w-full overflow-x-scroll gap-3">
        {loading
          ? // 🔸 Skeleton loading while fetching
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center py-3 px-2 min-w-[80px]"
              >
                <div className="w-16 h-16 rounded-full bg-gray-200 animate-pulse"></div>
                <div className="w-12 h-3 mt-2 rounded bg-gray-200 animate-pulse"></div>
              </div>
            ))
          : // 🔹 Actual category items
            categoryData.map((cat, index) => (
              <div
                key={index}
                onClick={() =>
                  navigate(`/show-all-category/${cat.categories?.[0]?.name}`)
                }
                className="flex flex-col items-center cursor-pointer hover:bg-slate-100 transition-all duration-150 py-3 rounded-md px-2 min-w-[80px]"
              >
                <img
                  src={cat.image_url}
                  className="w-16 h-16 rounded-full object-cover"
                  alt={cat.categories?.[0]?.name || "Category"}
                />
                <p className="text-[12px] mt-1">
                  {cat.categories?.[0]?.name || "Unknown"}
                </p>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Category;
