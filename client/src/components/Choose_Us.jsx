import React from 'react'
import { Link } from 'react-router-dom';

function Choose_Us() {
  return (

    <>
      {/* -------------------why should you choose us -------------------------- */}
      <div className="lg:grid md:grid  place-items-center	 my-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 bg-[--primary-color] max-w-7xl rounded-2xl lg:w-full md:w-11/12 ">
          <div className="p-10">
            <h1 className="lg:text-6xl sm:text-3xl font-bold text-[--text-color] leading-20	 ">Why should you choose us?</h1>
            <ul className="text-[--text-color] list-none flex flex-col gap-3 mt-3 ">
              <li className="flex gap-2 items-start 	  "><img src="./star-circle.svg" alt="" />Teachers don't get lost in the grid view and have a dedicated Podium space.</li>
              <li className="flex gap-2 items-start 	 "><img src="./star-circle.svg" alt="" />Teachers don't get lost in the grid view and have a dedicated Podium space.</li>
              <li className="flex gap-2 items-start 	 "><img src="./star-circle.svg" alt="" />Teachers don't get lost in the grid view and have a dedicated Podium space.</li>
            </ul>
            <button type="button" className="text-lg	mt-4 bg-[--text-color] text-[--primary-color] hover:text-[--text-color] border-2 border-transparent hover:border-[--text-color] hover:bg-[--primary-color] p-2  rounded-md"><Link to="#">EXPLORE MORE</Link></button>
          </div>
          <div className="lg:grid lg:place-items-end md:grid md:place-items-end  sm:grid sm:w-full">
            <img src="./girl-image.svg" alt="" className="h-full lg:rounded-l-none lg:rounded-xl md:rounded-l-none md:rounded-xl sm:rounded-none sm:object-cover" />
          </div>
        </div>
      </div>
      </>
  )
}

export default Choose_Us;
