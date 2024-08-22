import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { RiErrorWarningLine } from "react-icons/ri";
import {motion,AnimatePresence} from 'framer-motion'
import { Offline } from "react-detect-offline";
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Register from './pages/Auth/Register/Register';
import Login from './pages/Auth/Login/Login';
import Brands from './pages/Brands/Brands'
import Categories from './pages/Categories/Categories'
import Products from './pages/Products/Products'
import WishList from './pages/WishList/WishList'
import NotFound from "./components/NotFound/NotFound";
import ProductDetails from "./pages/Products/ProductDetails";
import GuardRoute from './guard/GuardRoute';
  import { ToastContainer} from "react-toastify";
import './App.css'
import StoreContextProvider from './context/storeContext';
import Address from './pages/Address/Address';
import AllOrders from './pages/Orders/AllOrders';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          path: "/",
          element: (
            <GuardRoute>
              <Home />
            </GuardRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <GuardRoute>
              <Cart />
            </GuardRoute>
          ),
        },
        {
          path: "products",
          element: (
            <GuardRoute>
              <Products />
            </GuardRoute>
          ),
        },
        {
          path: "productDetails/:id",
          element: (
            <GuardRoute>
              <ProductDetails />
            </GuardRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <GuardRoute>
              <Categories />
            </GuardRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <GuardRoute>
              <Brands />
            </GuardRoute>
          ),
        },
        {
          path: "address/:id",
          element: (
            <GuardRoute>
              <Address />
            </GuardRoute>
          ),
        },
        {
          path: "wishlist",
          element: (
            <GuardRoute>
              <WishList />
            </GuardRoute>
          ),
        },
        {
          path: "allorders",
          element: (
            <GuardRoute>
              <AllOrders/>
            </GuardRoute>
          ),
        },
        { path: "*", element: <NotFound /> },
      ],
    },
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
      ],
    },
  ]);


  return (
    <>
      <StoreContextProvider>
        <RouterProvider router={router} />
      </StoreContextProvider>
      <ToastContainer theme='colored' autoClose={1000 } />
      <Offline>
        <AnimatePresence>
          <motion.p initial = {{x: 100, opacity: 0}} animate ={{x: 0,opacity:1}} transition={{duration: 0.3}} className="bg-[#0aad0a] text-[#fff] flex items-center justify-center gap-2 rounded-md fixed py-3 px-6 bottom-8 right-8 ">
            <RiErrorWarningLine />
            you are currently offline!
          </motion.p>
        </AnimatePresence>
      </Offline>
    </>
  );
}

export default App
