/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { StoreContext } from "../../context/storeContext";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";


function ProductItem({ product }) {
  const { setCounter, addToCart, setTotal, addToWishlist } = useContext(StoreContext)
  const [loading, setLoading] = useState(false);
  const [beat, setBeat] = useState(false);

  async function addProductToCart(productId) {
    setLoading(true);
    const data = await addToCart(productId);
    if (data.status == 'success') {
      toast.success('Product added successfully');
      setCounter(data.numOfCartItems);
      setTotal(data.data.totalCartPrice);
      setLoading(false);
    }
  }

  async function addProductToWishlist(productId) {
    const data = await addToWishlist(productId);
    if (data.status == 'success') {
      setBeat(true);
      toast.success('Product added to wishlist');
    }
  }

  return (
    <>
      <div className="product relative w-[20%] max-lg:w-[28%] max-md:w-[45%] max-sm:w-[100%] flex flex-col items-start justify-center m-6 p-3 rounded-lg cursor-pointer border border-[#f0f3f2] shadow-md">
        <div className="absolute right-2 top-2 bg-[#f0f3f2] px-2 py-1 rounded shadow-md">
          <button onClick={()=>addProductToWishlist(product._id)}>
            <FontAwesomeIcon className={beat ? 'text-[#ff0033]': ''} icon={faHeart} />
          </button>
        </div>
        <Link to={"/productDetails/" + product._id}>
          <img
            src={product.imageCover}
            className="w-[100%] self-center max-sm:w-[100%] max-md:w-[100%] max-lg:w-[100%]"
            alt="brands"
          />
          <span className="text-main self-start mt-3">
            {product.category.name}
          </span>
          <h5 className="title self-start text-lg font-semibold">
            {product.title.split(" ").slice(0, 2).join(" ")}
          </h5>
          <div className="flex items-start justify-start w-full mb-2">
            <div className="title text-md text-nowrap">{product.price} EGP</div>
            <div className="title text-md text-nowrap ml-auto">
              <FontAwesomeIcon icon={faStar} className="rating-color" />
              {product.ratingsAverage}
            </div>
          </div>
        </Link>
        <button
          onClick={() => addProductToCart(product._id)}
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
    </>
  );
}

export default ProductItem;
