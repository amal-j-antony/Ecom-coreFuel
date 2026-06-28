import React, { useEffect, useState } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from 'embla-carousel-autoplay';
import { Link, useNavigate } from 'react-router-dom';
import { addProductToCartAPI, getCartItemByIdAPI, getProductsInGroup, updateExistingProductinCartAPI } from '@/services/allAPI';
import { FaCartPlus } from "react-icons/fa";

function Shop() {

  const [proteinBar, setProteinBar] = useState([])
  const [proteinPowder, setProteinPowder] = useState([])


  const getProteinBars = async () => {
    const result = await getProductsInGroup("protein-bar")
    console.log(result);
    console.log(result.data);
    setProteinBar(result.data)
  }

  const getProteinPowder = async () => {
    const result = await getProductsInGroup("protein-powder")
    console.log(result);
    console.log(result.data);
    setProteinPowder(result.data)
    
  }
  console.log(proteinBar);
  console.log(proteinPowder);


  const Navigate = useNavigate()

  useEffect(() => {
    getProteinBars()
    getProteinPowder()
  }, [])
  

  return (

    <>
      <section className='flexCol'>
        <Carousel className="w-full h-screen"
          plugins={[
            Autoplay({ delay: 4000 })
          ]}>


          <CarouselContent className="h-screen">

            {/* <CarouselItem className="relative">
                <img src="/about-img.jpg" className='object-cover object-center' alt="" />
                <div className="w-full absolute top-0 h-full flexCol z-2">
                  <h1 className='text-white text-8xl black-ops-one-regular'>Supercharge your workouts</h1>
                </div>
              </CarouselItem> */}

            <CarouselItem className="relative">
              <img src="/hero-2.png" className='w-full h-screen' alt="" />
              {/* carousel text */}
              <div className="absolute w-1/2 h-full top-0 left-0 flex flex-col justify-center items-center">
                <h1 className='text-4xl lg:text-8xl font-bold '>New flavor</h1>
                <h1 className='text-4xl lg:text-8xl font-bold '>Out Now</h1>
                <Link className='p-2
                  mt-6 border border-black bg-[#457B9D] text-3xl lg:text-5xl font-semibold text-white bttn'>Check it out</Link>
              </div>
            </CarouselItem>

            <CarouselItem className='relative'>
              <img src="/monthlyHeroSec.png" className='w-full h-screen' alt="" />
              {/* carousel text */}
              <div className="absolute w-1/2 h-full top-0 right-0 flex flex-col justify-center items-center">
                <h1 className='text-4xl lg:text-6xl font-bold '>Protein essentials delivered</h1>
                <h1 className='text-4xl lg:text-6xl font-bold '>To your doorstep</h1>
                <h1 className='text-4xl lg:text-6xl font-bold '>Monthly</h1>
                <Link className='p-2
                  mt-6 border border-black bg-[#457B9D] text-3xl lg:text-5xl font-semibold text-white bttn'>Check it out</Link>
              </div>
            </CarouselItem>



          </CarouselContent>
        </Carousel>
      </section>

      <section className='grid grid-cols-6'>
        <div className="col-span-1 w-full flex flex-col items-center  ">
          <h1 className="py-10 text-4xl font-bold">Filters</h1>
          <div className="bg-primary rounded-3xl w-full sticky top-40 min-h-200 ms-20 flex flex-col items-center py-10">
            coming soon
          </div>
        </div>


        <div className='col-span-5'>
          {/* products row 2  */}
          <section className='py-10 flexCol w-full'>
            <div className='flex justify-start w-[90%]'>
              <h1 className=' font-bold text-4xl pb-10'>Start your day with a scoopful of protein </h1>
            </div>
    
            <div className="flex flex-wrap scrollbar-hide items-center gap-5 w-[90%] ">
              {proteinPowder.map((item, index) => (
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
    
    
    
          {/* products row 1 */}
          <section className=' py-10 w-full flexCol justify-center items-center bg-background'>
    
            <div className="flex flex-wrap w-[90%] scrollbar-hide items-center gap-9  ">
              {proteinBar?.map((item, index) => {
                return (
                  <div className="border border-primary flexCol shrink-0 rounded-2xl bg-primary" id={item.id} key={item.id}>
                    <img src={item.image} className='h-100 rounded-2xl rounded-b-none cursor-pointer' alt="" onClick={() => Navigate(`/productPage/${item.id}`)} />
                    <div className="flex justify-center items-center w-full py-5 border border-primary border-t-accent font-bold text-xl">
                      <span>{item.title}</span>
                    </div>
                    <div className="flex px-4 pb-5 justify-between items-center w-full">
                      <span className='py-2 px-4 rounded-2xl bg-background text-white'>₹{item.price}</span>
                      <span onClick={() => Navigate(`/productPage/${item.id}`)} className="cursor-pointer py-2 px-4 bg-background text-white rounded-3xl">View Details </span>
                      <button onClick={() => addtoCart(item.id)} className='flex items-center gap-2 py-2 px-4 rounded-2xl bg-accent text-black text-xl cursor-pointer'>Add to Cart <FaCartPlus /></button>
                    </div>
                  </div>
                )
              }
              )}
            </div>
          </section>
        </div>
      </section>
    </>
  )
}

export default Shop