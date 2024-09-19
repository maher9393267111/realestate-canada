"use client";
import React, { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper";
import Link from "next/link";
SwiperCore.use([Autoplay, EffectFade, Navigation, Pagination]);
import { ImageEndpoint } from "@/utils/global";
import { useState } from "react";
import { useRouter } from "next/router";
import { useLanguageContext } from "@/context/languageContext";
import ProjectCard from '@/components/Site/ProjectCard'
import useProducts from "@/hooks/useProducts";

const  ProjectsOfferSlider = () => {

  const router = useRouter;
  const { query } = router;

  const { language } = useLanguageContext();

  console.log(query, "Query data");

  const [page, setPage] = useState(1);

  const {  data } = useProducts({
    page,
    isfeatured:true
 
  });



  const settings = useMemo(() => {
    return {
      slidesPerView: "auto",
      speed: 2000,
      spaceBetween: 25,
      navigation: {
        nextEl: ".package-card-slider-next",
        prevEl: ".package-card-slider-prev",
      },

      breakpoints: {
        280: {
          slidesPerView: 1,
        },
        386: {
          slidesPerView: 1,
        },
        576: {
          slidesPerView: 1,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        1400: {
          slidesPerView: 3,
        },
      },
    };
  }, []);
  return (
    <>
      <div className="tour-pack-section">
        <div className="container">
          <div className="row mb-50">
            <div className="col-lg-12">
              <div className="section-title2 text-center">
                <div className="eg-section-tag two">
                  <span>Projects Package</span>
                </div>
                <h2 className="text-white">Featured Projects</h2>
              </div>
            </div>
          </div>
          <div className="package-card-slider-wrap">
            <div className="row">
              <div className="col-lg-12">
                <Swiper
                  {...settings}
                  className="swiper package-card-slider mb-60"
                >
                  <div className="swiper-wrapper">



                  {data?.books?.map((blog) => {
                    return (
                    <SwiperSlide className="swiper-slide">
                    <ProjectCard blog={blog} language={language}/>
                    </SwiperSlide>
                    )})}

                  </div>

                </Swiper>
                <div className="slide-and-view-btn-grp style-2">
                  <div className="slider-btn-grp3">
                    <div className="slider-btn package-card-slider-prev">
                      <i className="bi bi-arrow-left" />
                      <span>PREV</span>
                    </div>
                    {/* <Link href="/package" className="secondary-btn2">
                      View All Package
                    </Link> */}
                    <div className="slider-btn package-card-slider-next">
                      <span>NEXT</span>
                      <i className="bi bi-arrow-right" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectsOfferSlider;
