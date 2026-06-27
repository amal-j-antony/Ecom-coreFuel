import { addUserAPI, getUserByEmail } from '@/services/allAPI';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


function Register({ user, setUser }) {

    const navigate = useNavigate()

    const [userData,setUserData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const [input, setInput] = useState({
        name: "",
        email: "",
        password: "",
        confirm: "",
        check: false
    })

    const [formError, setFormError] = useState({
        nameEmpty: false,
        email: false,
        emailEmpty: false,
        passwordEmpty: false,
        passwordLength: false,
        passwordMismatch: false,
        empty: false,
        checked: false
    })
    console.log(formError);

    console.log(input);

    const inputVerification = async () => {
        const { name, email, password, confirm, check } = input
        const mailResult = await getUserByEmail(email)
        console.log(mailResult);
        

        setFormError({
            nameEmpty: name == "",
            empty: !(name && email && password && confirm && check),
            email: mailResult.data == [],
            emailEmpty: !email.includes("@"),
            passwordEmpty: password == "" ,
            passwordLength: password.length < 8,
            passwordMismatch: password != confirm,
            checked: !check
        })

        const validation = Object.values(formError).some(Boolean)
        console.log(validation);
        if(!validation){
            setUserData({
                name: input.name,
                email: input.email,
                password: input.password
            })
            handleRegister()
    }


    async function handleRegister() {
        
    } {
            try {
                const result = await addUserAPI(userData)
                console.log(result);
                if(result.status >= 200 && result.status <300){
                    alert("registration successful")
                    navigate("/login")
                }
            } catch (error) {
                console.log(error);
            }
        }


    }


    return (
        <>
            <section className='w-full h-screen flexCol bg-slate-200'>
                <div className='container flexCol gap-5 w-auto bg-slate-100 p-10 rounded-3xl'>
                    <h1 className='text-4xl font-bold black-ops-one-regular'>Join CoreFuel</h1>
                    <div className='flexCol w-auto gap-5'>
                        <input required value={input.name} onChange={(e) => setInput({ ...input, name: e.target.value })} type="text" placeholder='Enter Name' className={ 'border border-slate-500 p-3 rounded-2xl'} />

                        {formError.nameEmpty && <h1 className='text-red-400'>Please enter Name</h1>}

                        <input required value={input.email} onChange={(e) => setInput({ ...input, email: e.target.value })} type="text" className='border border-slate-500 p-3 rounded-2xl' placeholder='Enter email' name="" id="" />
                        
                        {formError.emailEmpty && <h1 className='text-red-400'>Please enter email</h1>}

                        {formError.email && <h1  className='text-red-400'>Email already exists, please use another email</h1>}
           
                        <div className='flexCol gap-5'>
                            <input onChange={(e) => setInput({ ...input, password: e.target.value })} type="password" className='border border-slate-500 p-3 rounded-2xl' placeholder='Enter password' name="" id="" />

                            {formError.passwordEmpty && <h1 className='text-red-400'>Please enter password</h1>}

                            <input onChange={(e) => setInput({ ...input, confirm: e.target.value })} type="password" className='border border-slate-500 p-3 rounded-2xl' placeholder='Confirm password' name="" id="" />



                            {formError.passwordMismatch && <h1 className='text-red-400'>Passwords do not match</h1>}

                            <h1>Note: Password must be longer than 8 characters</h1>

                           
                        </div>

                        <div>
                            <input onChange={(e) => setInput({ ...input, check: e.target.checked })} type="Checkbox" />
                            <span> I agree to the terms of service <br />and privacy policy</span>
                            {formError.checked && <h1 className='text-red-500'>Please accept terms and conditions</h1>}
                        </div>



                        <button onClick={inputVerification} className='cursor-pointer border bg-slate-950 text-white font-semibold text-xl  p-3 rounded-xl w-full hover:bg-slate-100 hover:text-black transition-all duration-500'>Register Now</button>

                    </div>
                </div>
            </section>
        </>
    )
}

export default Register