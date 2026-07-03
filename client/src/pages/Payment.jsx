import { CircleCheckBig } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { PropagateLoader } from "react-spinners"


function Payment() {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");

    useEffect(() => {
        const timer = setTimeout(
            () => {setLoading(false)
            },3000)

            return () => clearTimeout(timer)
    },[])
    return (
        <section className='flexMain w-full h-screen'>
            {
                loading ? <PropagateLoader 
                color='#fefefe'/>
                :
                <div className="flexCol gap-5 rounded-xl bg-primary p-10">
                    <CircleCheckBig size={"100"}/>
                    <span className='text-2xl text-secondary'>Payment Success!</span>
                    <div className="flex justify-center ">
                        <Link to={"/"} className='bg-slate-700 text-white py-2 px-10 w-full rounded-xl'>Back to Home</Link>
                    </div>
                </div>
            }
        </section>
    )
}

export default Payment