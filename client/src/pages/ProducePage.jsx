import Stars from '@/components/Stars'
import { addProductToCartAPI, editCartItemQTYapi, getProductById, getTestimonialsAPI } from '@/services/allAPI'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


function ProducePage({ getCartProducts, products, user }) {
  const [testimonials, setTestimonials] = useState([])
  const [active, setActive] = useState(0)
  const [count, setCount] = useState(0)
  const { id } = useParams()
  const [productData, setProductData] = useState({})
  console.log(productData);
  console.log(testimonials);
  
  const navigate = useNavigate()

  const addTocart = async () => {
    if (!user.id) {
      navigate("/login")
      return
    }

    await getCartProducts()

    const result = products.find(item => item.pID == id)
    console.log(result);


    if (result) {
      const editResult = await editCartItemQTYapi(result.id, {
        qty: result.qty + count
      })
      console.log(editResult);
      getCartProducts()
    }
    else {

      const addResult = await addProductToCartAPI({
        userId: user.id,
        pID: productData.id,
        qty: count
      })
      console.log(addResult);
      getCartProducts()
    }
  }



  const pageSetup = async (productId) => {
    try {
      const result = await getProductById(productId)
      console.log(result);
      setProductData(result.data)
    } catch (error) {
      console.log(error);

    }

  }

  const getTestimonials = async () => {
    const result = await getTestimonialsAPI()
    console.log(result);
    setTestimonials(result.data)

  }

  useEffect(() => {
    pageSetup(id)
    getTestimonials()
  }, [])
  return (
    <>
      <section className='px-10 pt-20 w-full grid grid-cols-1 md:grid-cols-2 gap-10 bg-backgound'>

        <div className='bg-primary rounded-3xl'>
          <img className='w-full' src={productData.image} alt="product" />
        </div>

        <div className='flex flex-col items-start justify-start'>
          <span className='text-3xl font-bold'>{productData.title}</span>

          <span className='text-2xl text-slate-500 '>{productData.description}</span>

          {<span className='text-2xl text-slate-500 pt-10'>Weight: {productData.weight}</span>}

          <span className='text-3xl font-bold py-10'>₹{productData.price}</span>

          <span className='pb-10 text-2xl flex items-center'>Set Quantity: {count}</span>

          <div className='flex w-full gap-10 justify-start items-center bg-background'>
            {/* <button onClick={() => setCount(count < 21 ? count + 1 : count)} className='bg-slate-200 py-5 px-20 cursor-pointer'>+</button>
            <span>{count}</span>
            <button onClick={() => setCount(count > 0 ? count - 1 : count)} className='bg-slate-200 py-5 px-20 cursor-pointer'>-</button> */}

            <span onClick={() => {
              setCount(count == 1 ? 0 : 1)
              setProductData({ ...productData, qty: 1 })
            }
            } className={count == 1 ? "border-accent border bg-primary px-5 py-3 cursor-pointer" : 'bg-primary px-5 py-3 cursor-pointer'}>1</span>
            <span onClick={() => {
              setCount(count == 2 ? 0 : 2)
              setProductData({ ...productData, qty: 2 })
            }
            } className={count == 2 ? "border-accent border bg-primary px-5 py-3 cursor-pointer" : 'bg-primary px-5 py-3 cursor-pointer'}>2</span>
            <span onClick={() => {
              setCount(count == 3 ? 0 : 3)
              setProductData({ ...productData, qty: 3 })
            }} className={count == 3 ? "border-accent border bg-primary px-5 py-3 cursor-pointer" : 'bg-primary px-5 py-3 cursor-pointer'}>3</span>
            <span onClick={() => {
              setCount(count == 5 ? 0 : 5)
              setProductData({ ...productData, qty: 5 })
            }} className={count == 5 ? "border-accent border bg-primary px-5 py-3 cursor-pointer" : 'bg-primary px-5 py-3 cursor-pointer'}>5</span>
            <input type="text" placeholder='custom' className='placeholder:text-white bg-primary p-3 w-20' />
          </div>


          <button onClick={addTocart} className='w-full rounded-3xl my-5 p-4 bg-accent text-3xl font-bold text-black'>Add to cart</button>

          <button className='w-full rounded-3xl  p-4 bg-black text-3xl font-bold text-white'>Buy Now</button>

          <h1 className="text-3xl font-bold my-5">Reviews</h1>

          <div className='grid grid-cols-2 gap-5 items-stretch'>
            {
              testimonials.slice(0,6).map((item, index) => 
                (
                  <div className="flex gap-5 p-5 bg-primary rounded-3xl shrink-0 ">
                    <div>
                      <img className="rounded-full" src={`https://picsum.photos/id/${index + 100}/150`} ></img>
                    </div>

                    <div className=" flex flex-col gap-5 w-70">

                      <h1 className="text-2xl font-bold"> {item.name}</h1>
                      <Stars value={item.rating} />
                      <p>{item.review}</p>
                    </div>

                  </div>
                )
              )
            }
          </div>
        </div>
      </section >

    </>
  )
}

export default ProducePage