import React, { useContext } from 'react'
import Header from '../components/Header'
import About from '../components/About'
import BannerProduct from '../components/BannerProduct'
import LovedProducts from '../components/LovedProducts'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { AppContext } from '../contexts/AppContext'
import Navbar1 from '../AppComponents/Navbar1'
import Banner from '../AppComponents/Banner'
import Category from '../AppComponents/Category'
import JewelleryDealsBanner from '../AppComponents/JewelleryDealsBanner'
import TopTrendingDeals from '../AppComponents/TopTrendingDeals'
import BottomNav from '../AppComponents/BottomNav'
import AppDownload from '../components/AppDownload'

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
        <AppDownload />
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
          <AppDownload />
          <Footer />
          <BottomNav />
        </div>
      }
      
    </div>
  )
}

export default Home
