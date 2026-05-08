import React from "react";
import logo from "../assets/logo.jpg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="px-6 font-playfair text-slate-100 md:px-16 lg:px-24 xl:px-32 pt-10 w-full bg-[#98958e] max-sm:pb-20">

      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-200 pb-6">

        {/* Brand Section */}
        <div className="md:max-w-96">

          <div className="flex items-center gap-4">
            <img src={logo} className="w-10 rounded-md" alt="Celestique Jewellery Logo" />
            <p className="text-xl font-bold">CELESTIQUE</p>
          </div>

          <p className="mt-6 text-sm">
            Discover premium gold, silver and diamond jewellery collections including rings,
            necklaces, earrings and bracelets. Shop handcrafted luxury jewellery online.
          </p>
        </div>

        {/* Links */}
        <div className="flex-1 flex items-start md:justify-end gap-20">

          <div>
            <h2 className="font-semibold text-lg mb-5">Quick Links</h2>

            <ul className="text-sm space-y-2">

              <li><Link to="/">Home</Link></li>

              <li><Link to="/all-product">All Jewellery</Link></li>

              <li><Link to="/category/rings">Rings</Link></li>

              <li><Link to="/category/necklaces">Necklaces</Link></li>

              <li><Link to="/category/earrings">Earrings</Link></li>

              <li><Link to="/wishlist">Wishlist</Link></li>

            </ul>
          </div>

          {/* SEO Newsletter Section */}
          <div>
            <h2 className="font-semibold text-lg mb-5">
              Jewellery Updates & Offers
            </h2>

            <div className="text-sm space-y-2">

              <p>
                Get latest jewellery designs, gold trends and exclusive discounts directly in your inbox.
              </p>

              <div className="flex max-sm:flex-col items-center gap-2 pt-4">

                <input
                  className="border border-gray-200 placeholder-gray-400 focus:ring-2 ring-slate-600 outline-none w-full max-w-64 h-9 rounded px-2 text-black"
                  type="email"
                  placeholder="Enter your email"
                />

                <button className="bg-gray-700 w-24 h-9 text-white rounded max-sm:px-4">
                  Subscribe
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* SEO Bottom Text */}
      <p className="pt-4 text-center text-xs md:text-sm pb-5">
        © 2026 Celestique Jewellery Store | Gold, Diamond & Silver Jewellery Online Shopping
      </p>

    </footer>
  );
};

export default Footer;