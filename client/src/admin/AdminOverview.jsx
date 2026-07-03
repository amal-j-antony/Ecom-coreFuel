import { getAllOrdersAPI } from '@/services/allAPI'
import React, { useEffect, useState } from 'react'


function AdminOverview({user}) {
  const [orders, setOrders] = useState([])
  const getOrders = async () => {
        const result = await getAllOrdersAPI()
        console.log(result);
        setOrders(result.data)
    }

  

    useEffect(() => {
        getOrders()
    }, [user.id])
  return (
    <div className="px-10 py-10 flex flex-col gap-5 col-span-4 bg-primary  min-h-screen rounded-xl">
      <h1 className='text-4xl font-bold'>Welcome ,{user.name}</h1>
      {/* <h2 className='text-3xl font-bold'>Sales summary</h2> */}
      <div className="flexCol">
        <div className="">

        </div>
      </div>
      <h2 className='text-3xl font-bold'>Recent orders</h2>
      <div className="grid grid-cols-3 gap-5">
        {
          orders.map((item, index) => {
            return (
              <div className="flex flex-col gap-5 border border-[#34363F] p-5 rounded-3xl">
                <div className='flex justify-between items-stretch gap-5'>
                  <h1 className='text-2xl'><b>Order</b>: #{item.id}</h1>
                  <span className='border border-green-500 text-green-500 px-5 rounded-2xl flex items-center' >shipped</span>
                </div>

                <h1 className='text-2xl flex justify-between'><b >User Id:</b> {item.user}</h1>
                <h1 className='text-2xl flex justify-between'><b >Amount:</b> ₹ {item.amount}</h1>
                <h1 className='text-2xl flex justify-between'><b >Products:</b>{item.data.length}</h1>
                <h1 className='text-2xl flex justify-between'><b >Order date:</b>29/06/2026</h1>
                <div className='flex gap-3 bg-[#1E1F26] rounded-3xl p-4 flex-nowrap overflow-x-auto scrollbar-none'>
                  {
                    item.data.map(product => (
                      <img src={product.image} className='h-20 shrink-0' alt="" />
                    ))
                  }
                </div>
                <button className=''>View Order</button>
              </div>
            )
          })
        }
      </div>


      {/* <h2 className='text-2xl'>Last 5 Orders</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Product name</th>
                                    <th>Quantity</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                        </table>
                        <h1 className='text-center text-xl py-6'>No orders to show</h1> */}
        <div className=""></div>
    </div>
  )
}

export default AdminOverview