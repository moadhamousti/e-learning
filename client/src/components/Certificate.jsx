import React from 'react'

function Certificate() {
  return (
    <div>
      
      {/* -------------------Certificate-------------------------- */}
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 place-items-center p-10  ">
        <div className="grid grid-cols-1 gap-1 w-4/5  ">
          <div className="flex flex-col gap-2 justify-center  sm:items-center lg:items-start  ">
            <h1 className="lg:text-6xl sm:text-3xl font-bold text-[--primary-color] ">Get Your Certificate</h1>
            <div className="flex gap-2 items-center w-full">
              <img src="./icon-certif1.svg" alt="" className="" />
              <p className="text-lg   text-[--primary-color] w-4/6">
                Teachers don't get lost in the grid view and have a dedicated Podium space.
              </p>
            </div>
            <div className="flex gap-2 items-center w-full">
              <img src="./icon-certif2.svg" alt="" className="" />
              <p className="text-lg   text-[--primary-color] w-4/6">
                TA's and presenters can be moved to the front of the class.
              </p>
            </div>
            <div className="flex gap-2 items-center w-full">
              <img src="./icon-certif3.svg" alt="" className="" />
              <p className="text-lg   text-[--primary-color] w-5/6">
                Teachers can easily see all students and class data at one time.
              </p>
            </div>
          </div>
        </div>
        <div className=" grid grid-cols-2 w-4/5  gap-4 bg-[--secondary-color]  rounded-xl p-8">
          <img src="./certaficate-front.svg" alt="certificate" className=" w-full h-full" />
          <img src="./certaficate-back.svg" alt="certificate" className="w-full h-full" />
        </div>
      </div>
    </div>
  )
}

export default Certificate
