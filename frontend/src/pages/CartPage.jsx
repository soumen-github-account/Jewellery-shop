import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import ProductCard from "../components/ProductCard";
import BottomNav from "../AppComponents/BottomNav";
import Navbar2 from "../AppComponents/Navbar2";

const CartPage = () => {
  const { wishlist } = useContext(AppContext);

  return (
    <div>
    <Navbar2 name={"Order"} />
    <div className="min-h-screen bg-gray-50 p-5 pt-17">
      <h1 className="text-2xl font-bold mb-5 font-cinzel">My Ordered</h1>
      {wishlist.length === 0 ? (
        <p className="text-gray-500 text-center">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {wishlist.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      )}
    <BottomNav />
    </div>
    </div>
  );
};

export default CartPage;
