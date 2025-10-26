import React from "react";
import hand from '../src/assets/hand.png'
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";
import WishlistPage from "./pages/WishlistPage";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";
import AllProduct from "./pages/AllProduct";
import ProductView from "./pages/ProductView";
import Login from "./pages/Login";
import ProtectedRoute from "./pages/ProtectedRoute";
import {Toaster} from 'react-hot-toast'

const App = () => {
  return (
    <div>
      <Toaster 
        toastOptions={{
          className: "",
          style:{
            fontSize:"13px",
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/all-product" element={<AllProduct />} />
        <Route path="/product-view/:id" element={<ProductView />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
