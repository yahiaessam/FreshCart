import axios from "axios"
import Loader from "../../components/Loader/Loader";
import ProductItem from "./ProductItem";
import { useQuery } from "react-query";
import {baseUrl} from '../../api/api'



function Products() {

  function getProducts() {
    return axios.get(baseUrl + "/api/v1/products");
  }

  let {data, isLoading } = useQuery('getProducts', getProducts);

  if (isLoading) return <Loader/>;

  return (
    <>
      <div className=" min-h-screen bg-[#fff]">
        <div>
          <div className="max-w-full flex items-center justify-center flex-wrap py-5">

            {data?.data?.data?.map((product) => (
              <ProductItem key={product.id} product={product}/>
            ))}

          </div>
        </div>
      </div>
    </>
  );
}

export default Products