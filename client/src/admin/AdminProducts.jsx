import { addProductsAPI, deleteProductAPI, getAllProductsAPI } from '@/services/allAPI'
import React, { useEffect, useState } from 'react'
import { AiFillDelete } from "react-icons/ai";
import { MdDelete, MdEdit } from "react-icons/md";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

function AdminProducts() {
    const [allProducts, setAllProducts] = useState([])
    const [product, setProduct] = useState({
        id: "",
        title: "",
        group: "",
        description: "",
        weight: "",
        price: "",
        image: "",
    })

    const getProducts = async () => {
        const result = await getAllProductsAPI()
        console.log(result);
        setAllProducts(result.data)
    }

    const addProduct = async () => {
        const { id, title, group, description, weight, price, image } = product
        if (id && title && description && weight && price && group && image) {
            const result = await addProductsAPI(product)
            console.log(result);
            if (result.status == 201) {
                getProducts()
                setOpen(false)
                toast.success('Product added successfully!', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
            }

        } else {
            alert("All fields not filled, please try again")
        }
    }

    const deleteProduct = async (id) => {
        const result = await deleteProductAPI(id)
        console.log(result);
        if (result.status == 200) {
            getProducts()
            toast.success('Product deleted successfully!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }

    }



    const [open, setOpen] = useState(false);

    useEffect(() => {
        getProducts()
    }, [])
    return (
        <div className='col-span-5 md:col-span-4 bg-primary w-full h-full p-10 rounded-3xl text-secondary'>
            <div className="flex-col flex w-full gap-10">
                <div className='flex max-md:flex-col justify-between ' >
                    <h1 className='font-bold text-3xl'>Products</h1>
                    <div>
                        <button onClick={() => setOpen(true)} className='bg-secondary text-white font-bold text-2xl py-2 px-4 rounded-xl ' >Add Product</button>
                    </div>

                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                    {
                        allProducts.map((item, index) => (
                            <div key={index} className="p-5 border md:min-w-75 border-slate-700 rounded-3xl flex flex-col gap-2">
                                <div className='flex justify-center'>
                                    <img src={item.image} className='h-25 md:h-50' alt="" />

                                </div>
                                <div className='flex justify-between w-full gap-10'>
                                    <h1 className='font-bold'>{item.title}</h1>


                                </div>
                                <h1 className='flex justify-between' ><b>Price:</b> {item.price}</h1>
                                <h1 className='flex justify-between' ><b>Group:</b> {item.group}</h1>
                                <div className='flex max-md:flex-col gap-2 justify-between'>
                                    <button onClick={() => deleteProduct(item.id)} className='flex items-center p-2 text-xl bg-red-400 rounded cursor-pointer'><MdDelete />Delete</button>
                                    <button className='p-2 bg-zinc-400 rounded cursor-pointer flex items-center text-xl'><MdEdit />Edit</button>
                                </div>
                            </div>
                        ))
                    }
                </div>

            </div>

            <Dialog open={open}>

                <DialogContent className="bg-primary text-secondary">
                    <DialogTitle><h1>Add new product</h1></DialogTitle>
                    <input onChange={(e) => setProduct({ ...product, title: e.target.value })} className='border border-zinc-900 py-3 px-4' type="text" placeholder='Product Name' />
                    <input onChange={(e) => setProduct({ ...product, id: e.target.value })} className='border border-zinc-900 py-3 px-4' type="text" placeholder='Product ID' />
                    <input onChange={(e) => setProduct({ ...product, group: e.target.value })} className='border border-zinc-900 py-3 px-4' type="text" placeholder='Product Group' />
                    <input onChange={(e) => setProduct({ ...product, description: e.target.value })} className='border border-zinc-900 py-3 px-4' type="text" placeholder='Product description' />
                    <input onChange={(e) => setProduct({ ...product, weight: e.target.value })} className='border border-zinc-900 py-3 px-4' type="text" placeholder='Product weight' />
                    <input onChange={(e) => setProduct({ ...product, image: e.target.value })} className='border border-zinc-900 py-3 px-4' type="text" placeholder='Product image link' />
                    <input onChange={(e) => setProduct({ ...product, price: e.target.value })} className='border border-zinc-900 py-3 px-4' type="text" placeholder='Product Price' />
                    <div className='flex justify-between items-center'>
                        <div onClick={addProduct} className='bg-slate-700 py-2 rounded-2xl px-4 cursor-pointer' >Add Product</div>
                        <button onClick={() => setOpen(false)} className="bg-slate-700 py-2 px-4 rounded-2xl cursor-pointer">
                            Close
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AdminProducts