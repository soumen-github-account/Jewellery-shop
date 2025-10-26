import React from 'react'
import star_img from '../assets/star2.png'
import p1 from '../assets/p1.png'
import p2 from '../assets/p2.png'
import p3 from '../assets/p3.png'
import p4 from '../assets/p4.png'
import arrow from '../assets/arrow-right.png'


const BannerProduct = () => {
  return (
    <div className='min-h-screen'>
      <div className='bg-[#FCFDF5] w-full flex items-center justify-center gap-15 max-sm:gap-5 relative'>
        <p className='font-playfair text-center text-[clamp(1.5rem,10vw,7rem)] tracking-wide font-bold text-[#E4E1D9]'>
            OUR 
        </p>
        <img src={star_img} className='w-9 max-sm:hidden absolute left-[20.5vw] top-18.5' alt="" />
        <img src={star_img} className='w-9 max-sm:hidden absolute left-[50.5vw] top-18.5' alt="" />
        <img src={star_img} className='w-9 max-sm:hidden absolute right-[29vw] top-18.5' alt="" />
        <p className='font-playfair text-center text-[clamp(1.5rem,10vw,7rem)] tracking-wide font-bold text-[#E4E1D9]'>PRODUCTS</p>
      </div>

      <div className='grid grid-cols-2 max-sm:grid-cols-1'>
        <div className='bg-cover bg-center h-[70vh] w-full pl-10 pt-3 text-[#FFFFFA]' style={{ backgroundImage: `url(${p1})` }}>
            <div className='flex items-center text-4xl font-playfair border-b-2 border-b-white py-2 pb-4 gap-3'>
              <p>BRACELETS</p>
              <img src={arrow} className='w-15 h-5 mt-2.5' alt="" />
            </div>
        </div>
        <div className='bg-cover bg-center h-[70vh] w-full pl-10 pt-3 text-[#FFFFFA]' style={{ backgroundImage: `url(${p2})` }}>
            <div className='flex items-center text-4xl font-playfair border-b-2 border-b-white py-2 pb-4 gap-3'>
              <p>EARRINGS</p>
              <img src={arrow} className='w-15 h-5 mt-2.5' alt="" />
            </div>
        </div>
        <div className='bg-cover bg-center h-[70vh] w-full pl-10 pt-3 text-[#FFFFFA]' style={{ backgroundImage: `url(${p3})` }}>
            <div className='flex items-center text-4xl font-playfair border-b-2 border-b-white py-2 pb-4 gap-3'>
              <p>RINGS</p>
              <img src={arrow} className='w-15 h-5 mt-2.5' alt="" />
            </div>
        </div>
        <div className='bg-cover bg-center h-[70vh] w-full pl-10 pt-3 text-[#FFFFFA]' style={{ backgroundImage: `url(${p4})` }}>
            <div className='flex items-center text-4xl font-playfair border-b-2 border-b-white py-2 pb-4 gap-3'>
              <p>NECKLACES</p>
              <img src={arrow} className='w-15 h-5 mt-2.5' alt="" />
            </div>
        </div>
      </div>
    </div>
  )
}

export default BannerProduct
