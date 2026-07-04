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
import { addProductToCartAPI, getCartItemByIdAPI, getProductsInGroup, getRecommendedAPI, getTestimonialsAPI, updateExistingProductinCartAPI } from '@/services/allAPI';
import Stars from "@/components/Stars";
import ProductRow from "@/components/ProductRow";

function Home({ user, setCartUpdate, cartUpdate, addtoCart }) {

  const [recommended, setRecommended] = useState([])
  const [testimonials, setTestimonials] = useState([])

  const getRecommended = async () => {
    const result = await getRecommendedAPI()
    console.log(result);
    setRecommended(result.data)
  }

  const getTestimonials = async () => {
    const result = await getTestimonialsAPI()
    console.log(result);
    setTestimonials(result.data)

  }

  const Navigate = useNavigate()

  useEffect(() => {
    getRecommended()
    getTestimonials()
  }, [])


  return (
    <>
      {/* Hero text*/}

      <section className="w-full px-10 py-30 flex justify-center items-center flex-col gap-5 bg-background">
        <h1 className='flex flex-wrap text-2xl text-center md:text-4xl font-bold text-accent'>Fuel Every Rep. Power Every Goal.</h1>
        <h3 className='text-xl md:w-[30%] text-center flex flex-wrap text-accent'>Premium protein, creatine, pre-workout, protein bars, and recovery essentials. Everything you need to train harder, recover faster, and hit your next PR</h3>
        <button onClick={() => Navigate("/all")} className="text-background text-xl font-bold bg-accent p-5 rounded-xl cursor-pointer">Shop Now</button>
      </section>


      {/* hero carousel */}
      <main className='w-full flexCol items-center max-h-screen relative bg-background'>
        <img src="https://res.cloudinary.com/dwaaoyztz/image/upload/v1782669532/gymEmpty_vm9web.jpg" className='min-h-screen w-[90%] object-cover rounded-3xl' alt="" />

        <div className="overflow-y-auto scrollbar-none absolute grid md:grid-cols-3 gap-5 p-10 items-center w-[90%] h-full rounded-3xl top-0 bg-[rgb(0,0,0,0.5)]">
          <h1 className="md:col-span-3 text-2xl md:text-5xl font-bold text-white text-center">Trusted by 2500+ fitness enthusiasts</h1>
          <div className='flex flex-col justify-end px-10 h-full gap-5'>
            <img src="https://res.cloudinary.com/dwaaoyztz/image/upload/v1782669531/protein-powder-hero_ydvirv.png" className='h-[60%]' alt="" />
            <div className="flexMain gap-3  mx-5 py-5 rounded-3xl group hover:bg-secondary transition duration-1000 cursor-pointer">
              <h2 className='text-primary text-center text-xl md:text-3xl font-bold group-hover:text-primary'>Protein powder</h2>
              <IoIosArrowForward className="text-secondary text-3xl font-bold group-hover:text-primary" />
            </div>
          </div>
          <div className='flex flex-col justify-end group relative h-full gap-5'>
            <img src="https://res.cloudinary.com/dwaaoyztz/image/upload/v1782669538/protbars4_u1golv.png" className='h-[70%]' alt="" />
            <div className="flexMain gap-3  mx-5 py-5 rounded-3xl group hover:bg-secondary transition duration-1000 cursor-pointer">
              <h2 className='text-primary text-center text-xl md:text-3xl font-bold group-hover:text-primary'>Protein Bar</h2>
              <IoIosArrowForward className="text-secondary text-3xl font-bold group-hover:text-primary" />
            </div>
          </div>
          <div className="flex flex-col justify-end h-full gap-5">
            <img src="https://res.cloudinary.com/dwaaoyztz/image/upload/v1782669534/creatine-gemini1-Photoroom_btwamu.png" className='h-[60%]' alt="" />
            <div className="flexMain gap-3  mx-5 py-5 rounded-3xl group hover:bg-secondary transition duration-1000 cursor-pointer">
              <h2 className='text-primary text-center text-xl md:text-3xl font-bold group-hover:text-primary'>Creatine</h2>
              <IoIosArrowForward className="text-secondary text-3xl font-bold group-hover:text-primary" />
            </div>
          </div>





        </div>
      </main>

      {/* why corefuel */}
      <h1 className="px-10 text-center text-4xl font-bold my-30 text-secondary" >Why 2500+ fitness enthusiasts trust corefuel</h1>
      <main className="flexMain my-10 w-full">
        <section className="w-[90%] grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-10">
          <div className=" md:row-span-2 md:col-span-2 bg-zinc-300 text-black md:h-full p-10 flexCol gap-5 md:gap-10 text-lg md:text-5xl">
            <span className="text-xl md:text-8xl font-bold">Recommended</span> by Mr. Universe finalist <span className="text-xl md:text-9xl font-bold">John Smith</span>
          </div>
          <div className=" md:h-full   md:row-span-1 p-5 flexCol bg-zinc-400 text-background text-sm md:text-5xl text-center">
            <img src="https://res.cloudinary.com/dwaaoyztz/image/upload/v1782669530/grass_tnegtf.png" alt="" className="h-10 md:h-50" />
            Grass-fed whey sourced from Irish dairy farms.
          </div>
          <div className=" md:h-100 p-5 flexCol font-bold text-secondary bg-zinc-400 text-lg md:text-5xl text-center">
            <img src="https://res.cloudinary.com/dwaaoyztz/image/upload/v1782669529/no-gmo_asv5zl.png" className="h-10 md:h-50" alt="" />
            Non-GMO and gluten free
          </div>
          <div className=" md:h-100 p-5 flexCol text-lg md:text-5xl text-black font-bold md:col-span-3 bg-zinc-300 w-full">
            <span>No sugar variants available</span>

            <span>Trusted since 2020</span>
            <span>No artificial fillers</span>
          </div>
        </section>
      </main>

      {/* recommended  */}
      <section className='py-10 flexCol w-full'>
        <div className='flex justify-start w-[90%]'>
          <h1 className=' font-bold text-4xl pb-10 text-secondary'>Recommended for you</h1>
        </div>

        <div className="flex flex-nowrap items-center gap-5 w-[90%] overflow-x-auto scrollbar-none">
          <ProductRow products={recommended} addtoCart={addtoCart} />
        </div>
      </section>

      {/* testimonials */}

      <section className="flexCol w-full my-10">
        <h1 className="w-[90%] text-3xl mb-10 font-bold text-secondary">What our customers say</h1>
        <div className="flex flex-nowrap items-stretch gap-10 w-[90%] overflow-x-auto scrollbar-none">

          {
            testimonials.map((item, index) => (
              <div className="flex gap-5 p-5 bg-primary rounded-3xl shrink-0 ">
                <div>
                  <img className="rounded-full max-md:h-20" src={`https://picsum.photos/id/${index + 100}/150`} ></img>
                </div>

                <div className=" flex flex-col gap-5 w-35 md:w-70">

                  <h1 className="text-2xl font-bold text-zinc-900"> {item.name}</h1>
                  <Stars value={item.rating} />
                  <p className="text-zinc-700">{item.review}</p>
                </div>

              </div>

            ))
          }
        </div>
      </section>




    </>
  )
}

export default Home