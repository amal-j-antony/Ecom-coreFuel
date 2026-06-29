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
      <main className='flexMain bg-background py-4 sticky top-0 z-2 w-full'>
        <section className='w-[90%] flex justify-between items-center'>
          <Link to={"/"} id="navLogo" className='font-bold text-3xl cursor-pointer black-ops-one-regular text-slate-700'>
            <img src="/logo-white.png" className="h-20" alt="" />
          </Link>
          <ul className='hidden md:flex gap-5 text-2xl border border-accent rounded-3xl bg-primary shadow-md px-20 py-2 font-semibold text-secondary'>
            <Link className="text-accent" to={"/"}>Home</Link>
            <Link className="text-accent" to={"/all"}>Shop</Link>
            <Link className="text-accent cursor-pointer" to={"/subscriptionLanding"} >Corefuel MAX</Link>
          </ul>
          <ul className='flexMain gap-5 bg-primary border-accent border py-2 ps-5 ms-15 rounded-3xl'>
            <li onClick={handleProfileCLick}>
              <FaUser className="text-2xl cursor-pointer text-accent" />
            </li>
            <Link to={"/cart"} className="cursor-pointer flex justify-center items-center gap-3 bg-accent border border-accent py-1 px-3 shadow-md rounded-3xl">
              {/* <Cart /> */}
              <IoIosCart className="text-3xl text-primary" />
              <span className=" bg-primary rounded-full text-white font-bold px-2">{products?.length}</span>
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