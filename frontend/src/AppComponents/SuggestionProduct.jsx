import React, { useContext } from 'react'
import SlideProductCard from './SlideProductCard'
import { AppContext } from '../contexts/AppContext'

const SuggestionProduct = () => {
  const {jewelleryData} = useContext(AppContext)
  return (
    <div className='mt-4'>
      <p className='text-xl font-bold'>Suggestive Products</p>
      <div className="flex items-center justify-start w-full overflow-scroll scroll-hide gap-8 max-sm:gap-2 mt-2">
        {jewelleryData.slice(0, 6).map((item) => (
          <SlideProductCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

export default SuggestionProduct
