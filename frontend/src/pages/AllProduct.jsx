// import React, { useState } from 'react'
// import Navbar2 from '../AppComponents/Navbar2'

// const AllProduct = () => {
//     const [query, setQuery] = useState("New")

//   return (
//     <div>
//         <Navbar2 name={"All Jewellery"} />
//         <div className='pt-16'>
//             <div className="flex w-full overflow-scroll gap-2 mb-4  scroll-hide px-3">
//                 {["New", "Trending", "Best Seller", "Limited Edition","Silver", "Yellow Gold", "Under ₹5000", "Under ₹10000"].map((tag) => (
//                     <button
//                     key={tag}
//                     onClick={()=>setQuery(tag)}
//                     className={`py-2 min-w-30 flex items-center justify-center border-1 border-[#6F4F38] text-gray-700 rounded-full text-sm hover:bg-[#6F4F38] hover:text-white transition ${tag == query ? "bg-[#6F4F38] text-white" : ""}`}
//                     >
//                     {tag}
//                     </button>
//                 ))}
//             </div>
//             <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
//                 {[].map((item) => (
//                     <ProductCard key={item.id} item={item} />
//                 ))}
//             </div>
//         </div>
//     </div>
//   )
// }

// export default AllProduct

import React, { useState } from "react";
import Navbar2 from "../AppComponents/Navbar2";
import ProductCard from "../components/ProductCard";
import { jewelleryData } from "../assets/data";
import BottomNav from "../AppComponents/BottomNav";

const AllProduct = () => {
  const [query, setQuery] = useState("All");

  // Filter products based on selected tag
    const filteredProducts =
    query === "All"
      ? jewelleryData
      : jewelleryData.filter((item) => item.tags.includes(query));

  const tags = [
    "All",
    "New",
    "Trending",
    "Best Seller",
    "Limited Edition",
    "Silver",
    "Yellow Gold",
    "Under ₹5000",
    "Under ₹10000",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar2 name={"All Jewellery"} />

      <div className="pt-12 pb-20 px-3">
        {/* Tags Filter */}
        <div className="flex fixed left-0 px-3 bg-white z-50 py-3 w-full overflow-x-scroll gap-2 mb-4 scroll-hide">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className={`py-2 min-w-30 flex items-center justify-center border border-[#6F4F38] text-gray-700 rounded-full text-sm hover:bg-[#6F4F38] hover:text-white transition ${
                tag === query ? "bg-[#6F4F38] text-white" : ""
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="pt-16 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {filteredProducts.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10">
            No products found for "{query}"
          </p>
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default AllProduct;
