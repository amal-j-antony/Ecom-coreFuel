import { Separator } from '@/components/ui/separator'
import { getAllProductsAPI, getOrdersByUserAPI, getRecommendedAPI } from '@/services/allAPI'
import { FaCartPlus } from "react-icons/fa";
import {
    SquareChartGantt
    , Menu
    , MessageCircleQuestionMark,
    Heart,
    Box,
    BookA,
    CircleUser,
    LogOut
} from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast, Bounce } from 'react-toastify';
import ProductRow from '@/components/ProductRow';




function UserProfile({ user, setUser, addtoCart }) {
    const navigate = useNavigate()
    const [reco, setReco] = useState([])
    const [orders, setOrders] = useState([])
    console.log(reco);

    const getRecommended = async () => {
        try {
            const result = await getRecommendedAPI()
            console.log(result);
            if (result.status == 200) {
                setReco(result.data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleLogout = () => {
        setUser({
            id: null,
            name: "",
            email: "",
            role: "",
        })
        localStorage.setItem("userLogin", JSON.stringify(user))
        toast.success('Logout Successful', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
        navigate("/")

    }

    const getOrders = async () => {
        const result = await getOrdersByUserAPI(user?.id)
        console.log(result);
        setOrders(result.data)
    }

    const getOrderDate = (date) => {
        const dateObj = new Date(date)
        return `${dateObj.getDate()}/${dateObj.getMonth()+ 1}/${dateObj.getFullYear()}`
    }

    useEffect(() => {
        getOrders()
    }, [user.id])

    useEffect(() => {
        getRecommended()
    }, [])
    return (
        <>
            <main className='bg-background pt-3 h-full w-full text-black flexMain'>
                <section className='grid grid-cols-5 gap-5 px-4 md:px-10 '>
                    <div className="pt-10 h-full bg-primary min-h-screen rounded-xl hidden md:flex flex-col item-center px-5 col-span-0 md:col-span-1 ">
                        <h1 className='font-bold text-xl flex gap-2 items-center'><Menu /><span className='hidden md:flex'>MENU</span></h1>
                        <Separator className='my-3' />
                        <ul className='text-xl flex flex-col gap-'>
                            <li className='flex items-center gap-2 cursor-pointer p-2 '><SquareChartGantt /><span className='hidden md:flex'>Overview</span></li>
                            <li className='flex items-center gap-2 cursor-pointer p-2 '><CircleUser /><span className='hidden md:flex'>Account</span></li>
                            <li className='flex items-center gap-2 cursor-pointer p-2 '><BookA /> <span className='hidden md:flex'>Orders</span></li>
                            <li className='flex items-center gap-2 cursor-pointer p-2 '><Box /> <span className='hidden md:flex'>Subscriptions</span></li>
                            <li className='flex items-center gap-2 cursor-pointer p-2 '><Heart /><span className='hidden md:flex'>Wishlist</span></li>
                            <li className='flex items-center gap-2 cursor-pointer p-2 '><MessageCircleQuestionMark /><span className='hidden md:flex'>Help and Support</span></li>
                            <li onClick={handleLogout} className='flex items-center gap-2 cursor-pointer p-2'><LogOut /><span className='hidden md:flex'>Log Out</span></li>
                        </ul>
                    </div>
                    <div className="px-4 md:px-10 py-10 flex flex-col gap-5 col-span-5 md:col-span-4 bg-primary h-full min-h-screen rounded-xl">
                        <div className="flex justify-center gap-2 md:hidden">
                            <SquareChartGantt />
                            <CircleUser />
                            <BookA /> 
                            <Box /> 
                            <Heart />
                            <MessageCircleQuestionMark />
                        </div>
                        <h1 className='text-2xl md:text-4xl font-bold'>Welcome ,{user.name}</h1>
                        <h2 className='text-lg md:text-xl'>You have 100 CORE points</h2>
                        <h2 className='text-xl md:text-3xl font-bold'>Recent Orders</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                            {
                                orders.map((item, index) => {
                                    return (
                                        <div className="flex flex-col gap-5 border border-[#34363F] p-5 rounded-3xl">
                                            <div className='flex justify-between items-stretch gap-5 flex-wrap'>
                                                <h1 className='text-2xl'><b>Order</b>: #{item.id}</h1>
                                                <span className='border border-green-500 text-green-500 px-5 rounded-2xl flex items-center' >shipped</span>
                                            </div>

                                            <h1 className='text-2xl flex justify-between flex-wrap'><b >User Id:</b> {item.user}</h1>
                                            <h1 className='text-2xl flex justify-between'><b >Amount:</b> ₹ {item.amount}</h1>
                                            <h1 className='text-2xl flex justify-between'><b >Products:</b>{item.data.length}</h1>
                                            <h1 className='text-2xl flex justify-between flex-wrap'><b >Order date:</b>{item.date ? <span>{getOrderDate(item.date)}</span> : <span>29/06/2026</span>}</h1>
                                            <div className='flex gap-3 bg-slate-200 rounded-3xl p-4 flex-nowrap overflow-x-auto scrollbar-none snap-x snap-mandatory snap-start'>
                                                {
                                                    item.data.map(product => (
                                                        <img src={product.image} className='h-20 shrink-0' alt="" />
                                                    ))
                                                }
                                            </div>
                                            <button className='bg-slate-400 text-background py-2 rounded-3xl cursor-pointer'>View Order</button>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <h2 className='text-3xl font-bold'>Recommended products</h2>
                        <h4 className="text-xl">Bases on previous purchases</h4>
                        <div className="flex bg-background p-5 rounded-3xl container flex-nowrap overflow-x-auto scrollbar-hide items-center gap-5 w-full ">
                            {reco.map((item, index) => (
                                <div className="flexCol shrink-0 border border-primary bg-primary rounded-2xl" key={item.id}>
                                    <div className="relative">
                                        <img src={item.image} className='h-50 md:h-100 rounded-2xl rounded-b-none cursor-pointer' alt="" onClick={() => Navigate(`/productPage/${item.id}`)} />
                                    </div>
                                    <div className="flex justify-center items-center w-full py-5 border border-primary border-t-accent text-xl font-bold">
                                        <span>{item.title}</span>
                                    </div>
                                    <div className="flex max-md:flex-wrap px-2 pb-5 justify-between items-center w-full">
                                        <span className='p-2 rounded-2xl bg-slate-400 text-white'>₹{item.price}</span>
                                        <span onClick={() => Navigate(`/productPage/${item.id}`)} className="hidden md:flex cursor-pointer py-2 px-4 bg-slate-400 text-white rounded-3xl">View Details </span>
                                        <button onClick={() => addtoCart(item.id)} className='flex items-center gap-5 py-2 px-4 rounded-2xl bg-green-400 text-black text-xl cursor-pointer'>Add to Cart <FaCartPlus /></button>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </section>
            </main>

        </>
    )
}

export default UserProfile