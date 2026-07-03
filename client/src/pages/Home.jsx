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

      <section className="w-full py-30 flex justify-center items-center flex-col gap-5 bg-background">
        <h1 className='text-4xl font-bold text-accent'>Fuel Every Rep. Power Every Goal.</h1>
        <h3 className='text-xl w-[30%] text-center'>Premium protein, creatine, pre-workout, protein bars, and recovery essentials. Everything you need to train harder, recover faster, and hit your next PR</h3>
        <button onClick={()=> Navigate("/all")} className="text-background text-xl font-bold bg-accent p-5 rounded-xl cursor-pointer">Shop Now</button>
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
            <img src="https://res.cloudinary.com/dwaaoyztz/image/upload/v1782669530/grass_tnegtf.png" alt="" className="h-50" />
            Grass-fed whey sourced from Irish dairy farms.
          </div>
          <div className="h-100 p-5 flexMain font-bold text-secondary bg-primary text-5xl text-center">
            <img src="https://res.cloudinary.com/dwaaoyztz/image/upload/v1782669529/no-gmo_asv5zl.png" className="h-50" alt="" />
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

        <div className="flex flex-nowrap items-center gap-5 w-[90%] overflow-x-auto scrollbar-none">
         <ProductRow products={recommended} addtoCart={addtoCart} />
        </div>
      </section>

      {/* testimonials */}

      <section className="flexCol w-full my-10">
        <h1 className="w-[90%] text-3xl mb-10 font-bold">What our customers say</h1>
        <div className="flex flex-nowrap items-stretch gap-10 w-[90%] overflow-x-auto scrollbar-none">

          {
            testimonials.map((item, index) => (
              <div className="flex gap-5 p-5 bg-primary rounded-3xl shrink-0 ">
                <div>
                  <img className="rounded-full" src={`https://picsum.photos/id/${index + 100}/150`} ></img>
                </div>

                <div className=" flex flex-col gap-5 w-70">

                  <h1 className="text-2xl font-bold"> {item.name}</h1>
                  <Stars value={item.rating}/>
                  <p>{item.review}</p>
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