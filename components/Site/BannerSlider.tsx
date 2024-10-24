'use client'

import React, { useMemo, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Thumbs, EffectFade } from 'swiper';
import type { Swiper as SwiperType } from 'swiper';
import Image from 'next/image';
import Link from 'next/link';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

SwiperCore.use([Navigation, Thumbs, EffectFade]);

const BannerSlider = () => {
  const leftSwiperRef = useRef(null);
  const rightSwiperRef = useRef(null);
  const [leftSwiper, setLeftSwiper] = useState<SwiperType | null>(null);
  const [rightSwiper, setRightSwiper] = useState<SwiperType | null>(null);

  const settings = useMemo(() => {
    return {
      slidesPerView: 1,
      speed: 1500,
      spaceBetween: 10,
      effect: "fade",
      loop: true,
      fadeEffect: {
        crossFade: true
      },
      navigation: {
        nextEl: '.banner4-slider-next',
        prevEl: '.banner4-slider-prev',
      }
    }
  }, []);

  // Function to handle synchronized sliding
  const handleSlideChange = (swiper) => {
    if (swiper === leftSwiperRef.current.swiper) {
      rightSwiperRef.current.swiper.slideTo(swiper.activeIndex);
    } else {
      leftSwiperRef.current.swiper.slideTo(swiper.activeIndex);
    }
  };

  const leftSliderImages = [
    '/assets/img/home2/banner4-card-img1.png',
    '/assets/img/home2/banner4-card-img2.png',
    '/assets/img/home2/banner4-card-img3.png'
  ];

  const rightSliderImages = [
    'https://demo-egenslab.b-cdn.net/html/triprex/preview/assets/img/home2/package-card3-img5.png',
    'https://demo-egenslab.b-cdn.net/html/triprex/preview/assets/img/home2/package-card3-img6.png',
    '/assets/img/home2/package-card3-img4.png'
  ];

  return (
    <div className="banner4-slider-wrapper container">
      <div className="row g-xl-4 gy-5 mb-12 mt-12 h-100">
        <div className="col-xl-5 col-md-6 h-100">
          <div className="banner4-slider-container h-100">
            <Swiper
              {...settings}
              onSwiper={setLeftSwiper}
              onSlideChange={(swiper) => handleSlideChange(swiper)}
              className="banner4-card-slide h-100"
            >
              {leftSliderImages.map((image, index) => (
                <SwiperSlide key={`thumb-${index}`} className="h-100">
                  <div className={`banner4-card ${index === 1 ? 'two' : index === 2 ? 'three' : ''} h-100`}>
                    <div className="banner4-img-wrapper h-100">
                      <Image 
                        src={image}
                        alt="banner image"
                        width={526}
                        height={300}
                        className="banner4-img object-cover"
                      />
                    </div>
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
        </div>

        <div className="col-xl-7 col-md-6 h-100">
          <div className="package-slider-container h-100">
            <Swiper
              {...settings}
              onSwiper={setRightSwiper}
              onSlideChange={(swiper) => handleSlideChange(swiper)}
              className="package-card3-slide h-100"
            >
              {rightSliderImages.map((image, index) => (
                <SwiperSlide key={`package-${index}`} className="h-100">
                  <div className="package-card3 style-2 h-100">
                    <Link href="/package-details" className="package-card-img h-100">
                      <div className="img-wrapper h-100">
                        <Image 
                          src={image}
                          alt="package image"
                          width={746}
                          height={400}
                          className="package-img object-cover"
                        />
                      </div>
                      <div className="eg-tag">
                        <span>Featured</span>
                      </div>
                    </Link>
                    {/* ... rest of the card content ... */}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="row">
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
