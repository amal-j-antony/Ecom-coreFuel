import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { FaShoppingBag } from "react-icons/fa";
import { IoIosCart } from "react-icons/io";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { getCartItemsAPI } from '@/services/allAPI';


function Cart() {
  const [products,setProducts] = useState([])
  console.log(products);
  
  const getItemsinCart = async () => {
    try {
      const result = await getCartItemsAPI()
      console.log(result);
      setProducts(result.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getItemsinCart()
  },[])
  return (
    <Drawer direction = "right" className="relative">
        <DrawerTrigger asChild>
            <IoIosCart className='text-2xl cursor-pointer' />   
            
        </DrawerTrigger>
        <DrawerContent className="flex flex-col items-center w-full py-10">
            <h1 className='text-3xl'>Cart</h1>
            {!products ? (<p>Your cart is empty!</p>)
              :
              products?.map((item,index) => (
                <div className="grid grid-cols-1 gap-5">
                  <div className='flex justify-start items-center gap-5'>
                    <h1 className='border py-3 px-4 bg-slate-100 rounded-full'>{index + 1}</h1>
                    <img src={item.image} className='h-30' alt="" />
                  </div>
                  <div className='flexCol gap-5'>
                    <h1>{item.title}</h1>
                    <h1>{item.price}</h1>
                  </div>
                </div>
              ))
              }
            
        </DrawerContent>
    </Drawer>
  )  
}

export default Cart