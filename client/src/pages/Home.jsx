import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import Hero from '../components/Hero';
import Features from '../components/Features';
import Certificate from '../components/Certificate';
import Choose_Us from '../components/Choose_Us';
function Home() {
  return (
    <div>
      
      <Navbar />
      <Hero />
      <Features />
      <Certificate />
      <Choose_Us />
      <Footer />
    </div>
  )
}

export default Home
