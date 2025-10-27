import React from 'react'
import { FaArrowRight } from "react-icons/fa6";
import header_img from '../assets/hand.png'
import star_img from '../assets/star.png'
import Navbar from './Navbar';
import {useNavigate} from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()
    // bg-linear-to-br from-[#B5AEA1] via-[#D6D1C5] to-[#D6D1C5]
  return (
    <div className='min-h-screen relative bg-[#B5AEA1] pt-6'>
        <div className='relative'>
            <div className='bg-white w-[30vw] h-0.5 absolute left-50 rounded-full' />
            <img src={star_img} className='absolute w-20 left-60 top-12' alt="" />
            <h1 className='font-cinzel text-center text-[clamp(1.5rem,10vw,12rem)] leading-tight text-white tracking-[0.05em]'>CELESTIQUE</h1>
            <img src={star_img} className='absolute w-20 right-[32vw] top-11' alt="" />
            <div className='bg-white w-[30vw] h-0.5 absolute right-50 rounded-full' />
        </div>
        <img src={header_img} className='absolute w-65 bottom-0 left-[40vw]' alt="" />
        <div className='flex items-center justify-between px-20 mt-10'>
        <div>
            <h1 className='font-playfair text-white/80 text-5xl font-bold'>COLLECTION <br /> 2025</h1>
            <p className='w-[30vw] text-white/80 my-3'>Discover exquisite jewelry inspired by the beauty of the heavens.
                Each piece is crafted to bring elegance and grace to your most       cherished occasions.</p>
            <button onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })} className='bg-black rounded-full py-2 text-white/80 px-8 flex items-center gap-5 justify-center'>
                <p>DISCOVER</p>
                <FaArrowRight />
            </button>
        </div>
        <div>
            <p className='text-sm md:text-3xl font-playfair text-white/80 tracking-wide mb-30'>A CELESTIAL TOUCH <br /> FOR TIMELESS MOMENTS</p>
            <div className="">
                {["RINGS", "EARRINGS", "NECKLACES", "BRACELETS"].map((item) =>{
                    const formattedItem = item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
                return (
                <div
                    onClick={() =>navigate(`/show-all-category/${formattedItem}`)}
                    key={item}
                    className="border-b-1 border-white/80 py-2.5 px-2 flex items-center justify-between cursor-pointer text-white text-lg"
                >
                    <span>{item}</span>
                    <span>→</span>
                </div>
                )
                
                })}
            </div>
        </div>
        </div>
    </div>
  )
}

export default Header
