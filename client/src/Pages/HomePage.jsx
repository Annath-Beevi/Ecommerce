import React from 'react'
import Header from '../Components/Layout/Header.jsx'
import Hero from '../Components/Route/Hero.jsx'
import Categories from '../Components/Route/Categories.jsx'

const HomePage = () => {
  return (
    <div>
        <Header activeHeading={1}/>
        <Hero/>
        <Categories/>
    </div>
  )
}

export default HomePage