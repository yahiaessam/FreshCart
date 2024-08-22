import axios from "axios";
import { createContext, useState } from "react";
import { baseUrl } from "../api/api";


export const StoreContext = createContext(0);

async function forgetPassword(email) {
  return await axios
    .post(baseUrl + "/api/v1/auth/forgotPasswords", { email })
    .then(({ data }) => data)
    .catch((err) => err);
}

async function resetCode(resetCode) {
  return await axios
    .post(baseUrl + "/api/v1/auth/verifyResetCode", { resetCode })
    .then(({ data }) => data)
    .catch((err) => err);
}

async function addToCart(productId) {
  return await axios.post(baseUrl + '/api/v1/cart/', { productId }, {
    headers: {
      token: localStorage.getItem('token')
    }
  }).then(({data})=>data).catch(err => err);
}

async function getWishList() {
  return axios.get(baseUrl + "/api/v1/wishlist/", {
    headers: {
      token: localStorage.getItem("token"),
    },
  }).then(({ data }) => data).catch(err => err);
}

async function addToWishlist(productId) {
  return axios.post(baseUrl + "/api/v1/wishlist/", { productId }, {
    headers: {
      token: localStorage.getItem('token'),
    }
  }).then(({ data }) => data).catch(err => err);
}

async function removeFromWishlist(productId) {
  return axios.delete(baseUrl + "/api/v1/wishlist/" + productId, {
    headers: {
      token: localStorage.getItem('token'),
    }
  }).then(({ data }) => data).catch(err => err);
}

async function getCart() {
  return await axios.get(baseUrl + "/api/v1/cart/", {
    headers: {
      token: localStorage.getItem("token"),
    },
  }).then(({ data }) => {
    localStorage.setItem('ownerId',data.data.cartOwner)
      return data
  }).catch(err => err);
}

async function clearCart() {
  return await axios.delete(baseUrl + "/api/v1/cart/", {
    headers: {
      token: localStorage.getItem("token"),
    },
  }).then(({data})=>data).catch(err => err);
}

async function removeFromCart(productId) {
  return await axios.delete(baseUrl + '/api/v1/cart/' + productId, {
    headers: {
      token: localStorage.getItem("token"),
    },
  }).then(({data})=>data).catch(err => err);
}

async function updateProductQuantity(productId, count) {
  return await axios.put(baseUrl + "/api/v1/cart/" + productId,{count}, {
    headers: {
      token: localStorage.getItem("token"),
    },
  }).then(({data})=>data).catch(err => err);
}

async function checkoutSession(cartId, shippingAddress) {
  return await axios.post(baseUrl + '/api/v1/orders/checkout-session/' + cartId, { shippingAddress }, {
    headers: {
      token: localStorage.getItem("token"),
    },
  }).then(({data})=>data).catch(err => err);
}

// eslint-disable-next-line react/prop-types
export default function StoreContextProvider({ children }) {

  const [counter, setCounter] = useState(0)
  const [total, setTotal] = useState(0)

  return (
    <StoreContext.Provider value={{ counter, setCounter, addToCart, getCart, total, setTotal, removeFromCart, getWishList, addToWishlist, removeFromWishlist, updateProductQuantity, clearCart, checkoutSession, forgetPassword, resetCode }}>
      {children}
    </StoreContext.Provider>
  )
}