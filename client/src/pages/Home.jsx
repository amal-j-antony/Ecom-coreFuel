// import LoadingCarousel from '@/components/ui/loading-carousel'
import { IoIosArrowForward } from "react-icons/io";
import React, { useEffect, useState } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Link, useNavigate } from 'react-router-dom'
import { FaCartPlus } from "react-icons/fa";
import { HashLink } from 'react-router-hash-link'
import { addProductToCartAPI, getCartItemByIdAPI, getProductsInGroup, getRecommendedAPI, updateExistingProductinCartAPI } from '@/services/allAPI';

function Home({ user, setCartUpdate, cartUpdate, addtoCart }) {

  const [recommended, setRecommended] = useState([])

  const getRecommended = async () => {
    const result = await getRecommendedAPI()
    console.log(result);
    setRecommended(result.data)
  }

  useEffect(() => {
    getRecommended()
  }, [])


  return (
    <>
      {/* Hero text*/}

      <section className="w-full py-30 flex justify-center items-center flex-col gap-5 bg-background">
        <h1 className='text-4xl font-bold text-accent'>Fuel Every Rep. Power Every Goal.</h1>
        <h3 className='text-xl w-[30%] text-center'>Premium protein, creatine, pre-workout, protein bars, and recovery essentials. Everything you need to train harder, recover faster, and hit your next PR</h3>
        <button className="text-background text-xl font-bold bg-accent p-5 rounded-xl cursor-pointer">Shop Now</button>
      </section>


      {/* hero carousel */}
      <main className='flexCol items-center max-h-screen relative bg-background'>
        <img src="https://res.cloudinary.com/dwaaoyztz/image/upload/v1782669532/gymEmpty_vm9web.jpg" className='max-h-screen w-[90%] object-cover rounded-3xl' alt="" />

        <div className="absolute grid grid-cols-3 gap-5 px-10 items-center w-[90%] h-full rounded-3xl top-0 bg-[rgb(0,0,0,0.6)]">
          <h1 className="col-span-3 text-5xl font-bold text-white text-center">Trusted by 2500+ fitness enthusiasts</h1>
          <div className='flex px-10'>
            <img src="https://res.cloudinary.com/dwaaoyztz/image/upload/v1782669531/protein-powder-hero_ydvirv.png" className='h-110' alt="" />
          </div>
          <div className="">
            <div className='flex flex-col items-center group relative'>
              <img src="https://res.cloudinary.com/dwaaoyztz/image/upload/v1782669538/protbars4_u1golv.png" className='h-[50%]' alt="" />
            </div>
          </div>
          <img src="https://res.cloudinary.com/dwaaoyztz/image/upload/v1782669534/creatine-gemini1-Photoroom_btwamu.png" className='h-[70%]' alt="" />


          <div className="flexMain gap-3  mx-5 py-5 rounded-3xl group hover:bg-secondary transition duration-1000 cursor-pointer">
            <h2 className='text-secondary text-center text-3xl font-bold group-hover:text-primary'>Protein powder</h2>
            <IoIosArrowForward className="text-secondary text-3xl font-bold group-hover:text-primary" />
          </div>
          <div className="flexMain gap-3  mx-5 py-5 rounded-3xl group hover:bg-secondary transition duration-1000 cursor-pointer">
            <h2 className='text-secondary text-center text-3xl font-bold group-hover:text-primary'>Protein Bar</h2>
            <IoIosArrowForward className="text-secondary text-3xl font-bold group-hover:text-primary" />
          </div>
          <div className="flexMain gap-3  mx-5 py-5 rounded-3xl group hover:bg-secondary transition duration-1000 cursor-pointer">
            <h2 className='text-secondary text-center text-3xl font-bold group-hover:text-primary'>Creatine</h2>
            <IoIosArrowForward className="text-secondary text-3xl font-bold group-hover:text-primary" />
          </div>
        </div>
      </main>

      {/* why corefuel */}
      <h1 className="text-center text-4xl font-bold my-30" >Why 2500+ fitness enthusiasts trust corefuel</h1>
      <main className="flexMain my-10">
        <section className="w-[90%] grid grid-cols-3 gap-10">
          <div className="row-span-2 col-span-2 bg-accent text-black h-200 p-10 flexCol gap-10 text-5xl">
            <span className="text-8xl font-bold">Recommended</span> by Mr. Universe finalist <span className="text-9xl font-bold">John Smith</span>
          </div>
          <div className="h-full row-span-2 p-5 flexCol bg-secondary text-background text-5xl text-center">
            <img src="/grass.png" alt="" className="h-50" />
            Grass-fed whey sourced from Irish dairy farms.
          </div>
          <div className="h-100 p-5 flexMain font-bold text-secondary bg-primary text-5xl text-center">
            <img src="/no-gmo.png" className="h-50" alt="" />
            Non-GMO and gluten free
          </div>
          <div className="h-100 p-5 flexCol text-5xl text-black font-bold col-span-2 bg-accent w-full">
            <span>No sugar variants available</span>

            <span>Trusted since 2020</span>
            <span>No artificial fillers</span>
          </div>
        </section>
      </main>

      {/* recommended  */}
      <section className='py-10 flexCol w-full'>
        <div className='flex justify-start w-[90%]'>
          <h1 className=' font-bold text-4xl pb-10'>Recommended for you</h1>
        </div>

        <div className="flex flex-wrap items-center gap-5 w-[90%] ">
          {recommended.map((item, index) => (
            <div className="flexCol shrink-0 border border-primary bg-primary rounded-2xl" key={item.id}>
              <div className="relative">
                <img src={item.image} className='h-100 rounded-2xl rounded-b-none cursor-pointer' alt="" onClick={() => Navigate(`/productPage/${item.id}`)} />
              </div>
              <div className="flex justify-center items-center w-full py-5 border border-primary border-t-accent text-xl font-bold">
                <span>{item.title}</span>
              </div>
              <div className="flex px-2 pb-5 justify-between items-center w-full">
                <span className='p-2 rounded-2xl bg-background text-white'>₹{item.price}</span>
                <span onClick={() => Navigate(`/productPage/${item.id}`)} className="cursor-pointer py-2 px-4 bg-background text-white rounded-3xl">View Details </span>
                <button onClick={() => addtoCart(item.id)} className='flex items-center gap-5 py-2 px-4 rounded-2xl bg-accent text-black text-xl cursor-pointer'>Add to Cart <FaCartPlus /></button>
              </div>
            </div>
          ))}
        </div>
      </section>




      {/* about section */}
      {/* <section className=' flexCol w-full'>
        <div className=' flexCol relative'>
          <img className='rounded-3xl' src="/ropeWorkout.jpg" alt="" />
          <div className="w-full absolute h-full flexCol">
            <h1 className='text-white text-4xl black-ops-one-regular'>Every rep. Every workout. Every goal. We're with you.</h1>
          </div>
        </div>
      </section> */}
    </>
  )
}

export default Home