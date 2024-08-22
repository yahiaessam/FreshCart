import Slider from "react-slick";
import Img1 from '../../assets/images/noon15.avif';
import Img2 from '../../assets/images/noon2.avif';
import Img3 from '../../assets/images/noon3.avif';
import Img4 from '../../assets/images/noon4.avif';
import Img5 from '../../assets/images/noon5.avif';
import Img6 from '../../assets/images/noon6.avif';
import Img7 from '../../assets/images/noon7.avif';
import Img8 from '../../assets/images/noon8.avif';
import Img9 from '../../assets/images/noon9.avif';
import Img10 from '../../assets/images/noon10.gif';
import Img11 from '../../assets/images/noon11.avif';
import Img12 from '../../assets/images/noon12.avif';
import Img13 from '../../assets/images/noon13.avif';
import Img14 from '../../assets/images/noon14.avif';
import Img15 from '../../assets/images/noon1.avif';

function MainCarousel() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 4500,
  };
  return (
    <div className="px-6">
      <Slider {...settings}>
        <img src={Img1} alt="sliderImage" />
        <img src={Img2} alt="sliderImage" />
        <img src={Img3} alt="sliderImage" />
        <img src={Img4} alt="sliderImage" />
        <img src={Img5} alt="sliderImage" />
        <img src={Img6} alt="sliderImage" />
        <img src={Img7} alt="sliderImage" />
        <img src={Img8} alt="sliderImage" />
        <img src={Img9} alt="sliderImage" />
        <img src={Img10} alt="sliderImage" />
        <img src={Img11} alt="sliderImage" />
        <img src={Img12} alt="sliderImage" />
        <img src={Img13} alt="sliderImage" />
        <img src={Img14} alt="sliderImage" />
        <img src={Img15} alt="sliderImage" />
      </Slider>
    </div>
  );
}

export default MainCarousel;
