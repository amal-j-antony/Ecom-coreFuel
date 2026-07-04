import { FaShoppingBag, FaUser } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Link, useNavigate } from 'react-router-dom';
import { IoIosCart } from "react-icons/io";
import Cart from './Cart';
import { AiFillHome } from "react-icons/ai";
import { SiOpenaigym } from "react-icons/si";
import { useState } from "react";

function Header({ user, setUser, products }) {
  const [open,setOpen] = useState(false)
  const handleProfileCLick = () => {
    user.id ? navigate(`/userProfile/${user?.role}/${user?.id}`)
      : navigate(`/login`)
    console.log(user?.id);

  }
  const navigate = useNavigate()
  return (
    <>
      <main className='flexMain bg-[rgb(0 0 0 0.5)] py-4 sticky top-0 z-2 w-full backdrop-blur-2xl'>
        <section className='w-[90%] flex justify-between items-center'>
          <Link to={"/"} id="navLogo" className=' cursor-pointer '>
            <img src="https://res.cloudinary.com/dwaaoyztz/image/upload/v1782669535/logo_gsf3te.png" className="h-10 md:h-20" alt="" />
          </Link>
          <ul className='hidden md:flex gap-5 text-2xl border border-accent rounded-3xl bg-primary shadow-md px-20 me-20 py-2 font-semibold text-secondary'>
            <Link className="text-accent" to={"/"}>Home</Link>
            <Link className="text-accent" to={"/all"}>Shop</Link>
            <Link className="text-accent cursor-pointer" to={"/subscriptionLanding"} >Corefuel MAX</Link>
          </ul>
          <ul className='shadow-md flexMain gap-2 md:gap-5 md:bg-primary md:border-accent md:border py-2 ps-5  md:ms-15 rounded-3xl'>
            <li className="hidden md:flex" onClick={handleProfileCLick}>
              <FaUser className="text-xl md:text-xl cursor-pointer text-accent" />
            </li>
            <Link to={"/cart"} className="cursor-pointer flex justify-center items-center gap-3  md:bg-primary py-1 px  rounded-3xl">
              {/* <Cart /> */}
              <IoIosCart className="text-3xl text-accent" />
              
            </Link>
            <li>
              <Drawer open={open} onOpenchange={setOpen} direction="left" >
                <DrawerTrigger onClick={()=>setOpen(true)} className="flexMain">
                  <IoMdMenu className='flex md:hidden text-3xl' />
                </DrawerTrigger>
                <DrawerContent className="bg-primary text-secondary">
                  <DrawerHeader>
                    <DrawerTitle className="text-">
                      <img src="https://res.cloudinary.com/dwaaoyztz/image/upload/v1782669535/logo_gsf3te.png" className="h-10 md:h-20" alt="" />
                      <hr />
                      <ul className="flex flex-col p-5 gap-2">
                        <Link onClick={()=>setOpen(false)} className="flex gap-2 cursor-pointer" to={"/"}><AiFillHome/> Home</Link>
                        <Link onClick={()=>setOpen(false)}  className="flex gap-2 cursor-pointer" to={"/all"}><FaShoppingBag/> Shop</Link>
                        <Link onClick={()=>setOpen(false)}  className="flex gap-2 cursor-pointer" to={"/subscriptionLanding"} ><SiOpenaigym /> Corefuel MAX</Link>
                        <span onClick={()=>{setOpen(false),handleProfileCLick()}} className="flex gap-2"><FaUser/>Profile</span>
                        
                      </ul>
                    </DrawerTitle>
                  </DrawerHeader>
                </DrawerContent>
              </Drawer>
            </li>
          </ul>

        </section>
      </main>
    </>
  )
}

export default Header