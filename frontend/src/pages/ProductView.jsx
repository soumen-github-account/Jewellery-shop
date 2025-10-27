
// import React, { useState, useEffect, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { AiFillStar } from "react-icons/ai";
// import Navbar2 from "../AppComponents/Navbar2";
// import SuggestionProduct from "../AppComponents/SuggestionProduct";
// import ProductCard from "../components/ProductCard";
// import { useSwipeable } from "react-swipeable";
// import { AppContext } from "../contexts/AppContext";

// const ProductView = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { backendUrl, jewelleryData, toggleWishlist, isInWishlist, toggleLoading } =
//     useContext(AppContext);

//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [activeIndex, setActiveIndex] = useState(0);

//   const inWishlist = product ? isInWishlist(product.id) : false;

//   // Fetch product from backend
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         setLoading(true);
//         const { data } = await axios.get(`${backendUrl}/products/get-product/${id}`);
//         if (data.success) setProduct(data.product);
//         else setProduct(null);
//       } catch (err) {
//         console.error(err);
//         setProduct(null);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [id, backendUrl]);

//   // Swipe handlers
//   const handlers = useSwipeable({
//     onSwipedLeft: () =>
//       setActiveIndex((prev) =>
//         product?.images
//           ? prev === product.images.length - 1
//             ? 0
//             : prev + 1
//           : prev
//       ),
//     onSwipedRight: () =>
//       setActiveIndex((prev) =>
//         product?.images
//           ? prev === 0
//             ? product.images.length - 1
//             : prev - 1
//           : prev
//       ),
//     preventDefaultTouchmoveEvent: true,
//     trackMouse: true,
//   });

//   // --- Loading Skeleton ---
//   if (loading) {
//     return (
//       <div>
//         <Navbar2 name={"Product Details"} />
//         <div className="min-h-screen bg-white px-3 pt-15 pb-22 font-playfair">
//           <div className="max-w-md mx-auto animate-pulse">
//             {/* Main Image Skeleton */}
//             <div className="w-full h-80 bg-gray-200 rounded-xl mb-4"></div>

//             {/* Thumbnails Skeleton */}
//             <div className="flex gap-2 mb-4 overflow-x-auto">
//               {[...Array(4)].map((_, i) => (
//                 <div key={i} className="w-16 h-16 bg-gray-200 rounded-lg"></div>
//               ))}
//             </div>

//             {/* Product Title Skeleton */}
//             <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>

//             {/* Rating Skeleton */}
//             <div className="h-4 bg-gray-200 w-1/4 mb-2"></div>

//             {/* Description Skeleton */}
//             <div className="space-y-2 mb-4">
//               <div className="h-3 bg-gray-200 rounded w-full"></div>
//               <div className="h-3 bg-gray-200 rounded w-full"></div>
//               <div className="h-3 bg-gray-200 rounded w-5/6"></div>
//             </div>

//             {/* Price Skeleton */}
//             <div className="flex justify-between items-center mt-6">
//               <div className="h-6 bg-gray-200 rounded w-20"></div>
//               <div className="h-6 bg-gray-200 rounded w-24"></div>
//             </div>

//             {/* Button Skeleton */}
//             <div className="mt-4 h-10 bg-gray-200 rounded-full w-full"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // --- Not Found ---
//   if (!product) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-600">
//         Product not found 🥺
//       </div>
//     );
//   }

//   // --- Main Product View ---
//   return (
//     <div>
//       <Navbar2 name={"Product Details"} />
//       <div className="min-h-screen bg-white text-gray-800 flex flex-col items-center pt-15 px-3 font-playfair pb-22">
//         {/* --- Main Swipable Image --- */}
//         <div
//           {...handlers}
//           className="relative w-full max-w-md rounded-xl overflow-hidden select-none"
//         >
//           {product.images && product.images.length > 0 ? (
//             <img
//               src={product.images[activeIndex]}
//               alt={product.name}
//               className="w-full h-80 object-cover rounded-xl transition-all duration-300"
//             />
//           ) : (
//             <div className="w-full h-80 bg-gray-100 flex items-center justify-center text-gray-400 rounded-xl">
//               No Image
//             </div>
//           )}

//           {/* Dots Indicator */}
//           {product.images && (
//             <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
//               {product.images.map((_, i) => (
//                 <div
//                   key={i}
//                   className={`w-2 h-2 rounded-full ${
//                     activeIndex === i ? "bg-gray-800" : "bg-gray-300"
//                   }`}
//                 />
//               ))}
//             </div>
//           )}
//         </div>

//         {/* --- Thumbnails --- */}
//         {product.images && (
//           <div className="flex gap-2 mt-4 overflow-x-scroll scroll-hide w-full max-w-md">
//             {product.images.map((img, index) => (
//               <img
//                 key={index}
//                 src={img}
//                 alt={`thumb-${index}`}
//                 onClick={() => setActiveIndex(index)}
//                 className={`w-16 h-16 object-cover rounded-lg border-2 cursor-pointer ${
//                   activeIndex === index
//                     ? "border-[#704F38]"
//                     : "border-gray-200 hover:border-gray-400"
//                 }`}
//               />
//             ))}
//           </div>
//         )}

//         {/* --- Details Section --- */}
//         <div className="w-full max-w-md mt-6">
//           <div className="flex justify-between items-center">
//             <p className="text-sm text-gray-500">Female’s Style</p>
//             <div className="flex items-center text-yellow-500">
//               <AiFillStar className="mr-1" /> <span>{product.rating}</span>
//             </div>
//           </div>

//           <h2 className="text-xl font-semibold mt-1">{product.name}</h2>

//           <div className="mt-2 text-sm text-gray-600 leading-relaxed">
//             {product.description}
//           </div>

//           <p className="text-gray-800 mt-2">
//             Metal Type:{" "}
//             <span className="text-gray-600 text-md">{product.metal_type}</span>
//           </p>

//           <div>
//             <p className="font-bold mt-2">Description</p>
//             <p className="text-[14px] text-gray-600">
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
//               reiciendis repellat at earum, id vitae tempore...
//             </p>
//           </div>

//           {/* --- Suggestion Section --- */}
//           <SuggestionProduct cat={product.category} />

//           <div className="mt-4">
//             <p className="text-xl font-bold">More Products</p>
//             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 max-sm:gap-2 mt-2">
//               {Array.isArray(jewelleryData) &&
//                 jewelleryData.map((item) => (
//                   <ProductCard key={item.id} item={item} />
//                 ))}
//             </div>
//           </div>

//           {/* --- Bottom Sticky Bar --- */}
//           <div className="fixed left-0 bg-white w-full bottom-0 flex justify-between items-center px-4 py-2 border-t border-gray-300 rounded-t-2xl shadow-sm">
//             <div className="flex items-center gap-3">
//               <p className="text-gray-800 font-semibold text-lg">
//                 ₹{(product.discount_price || 0).toFixed(2)}
//               </p>
//               <p className="text-gray-400 text-sm line-through">
//                 ₹{(product.original_price || 0).toFixed(2)}
//               </p>
//             </div>
//             <button
//               onClick={() => {
//                 if (toggleLoading) return;
//                 inWishlist ? navigate("/wishlist") : toggleWishlist(product);
//               }}
//               disabled={toggleLoading}
//               className={`bg-[#704F38] text-white px-6 py-2 rounded-full font-medium shadow-md transition 
//                 ${
//                   toggleLoading
//                     ? "cursor-not-allowed opacity-50"
//                     : "hover:bg-[#795c48] cursor-pointer"
//                 }`}
//             >
//               {toggleLoading
//                 ? "Processing..."
//                 : inWishlist
//                 ? "Go to Wishlist"
//                 : "Add to Wishlist"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductView;


import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AiFillStar } from "react-icons/ai";
import Navbar2 from "../AppComponents/Navbar2";
import SuggestionProduct from "../AppComponents/SuggestionProduct";
import ProductCard from "../components/ProductCard";
import { useSwipeable } from "react-swipeable";
import { AppContext } from "../contexts/AppContext";

const ProductView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { backendUrl, jewelleryData, toggleWishlist, isInWishlist, toggleLoading } =
    useContext(AppContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const inWishlist = product ? isInWishlist(product.id) : false;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${backendUrl}/products/get-product/${id}`);
        if (data.success) setProduct(data.product);
        else setProduct(null);
      } catch (err) {
        console.error(err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, backendUrl]);

  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setActiveIndex((prev) =>
        product?.images
          ? prev === product.images.length - 1
            ? 0
            : prev + 1
          : prev
      ),
    onSwipedRight: () =>
      setActiveIndex((prev) =>
        product?.images
          ? prev === 0
            ? product.images.length - 1
            : prev - 1
          : prev
      ),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  // --- Loading Skeleton ---
  if (loading) {
    return (
      <div>
        <Navbar2 name={"Product Details"} />
        <div className="min-h-screen bg-white px-3 pt-15 pb-22 font-playfair">
          <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-10 animate-pulse">
            {/* Left image skeleton */}
            <div className="flex-1">
              <div className="w-full h-80 lg:h-[500px] bg-gray-200 rounded-xl mb-4"></div>
              <div className="flex gap-2 mb-4 overflow-x-auto">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                ))}
              </div>
            </div>

            {/* Right details skeleton */}
            <div className="flex-1 space-y-4">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 w-1/4"></div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              </div>
              <div className="flex gap-4 mt-6">
                <div className="h-6 bg-gray-200 rounded w-20"></div>
                <div className="h-6 bg-gray-200 rounded w-24"></div>
              </div>
              <div className="mt-4 h-10 bg-gray-200 rounded-full w-40"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Product not found 🥺
      </div>
    );
  }

  return (
    <div>
      <Navbar2 name={"Product Details"} />
      <div className="min-h-screen bg-white text-gray-800 font-playfair pt-15 pb-22 px-3 lg:px-10">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10">
          {/* --- Left Section (Images) --- */}
          <div className="flex-1" {...handlers}>
            <div className="relative rounded-xl overflow-hidden select-none">
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[activeIndex]}
                  alt={product.name}
                  className="w-full h-80 lg:h-[500px] object-cover rounded-xl transition-all duration-300"
                />
              ) : (
                <div className="w-full h-80 bg-gray-100 flex items-center justify-center text-gray-400 rounded-xl">
                  No Image
                </div>
              )}
              {product.images && (
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
                  {product.images.map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        activeIndex === i ? "bg-gray-800" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {product.images && (
              <div className="flex gap-2 mt-4 overflow-x-auto scroll-hide">
                {product.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`thumb-${index}`}
                    onClick={() => setActiveIndex(index)}
                    className={`w-16 h-16 object-cover rounded-lg border-2 cursor-pointer transition ${
                      activeIndex === index
                        ? "border-[#704F38]"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* --- Right Section (Details) --- */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">Female’s Style</p>
                <div className="flex items-center text-yellow-500">
                  <AiFillStar className="mr-1" /> <span>{product.rating}</span>
                </div>
              </div>

              <h2 className="text-2xl font-semibold mt-1">{product.name}</h2>
              <p className="mt-3 text-gray-700 leading-relaxed text-[15px]">
                {product.description}
              </p>

              <p className="text-gray-800 mt-3">
                Metal Type:{" "}
                <span className="text-gray-600">{product.metal_type}</span>
              </p>

              <div className="mt-4">
                <p className="font-bold">Description</p>
                <p className="text-[14px] text-gray-600">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Officiis reiciendis repellat at earum, id vitae tempore...
                </p>
              </div>
            </div>

            {/* --- Price and Button (non-sticky for large screens) --- */}
            <div className="mt-6 md:flex justify-between items-center hidden">
              <div>
                <p className="text-gray-800 font-semibold text-xl">
                  ₹{(product.discount_price || 0).toFixed(2)}
                </p>
                <p className="text-gray-400 text-sm line-through">
                  ₹{(product.original_price || 0).toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => {
                  if (toggleLoading) return;
                  inWishlist ? navigate("/wishlist") : toggleWishlist(product);
                }}
                disabled={toggleLoading}
                className={`bg-[#704F38] text-white px-6 py-2 rounded-full font-medium shadow-md transition ${
                  toggleLoading
                    ? "cursor-not-allowed opacity-50"
                    : "hover:bg-[#795c48] cursor-pointer"
                }`}
              >
                {toggleLoading
                  ? "Processing..."
                  : inWishlist
                  ? "Go to Wishlist"
                  : "Add to Wishlist"}
              </button>
            </div>
          </div>
        </div>

        {/* --- Additional Product Details --- */}
<div className="mt-6 bg-[#faf7f5] rounded-2xl p-5 border border-[#e5ded9]">
  <h3 className="text-lg font-semibold mb-3 text-[#704F38]">Product Information</h3>

  <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 text-[15px] text-gray-700">
    <p>
      <span className="font-semibold text-gray-900">Metal Type:</span>{" "}
      {product.metal_type}
    </p>
    <p>
      <span className="font-semibold text-gray-900">Color:</span>{" "}
      {product.color}
    </p>
    <p>
      <span className="font-semibold text-gray-900">Category:</span>{" "}
      {product.category}
    </p>
    <p>
      <span className="font-semibold text-gray-900">Sub Category:</span>{" "}
      {product.sub_category}
    </p>
    <p>
      <span className="font-semibold text-gray-900">Style Type:</span>{" "}
      {product.sub_category2}
    </p>
    <p>
      <span className="font-semibold text-gray-900">Offer:</span>{" "}
      <span className="text-green-600 font-medium">{product.offer}</span>
    </p>
  </div>

  {/* Tags */}
  {product.tags && product.tags.length > 0 && (
    <div className="mt-4 flex flex-wrap gap-2">
      {product.tags.map((tag, index) => (
        <span
          key={index}
          className="bg-[#704F38]/10 text-[#704F38] px-3 py-1 rounded-full text-sm font-medium"
        >
          #{tag}
        </span>
      ))}
    </div>
  )}
</div>


        {/* --- Suggestion Section --- */}
        <div className="mt-10">
          <SuggestionProduct cat={product.category} />
        </div>

        {/* --- More Products --- */}
        <div className="mt-10">
          <p className="text-xl font-bold mb-4">More Products</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {Array.isArray(jewelleryData) &&
              jewelleryData.map((item) => (
                <ProductCard key={item.id} item={item} />
              ))}
          </div>
        </div>

        {/* --- Sticky bottom bar (only for mobile) --- */}
        <div className="lg:hidden fixed left-0 bottom-0 bg-white w-full flex justify-between items-center px-4 py-2 border-t border-gray-300 rounded-t-2xl shadow-sm">
          <div className="flex items-center gap-3">
            <p className="text-gray-800 font-semibold text-lg">
              ₹{(product.discount_price || 0).toFixed(2)}
            </p>
            <p className="text-gray-400 text-sm line-through">
              ₹{(product.original_price || 0).toFixed(2)}
            </p>
          </div>
          <button
            onClick={() => {
              if (toggleLoading) return;
              inWishlist ? navigate("/wishlist") : toggleWishlist(product);
            }}
            disabled={toggleLoading}
            className={`bg-[#704F38] text-white px-6 py-2 rounded-full font-medium shadow-md transition ${
              toggleLoading
                ? "cursor-not-allowed opacity-50"
                : "hover:bg-[#795c48] cursor-pointer"
            }`}
          >
            {toggleLoading
              ? "Processing..."
              : inWishlist
              ? "Go to Wishlist"
              : "Add to Wishlist"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
