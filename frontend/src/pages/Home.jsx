import React, { useContext } from 'react'
import Header from '../components/Header'
import About from '../components/About'
import BannerProduct from '../components/BannerProduct'
import LovedProducts from '../components/LovedProducts'
import Footer from '../components/footer'
import Navbar from '../components/Navbar'
import { AppContext } from '../contexts/AppContext'
import Navbar1 from '../AppComponents/Navbar1'
import Banner from '../AppComponents/Banner'
import Category from '../AppComponents/Category'
import JewelleryDealsBanner from '../AppComponents/JewelleryDealsBanner'
import TopTrendingDeals from '../AppComponents/TopTrendingDeals'
import BottomNav from '../AppComponents/BottomNav'

const Home = () => {
  const {width} = useContext(AppContext)

  return (
    <div>
      {
        width > 600 ? 
        <div>
        <Navbar />
        <Header />
        <About />
        <BannerProduct />
        <LovedProducts />
        <Footer />
        </div>
        :
        <div className='font-playfair'>
          <Navbar1 />
          <Banner />
          <Category />
          <JewelleryDealsBanner />
          <TopTrendingDeals />
          <LovedProducts />
          <BannerProduct />
          <Footer />
          <BottomNav />
        </div>
      }
      
    </div>
  )
}

export default Home
