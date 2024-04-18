import React from 'react'
import Header from '../Components/Layout/Header.jsx'
import Hero from '../Components/Route/Hero.jsx'
import Categories from '../Components/Route/Categories.jsx'
import BestDeals from '../Components/Route/BestDeals/BestDeals.jsx'
import Events from '../Components/Events/Events.jsx'
import FeaturedProducts from '../Components/Route/FeaturedProducts/FeaturedProducts.jsx'
import Sponsored from '../Components/Route/Sponsored.jsx'
import Footer from '../Components/Layout/Footer.jsx'

const HomePage = () => {
  return (
    <div>
        <Header activeHeading={1}/>
        <Hero/>
        <Categories/>
        <BestDeals/>
        <Events/>
        <FeaturedProducts/>
        <Sponsored/>
        <Footer/>
    </div>
  )
}

export default HomePage