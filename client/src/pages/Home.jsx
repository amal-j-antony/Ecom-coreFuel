// import LoadingCarousel from '@/components/ui/loading-carousel'
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
import { addProductToCartAPI, getCartItemByIdAPI, getProductsInGroup, updateExistingProductinCartAPI } from '@/services/allAPI';
import Autoplay from 'embla-carousel-autoplay';

function Home({ user, setCartUpdate, cartUpdate }) {
  const [proteinBar, setProteinBar] = useState([])
  const [proteinPowder, setProteinPowder] = useState([])
  const [ender, setEnder] = useState({
    proteinBar: "",
    proteinPowder: "",
  })

  const addtoCart = async (productID) => {
    let cartItem
    const getItem = await getCartItemByIdAPI(productID, user.id)
    console.log(getItem);

    if (getItem.data.length != 0) {
      cartItem = getItem.data[0]
      cartItem.qty += 1
      try {
        const result = await updateExistingProductinCartAPI(cartItem, cartItem.id)
        console.log(result);


      } catch (error) {
        console.log(error);

      }
    } else {
      cartItem = {
        userId: user.id,
        pID: productID,
        qty: 1
      }
      try {
        const result = await addProductToCartAPI(cartItem)
        console.log(result);
        setCartUpdate(cartUpdate + 1)

      } catch (error) {
        console.log(error);

      }
    }


  }

  const getProteinBars = async () => {
    const result = await getProductsInGroup("protein-bar")
    console.log(result);
    console.log(result.data);
    setProteinBar(result.data)
    const lastProteinBar = result?.data[result.data.length - 1]?.id
    console.log(lastProteinBar);
    setEnder({ ...ender, proteinBar: lastProteinBar })
  }

  const getProteinPowder = async () => {
    const result = await getProductsInGroup("protein-powder")
    console.log(result);
    console.log(result.data);
    setProteinPowder(result.data)
    const lastProteinPowder = result?.data[result.data.length - 1]?.id
    console.log(lastProteinPowder);
    setEnder({ ...ender, proteinPowder: lastProteinPowder })
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
      {/* hero carousel */}
      <main className='flexCol w-full max-h-screen border relative'>
        <img src="/gymEmpty.jpg" className='max-h-screen w-full object-cover' alt="" />
        <div className="absolute grid grid-cols-2 w-full h-full top-0 bg-[rgb(0,0,0,0.5)]">
          <div className='flexMain px-10'>
            <span className='text-white text-7xl font-bold'>Become the best version of yourself</span>
          </div>

        </div>
      </main>

      {/* categories */}
      <section className='px-10 w-full flexCol'>
        <div className="flex container justify-center items-center">
          <h1>Categories</h1>
        </div>
        <div className="flex container flex-nowrap overflow-x-auto">
          category
        </div>
      </section>

      {/* products row 1 */}
      <section className='px-10 py-10 w-full flexCol bg-slate-5'>
        <div className='flex container justify-between items-center w-full'>
          <h1 className=' font-bold text-4xl pb-10'>Protein cravings? We got you! </h1>
          <HashLink smooth to={`#${ender.proteinBar}`} className='py-3 px-5 rounded-full bg-[#457B9D]'>
            N
          </HashLink>
        </div>

        <div className="flex container flex-nowrap overflow-x-auto scrollbar-hide items-center gap-5 w-full ">
          {proteinBar?.map((item, index) => {
            return (
              <div className="border border-slate-300 flexCol shrink-0 p-5  rounded-2xl" id={item.id} key={item.id}>
                <img src={item.image} className='h-100 rounded-2xl cursor-pointer' alt="" onClick={() => Navigate(`/productPage/${item.id}`)} />
                <div className="flex justify-between items-center w-full py-5">
                  <span className='p-2 border rounded-2xl bg-[#457B9D] text-white'>₹{item.price}</span>
                  <span>{item.title}</span>
                  <button onClick={() => addtoCart(item.id)} className='p-2 border rounded-2xl bg-[#457B9D] text-white text-xl cursor-pointer'><FaCartPlus /></button>
                </div>
              </div>
            )
          }
          )}
        </div>
      </section>


      {/* products row 2  */}
      <section className=' px-10 py-10 flexCol w-full'>
        <div className='flex container justify-start w-full'>
          <h1 className=' font-bold text-4xl pb-10'>Start your day with a scoopful of protein </h1>
        </div>

        <div className="flex container flex-nowrap overflow-x-auto scrollbar-hide items-center gap-5 w-full ">
          {proteinPowder.map((item, index) => (
            <div className="flexCol shrink-0 p-5 border rounded-2xl" key={item.id}>
              <img src={item.image} className='h-100 rounded-2xl cursor-pointer' alt="" onClick={() => Navigate(`/productPage/${item.id}`)} />
              <div className="flex justify-between items-center w-full py-5">
                <span className='p-2 border rounded-2xl bg-[#457B9D] text-white'>₹{item.price}</span>
                <span>{item.title}</span>
                <button onClick={() => addtoCart(item.id)} className='p-2 border rounded-2xl bg-[#457B9D] text-white text-xl'><FaCartPlus /></button>
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