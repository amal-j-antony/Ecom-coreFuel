import { Separator } from '@/components/ui/separator'
import { getAllProductsAPI } from '@/services/allAPI'
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
import { toast ,Bounce } from 'react-toastify';

function AdminDashboard({user, setUser}) {
    const navigate = useNavigate()
    const handleLogout = () => {
            setUser({
                id: null,
                name: "",
                email: "",
                role: "",
            })
            localStorage.setItem("userLogin",JSON.stringify(user))
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
    return (
        <>
            <main className='bg-slate-200 pt-3 h-screen w-full'>
                <section className='grid grid-cols-5 gap-5'>
                    <div className="pt-10 h-full bg-slate-50 min-h-screen border border-slate-50 rounded-xl flex flex-col item-center px-5">
                        <h1 className='font-bold text-xl flex gap-2 items-center'><Menu /><span className='hidden md:flex'>MENU</span></h1>
                        <Separator className='my-3' />
                        <ul className='text-xl flex flex-col gap-'>
                            <li className='flex items-center gap-2 cursor-pointer p-2 border border-slate-50 hover:border-b-slate-300'><SquareChartGantt /><span className='hidden md:flex'>Overview</span></li>
                            <li className='flex items-center gap-2 cursor-pointer p-2 border border-slate-50 hover:border-b-slate-300'><CircleUser /><span className='hidden md:flex'>Account</span></li>
                            <li className='flex items-center gap-2 cursor-pointer p-2 border border-slate-50 hover:border-b-slate-300'><BookA /> <span className='hidden md:flex'>Orders</span></li>
                            <li className='flex items-center gap-2 cursor-pointer p-2 border border-slate-50 hover:border-b-slate-300'><Box /> <span className='hidden md:flex'>Subscriptions</span></li>
                            <li className='flex items-center gap-2 cursor-pointer p-2 border border-slate-50 hover:border-b-slate-300'><Heart /><span className='hidden md:flex'>Wishlist</span></li>
                            <li className='flex items-center gap-2 cursor-pointer p-2 border border-slate-50 hover:border-b-slate-300'><MessageCircleQuestionMark /><span className='hidden md:flex'>Help and Support</span></li>
                            <li onClick={handleLogout} className='flex items-center gap-2 cursor-pointer p-2 border border-slate-50 hover:border-b-slate-300'><LogOut /><span className='hidden md:flex'>Log Out</span></li>
                        </ul>
                    </div>
                    <div className="px-10 py-10 flex flex-col gap-5 col-span-4 bg-slate-50 h-full min-h-screen rounded-xl">
                        <h1 className='text-4xl font-bold'>Welcome ,{user.name}</h1>
                        <h2>Sales summary</h2>
                        <h2>Recent orders</h2>
                        
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
                    </div>
                </section>
            </main>

        </>
    )
}

export default AdminDashboard