import { getProductById } from '@/services/allAPI'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function ProducePage() {
  const [count,setCount] = useState(0)
  const { id } = useParams()
  const [productData, setProductData] = useState({})
  console.log(productData);
  

  const pageSetup = async (productId) => {
    try {
      const result = await getProductById(productId)
      console.log(result);
      setProductData(result.data)
    } catch (error) {
      console.log(error);

    }

  }

  useEffect(() => {
    pageSetup(id)
  }, [])
  return (
    <>
      <section className='px-10 pt-20 w-full grid grid-cols-1 md:grid-cols-2 gap-10 bg-slate-50'>

        <img className='w-full' src={productData.image} alt="product" />

        <div className='flex flex-col items-start justify-start'>
          <span className='text-3xl font-bold'>{productData.title}</span>

          <span className='text-2xl text-slate-500 '>{productData.description}</span>

          { <span className='text-2xl text-slate-500 pt-10'>Weight: {productData.weight}</span>}

          <span className='text-3xl font-bold py-10'>₹{productData.price}</span>

          <div className='flex w-full gap-10 justify-between items-center bg-slate-100'>
            <button onClick={() => setCount(count<21 ? count+1 : count)} className='bg-slate-200 py-5 px-20 cursor-pointer'>+</button>
            <span>{count}</span>
            <button onClick={() => setCount(count>0 ? count-1 : count)} className='bg-slate-200 py-5 px-20 cursor-pointer'>-</button>
          </div>

          
          <button className='w-full rounded-3xl my-5 p-4 bg-slate-500 text-3xl font-bold text-white'>Add to cart</button>

          <button className='w-full rounded-3xl  p-4 bg-black text-3xl font-bold text-white'>Buy Now</button>
        </div>
      </section>

    </>
  )
}

export default ProducePage