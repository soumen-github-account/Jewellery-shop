
import React, { useContext, useState, useMemo } from "react";
import Navbar2 from "../AppComponents/Navbar2";
import ProductCard from "../components/ProductCard";
import BottomNav from "../AppComponents/BottomNav";
import { AppContext } from "../contexts/AppContext";
import { FiFilter } from "react-icons/fi";

const AllProduct = () => {
  const { jewelleryData } = useContext(AppContext);

  const [filters, setFilters] = useState({
    category: "All",
    subCategory: "All",
    color: "All",
    tag: "All",
    offer: "All",
  });

  const [showFilters, setShowFilters] = useState(false); // 👈 for mobile toggle

  const colorOptions = [
    "Gold",
    "Silver",
    "Rose Gold",
    "Platinum",
    "white & Gold",
    "Blue & silver",
  ];

  const tagOptions = [
    "New",
    "Minimal",
    "Trending",
    "Men",
    "Under ₹50000",
    "Under ₹35000",
    "Best Seller",
    "Limited Edition",
    "Luxury",
    "Premium",
  ];

  const categories = [
    "All",
    "Earrings",
    "Necklaces",
    "Rings",
    "Bracelets",
    "Bangles",
    "Anklets",
    "Pendants",
  ];

  const offers = ["All", "10%", "15%", "20%", "25%", "30%"];

  const subCategories = useMemo(() => {
    const allSubs = jewelleryData.map((item) => item.sub_category);
    return ["All", ...new Set(allSubs)];
  }, [jewelleryData]);

  const filteredProducts = jewelleryData.filter((item) => {
    const categoryMatch =
      filters.category === "All" ||
      item.category.toLowerCase() === filters.category.toLowerCase();

    const subCategoryMatch =
      filters.subCategory === "All" ||
      item.sub_category.toLowerCase() === filters.subCategory.toLowerCase();

    const colorMatch =
      filters.color === "All" ||
      item.color?.toLowerCase() === filters.color.toLowerCase();

    const tagMatch =
      filters.tag === "All" ||
      (item.tags &&
        item.tags.some((t) => t.toLowerCase() === filters.tag.toLowerCase()));

    const offerMatch =
      filters.offer === "All" ||
      (item.offer && item.offer.toLowerCase() === filters.offer.toLowerCase());

    return (
      categoryMatch &&
      subCategoryMatch &&
      colorMatch &&
      tagMatch &&
      offerMatch
    );
  });

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  const FilterContent = () => (
    <div className="p-4 space-y-5">
      {/* Category */}
      <div>
        <h3 className="font-semibold text-gray-800 mb-2">Category</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilterChange("category", cat)}
              className={`text-sm px-3 py-1 rounded-full border ${
                filters.category === cat
                  ? "bg-[#6F4F38] text-white border-[#6F4F38]"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Subcategory */}
      <div>
        <h3 className="font-semibold text-gray-800 mb-2">Subcategory</h3>
        <select
          value={filters.subCategory}
          onChange={(e) => handleFilterChange("subCategory", e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 text-sm"
        >
          {subCategories.map((sub) => (
            <option key={sub} value={sub}>
              {sub}
            </option>
          ))}
        </select>
      </div>

      {/* Color */}
      <div>
        <h3 className="font-semibold text-gray-800 mb-2">Color</h3>
        <div className="flex flex-wrap gap-2">
          {colorOptions.map((clr) => (
            <button
              key={clr}
              onClick={() => handleFilterChange("color", clr)}
              className={`text-sm px-3 py-1 rounded-full border ${
                filters.color === clr
                  ? "bg-[#6F4F38] text-white border-[#6F4F38]"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {clr}
            </button>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div>
        <h3 className="font-semibold text-gray-800 mb-2">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tagOptions.map((tag) => (
            <button
              key={tag}
              onClick={() => handleFilterChange("tag", tag)}
              className={`text-sm px-3 py-1 rounded-full border ${
                filters.tag === tag
                  ? "bg-[#6F4F38] text-white border-[#6F4F38]"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Offers */}
      <div>
        <h3 className="font-semibold text-gray-800 mb-2">Offers</h3>
        <div className="flex flex-wrap gap-2">
          {offers.map((off) => (
            <button
              key={off}
              onClick={() => handleFilterChange("offer", off)}
              className={`text-sm px-3 py-1 rounded-full border ${
                filters.offer === off
                  ? "bg-[#6F4F38] text-white border-[#6F4F38]"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {off}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Navbar2 name={"All Jewellery"} />

      {/* 🔹 Mobile Filter Toggle */}
      <div className="md:hidden flex justify-between items-center px-4 pt-16">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 bg-[#6F4F38] text-white px-4 py-2 rounded-full shadow-sm"
        >
          <FiFilter size={18} />
          Filters
        </button>
      </div>

      {/* 🔹 Mobile Filter Dropdown */}
      {showFilters && (
        <div className="md:hidden fixed top-13 left-0 w-full bg-white shadow-lg p-4 z-50 overflow-y-auto max-h-[80vh]">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
            <button
              onClick={() => setShowFilters(false)}
              className="text-sm text-red-500 font-medium"
            >
              Close ✕
            </button>
          </div>
          <FilterContent />
        </div>
      )}

      {/* ================= Desktop Layout ================= */}
      <div className="flex flex-1 pt-16 max-sm:pt-3 pb-8 overflow-hidden">
        {/* Left Filter Panel */}
        <aside className="hidden md:flex md:w-72 flex-col bg-white shadow-sm border-r overflow-y-auto h-full sticky top-[85px]">
          <FilterContent />
        </aside>

        {/* Right Product Grid */}
        <main className="flex-1 overflow-y-auto px-4 scroll-hide">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((item) => (
                <ProductCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-20 text-lg">
              No products found for selected filters.
            </p>
          )}
        </main>
      </div>

      <BottomNav />
    </div>
  );
};

export default AllProduct;
