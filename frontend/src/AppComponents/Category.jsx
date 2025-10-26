import React from 'react'
import { categoryData } from '../assets/data'

const Category = () => {
    
  return (
    <div className='mt-8 px-3'>
        <div className='flex items-center justify-between'>
            <h1 className='font-semibold text-[20px]'>Category</h1>
            <span className='text-[#6D503A] font-bold text-[14px] cursor-pointer'>See all</span>
        </div>
        <div className='scroll-hide mt-1 flex items-center justify-start w-full overflow-scroll'>
            {
                categoryData.map((cat, index)=>(
                    <div className='flex flex-col items-center cursor-pointer hover:bg-slate-100 transition-all duration-150 py-3 rounded-md px-2' key={index}>
                        <img src={cat.img} className='min-w-17 rounded-full' alt="" />
                        <p className='text-[12px]'>{cat.name}</p>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Category
