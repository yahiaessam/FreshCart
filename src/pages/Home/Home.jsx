import MainCarousel from "../../components/Carousels/MainCarousel";
import SecondaryCarousel from "../../components/Carousels/SecondaryCarousel";
import Products from "../Products/Products";

function Home() {
  return (
    <>
      <div className=" min-h-screen bg-[#fff]">
        <div className=" text-center">
          <div className="max-w-full py-5">
            <MainCarousel />
            <SecondaryCarousel />
            <Products/>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home