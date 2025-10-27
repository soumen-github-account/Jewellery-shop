import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import Navbar2 from "../AppComponents/Navbar2";
import ProductCard from "../components/ProductCard";
import BottomNav from "../AppComponents/BottomNav";

const ShowAllCategoryDataPage = () => {
  const { cat } = useParams(); 
  const { jewelleryData } = useContext(AppContext);
  const [filterProducts, setFilterProducts] = useState([]);

  useEffect(() => {
    if (jewelleryData && cat) {
      const filtered = jewelleryData.filter(
        (item) => item.category.toLowerCase() === cat.toLowerCase()
      );
      setFilterProducts(filtered);
    }
  }, [cat, jewelleryData]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar2 name={cat} />

      <div className="pt-16 px-4 pb-24">
        {filterProducts.length > 0 ? (
          <>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              {cat} Collection
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {filterProducts.map((item) => (
                <ProductCard key={item.id} item={item} />
              ))}
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500 text-lg mt-10">
            No products found for "{cat}".
          </p>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default ShowAllCategoryDataPage;
