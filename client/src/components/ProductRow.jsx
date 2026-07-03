import React from 'react'
import { FaCartPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function ProductRow({ products, addtoCart ,imgH }) {
    const Navigate = useNavigate()
    return (
        <>
            {products.map((item, index) => (
                <div className="flexCol shrink-0 border border-primary bg-primary rounded-2xl" key={item.id}>
                    <div className="relative">
                        <img src={item.image}  className='h-50 md:h-100 rounded-2xl rounded-b-none cursor-pointer' alt="" onClick={() => Navigate(`/productPage/${item.id}`)} />
                    </div>
                    <div className="flex justify-center items-center w-full py-5 border border-primary border-t-accent text-xl font-bold">
                        <span>{item.title}</span>
                    </div>
                    <div className="flex max-md:flex-wrap px-2 pb-5 justify-between items-center w-full">
                        <span className='p-2 rounded-2xl bg-background text-white'>₹{item.price}</span>
                        <span onClick={() => Navigate(`/productPage/${item.id}`)} className="hidden md:flex cursor-pointer py-2 px-4 bg-background text-white rounded-3xl">View Details </span>
                        <button onClick={() => addtoCart(item.id)} className='flex items-center gap-5 py-2 px-4 rounded-2xl bg-accent text-black text-xl cursor-pointer'>Add to Cart <FaCartPlus /></button>
                    </div>
                </div>
            ))}

        </>
    )
}

export default ProductRow