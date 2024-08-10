import React from 'react'

function Features() {
  return (
    <div >
      {/* -------------------Features-------------------------- */}
      <div className="  grid grid-cols-1 gap-10 md:grid-cols-2  lg:grid-cols-3   px-20 my-20 " id="Features">
        {/* card 1 */}
        <div className="flex flex-col gap-5 justify-center items-start rounded-xl  bg-[--secondary-color] p-10 shadow-2xl " >
          <img src="./num1.svg" alt="card1" className="w-16 h-20" />
          <div className=" flex flex-col gap-5">
            <h3 className="text-xl font-bold text-[--primary-color]">Lifetime access</h3>
            <hr className="h-[4px] w-[50px] rounded-xl  bg-[--button-color] " />
            <p className="text-lg   text-[--primary-color] w-4/6">
              The gradual accumulation of information about atomic and small-scale behaviour...
            </p>
          </div>
        </div>
        {/*----------------card 2-------------------*/}
        <div className="flex flex-col gap-5 justify-center items-start rounded-xl  bg-[--secondary-color] p-10 shadow-2xl">
          <img src="./num2.svg" alt="card1" className="w-16 h-20" />
          <div className=" flex flex-col gap-5">
            <h3 className="text-xl font-bold text-[--primary-color]">Ltraining Courses</h3>
            <hr className="h-[4px] w-[50px] rounded-xl  bg-[--button-color] " />
            <p className="text-lg   text-[--primary-color] w-4/6">
              The gradual accumulation of information about atomic and small-scale behaviour...
            </p>
          </div>
        </div>
        {/*-------------------card 3----------------------*/}
        <div className="flex flex-col gap-5 justify-center items-start rounded-xl md:grid md:w-11/12 md:ml-3 lg:col-auto md:col-span-3  bg-[--secondary-color] p-10 shadow-2xl">
          <img src="./num3.svg" alt="card1" className="w-16 h-20" />
          <div className=" flex flex-col gap-5">
            <h3 className="text-xl font-bold text-[--primary-color]">Books Liberary</h3>
            <hr className="h-[4px] w-[50px] rounded-xl  bg-[--button-color] " />
            <p className="text-lg   text-[--primary-color] w-4/6">
              The gradual accumulation of information about atomic and small-scale behaviour...
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Features
