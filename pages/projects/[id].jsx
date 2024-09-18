"use client";
import React, { useState } from "react";
import Breadcrumb from "@//components/components/common/Breadcrumb";
import RecommendatedPackage from "@/components/components/tourPackage/RecommendatedPackage";
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Link from "next/link";
import DestinationActivitis from "@/components/components/destinationSlider/DestinationActivitis";
import DestinationLocationGallery from "@//components/components/destinationSlider/DestinationLocationGallery";

import Header from "@/components/components/header/Header";
import Topbar from "@/components/components/topbar/Topbar";
import useProduct from "../../hooks/useProductDetails";
import useBlogs from "../../hooks/useBlogs";


import { useRouter } from "next/router";
import { ImageEndpoint } from "../../utils/global";

import { useLanguageContext } from "@/context/languageContext";

import moment from "moment/moment";
import ProjectForm from "../../components/Site/ProjectForm";

const ProjectDetails = () => {
  const [isOpenimg, setOpenimg] = useState({
    openingState: false,
    openingIndex: 0,
  });

  const router = useRouter();
  const { language } = useLanguageContext();
  const { id } = router.query;
  const { data } = useProduct({ id });
  const { data:blogs } = useBlogs({ 
    country:data?.book?.country 
   });


  const images2 = [
    {
      id: 6,
      imageBig: "/assets/img/innerpage/gallery-06.jpg",
    },
    {
      id: 1,
      imageBig: "/assets/img/innerpage/gallery-01.jpg",
    },
    {
      id: 2,
      imageBig: "/assets/img/innerpage/gallery-02.jpg",
    },
    {
      id: 3,
      imageBig: "/assets/img/innerpage/gallery-03.jpg",
    },
    {
      id: 4,
      imageBig: "/assets/img/innerpage/gallery-04.jpg",
    },
    {
      id: 5,
      imageBig: "/assets/img/innerpage/gallery-05.jpg",
    },
  ];

  const images = data?.book?.image?.map((img, index) => {
    return {
      id: index + 1,
      imageBig: `${ImageEndpoint}/${img}`,
      // Add more properties if needed
    };
  });

  console.log("images22", images2, "imagess", images);

  return (
    <div dir="ltr">
      <Header />

      <Breadcrumb
        pagename="Destination Details"
        pagetitle="Destination Details"
      />
      <div className="destination-details-wrap mb-120 pt-120">
        <div className="container">
          <div className="row  flex-col-reverse md:!flex-row g-lg-4 gy-5">
            <div className="col-lg-8">
              <h2>Welcome To Egypt</h2>
              <p>
                {/* {  <img */}
                {/* //                   src={`${ImageEndpoint}/${data?.book?.image[0]}`}
//                   // src="/assets/img/innerpage/blog-standard-img2.jpg"
//                   alt=""
//                 />} */}
                {language === "en" ? data?.book?.title : data?.book?.titlefr}
              </p>
              <div className="destination-gallery mb-40 mt-40">
                <div className="row g-4">
                  {images?.map((img, index) => {
                    return (
                      <div key={index} className="col-lg-5 col-sm-6">
                        <div className="gallery-img-wrap">
                          <img src={img?.imageBig} alt="" />
                          <a
                            data-fancybox="gallery-01"
                            onClick={() =>
                              setOpenimg({
                                openingState: true,
                                openingIndex: 1,
                              })
                            }
                          >
                            <i className="bi bi-eye" /> Discover Island
                          </a>
                        </div>
                      </div>
                    );
                  })}

                  {/* <div className="col-lg-3 col-sm-6">
                    <div className="gallery-img-wrap">
                      <img src="/assets/img/innerpage/gallery-02.jpg" alt="" />
                      <a
                        data-fancybox="gallery-01"
                        onClick={() =>
                          setOpenimg({ openingState: true, openingIndex: 2 })
                        }
                      >
                        <i className="bi bi-eye" /> Discover Island
                      </a>
                    </div>
                  </div>


                  <div className="col-lg-3 col-sm-6">
                    <div className="gallery-img-wrap">
                      <img src="/assets/img/innerpage/gallery-03.jpg" alt="" />
                      <a
                        data-fancybox="gallery-01"
                        onClick={() =>
                          setOpenimg({ openingState: true, openingIndex: 3 })
                        }
                      >
                        <i className="bi bi-eye" /> Discover Island
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="gallery-img-wrap">
                      <img src="/assets/img/innerpage/gallery-04.jpg" alt="" />
                      <a
                        data-fancybox="gallery-01"
                        onClick={() =>
                          setOpenimg({ openingState: true, openingIndex: 4 })
                        }
                      >
                        <i className="bi bi-eye" /> Discover Island
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-5 col-sm-6">
                    <div className="gallery-img-wrap">
                      <img src="/assets/img/innerpage/gallery-05.jpg" alt="" />
                      <a
                        data-fancybox="gallery-01"
                        onClick={() =>
                          setOpenimg({ openingState: true, openingIndex: 5 })
                        }
                      >
                        <i className="bi bi-eye" /> Discover Island
                      </a>
                    </div>
                  </div> */}
                </div>
              </div>

              <p
                dangerouslySetInnerHTML={{
                  __html:
                    language === "en" ? data?.book?.story : data?.book?.storyfr,
                }}
              ></p>
              <h2>Features</h2>
              <ul>
                {data?.book?.services &&
                  Object.keys(data?.book?.services)?.map((feature, index) => {
                    if (data?.book?.services[feature]) {
                      return <li key={index}>{feature}</li>;
                    }
                  })}
              </ul>

              <ul>
                {data?.book?.features &&
                  Object.keys(data?.book?.features)?.map((feature, index) => {
                    if (data?.book?.features[feature]) {
                      return <li key={index}>{feature}</li>;
                    }
                  })}
              </ul>

              {/* <div className="row g-4">
                <div className="col-lg-6">
                  <div className="destination-img">
                    <img
                      src="/assets/img/innerpage/destination-img-01.jpg"
                      alt=""
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="destination-img">
                    <img
                      src="/assets/img/innerpage/destination-img-02.jpg"
                      alt=""
                    />
                  </div>
                </div>
              </div> */}
            </div>
            <div className="col-lg-4">
              <div className="destination-sidebar sidebar-area">
                <div className="destination-info mb-30">
                  <div className="single-info">
                    <span>Destination: {data?.book?.country}</span>
                    {/* <h5>{ data?.book?.country}</h5> */}
                  </div>
                  <div className="single-info">
                    <span>City: {data?.book?.city}</span>
                    {/* <h5>{data?.book?.city}</h5> */}
                  </div>
                  <div className="single-info">
                    <span>Bathrooms: {data?.book?.details?.baths}</span>
                    {/* <h5>{data?.book?.details?.baths}</h5> */}
                  </div>
                  <div className="single-info">
                    <span>Rooms: {data?.book?.details?.rooms}</span>
                    {/* <h5>{data?.book?.details?.rooms}</h5> */}
                  </div>
                  <div className="single-info">
                    <span>Beds: {data?.book?.details?.beds}</span>
                    {/* <h5>{data?.book?.details?.beds}</h5> */}
                  </div>

                  <div className="single-info">
                    <span>
                      Furnished:{" "}
                      {data?.book?.services?.Furnished ? "True" : "False"}
                    </span>
                    {/* <h5>{data?.book?.services?.Furnished}</h5> */}
                  </div>

                  <div className="single-info">
                    <span>Parking Lots: {data?.book?.details?.parkings}</span>
                  </div>

                  <div className="single-info">
                    <span>Reference: {data?.book?.reference}</span>
                  </div>

                  <div className="single-info">
                    <span>Condition: {data?.book?.condition}</span>
                  </div>

                  <div className="mt-3">
                    <ProjectForm />
                  </div>

{/* ---recent posts-- */}
                  <div className="single-widget mb-30">
                  <h5 className="widget-title">
                    {language === "en" ? "Recent Post" : "Article récent"}
                  </h5>

                  {blogs?.books?.map((blog) => {
                    const {
                      _id,

                      createdAt,

                      image,
                      title,
                      titlefr,
                      story,
                      storyfr,
                      category,
                      
                      // read_time,
                    } = blog;
                    return (
                      <div className="recent-post-widget mb-20">
                        <div className="recent-post-img">
                          <Link href={`/blogs/${_id}`}>
                            <img
                              src={`${ImageEndpoint}/${image[0]}`}
                              // src="/assets/img/innerpage/recent-post-img1.png"
                              alt=""
                            />
                          </Link>
                        </div>

                        <div className="recent-post-content">
                          <Link className=" px-2" href={`/blogs/${_id}`}>20 July, 2023</Link>
                          <Link href={`/blogs?country=${category}`}>{category}</Link>

                          

                          <h6>
                            <Link href={`/blogs/${_id}`}>
                              {language === "en" ? title?.slice(0,30) : titlefr?.slice(0,30)}....
                            </Link>
                          </h6>
                        </div>
                      </div>
                    );
                  })}

{/* <div className="w-full h-full inline-flex items-center !bg-primary justify-center font-medium text-white hover:backdrop-brightness-95 py-2 px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

        
              <span  className="block">See all blogs</span>
          
           
          </div> */}


                </div>



                </div>

                <div className="banner2-card four">
                  <img src="/assets/img/home1/banner2-card-img2.png" alt="" />
                  <div className="banner2-content-wrap">
                    <div className="banner2-content">
                      <span>Savings worldwide</span>
                      <h3>50% Off</h3>
                      <p>For Your First Book</p>
                    </div>
                    <Link href="/package" className="primary-btn1">
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <DestinationLocationGallery />
      <DestinationActivitis />
      <RecommendatedPackage /> */}

      {images && images?.length && (
        <Lightbox
          className="img-fluid"
          open={isOpenimg.openingState}
          plugins={[Fullscreen]}
          index={isOpenimg.openingIndex}
          close={() => setOpenimg(false)}
          styles={{ container: { backgroundColor: "rgba(0, 0, 0, .9)" } }}
          slides={images?.map(function (elem) {
            return { src: elem.imageBig };
          })}
        />
      )}
    </div>
  );
};

export default ProjectDetails;
