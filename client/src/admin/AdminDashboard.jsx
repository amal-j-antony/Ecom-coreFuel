import { Separator } from '@/components/ui/separator'
import { getAllOrdersAPI, getAllProductsAPI } from '@/services/allAPI'
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
import AdminOverview from './AdminOverview';
import AdminProducts from './AdminProducts';

function AdminDashboard({ user, setUser }) {
    const [tab, setTab] = useState("overview")
    const [orders, setOrders] = useState([])
    const navigate = useNavigate()
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



    return (
        <>
            <main className='bg-background pt-3 h-screen w-full flexCOl'>
                <section className='grid grid-cols-5 gap-5 p-10'>
                    <div className="pt-10 h-full bg-primary min-h-screen rounded-xl flex flex-col item-center px-5">
                        <h1 className='font-bold text-xl flex gap-2 items-center'><Menu /><span className='hidden md:flex'>MENU</span></h1>
                        <Separator className='my-3' />
                        <ul className='text-xl flex flex-col gap-'>
                            <li onClick={() => setTab("overview")} className='flex items-center gap-2 cursor-pointer p-2 '><SquareChartGantt /><span className='hidden md:flex'>Overview</span></li>
                            <li className='flex items-center gap-2 cursor-pointer p-2 '><CircleUser /><span className='hidden md:flex'>Users</span></li>
                            <li onClick={() => setTab("products")} className='flex items-center gap-2 cursor-pointer p-2 '><BookA /> <span className='hidden md:flex'>Products</span></li>
                            <li onClick={handleLogout} className='flex items-center gap-2 cursor-pointer p-2 '><LogOut /><span className='hidden md:flex'>Log Out</span></li>
                        </ul>
                    </div>
                    {
                        tab == "overview" && <AdminOverview user={user} />
                    }
                    {
                        tab == "products" && <AdminProducts user={user} />
                    }

                </section>

            </main>

        </>
    )
}

export default AdminDashboard