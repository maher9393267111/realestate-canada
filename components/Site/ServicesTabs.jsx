'use client'

import React, { useMemo, useState, useEffect } from "react"
import ModalVideo from "react-modal-video"
import { Swiper, SwiperSlide } from "swiper/react"
import useServices from "@/hooks/useServices"
import { useLanguageContext } from "@/context/languageContext"
import { ImageEndpoint } from "../../utils/global"
import SwiperCore, { Autoplay, EffectFade, Navigation, Pagination } from "swiper"
import Link from "next/link"

SwiperCore.use([Autoplay, EffectFade, Navigation, Pagination])

const ServicesTabs = () => {
  const [isOpen, setOpen] = useState(false)
  const { language } = useLanguageContext()
  const [activeTab, setActiveTab] = useState(0)
  const { data, isLoading, error } = useServices({
    page: 1,
    search: "",
  })

  const handleTabClick = (tab) => {
    setActiveTab(tab)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (data?.books?.length) {
        setActiveTab((prevTab) => (prevTab + 1) % data.books.length)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [data?.books])

  const settings = useMemo(() => {
    return {
      slidesPerView: "auto",
      speed: 1500,
      spaceBetween: 25,
      effect: "fade",
      loop: true,
      fadeEffect: {
        crossFade: true,
      },
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination5",
        clickable: true,
      },
    }
  }, [])

  return (
    <div className="slider-and-tab-section mb-120">
      <div className="row g-0">
        <div className="col-lg-5">
          <ul className="activities-slider-group">
            <li className="active">
              <div className="slider-area">
                <Swiper {...settings} className="swiper activities-img-slider">
                  <div className="swiper-wrapper">
                    <SwiperSlide className="swiper-slide">
                      <div
                        className="slide-img"
                        style={{
                          backgroundImage: `linear-gradient(180deg, rgba(16, 12, 8, 0.4) 0%, rgba(16, 12, 8, 0.4) 100%), url(${`${ImageEndpoint}/${data?.books[activeTab]?.image[0]}`})`,
                        }}
                      />
                    </SwiperSlide>
                  </div>
                </Swiper>
                <div className="swiper-pagination5 pagination1" />
              </div>
            </li>
          </ul>
        </div>
        <div className="col-lg-7">
          <div className="tab-area">
            <div className="section-title2 text-center mb-50">
              <div className="eg-section-tag">
                <span>{language === "en" ? "What We Do" : "Ce que nous faisons"}</span>
              </div>
              <h2>{language === "en" ? "Our Services" : "Nos prestations"}</h2>
            </div>
            {data?.books?.length && (
              <div className="tab-content-area">
                <div className="row g-xl-4 gy-5 ">
                  <div className="col-xl-5">
                    <div className="tab-sidebar">
                      <ul className="nav nav-pills !bg-transparent" id="pills-tab3" role="tablist">
                        {data?.books?.map((service, index) => (
                          <li key={index} className="nav-item" role="presentation">
                            <div
                              onClick={() => handleTabClick(index)}
                              className={`nav-link ${activeTab === index ? "active" : ""}`}
                            >
                              <div className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width={33} height={33} viewBox="0 0 54 54">
                                  {/* SVG path data */}
                                </svg>
                              </div>
                              <h6>{language === "en" ? service?.title : service?.titlefr}</h6>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="col-xl-7 d-flex justify-content-xl-start justify-content-center">
                    <div className="tab-content" id="pills-tab3Content">
                      {data?.books?.map((service, index) => (
                        <div key={index} className={`${activeTab === index ? "block" : "hidden"}`}>
                          <div className="tab-content-wrap">
                            <h2>{language === "en" ? service?.title : service?.titlefr}</h2>
                            <p>{language === "en" ? service?.subdesc : service?.subdescfr}</p>
                            <ul>{/* List items if needed */}</ul>
                            <div className="content-bottom-area">
                              <Link href={`/services/${service?._id}`} className="primary-btn3">
                                {language === "en" ? "Check Service details" : "Vérifier les détails du service"}
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ModalVideo
        channel="youtube"
        onClick={() => setOpen(true)}
        isOpen={isOpen}
        animationSpeed="350"
        videoId="r4KpWiK08vM"
        ratio="16:9"
        onClose={() => setOpen(false)}
      />
    </div>
  )
}

export default ServicesTabs