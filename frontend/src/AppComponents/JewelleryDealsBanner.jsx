import React from "react";
import j1 from "../assets/deals/j1.jpg";
import j2 from "../assets/deals/j2.jpg";
import j3 from "../assets/deals/j3.jpg";
import { useNavigate } from 'react-router-dom'


const deals = [
  {
    id: 1,
    title: "Diamond Necklaces",
    price: "From ₹49,999*",
    cat: "Necklaces",
    img: j1,
  },
  {
    id: 2,
    title: "Gold Bangles",
    price: "From ₹12,499*",
    cat: "Bangles",
    img: j2,
  },
  {
    id: 3,
    title: "Silver Earrings",
    price: "From ₹1,999*",
    cat: "Earrings",
    img: j3,
  },
];

const JewelleryDealsBanner = () => {
  const navigate = useNavigate();
  return (
    <div className="px-2 mt-4">
    <div className="bg-[#FDEEE2] rounded-xl p-3 max-w-6xl mx-auto shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg md:text-xl font-semibold text-[#3D2B1F]">
          Top deals on Jewellery
        </h2>
        {/* <img
          src="/bigbang.png"
          alt="Festival Offer"
          className="w-16 md:w-20 object-contain"
        /> */}
      </div>

      <div className="grid grid-cols-3 gap-3 md:gap-5">
        {deals.map((item) => (
          <div
            key={item.id}
            onClick={()=>navigate(`/show-all-category/${item.cat}`)}
            className="bg-[#F7E4D7] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-full object-contain bg-[#F8F5F2]"
            />
            <div className="text-center py-2">
              <p className="text-sm font-semibold text-[#C07B53]">
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

export default JewelleryDealsBanner;
