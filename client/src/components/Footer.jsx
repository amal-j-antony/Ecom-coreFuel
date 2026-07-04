import React from 'react'

function Footer() {
    return (
        <main className=' flexMain flex-wrap w-full bg-primary p-5'>
            <footer className='w-[90%] grid grid-cols-1 md:grid-cols-3'>
                <div className="flex flex-col items-center">
                    <h1 className='text-3xl font-semibold flex items-center'>
                        <img src="https://res.cloudinary.com/dwaaoyztz/image/upload/v1782669535/logo_gsf3te.png" className='h-20' alt="" />
                    </h1>
                    <p>Fuel every rep. Power every goal</p>
                </div>

                <div className="flex justify-center">
                    <ul>
                        <li className='text-2xl pb-2 font-semibold'>Shop</li>
                        <li>Protein Bars</li>
                        <li>Protein Powder</li>
                        <li>Creatine</li>
                        <li>Organic supplemets</li>
                    </ul>
                </div>

                <div className='flex justify-center'>
                    <ul>
                        <li className='text-2xl pb-2 font-semibold'>Contact</li>
                        <li>support@corefuel.com</li>
                        <li>Help center</li>
                        <li>Chat with an agent</li>
                    </ul>
                </div>
            </footer>
        </main>
    )
}

export default Footer