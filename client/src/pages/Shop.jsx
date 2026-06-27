import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from 'embla-carousel-autoplay';
import { Link } from 'react-router-dom';


function Shop() {
  return (
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
  )
}

export default Shop