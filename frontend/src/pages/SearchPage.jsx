import React, { useEffect, useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";
import {jewelleryData} from "../assets/data"; // import your jewelleryData.js
import BottomNav from "../AppComponents/BottomNav";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [randomProducts, setRandomProducts] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();

    // pick random products for "popular" section
    const shuffled = [...jewelleryData].sort(() => 0.5 - Math.random());
    setRandomProducts(shuffled.slice(0, 8));
  }, []);

  useEffect(() => {
    if (query.trim() === "") {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const q = query.toLowerCase();
    const filtered = jewelleryData
      .filter((item) => {
        return (
          item.name?.toLowerCase().includes(q) ||
          item.category?.toLowerCase().includes(q) ||
          item.sub_category?.toLowerCase().includes(q) ||
          item.sub_category2?.toLowerCase().includes(q) ||
          item.description?.toLowerCase().includes(q)
        );
      })
      .slice(0, 5);

    setSuggestions(filtered);
    setShowSuggestions(true);
  }, [query]);

  const handleSelect = (name) => {
    setQuery(name);
    setShowSuggestions(false);
  };

  return (
    <div className="min-h-screen bg-[#FCFDF5] pb-10 pt-5">
      {/* Search Bar */}
      <div className="w-full flex justify-center px-4">
        <div className="relative w-full max-w-xl border border-gray-300 rounded-full bg-white shadow-sm flex items-center px-3 py-1">
          <IoSearch className="text-[22px] text-gray-500" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for jewellery..."
            className="flex-1 ml-2 h-9 outline-none text-sm text-gray-700"
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          />

          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute top-[105%] left-0 w-full bg-white rounded-md shadow-md z-10 overflow-hidden">
              {suggestions.map((item, i) => (
                <li
                  key={i}
                  onMouseDown={() => handleSelect(item.name)}
                  className="flex items-center gap-3 px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 cursor-pointer"
                >
                  <img
                    src={item.images?.[0]}
                    alt={item.name}
                    className="w-10 h-10 object-contain"
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      {item.sub_category2 || item.sub_category}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Popular Products */}
      <div className="px-5 mt-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          Popular Products
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {randomProducts.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg shadow-sm p-3 flex flex-col items-center hover:shadow-md transition-all"
            >
              <img
                src={item.images?.[0]}
                alt={item.name}
                className="w-20 h-20 object-contain"
              />
              <p className="mt-2 text-sm font-medium text-gray-700 text-center line-clamp-1">
                {item.name}
              </p>
              <p className="text-xs text-gray-500">{item.sub_category}</p>
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default SearchPage;
