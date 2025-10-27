import React, { useContext, useEffect, useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FaFire } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// import { jewelleryData } from "../assets/data";
import BottomNav from "../AppComponents/BottomNav";
import { AppContext } from "../contexts/AppContext";

const SearchPage = () => {
  const {jewelleryData} = useContext(AppContext)
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current?.focus();

    const shuffled = [...jewelleryData].sort(() => 0.5 - Math.random());
    setPopularProducts(shuffled.slice(0, 8));

    const saved = JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(saved);
  }, []);

  useEffect(() => {
    if (query.trim() === "") {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const q = query.toLowerCase();
    const allCategories = [
      ...new Set(jewelleryData.map((i) => i.category)),
    ];
    const allSubCategories = [
      ...new Set(jewelleryData.map((i) => i.sub_category)),
    ];
    const allTags = [
      ...new Set(jewelleryData.flatMap((i) => i.tags || [])),
    ];

    const catMatches = allCategories
      .filter((c) => c.toLowerCase().includes(q))
      .map((c) => ({ type: "category", label: c }));

    const subMatches = allSubCategories
      .filter((c) => c.toLowerCase().includes(q))
      .map((c) => ({ type: "subcategory", label: c }));

    const tagMatches = allTags
      .filter((t) => t.toLowerCase().includes(q))
      .map((t) => ({ type: "tag", label: t }));

    const productMatches = jewelleryData
      .filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
      )
      .map((item) => ({ type: "product", item }));

    setSuggestions([...catMatches, ...subMatches, ...tagMatches, ...productMatches]);
    setShowSuggestions(true);
  }, [query]);

  const saveSearch = (term) => {
    const updated = [term, ...recentSearches.filter((t) => t !== term)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  const handleSelect = (s) => {
    setShowSuggestions(false);
    if (s.type === "product") {
      const t = s.item.sub_category2 || s.item.sub_category || s.item.category;
      saveSearch(s.item.name);
      navigate(`/search-products/${encodeURIComponent(t)}?type=product`);
    } else {
      saveSearch(s.label);
      navigate(`/search-products/${encodeURIComponent(s.label)}?type=${s.type}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#FCFDF5] pb-16">
      {/* 🔍 Search Bar */}
      <div className="sticky top-0 left-0 w-full bg-white shadow-md z-50 px-4 py-3">
        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 shadow-sm max-w-xl mx-auto">
          <IoSearch className="text-[22px] text-gray-500" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search jewellery, gold, earrings, category, tag..."
            className="flex-1 bg-transparent outline-none text-gray-800 text-sm"
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          />
        </div>

        {/* 💡 Suggestions Dropdown */}
        {showSuggestions && (
          <div className="absolute h-[50vh] overflow-y-scroll top-[70px] left-1/2 transform -translate-x-1/2 w-full max-w-xl bg-white border border-gray-200 shadow-xl rounded-md overflow-hidden z-50">
            {suggestions.length > 0 ? (
              suggestions.map((s, i) => (
                <div
                  key={i}
                  onMouseDown={() => handleSelect(s)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer"
                >
                  {s.type === "product" ? (
                    <>
                      <img
                        src={s.item.images?.[0]}
                        alt={s.item.name}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 text-sm">
                          {s.item.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {s.item.sub_category2 || s.item.sub_category}
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-pink-600">
                        ₹{s.item.discount_price}
                      </span>
                    </>
                  ) : (
                    <div className="flex items-center gap-2 w-full">
                      <span className="text-gray-500 text-sm capitalize">
                        {s.type}:
                      </span>
                      <span className="font-semibold text-gray-800">
                        {s.label}
                      </span>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center py-3 text-gray-500 text-sm">No results found</p>
            )}
          </div>
        )}
      </div>

      {/* 💥 Popular and Recent Searches */}
      <div className="p-4">
        {recentSearches.length > 0 && (
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-gray-600 mb-2">Recent Searches</h2>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((term, i) => (
                <button
                  key={i}
                  onClick={() =>
                    navigate(`/search-products/${encodeURIComponent(term)}?type=any`)
                  }
                  className="bg-gray-100 px-3 py-1 rounded-full text-xs text-gray-700 hover:bg-gray-200"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-sm font-semibold text-gray-600 mb-2 flex items-center gap-1">
            <FaFire className="text-pink-600" /> Popular Products
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {popularProducts.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelect({ type: "product", item })}
                className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-2 cursor-pointer"
              >
                <img
                  src={item.images?.[0]}
                  alt={item.name}
                  className="w-full h-36 object-cover rounded-lg"
                />
                <p className="text-xs mt-1 font-semibold text-gray-800 truncate">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default SearchPage;


// import React, { useContext, useEffect, useRef, useState } from "react";
// import { IoSearch } from "react-icons/io5";
// import { FaFire } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// // import { jewelleryData } from "../assets/data";
// import BottomNav from "../AppComponents/BottomNav";
// import { AppContext } from "../contexts/AppContext";

// const SearchPage = () => {
//   const {jewelleryData} = useContext(AppContext)
//   const [query, setQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [popularProducts, setPopularProducts] = useState([]);
//   const [recentSearches, setRecentSearches] = useState([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const inputRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     inputRef.current?.focus();

//     const shuffled = [...jewelleryData].sort(() => 0.5 - Math.random());
//     setPopularProducts(shuffled.slice(0, 8));

//     const saved = JSON.parse(localStorage.getItem("recentSearches")) || [];
//     setRecentSearches(saved);
//   }, []);

//   useEffect(() => {
//     if (query.trim() === "") {
//       setSuggestions([]);
//       setShowSuggestions(false);
//       return;
//     }

//     const q = query.toLowerCase();
//     const filtered = jewelleryData
//       .filter(
//         (item) =>
//           item.name?.toLowerCase().includes(q) ||
//           item.category?.toLowerCase().includes(q) ||
//           item.sub_category?.toLowerCase().includes(q) ||
//           item.sub_category2?.toLowerCase().includes(q) ||
//           item.description?.toLowerCase().includes(q)
//       )
//       .slice(0, 6);

//     setSuggestions(filtered);
//     setShowSuggestions(true);
//   }, [query]);

//   const handleSelect = (item) => {
//     setQuery(item.name);
//     saveSearch(item.name);
//     setShowSuggestions(false);

//     // Navigate to results page showing same-type products
//     const type = item.sub_category2 || item.sub_category || item.category;
//     navigate(`/search-products/${encodeURIComponent(type)}`);
//   };

//   const saveSearch = (term) => {
//     const updated = [term, ...recentSearches.filter((t) => t !== term)].slice(0, 5);
//     setRecentSearches(updated);
//     localStorage.setItem("recentSearches", JSON.stringify(updated));
//   };

//   return (
//     <div className="min-h-screen bg-[#FCFDF5] pb-16">
//       {/* Search Bar */}
//       <div className="sticky top-0 left-0 w-full bg-white shadow-md z-50 px-4 py-3">
//         <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 shadow-sm max-w-xl mx-auto">
//           <IoSearch className="text-[22px] text-gray-500" />
//           <input
//             ref={inputRef}
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             placeholder="Search for jewellery, gold, earrings..."
//             className="flex-1 bg-transparent outline-none text-gray-800 text-sm"
//             onFocus={() => setShowSuggestions(true)}
//             onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
//           />
//         </div>

//         {/* Suggestions */}
//         {showSuggestions && (
//           <div className="absolute top-[70px] left-1/2 transform -translate-x-1/2 w-full max-w-xl bg-white border border-gray-200 shadow-xl rounded-md overflow-hidden z-50">
//             {suggestions.length > 0 ? (
//               suggestions.map((item, i) => (
//                 <div
//                   key={i}
//                   onMouseDown={() => handleSelect(item)}
//                   className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer"
//                 >
//                   <img
//                     src={item.images?.[0]}
//                     alt={item.name}
//                     className="w-12 h-12 object-cover rounded-md"
//                   />
//                   <div className="flex-1">
//                     <p className="font-medium text-gray-800 text-sm">{item.name}</p>
//                     <p className="text-xs text-gray-500">
//                       {item.sub_category2 || item.sub_category}
//                     </p>
//                   </div>
//                   <span className="text-sm font-semibold text-pink-600">
//                     ₹{item.discountPrice}
//                   </span>
//                 </div>
//               ))
//             ) : (
//               <p className="text-center py-3 text-gray-500 text-sm">No results found</p>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Other content (Recent, Popular, etc.) */}
//       {/* 🕓 Recent Searches */}
//       <div className="px-5 mt-6">
//         {recentSearches.length > 0 && (
//           <div>
//             <h2 className="text-lg font-semibold text-gray-800 mb-3">
//               Recent Searches
//             </h2>
//             <div className="flex flex-wrap gap-2">
//               {recentSearches.map((term, idx) => (
//                 <button
//                   key={idx}
//                   onClick={() => setQuery(term)}
//                   className="px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-full hover:bg-gray-100"
//                 >
//                   {term}
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* 🔥 Popular Searches */}
//       <div className="px-5 mt-8">
//         <div className="flex items-center gap-2 mb-3">
//           <FaFire className="text-orange-500 text-lg" />
//           <h2 className="text-lg font-semibold text-gray-800">
//             Popular Searches
//           </h2>
//         </div>
//         <div className="flex flex-wrap gap-2">
//           {["Gold Earrings", "Diamond Necklace", "Bracelet", "Hoops", "Rings"].map(
//             (term, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => setQuery(term)}
//                 className="px-3 py-1.5 text-sm bg-pink-50 border border-pink-200 text-pink-700 rounded-full hover:bg-pink-100"
//               >
//                 {term}
//               </button>
//             )
//           )}
//         </div>
//       </div>

//       {/* 💎 Popular Products */}
//       <div className="px-5 mt-8 mb-20">
//         <h2 className="text-lg font-semibold text-gray-800 mb-3">
//           Popular Products
//         </h2>
//         <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
//           {popularProducts.map((item, index) => (
//             <div
//               key={index}
//               className="bg-white border border-gray-200 rounded-lg shadow-sm p-3 flex flex-col items-center hover:shadow-md transition-all"
//             >
//               <img
//                 src={item.images?.[0]}
//                 alt={item.name}
//                 className="w-20 h-20 object-contain"
//               />
//               <p className="mt-2 text-sm font-medium text-gray-700 text-center line-clamp-1">
//                 {item.name}
//               </p>
//               <p className="text-xs text-gray-500">{item.sub_category}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//       <BottomNav />
//     </div>
//   );
// };

// export default SearchPage;
