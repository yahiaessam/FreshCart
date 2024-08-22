/* eslint-disable react/prop-types */
import { FaRegTrashCan } from "react-icons/fa6";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { StoreContext } from "../../context/storeContext";
import { toast } from "react-toastify";
import { useState } from "react";

function WishListItem({ item, setWishlistData}) {

  const [spinner, setSpinner] = useState(false);
  const { removeFromWishlist, getWishList, addToCart, setCounter, setTotal } = useContext(StoreContext);
  const [loading, setLoading] = useState(false);

  async function addProductToCart(productId) {
    setLoading(true);
    const data = await addToCart(productId);
    if (data.status == "success") {
      toast.success("Product added successfully");
      setCounter(data.numOfCartItems);
      setTotal(data.data.totalCartPrice);
      setLoading(false);
    }
  }

  async function removeProductFromWishlist(productId) {
    setSpinner(true);
    const data = await removeFromWishlist(productId);
    const products = await getWishList();
    if (data.status === "success") {
      setWishlistData(products);
      toast.error("Product removed from wishlist");
      setSpinner(false);
    }
  }

  return (
    <div className="w-full p-2 flex items-center justify-start gap-8 border-b border-[#dcdada]">
      <div className="flex items-center justify-center gap-8">
        <img className="w-[100px]" src={item?.imageCover} alt="item" />
        <div>
          <p className="title">{item?.title}</p>
          <div className="text-[#0aad0a] my-2">Price : {item?.price} EGP</div>
          <button
            onClick={() => removeProductFromWishlist(item._id)}
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
      </div>
      <div className="ml-auto">
        <button
          onClick={() => addProductToCart(item._id)}
          disabled={loading}
          className="btn-accent rounded-md p-2 w-full font-bold flex-shrink-0 text-[#fff] bg-main"
        >
          {loading ? (
            <FontAwesomeIcon icon={faSpinner} spinPulse />
          ) : (
            "Add to Cart"
          )}
        </button>
      </div>
    </div>
  );
}

export default WishListItem