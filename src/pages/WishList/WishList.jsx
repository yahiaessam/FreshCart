import { useContext } from "react";
import Loader from "../../components/Loader/Loader"
import WishListItem from "./WishListItem";
import { StoreContext } from "../../context/storeContext";
import { useEffect } from "react";
import { useState } from "react";

function WishList() {
  const { getWishList } = useContext(StoreContext);
  const [wishlistData, setWishlistData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getWishList();
      setWishlistData(data);
      setLoading(false);
    })();
  }, [getWishList]);

  if (loading) return <Loader />;

  return (
    <div className=" min-h-screen bg-white">
      <div className="hero-content">
        <div className="max-w-full container bg-[#f0f3f2] py-5 px-3">
          <div className="flex items-center justify-center">
            <h1>Wishlist</h1>
          </div>

          {wishlistData?.data?.map((item,index) => (
            <WishListItem
              item={item}
              setWishlistData={setWishlistData}
              key={index}
            />
          ))}

        </div>
      </div>
    </div>
  );
}

export default WishList