import React from 'react'
import Swal from 'sweetalert2'

function Subscription() {

    const handleNotify = () => {
        Swal.fire({
            text:"Subscribed successfully. You will receive an email when the product goes live",
            icon: "success",
            theme: "dark"
        })
    }
    return (
        <>
            <section className='w-full flex justify-center'>
                <div className="container flex flex-col gap-5 items-center">
                    <img src="" alt="" />
                    <span className='text-3xl text-accent font-bold' >coreFuel MAX: Join an Elite community of Fitness enthusiasts</span>
                    <span className='text-xl text-secondary font' >Get a monthly supply of protein products. Launching soon</span>
                    <button onClick={handleNotify} className='py-2 px-4 bg-accent text-black text-xl font-bold rounded-xl cursor-pointer' >Notify Me</button>
                    <img src="https://res.cloudinary.com/dwaaoyztz/image/upload/v1782800633/Untitled_design_3_mrbis9.png" className='rounded-3xl' alt="" />
                    
                </div>
            </section>


        </>
    )
}

export default Subscription