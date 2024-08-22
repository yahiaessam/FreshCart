import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/storeContext";
import Loader from "../../components/Loader/Loader";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import { Link } from "react-router-dom";

function Cart() {

  const [cartData, setCartData] = useState(null);
  const { getCart, clearCart, setCounter, setTotal } = useContext(StoreContext);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    (async () => {
      const data = await getCart();
      if (data?.response?.data.statusMsg == 'fail') {
        setCartData(null);
      } else {
        setCartData(data);
      }
      setLoading(false);
    })()
  }, [getCart]);

  async function deleteAllItems() {
      const data = await clearCart();
    if (data?.message === 'success') {
      setCartData(null);
      setCounter(0);
      setTotal(0);
    }
  }

  if (loading) return <Loader />
  if (cartData == null) return <EmptyCart />
  if(cartData.numOfCartItems == 0) return <EmptyCart/>

  return (
    <div className=" min-h-screen bg-white">
      <div className="hero-content">
        <div className="max-w-full container bg-[#f0f3f2] py-5 px-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold title">Shop Cart :</h1>
              <h4 className="py-2 text-[#0aad0a]">
                Total Cart Price: {cartData?.data.totalCartPrice} EGP
              </h4>
            </div>
            <button
              onClick={() => deleteAllItems()}
              className=" btn btn-accent mt-5 text-lg font-semibold"
            >
              Clear Cart
            </button>
          </div>

          {cartData?.data?.products?.map((cartItem) => (
            <CartItem
              key={cartItem._id}
              cartItem={cartItem}
              setCartData={setCartData}
            />
          ))}

          <Link to={`/address/${cartData.data._id}`}>
            <button className="btn btn-accent my-3 text-lg font-semibold">
              Place Order
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
