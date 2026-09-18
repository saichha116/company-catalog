import "./BestSellers.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/swiper.css";

function BestSellers() {
  const products = [
    { title: "Foam Board" },
    { title: "Wooden Board" },
    { title: "Office Supplies" },
    { title: "Stationery" },
    { title: "ACP Sheet" },
    { title: "Vinyl Printing" },
    { title: "Printing" },
    { title: "Sign Board" },
  ];

  return (
    <section className="bestsellers">

      <div className="heading">
        <p className="subtitle">POPULAR PRODUCTS</p>
        <h2>Best Sellers</h2>
      </div>

      <Swiper
        modules={[Autoplay]}
        slidesPerView={4}
        spaceBetween={25}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        speed={1500}
        className="bestseller-swiper"
      >
        {products.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="bestseller-card">
              <div className="image-placeholder"></div>
              <h3>{item.title}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

    </section>
  );
}

export default BestSellers;