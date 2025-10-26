import React from "react";
import jb1 from "../assets/deals/jb1.jpg";
import jb2 from "../assets/deals/jb2.jpg";
import jb3 from "../assets/deals/jb3.jpg";
import jb4 from "../assets/deals/jb4.jpg";
import jb5 from "../assets/deals/jb5.jpg";
import jb6 from "../assets/deals/jb6.jpg";

const brands = [
  {
    id: 1,
    title: "Celestique",
    price: "From ₹13,999*",
    img: jb1,
  },
  {
    id: 2,
    title: "Aura Gold",
    price: "From ₹20,999*",
    img: jb2,
  },
  {
    id: 3,
    title: "Viva Silver",
    price: "From ₹18,999*",
    img: jb3,
  },
  {
    id: 4,
    title: "Pure Shine",
    price: "From ₹19,999*",
    img: jb4,
  },
  {
    id: 5,
    title: "Rosé Luxe",
    price: "From ₹1,099*",
    img: jb5,
  },
  {
    id: 6,
    title: "Pearl Essence",
    price: "Up to 50% Off",
    img: jb6,
  },
];

const JewelleryBrandsSection = () => {
  return (
    <div className="max-w-6xl mt-4 sm:hidden">
      <h2 className="text-xl font-semibold text-[#2C1F18] mb-4">
        Popular Jewellery Brands
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 md:gap-5">
        {brands.map((item) => (
          <div
            key={item.id}
            className="bg-gradient-to-b from-[#FFF8F3] to-[#FFE3C4] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
          >
            <div className="flex flex-col items-center justify-center p-3">
              <img
                src={item.img}
                alt={item.title}
                className="w-20 h-20 md:w-24 md:h-24 object-contain"
              />
            </div>
            <div className="text-center pb-2">
              <p className="text-[#B46A34] text-sm font-semibold">
                {item.price}
              </p>
              <p className="text-[#3D2B1F] text-xs font-medium">
                {item.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JewelleryBrandsSection;
