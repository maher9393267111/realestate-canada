'use client'

import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCreative } from 'swiper';


import Image from 'next/image';
import Link from 'next/link';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-creative';

const BannerSlider = () => {
  const [leftSwiper, setLeftSwiper] = useState(null);
  const [rightSwiper, setRightSwiper] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const settings = useMemo(() => ({
    modules: [Navigation, EffectCreative],
    slidesPerView: 1,
    speed: 1000,
    spaceBetween: 30,
    loop: true,
    navigation: {
      nextEl: '.banner4-slider-next',
      prevEl: '.banner4-slider-prev',
    },
    effect: "creative",
    creativeEffect: {
      prev: {
        translate: [0, 0, -400],
      },
      next: {
        translate: ["100%", 0, 0],
      },
    },
    allowTouchMove: true,
  }), []);

  const syncSlides = useCallback((sourceSwiper, targetSwiper) => {
    if (!sourceSwiper || !targetSwiper || isAnimating) return;

    setIsAnimating(true);
    const newIndex = sourceSwiper.realIndex;
    setActiveIndex(newIndex);

    targetSwiper.slideToLoop(newIndex, 1000, false);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  }, [isAnimating]);

  const handleLeftSlideChange = useCallback((swiper) => {
    if (rightSwiper) {
      syncSlides(swiper, rightSwiper);
    }
  }, [rightSwiper, syncSlides]);

  const handleRightSlideChange = useCallback((swiper) => {
    if (leftSwiper) {
      syncSlides(swiper, leftSwiper);
    }
  }, [leftSwiper, syncSlides]);

  useEffect(() => {
    return () => {
      if (leftSwiper?.destroy) leftSwiper.destroy(true, true);
      if (rightSwiper?.destroy) rightSwiper.destroy(true, true);
    };
  }, [leftSwiper, rightSwiper]);

  const leftSliderImages = [
    'https://demo-egenslab.b-cdn.net/html/triprex/preview/assets/img/home2/banner4-card-img2.png',
    'https://demo-egenslab.b-cdn.net/html/triprex/preview/assets/img/home2/banner4-card-img1.png',
    'https://demo-egenslab.b-cdn.net/html/triprex/preview/assets/img/home2/banner4-card-img3.png'
  ];

  const rightSliderImages = [
    'https://demo-egenslab.b-cdn.net/html/triprex/preview/assets/img/home2/package-card3-img5.png',
    'https://demo-egenslab.b-cdn.net/html/triprex/preview/assets/img/home2/package-card3-img6.png',
    'https://demo-egenslab.b-cdn.net/html/triprex/preview/assets/img/home2/package-card3-img4.png'
  ];

  return (
    <div className="banner4-slider-wrapper container">
      <div className="row g-xl-4 gy-5 mb-12 mt-12 ">
        <div className="col-xl-5">
          <Swiper
            {...settings}
            onSwiper={setLeftSwiper}
            onSlideChange={handleLeftSlideChange}
            className="banner4-card-slide"
          >
            {leftSliderImages.map((image, index) => (
              <SwiperSlide key={`thumb-${index}`}>
                <div className={`banner4-card ${index === 1 ? 'two' : index === 2 ? 'three' : ''} md:!h-[282px]`}>
                  <Image 
                    src={image}
                    alt="banner image"
                    width={526}
                    height={300}
                  />
                  <div className="banner4-content-wrapper">
                    <div className="banner4-content">
                      <span>Savings worldwide</span>
                      <h3>20% Off</h3>
                      <Link href="/package-grid" className="text">
                        Discover Great Deal
                      </Link>
                      <Link href="/package-grid" className="primary-btn1">
                        View This Trip
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="col-xl-7">
          <Swiper
            {...settings}
            onSwiper={setRightSwiper}
            onSlideChange={handleRightSlideChange}
            className="package-card3-slide"
          >
            {rightSliderImages.map((image, index) => (
              <SwiperSlide key={`package-${index}`}>
                <div className="package-card3 style-2">
                  <Link href="/package-details" className="package-card-img">
                    <Image 
                      src={image}
                      alt="package image"
                      width={746}
                      height={400}
                    />
                    <div className="eg-tag">
                      <span>Featured</span>
                    </div>
                  </Link>
                  <div className="package-card-content">
                    <div className="card-content-top">
                      <div className="rating-area">
                        <ul className="rating">
                          {[...Array(5)].map((_, i) => (
                            <li key={i}><i className="bi bi-star-fill"></i></li>
                          ))}
                        </ul>
                        <span>(28 Review)</span>
                      </div>
                      <h5><Link href="/package-details">A Journey through Historical and Culture.</Link></h5>
                      <ul className="feature-list">
                        <li>
                          <i className="bi bi-calendar3"></i> 4 Days
                        </li>
                        <li>
                          <i className="bi bi-geo-alt"></i> 6 Location
                        </li>
                        <li>
                          <i className="bi bi-flag"></i> 2 Countries
                        </li>
                      </ul>
                    </div>
                    <div className="card-content-bottom">
                      <div className="price-area">
                        <span>Starting Form:</span>
                        <h6><sub>$</sub>70.00 <span>Per Person</span></h6>
                      </div>
                      <Link href="/package-details" className="primary-btn2">
                        Book a Trip
                        <i className="bi bi-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="row mb-12">
        <div className="col-lg-12">
          <div className="slide-and-view-btn-grp">
            <div className="slider-btn-grp3">
              <div className="slider-btn banner4-slider-prev">
                <i className="bi bi-arrow-left"></i>
                <span>PREV</span>
              </div>
              <div className="slider-btn banner4-slider-next">
                <span>NEXT</span>
                <i className="bi bi-arrow-right"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerSlider;