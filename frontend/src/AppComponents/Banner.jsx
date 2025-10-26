import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";

import b1 from '../assets/mb1.png'
import b2 from '../assets/mb2.png'
import b3 from '../assets/mb3.png'
import b4 from '../assets/mb4.png'
import b5 from '../assets/mb5.png'


const banners = [
  { 
    id: 1, 
    title: "New Collection", 
    desc: "Discount 50% for the first transection", 
    btnText: "Shop now", 
    bgColor: "bg-[#EDE6DA]", 
    textColor: "text-[#171417]", 
    buttonBgColor: "bg-[#6D503A]", 
    img: b1, 
  },
  {
    id: 2,
    title: "Elegant Diamond",
    desc: "Sparkle brighter with our latest diamond collection",
    btnText: "Explore now",
    bgColor: "bg-[#F5EDE3]",
    textColor: "text-[#2A1B10]",
    buttonBgColor: "bg-[#A37B4E]",
    img: b2
  },
  {
    id: 3,
    title: "Golden Heritage",
    desc: "Pure gold jewellery handcrafted for your royal look",
    btnText: "Discover more",
    bgColor: "bg-[#FFF8E7]",
    textColor: "text-[#3B2A1A]",
    buttonBgColor: "bg-[#B88A44]",
    img: b3
  },
  {
    id: 4,
    title: "Silver Serenity",
    desc: "Minimal designs for everyday elegance",
    btnText: "Shop collection",
    bgColor: "bg-[#F4F4F4]",
    textColor: "text-[#2C2C2C]",
    buttonBgColor: "bg-[#8C8C8C]",
    img: b4
  },
  {
    id: 5,
    title: "Rose Gold Romance",
    desc: "Fall in love with our exclusive rose gold jewellery",
    btnText: "View collection",
    bgColor: "bg-[#F9E8E4]",
    textColor: "text-[#3D2B2B]",
    buttonBgColor: "bg-[#C1866A]",
    img: b5
  }

]


const Banner = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);

  // Auto slide control
  useEffect(() => {
    if (!paused) {
      intervalRef.current = setInterval(() => {
        setIndex((prev) => (prev + 1) % banners.length);
      }, 4000);
    }
    return () => clearInterval(intervalRef.current);
  }, [paused]);

  // Swipe control
  const handlers = useSwipeable({
    onSwipedLeft: () => setIndex((prev) => (prev + 1) % banners.length),
    onSwipedRight: () => setIndex((prev) => (prev - 1 + banners.length) % banners.length),
    trackMouse: true,
  });

  return (
    <div className="px-2 mt-3">
    <div
      className="relative w-full max-w-4xl overflow-hidden rounded-2xl shadow-lg h-40"
      {...handlers}
      onMouseEnter={() => setPaused(true)}   // 🟡 Pause when hovered
      onMouseLeave={() => setPaused(false)} // 🟢 Resume when mouse leaves
    >
      <AnimatePresence>
        <motion.div
          key={banners[index].id}
          className={`absolute inset-0 flex items-center justify-between text-white ${banners[index].bgColor}`}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.6 }}
        >
          {/* Left Section */}
          <div className="flex flex-col justify-between h-full max-w-sm p-6">
            <h2 className={`text-xl font-semibold leading-snug ${banners[index].textColor}`}>
              {banners[index].title}
            </h2>
            <p className={`text-[12.5px] mt-1 ${banners[index].textColor}`}>{banners[index].desc}</p>
            <button className={`w-28 text-white rounded-md shadow-md py-2 mt-4 text-[12px] font-bold hover:bg-neutral-700 transition ${banners[index].buttonBgColor}`}>
              {banners[index].btnText}
            </button>
          </div>

          {/* Right Image */}
          <div className="w-1/2 h-full">
            <img
              src={banners[index].img}
              alt={banners[index].title}
              className="w-full h-full object-cover rounded-r-2xl"
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
    
      {/* Dots Indicator */}
      
    <div className="absolute pt-3 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
              i === index ? "bg-[#7B542F] scale-125" : "bg-[#E6D8C3]"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
