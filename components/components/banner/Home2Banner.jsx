"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper";

// import { Empty, Select, Slider } from 'antd';
import Select from "react-select";
import useCountries from "@/hooks/useCountries";
import useCities from "@/hooks/useCities";
import FilterForm from '@/components/Site/dashboardLayout/FilterForm'
SwiperCore.use([Autoplay, EffectFade, Navigation, Pagination]);

const Home2Banner = () => {





  const [index, setIndex] = useState(0);
  const animateTextContainerRef = useRef(null);
 

  useEffect(() => {
    const animateText = () => {
      const animateTextContainer = animateTextContainerRef.current;
      if (!animateTextContainer) return;

      const txts = animateTextContainer.children;
      const txtslen = txts.length;

      for (let i = 0; i < txtslen; i++) {
        txts[i].classList.remove("text-in");
      }
      txts[index].classList.add("text-in");

      if (index === txtslen - 1) {
        setIndex(0);
      } else {
        setIndex(index + 1);
      }
    };

    const timeoutId = setTimeout(animateText, 3000);

    return () => clearTimeout(timeoutId); // Cleanup the timeout on component unmount
  }, [index]);

  const settings = useMemo(() => {
    return {
      slidesPerView: "auto",
      speed: 2500,
      spaceBetween: 25,
      effect: "fade", // Use the fade effect
      fadeEffect: {
        crossFade: true, // Enable cross-fade transition
      },
      autoplay: {
        delay: 3000, // Autoplay duration in milliseconds
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".home1-banner-next",
        prevEl: ".home1-banner-prev",
      },
    };
  });
  return (
    <>
      <div className="">
        <div className="home2-banner-area">
          <Swiper {...settings} className="swiper home1-banner-slider">
            <div className="swiper-wrapper">
              <SwiperSlide className="swiper-slide">
                <div
                  className="home2-banner-wrapper"
                  style={{
                    backgroundImage:
                      "linear-gradient(180deg, rgba(16, 12, 8, 0.4) 0%, rgba(16, 12, 8, 0.4) 100%), url(assets/img/home2/home2-banner-img1.jpg)",
                  }}
                ></div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <div
                  className="home2-banner-wrapper"
                  style={{
                    backgroundImage:
                      "linear-gradient(180deg, rgba(16, 12, 8, 0.4) 0%, rgba(16, 12, 8, 0.4) 100%), url(assets/img/home2/home2-banner-img2.jpg)",
                  }}
                ></div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <div
                  className="home2-banner-wrapper"
                  style={{
                    backgroundImage:
                      "linear-gradient(180deg, rgba(16, 12, 8, 0.4) 0%, rgba(16, 12, 8, 0.4) 100%), url(assets/img/home2/home2-banner-img3.jpg)",
                  }}
                ></div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <div
                  className="home2-banner-wrapper"
                  style={{
                    backgroundImage:
                      "linear-gradient(180deg, rgba(16, 12, 8, 0.4) 0%, rgba(16, 12, 8, 0.4) 100%), url(assets/img/home2/home2-banner-img4.jpg)",
                  }}
                ></div>
              </SwiperSlide>
            </div>
          </Swiper>
          <div className="home2-banner-content-wrap">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="home2-banner-content">
                    <div className="eg-tag">
                      <span>New York</span>
                    </div>
                    <h1 className="animate-text" ref={animateTextContainerRef}>
                      Let’s Explore Your
                      <span>Holiday</span>
                      <span>Family</span>
                      <span>Honeymoon</span>
                      Trip.
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="home1-banner-bottom style-2">
              <div className="container-md container-flui">
                <div className="filter-wrappe">
                  <div className="filter-grou">
                    <div className="tab-content" id="pills-tab2Content">
                      <div
                        className="tab-pane fade show active"
                        id="tour"
                        role="tabpanel"
                      >
                        <div className="home2-banner-content-wrapper">
                     <FilterForm home={true}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="slider-btn-grp">
            <div className="slider-btn home1-banner-prev">
              <i className="bi bi-arrow-left" />
            </div>
            <div className="slider-btn home1-banner-next">
              <i className="bi bi-arrow-right" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home2Banner;
