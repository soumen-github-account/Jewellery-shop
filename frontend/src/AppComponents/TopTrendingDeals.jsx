import React from "react";
import {useNavigate} from 'react-router-dom'
import t1 from "../assets/deals/t1.jpg";
import t2 from "../assets/deals/t2.jpg";
import t3 from "../assets/deals/t3.jpg";
import t4 from "../assets/deals/t4.jpg";

const trendingDeals = [
  {
    id: 1,
    title: "Rose Gold Rings",
    price: "From ₹5,499*",
    cat: "Rings",
    img: t1,
  },
  {
    id: 2,
    title: "Diamond Earrings",
    price: "From ₹9,999*",
    cat: "Earrings",
    img: t2,
  },
  {
    id: 3,
    title: "Pearl Necklaces",
    price: "From ₹14,499*",
    cat: "Necklaces",
    img: t3,
  },
  {
    id: 4,
    title: "Gold Bracelets",
    price: "From ₹8,299*",
    cat: "Bracelets",
    img: t4,
  },
];

const TopTrendingDeals = () => {
  const navigate = useNavigate()
  return (
    <div className="px-2 mt-4">
    <div className="bg-[#FDF4EA] rounded-xl p-3 max-w-6xl mx-auto shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg md:text-xl font-semibold text-[#3D2B1F]">
          Top Trending Deals
        </h2>
        {/* <img
          src="/diwali_offer.png"
          alt="Trending Offer"
          className="w-16 md:w-20 object-contain"
        /> */}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-5">
        {trendingDeals.map((item) => (
          <div
            key={item.id}
            onClick={()=>navigate(`/show-all-category/${item.cat}`)}
            className="bg-[#FAEBDD] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-full object-contain bg-[#FFF9F5]"
            />
            <div className="text-center py-2">
              <p className="text-sm font-semibold text-[#B9734C]">
                {item.price}
              </p>
              <p className="text-xs md:text-sm font-medium text-[#3D2B1F]">
                {item.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default TopTrendingDeals;
