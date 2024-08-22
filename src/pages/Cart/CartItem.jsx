/* eslint-disable react/prop-types */
import { FaRegTrashCan } from "react-icons/fa6";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { StoreContext } from "../../context/storeContext";
import { toast } from "react-toastify";


function CartItem({cartItem, setCartData}) {

  const { removeFromCart, updateProductQuantity, setCounter, setTotal } = useContext(StoreContext);
  const [spinner, setSpinner] = useState(false);

    async function deleteCartItem(productId) {
      setSpinner(true);
      const data = await removeFromCart(productId);

      if (data.status === 'success') {
        setCartData(data);
        toast.error("Product deleted successfully");
        setCounter(data.numOfCartItems);
        setTotal(data.data.totalCartPrice);
        setSpinner(false);
      }
    }

  async function updateCartItem(productId,count) {
    const data = await updateProductQuantity(productId, count);
    if (data.status === 'success') {
      toast.success(`quantity is updated to ${count}`);
      setCartData(data);
      setTotal(data.data.totalCartPrice);
    }

  }

  return (
    <div className="w-full p-2 flex items-center justify-start gap-8 border-b border-[#dcdada]">
      <img
        className="w-[100px]"
        src={cartItem?.product?.imageCover}
        alt="cartItem"
      />
      <div>
        <p className="title">{cartItem?.product?.title}</p>
        <div className="text-[#0aad0a] my-2">Price : {cartItem?.price} EGP</div>
        <button
          onClick={() => deleteCartItem(cartItem?.product?._id)}
          className="title flex items-center justify-between gap-2 rounded-md py-[2.5px] px-2 border border-[#0aad0a]"
        >

          {!spinner ? (
            <div className="flex items-center justify-center gap-2">
              <FaRegTrashCan color="0aad0a" /> Remove
            </div>
          ) : (
            <FontAwesomeIcon
              className="text-[#0aad0a]"
              icon={faSpinner}
              spinPulse
            />
          )}
          
        </button>
      </div>
      <div className="ml-auto flex items justify-center gap-2">
        <button
          disabled={cartItem?.count > cartItem?.product?.quantity}
          onClick={() =>
            updateCartItem(cartItem?.product?._id, cartItem?.count + 1)
          }
          className="title rounded-md py-[2.5px] px-2 border border-[#0aad0a]"
        >
          +
        </button>
        <span className="title">{cartItem?.count}</span>
        <button
          disabled={cartItem?.count <= 1}
          onClick={() =>
            updateCartItem(cartItem?.product?._id, cartItem?.count - 1)
          }
          className="title rounded-md py-[2.5px] px-2 border border-[#0aad0a]"
        >
          -
        </button>
      </div>
    </div>
  );
}

export default CartItem;
