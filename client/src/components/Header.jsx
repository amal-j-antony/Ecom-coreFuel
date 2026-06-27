import { FaUser } from "react-icons/fa";
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

function Header({user,setUser,products}) {
  const handleProfileCLick = () => {
    user.id ? navigate(`/userProfile/${user?.role}/${user?.id}`) 
    : navigate(`/login`)
    console.log(user?.id);
    
  }
  const navigate = useNavigate()
  return (
    <>
      <main className='flexMain bg-[#dedede] text- py-4 sticky top-0 z-2 w-full'>
        <section className='px-10 container flex justify-between items-center'>
          <Link to={"/"} id="navLogo" className='font-bold text-3xl cursor-pointer black-ops-one-regular text-slate-700'>
            <img src="/logo.png" className="h-15" alt="" />
          </Link>
          <ul className='hidden md:flex gap-5 text-xl border border-slate-200 rounded-3xl bg-slate-200 shadow-md px-8 py-2 font-semibold text-slate-700'>
            <Link to={"/"}>Home</Link>
            <Link to={"/all"}>Shop</Link>
            <Link to={"/subscriptionLanding"} className="cursor-pointer">Corefuel MAX</Link>
            <Link to={"/about"}>Our Story</Link>
          </ul>
          <ul className='flexMain gap-5'>
            <li onClick={handleProfileCLick}>
              <FaUser className="text-2xl cursor-pointer" />
            </li>
            <Link to={"/cart"} className="cursor-pointer flex justify-center items-center gap-3 bg-slate-200 border border-slate-200 py-1 px-3 shadow-md rounded-3xl">
              {/* <Cart /> */}
              <IoIosCart className="text-3xl" />
              <span className=" bg-gray-500 rounded-full text-white font-bold px-2">{products?.length}</span>
            </Link>
            <li>
              <Drawer direction="left" >
                <DrawerTrigger className="flexMain">
                  <IoMdMenu className='flex md:hidden text-3xl' />
                </DrawerTrigger>
                <DrawerContent className="bg-black text-">
                  <DrawerHeader>
                    <DrawerTitle className="text-">
                      CoreFuel
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