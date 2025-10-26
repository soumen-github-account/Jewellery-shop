import React from 'react'
import about_img from '../assets/header1.png'
import star_img from '../assets/star2.png'


const About = () => {
  return (
    <div className='min-h-screen bg-[#FCFDF5] px-20 py-7'>
        <div className='flex justify-between relative'>
            <img src={star_img} className='absolute w-16 left-48 top-8' alt="" />
            <h1 className='font-cinzel text-[clamp(1.5rem,10vw,7rem)] leading-tight text-[#E4E1D9] tracking-[0.05em]'>ABOUT <br /> US</h1>
            <p className='w-[40vw] text-lg text-slate-700 font-playfair'>At Celestique, we believe that jewelry is more than just an accessory; it's a timeless expression of elegance and a celebration of life's most precious moments. With a legacy spanning over decades, our brand has become synonymous with exceptional craftsmanship and sophistication.</p>
        </div>
        <div className='mt-3 flex items-center justify-between'>
            <div className='w-[40vw] text-md font-playfair'>
            <p className='text-slate-700'>We carefully select the finest materials-precious metals, sparkling gemstones, and luxurious pearls-to create each piece. Every design is meticulously crafted by skilled artisans, ensuring that each item is not only beautiful but built to last.
                Our commitment to excellence is reflected in every detail, from the intricate designs to the flawless finish. At Celestique, we are dedicated to creating jewelry that transcends trends, offering pieces that will remain cherished for generations.
                Whether you're celebrating love, marking a special occasion, or simply treating yourself, we invite you to explore our collection and experience the celestial elegance that defines us.</p>
            <button className='bg-black py-2 font-playfair px-8 text-white rounded-full mt-5'>More About us</button>
            </div>
            <div className='bg-[#E4E1D7] relative w-[40vw] overflow-hidden h-[50vh] rounded-tl-[90px]'>
                <img src={about_img} className='w-fit absolute bottom-0 right-0' alt="" />
            </div>
        </div>
    </div>
  )
}

export default About
