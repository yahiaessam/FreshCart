import Slider from "react-slick";
import axios from "axios";
import { useEffect, useState } from "react";

function SecondaryCarousel() {
  const [categories, setCategories] = useState([]);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 7,
    speed: 500,
    rows: 2,
    slidesPerRow: 1,
  };

  useEffect(() => {
    async function getCategories() {
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      setCategories(data.data);
    }

    getCategories();
  }, []);

  return (
    <>
      <div className="my-5 px-6">
        <h2 className="title text-start text-lg mb-2">Show popular categories</h2>
        <Slider {...settings}>

          {categories.map((category) => (
            <img
              key={category._id}
              className="w-full h-[150px] max-sm:h-[80px] flex-shrink-0"
              src={category.image}
            />
          ))}

        </Slider>
      </div>
      <div className="max-sm:px-6 max-md:px-4 max-lg:px-10 text-start">

        {categories
          .map((item) => (
            <span
              key={item._id}
              className=" text-black mx-[24px]  max-sm:mx-[4px] max-sm:text-xs"
            >
              {item.name}
            </span>
          ))
          .splice(0, 8)}

      </div>
    </>
  );
}

export default SecondaryCarousel;
