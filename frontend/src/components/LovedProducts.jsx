import React from 'react'
import star_img from '../assets/star2.png'
import Collection from './Collection'


const LovedProducts = () => {
  return (
    <div className='min-h-screen'>
      <div className='bg-[#FCFDF5] w-full flex flex-col gap-15 relative p-8 max-sm:p-4'>
        <p className='font-cinzel text-[clamp(2.5rem,15vw,5.5rem)] max-sm:text-[clamp(2.5rem,5vw,3rem)] tracking-widest font-bold text-[#E4E1D9] leading-tight'>
            OUR MOST <br />
            LOVED <br />
            CREATIONS
        </p>
        <img src={star_img} className='w-9 max-sm:hidden absolute left-[3.7vw] top-16.5' alt="" />
        <img src={star_img} className='w-9 max-sm:hidden absolute left-[27.7vw] top-16.5' alt="" />
        <img src={star_img} className='w-9 max-sm:hidden absolute left-[6.7vw] top-43.5' alt="" />
        <img src={star_img} className='w-9 max-sm:hidden absolute left-[30.3vw] bottom-18' alt="" />
        <img src={star_img} className='w-9 max-sm:hidden absolute left-[3.7vw] bottom-18' alt="" />
        {/* <p className='font-playfair text-[clamp(1.5rem,10vw,7rem)] tracking-wide font-bold text-[#E4E1D9]'>LOVED</p> */}
        {/* <p className='font-playfair text-[clamp(1.5rem,10vw,7rem)] tracking-wide font-bold text-[#E4E1D9]'>CREATIONS</p> */}
        
    </div>
    <Collection />
    </div>
  )
}

export default LovedProducts
