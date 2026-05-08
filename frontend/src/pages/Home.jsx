// import React, { useContext } from 'react'
// import Header from '../components/Header'
// import About from '../components/About'
// import BannerProduct from '../components/BannerProduct'
// import LovedProducts from '../components/LovedProducts'
// import Footer from '../components/Footer'
// import Navbar from '../components/Navbar'
// import { AppContext } from '../contexts/AppContext'
// import Navbar1 from '../AppComponents/Navbar1'
// import Banner from '../AppComponents/Banner'
// import Category from '../AppComponents/Category'
// import JewelleryDealsBanner from '../AppComponents/JewelleryDealsBanner'
// import TopTrendingDeals from '../AppComponents/TopTrendingDeals'
// import BottomNav from '../AppComponents/BottomNav'
// import AppDownload from '../components/AppDownload'

// const Home = () => {
//   const {width} = useContext(AppContext)

//   return (
//     <div>
//       {
//         width > 600 ? 
//         <div>
//         <Navbar />
//         <Header />
//         <About />
//         <BannerProduct />
//         <LovedProducts />
//         <AppDownload />
//         <Footer />
//         </div>
//         :
//         <div className='font-playfair'>
//           <Navbar1 />
//           <Banner />
//           <Category />
//           <JewelleryDealsBanner />
//           <TopTrendingDeals />
//           <LovedProducts />
//           <BannerProduct />
//           <AppDownload />
//           <Footer />
//           <BottomNav />
//         </div>
//       }
      
//     </div>
//   )
// }

// export default Home


import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";

import Header from "../components/Header";
import About from "../components/About";
import BannerProduct from "../components/BannerProduct";
import LovedProducts from "../components/LovedProducts";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { AppContext } from "../contexts/AppContext";

import Navbar1 from "../AppComponents/Navbar1";
import Banner from "../AppComponents/Banner";
import Category from "../AppComponents/Category";
import JewelleryDealsBanner from "../AppComponents/JewelleryDealsBanner";
import TopTrendingDeals from "../AppComponents/TopTrendingDeals";
import BottomNav from "../AppComponents/BottomNav";
import AppDownload from "../components/AppDownload";

const Home = () => {
  const { width } = useContext(AppContext);

  return (
    <>
      {/* SEO */}
      <Helmet>
        <title>Gold Jewellery Online | Buy Gold, Diamond & Silver Jewellery - Celestique</title>

        <meta name="description" content="Buy gold jewellery online in India. Explore premium gold rings, diamond necklaces, earrings and silver jewellery with elegant handcrafted designs at Celestique Jewellery." />

        <meta name="keywords" content="gold jewellery online, buy gold jewellery, diamond jewellery, silver jewellery, gold rings, gold necklace, jewellery online India" />

        <link rel="canonical" href="https://jewellery-shop-frontend-henna.vercel.app/" />

        <meta name="robots" content="index, follow" />
        
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Celestique Jewellery",
            "url": "https://jewellery-shop-frontend-henna.vercel.app/",
            "description": "Buy gold jewellery online in India including rings, necklaces and diamond jewellery.",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://jewellery-shop-frontend-henna.vercel.app/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }`}
        </script>
      </Helmet>

      <div>
        {/* Main SEO Heading */}
        <h1 className="hidden">
          Celestique Gold, Silver & Diamond Jewellery Collection
        </h1>

        {width > 600 ? (
          <div>
            <Navbar />

            <Header />

            {/* SEO Content */}
            <section className="px-10 py-10 text-center">
              <h2 className="text-4xl font-bold mb-4">
                Luxury Jewellery Collection
              </h2>

              <p className="text-lg text-gray-600">
                Discover premium handcrafted gold, silver and
                diamond jewellery for weddings, parties and daily
                fashion. Explore elegant rings, necklaces,
                earrings and bracelets with modern designs.
              </p>
            </section>

            <About />

            <BannerProduct />

            <LovedProducts />

            <AppDownload />

            <Footer />
          </div>
        ) : (
          <div className="font-playfair">
            <Navbar1 />

            <Banner />

            <Category />

            <JewelleryDealsBanner />

            <TopTrendingDeals />

            {/* Mobile SEO Content */}
            <section className="px-5 py-8 text-center">
              <h2 className="text-2xl font-bold mb-3">
                Trending Jewellery Designs
              </h2>

              <p className="text-gray-600">
                Shop beautiful gold, silver and diamond jewellery
                online with elegant handcrafted collections.
              </p>
            </section>

            <LovedProducts />

            <BannerProduct />

            <AppDownload />

            <Footer />

            <BottomNav />
          </div>
        )}
      </div>
    </>
  );
};

export default Home;