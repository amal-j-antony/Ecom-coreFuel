import commonAPI from "./commonAPI";
import  serverURL  from "./serverURL";

//add products to cart
export const addProductToCartAPI = async (data) => {
   return await commonAPI("POST", `${serverURL}/cart`, data)
}

//add products to cart
export const updateExistingProductinCartAPI = async (data,id) => {
   return await commonAPI("PUT", `${serverURL}/cart/${id}`, data)
}

//get products in cart by userid
export const getCartItemsAPI = async (userId) => {
   return await commonAPI("GET", `${serverURL}/cart?userId=${userId}`, {})
}

//get products in cart by id
export const getCartItemByIdAPI = async (pid,userId) => {
   return await commonAPI("GET", `${serverURL}/cart?pID=${pid}&userId=${userId}`, {})
}

//get multiple cart items by id
export const getMultipleCartItemsAPI = async (query) => {
   return await commonAPI("GET", `${serverURL}/products?${query}`)

}

//get all prducts in a group
export const getProductsInGroup = async (groupName) => {
   return await commonAPI("GET", `${serverURL}/products?group=${groupName}`, {})
}

//get all products 
export const getAllProductsAPI = async () => {
   return await commonAPI("GET", `${serverURL}/products`, {})
}

//get product by id
export const getProductById = async (id) => {
   return await commonAPI("GET", `${serverURL}/products/${id}`, {})
}

//get user by userName
export const getUserByName = async (userName) => {
   return await commonAPI("GET", `${serverURL}/users?userName=${userName}`, {})
}

//get user by email
export const getUserByEmail = async (email) => {
   return await commonAPI("GET", `${serverURL}/users?email=${email}`, {})
}

//add user
export const addUserAPI = async (userData) => {
   return await commonAPI("POST", `${serverURL}/users`, userData)
}

//delete item in cart
export const deleteItemInCartAPI = async (id) => {
   return await commonAPI("DELETE",`${serverURL}/cart/${id}`, {})
}

//edit item qty in cart
export const editCartItemQTYapi = async (id,data) => {
   return await commonAPI("PATCH",`${serverURL}/cart/${id}`,data)
}

//get recommended items
export const getRecommendedAPI = async () => {
   return await commonAPI("GET",`${serverURL}/products`,{}, { recommended: true})
}

//get testimonials
export const getTestimonialsAPI = async () => {
   return await commonAPI("GET",`${serverURL}/testimonials`,{})
}

//add order
export const addOrderAPI = async (data) => {
   return await commonAPI("POST",`${serverURL}/orders`,data)
}

// get orders by user ID
export const getOrdersByUserAPI = async (userID) => {
   return await commonAPI("GET",`${serverURL}/orders?user=${userID}`)
}

//get all orders
export const getAllOrdersAPI = async () => {
   return await commonAPI("GET",`${serverURL}/orders`,{})
}

//add products
export const addProductsAPI = async (data) => {
   return await commonAPI("POST",`${serverURL}/products`,data)
}

//delete Products
export const deleteProductAPI = async (id) => {
   return await commonAPI("DELETE",`${serverURL}/products/${id}`,{})
}