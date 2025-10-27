// import React, { useContext, useEffect, useState } from "react";
// import { useParams, useLocation, useNavigate } from "react-router-dom";
// import { AppContext } from "../contexts/AppContext";
// // import { jewelleryData } from "../assets/data";

// const SearchResultsPage = () => {
//     const {jewelleryData} = useContext(AppContext)
//   const { type } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [results, setResults] = useState([]);

//   const queryType = new URLSearchParams(location.search).get("type");

//   useEffect(() => {
//     if (!type) return;

//     const q = decodeURIComponent(type).toLowerCase();
//     let filtered = [];

//     switch (queryType) {
//       case "category":
//         filtered = jewelleryData.filter(
//           (i) => i.category.toLowerCase() === q
//         );
//         break;
//       case "subcategory":
//         filtered = jewelleryData.filter(
//           (i) =>
//             i.sub_category.toLowerCase() === q ||
//             i.sub_category2?.toLowerCase() === q
//         );
//         break;
//       case "tag":
//         filtered = jewelleryData.filter((i) =>
//           i.tags?.some((t) => t.toLowerCase() === q)
//         );
//         break;
//       case "product":
//         filtered = jewelleryData.filter(
//           (i) =>
//             i.category.toLowerCase() === q ||
//             i.sub_category.toLowerCase() === q ||
//             i.sub_category2?.toLowerCase() === q
//         );
//         break;
//       default:
//         filtered = jewelleryData.filter(
//           (i) =>
//             i.name.toLowerCase().includes(q) ||
//             i.category.toLowerCase().includes(q) ||
//             i.sub_category.toLowerCase().includes(q) ||
//             i.tags?.some((t) => t.toLowerCase().includes(q))
//         );
//         break;
//     }

//     setResults(filtered);
//   }, [type, queryType]);

//   return (
//     <div className="min-h-screen bg-[#FCFDF5] pb-20 px-5 pt-4">
//       <h2 className="text-lg font-semibold text-gray-800 mb-3">
//         Showing results for: <span className="text-pink-600">{type}</span>
//       </h2>

//       {results.length === 0 ? (
//         <p className="text-center text-gray-500 mt-10">
//           No products found for this {queryType}.
//         </p>
//       ) : (
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//           {results.map((item) => (
//             <div
//               key={item.id}
//               onClick={() => navigate(`/product/${item.id}`)}
//               className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-3 cursor-pointer"
//             >
//               <img
//                 src={item.images?.[0]}
//                 alt={item.name}
//                 className="w-full h-40 object-cover rounded-lg"
//               />
//               <p className="mt-2 text-sm font-semibold text-gray-800 line-clamp-1">
//                 {item.name}
//               </p>
//               <p className="text-xs text-gray-500">{item.sub_category}</p>
//               <div className="flex items-center justify-between mt-1">
//                 <span className="text-pink-600 font-semibold">
//                   ₹{item.discountPrice}
//                 </span>
//                 <span className="text-xs text-gray-400 line-through">
//                   ₹{item.originalPrice}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchResultsPage;


import React, { useContext, useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import ProductCard from "../components/ProductCard";
import Navbar2 from "../AppComponents/Navbar2";

const SearchResultsPage = () => {
  const { jewelleryData } = useContext(AppContext);
  const { type } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [filterOptions, setFilterOptions] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);

  const queryType = new URLSearchParams(location.search).get("type");

  useEffect(() => {
    if (!type) return;
    const q = decodeURIComponent(type).toLowerCase();
    let filtered = [];

    switch (queryType) {
      case "category":
        filtered = jewelleryData.filter(
          (i) => i.category.toLowerCase() === q
        );
        break;
      case "subcategory":
        filtered = jewelleryData.filter(
          (i) =>
            i.sub_category.toLowerCase() === q ||
            i.sub_category2?.toLowerCase() === q
        );
        break;
      case "tag":
        filtered = jewelleryData.filter((i) =>
          i.tags?.some((t) => t.toLowerCase() === q)
        );
        break;
      case "product":
        filtered = jewelleryData.filter(
          (i) =>
            i.category.toLowerCase() === q ||
            i.sub_category.toLowerCase() === q ||
            i.sub_category2?.toLowerCase() === q
        );
        break;
      default:
        filtered = jewelleryData.filter(
          (i) =>
            i.name.toLowerCase().includes(q) ||
            i.category.toLowerCase().includes(q) ||
            i.sub_category.toLowerCase().includes(q) ||
            i.tags?.some((t) => t.toLowerCase().includes(q))
        );
        break;
    }

    setResults(filtered);
    setFilteredResults(filtered);

    // 🎯 Create filter options based on search type
    if (queryType === "category") {
      const subs = [
        ...new Set(
          filtered.map((p) => p.sub_category || p.sub_category2).filter(Boolean)
        ),
      ];
      setFilterOptions(subs);
    } else if (queryType === "subcategory") {
      const tags = [
        ...new Set(filtered.flatMap((p) => p.tags || [])),
      ];
      setFilterOptions(tags);
    } else {
      setFilterOptions([]);
    }

    setSelectedFilter(null);
  }, [type, queryType, jewelleryData]);

  // 💡 Handle Filter Click
  const handleFilter = (option) => {
    if (selectedFilter === option) {
      // unselect
      setSelectedFilter(null);
      setFilteredResults(results);
      return;
    }

    setSelectedFilter(option);

    if (queryType === "category") {
      setFilteredResults(results.filter(
        (p) =>
          p.sub_category === option || p.sub_category2 === option
      ));
    } else if (queryType === "subcategory") {
      setFilteredResults(results.filter(
        (p) => p.tags?.includes(option)
      ));
    }
  };

  return (
    <div className="">
        <Navbar2 name={"Searching Product"} />
    <div className="min-h-screen bg-[#FCFDF5] pb-20 px-5 pt-16">
      {/* 🧭 Header */}
      <h2 className="text-lg font-semibold text-gray-800 mb-3">
        Showing results for:{" "}
        <span className="text-pink-600">{type}</span>
      </h2>

      {/* 🎯 Filter Bar */}
      {filterOptions.length > 0 && (
        <div className="mb-5 overflow-x-auto scroll-hide">
          <div className="flex gap-2 min-w-max">
            {filterOptions.map((option, i) => (
              <button
                key={i}
                onClick={() => handleFilter(option)}
                className={`px-4 py-2 rounded-full border text-sm whitespace-nowrap transition-all ${
                  selectedFilter === option
                    ? "bg-pink-600 text-white border-pink-600"
                    : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 🛍️ Product Grid */}
      {filteredResults.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No products found for this {queryType}.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredResults.map((item) => (
            // <div
            //   key={item.id}
            //   onClick={() => navigate(`/product/${item.id}`)}
            //   className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-3 cursor-pointer"
            // >
            //   <img
            //     src={item.images?.[0]}
            //     alt={item.name}
            //     className="w-full h-40 object-cover rounded-lg"
            //   />
            //   <p className="mt-2 text-sm font-semibold text-gray-800 line-clamp-1">
            //     {item.name}
            //   </p>
            //   <p className="text-xs text-gray-500">{item.sub_category}</p>
            //   <div className="flex items-center justify-between mt-1">
            //     <span className="text-pink-600 font-semibold">
            //       ₹{item.discountPrice}
            //     </span>
            //     <span className="text-xs text-gray-400 line-through">
            //       ₹{item.originalPrice}
            //     </span>
            //   </div>
            // </div>
            <ProductCard item={item} />
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default SearchResultsPage;
