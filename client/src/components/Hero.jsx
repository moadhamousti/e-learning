import React from 'react'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div>
      
      {/* -------------------Hero-------------------------- */}
      <section className="bg-[--secondary-color] grid gap-4  grid-cols-1 md:grid-cols-2 px-4 py-0" id="Home">
        <div className=" sm:items-center lg:items-start  p-4  flex  text-[--primary-color]  flex-col justify-center">
          <p className="text-6xl  font-bold w-5/6 leading-30">Grow up your skills by online courses with LogoName</p>
          <button className="p-2   w-2/6 border-[4px] border-[--primary-color]  outline-none  rounded-lg text-[--primary-color] bg-[--secondary-color]  hover:bg-[--primary-color] hover:text-[--text-color] font-bold text-xl mt-10">
            <Link to="/login">Join Us</Link>
          </button>
        </div>
        <div className="m-0 p-0 sm:hidden md:block lg:block">
          <img src="./banner.png" alt="banner" className="w-full h-full  " />
        </div>
      </section>
    </div>
  )
}

export default Hero
