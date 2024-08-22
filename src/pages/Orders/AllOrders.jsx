import axios from "axios";
import { baseUrl } from "../../api/api";
import { useQuery } from "react-query";
import Loader from "../../components/Loader/Loader";

function AllOrders() {

  function getOrders() {
    const ownerId = localStorage.getItem("ownerId");
    return axios.get(baseUrl + `/api/v1/orders/user/${ownerId}`);
  }

  let { data, isLoading } = useQuery("getOrders", getOrders);

  if (!data || data == undefined || data == null) {
    return <Loader />;
  }

  if (isLoading) return <Loader />;

  return (
    <>
      <div className=" min-h-screen bg-[#fff]">
        <div>
          <div className="max-w-full flex items-center justify-between flex-wrap py-5">
            {data?.data.map((order) => (
              <div
                key={order.id}
                className="w-[48%] bg-[#f0f3f2] m-2 text-[#000]"
              >
                <div className="flex items-center justify-start">

                  {order.cartItems.map((items) => (
                    <div
                      className="border border-gray-300 rounded bg-white flex flex-col items-start justify-start m-2 "
                      key={items.product._id}
                    >
                      <img
                        className="w-[100px] self-center"
                        src={items.product.imageCover}
                        alt="orderImg"
                      />
                      <div className="p-2 bg-[#fff] border border-t-slate-300 w-full text-black">
                        <h5>
                          {items.product.title.split(" ").slice(0, 2).join(" ")}
                        </h5>
                        <h6>Price:{items.price}</h6>
                        <h6>Count: {items.count}</h6>
                      </div>
                    </div>
                  ))}

                </div>
                <div className="m-2">
                  <h5>Payment Method: {order.paymentMethodType}</h5>
                  <h5>Order Price: {order.totalOrderPrice}</h5>
                  <p>
                    Shipping Address: `this product is shipped to{" "}
                    {order.shippingAddress.city} a phone number of{" "}
                    {order.shippingAddress.phone} and details of{" "}
                    {order.shippingAddress.details}`
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default AllOrders;
