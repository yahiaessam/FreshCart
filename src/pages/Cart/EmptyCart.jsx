import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import CartEmpty from "../../assets/images/emptycart.png";

function EmptyCart() {
  return (
    <div className=" min-h-screen  bg-white">
      <div className="hero-content text-center">
        <div className="max-w-full">
          <AnimatePresence>
            <motion.img
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="relative w-full"
              src={CartEmpty}
              alt="empty cart"
            />
          </AnimatePresence>
          <h1 className="absolute max-lg:top-[80%] max-lg:left-[37%] max-lg:text-3xl max-md:top-[80%] max-md:left-[34%] max-md:text-3xl max-sm:top-[45%] max-sm:left-[22%] max-sm:text-2xl text-pretty top-[77%] left-[40%] text-3xl font-bold text-main">
            Your cart is Empty
          </h1>
          <Link to={"/products"}>
            <button className="absolute max-lg:top-[90%] max-lg:left-[42%] max-md:top-[90%] max-md:left-[40%] max-sm:top-[55%] max-sm:left-[29%] text-pretty top-[85%] left-[44%] btn btn-accent">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EmptyCart;
