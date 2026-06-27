import { Separator } from '@/components/ui/separator';
import { deleteItemInCartAPI, getAllProductsAPI, getCartItemsAPI, getMultipleCartItemsAPI } from '@/services/allAPI';
import {
    Plus,
    Minus
} from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast, Bounce } from 'react-toastify';
import Swal from 'sweetalert2';


function CartPage({ user, products, getCartProducts }) {
    const [initialAmt, setInitialAmt] = useState(0)
    const [shipping, setShipping] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [finalAmt, setFinalAMt] = useState(0)
    const couponCodes = ['WELCOME20', 'ONAM20']
    const [productData, setProductData] = useState([])
    const [coupon, setCoupon] = useState("")
    const navigate = useNavigate()
    console.log(initialAmt);
    console.log(finalAmt);
    console.log(products);
    console.log(productData);

    console.log(user.id);

    const getItemsinCart = async () => {
        const allProductResult = await getAllProductsAPI()
        console.log(allProductResult);

        const productMap = new Map(allProductResult.data.map
            (product => [product.id, product])
        )

        console.log(productMap);

        const cartItems = products?.map(item => ({
            ...productMap.get(item.pID),
            userId: user.id,
            qty: item.qty,
            cartID: item.id
        }))

        console.log(cartItems);
        setProductData(cartItems)

    }

    const deleteItem = async (id) => {
        const result = await deleteItemInCartAPI(id)
        console.log(result);
        initialCalc()
        amtCalc()
        return result
    }

    const handleQtyChange = async (itemId, count, index) => {

        const prodUpdate = productData.map(item => {
            if (item.cartID == itemId) {
                if (item.qty == 1 && count == -1) {
                    Swal.fire({
                        title: "Are you sure?",
                        text: "Reducing quantity to zero will remove item from cart",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, proceed"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            setProductData(productData.filter((item) => item.cartID != itemId))
                            deleteItem(itemId).then(res => {
                                console.log(res);

                                if (res.status == 200) {
                                    toast.success('Item deleted successfully', {
                                        position: "bottom-center",
                                        autoClose: 2200,
                                        hideProgressBar: false,
                                        closeOnClick: false,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "colored",
                                        transition: Bounce,
                                    });
                                    getCartProducts()
                                }


                            }).catch(err => console.log(err)
                            )

                        }
                    });
                } else {
                    item.qty += count
                }
                return item
            } else return item
        })

        setProductData(prodUpdate)

    }

    const handleCoupon = () => {
        const result = couponCodes.filter((item) => item == coupon)
        if (result != []) {
            const discount = Number(result.splice(-2))
            setDiscount(discount / 100)
        }
    }



    useEffect(() => {
        getItemsinCart()
        console.log("cart line 84");
    }, [products])



    useEffect(() => {
        const subTotal = productData?.reduce((sum, item) => sum + (item.price * item.qty), 0)

        const shippingCharge = subTotal >= 500 ? 0 : 50

        const total = subTotal + (subTotal * discount) + shippingCharge

        setShipping(shippingCharge)
        setInitialAmt(subTotal)
        setFinalAMt(total)

    }, [productData, user.id, discount])


    return (
        <>
            <section className='w-full h-full min-h-screen flex justify-center'>
                <div className="w-full container max-md:flex-col flex justify-between gap-10 px-10">
                    <div className='w-full'>
                        <h1 className="text-5xl font-bold py-10">Cart</h1>
                        <hr className=" bg-slate-100 " />
                        {!productData.length ?
                            <div className='flexCol gap-5'>
                                <h1 className='text-center fw-bold text-3xl pt-20 fw-semibold'>Your cart is empty</h1>
                                <img src="/shopping-cart.png" className='h-50' alt="" />
                            </div>

                            :
                            <table className='border-separate border-spacing-5'>
                                <thead>
                                    <tr>
                                        <th>
                                            No.
                                        </th>
                                        <th></th>
                                        <th>Product Name</th>
                                        <th>Price</th>
                                        <th>Qty.</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productData?.map((item, index) => (
                                        <tr key={index} >
                                            <td>{index + 1}</td>
                                            <td>
                                                <img src={item.image} className='h-30' alt="" />
                                            </td>
                                            <td>
                                                <span>{item.title}</span>
                                            </td>
                                            <td>
                                                <span>
                                                    {item.price}
                                                </span>
                                            </td>
                                            <td className='h-full'>
                                                <div className='border bg-slate-100 flex justify-between items-center gap-5'>
                                                    <button onClick={() => handleQtyChange(item.cartID, 1, index)} className='border p-3 bg-slate-300'><Plus /></button>
                                                    <span className='text-2xl'>{item.qty}</span>
                                                    <button onClick={() => handleQtyChange(item.cartID, -1, index)} className='border p-3 bg-slate-300'><Minus /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        }
                    </div>
                    <div className="max-md:w-full md:min-w-[30vw] flex justify-center items-center">
                        <div className="shadow-lg bg-slate-100 p-10 w-full grid grid-cols-1 gap-5">
                            <span className='text-3xl font-semibold'>Summary</span>
                            <hr className='h-1 bg-slate-900' />
                            <span className='flex justify-between text-xl'>Total items: <span>{productData.reduce((a, b) => (a + b.qty), 0)}</span></span>
                            <span className='flex justify-between text-xl'>Total cost: <span>INR {productData.reduce((a, b) => (a + b.price * b.qty), 0)}</span></span>
                            <span className='flex justify-between text-xl'>Shipping cost: {shipping ?
                                <span>INR {shipping} </span> :
                                <span>Free</span>
                            } </span>
                            <div className='flex gap-3'>
                                <input onChange={(e) => setCoupon(e.target.value)} type="text" placeholder='Enter a coupon code' className='border border-slate-500 py-2 px-5 rounded w-full' />
                                <button onClick={handleCoupon} className='shadow p-2 border border-slate-500 rounded cursor-pointer hover:bg-slate-500 hover:text-white transition duration-300 ease-out'>Submit</button>
                            </div>

                            <hr className="h-1 bg-slate-900" />
                            <span>Add address</span>
                            <span className='flex justify-center'>Select Payment Method</span>
                            <div className="flex justify-center gap-10">
                                <span className="border border-slate-500 p-2">UPI</span>
                                <span className="border border-slate-500 p-2">CARD</span>
                                <span className="border border-slate-500 p-2">NET Banking</span>
                            </div>
                            <span>Grand total: <span>INR {finalAmt}</span></span>
                            <button onClick={() => navigate("/payment")} className='text-2xl font-bold bg-slate-700 text-white rounded py-3 hover:scale-[1.1] transition duration-300 ease-out'>Proceed to checkout</button>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default CartPage