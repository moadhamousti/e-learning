import React from 'react'

import { Link } from 'react-router-dom';

function Footer() {
  return (
    <>
            {/* -------------------Footer-------------------------- */}
            <footer className="bg-[--secondary-color] p-5 pb-1  " id="About">
        <div className="grid grid-cols-3 gap-2 p-5 ">
          <div className="grid grid-cols-1 gap-4 w-3/5">
            <img src="./logo.svg" alt="logo" className="w-20 object-cover" />
            <p className="lg:text-xl md:text-lg sm:text-xs lg:w-full md:w-1/2 sm:w-3/5 text-[--primary-color] leading-8 ">
              loremlorem loremlorem lorem lorem lorem lorem lorem  lorem  loremloremlorem.lorem lorem lorem lorem lorem lorem  
            </p>
          </div>
          <ul className="list-none">
            <h3 className="py-6"><Link to="#" className="text-2xl text-[--primary-color] font-bold ">About Us</Link></h3>
            <li><Link to="#" className="text-[--primary-color] text-lg font-medium	">Contact Us</Link></li>
          </ul>
          <ul className="list-none">
            <h3 className="py-6"><Link to="#" className="text-2xl text-[--primary-color] font-bold ">Follow Us</Link></h3>
            <div className="flex gap-1">
              <li><Link to="#facebook"><img src="./facebook.svg" alt="" /></Link></li>
              <li><Link to="#instagram"><img src="./instagram.svg" alt="" /></Link></li>
              <li><Link to="#twitter"><img src="./twitter.svg" alt="" /></Link></li>
            </div>
          </ul>
        </div>
        <p className="text-medium capitalize text-center text-[--primary-color]  ">
          copyrights @ reserved Made With Love By me All Right Reserved
        </p>
      </footer>

</>
  )
}

export default Footer
