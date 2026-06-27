import { getUserByEmail } from '@/services/allAPI'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {  toast, Bounce } from 'react-toastify';

function Login({ user, setUser }) {
    const [input, setInput] = useState({
        email: "",
        password: "",
    })
    console.log(input);

    const navigate = useNavigate()

    const validate = async () => {
        const { email, password } = input
        try {
            const result = await getUserByEmail(email)
            console.log(result);
            const resultData = result.data[0]

            if (result.status >= 200 && result.status < 300) {
                if (resultData.password == password) {
                    toast.success('Login Successful', {
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
                    setInput({
                        email: "",
                        password: "",
                    })
                    
                    setUser({
                        name: resultData.name,
                        email: resultData.email,
                        id: resultData.id,
                        role: resultData.role
                    })
                    localStorage.setItem("userLogin",JSON.stringify(user))
                    navigate("/")
                } else {
                    toast.error('Incorrect password', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                }
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
        }
    }

    const handleInput = (e, inputType) => {
        switch (inputType) {
            case "email": setInput({ ...input, email: e.target.value })
                break
            case "password": setInput({ ...input, password: e.target.value })
                break
            default: console.log("Input error");

        }
    }

    return (
        <>
            <section className='w-full h-screen flexCol'>
                
                <div className='container flexCol gap-5 w-auto'>
                    <h1 className='text-4xl font-bold black-ops-one-regular'>Welcome Back</h1>
                    <div className='flexCol w-auto gap-5'>
                        <input onChange={(e) => handleInput(e, "email")} value={input.email} type="text" className='border border-slate-500 p-3 rounded-2xl' placeholder='Enter email' name="" id="" />
                        <input onChange={(e) => handleInput(e, "password")} value={input.password} type="password" className='border border-slate-500 p-3 rounded-2xl' placeholder='Enter password' name="" id="" />
                        <button onClick={validate} className='cursor-pointer border bg-slate-950 text-white font-semibold text-xl  p-3 rounded-xl w-full hover:bg-slate-100 hover:text-black transition-all duration-500'>Login</button>
                        <Link to={"/register"} className='text-center cursor-pointer border bg-slate-950 text-white font-semibold text-xl  p-3 rounded-xl w-full hover:bg-slate-100 hover:text-black transition-all duration-500'>Register Now</Link>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login