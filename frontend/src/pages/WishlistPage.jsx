import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import ProductCard from "../components/ProductCard";
import BottomNav from "../AppComponents/BottomNav";
import Navbar2 from "../AppComponents/Navbar2";
import CardSkeleon from "../components/CardSkeleon";

const WishlistPage = () => {
  const { wishlist, wishlistLoading  } = useContext(AppContext);
  const isLoading = wishlistLoading || !Array.isArray(wishlist);
  return (
    <div>
      <Navbar2 name={"Wishlist"} />
    <div className="min-h-screen bg-gray-50 p-5 pt-17">
      <h1 className="text-2xl font-bold mb-5 font-cinzel">My Wishlist</h1>
      {
      isLoading ?
        Array.from({ length: 6 }).map((_, i) => <CardSkeleon key={i} />)
      :
      wishlist.length === 0 ? (
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

export default WishlistPage;
