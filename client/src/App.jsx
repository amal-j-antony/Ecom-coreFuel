import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import ProducePage from './pages/ProducePage'
import NotFound from './pages/NotFound'
import { useEffect, useState } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import UserProfile from './user/UserProfile'
import AdminDashboard from './admin/AdminDashboard'
import { ToastContainer, Bounce, toast } from 'react-toastify'
import CartPage from './pages/CartPage'
import Subscription from './pages/Subscription'
import { addProductToCartAPI, getCartItemByIdAPI, getCartItemsAPI, updateExistingProductinCartAPI } from './services/allAPI'
import Payment from './pages/Payment'
import Shop from './pages/Shop'
import Footer from './components/Footer'


function App() {
  const location = useLocation()
  const [user, setUser] = useState({
    id: null,
    name: "",
    email: ""
  })
  const [products, setProducts] = useState([])
  const [cartUpdate, setCartUpdate] = useState(0)
  console.log("products:", products);
  console.log(user);
  console.log(cartUpdate);


  const loadUser = () => {
    const userDetails = JSON.parse(localStorage.getItem("userLogin"))

    userDetails && setUser(userDetails)
  }

  const getCartProducts = async () => {
    try {
      const result = await getCartItemsAPI(user.id)
      console.log(result);
      setProducts(result.data)
      return (result.data)
    } catch (error) {
      console.log(error);
    }
  }

  const addtoCart = async (productID) => {
    let cartItem
    const getItem = await getCartItemByIdAPI(productID, user.id)
    console.log(getItem);

    if (getItem.data.length != 0) {
      cartItem = getItem.data[0]
      cartItem.qty += 1
      try {
        const result = await updateExistingProductinCartAPI(cartItem, cartItem.id)
        console.log(result);


      } catch (error) {
        console.log(error);

      }
    } else {
      cartItem = {
        userId: user.id,
        pID: productID,
        qty: 1
      }
      try {
        const result = await addProductToCartAPI(cartItem)
        console.log(result);
        toast.success('Product added to cart!', {
                        position: "bottom-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
        setCartUpdate(cartUpdate + 1)
        

      } catch (error) {
        console.log(error);

      }
    }


  }

  useEffect(() => {
    loadUser()
  }, [])


  useEffect(() => {
    getCartProducts()
    console.log("line 51 app");

  }, [user.id, cartUpdate])
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      {location.pathname != "/payment" && <Header user={user} setUser={setUser} products={products} carUpdate={cartUpdate} />}
      <Routes>
        <Route path='/all' element={<Shop addtoCart={addtoCart} />} />

        <Route path="/payment" element={<Payment />} />

        <Route path='/' element={<Home user={user} setCartUpdate={setCartUpdate} cartUpdate={cartUpdate} addtoCart={addtoCart} />} />

        <Route path='/productPage/:id' element={<ProducePage getCartProducts={getCartProducts} products={products} user={user} />} />

        <Route path="/register" element={<Register user={user} setUser={setUser} />} />

        <Route path='/login' element={<Login user={user} setUser={setUser} />} />

        <Route path='/userProfile/user/:id' element={<UserProfile user={user} setUser={setUser} addtoCart={addtoCart} />} />

        <Route path='/userProfile/admin/:id' element={<AdminDashboard user={user} setUser={setUser} />} />

        <Route path='/subscriptionLanding' element={<Subscription />} />

        <Route path='/cart' element={<CartPage user={user} products={products} setProducts={setProducts} carUpdate={cartUpdate} getCartProducts={getCartProducts} />} />

        <Route path='/*' element={<NotFound />} />
      </Routes>
      <br /><br />
      {location.pathname != "/payment"  && <Footer user={user} setUser={setUser} products={products} carUpdate={cartUpdate} />}
    </>
  )
}

export default App
